# Jordan Houri — GitHub Pages starter

Version 48 cleanly rebuilds the particle engine instead of continuing to patch
the diagnostic versions.

Particle behavior:
- blue primary protons
- normal terminal proton interactions restored
- terminal proton interactions always create at least one electron
- normal electron and photon cascades restored
- generation limits are now propagated correctly instead of silently resetting
- intermediate proton multiple-scattering vertices independently emit with a
  9.5% probability
- intermediate scatter daughters are terminal single tracks
- the proton continues after an intermediate emission

Debug:
`window.__particleBuild` -> `v48-clean-particle-engine`
`window.__particleDebug` exposes scatter, terminal-interaction, electron, and
photon creation counters.
