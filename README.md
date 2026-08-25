# Jordan Houri — GitHub Pages personal site

Version 88 updates the responsive panel width model.

Width behavior:
- at viewport widths <= 760 px, panel/control width = 80vw
- at viewport widths >= 1920 px, panel/control width = 75vw
- between 760 px and 1920 px, the vw percentage is linearly interpolated
- max-width remains 1440 px
- box-sizing remains border-box, so the 1440 px cap includes padding and border
- orbit geometry still measures the actual rendered card width

Interpolation:
- t = (viewportWidth - 760) / (1920 - 760)
- widthRatio = 80 + (75 - 80) * t   for 760 < viewportWidth < 1920

All prism geometry, particle behavior, scrolling fixes, snapping, timing, and
stable visible card-gap behavior remain unchanged.
