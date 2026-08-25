# Jordan Houri — GitHub Pages starter

Version 7 fixes the CT arc visibility.

## Fix
- particle canvas moved to `z-index: -2`
- CT arcs moved to `z-index: -1`
- content panel remains above both layers
- `body` now creates an isolated stacking context so the negative z-index layers remain visible above the black page background
- arc opacity slightly increased while remaining subtle
- cache-busting updated to `?v=7`
