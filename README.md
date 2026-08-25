# Jordan Houri — GitHub Pages starter

Version 50 adds linear cascades to secondaries produced at intermediate proton
multiple-scattering vertices.

Intermediate proton scatter remains:
- 1% emission probability per proton scatter vertex
- ~85% electron / ~15% photon for the initial emitted secondary

New intermediate-secondary cascade behavior:
- tracks use `cascadeMode: "linear"`
- every interaction produces at most one successor track (1 -> 1)
- no branching/shower multiplication from these intermediate secondaries
- intermediate electrons can radiate into a photon (~12% at each continuation)
- otherwise the electron continues as one electron
- intermediate photons can convert into one electron (~25%) or continue as one photon
- electron-origin linear chains are bounded to 5 generations
- photon-origin linear chains are bounded to 2 generations

Normal terminal proton interactions and their existing cascades remain unchanged.
Normal electrons also retain their existing photon-production branch.
