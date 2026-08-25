# Jordan Houri — GitHub Pages starter

Version 47 restores the normal particle system after the diagnostic builds.

Restored:
- terminal proton interactions (`spawnFromProton`)
- normal electron cascades
- normal photon cascades
- electron/photon creation in `addTrack`

Intermediate proton multiple-scatter secondaries:
- 9.5% probability per scatter vertex
- explicit integer draw: 0–999, emit only for values below 95
- scatter-produced daughters remain terminal (`maxGeneration: 0`)
- proton continues after emission

Runtime marker:
`window.__particleBuild === "v47-restored-terminal-probabilistic-scatter"`
