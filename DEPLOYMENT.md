# Deployment Guide

## Quick Deploy Options

### ⭐ Option 1: Vercel (Recommended)

**Why Vercel:**
- Zero config deployment for Vite projects
- Fastest global CDN
- Automatic HTTPS
- Preview deployments for every PR
- Free tier perfect for demos

**Deploy Steps:**

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add deployment configs"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub repo
   - Vercel auto-detects the config from `vercel.json`
   - Click "Deploy"
   - Done! Your site is live in ~2 minutes

3. **Custom Domain (Optional):**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as shown

**Live in:** ~2 minutes
**URL Format:** `https://your-project.vercel.app`

---

### Option 2: Netlify

**Why Netlify:**
- Great free tier
- Easy drag-and-drop option
- Built-in form handling
- Good performance

**Deploy Steps:**

#### Method A: Git-based (Automatic)
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import existing project"
4. Connect GitHub repo
5. Netlify auto-detects config from `netlify.toml`
6. Click "Deploy"

#### Method B: Drag & Drop (Manual)
1. Build locally:
   ```bash
   cd frontend
   npm install
   npm run build
   ```
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag `frontend/dist` folder to the upload zone
4. Done!

**Live in:** ~3-5 minutes
**URL Format:** `https://your-project.netlify.app`

---

### Option 3: GitHub Pages (Free Alternative)

**Good for:**
- Simple static demos
- Free hosting
- Direct from GitHub repo

**Deploy Steps:**

1. Install GitHub Pages package:
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/repo-name"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

4. Enable in GitHub:
   - Repo Settings → Pages
   - Source: `gh-pages` branch
   - Save

**Live in:** ~5 minutes
**URL Format:** `https://yourusername.github.io/repo-name`

---

## Configuration Files Included

✅ `vercel.json` - Vercel deployment config
✅ `netlify.toml` - Netlify deployment config

Both are configured to:
- Build from `frontend` directory
- Handle React Router (SPA redirects)
- Use Node 20

---

## Current Project Structure

```
emerald-beaver-yawn/
├── frontend/              # React + Vite app
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── vercel.json           # ← Vercel config
├── netlify.toml          # ← Netlify config
└── DEPLOYMENT.md         # ← This file
```

---

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All environment variables are set (if any)
- [ ] Build works locally: `cd frontend && npm run build`
- [ ] No console errors in production build
- [ ] Assets load correctly (images, fonts)
- [ ] Routing works for all pages
- [ ] Mobile responsive on all pages

---

## Testing the Build Locally

```bash
cd frontend

# Install dependencies
npm install

# Build for production
npm run build

# Preview production build
npm run preview
```

The preview will run at `http://localhost:4173` (or similar).

---

## Environment Variables (If Needed)

If your app requires environment variables:

### Vercel
1. Go to Project Settings → Environment Variables
2. Add variables like `VITE_API_URL`
3. Redeploy

### Netlify
1. Go to Site Settings → Environment Variables
2. Add variables
3. Redeploy

### Local Development
Create `frontend/.env.local`:
```bash
VITE_API_URL=http://localhost:3000
VITE_MYLIFE_API_KEY=your_key_here
```

⚠️ **Never commit `.env.local` to git!** (Already in `.gitignore`)

---

## Deployment Status Badges (Optional)

Add to your README.md:

### Vercel
```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/yourusername/repo-name)
```

### Netlify
```markdown
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/repo-name)
```

---

## Custom Domains

### Vercel
1. Project Settings → Domains
2. Add domain (e.g., `family-stories.com`)
3. Update DNS:
   - **A Record:** `76.76.21.21`
   - **CNAME:** `cname.vercel-dns.com`

### Netlify
1. Site Settings → Domain Management
2. Add custom domain
3. Update DNS:
   - Netlify will provide specific DNS records

---

## Troubleshooting

### Build Fails
```bash
# Check build locally first
cd frontend
npm run build

# Check for errors in output
```

### 404 on Routes
- ✅ Both `vercel.json` and `netlify.toml` handle this
- Ensures React Router works with direct URL access

### Slow Build Times
- Vercel: ~1-2 minutes (fastest)
- Netlify: ~2-3 minutes
- GitHub Pages: ~3-5 minutes

### Assets Not Loading
- Check `vite.config.ts` base path
- Ensure `public/` folder assets are referenced correctly

---

## Recommended: Vercel

**For this project, I recommend Vercel because:**
1. ✅ Fastest CDN globally
2. ✅ Zero-config for Vite
3. ✅ Best developer experience
4. ✅ Free tier is generous
5. ✅ Preview deployments for PRs
6. ✅ Automatic HTTPS

**Deployment time:** ~2 minutes from commit to live site

---

## Next Steps

1. **Choose platform** (Vercel recommended)
2. **Push to GitHub** if not already
3. **Connect & Deploy** (follow steps above)
4. **Share URL** with your team
5. **Set up custom domain** (optional)

**Questions?** Check the platform docs:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

---

**Last Updated:** 2025-10-08
**Project:** Family Story App
**Stack:** React + Vite + TypeScript
