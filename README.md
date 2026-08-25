# Jordan Houri — GitHub Pages personal site

Version 113 is rebuilt directly from v111 to keep the particle changes minimal.

Only two behavioral changes are applied:

1. Proton scatter draw
   `const scatterDraw = Math.floor(Math.random() * 10.0);`
   giving one successful integer value out of ten.

2. Primary spawn frequency
   Primary spawn timing scales linearly with particle-cylinder circumference,
   with the v111 appearance at a 1920px-wide viewport as the baseline.

Important:
- the v111 particle projection block is untouched
- intermediate-secondary generation/cascade functions are untouched
- electron/photon generation limits and daughter behavior are untouched
- terminal interaction logic is untouched
