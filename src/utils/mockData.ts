export const mockUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    title: 'Full Stack Developer',
    followers: 1250,
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://i.pravatar.cc/150?img=2',
    title: 'Data Scientist',
    followers: 2100,
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'https://i.pravatar.cc/150?img=3',
    title: 'UI/UX Designer',
    followers: 890,
  },
  {
    id: '4',
    name: 'David Kumar',
    avatar: 'https://i.pravatar.cc/150?img=4',
    title: 'Product Manager',
    followers: 1500,
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    avatar: 'https://i.pravatar.cc/150?img=5',
    title: 'AI Researcher',
    followers: 3200,
  },
  {
    id: '6',
    name: 'James Rodriguez',
    avatar: 'https://i.pravatar.cc/150?img=6',
    title: 'Backend Engineer',
    followers: 980,
  },
  {
    id: '7',
    name: 'Sophia Lee',
    avatar: 'https://i.pravatar.cc/150?img=7',
    title: 'DevOps Engineer',
    followers: 1890,
  },
  {
    id: '8',
    name: 'Ryan Thompson',
    avatar: 'https://i.pravatar.cc/150?img=8',
    title: 'Mobile Developer',
    followers: 1450,
  },
  {
    id: '9',
    name: 'Olivia Martinez',
    avatar: 'https://i.pravatar.cc/150?img=9',
    title: 'ML Engineer',
    followers: 2800,
  },
  {
    id: '10',
    name: 'Daniel Kim',
    avatar: 'https://i.pravatar.cc/150?img=10',
    title: 'Cloud Architect',
    followers: 2300,
  },
];

export const mockPosts = [
  {
    id: '1',
    user: mockUsers[0],
    content:
      'Just completed the Advanced React Patterns course! The hooks deep dive was mind-blowing. Highly recommend to anyone looking to level up their React skills. 🚀',
    timestamp: '2 hours ago',
    likes: 45,
    comments: 12,
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
  },
  {
    id: '2',
    user: mockUsers[1],
    content:
      'Sharing my notes on Machine Learning fundamentals. Hope this helps someone starting their ML journey!',
    timestamp: '5 hours ago',
    likes: 128,
    comments: 34,
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
  },
  {
    id: '3',
    user: mockUsers[2],
    content:
      'Design tip of the day: Always maintain consistent spacing in your layouts. It makes a huge difference in the overall user experience.',
    timestamp: '1 day ago',
    likes: 89,
    comments: 18,
  },
];

export const mockVideos = [
  {
    id: '1',
    title: 'Introduction to Python Programming',
    instructor: 'Sarah Johnson',
    thumbnail:
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
    duration: '45:30',
    views: '12.5K',
    category: 'Programming',
  },
  {
    id: '2',
    title: 'Advanced JavaScript Concepts',
    instructor: 'Michael Chen',
    thumbnail:
      'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop',
    duration: '1:20:15',
    views: '8.2K',
    category: 'Web Development',
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    instructor: 'Emma Wilson',
    thumbnail:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    duration: '38:45',
    views: '15.3K',
    category: 'Design',
  },
  {
    id: '4',
    title: 'Machine Learning Basics',
    instructor: 'David Kumar',
    thumbnail:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
    duration: '52:10',
    views: '20.1K',
    category: 'AI & ML',
  },
];

export const mockMentors = [
  {
    id: '1',
    name: 'Dr. James Martinez',
    avatar: 'https://i.pravatar.cc/150?img=8',
    title: 'Senior Software Architect',
    expertise: ['System Design', 'Cloud Architecture', 'Microservices'],
    experience: '15+ years',
    rating: 4.9,
    students: 450,
    rate: '$150',
  },
  {
    id: '2',
    name: 'Prof. Anna Schmidt',
    avatar: 'https://i.pravatar.cc/150?img=9',
    title: 'AI/ML Researcher',
    expertise: ['Machine Learning', 'Deep Learning', 'NLP'],
    experience: '12+ years',
    rating: 4.8,
    students: 320,
    rate: '$120',
  },
  {
    id: '3',
    name: 'Alex Thompson',
    avatar: 'https://i.pravatar.cc/150?img=10',
    title: 'Product Design Lead',
    expertise: ['UI/UX', 'Product Strategy', 'User Research'],
    experience: '10+ years',
    rating: 4.9,
    students: 280,
    rate: '$100',
  },
];

export const mockCourses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    instructor: 'Sarah Johnson',
    thumbnail:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    price: '$49.99',
    rating: 4.7,
    students: 12450,
    duration: '40 hours',
    level: 'Beginner',
  },
  {
    id: '2',
    title: 'Advanced React & Redux',
    instructor: 'Michael Chen',
    thumbnail:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    price: '$79.99',
    rating: 4.8,
    students: 8920,
    duration: '30 hours',
    level: 'Advanced',
  },
  {
    id: '3',
    title: 'Data Science Masterclass',
    instructor: 'David Kumar',
    thumbnail:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    price: '$89.99',
    rating: 4.9,
    students: 15600,
    duration: '50 hours',
    level: 'Intermediate',
  },
];

export const mockChallenges = [
  {
    id: '1',
    title: 'Build a REST API in 24 Hours',
    difficulty: 'Medium',
    participants: 234,
    prize: '$500',
    deadline: '3 days left',
    category: 'Backend',
  },
  {
    id: '2',
    title: 'Design a Mobile App UI',
    difficulty: 'Easy',
    participants: 456,
    prize: '$300',
    deadline: '5 days left',
    category: 'Design',
  },
  {
    id: '3',
    title: 'Machine Learning Competition',
    difficulty: 'Hard',
    participants: 189,
    prize: '$1000',
    deadline: '10 days left',
    category: 'AI/ML',
  },
];

export const mockFriends = [
  {
    id: '1',
    name: 'Alice Cooper',
    avatar: 'https://i.pravatar.cc/150?img=11',
    status: 'online',
    mutualFriends: 45,
  },
  {
    id: '2',
    name: 'Bob Martin',
    avatar: 'https://i.pravatar.cc/150?img=12',
    status: 'offline',
    mutualFriends: 32,
  },
  {
    id: '3',
    name: 'Carol White',
    avatar: 'https://i.pravatar.cc/150?img=13',
    status: 'online',
    mutualFriends: 28,
  },
  {
    id: '4',
    name: 'Dan Brown',
    avatar: 'https://i.pravatar.cc/150?img=14',
    status: 'offline',
    mutualFriends: 56,
  },
];

export const mockLibraryItems = [
  {
    id: '1',
    title: 'JavaScript: The Good Parts',
    type: 'PDF',
    author: 'Douglas Crockford',
    pages: 176,
    downloads: 3420,
  },
  {
    id: '2',
    title: 'Clean Code',
    type: 'PDF',
    author: 'Robert C. Martin',
    pages: 464,
    downloads: 5680,
  },
  {
    id: '3',
    title: 'Design Patterns',
    type: 'PDF',
    author: 'Gang of Four',
    pages: 395,
    downloads: 2890,
  },
];

export const mockMarketplaceItems = [
  {
    id: '1',
    title: 'Premium Course Bundle',
    seller: 'LearnHub',
    price: '$199.99',
    rating: 4.8,
    sales: 450,
    thumbnail:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
  },
  {
    id: '2',
    title: 'UI Kit Pro',
    seller: 'DesignMasters',
    price: '$49.99',
    rating: 4.9,
    sales: 890,
    thumbnail:
      'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=250&fit=crop',
  },
  {
    id: '3',
    title: 'Code Templates Pack',
    seller: 'DevTools',
    price: '$29.99',
    rating: 4.7,
    sales: 670,
    thumbnail:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
  },
];

export const mockBloodDonations = [
  {
    id: '1',
    name: 'John Doe',
    bloodType: 'O+',
    location: 'New York, NY',
    urgency: 'Critical',
    contact: '+1 234-567-8900',
    date: '2024-01-20',
  },
  {
    id: '2',
    name: 'Jane Smith',
    bloodType: 'A+',
    location: 'Los Angeles, CA',
    urgency: 'Moderate',
    contact: '+1 234-567-8901',
    date: '2024-01-22',
  },
];

export const mockLabExercises = [
  {
    id: '1',
    title: 'Build a Todo App with React',
    difficulty: 'Beginner',
    duration: '2 hours',
    completions: 1250,
    category: 'Frontend',
  },
  {
    id: '2',
    title: 'Create a RESTful API',
    difficulty: 'Intermediate',
    duration: '3 hours',
    completions: 890,
    category: 'Backend',
  },
  {
    id: '3',
    title: 'Implement Binary Search Tree',
    difficulty: 'Advanced',
    duration: '4 hours',
    completions: 450,
    category: 'Data Structures',
  },
];
