# Jordan Houri — GitHub Pages personal site

Version 89 compensates panel spacing for CSS perspective.

Problem:
- a fixed world-space or x-offset gap does not stay visually constant
- as a card rotates, its projected width changes because of both rotateY
  foreshortening and CSS perspective magnification
- this made the visible edge gap expand/contract during transitions

Fix:
- each frame estimates every visible card's projected width:
  projectedWidth ≈ panelWidth * |cos(theta)| * P/(P-z)
- cards are then laid out cumulatively in screen space with a fixed visible gap
- desired screen-space centers are converted back to world-space x positions
  before applying the existing CSS 3D transform

Gap targets:
- desktop/tablet: 32 px
- mobile: 18 px

Responsive panel width from v88 is retained:
- 80vw at <=760px
- linearly interpolated to 75vw at 1920px
- max-width 1440px
