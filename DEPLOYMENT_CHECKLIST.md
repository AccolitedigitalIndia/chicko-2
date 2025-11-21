# Deployment Checklist for Vercel

## ✅ Pre-Deployment Checklist

### 1. Repository Setup
- [x] Repository cloned locally
- [x] Dependencies installed (`pnpm install`)
- [x] Build tested successfully (`pnpm build:client`)
- [ ] Code committed to Git
- [ ] Repository pushed to GitHub

### 2. Configuration Files
- [x] `vercel.json` created and configured
- [x] `.vercelignore` created
- [x] `api/index.ts` serverless function created
- [x] `.env.example` provided for reference
- [x] `package.json` includes `vercel-build` script

### 3. Environment Variables
- [ ] Identify all required environment variables
- [ ] Document in `.env.example`
- [ ] Prepare values for Vercel dashboard

### 4. Testing
- [x] Local build successful
- [ ] Local dev server tested (`pnpm dev`)
- [ ] API endpoints tested locally
- [ ] TypeScript compilation verified (`pnpm typecheck`)

## 🚀 Deployment Steps

### Option A: Vercel CLI Deployment

1. **Install Vercel CLI** (if not installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy to Preview**:
   ```bash
   cd /Users/premkalyan/code/Knitwell/chicko-2
   vercel
   ```
   - Answer prompts:
     - Set up and deploy? `Y`
     - Which scope? Select your account
     - Link to existing project? `N`
     - Project name? `chicko-2`
     - Directory? `./`
     - Override settings? `N`

4. **Test Preview Deployment**:
   - Visit the preview URL provided
   - Test all pages and features
   - Check API endpoints (`/api/ping`, `/api/demo`)

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

### Option B: Vercel Dashboard Deployment

1. **Go to Vercel Dashboard**:
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Sign in with your account

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose `AccolitedigitalIndia/chicko-2`
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Other (or leave as detected)
   - **Root Directory**: `./`
   - **Build Command**: `pnpm build:client` (or leave default)
   - **Output Directory**: `dist/spa`
   - **Install Command**: `pnpm install`

4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add each variable:
     - `VITE_PUBLIC_BUILDER_KEY` (if needed)
     - `PING_MESSAGE` (optional)
   - Select environments: Production, Preview, Development

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete

## 🔍 Post-Deployment Verification

### 1. Frontend Tests
- [ ] Homepage loads correctly
- [ ] Navigation works (all routes)
- [ ] Product pages display properly
- [ ] Shopping cart functions
- [ ] Favorites work
- [ ] Profile page accessible
- [ ] Orders page displays
- [ ] Mobile responsive design verified

### 2. Backend Tests
- [ ] `/api/ping` returns correct response
- [ ] `/api/demo` works as expected
- [ ] API error handling works
- [ ] CORS configured correctly

### 3. Performance Checks
- [ ] Page load times acceptable (<3s)
- [ ] Images load properly
- [ ] No console errors
- [ ] No 404 errors in network tab

### 4. Browser Compatibility
- [ ] Chrome/Edge tested
- [ ] Firefox tested
- [ ] Safari tested (if on Mac)
- [ ] Mobile browsers tested

## 🐛 Troubleshooting

### Build Fails
- Check Vercel build logs
- Verify all dependencies in `package.json`
- Ensure Node.js version compatibility
- Run `pnpm typecheck` locally

### API Routes Not Working
- Verify `api/index.ts` exists
- Check `vercel.json` rewrites configuration
- Ensure Express app is exported correctly
- Check Vercel function logs

### Environment Variables Not Loading
- Verify variables are added in Vercel dashboard
- Check variable names match exactly
- Ensure `VITE_` prefix for client-side variables
- Redeploy after adding variables

### 404 Errors on Routes
- Check `vercel.json` rewrites
- Verify SPA routing configuration
- Ensure `index.html` fallback is set

## 📊 Monitoring

### After Deployment
1. **Check Vercel Analytics**:
   - Visit project dashboard
   - Monitor traffic and performance
   - Review error logs

2. **Set Up Alerts** (optional):
   - Configure deployment notifications
   - Set up error alerts
   - Monitor uptime

3. **Review Logs**:
   - Check function logs for errors
   - Monitor build logs
   - Review access logs

## 🔄 Continuous Deployment

### Automatic Deployments
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches
- **Rollback**: Use Vercel dashboard to rollback if needed

### Branch Strategy
- `main` → Production deployments
- `develop` → Preview deployments
- Feature branches → Preview deployments

## 📝 Notes

- Vercel provides automatic HTTPS
- Custom domains can be added in project settings
- Preview deployments have unique URLs
- Function logs available for 24 hours (Hobby plan)
- Build logs available in dashboard

## 🎯 Success Criteria

Deployment is successful when:
- [ ] Application is accessible at Vercel URL
- [ ] All pages load without errors
- [ ] API endpoints respond correctly
- [ ] No console errors in browser
- [ ] Mobile version works properly
- [ ] Performance is acceptable
- [ ] Custom domain configured (if applicable)

---

**Deployment Date**: _________________

**Deployed By**: _________________

**Production URL**: _________________

**Notes**: _________________

