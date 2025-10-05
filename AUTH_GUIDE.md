# Admin Authentication Guide

## 🔐 Login Credentials

**Default Admin Account:**
- **Username**: `admin`
- **Password**: `admin123`

## 🚪 Accessing Admin Panel

1. Navigate to: `http://localhost:3000/admin/login`
2. Enter credentials above
3. Click "Sign In"
4. You'll be redirected to the admin dashboard

## 🎨 Login Page Features

- **Beautiful animated background** with floating orbs
- **3D card effects** with smooth animations
- **Form validation** for security
- **Loading states** with visual feedback
- **Error messages** for invalid credentials
- **Responsive design** works on all devices

## 🔒 Security Features

### Current Implementation:
- ✅ Login page with username/password
- ✅ Protected admin routes
- ✅ Session management with localStorage
- ✅ Automatic redirect if not authenticated
- ✅ Logout functionality

### For Production:
Replace the simple auth with proper authentication:

1. **Use NextAuth.js** (already installed)
2. **Hash passwords** with bcrypt
3. **Database storage** for user accounts
4. **JWT tokens** for sessions
5. **HTTPS only** in production

## 📝 Changing Credentials

Edit `lib/auth.ts`:

```typescript
export const ADMIN_CREDENTIALS = {
  username: 'your_username',
  password: 'your_password',
};
```

**Important**: This is for development only. In production, use a proper authentication system with hashed passwords stored in a database.

## 🚀 Production Setup (Recommended)

### 1. Install Database (e.g., PostgreSQL)
```bash
npm install @prisma/client prisma
```

### 2. Create User Model
```prisma
model User {
  id        String   @id @default(cuid())
  username  String   @unique
  password  String   // Hashed with bcrypt
  role      String   @default("admin")
  createdAt DateTime @default(now())
}
```

### 3. Use NextAuth.js
Create `app/api/auth/[...nextauth]/route.ts` with proper configuration.

### 4. Hash Passwords
```typescript
import bcrypt from 'bcryptjs';

const hashedPassword = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(password, hashedPassword);
```

## 🔄 Session Management

- **Login**: Stores authentication state in localStorage
- **Logout**: Clears session and redirects to login
- **Auto-check**: Every page load checks authentication
- **Redirect**: Unauthenticated users sent to login page

## 🛡️ Protected Routes

Currently protected:
- `/admin` - Main dashboard
- All admin functionality

Public routes:
- `/` - Homepage
- `/magazines` - Magazine listing
- `/admin/login` - Login page

## 💡 Tips

1. **Change default password** before deploying
2. **Use HTTPS** in production
3. **Enable rate limiting** to prevent brute force
4. **Add 2FA** for extra security
5. **Log authentication attempts**
6. **Set session timeouts**

## 🔧 Troubleshooting

### Can't login?
- Check credentials match exactly (case-sensitive)
- Clear browser cache/localStorage
- Check browser console for errors

### Redirected to login repeatedly?
- Clear localStorage
- Check if JavaScript is enabled
- Try different browser

### Logout not working?
- Clear browser cache
- Check localStorage is enabled
- Refresh the page

---

**Security Note**: The current implementation is suitable for development and testing. For production use, implement proper authentication with database-backed user management, password hashing, and secure session handling.
