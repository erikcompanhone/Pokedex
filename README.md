# 🎮 Pokédex# React + Vite



A modern, professional Pokédex application built with React and Vite, featuring a clean UI and fast performance. Search for any Pokémon and view detailed information including stats, types, abilities, and descriptions.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



🌐 **Live Demo**: [pokedex.erikcompanhone.com](https://pokedex.erikcompanhone.com)Currently, two official plugins are available:



![Pokédex Screenshot](icon.png)- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh

- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## ✨ Features

- 🔍 **Real-time Search** - Search for any Pokémon by name
- 📊 **Detailed Stats** - View HP, Attack, Defense, Speed, and more
- 🎨 **Type Icons** - Visual representation of Pokémon types
- 📝 **Pokédex Descriptions** - Official Pokédex entries
- ⚡ **Fast Performance** - Built with Vite for lightning-fast builds
- 🎯 **Error Handling** - Graceful error states and loading indicators
- 📱 **Responsive Design** - Works on all device sizes
- 🔒 **Secure** - Includes security headers and best practices

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite 6** - Next-generation frontend tooling
- **Axios** - HTTP client for API requests
- **CSS Modules** - Scoped and maintainable styles

### Backend
- **Vercel Serverless Functions** - API routes for Pokémon data
- **PokeAPI** - External API for Pokémon data (https://pokeapi.co)

### Development Tools
- **ESLint** - Code linting and quality
- **Git** - Version control

## 📁 Project Structure

```
pokedex/
├── api/                          # Vercel Serverless Functions
│   ├── pokemon/
│   │   └── [name].js            # Get Pokemon data
│   └── pokemon-species/
│       └── [name].js            # Get Pokemon species/description
├── public/
│   └── types/                   # Pokemon type SVG icons
│       ├── fire.svg
│       ├── water.svg
│       └── ...
├── src/
│   ├── components/
│   │   ├── ErrorBoundary/       # Error boundary component
│   │   ├── Loading/             # Loading spinner
│   │   ├── Pokedex/            # Main search interface
│   │   └── PokemonDetails/      # Pokemon details display
│   ├── hooks/
│   │   └── usePokemon.js       # Custom hook for fetching Pokemon
│   ├── App.jsx                  # Root component
│   ├── App.css
│   ├── main.jsx                 # Application entry point
│   └── index.css
├── .env.example                 # Environment variables template
├── .gitignore
├── eslint.config.js
├── index.html
├── LICENSE
├── package.json
├── README.md
├── vercel.json                  # Vercel configuration
└── vite.config.js              # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/erikcompanhone/Pokedex.git
   cd Pokedex
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env
   ```
   > Note: Currently no environment variables are required for local development.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🌐 Deployment to Vercel (Subdomain)

This project is configured to deploy to a subdomain of `erikcompanhone.com`.

### Initial Setup

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the repository: `erikcompanhone/Pokedex`

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Node Version**: 20.x

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete

### Configure Subdomain

1. **Add Custom Domain**
   - Go to Project Settings → Domains
   - Add domain: `pokedex.erikcompanhone.com`
   - Since DNS is managed by Vercel, it should auto-configure

2. **DNS Configuration** (if needed)
   - Type: `CNAME`
   - Name: `pokedex`
   - Value: `cname.vercel-dns.com`
   - TTL: Auto

3. **Set Production Branch**
   - Go to Project Settings → Git
   - Set **Production Branch**: `main`

### Environment Variables (if needed in future)

To add environment variables in Vercel:
1. Go to Project Settings → Environment Variables
2. Add variables for:
   - **Preview** (preview deployments)
   - **Production** (production deployments)

Currently, no environment variables are required.

## 🔧 Configuration Files

### `vercel.json`
Configures Vercel deployment with:
- SPA rewrites for client-side routing
- Security headers (XSS protection, frame options, etc.)
- Cache headers for API routes (24-hour cache)

### `vite.config.js`
Vite configuration with:
- Base path set to `/` for subdomain deployment
- Build optimizations and code splitting
- Development proxy for API routes

## 🎨 Features in Detail

### Custom Hooks
- **`usePokemon`** - Manages Pokemon data fetching, loading, and error states

### Error Handling
- **Error Boundary** - Catches React errors and displays user-friendly messages
- **API Error Handling** - Handles 404s and network errors gracefully
- **Loading States** - Beautiful Pokeball loading animation

### Performance Optimizations
- **Code Splitting** - Vendor and library chunks separated
- **API Caching** - 24-hour cache on API responses
- **Lazy Loading** - Efficient resource loading
- **Image Optimization** - SVG icons for types

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [PokéAPI](https://pokeapi.co/) - Free RESTful Pokémon API
- [React](https://react.dev/) - JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next-generation frontend tooling
- [Vercel](https://vercel.com/) - Hosting and deployment platform

## 📧 Contact

Erik Companhone - [GitHub](https://github.com/erikcompanhone)

Project Link: [https://github.com/erikcompanhone/Pokedex](https://github.com/erikcompanhone/Pokedex)

---

Made with ❤️ by Erik Companhone
