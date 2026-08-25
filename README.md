# Jordan Houri — GitHub Pages personal site

Version 93 fixes sub-1920 responsive geometry synchronization and restores the
pre-orbit panel surface treatment.

Responsive orbit fix
- responsive panel width is recalculated before every render/geometry measurement
- resize events explicitly update the width before rendering
- this prevents CSS card width and cylinder radius from becoming out of sync
  when the viewport crosses below 1920 px
- width model remains:
  - <=760 px: 80vw
  - 760–1920 px: linear interpolation from 80vw to 75vw
  - >=1920 px: 75vw
  - max-width: 1440 px

Pre-orbit panel treatment
- background color/opacity was already correct:
  rgba(12,15,26,0.5625)
- backdrop blur restored from the orbit-era 8 px to the original pre-orbit 1 px
- -webkit-backdrop-filter restored to 1 px as well

Rigid fixed cylinder anchors and real geometric panel gaps from v92 are retained.
