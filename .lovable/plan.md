

## Improvements to the Scroll Video Section

Your canvas-based frame sequence implementation is solid. Here are several enhancements to make it more polished, performant, and visually impressive:

### 1. Fix Build Error (NotFound.tsx)
Remove the invalid `draggable` string prop on an SVG element to clear the TypeScript error.

### 2. Progressive Image Loading with Loading Indicator
Currently all 192 images start loading at once with no feedback. Add a loading state that shows a progress bar or percentage while frames preload, then reveal the canvas once ready.

### 3. Use `requestAnimationFrame` for Rendering
Wrap the canvas `render` call inside `requestAnimationFrame` to avoid redundant repaints and stay in sync with the browser's paint cycle.

### 4. Prioritized Preloading Strategy
Instead of loading all 192 frames equally, load the first ~20 frames immediately (so the section is usable fast), then load the rest in the background. This improves perceived performance significantly.

### 5. Add a Text Overlay
Layer a subtle headline or tagline on top of the canvas (e.g., "Discover Uganda") that fades in/out as the user scrolls, giving the section editorial purpose rather than just being a silent video.

### 6. Use `devicePixelRatio` for Sharp Canvas
Multiply the canvas dimensions by `window.devicePixelRatio` and scale the context, so the frames look crisp on Retina/HiDPI displays.

### 7. Reduce Spring Stiffness for Smoother Feel
Your current spring has `stiffness: 100`. Lowering it to around `50-60` will make the frame scrubbing feel more cinematic and less snappy.

---

### Technical Details

**Files to modify:**
- `src/components/ScrollVideoSection.tsx` -- all improvements above
- `src/pages/NotFound.tsx` -- fix the `draggable` prop TypeScript error

**ScrollVideoSection.tsx changes:**

```text
1. Add useState for loading progress
2. Batch-preload first 20 frames, then remainder
3. Track loaded count, show progress overlay until >80% loaded
4. In render(): wrap context.drawImage in requestAnimationFrame
5. In handleResize(): use devicePixelRatio for canvas resolution
   - canvas.width = window.innerWidth * dpr
   - canvas.height = window.innerHeight * dpr
   - context.scale(dpr, dpr)
6. Lower spring stiffness from 100 to 50
7. Add a motion.div text overlay with scroll-linked opacity
   - Fade in from progress 0.1 to 0.2
   - Fade out from progress 0.4 to 0.5
```

**NotFound.tsx fix:**
- Remove or change `draggable="false"` to `draggable={false}` (boolean, not string).

