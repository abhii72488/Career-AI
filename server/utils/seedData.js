export const defaultDSAProblems = [
  {
    id: 'dsa_1',
    title: 'Two Sum',
    slug: 'two-sum',
    category: 'Arrays',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].' }
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
    starterCode: {
      javascript: `function solution(nums, target) {\n  const map = new Map();\n  for(let i=0; i<nums.length; i++) {\n    const diff = target - nums[i];\n    if(map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
      java: `class Solution {\n  public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n      int diff = target - nums[i];\n      if (map.containsKey(diff)) return new int[] { map.get(diff), i };\n      map.put(nums[i], i);\n    }\n    return new int[]{};\n  }\n}`,
      python: `def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []`
    },
    testCases: [
      { input: '[[2,7,11,15], 9]', expectedOutput: '[0,1]' },
      { input: '[[3,2,4], 6]', expectedOutput: '[1,2]' },
      { input: '[[3,3], 6]', expectedOutput: '[0,1]' }
    ],
    explanation: 'Use a Hash Table to store the complement of each number. This achieves an optimal O(N) time complexity and O(N) space complexity.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)'
  },
  {
    id: 'dsa_2',
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    category: 'Linked List',
    difficulty: 'Easy',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]', explanation: 'Nodes 1->2->3->4->5 reversed to 5->4->3->2->1' }
    ],
    constraints: ['Number of nodes is in range [0, 5000]', '-5000 <= Node.val <= 5000'],
    starterCode: {
      javascript: `function reverseLinkedList(head) {\n  let prev = null;\n  let curr = head;\n  while(curr) {\n    let next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}`
    },
    testCases: [
      { input: '[1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]' }
    ],
    explanation: 'Iterate through the list keeping track of previous, current, and next pointers.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'dsa_3',
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    category: 'Stack',
    difficulty: 'Easy',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    examples: [
      { input: 's = "()[]{}"', output: 'true', explanation: 'All open brackets are closed by the same type of brackets in correct order.' }
    ],
    constraints: ['1 <= s.length <= 10^4'],
    starterCode: {
      javascript: `function solution(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for(let char of s) {\n    if(char in map) {\n      if(stack.pop() !== map[char]) return false;\n    } else {\n      stack.push(char);\n    }\n  }\n  return stack.length === 0;\n}`
    },
    testCases: [
      { input: '"()[]{}"', expectedOutput: 'true' },
      { input: '"(]"', expectedOutput: 'false' }
    ],
    explanation: 'Use a stack to keep track of expected closing brackets in Last-In-First-Out (LIFO) order.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)'
  },
  {
    id: 'dsa_4',
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    category: 'Sliding Window',
    difficulty: 'Medium',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with length of 3.' }
    ],
    constraints: ['0 <= s.length <= 5 * 10^4'],
    starterCode: {
      javascript: `function solution(s) {\n  let set = new Set();\n  let left = 0, max = 0;\n  for(let right=0; right<s.length; right++) {\n    while(set.has(s[right])) {\n      set.delete(s[left++]);\n    }\n    set.add(s[right]);\n    max = Math.max(max, right - left + 1);\n  }\n  return max;\n}`
    },
    testCases: [
      { input: '"abcabcbb"', expectedOutput: '3' },
      { input: '"bbbbb"', expectedOutput: '1' }
    ],
    explanation: 'Use two pointers sliding window approach combined with a Set for O(N) linear runtime.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)'
  },
  {
    id: 'dsa_5',
    title: 'Binary Search',
    slug: 'binary-search',
    category: 'Searching',
    difficulty: 'Easy',
    description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.',
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4' }
    ],
    constraints: ['1 <= nums.length <= 10^4', 'nums is sorted in ascending order'],
    starterCode: {
      javascript: `function solution(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while(left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if(nums[mid] === target) return mid;\n    else if(nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`
    },
    testCases: [
      { input: '[[-1,0,3,5,9,12], 9]', expectedOutput: '4' },
      { input: '[[-1,0,3,5,9,12], 2]', expectedOutput: '-1' }
    ],
    explanation: 'Repeatedly divide the search interval in half. Achieves logarithmic O(log N) runtime.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'dsa_6',
    title: 'Container With Most Water',
    slug: 'container-with-most-water',
    category: 'Two Pointers',
    difficulty: 'Medium',
    description: 'You are given an integer array height of length n. Find two lines that together with the x-axis form a container, such that the container contains the most water.',
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'The max area is formed between index 1 and index 8 with height 7 and width 7 = 49.' }
    ],
    constraints: ['n == height.length', '2 <= n <= 10^5'],
    starterCode: {
      javascript: `function solution(height) {\n  let left = 0, right = height.length - 1;\n  let maxArea = 0;\n  while(left < right) {\n    let currentArea = Math.min(height[left], height[right]) * (right - left);\n    maxArea = Math.max(maxArea, currentArea);\n    if(height[left] < height[right]) left++;\n    else right--;\n  }\n  return maxArea;\n}`
    },
    testCases: [
      { input: '[1,8,6,2,5,4,8,3,7]', expectedOutput: '49' },
      { input: '[1,1]', expectedOutput: '1' }
    ],
    explanation: 'Use two pointers starting at opposite ends. Move the pointer with the smaller height inward to maximize width and area.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)'
  }
];

export const defaultAptitudeQuestions = [
  {
    id: 'apt_1',
    category: 'Quantitative',
    topic: 'Time & Work',
    difficulty: 'Medium',
    question: 'A can complete a task in 12 days and B can complete the same task in 18 days. If they work together, in how many days will the work be completed?',
    options: ['7.2 days', '6.5 days', '8 days', '7.5 days'],
    correctIndex: 0,
    explanation: "A's 1-day work = 1/12. B's 1-day work = 1/18. Together 1-day work = 1/12 + 1/18 = (3 + 2)/36 = 5/36. Total days = 36/5 = 7.2 days.",
    companyTag: ['TCS', 'Infosys', 'Wipro']
  },
  {
    id: 'apt_2',
    category: 'Quantitative',
    topic: 'Profit & Loss',
    difficulty: 'Easy',
    question: 'An item is purchased for Rs. 800 and sold for Rs. 1000. Find the profit percentage.',
    options: ['20%', '25%', '30%', '15%'],
    correctIndex: 1,
    explanation: 'Profit = Selling Price - Cost Price = 1000 - 800 = 200. Profit % = (200 / 800) * 100 = 25%.',
    companyTag: ['Cognizant', 'Accenture']
  },
  {
    id: 'apt_3',
    category: 'Reasoning',
    topic: 'Series',
    difficulty: 'Medium',
    question: 'Find the next number in the series: 3, 7, 15, 31, 63, ?',
    options: ['127', '125', '129', '120'],
    correctIndex: 0,
    explanation: 'Pattern: Each number is multiplied by 2 and added 1. (3*2+1=7, 7*2+1=15, 15*2+1=31, 31*2+1=63, 63*2+1=127).',
    companyTag: ['TCS', 'Capgemini']
  },
  {
    id: 'apt_4',
    category: 'English',
    topic: 'Vocabulary',
    difficulty: 'Easy',
    question: 'Choose the synonym for "METICULOUS":',
    options: ['Careless', 'Painstaking & Careful', 'Hasty', 'Rough'],
    correctIndex: 1,
    explanation: 'Meticulous means showing great attention to detail; very careful and precise.',
    companyTag: ['Deloitte', 'Amazon']
  },
  {
    id: 'apt_5',
    category: 'Quantitative',
    topic: 'Speed & Distance',
    difficulty: 'Medium',
    question: 'A train 150 meters long passes a telegraph pole in 10 seconds. What is the speed of the train in km/hr?',
    options: ['48 km/hr', '54 km/hr', '60 km/hr', '72 km/hr'],
    correctIndex: 1,
    explanation: 'Speed in m/s = Distance / Time = 150 / 10 = 15 m/s. Speed in km/hr = 15 * (18/5) = 54 km/hr.',
    companyTag: ['Wipro', 'TCS']
  },
  {
    id: 'apt_6',
    category: 'Reasoning',
    topic: 'Syllogism',
    difficulty: 'Medium',
    question: 'Statements: All dogs are mammals. All mammals are animals. Conclusion: (I) All dogs are animals. (II) Some animals are dogs.',
    options: ['Only I follows', 'Only II follows', 'Both I and II follow', 'Neither follows'],
    correctIndex: 2,
    explanation: 'Since Dogs ⊂ Mammals ⊂ Animals, all dogs are animals (I follows), and since dogs exist, some animals are dogs (II follows).',
    companyTag: ['Infosys', 'Accenture']
  }
];

export const defaultSQLProblems = [
  {
    id: 'sql_1',
    title: 'Highest Salary in Department',
    topic: 'GROUP BY & JOIN',
    difficulty: 'Medium',
    description: 'Write an SQL query to find the employee with the highest salary in each department.',
    schemaDDL: `
      CREATE TABLE departments (id INT PRIMARY KEY, name VARCHAR(50));
      CREATE TABLE employees (id INT PRIMARY KEY, name VARCHAR(50), salary INT, dept_id INT);
    `,
    sampleDataDML: `
      INSERT INTO departments VALUES (1, 'Engineering'), (2, 'Sales');
      INSERT INTO employees VALUES (101, 'Abhishek', 95000, 1), (102, 'Priya', 88000, 1), (103, 'Rohan', 75000, 2);
    `,
    starterQuery: `SELECT e.name AS employee, d.name AS department, e.salary\nFROM employees e\nJOIN departments d ON e.dept_id = d.id;`,
    solutionQuery: `SELECT d.name AS department, e.name AS employee, e.salary\nFROM employees e\nJOIN departments d ON e.dept_id = d.id\nWHERE e.salary = (SELECT MAX(salary) FROM employees WHERE dept_id = e.dept_id);`,
    explanation: 'Use a correlated subquery inside the WHERE clause to match maximum salary per department.'
  },
  {
    id: 'sql_2',
    title: 'Select High Earning Employees',
    topic: 'WHERE & SELECT',
    difficulty: 'Easy',
    description: 'Find all employees who earn more than 80,000 per year.',
    schemaDDL: `CREATE TABLE employees (id INT PRIMARY KEY, name VARCHAR(50), salary INT);`,
    sampleDataDML: `INSERT INTO employees VALUES (1, 'Amit', 85000), (2, 'Sneha', 62000), (3, 'Karan', 92000);`,
    starterQuery: `SELECT * FROM employees;`,
    solutionQuery: `SELECT name, salary FROM employees WHERE salary > 80000;`,
    explanation: 'Filter records using simple WHERE salary > 80000 constraint.'
  },
  {
    id: 'sql_3',
    title: 'Customers Who Never Order',
    topic: 'LEFT JOIN & NULL Check',
    difficulty: 'Medium',
    description: 'Write an SQL query to report all customers who never placed any orders.',
    schemaDDL: `
      CREATE TABLE customers (id INT PRIMARY KEY, name VARCHAR(50));
      CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, amount INT);
    `,
    sampleDataDML: `
      INSERT INTO customers VALUES (1, 'Alice'), (2, 'Bob'), (3, 'Charlie'), (4, 'David');
      INSERT INTO orders VALUES (101, 1, 500), (102, 3, 1200);
    `,
    starterQuery: `SELECT * FROM customers;`,
    solutionQuery: `SELECT c.name AS Customers\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nWHERE o.id IS NULL;`,
    explanation: 'Use a LEFT JOIN between customers and orders, filtering for records where the order ID is NULL.'
  },
  {
    id: 'sql_4',
    title: 'Second Highest Salary',
    topic: 'Subquery & LIMIT',
    difficulty: 'Medium',
    description: 'Find the second highest salary from the employees table. If there is no second highest salary, return NULL.',
    schemaDDL: `CREATE TABLE employees (id INT PRIMARY KEY, salary INT);`,
    sampleDataDML: `INSERT INTO employees VALUES (1, 100), (2, 200), (3, 300);`,
    starterQuery: `SELECT MAX(salary) FROM employees;`,
    solutionQuery: `SELECT MAX(salary) AS SecondHighestSalary\nFROM employees\nWHERE salary < (SELECT MAX(salary) FROM employees);`,
    explanation: 'Select the maximum salary among all salaries that are strictly less than the overall maximum salary.'
  }
];

export const defaultCompanies = [
  {
    id: 'comp_tcs',
    name: 'TCS (Tata Consultancy Services)',
    slug: 'tcs',
    logo: '🏢',
    category: 'IT Services Leader',
    eligibility: {
      minCgpa: 6.0,
      allowedBranches: ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil'],
      maxBacklogs: 1
    },
    selectionStages: [
      { stageName: 'NQT Online Assessment', description: 'Foundation + Advanced Aptitude, Reasoning, Verbal, and 2 Coding Questions.', duration: '165 mins', cutoffHint: '70% overall' },
      { stageName: 'Technical Interview', description: 'DSA, SQL, OOPs, DBMS, Project Deep Dive.', duration: '30-45 mins', cutoffHint: 'Good communication + project clarity' },
      { stageName: 'Managerial & HR Round', description: 'Situational judgment, relocation willingness, shift flexibility.', duration: '20 mins', cutoffHint: 'High confidence & positive attitude' }
    ],
    importantTopics: {
      aptitude: ['Time & Work', 'Percentages', 'Data Interpretation', 'Coding-Decoding'],
      coding: ['Array Manipulations', 'String Pattern Matching', 'Matrix Operations'],
      sql: ['JOINs', 'GROUP BY & HAVING', 'Subqueries'],
      technical: ['OOP Principles', 'DBMS Normalization', 'React Virtual DOM', 'Java Garbage Collection'],
      hr: ['Tell me about yourself', 'Why TCS?', 'Strengths and Weaknesses']
    },
    dayPlan: [
      { day: 1, focus: 'NQT Aptitude & Quantitative Formulas', tasks: ['Solve 15 Time & Work questions', 'Revise Profit & Loss tricks'] },
      { day: 2, focus: 'Array & String Coding Questions', tasks: ['Solve Two Sum', 'Solve Longest Substring'] },
      { day: 3, focus: 'SQL Fundamentals & JOINs', tasks: ['Complete SQL JOIN practice', 'Practice GROUP BY queries'] },
      { day: 4, focus: 'Technical Core Revision', tasks: ['Revise OOPs concepts in Java/C++', 'Prepare 2-minute project explanation'] },
      { day: 5, focus: 'Mock Interview & HR Practice', tasks: ['Conduct 1 TCS AI Mock Interview session', 'Review weak communication areas'] }
    ]
  },
  {
    id: 'comp_infosys',
    name: 'Infosys',
    slug: 'infosys',
    logo: '🔷',
    category: 'IT Services',
    eligibility: { minCgpa: 6.5, allowedBranches: ['All Engineering Branches'], maxBacklogs: 0 },
    selectionStages: [
      { stageName: 'Online Test (InfyTQ / HackWithInfy)', description: 'Reasoning, Mathematical Ability, Verbal, Pseudocode, Puzzle solving.', duration: '100 mins', cutoffHint: '65%' },
      { stageName: 'Technical + HR Combined Interview', description: 'Project architecture, SQL, Pseudocode debugging, HR questions.', duration: '30 mins', cutoffHint: 'Strong CS fundamentals' }
    ],
    importantTopics: {
      aptitude: ['Permutation & Combination', 'Probability', 'Syllogism'],
      coding: ['Recursion', 'Linked List', 'Searching & Sorting'],
      sql: ['SELECT, WHERE, ORDER BY', 'Aggregate functions'],
      technical: ['Data Structures', 'Operating Systems basics', 'Software Engineering lifecycle'],
      hr: ['Handling failure', 'Team conflict resolution']
    },
    dayPlan: [
      { day: 1, focus: 'Logical Reasoning & Puzzles', tasks: ['Practice Syllogism & Blood Relations', 'Solve 5 Infosys puzzle questions'] },
      { day: 2, focus: 'Recursion & Basic DSA', tasks: ['Practice 3 Linked List problems', 'Revise Binary Search'] },
      { day: 3, focus: 'SQL & Database Concepts', tasks: ['Solve Second Highest Salary', 'Revise ACID Properties'] }
    ]
  },
  {
    id: 'comp_amazon',
    name: 'Amazon',
    slug: 'amazon',
    logo: '📦',
    category: 'Product & Cloud Giant',
    eligibility: { minCgpa: 7.0, allowedBranches: ['CSE', 'IT', 'ECE'], maxBacklogs: 0 },
    selectionStages: [
      { stageName: 'Online Assessment (OA)', description: '2 Medium/Hard DSA Coding Questions + Work Simulation + Leadership Principles.', duration: '120 mins', cutoffHint: '100% test cases pass' },
      { stageName: 'Technical Interview Rounds (3 Rounds)', description: 'Deep DSA (Trees, Graphs, DP), System Design basics, Amazon Leadership Principles.', duration: '60 mins each', cutoffHint: 'Flawless code & STAR method' }
    ],
    importantTopics: {
      aptitude: ['Work Simulation scenarios', 'Behavioral STAR stories'],
      coding: ['Trees & Graphs (BFS/DFS)', 'Dynamic Programming', 'Heaps & Priority Queue'],
      sql: ['Window functions', 'Complex Aggregations'],
      technical: ['System Design', 'Object Oriented Design (OOD)', 'Memory Management'],
      hr: ['16 Amazon Leadership Principles stories with STAR format']
    },
    dayPlan: [
      { day: 1, focus: 'Trees & Graphs Deep Dive', tasks: ['Solve Binary Tree Level Order Traversal', 'Solve Container With Most Water'] },
      { day: 2, focus: 'Leadership Principles Preparation', tasks: ['Draft 4 STAR stories for Customer Obsession and Bias for Action'] }
    ]
  },
  {
    id: 'comp_google',
    name: 'Google',
    slug: 'google',
    logo: '🌐',
    category: 'Tech Leader',
    eligibility: { minCgpa: 7.5, allowedBranches: ['CSE', 'IT', 'ECE'], maxBacklogs: 0 },
    selectionStages: [
      { stageName: 'Coding Sample Test (Google Kickstart / OA)', description: '2 Complex algorithmic problems focusing on data structures and optimization.', duration: '90 mins', cutoffHint: 'High efficiency' },
      { stageName: '4 Technical Coding Rounds', description: 'Advanced DSA, Graphs, Dynamic Programming, System Scalability.', duration: '45 mins each', cutoffHint: 'Optimal O(N) / O(log N)' }
    ],
    importantTopics: {
      aptitude: ['Algorithmic Thinking', 'Probability & Logic'],
      coding: ['Graph Algorithms', 'Dynamic Programming', 'Segment Trees'],
      sql: ['Complex Joins', 'Analytical Queries'],
      technical: ['System Architecture', 'Concurrency & Multithreading', 'Memory Management'],
      hr: ['Googliness & Leadership', 'Problem-solving approach']
    },
    dayPlan: [
      { day: 1, focus: 'Graph Algorithms (BFS/DFS/Dijkstra)', tasks: ['Solve Graph Traversal problems', 'Practice Topological Sort'] },
      { day: 2, focus: 'Dynamic Programming Optimization', tasks: ['Solve Knapsack & Subsequence problems'] }
    ]
  }
];

