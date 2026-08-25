# Jordan Houri — GitHub Pages personal site

Version 71 fixes three issues.

Particles
- primary x positions already represent random locations over the full 360-degree cylindrical surface
- spawn frequency is now exactly 6x the original rate (interval divided by six)
- particles continue simulating while their part of the cylinder is off-screen
- rotating the page can therefore bring previously generated tracks into view
- primary particles still originate only from the top
- the special 0.25 s initial spawn was removed; startup uses the same stationary spawn process as later frames

Load behavior
- the content orbit initializes synchronously at the end of body
- shared `__orbitPhase` / `__orbitStep` are published before particles.js starts
- this removes the startup handoff between an uninitialized and initialized cylinder

Panel sizing
- cards now use `box-sizing: border-box`
- 1440 px is therefore the true maximum OUTSIDE width including padding and border
- on narrower displays cards remain viewport width minus 48 px
