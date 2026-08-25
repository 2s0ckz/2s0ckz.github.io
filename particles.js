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
        speed: rand(42.5, 57.5),
        stepLength: rand(height * 0.32, height * 0.72),
        generation: 0,
        maxGeneration: 0,
        scatterSigma: 0.045
      },
      electron: {
        speed: rand(90, 122.5),
        stepLength: rand(20, 44),
        generation: 0,
        maxGeneration: 5
      },
      photon: {
        speed: rand(85, 115),
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
      scatterCount: 0,
      nextScatterSecondary: kind === "proton" ? Math.floor(rand(5, 8)) : null,
      trail: [{ x, y }]
    });
  }

  function spawnPrimary() {
    const familyId = createFamily();
    const originMode = Math.random();
    let x, y, angle;

    if (originMode < 0.50) {
      x = rand(width * 0.02, width * 0.98);
      y = -20;
      angle = rand(Math.PI * 0.30, Math.PI * 0.70);
    } else if (originMode < 0.75) {
      x = -20;
      y = rand(height * 0.02, height * 0.55);
      angle = rand(Math.PI * 0.16, Math.PI * 0.44);
    } else {
      x = width + 20;
      y = rand(height * 0.02, height * 0.55);
      angle = rand(Math.PI * 0.56, Math.PI * 0.84);
    }

    addTrack("proton", x, y, angle, familyId, {
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


  function spawnAtProtonScatter(track) {
    // This is deliberately tied to a proton's scatter count rather than a
    // per-vertex random chance. That makes the behavior auditable and ensures
    // sufficiently long proton tracks really do produce visible daughters.
    if (track.scatterCount < track.nextScatterSecondary) return false;

    // Schedule the next emission several scatter vertices later.
    track.nextScatterSecondary += Math.floor(rand(8, 13));

    // Mostly delta-like electrons; occasional photon.
    if (Math.random() < 0.82) {
      addTrack(
        "electron",
        track.x,
        track.y,
        track.angle + rand(-1.2, 1.2),
        track.familyId,
        {
          generation: 0,
          stepLength: rand(26, 56),
          speed: rand(90, 122.5)
        }
      );
    } else {
      addTrack(
        "photon",
        track.x,
        track.y,
        track.angle + rand(-1.8, 1.8),
        track.familyId,
        {
          generation: 0,
          stepLength: rand(350, 725),
          speed: rand(85, 115)
        }
      );
    }

    return true;
  }

  function spawnElectronChildren(track) {
    if (track.generation >= track.maxGeneration) return;
    const nextGeneration = track.generation + 1;

    addTrack(
      "electron",
      track.x,
      track.y,
      track.angle + gaussianish() * 0.78,
      track.familyId,
      {
        generation: nextGeneration,
        stepLength: rand(14, 34),
        speed: Math.max(62.5, track.speed * rand(0.90, 0.98))
      }
    );

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
          speed: rand(77.5, 102.5)
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

    addTrack(
      "photon",
      track.x,
      track.y,
      track.angle + rand(-2.5, 2.5),
      track.familyId,
      {
        generation: nextGeneration,
        stepLength: rand(55, 115),
        speed: Math.max(57.5, track.speed * rand(0.84, 0.95))
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
          speed: rand(82.5, 110)
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
      family.fadeStart = performance.now() + rand(2000, 4000);
    }
  }

  function familyOpacity(familyId, now) {
    const family = families.get(familyId);
    if (!family || family.fadeStart === null || now < family.fadeStart) return 1;
    return Math.max(0, 1 - (now - family.fadeStart) / family.fadeDuration);
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
      if (expiredSet.has(completedTracks[i].familyId)) completedTracks.splice(i, 1);
    }

    for (const id of expired) families.delete(id);
  }

  function update(dt, now) {
    spawnClock += dt;

    if (spawnClock > rand(3.04, 4.8)) {
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
          track.scatterCount += 1;

          // Visible secondary production is scheduled by scatter number.
          // The proton always continues after the vertex.
          spawnAtProtonScatter(track);
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

      if (track.distanceLeft <= 0) finishTrack(i, track, true);
      else if (outside) finishTrack(i, track, false);
    }

    removeFadedFamilies(now);
  }

  function drawTrack(track, now, isActive) {
    if (!track.trail || track.trail.length < 2) return;

    const eventAlpha = familyOpacity(track.familyId, now);
    if (eventAlpha <= 0) return;

    const rgb = COLORS[track.kind];
    const baseAlpha = isActive
      ? track.kind === "proton" ? 0.90 : track.kind === "electron" ? 0.80 : 0.76
      : track.kind === "proton" ? 0.76 : track.kind === "electron" ? 0.66 : 0.62;

    const lineWidth = track.kind === "proton" ? 1.55 : track.kind === "electron" ? 1.15 : 1.05;

    ctx.beginPath();
    ctx.moveTo(track.trail[0].x, track.trail[0].y);
    for (let i = 1; i < track.trail.length; i++) ctx.lineTo(track.trail[i].x, track.trail[i].y);

    ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${baseAlpha * eventAlpha})`;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  function render(now) {
    ctx.clearRect(0, 0, width, height);
    for (const track of completedTracks) drawTrack(track, now, false);
    for (const track of activeTracks) drawTrack(track, now, true);
  }

  function frame(now) {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    if (!reduceMotion) update(dt, now);
    render(now);
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();
  spawnPrimary();

  if (reduceMotion) {
    for (let i = 0; i < 280; i++) update(1 / 60, performance.now());
    render(performance.now());
  } else {
    requestAnimationFrame(frame);
  }
})();
