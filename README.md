# Chicko-2

A modern e-commerce application built with React, TypeScript, and Express. Features a beautiful UI with product browsing, shopping cart, favorites, and order management.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/AccolitedigitalIndia/chicko-2.git
cd chicko-2

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:8080`

## 📦 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, TailwindCSS 3
- **UI Components**: Radix UI, shadcn/ui
- **Backend**: Express.js, Node.js
- **State Management**: React Context, TanStack Query
- **Routing**: React Router 6
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 🏗️ Project Structure

```
chicko-2/
├── client/                 # React frontend
│   ├── pages/             # Route components
│   ├── components/        # Reusable components
│   │   ├── ui/           # shadcn/ui components
│   │   └── BottomNav.tsx # Bottom navigation
│   ├── context/          # React Context providers
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions
├── server/                # Express backend
│   ├── index.ts          # Server setup
│   └── routes/           # API route handlers
├── shared/                # Shared types
├── api/                   # Vercel serverless functions
└── public/               # Static assets
```

## 🛠️ Available Scripts

```bash
# Development
pnpm dev              # Start dev server (port 8080)

# Building
pnpm build            # Build both client and server
pnpm build:client     # Build client only
pnpm build:server     # Build server only

# Production
pnpm start            # Start production server

# Code Quality
pnpm typecheck        # TypeScript type checking
pnpm test             # Run tests
pnpm format.fix       # Format code with Prettier
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

This project is pre-configured for Vercel deployment. See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

**Quick Deploy:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Or deploy directly from GitHub:
1. Go to [vercel.com](https://vercel.com)
2. Import the repository
3. Configure and deploy

### Deploy to Netlify

The project also includes Netlify configuration in `netlify.toml`.

## 🎨 Features

- **Product Catalog**: Browse and search products
- **Shopping Cart**: Add/remove items, manage quantities
- **Favorites**: Save favorite products
- **User Profile**: Manage account settings
- **Order Management**: View order history and details
- **Address Management**: Save and manage delivery addresses
- **Payment Methods**: Manage payment options
- **Responsive Design**: Mobile-first, works on all devices
- **Dark Mode Ready**: Theme support with next-themes

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Builder.io (if using)
VITE_PUBLIC_BUILDER_KEY=your_builder_key_here

# Server
PING_MESSAGE="pong"
```

## 📱 API Endpoints

- `GET /api/ping` - Health check
- `GET /api/demo` - Demo endpoint

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test --watch
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🔗 Links

- **Live Demo**: [chicko-2.vercel.app](https://chicko-2.vercel.app)
- **Repository**: [github.com/AccolitedigitalIndia/chicko-2](https://github.com/AccolitedigitalIndia/chicko-2)

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

Built with ❤️ for Knitwell

