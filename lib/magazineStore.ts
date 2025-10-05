// Persistent file-based storage for magazines
export interface Magazine {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  coverColor: string;
  coverImage?: string;
  pdfUrl?: string;
  views: number;
  rating: number;
  createdAt: string;
}

// Default sample magazines
const defaultMagazines: Magazine[] = [
  {
    id: 1,
    title: 'Punjab Today - January 2025',
    description: 'Latest news and updates from across Punjab',
    date: '2025-01-15',
    views: 12500,
    category: 'Current Affairs',
    coverColor: 'from-blue-500 to-blue-700',
    rating: 4.5,
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'Cultural Heritage Special',
    description: 'Exploring the rich cultural tapestry of Punjab',
    date: '2025-01-10',
    views: 8900,
    category: 'Culture',
    coverColor: 'from-purple-500 to-purple-700',
    rating: 4.8,
    createdAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 3,
    title: 'Agriculture & Innovation',
    description: 'Modern farming techniques and success stories',
    date: '2025-01-05',
    views: 15200,
    category: 'Agriculture',
    coverColor: 'from-green-500 to-green-700',
    rating: 4.6,
    createdAt: '2025-01-05T10:00:00Z',
  },
];

// Import storage functions (will be used in API routes)
let magazineStorage: any = null;

// Initialize storage (only on server side)
if (typeof window === 'undefined') {
  try {
    magazineStorage = require('./fileStorage').magazineStorage;
  } catch (e) {
    console.log('File storage not available');
  }
}

// Load magazines from file or use defaults
function loadMagazines(): Magazine[] {
  if (magazineStorage) {
    const stored = magazineStorage.read();
    return stored.length > 0 ? stored : defaultMagazines;
  }
  return defaultMagazines;
}

// Save magazines to file
function saveMagazines(magazines: Magazine[]): void {
  if (magazineStorage) {
    magazineStorage.write(magazines);
  }
}

export const magazineStore = {
  getAll: () => {
    return loadMagazines();
  },
  
  getById: (id: number) => {
    const magazines = loadMagazines();
    return magazines.find(m => m.id === id);
  },
  
  add: (magazine: Omit<Magazine, 'id' | 'views' | 'createdAt'>) => {
    const magazines = loadMagazines();
    const newMagazine: Magazine = {
      ...magazine,
      id: Math.max(...magazines.map(m => m.id), 0) + 1,
      views: 0,
      createdAt: new Date().toISOString(),
    };
    magazines.push(newMagazine);
    saveMagazines(magazines);
    return newMagazine;
  },
  
  update: (id: number, updates: Partial<Magazine>) => {
    const magazines = loadMagazines();
    const index = magazines.findIndex(m => m.id === id);
    if (index !== -1) {
      magazines[index] = { ...magazines[index], ...updates };
      saveMagazines(magazines);
      return magazines[index];
    }
    return null;
  },
  
  delete: (id: number) => {
    const magazines = loadMagazines();
    const index = magazines.findIndex(m => m.id === id);
    if (index !== -1) {
      magazines.splice(index, 1);
      saveMagazines(magazines);
      return true;
    }
    return false;
  },
};
