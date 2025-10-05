# 🚀 Quick Start Guide

## Starting the Website

```bash
cd C:\Users\U.E\CascadeProjects\punjab-news-agency
npm run dev
```

Open: `http://localhost:3000`

## 🌐 Navigation

### Public Pages
- **Homepage**: `http://localhost:3000`
  - Beautiful 3D hero section
  - Featured magazines
  
- **Magazines**: `http://localhost:3000/magazines`
  - Full collection
  - Search and filters

### Admin Access

Look for the **floating lock button** in the bottom-right corner of any page!

1. **Click the lock icon** (🔒) in bottom-right corner
2. You'll be taken to the login page
3. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
4. Click "Sign In"
5. You're now in the admin dashboard!

## 🎯 Admin Features

Once logged in, you can:
- ✅ Add new magazines
- ✅ Set ratings (1-5 stars)
- ✅ Choose cover colors
- ✅ Upload images
- ✅ View live stats
- ✅ Edit/delete magazines
- ✅ Logout (button in header)

## 💡 Tips

### Finding Admin Access
- The lock button appears on all public pages
- Hover over it to see "Admin Login" tooltip
- It's hidden when you're already in admin area
- Click it anytime to access admin

### Adding Magazines
1. Login via the lock button
2. Fill in the form
3. Click "Publish Magazine"
4. See it appear on homepage!

### Logging Out
- Click "Logout" button in admin header
- You'll be redirected to login page
- Lock button will reappear on public pages

## 🎨 What You'll See

### Homepage
- 3D rotating magazine
- Floating background elements
- Featured magazines with tilt effects
- Stats cards

### Magazines Page
- Search bar
- Category filters
- 3D magazine cards
- Ratings and views

### Admin Login
- Animated background
- Beautiful form
- Loading states
- Error messages

### Admin Dashboard
- Upload form
- Live stats
- Magazine list
- Edit/delete buttons

## 🔐 Security Note

The floating admin button is intentionally subtle - only people who know about it can access the admin area. This provides basic security through obscurity, but for production, you should:

1. Use proper authentication (NextAuth.js)
2. Add rate limiting
3. Enable HTTPS
4. Use strong passwords
5. Add 2FA

---

**You're ready to go! Click the lock button to get started! 🔒**
