(() => {
  const canvas = document.getElementById("particle-background");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const COLORS = {
    proton: [55, 125, 255],
    electron: [255, 65, 65],
    photon: [70, 235, 115]
  };

  let width = 0;
  let height = 0;
  let dpr = 1;
  let last = performance.now();
  let spawnClock = 0;
  let nextFamilyId = 1;

  const activeTracks = [];
  const completedTracks = [];
  const families = new Map();

  const rand = (a, b) => a + Math.random() * (b - a);

  function gaussianish() {
    return (
      Math.random() +
      Math.random() +
      Math.random() +
      Math.random() -
      2
    ) / 2;
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(2, window.devicePixelRatio || 1);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createFamily() {
    const id = nextFamilyId++;

    families.set(id, {
      activeCount: 0,
      fadeStart: null,
      fadeDuration: rand(1300, 2200)
    });

    return id;
  }

  function addTrack(kind, x, y, angle, familyId, options = {}) {
    const defaults = {
      proton: {
        speed: rand(34, 46),
        stepLength: rand(height * 0.32, height * 0.72),
        generation: 0,
        maxGeneration: 0,
        scatterSigma: 0.045
      },
      electron: {
        speed: rand(72, 98),
        stepLength: rand(20, 44),
        generation: 0,
        maxGeneration: 4
      },
      photon: {
        speed: rand(68, 92),
        stepLength: rand(70, 145),
        generation: 0,
        maxGeneration: 2
      }
    }[kind];

    const family = families.get(familyId);
    if (!family) return;

    family.activeCount += 1;

    activeTracks.push({
      kind,
      familyId,
      x,
      y,
      angle,
      speed: options.speed ?? defaults.speed,
      distanceLeft: options.stepLength ?? defaults.stepLength,
      generation: options.generation ?? defaults.generation,
      maxGeneration: options.maxGeneration ?? defaults.maxGeneration,
      scatterSigma: options.scatterSigma ?? defaults.scatterSigma,
      scatterClock: rand(0.055, 0.14),
      trail: [{ x, y }]
    });
  }

  function spawnPrimary() {
    const familyId = createFamily();
    const x = rand(width * 0.04, width * 0.96);
    const angle = rand(Math.PI * 0.39, Math.PI * 0.61);

    addTrack("proton", x, -20, angle, familyId, {
      stepLength: rand(height * 0.30, height * 0.72)
    });
  }

  function spawnFromProton(track) {
    const electronCount = Math.random() < 0.72 ? Math.ceil(rand(1, 3)) : 1;
    const photonCount = Math.random() < 0.32 ? 1 : 0;

    for (let i = 0; i < electronCount; i++) {
      addTrack(
        "electron",
        track.x,
        track.y,
        track.angle + rand(-1.35, 1.35),
        track.familyId,
        {
          generation: 0,
          stepLength: rand(18, 42)
        }
      );
    }

    for (let i = 0; i < photonCount; i++) {
      addTrack(
        "photon",
        track.x,
        track.y,
        track.angle + rand(-2.1, 2.1),
        track.familyId,
        {
          generation: 0,
          stepLength: rand(75, 140)
        }
      );
    }
  }

  function spawnElectronChildren(track) {
    if (track.generation >= track.maxGeneration) return;

    const nextGeneration = track.generation + 1;

    // Main electron branch: short mean free path and medium-angle scattering.
    addTrack(
      "electron",
      track.x,
      track.y,
      track.angle + gaussianish() * 0.78,
      track.familyId,
      {
        generation: nextGeneration,
        stepLength: rand(14, 34),
        speed: Math.max(50, track.speed * rand(0.90, 0.98))
      }
    );

    // Keep rare extra branches sparse enough for a portfolio background.
    if (Math.random() < 0.09 && nextGeneration < track.maxGeneration) {
      addTrack(
        "electron",
        track.x,
        track.y,
        track.angle + rand(-1.25, 1.25),
        track.familyId,
        {
          generation: nextGeneration,
          stepLength: rand(10, 25),
          speed: rand(62, 82)
        }
      );
    }

    if (Math.random() < 0.05) {
      addTrack(
        "photon",
        track.x,
        track.y,
        track.angle + rand(-0.7, 0.7),
        track.familyId,
        {
          generation: 0,
          stepLength: rand(60, 110)
        }
      );
    }
  }

  function spawnPhotonChildren(track) {
    if (track.generation >= track.maxGeneration) return;

    const nextGeneration = track.generation + 1;

    // Photon branch: at most two generations with large angular deflections.
    addTrack(
      "photon",
      track.x,
      track.y,
      track.angle + rand(-2.5, 2.5),
      track.familyId,
      {
        generation: nextGeneration,
        stepLength: rand(55, 115),
        speed: Math.max(46, track.speed * rand(0.84, 0.95))
      }
    );

    if (Math.random() < 0.25) {
      addTrack(
        "electron",
        track.x,
        track.y,
        track.angle + rand(-2.0, 2.0),
        track.familyId,
        {
          generation: 0,
          stepLength: rand(15, 34),
          speed: rand(66, 88)
        }
      );
    }
  }

  function finishTrack(index, track, generateSecondaries) {
    if (generateSecondaries) {
      if (track.kind === "proton") spawnFromProton(track);
      if (track.kind === "electron") spawnElectronChildren(track);
      if (track.kind === "photon") spawnPhotonChildren(track);
    }

    // Retain every completed primary/daughter path until the last member of
    // the family is finished, then fade the whole event together.
    completedTracks.push({
      kind: track.kind,
      familyId: track.familyId,
      trail: track.trail.slice()
    });

    activeTracks.splice(index, 1);

    const family = families.get(track.familyId);
    if (!family) return;

    family.activeCount -= 1;

    if (family.activeCount <= 0) {
      family.activeCount = 0;
      family.fadeStart = performance.now() + rand(400, 800);
    }
  }

  function familyOpacity(familyId, now) {
    const family = families.get(familyId);

    if (!family || family.fadeStart === null || now < family.fadeStart) {
      return 1;
    }

    return Math.max(
      0,
      1 - (now - family.fadeStart) / family.fadeDuration
    );
  }

  function removeFadedFamilies(now) {
    const expired = [];

    for (const [id, family] of families.entries()) {
      const done =
        family.activeCount === 0 &&
        family.fadeStart !== null &&
        now >= family.fadeStart + family.fadeDuration;

      if (done) expired.push(id);
    }

    if (!expired.length) return;

    const expiredSet = new Set(expired);

    for (let i = completedTracks.length - 1; i >= 0; i--) {
      if (expiredSet.has(completedTracks[i].familyId)) {
        completedTracks.splice(i, 1);
      }
    }

    for (const id of expired) {
      families.delete(id);
    }
  }

  function update(dt, now) {
    spawnClock += dt;

    // Occasional primaries: intentionally sparse.
    if (spawnClock > rand(3.8, 6.0)) {
      spawnClock = 0;
      spawnPrimary();
    }

    const countAtFrameStart = activeTracks.length;

    for (let i = countAtFrameStart - 1; i >= 0; i--) {
      const track = activeTracks[i];
      if (!track) continue;

      if (track.kind === "proton") {
        track.scatterClock -= dt;

        if (track.scatterClock <= 0) {
          track.angle += gaussianish() * track.scatterSigma;
          track.scatterClock = rand(0.055, 0.13);
        }
      }

      const step = Math.min(track.speed * dt, track.distanceLeft);

      track.x += Math.cos(track.angle) * step;
      track.y += Math.sin(track.angle) * step;
      track.distanceLeft -= step;
      track.trail.push({ x: track.x, y: track.y });

      const margin = 220;
      const outside =
        track.x < -margin ||
        track.x > width + margin ||
        track.y < -margin ||
        track.y > height + margin;

      if (track.distanceLeft <= 0) {
        finishTrack(i, track, true);
      } else if (outside) {
        finishTrack(i, track, false);
      }
    }

    removeFadedFamilies(now);
  }

  function drawTrack(track, now, isActive) {
    if (!track.trail || track.trail.length < 2) return;

    const eventAlpha = familyOpacity(track.familyId, now);
    if (eventAlpha <= 0) return;

    const rgb = COLORS[track.kind];

    const baseAlpha = isActive
      ? track.kind === "proton"
        ? 0.90
        : track.kind === "electron"
          ? 0.80
          : 0.76
      : track.kind === "proton"
        ? 0.76
        : track.kind === "electron"
          ? 0.66
          : 0.62;

    const lineWidth =
      track.kind === "proton"
        ? 1.55
        : track.kind === "electron"
          ? 1.15
          : 1.05;

    ctx.beginPath();
    ctx.moveTo(track.trail[0].x, track.trail[0].y);

    for (let i = 1; i < track.trail.length; i++) {
      ctx.lineTo(track.trail[i].x, track.trail[i].y);
    }

    ctx.strokeStyle =
      `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${baseAlpha * eventAlpha})`;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  function render(now) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    for (const track of completedTracks) {
      drawTrack(track, now, false);
    }

    for (const track of activeTracks) {
      drawTrack(track, now, true);
    }
  }

  function frame(now) {
    const dt = Math.min(0.034, (now - last) / 1000);
    last = now;

    if (!reduceMotion) {
      update(dt, now);
    }

    render(now);
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize, { passive: true });

  resize();
  spawnPrimary();

  if (reduceMotion) {
    // Produce one static event display rather than continuous motion.
    for (let i = 0; i < 280; i++) {
      update(1 / 60, performance.now());
    }
    render(performance.now());
  } else {
    requestAnimationFrame(frame);
  }
})();
