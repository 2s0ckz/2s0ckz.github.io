# Jordan Houri — GitHub Pages personal site

Version 112 updates particle interaction probability and primary frequency.

Particle scatter emission
- uses the requested integer draw:
  `const scatterDraw = Math.floor(Math.random() * 10.0);`
- one successful value out of ten gives a 10% emission probability per proton
  scatter vertex

Primary-particle frequency
- the v111 appearance at a 1920px-wide viewport is the baseline
- the current particle-cylinder circumference is compared with the circumference
  of that 1920px baseline cylinder
- spawn frequency scales linearly with circumference
- equivalently, the random spawn interval is divided by the circumference ratio
- the existing `rand(3.04, 4.8) / 6` rate is therefore unchanged at the 1920px
  baseline
- the particle radius used for this normalization is the same radius used by the
  particle projection, including the 1200px minimum-radius floor

No orbit-panel geometry, arrows, scrolling, or other particle interaction logic changed.
