# 🚀 START HERE

## Your Austin Panorama Viewer is Ready!

The development server is running at:
**http://localhost:3001**

Open this URL in your browser to see the panoramic viewer in action!

(Note: Fixed React version compatibility - using React 18.2.0 for Three.js compatibility)

---

## What You'll See

✅ A 360-degree panoramic view
✅ Drag with your mouse to look around
✅ Scroll to zoom in and out
✅ Smooth, responsive controls

---

## Current Status

The app is fully functional with a **placeholder panorama image**. Everything works, but you'll want to replace it with a real Austin skyline photo.

---

## Next Steps (Choose Your Path)

### Path A: Quick Test (Right Now)
Just open http://localhost:3001 and explore the viewer!

### Path B: Add Real Austin Panorama
See [GET_PANORAMA.md](GET_PANORAMA.md) for detailed instructions on:
- Where to download free 360° panoramas
- How to take your own at Auditorium Shores
- Where to license professional photos

### Path C: Deploy to Production
See [DEPLOY.md](DEPLOY.md) for step-by-step instructions to:
1. Push to GitHub
2. Deploy to Vercel
3. Configure custom domain (tanmay-singh.com/tanmay-irika-austin)

---

## Project Files Overview

### Main Application
- [app/page.tsx](app/page.tsx) - Entry point
- [components/PanoramaViewer.tsx](components/PanoramaViewer.tsx) - 360° viewer (main logic here)
- [public/austin-panorama.jpg](public/austin-panorama.jpg) - Current panorama image (replace this!)

### Documentation
- [README.md](README.md) - Complete documentation
- [QUICKSTART.md](QUICKSTART.md) - 5-minute setup guide
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Technical overview

### Configuration
- [package.json](package.json) - Dependencies
- [next.config.ts](next.config.ts) - Next.js settings
- [vercel.json](vercel.json) - Deployment config

---

## Useful Commands

```bash
# Development
npm run dev              # Already running on port 3001!
PORT=3002 npm run dev    # Use different port if needed

# Production
npm run build            # Test production build
npm start                # Serve production build

# Deployment
vercel                   # Deploy to Vercel (requires vercel CLI)
```

---

## Customization Quick Tips

### Change Initial View Angle
Edit [components/PanoramaViewer.tsx:20](components/PanoramaViewer.tsx#L20):
```typescript
camera.rotation.set(0, Math.PI / 2, 0); // Rotate 90 degrees
```

### Adjust Pan/Zoom Speed
Edit [components/PanoramaViewer.tsx:73-74](components/PanoramaViewer.tsx#L73-L74):
```typescript
rotateSpeed={-1.0}  // Faster panning
zoomSpeed={1.5}     // Faster zoom
```

### Change Text/Branding
Edit [components/PanoramaViewer.tsx:38-41](components/PanoramaViewer.tsx#L38-L41):
```typescript
<h1>Your Custom Title</h1>
<p>Your custom instructions</p>
```

---

## Troubleshooting

### Can't see the panorama?
1. Check browser console for errors (F12)
2. Verify `public/austin-panorama.jpg` exists
3. Try refreshing the page

### Performance issues?
1. Reduce image file size
2. Use JPEG at 80-85% quality
3. Recommended: 4096x2048 pixels

### Port already in use?
```bash
PORT=3002 npm run dev  # Try different port
```

---

## Support & Resources

- **Three.js Docs**: https://threejs.org/docs
- **Next.js Docs**: https://nextjs.org/docs
- **React Three Fiber**: https://docs.pmnd.rs/react-three-fiber

---

## Success Checklist

- [ ] Opened http://localhost:3001 in browser
- [ ] Can see the panoramic view
- [ ] Can drag to pan around
- [ ] Can zoom with mouse wheel
- [ ] Decided on next steps (replace image, deploy, or customize)

---

## Ready to Deploy?

When you're happy with the local version:

1. **Replace the panorama image** (optional but recommended)
   - Get a real Austin skyline 360° photo
   - Save as `public/austin-panorama.jpg`

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial Austin panorama viewer"
   git push origin main
   ```

3. **Deploy to Vercel**
   - Go to https://vercel.com
   - Import your GitHub repo
   - Click "Deploy"
   - Done! 🎉

Full deployment guide: [DEPLOY.md](DEPLOY.md)

---

## Questions?

Check the documentation files:
- [README.md](README.md) - General info
- [QUICKSTART.md](QUICKSTART.md) - Quick setup
- [GET_PANORAMA.md](GET_PANORAMA.md) - Image sourcing
- [DEPLOY.md](DEPLOY.md) - Deployment
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Technical details

---

**You're all set! Open http://localhost:3001 and enjoy your 360° Austin skyline viewer!** 🌆
