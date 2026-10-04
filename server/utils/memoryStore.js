import bcrypt from 'bcryptjs';

// Initial default demo student user
const defaultHashedPassword = bcrypt.hashSync('Password123!', 10);

export const memoryStore = {
  users: [
    {
      _id: 'user_demo_101',
      id: 'user_demo_101',
      name: 'Abhishek Chauhan',
      email: 'abhishek@careerai.dev',
      password: defaultHashedPassword,
      role: 'USER',
      college: 'Delhi Technological University',
      degree: 'B.Tech',
      branch: 'Computer Science & Engineering',
      graduationYear: 2026,
      skills: ['Java', 'React', 'Node.js', 'MongoDB', 'Basic DSA', 'SQL'],
      targetRole: 'Software Developer',
      targetCompany: 'TCS',
      experienceLevel: 'Fresher',
      dailyHours: 4,
      targetDate: '2026-12-01',
      preferredCompanies: ['TCS', 'Infosys', 'Amazon', 'Deloitte'],
      readinessScore: 72,
      scores: {
        dsa: 65,
        aptitude: 80,
        sql: 55,
        development: 85,
        communication: 50,
        interview: 60,
        resume: 75
      },
      streak: {
        current: 5,
        longest: 12,
        lastActive: new Date().toISOString()
      },
      createdAt: new Date().toISOString()
    },
    {
      _id: 'admin_101',
      id: 'admin_101',
      name: 'CareerAI Administrator',
      email: 'admin@careerai.dev',
      password: defaultHashedPassword,
      role: 'ADMIN',
      college: 'CareerAI HQ',
      degree: 'M.Tech',
      branch: 'Computer Science',
      graduationYear: 2024,
      skills: ['Fullstack', 'AI', 'System Architecture'],
      targetRole: 'System Admin',
      readinessScore: 100,
      createdAt: new Date().toISOString()
    }
  ],
  resumes: {},
  jobMatches: {},
  dsaSubmissions: [],
  aptitudeAttempts: [],
  sqlAttempts: [],
  interviews: [],
  documents: [
    {
      id: 'doc_preseed_1',
      userId: 'user_demo_101',
      title: 'TCS Digital & Prime Technical Interview Questions 2026',
      type: 'Interview Experience',
      chunkCount: 2,
      characterCount: 1200,
      createdAt: new Date().toISOString()
    },
    {
      id: 'doc_preseed_2',
      userId: 'user_demo_101',
      title: 'Core Computer Science & Database Indexing Guide',
      type: 'Study Material',
      chunkCount: 2,
      characterCount: 1400,
      createdAt: new Date().toISOString()
    }
  ],
  documentChunks: [
    {
      id: 'chunk_preseed_1_1',
      documentId: 'doc_preseed_1',
      userId: 'user_demo_101',
      documentTitle: 'TCS Digital & Prime Technical Interview Questions 2026',
      documentType: 'Interview Experience',
      chunkIndex: 1,
      content: 'TCS Technical Interview focus areas: 1. Explain OOP concepts with real examples (Abstraction vs Encapsulation). 2. How does garbage collection work in Java? 3. Difference between INNER JOIN and LEFT JOIN in SQL with syntax examples. 4. Reverse a Linked List and find cycle in graph using DFS.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'chunk_preseed_1_2',
      documentId: 'doc_preseed_1',
      userId: 'user_demo_101',
      documentTitle: 'TCS Digital & Prime Technical Interview Questions 2026',
      documentType: 'Interview Experience',
      chunkIndex: 2,
      content: 'TCS Managerial & HR Round Questions: 1. Tell me about your major college project and your individual role. 2. Are you open to night shifts or relocation to Bangalore/Pune? 3. What would you do if a team member misses a project milestone deadline?',
      createdAt: new Date().toISOString()
    },
    {
      id: 'chunk_preseed_2_1',
      documentId: 'doc_preseed_2',
      userId: 'user_demo_101',
      documentTitle: 'Core Computer Science & Database Indexing Guide',
      documentType: 'Study Material',
      chunkIndex: 1,
      content: 'Database Indexing: B-Tree indexes speed up SELECT query lookup times from O(N) linear scans to O(log N) tree traversals. Clustered index sorts physical table rows, whereas non-clustered index creates a separate index structure pointing to table addresses.',
      createdAt: new Date().toISOString()
    }
  ],
  studyTasks: [
    { id: 't1', userId: 'user_demo_101', title: 'Solve 2 DSA Array Problems', category: 'DSA', duration: '60 mins', completed: true, date: new Date().toISOString().split('T')[0] },
    { id: 't2', userId: 'user_demo_101', title: 'Complete SQL Practice on JOINs', category: 'SQL', duration: '45 mins', completed: false, date: new Date().toISOString().split('T')[0] },
    { id: 't3', userId: 'user_demo_101', title: 'Practice 5 Aptitude Time & Work questions', category: 'Aptitude', duration: '30 mins', completed: false, date: new Date().toISOString().split('T')[0] },
    { id: 't4', userId: 'user_demo_101', title: 'Complete 1 Mock Interview session on TCS', category: 'Interview', duration: '30 mins', completed: false, date: new Date().toISOString().split('T')[0] }
  ],
  recentActivities: [
    { id: 'a1', userId: 'user_demo_101', type: 'Resume Analyzed', title: 'CareerAI Resume Compatibility Score generated: 78/100', timestamp: '2 hours ago' },
    { id: 'a2', userId: 'user_demo_101', type: 'DSA Problem Solved', title: 'Two Sum (Easy) - Java', timestamp: '5 hours ago' },
    { id: 'a3', userId: 'user_demo_101', type: 'Mock Interview Completed', title: 'TCS Technical Round 1 - Score 72%', timestamp: 'Yesterday' }
  ]
};

