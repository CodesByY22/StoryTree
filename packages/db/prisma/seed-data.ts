// seed-data.ts

export const GENRES = [
  'Technology', 'Programming', 'Artificial Intelligence', 'Web Development', 
  'Startup', 'Productivity', 'Psychology', 'History', 'Science', 
  'Space', 'Travel', 'Fantasy', 'Business', 'Design', 'Career'
];

export const TAGS = [
  'React', 'Next.js', 'Machine Learning', 'UX Design', 'Personal Growth',
  'Remote Work', 'Software Engineering', 'Mental Health', 'Future', 'Books',
  'Leadership', 'Writing', 'Code', 'Architecture', 'Creativity'
];

export const REAL_NAMES = [
  'Emma Carter', 'Lucas Bennett', 'Sophia Adams', 'Noah Wilson', 
  'Olivia Brooks', 'Daniel Harris', 'Ava Martinez', 'Elijah Robinson',
  'Isabella Clark', 'James Rodriguez', 'Mia Lewis', 'Benjamin Lee',
  'Amelia Walker', 'William Hall', 'Harper Allen', 'Alexander Young',
  'Evelyn King', 'Michael Wright', 'Abigail Scott', 'Ethan Green',
  'Liam Taylor', 'Charlotte Thomas', 'Mason Moore', 'Amelia Jackson',
  'Logan Martin', 'Mia White', 'Jacob Thompson', 'Harper Garcia',
  'Michael Davis', 'Evelyn Rodriguez', 'Alexander Martinez', 'Abigail Hernandez',
  'Ethan Lopez', 'Emily Gonzalez', 'Daniel Wilson', 'Elizabeth Anderson',
  'Matthew Thomas', 'Sofia Taylor', 'Aiden Moore', 'Avery Jackson',
  'Joseph Martin', 'Ella Lee', 'Jackson Perez', 'Scarlett Thompson',
  'David White', 'Grace Harris', 'Carter Sanchez', 'Chloe Clark',
  'Luke Ramirez', 'Victoria Lewis'
];

export const PROFESSIONS = [
  'Software Engineer', 'Startup Founder', 'Student', 'Professor', 
  'Travel Blogger', 'UX Designer', 'Game Developer', 'AI Researcher', 
  'Product Manager', 'Psychologist', 'Historian', 'Fantasy Author', 
  'Journalist', 'Data Scientist', 'Indie Hacker', 'DevOps Engineer',
  'Freelance Writer', 'Digital Nomad'
];

export const BIO_TEMPLATES = [
  "Building things for the web. Currently obsessed with Next.js and TypeScript.",
  "Exploring the intersection of human psychology and technology.",
  "Documenting my journey as a solo founder. Bootstrapping a SaaS to 10k MRR.",
  "Words on screen. I write about fantasy, world-building, and storytelling.",
  "AI Researcher working on large language models. Sharing thoughts on the future.",
  "Traveler, photographer, and writer. Finding the extraordinary in the mundane.",
  "Passionate about creating intuitive user experiences. UX/UI Designer by day.",
  "Uncovering forgotten stories from history. Author of 'The Silent Era'.",
  "Productivity nerd. Helping you do more in less time without burning out.",
  "Software Engineer sharing lessons learned the hard way. Code, coffee, and bugs."
];

// Content Generation Data
export const STORY_TITLES: Record<string, string[]> = {
  Technology: [
    "The Evolution of Web Architecture in 2026",
    "Why Monoliths Are Making a Comeback",
    "Serverless is Dead, Long Live Serverless",
    "Understanding the Complexities of Micro-Frontends"
  ],
  Programming: [
    "10 React Patterns You Should Stop Using",
    "A Deep Dive into TypeScript 5.9 Features",
    "Building Reliable Distributed Systems",
    "The True Cost of Technical Debt"
  ],
  'Artificial Intelligence': [
    "Beyond LLMs: What Comes Next?",
    "The Ethics of AI in Software Development",
    "How I Built a RAG Application in a Weekend",
    "Demystifying Neural Networks for Web Developers"
  ],
  Startup: [
    "Bootstrapping to $1M ARR: The Uncensored Truth",
    "Why Your First Product Will Fail (And Why That's Okay)",
    "The Psychology of Pricing SaaS Products",
    "Finding Product-Market Fit in a Crowded Market"
  ],
  Productivity: [
    "The Myth of the 10x Developer",
    "How to Actually Focus in an Age of Distraction",
    "My System for Managing 100+ Emails a Day",
    "The ROI of Doing Nothing"
  ],
  History: [
    "The Forgotten Engineers of the Apollo Mission",
    "How the Telegraph Changed Global Communication Forever",
    "Lessons from the Fall of the Roman Empire",
    "The Secret History of the Internet"
  ]
};

// Fallback arrays
export const GENERIC_TITLES = [
  "The Art of Starting Over",
  "Finding Clarity in a Noisy World",
  "Why We Fear Failure",
  "A Letter to My Younger Self",
  "The Hidden Costs of Success",
  "Navigating Uncertainty",
  "The Power of Compound Interest",
  "Redefining What Matters",
  "The Space Between Thoughts",
  "A New Perspective on Growth"
];

export const SUBTITLES = [
  "What I learned after a decade of trying.",
  "A practical guide to navigating the unexpected.",
  "The hard truth nobody tells you.",
  "Reflections on a changing landscape.",
  "How to rethink your approach and achieve more.",
  "An unconventional perspective.",
  "Breaking down the complexities into actionable steps.",
  "Why the conventional wisdom is often wrong.",
  "My personal journey through the chaos.",
  "A deep dive into the fundamentals."
];

export const HEADINGS = [
  "The Initial Spark",
  "Navigating the Challenges",
  "A Shift in Perspective",
  "The Core Principles",
  "Looking Ahead",
  "Understanding the Basics",
  "Advanced Techniques",
  "The Turning Point",
  "Lessons Learned",
  "Practical Applications",
  "The Architecture",
  "Performance Implications",
  "The Developer Experience",
  "Mental Models",
  "Historical Context"
];

// Rich Markdown Content Blocks
export const INTRO_BLOCKS = [
  "We've all been there. Staring at a blank screen, wondering where to begin. The sheer volume of information available today can be paralyzing rather than empowering. In this article, I want to cut through the noise and share a perspective that has fundamentally shifted how I approach this topic.",
  "I remember the exact moment the realization hit me. I was three days into debugging a legacy system, running on empty, when a simple pattern emerged. That pattern didn't just solve the bug; it changed my entire mental model. Today, I'm going to unpack that model for you.",
  "There is a pervasive myth in our industry that success requires endless hustle and sacrifice. We glorify the grind while ignoring the burnout. After hitting a wall last year, I decided to run an experiment. What happens if we optimize for sustainability instead of speed? The results were counterintuitive.",
  "History rarely repeats itself, but it often rhymes. When we look at the rapid technological shifts happening today, it's easy to feel overwhelmed. But by examining similar inflection points in the past, we can find a reliable compass for navigating the future.",
  "Let's be honest for a second. Most of the advice you read online is survivorship bias disguised as wisdom. People tell you what worked for them after the fact, conveniently forgetting the role of luck and timing. I want to try something different. I want to share the messy, unfiltered reality."
];

export const BODY_BLOCKS = [
  "The first step is recognizing the inherent complexity of the problem. We often reach for simple solutions, hoping to abstract away the difficult parts. But true mastery requires us to embrace the complexity. As soon as you stop fighting it and start understanding the underlying constraints, elegant solutions begin to reveal themselves.",
  "Consider the implications of this shift. When we move away from monolithic thinking, we introduce new failure modes. Distributed systems are inherently chaotic. Yet, this chaos is the price we pay for resilience. It forces us to build systems that anticipate failure rather than systems that pretend failure is impossible.",
  "I spent months trying to optimize this exact workflow. I read every book, tried every tool, and downloaded every template. It wasn't until I threw it all away and went back to pen and paper that I found clarity. The tool wasn't the problem; my reliance on the tool as a substitute for deep thinking was the problem.",
  "Let's look at the data. A recent study analyzed over ten thousand repositories and found a staggering correlation between code review velocity and defect rates. The teams that moved the fastest actually spent *more* time reviewing code, not less. They didn't skip the process; they optimized it. This directly challenges the idea that thoroughness is the enemy of speed.",
  "This is where the psychological aspect comes into play. Imposter syndrome isn't a sign that you are unqualified; it's a sign that you are operating at the edge of your competence. That edge is exactly where growth happens. If you always feel completely comfortable, you aren't pushing yourself hard enough.",
  "To put this into perspective, think about how this applies to your daily routine. It's not about making massive, sweeping changes. It's about microscopic adjustments. A one percent improvement every day compounds to a thirty-seven-fold improvement over a year. The math is simple, but the execution requires immense discipline.",
  "One critical factor that often gets overlooked is the human element. We can design the most sophisticated architectures and robust algorithms, but if the people maintaining them are burned out and disconnected, the system will eventually fail. Technology is fundamentally a human endeavor."
];

export const CODE_BLOCKS = [
  "```tsx\n// A cleaner approach to component state\nexport function UserProfile({ initialData }) {\n  const [user, setUser] = useState(initialData);\n  const [isEditing, setIsEditing] = useState(false);\n\n  const handleSave = async (newData) => {\n    setIsEditing(false);\n    setUser(newData);\n    await api.updateUser(newData);\n  };\n\n  return (\n    <div className=\"profile-card\">\n      {isEditing ? (\n        <EditForm user={user} onSave={handleSave} />\n      ) : (\n        <ProfileDisplay user={user} onEdit={() => setIsEditing(true)} />\n      )}\n    </div>\n  );\n}\n```",
  "```javascript\n// Efficiently debouncing user input\nfunction debounce(func, wait) {\n  let timeout;\n  return function executedFunction(...args) {\n    const later = () => {\n      clearTimeout(timeout);\n      func(...args);\n    };\n    clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n  };\n}\n\nconst handleSearch = debounce((query) => {\n  console.log('Searching for:', query);\n  fetchResults(query);\n}, 300);\n```",
  "```rust\n// Example of fearless concurrency in Rust\nuse std::thread;\nuse std::sync::{mpsc, Arc, Mutex};\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n    let counter = Arc::new(Mutex::new(0));\n\n    for _ in 0..10 {\n        let tx = tx.clone();\n        let counter = Arc::clone(&counter);\n        thread::spawn(move || {\n            let mut num = counter.lock().unwrap();\n            *num += 1;\n            tx.send(*num).unwrap();\n        });\n    }\n}\n```",
  "```python\n# A simple generator pattern for processing large datasets\ndef process_large_file(file_path):\n    with open(file_path, 'r') as file:\n        for line in file:\n            # Process one line at a time to save memory\n            cleaned = line.strip().lower()\n            if cleaned:\n                yield cleaned\n\n# Usage:\n# for data in process_large_file('huge_dataset.csv'):\n#     analyze(data)\n```"
];

export const CONCLUSION_BLOCKS = [
  "In conclusion, there is no silver bullet. The challenges we face are complex and nuanced, requiring equally nuanced solutions. But by returning to first principles and prioritizing sustainability over speed, we can build things that last. I'd love to hear how you are approaching these problems in your own work.",
  "As we look to the future, one thing is certain: the pace of change is only going to accelerate. Our ability to adapt, learn, and unlearn will be our most valuable asset. Stay curious, stay humble, and keep building.",
  "I'll leave you with this thought: perfect is the enemy of shipped, but shipped is the enemy of maintainable. Finding that delicate balance is the true art of our craft. Thank you for reading.",
  "The journey doesn't end here. It's an iterative process of failing, learning, and trying again. If you found this helpful, feel free to share it with someone who might benefit from it. Until next time.",
  "Ultimately, the tools will change, the frameworks will evolve, and the trends will fade. But the fundamental skills of clear thinking, effective communication, and empathy will always remain relevant. Focus on those, and you'll be fine."
];

// Meaningful Comments
export const COMMENT_TEMPLATES = [
  // Agreement / Insight
  "I completely agree with your point about complexity. We often over-engineer solutions when a simple approach would suffice. Great read!",
  "This is a fantastic breakdown. The section on [HEADING] really resonated with me. I've been struggling with that exact issue.",
  "I've bookmarked this to share with my team on Monday. The analogy you used perfectly captures the problem.",
  "Beautifully written. I especially loved the conclusion. It's a great reminder to focus on the fundamentals.",
  "This is exactly what I needed to read today. Thanks for putting this into words.",
  
  // Disagreement / Discussion
  "I see your point, but I have to disagree slightly regarding the speed vs. maintainability debate. Sometimes you just have to ship to survive.",
  "Interesting perspective! However, in my experience working with enterprise systems, that approach doesn't always scale well.",
  "I'm not sure I buy the premise that this is a new phenomenon. Hasn't this always been a problem in our industry?",
  "While I agree in theory, the practical implementation seems much harder than you describe here.",
  
  // Questions
  "Great article! I have a question though: how would this apply to a much smaller team with limited resources?",
  "Could you elaborate a bit more on the second point? I'm not entirely sure I understand the mechanism behind it.",
  "Have you considered how this approach might impact performance in edge cases?",
  "What tools would you recommend for someone just starting out with this workflow?",
  
  // Shared Experience
  "This reminds me of a project I worked on back in 2021. We made the exact same mistake and it cost us months of refactoring.",
  "I tried implementing a similar system last year, but we ran into major bottlenecks with database locks. Did you experience anything similar?",
  "My team just transitioned to this architecture, and the initial learning curve was steep, but it's paying off now.",
  "As someone who transitioned from a different field, I can completely relate to the imposter syndrome you mentioned."
];
