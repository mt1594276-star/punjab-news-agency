// Simple authentication (replace with NextAuth for production)
export const ADMIN_CREDENTIALS = {
  username: 'saif',
  password: 'saif1234', // In production, use hashed passwords
};

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isAdminAuthenticated') === 'true';
}

export function setAuthenticated(value: boolean): void {
  if (typeof window === 'undefined') return;
  if (value) {
    localStorage.setItem('isAdminAuthenticated', 'true');
  } else {
    localStorage.removeItem('isAdminAuthenticated');
  }
}
