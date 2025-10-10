# Vercel Deployment Guide - pokedex.erikcompanhone.com

## ✅ Pre-Deployment Checklist

All configuration files are ready:
- ✅ `vercel.json` - Configured with SPA rewrites and security headers
- ✅ `vite.config.js` - Build settings optimized for production
- ✅ `package.json` - Correct scripts and dependencies
- ✅ `/api` directory - Serverless functions for Pokemon data
- ✅ Build tested successfully - `npm run build` works

## 🚀 Deployment Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Deploy: Professional Pokedex with Vercel Serverless Functions"
git push origin main
```

### 2. Import to Vercel

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select your GitHub repository: `erikcompanhone/Pokedex`
4. Click "Import"

### 3. Project Configuration

Vercel should auto-detect the settings, but verify:

- **Framework Preset**: Vite
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node.js Version**: 20.x

### 4. Deploy

1. Click "Deploy"
2. Wait for the build to complete (~1-2 minutes)
3. You'll get a temporary Vercel URL (e.g., `pokedex-xyz.vercel.app`)

### 5. Configure Subdomain

#### In Vercel Dashboard:

1. Go to your project
2. Click "Settings" → "Domains"
3. Click "Add Domain"
4. Enter: `pokedex.erikcompanhone.com`
5. Click "Add"

#### DNS Configuration:

Since `erikcompanhone.com` is already on Vercel DNS, it should auto-configure. If not:

**Option A: Automatic (Recommended)**
- Vercel will detect the domain is on their DNS
- It will automatically create the CNAME record
- Wait 1-2 minutes for propagation

**Option B: Manual (if needed)**
1. Go to Vercel → Domains → erikcompanhone.com → DNS Records
2. Add a new record:
   - Type: `CNAME`
   - Name: `pokedex`
   - Value: `cname.vercel-dns.com`
   - TTL: Auto

### 6. Set Production Branch

1. Go to Project Settings → Git
2. Set **Production Branch**: `main`
3. Enable "Automatically expose System Environment Variables"

### 7. Verify Deployment

Once deployed, test:

1. Visit `https://pokedex.erikcompanhone.com`
2. Test search functionality (try "pikachu", "charizard", etc.)
3. Verify API routes work: `https://pokedex.erikcompanhone.com/api/pokemon/pikachu`
4. Check loading states
5. Test error handling (try invalid Pokemon name)

## 🔧 Environment Variables

**Currently**: No environment variables needed!

**If needed in future**:
1. Go to Project Settings → Environment Variables
2. Add variables for each environment:
   - Production
   - Preview
   - Development

## 📊 Monitoring

### Build Logs
- View build logs in Vercel Dashboard → Deployments → [Your Deployment]

### Runtime Logs
- Go to Project → Logs to see serverless function executions

### Analytics (Optional)
- Enable Vercel Analytics in Project Settings → Analytics

## 🔄 Continuous Deployment

After initial setup, every push to `main` will:
1. Trigger a new deployment automatically
2. Build the project
3. Deploy to production
4. Update `pokedex.erikcompanhone.com`

Preview branches:
- Any push to other branches creates a preview deployment
- Get a unique URL for testing before merging

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Verify `package.json` dependencies
- Ensure Node version is 20.x

### API Routes Not Working
- Verify `/api` folder structure
- Check serverless function logs
- Ensure PokeAPI is accessible

### 404 on Refresh
- Verify `vercel.json` has the correct rewrites
- Should redirect all routes to `index.html`

### DNS Not Resolving
- Wait 5-10 minutes for DNS propagation
- Clear browser cache
- Check DNS records in Vercel → Domains

## 📝 Notes

- First deployment may take 2-3 minutes
- Subsequent deployments are faster (~1 minute)
- Preview deployments are instant for PRs
- Serverless functions have cold start (~1s first request)
- API responses are cached for 24 hours

## ✨ Success!

Your Pokédex is now live at: https://pokedex.erikcompanhone.com

Share it with the world! 🎉
