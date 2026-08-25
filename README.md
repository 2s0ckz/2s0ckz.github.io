# Jordan Houri — GitHub Pages starter

Version 41 returns proton multiple-scattering secondary production to a
per-vertex probabilistic model.

At each proton multiple-scattering vertex:
- 8% chance of one terminal red electron
- 1.5% chance of one terminal green photon
- 90.5% chance of no daughter
- proton always continues after the vertex

The previous scheduled scatter-count mechanism is removed.
Scatter-produced daughters remain terminal (`maxGeneration: 0`) so one vertex
cannot create a cascade.
