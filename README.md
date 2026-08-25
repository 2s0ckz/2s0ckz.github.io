# Jordan Houri — GitHub Pages starter

Version 25 fixes arc-count calculation by using the browser's actual scroll range.

Formula:
- realScrollableDistance = document.documentElement.scrollHeight - window.innerHeight
- virtualHeight = window.innerHeight + 0.5 * realScrollableDistance
- arcCount = ceil((virtualHeight / 1080) * 3)

This means any genuinely scrollable page taller than one 1080px viewport will
produce more than three arcs.

The layout is recalculated:
- immediately
- on the next animation frame
- after window load
- on resize and scroll

The arc field remains fixed and contributes zero document height.
