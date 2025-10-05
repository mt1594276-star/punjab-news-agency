// Persistent file-based storage for contact information
export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
}

const defaultContactInfo: ContactInfo = {
  email: 'info@punjabnews.com',
  phone: '+92 XXX XXX XXXX',
  address: 'Punjab, Pakistan',
  facebook: '#',
  twitter: '#',
  instagram: '#',
  youtube: '#',
};

// Import storage functions (will be used in API routes)
let contactStorage: any = null;

// Initialize storage (only on server side)
if (typeof window === 'undefined') {
  try {
    contactStorage = require('./fileStorage').contactStorage;
  } catch (e) {
    console.log('File storage not available');
  }
}

// Load contact info from file or use defaults
function loadContactInfo(): ContactInfo {
  if (contactStorage) {
    return contactStorage.read();
  }
  return defaultContactInfo;
}

// Save contact info to file
function saveContactInfo(info: ContactInfo): void {
  if (contactStorage) {
    contactStorage.write(info);
  }
}

export const contactStore = {
  get: () => {
    return loadContactInfo();
  },
  
  update: (updates: Partial<ContactInfo>) => {
    const current = loadContactInfo();
    const updated = { ...current, ...updates };
    saveContactInfo(updated);
    return updated;
  },
};
