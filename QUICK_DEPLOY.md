# 🚀 Quick Deploy to Vercel

## Fastest Way to Deploy (2 minutes)

### Method 1: Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI (one-time)
npm i -g vercel

# 2. Navigate to project
cd /Users/premkalyan/code/Knitwell/chicko-2

# 3. Login to Vercel
vercel login

# 4. Deploy (preview)
vercel

# 5. Deploy to production
vercel --prod
```

### Method 2: Vercel Dashboard (No CLI needed)

1. **Go to**: [vercel.com/new](https://vercel.com/new)
2. **Import**: `AccolitedigitalIndia/chicko-2`
3. **Click**: "Deploy" (settings are pre-configured)
4. **Done**: Your app is live! 🎉

## 📋 Pre-Deploy Checklist (30 seconds)

- [ ] Code is committed to Git
- [ ] Pushed to GitHub
- [ ] Environment variables ready (if needed)

## 🔑 Environment Variables (Optional)

Only add if you need them:

```
VITE_PUBLIC_BUILDER_KEY=your_key_here
PING_MESSAGE=pong
```

Add in: **Vercel Dashboard** → **Project Settings** → **Environment Variables**

## ✅ Post-Deploy Test (1 minute)

Visit your deployed URL and check:

- [ ] Homepage loads
- [ ] Navigate to Shop page
- [ ] Open a product
- [ ] Add to cart
- [ ] Check `/api/ping` endpoint

## 🎯 Expected Results

- **Build Time**: ~1-2 minutes
- **Deploy Time**: ~30 seconds
- **Total Time**: ~2-3 minutes
- **URL Format**: `https://chicko-2-xxx.vercel.app`

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check build logs in Vercel dashboard |
| 404 on routes | Already fixed in `vercel.json` |
| API not working | Check function logs in dashboard |
| Env vars not loading | Redeploy after adding variables |

## 📚 Need More Details?

- **Full Guide**: See `VERCEL_DEPLOYMENT.md`
- **Checklist**: See `DEPLOYMENT_CHECKLIST.md`
- **Setup Info**: See `VERCEL_SETUP_SUMMARY.md`

## 🎉 That's It!

Your app should be live in under 3 minutes!

---

**Quick Support**: Check Vercel dashboard for real-time logs and deployment status.

