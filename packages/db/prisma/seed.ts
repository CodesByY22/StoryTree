import { PrismaClient, StoryStatus, NotificationType } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const GENRES = [
  'Technology', 'Programming', 'AI', 'Fantasy', 'Romance', 'Mystery', 
  'Thriller', 'Science Fiction', 'Adventure', 'Business', 'History', 
  'Psychology', 'Productivity', 'Education', 'Poetry', 'Travel', 'Design'
];

const TAGS = [
  'AI', 'React', 'NextJS', 'Programming', 'Productivity', 'Writing', 
  'Startup', 'Career', 'History', 'Fantasy', 'Books', 'Learning', 
  'Web Development', 'Machine Learning', 'Science', 'Movies', 'Gaming'
];

const REAL_NAMES = [
  'Emma Carter', 'Lucas Bennett', 'Sophia Adams', 'Noah Wilson', 
  'Olivia Brooks', 'Daniel Harris', 'Ava Martinez', 'Elijah Robinson',
  'Isabella Clark', 'James Rodriguez', 'Mia Lewis', 'Benjamin Lee',
  'Amelia Walker', 'William Hall', 'Harper Allen', 'Alexander Young',
  'Evelyn King', 'Michael Wright', 'Abigail Scott', 'Ethan Green'
];

const BIOS = [
  "Software engineer exploring AI and productivity.",
  "Fantasy writer and coffee enthusiast.",
  "Sharing lessons from startups and technology.",
  "Travel blogger documenting hidden places.",
  "History lover writing about forgotten civilizations.",
  "Designer passionate about creating intuitive user experiences.",
  "Lifelong learner, avid reader, and aspiring author.",
  "Exploring the intersection of psychology and business.",
  "Building the future of the web, one component at a time.",
  "Storyteller blending science fiction with philosophical questions."
];

const STORY_TITLES = [
  "The Day AI Changed My Career",
  "Building My First Startup at 20",
  "The Last Library on Earth",
  "A Letter to My Future Self",
  "How I Learned to Love Programming",
  "Beyond the Stars",
  "The Silent Kingdom",
  "Coffee, Code, and Creativity",
  "The Psychology of Habits",
  "Why We Fear Failure",
  "Mastering React in 2026",
  "A Journey Through Ancient Rome",
  "The Art of Minimalist Living",
  "Lessons from the Tech Bubble",
  "Finding Peace in a Noisy World",
  "The Future of Remote Work",
  "Understanding Machine Learning Basics",
  "Designing for Accessibility",
  "My Adventures in Backpacking",
  "The Hidden Costs of Productivity"
];

const STORY_SUBTITLES = [
  "Lessons learned after six months of building.",
  "A journey through ambition and uncertainty.",
  "Exploring the future of artificial intelligence.",
  "Small habits that create massive results.",
  "What I wish I knew before starting.",
  "A deep dive into the unknown.",
  "Practical advice for everyday life.",
  "Reflections on a changing industry.",
  "Finding clarity amidst the chaos.",
  "An insider's perspective."
];

const INTRO_PARAGRAPHS = [
  "Have you ever stopped to consider how quickly the world is changing? It feels like just yesterday we were relying on technologies that now seem archaic. In this piece, I want to explore not just the tools we use, but the fundamental shifts in how we approach our daily work and lives. The journey hasn't always been easy, but the lessons learned are invaluable.",
  "When I first started out, I had no idea what I was doing. I was stumbling in the dark, trying to piece together a puzzle without looking at the picture on the box. But over time, through trial and error, I started to notice patterns. These patterns eventually became principles, and those principles have guided me ever since.",
  "There is a certain magic in starting something new. The blank page, the empty canvas, the new project repository—they all represent infinite potential. Yet, the hardest part is often just taking that first step. I want to share my experience of taking that leap of faith and what I discovered on the other side.",
  "We live in an age of constant distraction. Notifications, emails, and infinite feeds compete for our attention every second of the day. Reclaiming our focus is perhaps the most important skill of the 21st century. This is the story of how I disconnected to reconnect with what truly matters.",
  "The line between science fiction and reality is blurring faster than we ever imagined. What was once relegated to novels and movies is now unfolding in our living rooms and workplaces. As we navigate this brave new world, it's crucial to examine the ethical and practical implications of the tools we are building."
];

const BODY_PARAGRAPHS = [
  "One of the biggest misconceptions is that success happens overnight. In reality, it's the result of compound interest applied to daily habits. Every small decision you make, every hour you dedicate to practicing your craft, adds up. The overnight success story is almost always a myth, obscuring years of quiet, unglamorous hard work.",
  "Let's break this down into actionable steps. First, you need to identify your core objective. What is the one thing that, if achieved, would make everything else easier or unnecessary? Once you have that clarity, you can begin to align your daily actions with your long-term goals. It sounds simple, but maintaining that focus requires immense discipline.",
  "I remember a specific moment when everything just clicked. I was struggling with a complex problem for days, feeling completely stuck. Then, I took a step back, went for a walk, and stopped forcing the solution. The answer came to me not when I was staring at the screen, but when I allowed my mind to wander. It taught me the importance of giving our brains space to process information.",
  "Collaboration is often messy. It requires communication, empathy, and the willingness to compromise. But when a team truly clicks, the output is far greater than the sum of its parts. It's about finding people whose strengths complement your weaknesses and building a culture of psychological safety where ideas can be freely exchanged.",
  "The data tells a compelling story. When we look at the trends over the past decade, a clear pattern emerges. The companies and individuals that thrive are those who remain adaptable. They don't just react to change; they anticipate it. They are willing to tear down their own successful models to build something better."
];

const CONCLUSION_PARAGRAPHS = [
  "In the end, the journey is just as important as the destination. We spend so much time fixating on the end goal that we forget to appreciate the growth happening along the way. I hope these insights help you on your own path, whatever that may be. Remember to stay curious and keep pushing the boundaries of what you think is possible.",
  "To sum up, the landscape is constantly shifting, but the fundamental principles remain the same. By focusing on consistency, continuous learning, and clear communication, we can navigate even the most uncertain times. Thank you for reading, and I'd love to hear your thoughts on this topic in the comments below.",
  "This is just the beginning. As we continue to explore these concepts, new challenges and opportunities will inevitably arise. The key is to approach them with an open mind and a willingness to adapt. The future belongs to those who are prepared to embrace change rather than fear it.",
  "Ultimately, the choice is ours. We can either be passive consumers of the world around us, or active creators shaping its future. I encourage you to take these ideas, apply them to your own work, and see what happens. The results might just surprise you.",
  "Looking back, I wouldn't change a thing. The failures were just as valuable as the successes, perhaps even more so. They provided the necessary friction for growth. So, embrace the struggle, trust the process, and keep moving forward. The best is yet to come."
];

const LIST_ITEMS = [
  "Focus on the fundamentals before diving into advanced topics.",
  "Build a consistent routine that prioritizes deep work.",
  "Don't be afraid to ask for help when you're stuck.",
  "Read extensively, both within and outside your field.",
  "Take time to reflect on your progress and adjust your strategy.",
  "Embrace failure as a critical component of learning.",
  "Cultivate a network of supportive and inspiring peers.",
  "Prioritize mental and physical health above all else."
];

const QUOTES = [
  "The only way to do great work is to love what you do.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Innovation distinguishes between a leader and a follower.",
  "The future belongs to those who learn more skills and combine them in creative ways.",
  "Success is stumbling from failure to failure with no loss of enthusiasm."
];

const HEADINGS = [
  "The Initial Spark",
  "Navigating the Challenges",
  "A Shift in Perspective",
  "The Core Principles",
  "Looking Ahead",
  "Understanding the Basics",
  "Advanced Techniques",
  "The Turning Point",
  "Lessons Learned",
  "Practical Applications"
];

const COMMENT_TEMPLATES = [
  "This was incredibly inspiring.",
  "I never thought about it this way.",
  "Excellent explanation!",
  "The ending completely surprised me.",
  "I would love a part two.",
  "One of the best articles I've read this week.",
  "I disagree with the third point, but interesting perspective.",
  "Thanks for sharing your experience.",
  "This is exactly what I needed to read today.",
  "Well written and very insightful.",
  "Could you elaborate more on the second section?",
  "Fascinating read, thanks for posting this.",
  "I'm sharing this with my team right now."
];

function generateEnglishMarkdown(genre: string) {
  let content = '';
  
  // Introduction
  content += `${faker.helpers.arrayElement(INTRO_PARAGRAPHS)}\n\n`;
  
  const numSections = faker.number.int({ min: 3, max: 6 });
  
  for (let i = 0; i < numSections; i++) {
    // Heading
    content += `## ${faker.helpers.arrayElement(HEADINGS)}\n\n`;
    
    // 1-3 body paragraphs
    const numParagraphs = faker.number.int({ min: 1, max: 3 });
    for (let p = 0; p < numParagraphs; p++) {
      content += `${faker.helpers.arrayElement(BODY_PARAGRAPHS)}\n\n`;
    }
    
    // Randomly add a list
    if (faker.datatype.boolean({ probability: 0.3 })) {
      const listItems = faker.helpers.arrayElements(LIST_ITEMS, { min: 3, max: 5 });
      listItems.forEach(item => {
        content += `- ${item}\n`;
      });
      content += '\n';
    }
    
    // Randomly add a quote
    if (faker.datatype.boolean({ probability: 0.2 })) {
      content += `> ${faker.helpers.arrayElement(QUOTES)}\n\n`;
    }
    
    // Randomly add a code block for tech genres
    if (['Programming', 'Technology', 'AI', 'Web Development', 'React', 'NextJS'].includes(genre)) {
      if (faker.datatype.boolean({ probability: 0.3 })) {
        content += "```javascript\n// An example implementation\nfunction processData(input) {\n  const result = input.filter(item => item.active);\n  return result.map(item => item.value * 2);\n}\n\nconsole.log(processData([{active: true, value: 10}]));\n```\n\n";
      }
    }
  }
  
  // Conclusion
  content += `## Conclusion\n\n`;
  content += `${faker.helpers.arrayElement(CONCLUSION_PARAGRAPHS)}\n\n`;
  
  return content;
}

async function main() {
  console.log('🌱 Starting database seed with realistic English content...');
  
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

  // Generate Users (40 to 60)
  const numUsers = faker.number.int({ min: 40, max: 60 });
  console.log(`👤 Generating ${numUsers} realistic users...`);
  
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    const useRealName = faker.datatype.boolean({ probability: 0.7 });
    const name = useRealName ? faker.helpers.arrayElement(REAL_NAMES) : `${faker.person.firstName()} ${faker.person.lastName()}`;
    const baseUsername = name.toLowerCase().replace(/[^a-z]/g, '');
    const username = `${baseUsername}${i}${faker.string.numeric(3)}`;
    
    const joinedDate = faker.date.past({ years: 1 });
    
    const user = await prisma.user.create({
      data: {
        id: faker.string.uuid(),
        name,
        username,
        email: `${username}@example.com`,
        emailVerified: true,
        image: `https://picsum.photos/seed/${faker.string.uuid()}/200/200`,
        bio: faker.helpers.arrayElement(BIOS),
        displayName: name,
        createdAt: joinedDate,
        updatedAt: joinedDate,
        favoriteGenres: faker.helpers.arrayElements(GENRES, { min: 1, max: 4 }).join(','),
      }
    });
    users.push(user);
  }

  // Generate Stories (200 to 300)
  const numStories = faker.number.int({ min: 200, max: 300 });
  console.log(`📝 Generating ${numStories} engaging stories...`);
  
  const stories = [];
  for (let i = 0; i < numStories; i++) {
    const author = faker.helpers.arrayElement(users);
    const createdAt = faker.date.between({ from: author.createdAt, to: new Date() });
    const genre = faker.helpers.arrayElement(GENRES);
    const tags = faker.helpers.arrayElements(TAGS, { min: 1, max: 4 });
    
    const title = faker.helpers.arrayElement(STORY_TITLES);
    const subtitle = faker.helpers.arrayElement(STORY_SUBTITLES);
    
    let content = `# ${title}\n\n`;
    content += generateEnglishMarkdown(genre);
    
    const story = await prisma.story.create({
      data: {
        title,
        subtitle,
        content,
        coverImage: `https://picsum.photos/seed/${faker.string.uuid()}/1200/600`,
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
  console.log('🤝 Generating followers...');
  const followsCreated = [];
  for (const user of users) {
    const numFollows = faker.number.int({ min: 5, max: 25 });
    const candidates = users.filter(u => u.id !== user.id);
    const following = faker.helpers.arrayElements(candidates, Math.min(numFollows, candidates.length));
    
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
  console.log('❤️ Generating likes...');
  let totalLikes = 0;
  for (const story of stories) {
    let numLikes = faker.number.int({ min: 0, max: 25 });
    if (faker.datatype.boolean({ probability: 0.1 })) {
      numLikes = faker.number.int({ min: 25, max: Math.min(users.length, 100) });
    }
    numLikes = Math.min(numLikes, users.length - 1);
    
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
  const numComments = faker.number.int({ min: 800, max: 1500 });
  console.log(`💬 Generating ${numComments} meaningful comments...`);
  const commentsCreated = [];

  for (let i = 0; i < numComments; i++) {
    const story = faker.helpers.arrayElement(stories);
    const author = faker.helpers.arrayElement(users);
    
    let parentId = null;
    let type: NotificationType = NotificationType.COMMENT;
    let targetUserId = story.authorId;
    
    const existingCommentsOnStory = commentsCreated.filter(c => c.storyId === story.id && !c.parentId);
    if (existingCommentsOnStory.length > 0 && faker.datatype.boolean({ probability: 0.3 })) {
      const parent = faker.helpers.arrayElement(existingCommentsOnStory);
      parentId = parent.id;
      type = NotificationType.REPLY;
      targetUserId = parent.authorId;
    }
    
    const createdAt = faker.date.between({ from: story.createdAt, to: new Date() });
    
    const content = faker.helpers.arrayElement(COMMENT_TEMPLATES);
    
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
    const numBookmarks = faker.number.int({ min: 2, max: 15 });
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
