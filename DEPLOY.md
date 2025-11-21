# 🚀 Deploying to Vercel

This guide will walk you through deploying your Password Strength Analyzer to Vercel.

---

## 📋 Prerequisites

- A [Vercel account](https://vercel.com/signup) (free)
- A [GitHub account](https://github.com/signup) (recommended)
- Your project pushed to a GitHub repository (optional but recommended)

---

## 🌐 Method 1: Deploy via Vercel Web UI (Recommended)

### Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create a new repository on GitHub**:
   - Go to [github.com/new](https://github.com/new)
   - Name it (e.g., `password-analyzer`)
   - Don't initialize with README (you already have one)
   - Click "Create repository"

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/password-analyzer.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Import to Vercel

1. **Go to Vercel**:
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub

2. **Import your repository**:
   - Click "Import Project"
   - Select your repository (`password-analyzer`)
   - Click "Import"

3. **Configure the project**:
   - **Framework Preset**: Vercel will auto-detect "Vite"
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - Leave environment variables empty (none needed)

4. **Deploy**:
   - Click "Deploy"
   - Wait 1-2 minutes for the build to complete
   - You'll get a live URL like: `https://password-analyzer-xyz.vercel.app`

---

## 💻 Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### Step 3: Deploy

From your project directory:

```bash
vercel
```

The CLI will ask you a few questions:
- **Set up and deploy?** `Y`
- **Which scope?** Select your account
- **Link to existing project?** `N`
- **What's your project's name?** `password-analyzer`
- **In which directory is your code located?** `./`
- **Want to override the settings?** `N`

Vercel will automatically detect your Vite configuration and deploy!

### Step 4: Production Deployment

For subsequent deployments to production:

```bash
vercel --prod
```

---

## ⚙️ Vercel Configuration (Optional)

Create a `vercel.json` file in your project root for advanced configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures that all routes go to `index.html` (useful for client-side routing).

---

## 🔄 Automatic Deployments

Once connected to GitHub, Vercel will automatically:
- Deploy every push to `main` branch → Production
- Deploy every pull request → Preview URL
- Show deployment status in GitHub commits

---

## 🌍 Custom Domain (Optional)

### Via Vercel Dashboard

1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `passwordchecker.com`)
4. Follow DNS configuration instructions

### Via CLI

```bash
vercel domains add passwordchecker.com
```

---

## 🐛 Troubleshooting

### Build Fails

**Error:** `Cannot find module 'vite'`

**Solution:**
```bash
# Ensure all dependencies are listed in package.json
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

---

### 404 on Refresh

**Issue:** Page works on first load but shows 404 on refresh.

**Solution:** Add this to `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

### Slow Build Times

**Solution:** Vercel builds are usually fast (30-60 seconds). If slow:
- Check for large `node_modules` (Vercel caches these)
- Ensure `package-lock.json` is committed
- Use `npm ci` instead of `npm install` (automatic on Vercel)

---

## 📊 Performance Optimization

### Enable Analytics

In `vercel.json`:
```json
{
  "analytics": {
    "enable": true
  }
}
```

### Enable Edge Caching

Vercel automatically caches static assets. Your CSS, JS, and images are served from their global CDN.

---

## 🔐 Environment Variables (If Needed)

If you add API keys in the future:

1. **Via Dashboard:**
   - Go to Settings → Environment Variables
   - Add key-value pairs
   - Redeploy

2. **Via CLI:**
   ```bash
   vercel env add VITE_API_KEY
   ```

**Note:** Vite environment variables must start with `VITE_` to be exposed to the frontend.

---

## 📱 Preview Deployments

Every pull request gets a unique URL:
```
https://password-analyzer-git-feature-xyz.vercel.app
```

Perfect for testing before merging!

---

## 🎉 You're Live!

Your app is now deployed! Share your URL:
```
https://password-analyzer.vercel.app
```

### Next Steps

✅ Add a custom domain  
✅ Enable Vercel Analytics  
✅ Set up GitHub Actions for tests  
✅ Monitor performance in Vercel dashboard  

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

---

**Deployed with ❤️ on Vercel**
