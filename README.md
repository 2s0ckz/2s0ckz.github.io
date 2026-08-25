# Jordan Houri — GitHub Pages starter

Version 44 is a diagnostic isolation build.

Proton multiple-scattering vertex daughter production is set to exactly ZERO.

- proton scattering/kinks remain
- NO call to `spawnAtProtonScatter()` occurs anywhere
- terminal proton interaction (`spawnFromProton`) remains unchanged
- electron/photon interactions remain unchanged
- `window.__particleBuild` reports `v44-zero-scatter-emission`
- `window.__particleDebug.protonScatterEmissions` must remain 0

If intermediate proton vertices still visibly produce daughters in this build,
those daughters are not coming from the proton-scatter emission path.
