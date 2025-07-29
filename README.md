# 🚀 Anh Khoa Nguyen - Full Stack Developer Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features stunning animations, interactive components, and a comprehensive showcase of web development projects and skills.

👉 [Portfolio Preview](https://dream-vacations-01.netlify.app)

## ✨ Features

### 🎨 Visual Design

- **Animated Background**: Interactive particle system with tsParticles
- **Smooth Transitions**: Framer Motion animations throughout the site
- **Responsive Design**: Mobile-first approach with custom breakpoints
- **Modern UI**: Custom gradient backgrounds and glassmorphism effects
- **Dynamic Typography**: React Type Animation for engaging text effects

### 📱 Interactive Components

- **Work Portfolio Slider**: Swiper.js carousel showcasing 10+ projects
- **Service Cards**: Interactive service offerings with hover effects
- **Skills Grid**: Comprehensive technology stack visualization
- **Testimonials**: Client feedback carousel (ready for real testimonials)
- **Contact Form**: Functional email integration with Nodemailer

### 🛠️ Technical Features

- **Server-Side Rendering**: Next.js with optimized performance
- **API Routes**: Contact form backend with email functionality
- **Image Optimization**: Next.js Image component for fast loading
- **SEO Optimized**: Meta tags and structured data
- **Font Optimization**: Custom Google Fonts (Sora) integration

## 🚀 Live Demo

Visit the live portfolio: [Portfolio Website](https://your-portfolio-domain.com)

## 📋 Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Features Breakdown](#features-breakdown)
- [Portfolio Projects](#portfolio-projects)
- [Contact Form Setup](#contact-form-setup)
- [Deployment](#deployment)

## 🛠️ Technologies Used

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Swiper.js** - Touch slider components
- **React Icons** - Icon library
- **React Type Animation** - Typewriter effect
- **React CountUp** - Number animation

### Backend & APIs

- **Next.js API Routes** - Serverless functions
- **Nodemailer** - Email sending service
- **Axios** - HTTP client

### Styling & UI

- **Custom CSS Variables** - Design system tokens
- **Gradient Backgrounds** - Custom Tailwind gradients
- **Responsive Breakpoints** - Mobile-first design
- **Custom Animations** - Tailwind animation utilities

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Project Structure

```
portfolio_nextjs/
├── components/           # Reusable UI components
│   ├── Avatar.tsx       # 3D avatar component
│   ├── Header.tsx       # Navigation header
│   ├── Layout.tsx       # Page layout wrapper
│   ├── Nav.tsx          # Main navigation
│   ├── WorkSlider.tsx   # Project showcase slider
│   ├── ServiceSlider.tsx # Services carousel
│   ├── TestimonialSlider.tsx # Client testimonials
│   ├── ParticlesContainer.tsx # Background animation
│   └── ...
├── pages/               # Next.js pages
│   ├── index.tsx        # Homepage with hero section
│   ├── about.tsx        # About page with skills & education
│   ├── work.tsx         # Portfolio projects showcase
│   ├── services.tsx     # Service offerings
│   ├── contact.tsx      # Contact form
│   ├── testimonials.tsx # Client testimonials
│   └── api/
│       └── contact.ts   # Contact form API endpoint
├── public/              # Static assets
│   ├── *.jpg           # Project thumbnails
│   ├── *.png           # UI assets and avatars
│   ├── my-cv.pdf       # Resume download
│   └── ...
├── styles/
│   └── globals.css     # Global styles and Tailwind imports
├── utils/
│   └── variants.ts     # Framer Motion animation variants
└── ...
```

## 🔧 Installation

1. **Clone the repository**

```bash
git clone https://github.com/NaKMiers/Portfolio_NextJS.git
cd Portfolio_NextJS
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Email Configuration (Required for contact form)
MAIL=your-email@gmail.com
MAIL_APP_PASSWORD=your-app-password
MAIL_TO=recipient@email.com

# Optional: Analytics or other services
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 📜 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Code linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🎯 Features Breakdown

### 🏠 Homepage (`/`)

- **Hero Section**: Animated introduction with typewriter effect
- **Dynamic Background**: Particle animation system
- **Call-to-Action**: Direct navigation to projects

### 👨‍💻 About Page (`/about`)

- **Personal Story**: Detailed background and motivation
- **Skills Grid**: 25+ technologies with icons
- **Education Timeline**: Academic background
- **Certifications**: Professional certificates with links
- **Interactive Tabs**: Organized information display

### 💼 Work Portfolio (`/work`)

- **Project Showcase**: 10+ real projects with live links
- **Categories**: Web apps, mobile apps, e-commerce, portfolios
- **Tech Stack Display**: Technologies used for each project
- **Live Demos**: Direct links to deployed applications

### 🛠️ Services (`/services`)

- **Service Cards**: 6 main service offerings
- **Interactive Animations**: Hover effects and transitions
- **Detailed Descriptions**: Clear service explanations

### 📞 Contact (`/contact`)

- **Functional Form**: Real email sending capability
- **Form Validation**: Client-side validation
- **Success Feedback**: User confirmation messages
- **Professional Layout**: Clean, accessible design

## 🚀 Portfolio Projects

The portfolio showcases real projects including:

### Mobile Applications

- **Deewas**: iOS & Android app on App Store/Play Store
- **Native Development**: React Native with Expo

### Web Applications

- **MonaEdu**: Educational platform
- **Digital Flow**: Business website
- **Dream Vacations**: Travel booking site
- **Anpha Shop**: E-commerce platform
- **Educational Resources**: Learning management system

### Frontend Showcases

- **Street Slicer**: Interactive web game
- **Pixel Chip Portfolio**: Creative portfolio design
- **Sonic Fiesta**: Event management platform
- **Exposio**: Photography showcase

### Form Fields

- Email (required)
- First Name (required)
- Last Name (required)
- Subject (required)
- Message (required)

## 👤 Author

**Anh Khoa Nguyen (NaKMiers)**

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Framer Motion for smooth animations
- Tailwind CSS for the utility-first approach
- Swiper.js for touch-friendly sliders
- React Icons for comprehensive icon library

---

⭐ **Star this repository if you found it helpful!**
