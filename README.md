# 🎮 Pokédex# React + Vite



A modern, professional Pokédex application built with React and Vite, featuring a clean UI and fast performance. Search for any Pokémon and view detailed information including stats, types, abilities, and descriptions.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



🌐 **Live Demo**: [pokedex.erikcompanhone.com](https://pokedex.erikcompanhone.com)


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
├── .gitignore
├── eslint.config.js
├── index.html
├── LICENSE
├── package.json
├── README.md
├── vercel.json                  # Vercel configuration
└── vite.config.js              # Vite configuration
```

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


This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
