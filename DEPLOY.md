# Deployment Guide

## Quick Deployment to Vercel

### Method 1: Deploy from GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial Austin panorama viewer"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Configure Custom Domain:**
   - After deployment, go to Project Settings > Domains
   - Add `tanmay-singh.com` as a custom domain
   - Follow DNS configuration instructions
   - The app will be accessible at `https://tanmay-singh.com/tanmay-irika-austin`

### Method 2: Deploy with Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow prompts:**
   - Link to existing project or create new
   - Confirm settings
   - Wait for deployment

4. **Deploy to production:**
   ```bash
   vercel --prod
   ```

## Custom Path Configuration

The app is already configured to run at `/tanmay-irika-austin`:

- **next.config.ts**: Sets `basePath` for production
- **vercel.json**: Configures URL rewrites

When deployed on `tanmay-singh.com`, access at:
```
https://tanmay-singh.com/tanmay-irika-austin
```

## Environment Configuration

No environment variables are required for basic deployment.

## Pre-Deployment Checklist

- [ ] Replace placeholder panorama with real Austin skyline image
- [ ] Optimize panorama image (recommended: 4096x2048, 80-85% quality)
- [ ] Test build locally: `npm run build`
- [ ] Test production build: `npm start` (after build)
- [ ] Verify all assets are in `public/` folder
- [ ] Update metadata in `app/layout.tsx` if needed

## Vercel Configuration

Your `vercel.json` is already set up with:

```json
{
  "rewrites": [
    {
      "source": "/tanmay-irika-austin",
      "destination": "/"
    },
    {
      "source": "/tanmay-irika-austin/:path*",
      "destination": "/:path*"
    }
  ]
}
```

This ensures the app works at the custom path.

## Domain Setup (tanmay-singh.com)

### Option 1: Subdomain Path (Recommended)

Deploy as a path on your main domain:
- URL: `tanmay-singh.com/tanmay-irika-austin`
- No additional DNS required
- Works with existing site structure

### Option 2: Subdomain

Create a subdomain:
- URL: `austin.tanmay-singh.com`
- Requires DNS CNAME record
- Separate deployment

### Option 3: Separate Domain

Use a different domain:
- URL: `austin-panorama.com` (example)
- Requires domain purchase and DNS setup

## Post-Deployment

1. **Test the deployed site:**
   - Visit your deployment URL
   - Test drag-to-pan functionality
   - Test zoom with mouse wheel
   - Check responsiveness on different screen sizes
   - Verify image loads correctly

2. **Performance optimization:**
   - Check Lighthouse score in Chrome DevTools
   - Optimize image if loading is slow
   - Consider enabling Vercel Image Optimization

3. **Monitor:**
   - Check Vercel Analytics dashboard
   - Monitor loading times
   - Track any errors in Vercel logs

## Troubleshooting

### Build fails on Vercel

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Test build locally first: `npm run build`

### 404 on custom path

1. Verify `vercel.json` is in root directory
2. Check that `next.config.ts` has correct basePath
3. Redeploy after making changes

### Image not loading

1. Ensure `austin-panorama.jpg` is in `public/` folder
2. Check file name is exact (case-sensitive)
3. Verify image is accessible in build output

### Slow loading

1. Reduce panorama image file size
2. Use JPEG with 80-85% quality
3. Consider using WebP format
4. Enable Vercel Image Optimization

## Updating the Site

To update after deployment:

```bash
# Make your changes
git add .
git commit -m "Update description"
git push origin main
```

Vercel will automatically rebuild and deploy.

## Rollback

If something breaks:

1. Go to Vercel dashboard
2. Navigate to your project
3. Click "Deployments"
4. Find a previous working deployment
5. Click the three dots menu
6. Select "Promote to Production"

## Support

- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Three.js Documentation: https://threejs.org/docs

## Cost

- Vercel Hobby plan is free for personal projects
- Includes:
  - Unlimited deployments
  - 100GB bandwidth per month
  - Automatic HTTPS
  - Global CDN
  - CI/CD integration

For commercial use or higher traffic, consider Vercel Pro plan.
