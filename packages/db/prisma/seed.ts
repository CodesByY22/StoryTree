import { PrismaClient, StoryStatus, NotificationType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { 
  GENRES, TAGS, REAL_NAMES, PROFESSIONS, BIO_TEMPLATES, STORY_TITLES, 
  GENERIC_TITLES, SUBTITLES, HEADINGS, INTRO_BLOCKS, BODY_BLOCKS, 
  CODE_BLOCKS, CONCLUSION_BLOCKS, COMMENT_TEMPLATES 
} from './seed-data';

const prisma = new PrismaClient();

const SEED_MODE = process.env.SEED_MODE || 'medium';

const MODE_CONFIGS = {
  small: { users: 15, stories: 30, comments: 200 },
  medium: { users: 50, stories: 100, comments: 1200 },
  large: { users: 150, stories: 500, comments: 5000 },
};

const config = MODE_CONFIGS[SEED_MODE as keyof typeof MODE_CONFIGS] || MODE_CONFIGS.medium;

// Mapping genres to image keywords for better consistency
const GENRE_IMAGES: Record<string, string> = {
  'Technology': 'technology,computer',
  'Programming': 'code,developer',
  'Artificial Intelligence': 'ai,robot',
  'Web Development': 'website,browser',
  'Startup': 'office,business',
  'Productivity': 'desk,notebook',
  'Psychology': 'mind,abstract',
  'History': 'architecture,ancient',
  'Science': 'laboratory,space',
  'Space': 'galaxy,stars',
  'Travel': 'landscape,adventure',
  'Fantasy': 'castle,magic',
  'Business': 'city,meeting',
  'Design': 'art,color',
  'Career': 'success,people'
};

function generateEnglishMarkdown(genre: string) {
  let content = '';
  
  // Introduction
  content += `${faker.helpers.arrayElement(INTRO_BLOCKS)}\n\n`;
  
  const numSections = faker.number.int({ min: 4, max: 8 });
  
  for (let i = 0; i < numSections; i++) {
    // Heading
    content += `## ${faker.helpers.arrayElement(HEADINGS)}\n\n`;
    
    // 1-3 body paragraphs
    const numParagraphs = faker.number.int({ min: 2, max: 4 });
    for (let p = 0; p < numParagraphs; p++) {
      content += `${faker.helpers.arrayElement(BODY_BLOCKS)}\n\n`;
    }
    
    // Randomly add a code block for tech genres
    if (['Programming', 'Technology', 'Artificial Intelligence', 'Web Development'].includes(genre)) {
      if (faker.datatype.boolean({ probability: 0.4 })) {
        content += `${faker.helpers.arrayElement(CODE_BLOCKS)}\n\n`;
      }
    }
  }
  
  // Conclusion
  content += `## Conclusion\n\n`;
  content += `${faker.helpers.arrayElement(CONCLUSION_BLOCKS)}\n\n`;
  
  return content;
}

async function main() {
  console.log(`🌱 Starting database seed with realistic English content in [${SEED_MODE.toUpperCase()}] mode...`);
  
  // 1. Clear existing data
  console.log('🧹 Clearing existing data...');
  await prisma.notification.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.like.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.readingHistory.deleteMany();
  await prisma.story.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  // Generate Users
  console.log(`👤 Generating ${config.users} realistic users...`);
  
  const users = [];
  for (let i = 0; i < config.users; i++) {
    const name = faker.helpers.arrayElement(REAL_NAMES) + (faker.datatype.boolean() ? ` ${faker.string.alpha(1).toUpperCase()}.` : '');
    const baseUsername = name.toLowerCase().replace(/[^a-z]/g, '');
    const username = `${baseUsername}${i}${faker.string.numeric(2)}`;
    
    // Most users joined in the last year
    const joinedDate = faker.date.past({ years: 1 });
    
    const profession = faker.helpers.arrayElement(PROFESSIONS);
    let bio = faker.helpers.arrayElement(BIO_TEMPLATES);
    if (faker.datatype.boolean()) {
      bio = `${profession}. ${bio}`;
    }

    const user = await prisma.user.create({
      data: {
        id: faker.string.uuid(),
        name,
        username,
        email: `${username}@example.com`,
        emailVerified: true,
        image: `https://api.dicebear.com/9.x/notionists/svg?seed=${username}`,
        bio,
        displayName: name,
        createdAt: joinedDate,
        updatedAt: joinedDate,
        favoriteGenres: faker.helpers.arrayElements(GENRES, { min: 2, max: 5 }).join(','),
      }
    });
    users.push(user);
  }

  // Generate Stories
  console.log(`📝 Generating ${config.stories} high-quality stories...`);
  
  const stories = [];
  for (let i = 0; i < config.stories; i++) {
    const author = faker.helpers.arrayElement(users);
    
    // Bias towards recent dates for a more active feed
    const dateWeight = faker.number.int({ min: 1, max: 10 });
    const createdAt = dateWeight > 3 ? faker.date.recent({ days: 30 }) : faker.date.past({ years: 1, refDate: new Date() });
    
    const genre = faker.helpers.arrayElement(GENRES);
    const tags = faker.helpers.arrayElements(TAGS, { min: 2, max: 4 });
    
    // Pick title based on genre, or fallback
    const genreTitles = STORY_TITLES[genre] || GENERIC_TITLES;
    let title = faker.helpers.arrayElement(genreTitles);
    
    // To ensure uniqueness when generating lots of stories
    if (config.stories > 20) {
       title = `${title} ${faker.helpers.arrayElement(['- A Case Study', '- Explained', '- My Thoughts', 'Part ' + faker.number.int({min:1, max:3}), 'in 2026'])}`;
    }

    const subtitle = faker.helpers.arrayElement(SUBTITLES);
    const imageKeyword = GENRE_IMAGES[genre] || 'abstract';
    
    let content = `# ${title}\n\n`;
    content += generateEnglishMarkdown(genre);
    
    const story = await prisma.story.create({
      data: {
        title,
        subtitle,
        content,
        coverImage: `https://source.unsplash.com/1200x600/?${imageKeyword}&sig=${faker.string.uuid()}`,
        genre,
        tags,
        status: StoryStatus.PUBLISHED,
        authorId: author.id,
        createdAt,
        updatedAt: createdAt,
        publishedAt: createdAt,
      }
    });
    stories.push(story);
  }

  // Generate Follows
  console.log('🤝 Generating followers based on shared interests...');
  const followsCreated = [];
  for (const user of users) {
    const userGenres = user.favoriteGenres?.split(',') || [];
    
    // Follow users who share similar interests
    const candidates = users.filter(u => {
      if (u.id === user.id) return false;
      const otherGenres = u.favoriteGenres?.split(',') || [];
      return userGenres.some(g => otherGenres.includes(g));
    });

    const numFollows = faker.number.int({ min: 3, max: Math.min(20, candidates.length) });
    const following = faker.helpers.arrayElements(candidates, numFollows);
    
    for (const followed of following) {
      const createdAt = faker.date.between({ from: Math.max(user.createdAt.getTime(), followed.createdAt.getTime()), to: new Date() });
      const follow = await prisma.follow.create({
        data: {
          followerId: user.id,
          followingId: followed.id,
          createdAt
        }
      });
      followsCreated.push(follow);
      
      await prisma.notification.create({
        data: {
          type: NotificationType.FOLLOW,
          userId: followed.id,
          actorId: user.id,
          createdAt,
          isRead: faker.datatype.boolean()
        }
      });
    }
  }

  // Generate Likes
  console.log('❤️ Generating likes with realistic distribution...');
  let totalLikes = 0;
  for (const story of stories) {
    // 5% of stories go viral (trending)
    // 20% are popular
    // 75% are normal
    const viralRoll = faker.number.int({ min: 1, max: 100 });
    const maxPossibleLikes = users.length - 1;
    let numLikes = 0;

    if (viralRoll > 95) {
      // Trending (everyone likes it)
      numLikes = Math.floor(maxPossibleLikes * faker.number.float({ min: 0.8, max: 1.0 }));
    } else if (viralRoll > 75) {
      // Popular
      numLikes = Math.floor(maxPossibleLikes * faker.number.float({ min: 0.3, max: 0.6 }));
    } else {
      // Normal
      numLikes = faker.number.int({ min: 0, max: Math.min(10, maxPossibleLikes) });
    }
    
    if (numLikes > 0) {
      const candidates = users.filter(u => u.id !== story.authorId);
      const likers = faker.helpers.arrayElements(candidates, numLikes);
      
      for (const liker of likers) {
        const createdAt = faker.date.between({ from: story.createdAt, to: new Date() });
        await prisma.like.create({
          data: {
            storyId: story.id,
            userId: liker.id,
            createdAt
          }
        });
        totalLikes++;
        
        if (faker.datatype.boolean({ probability: 0.2 })) {
           await prisma.notification.create({
             data: {
               type: NotificationType.LIKE,
               userId: story.authorId,
               actorId: liker.id,
               storyId: story.id,
               createdAt,
               isRead: faker.datatype.boolean()
             }
           });
        }
      }
    }
  }

  // Generate Comments
  console.log(`💬 Generating ${config.comments} meaningful comments...`);
  const commentsCreated = [];

  for (let i = 0; i < config.comments; i++) {
    // Favor trending/popular stories for comments
    const story = faker.helpers.arrayElement(stories);
    const author = faker.helpers.arrayElement(users);
    
    let parentId = null;
    let type: NotificationType = NotificationType.COMMENT;
    let targetUserId = story.authorId;
    
    const existingCommentsOnStory = commentsCreated.filter(c => c.storyId === story.id && !c.parentId);
    
    // 40% chance to reply to an existing comment to create threads
    if (existingCommentsOnStory.length > 0 && faker.datatype.boolean({ probability: 0.4 })) {
      const parent = faker.helpers.arrayElement(existingCommentsOnStory);
      parentId = parent.id;
      type = NotificationType.REPLY;
      targetUserId = parent.authorId;
    }
    
    const createdAt = faker.date.between({ from: story.createdAt, to: new Date() });
    
    let content = faker.helpers.arrayElement(COMMENT_TEMPLATES);
    // Personalize template
    content = content.replace('[HEADING]', faker.helpers.arrayElement(HEADINGS));
    
    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: author.id,
        storyId: story.id,
        parentId,
        createdAt,
        updatedAt: createdAt,
      }
    });
    commentsCreated.push(comment);
    
    if (author.id !== targetUserId) {
      await prisma.notification.create({
        data: {
          type,
          userId: targetUserId,
          actorId: author.id,
          storyId: story.id,
          commentId: comment.id,
          createdAt,
          isRead: faker.datatype.boolean()
        }
      });
    }
  }

  // Generate Bookmarks
  console.log('🔖 Generating bookmarks...');
  let totalBookmarks = 0;
  for (const user of users) {
    const numBookmarks = faker.number.int({ min: 5, max: 20 });
    const candidates = stories.filter(s => s.authorId !== user.id);
    const bookmarkedStories = faker.helpers.arrayElements(candidates, Math.min(numBookmarks, candidates.length));
    
    for (const story of bookmarkedStories) {
      await prisma.bookmark.create({
        data: {
          storyId: story.id,
          userId: user.id,
          createdAt: faker.date.between({ from: story.createdAt, to: new Date() })
        }
      });
      totalBookmarks++;
    }
  }
  
  const notificationsCount = await prisma.notification.count();

  console.log('✅ Seeding complete!');
  console.log('==================================');
  console.log(`Users created:       ${users.length}`);
  console.log(`Stories created:     ${stories.length}`);
  console.log(`Follows created:     ${followsCreated.length}`);
  console.log(`Likes created:       ${totalLikes}`);
  console.log(`Comments created:    ${commentsCreated.length}`);
  console.log(`Bookmarks created:   ${totalBookmarks}`);
  console.log(`Notifications:       ${notificationsCount}`);
  console.log('==================================');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
