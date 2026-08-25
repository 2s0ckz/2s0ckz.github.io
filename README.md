# Jordan Houri — GitHub Pages personal site

Version 103 fixes the v102 side-arrow layout regression.

Root causes:
- the top controls row was removed, but `.orbit-shell` still had three grid rows:
  heading / controls / viewport
- with no controls row, the viewport landed in the auto-sized middle row and collapsed
- the new side arrows also lacked the legacy `orbitPrev` / `orbitNext` IDs used by the existing JS

Fixes:
- shell grid is now `auto minmax(0,1fr)` for heading + viewport
- side arrows retain the minimalist v102 appearance
- left arrow has id `orbitPrev`
- right arrow has id `orbitNext`

No orbit geometry, text-selection logic, responsive sizing, particles, or panel styling changed.
