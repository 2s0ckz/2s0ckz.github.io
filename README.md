# Jordan Houri — GitHub Pages personal site

Version 68 fixes the front-panel centering bug at its source.

Root cause:
- an old pre-cylinder `.orbit-track` CSS rule was still present
- it used `width: max-content` and `inset: 0 auto 0 0`
- the absolute cylinder set therefore inherited a coordinate space anchored at
  the viewport's left edge instead of spanning the viewport
- `left: 50%` on each panel consequently resolved near the left edge

Fix:
- `.orbit-track` is now `inset: 0; width: 100%; height: 100%`
- `.orbit-set` is explicitly `width: 100%; height: 100%`
- the front panel's `left: 50%` now means the actual viewport center

Orbit geometry, wheel threshold snapping, drag snapping, and panel translucency are unchanged.
