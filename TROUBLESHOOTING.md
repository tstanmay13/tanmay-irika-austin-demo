# Troubleshooting Guide

## Common Issues and Solutions

### React Version Compatibility Error

**Error Message:**
```
Runtime TypeError
can't access property "ReactCurrentOwner", ReactSharedInternals is undefined
```

**Cause:**
React Three Fiber 8.x requires React 18.2.0 specifically. Next.js 15 may try to use React 19, causing compatibility issues.

**Solution:**
This has been fixed in the project. The `package.json` is configured to use React 18.2.0:

```json
"dependencies": {
  "react": "18.2.0",
  "react-dom": "18.2.0"
}
```

If you still see this error:
```bash
rm -rf node_modules package-lock.json
npm install
PORT=3001 npm run dev
```

---

### Port Already in Use

**Error Message:**
```
Port 3000 is already in use
```

**Solution:**
Use a different port:
```bash
PORT=3001 npm run dev
```

Or kill the process using port 3000:
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

---

### Panorama Image Not Loading

**Symptoms:**
- Black screen
- Loading message stays visible
- Console error about image not found

**Solution:**

1. **Check file exists:**
   ```bash
   ls -lh public/austin-panorama.jpg
   ```

2. **Verify file name** (case-sensitive):
   - Correct: `austin-panorama.jpg`
   - Wrong: `Austin-Panorama.JPG`, `austin_panorama.jpg`

3. **Check file format**:
   - Must be a valid image (JPG or PNG)
   - Must be equirectangular (2:1 aspect ratio)

4. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

---

### Build Errors

**Error Message:**
```
Error: Failed to compile
```

**Solutions:**

1. **Clean install dependencies:**
   ```bash
   rm -rf node_modules package-lock.json .next
   npm install
   npm run build
   ```

2. **Check TypeScript errors:**
   ```bash
   npx tsc --noEmit
   ```

3. **Check ESLint errors:**
   ```bash
   npm run lint
   ```

---

### Three.js / Canvas Errors

**Error Message:**
```
Error: Canvas is not defined
```

**Cause:**
Three.js trying to run during server-side rendering.

**Solution:**
This is already handled in the code with dynamic import:
```typescript
const PanoramaViewer = dynamic(() => import('@/components/PanoramaViewer'), {
  ssr: false
});
```

If you still see this error, ensure you're not importing PanoramaViewer directly in a server component.

---

### Performance Issues / Laggy Controls

**Symptoms:**
- Slow panning
- Choppy zoom
- High CPU usage

**Solutions:**

1. **Reduce image file size:**
   ```bash
   # Use ImageMagick to resize
   convert austin-panorama.jpg -resize 4096x2048 -quality 85 austin-panorama-optimized.jpg
   ```

2. **Lower sphere geometry detail** in [components/PanoramaViewer.tsx:13](components/PanoramaViewer.tsx#L13):
   ```typescript
   <sphereGeometry args={[500, 32, 16]} /> // Reduced from 60, 40
   ```

3. **Disable damping** for faster response in [components/PanoramaViewer.tsx:72](components/PanoramaViewer.tsx#L72):
   ```typescript
   enableDamping={false}
   ```

---

### Module Not Found Errors

**Error Message:**
```
Module not found: Can't resolve '@react-three/fiber'
```

**Solution:**
```bash
npm install
```

If that doesn't work:
```bash
npm install three @react-three/fiber @react-three/drei
```

---

### Vercel Deployment Fails

**Symptoms:**
- Build succeeds locally but fails on Vercel
- "Module not found" errors on Vercel

**Solutions:**

1. **Ensure all dependencies are in package.json** (not devDependencies):
   ```json
   "dependencies": {
     "next": "^15.0.0",
     "react": "18.2.0",
     "react-dom": "18.2.0",
     "three": "^0.160.0",
     "@react-three/fiber": "^8.15.0",
     "@react-three/drei": "^9.92.0"
   }
   ```

2. **Check build logs in Vercel dashboard**

3. **Test build locally:**
   ```bash
   npm run build
   ```

4. **Ensure image is committed:**
   ```bash
   git add public/austin-panorama.jpg
   git commit -m "Add panorama image"
   git push
   ```

---

### Custom Path Not Working (`/tanmay-irika-austin`)

**Symptoms:**
- 404 error on custom path
- App works at root but not at `/tanmay-irika-austin`

**Solutions:**

1. **Verify `next.config.ts` has basePath:**
   ```typescript
   basePath: process.env.NODE_ENV === 'production' ? '/tanmay-irika-austin' : ''
   ```

2. **Verify `vercel.json` exists** in project root

3. **Redeploy to Vercel** after making changes

4. **Test locally with production build:**
   ```bash
   npm run build
   npm start
   # Visit http://localhost:3000/tanmay-irika-austin
   ```

---

### TypeScript Errors

**Error Message:**
```
Type 'X' is not assignable to type 'Y'
```

**Solutions:**

1. **Install type definitions:**
   ```bash
   npm install --save-dev @types/three @types/react @types/react-dom
   ```

2. **Regenerate type definitions:**
   ```bash
   rm -rf .next
   npm run dev
   ```

3. **Check tsconfig.json** is properly configured

---

### Image Appears Distorted

**Symptoms:**
- Stretched or compressed panorama
- Visible seams
- Wrong projection

**Solutions:**

1. **Verify image is equirectangular:**
   - Must be 2:1 aspect ratio (e.g., 4096x2048)
   - Not cylindrical or other projection types

2. **Check image dimensions:**
   ```bash
   file public/austin-panorama.jpg
   ```

3. **Try a known-good equirectangular image** to test

4. **Adjust sphere scale** if image is backwards in [components/PanoramaViewer.tsx:12](components/PanoramaViewer.tsx#L12):
   ```typescript
   <mesh scale={[1, 1, 1]}> // Try [1, 1, 1] instead of [-1, 1, 1]
   ```

---

## Still Having Issues?

1. **Check browser console** (F12) for specific error messages
2. **Check terminal/dev server logs** for build errors
3. **Try the nuclear option:**
   ```bash
   rm -rf node_modules package-lock.json .next out
   npm install
   npm run dev
   ```

4. **Review the documentation:**
   - [README.md](README.md)
   - [QUICKSTART.md](QUICKSTART.md)
   - [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

5. **Check versions match:**
   ```bash
   node --version  # Should be 18+
   npm --version   # Should be 9+
   ```

---

## Getting Help

When reporting issues, include:
- Full error message from console/terminal
- Node.js and npm versions
- Operating system
- Steps to reproduce
- Whether it works in development or production

---

## Known Limitations

1. **Mobile support**: Touch controls work but gyroscope not implemented
2. **VR mode**: Not currently supported
3. **Multiple panoramas**: Only one panorama at a time
4. **Hotspots**: Not implemented (could be added)
5. **Image optimization**: Manual optimization required before adding to project
