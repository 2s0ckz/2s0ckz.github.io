# Jordan Houri — GitHub Pages personal site

Version 99 fixes arrow spacing and text-selection behavior.

- desktop arrow row is explicitly reduced to a compact 22px minimum height
- desktop row has zero vertical margin/padding
- arrow buttons use 1px vertical padding and 20px minimum height
- mobile retains 6px bottom breathing room around the arrow row
- text selection is disabled only while a real orbit drag is active
- normal text selection is restored on pointer release/cancel, vertical-touch exit, and window blur

All orbit geometry, responsive sizing, mobile panel scrolling, particles, blur,
sharp corners, snapping, and transition timing remain unchanged.
