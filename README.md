# Jordan Houri — GitHub Pages personal site

Version 83 adjusts perspective, panel spacing, and mobile vertical scrolling.

Perspective
- true regular-prism face orientation is unchanged
- six-panel interior angle remains 120 degrees
- visual z-depth compression is increased substantially:
  0.58 -> 0.24
- particle projection reads the same shared z-depth factor

Panel spacing
- effective polygon side length is now panelWidth + 72 px
- this creates a visible gap between adjacent faces rather than near-touching edges

Mobile scrolling
- mobile cards get a larger bottom padding (72 px)
- explicit overflow-y:auto and momentum scrolling are retained
- scroll-padding-bottom is increased
- panel height leaves 24 px breathing room inside the viewport
- viewport gets an additional 12 px bottom inset
- vertical touch gestures remain native unless they become clearly horizontal orbit drags
