# Jordan Houri — GitHub Pages starter

Version 24 uses a true virtual parallax arc canvas.

Formula:
- realScrollableDistance = content-panel bottom - viewport height
- virtualHeight = viewport height + 0.5 * realScrollableDistance
- arcCount = ceil((virtualHeight / 1080) * 3)

Example:
- content = 2160px
- viewport = 1080px
- real scroll = 1080px
- virtual arc height = 1620px
- arc count = ceil(1620/1080*3) = 5

The arc field is fixed, so its virtual height does not increase document height.
All arcs are distributed through the reachable virtual canvas, and the whole
field translates upward at exactly 50% of normal page scroll speed.
