# Jordan Houri — GitHub Pages personal site

Version 84 removes all z-depth compression.

- panel depth is restored to the true regular-prism geometry:
  z = R * (1 - cos(theta))
- exact face orientation remains unchanged
- six-panel interior angle remains 120 degrees
- particle projection returns to the full uncompressed cylindrical perspective

Retained from v83:
- wider spacing between adjacent panels (effective side length = panelWidth + 72 px)
- mobile vertical-scroll fixes and bottom clearance
- wheel threshold / settle behavior
- drag snapping
- translucent panels and title bar
