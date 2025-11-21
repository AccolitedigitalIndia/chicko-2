# Vercel Deployment Guide

This project is configured for deployment on Vercel with both frontend (React SPA) and backend (Express API) support.

## Project Structure

- **Frontend**: React 18 + Vite + TypeScript + TailwindCSS
- **Backend**: Express API with serverless functions
- **Package Manager**: pnpm

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd /Users/premkalyan/code/Knitwell/chicko-2
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? Yes
   - Which scope? (Select your account/team)
   - Link to existing project? No
   - What's your project's name? chicko-2
   - In which directory is your code located? ./
   - Want to override the settings? No

5. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import the GitHub repository: `AccolitedigitalIndia/chicko-2`
4. Configure the project:
   - **Framework Preset**: Other
   - **Build Command**: `pnpm build` (or leave default)
   - **Output Directory**: `dist/spa`
   - **Install Command**: `pnpm install`
5. Add environment variables (if needed):
   - `VITE_PUBLIC_BUILDER_KEY` (if using Builder.io)
   - `PING_MESSAGE` (optional, for demo)
6. Click "Deploy"

## Environment Variables

Add these environment variables in your Vercel project settings:

- `VITE_PUBLIC_BUILDER_KEY`: Your Builder.io public API key (if applicable)
- `PING_MESSAGE`: Custom message for the ping endpoint (optional)

To add environment variables:
1. Go to your project in Vercel Dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable for Production, Preview, and Development environments

## API Routes

All API endpoints are prefixed with `/api/`:
- `GET /api/ping` - Health check endpoint
- `GET /api/demo` - Demo endpoint

The Express server is wrapped as a Vercel serverless function in `/api/index.ts`.

## Configuration Files

- **vercel.json**: Vercel deployment configuration
  - Defines API rewrites
  - Configures serverless functions
  - Sets up SPA routing

- **.vercelignore**: Files to exclude from deployment

## Local Development

```bash
# Install dependencies
pnpm install

# Start dev server (runs on port 8080)
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm start
```

## Troubleshooting

### Build Fails
- Ensure all dependencies are installed: `pnpm install`
- Check that Node.js version is 18.x or higher
- Verify TypeScript compilation: `pnpm typecheck`

### API Routes Not Working
- Check that `/api/index.ts` exists and exports the Express app
- Verify `vercel.json` rewrites are correctly configured
- Check Vercel function logs in the dashboard

### Environment Variables Not Working
- Ensure variables are prefixed with `VITE_` for client-side access
- Server-side variables don't need the prefix
- Redeploy after adding new environment variables

## Post-Deployment

After successful deployment, Vercel will provide:
- **Production URL**: Your live application URL
- **Preview URLs**: Unique URLs for each branch/PR
- **Deployment Logs**: Available in the Vercel dashboard

## Continuous Deployment

Vercel automatically:
- Deploys the `main` branch to production
- Creates preview deployments for pull requests
- Rebuilds on every push to connected branches

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Serverless Functions](https://vercel.com/docs/functions/serverless-functions)

