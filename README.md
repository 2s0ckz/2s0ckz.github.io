# Jordan Houri — GitHub Pages personal site

Version 61 replaces the horizontal flex-track implementation with a true
inside-cylinder orbit.

Key architectural change:
- panels are no longer laid out in a horizontal strip
- there is no cloned periodic track
- every panel is absolutely positioned from cylindrical coordinates
- the viewer is treated as being at the cylinder center
- adjacent panel angular spacing is computed from panel width and cylinder radius
  so visible edges are approximately 4 px apart
- scroll changes angular phase, not horizontal translation
- active panel remains centered and up to 1440 px wide

First-scroll fix:
- phase starts exactly at 0
- no measured initial horizontal offset
- no wrap correction
- no cloned-set seam
- first interaction uses the same phase model as every later interaction
