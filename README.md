# Jordan Houri — GitHub Pages starter

Version 38 replaces the proton-local scatter-secondary guard with a hard global guard.

Fix:
- every track now has an immutable numeric ID
- a global `Set` records proton IDs that have already emitted a scatter secondary
- `spawnAtProtonScatter()` refuses to emit if that proton ID is already in the Set
- therefore a proton cannot emit more than one multiple-scatter secondary, even if local state is reset
- only 35% of protons are eligible
- eligible emission remains scheduled at scatter 7–14
- emitted daughter is terminal (`maxGeneration: 0`)
- proton continues after emission

No visual/perceptual workaround is involved; this is a code-level one-shot constraint.
