# Punjab News Agency - Digital Magazine Platform

A modern, beautiful, and 3D-enhanced digital magazine platform built with Next.js, React Three Fiber, and Tailwind CSS.

## 🌟 Features

- **3D Interactive Hero**: Floating magazine cover with smooth animations
- **Beautiful UI**: Modern design with glassmorphism and gradient effects
- **Magazine Management**: Upload, organize, and display digital magazines
- **Search & Filter**: Find magazines by category, date, or keywords
- **Admin Dashboard**: Easy-to-use interface for content management
- **Responsive Design**: Works perfectly on all devices
- **SEO Optimized**: Built-in metadata and Open Graph support

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Custom components with shadcn/ui patterns

## 📦 Installation

1. Navigate to the project directory:
```bash
cd punjab-news-agency
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Color Scheme

- **Primary**: Amber/Gold (#D97706, #B45309)
- **Accent**: Orange to Red gradients
- **Background**: Warm neutrals (Amber-50, Orange-50)
- **Text**: Dark gray (#171717)

## 📁 Project Structure

```
punjab-news-agency/
├── app/
│   ├── layout.tsx          # Root layout with navbar & footer
│   ├── page.tsx            # Home page with hero & featured magazines
│   ├── magazines/          # Magazine listing page
│   └── admin/              # Admin upload dashboard
├── components/
│   ├── 3d/                 # Three.js 3D components
│   │   ├── FloatingMagazine.tsx
│   │   └── Scene.tsx
│   ├── ui/                 # Reusable UI components
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── Hero.tsx            # Landing page hero section
│   ├── FeaturedMagazines.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
└── lib/
    └── utils.ts            # Utility functions
```

## 🎯 Pages

- **Home (`/`)**: Hero section with 3D magazine, featured magazines
- **Magazines (`/magazines`)**: Full magazine collection with search/filter
- **Admin (`/admin`)**: Upload dashboard for content management

## 🔧 Customization

### Brand Colors
Edit `components/ui/button.tsx` and `app/globals.css` to change the color scheme.

### Magazine Categories
Update the `categories` array in `app/magazines/page.tsx` and `app/admin/page.tsx`.

### 3D Scene
Customize the floating magazine in `components/3d/FloatingMagazine.tsx`.

## 📱 Features to Add (Future)

- [ ] Backend API (Next.js API routes or separate backend)
- [ ] Database integration (PostgreSQL, MongoDB, or Supabase)
- [ ] Authentication (NextAuth.js)
- [ ] PDF viewer integration (react-pdf)
- [ ] File upload to cloud storage (Cloudinary, AWS S3)
- [ ] Search with Algolia or ElasticSearch
- [ ] Analytics dashboard
- [ ] Newsletter subscription
- [ ] Social sharing
- [ ] Comments system
- [ ] Multi-language support (English, Punjabi, Urdu)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

- **Netlify**: Connect GitHub repo and deploy
- **AWS Amplify**: Use the Amplify console
- **Docker**: Build and deploy with Docker

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Punjab News Agency - info@punjabnews.com

---

Built with ❤️ for Punjab News Agency
