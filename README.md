# Jordan Houri — GitHub Pages starter

Version 45 is a strict isolation build.

All daughter generation is disabled:
- proton scatter vertices: no daughters
- terminal proton interactions: no daughters
- electron interactions: no daughters
- photon interactions: no daughters

Only primary blue proton tracks should appear.

Runtime marker:
`window.__particleBuild === "v45-blue-protons-only-diagnostic"`

If any red or green tracks appear in this build, they are not being generated
by the current `particles.js` secondary-production code.
