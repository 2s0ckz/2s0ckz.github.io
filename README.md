# Jordan Houri — GitHub Pages personal site

Version 85 makes the 1440 px panel cap explicit.

Panel sizing:
- desktop: width = calc(100vw - 48px), max-width = 1440px
- mobile: width = calc(100vw - 24px), max-width = 1440px
- box-sizing remains border-box, so padding and borders are included inside 1440px
- the orbit geometry now measures the actual rendered card width with
  getBoundingClientRect() and caps that measurement at 1440px
- the arrow-control row also uses an explicit max-width: 1440px

All regular-prism geometry, spacing, mobile scrolling fixes, snapping, timing,
particles, and opacity remain unchanged.
