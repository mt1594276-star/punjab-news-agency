import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const MAGAZINES_FILE = path.join(DATA_DIR, 'magazines.json');
const CONTACT_FILE = path.join(DATA_DIR, 'contact.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Read JSON file
export function readJSON<T>(filePath: string, defaultData: T): T {
  ensureDataDir();
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
  }
  return defaultData;
}

// Write JSON file
export function writeJSON<T>(filePath: string, data: T): void {
  ensureDataDir();
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
  }
}

// Magazine storage functions
export const magazineStorage = {
  read: () => readJSON(MAGAZINES_FILE, []),
  write: (data: any) => writeJSON(MAGAZINES_FILE, data),
};

// Contact storage functions
export const contactStorage = {
  read: () => readJSON(CONTACT_FILE, {
    email: 'info@punjabnews.com',
    phone: '+92 XXX XXX XXXX',
    address: 'Punjab, Pakistan',
    facebook: '#',
    twitter: '#',
    instagram: '#',
    youtube: '#',
  }),
  write: (data: any) => writeJSON(CONTACT_FILE, data),
};
