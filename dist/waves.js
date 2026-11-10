// A changing shoreline, with independent wave fronts traveling toward the beach.
// The SVG stays responsive; time advances at the same rate on all frame rates.
(() => {
  const sea = document.getElementById('sea-body');
  if (!sea) return;
  const ocean = document.getElementById('vanta-ocean');
  const landscape = sea.closest('.landscape');
  let effect = null;
  let webglFailed = false;
  const shallows = document.getElementById('sea-shallows');
  const sand = document.getElementById('wet-sand');
  const softFoam = document.getElementById('shore-foam-soft');
  const foam = document.getElementById('shore-foam');
  const lace = document.getElementById('shore-foam-lace');
  const ripples = [...document.querySelectorAll('.sea-ripple')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const tau = Math.PI * 2;
  let frame = null;
  let elapsed = 0;
  let lastTime = null;
  let lastDraw = -Infinity;

  function contourPoints(time, offset = 0, phase = 0) {
    const points = [];
    // Extend beyond the artboard so the water never exposes a straight edge.
    for (let i = 0; i <= 64; i++) {
      const u = i / 64;
      const x = -64 + 1728 * u;
      const coast = 906 + 31 * Math.sin(u * tau - .4) + 10 * Math.sin(u * tau * 2 + .9);
      const tide = 12 * Math.sin(time * tau / 11 - u * 1.9);
      const swell = 6 * Math.sin(u * 21 - time * .85 + phase);
      const detail = 2.4 * Math.sin(u * 53 + time * .65 + phase);
      const y = coast + tide + swell + detail - offset;
      points.push([x, y]);
    }
    return points;
  }

  function contour(time, offset = 0, phase = 0) {
    return `M${contourPoints(time, offset, phase).map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L')}`;
  }

  const waterArea = line => `${line} L1664,-100 L-64,-100 Z`;
  function draw(time) {
    const shore = contour(time);
    sea.setAttribute('d', waterArea(shore));
    if (ocean) {
      const edge = contourPoints(time).map(([x, y]) => `${(x / 16).toFixed(3)}% ${(y / 10.5).toFixed(3)}%`);
      ocean.style.clipPath = `polygon(${edge.join(',')},104% -9.524%,-4% -9.524%)`;
    }
    shallows.setAttribute('d', waterArea(shore));
    // The wet edge lags behind the advancing water, then fades as it recedes.
    sand.setAttribute('d', waterArea(contour(time - 1.5, -16)));
    sand.setAttribute('opacity', (.22 + .05 * Math.sin(time * tau / 11)).toFixed(3));
    softFoam.setAttribute('d', shore);
    softFoam.setAttribute('stroke-width', (12 + 4 * Math.sin(time * tau / 11 + .7)).toFixed(2));
    foam.setAttribute('d', shore);
    foam.setAttribute('opacity', (.67 + .14 * Math.sin(time * tau / 11)).toFixed(3));
    lace.setAttribute('d', contour(time, -5, .08));
    lace.setAttribute('stroke-dashoffset', (-time * 7).toFixed(1));
    ripples.forEach((ripple, i) => {
      const progress = ((time / 13 + i / ripples.length) % 1 + 1) % 1;
      const distance = 18 + (1 - progress) * 230;
      ripple.setAttribute('d', contour(time, distance, i * .7));
      ripple.setAttribute('opacity', (.19 * Math.sin(progress * Math.PI)).toFixed(3));
    });
  }

  function tick(now) {
    if (lastTime !== null) elapsed += Math.min((now - lastTime) / 1000, .1);
    lastTime = now;
    if (now - lastDraw >= 1000 / 30) {
      draw(elapsed);
      lastDraw = now;
    }
    frame = requestAnimationFrame(tick);
  }

  // Pin vendor versions and keep the SVG coast available if WebGL is unavailable.
  function destroyOcean() {
    if (!effect) return;
    const current = effect;
    const renderer = current.renderer;
    effect = null;
    renderer?.domElement.removeEventListener('webglcontextlost', onContextLost);
    current.destroy();
    renderer?.dispose();
    renderer?.forceContextLoss();
    landscape.classList.remove('vanta-ready');
  }

  function onContextLost() {
    webglFailed = true;
    destroyOcean();
  }

  function syncOcean() {
    if (!ocean || webglFailed) return;
    if (!window.VANTA?.WAVES || !window.THREE) {
      ocean.dataset.renderer = 'unavailable';
      return;
    }
    if (reducedMotion.matches) {
      destroyOcean();
      return;
    }
    if (document.hidden) {
      if (effect) {
        cancelAnimationFrame(effect.req);
        effect.req = null;
        effect.prevNow = null;
      }
      return;
    }
    if (effect) {
      if (effect.req === null) effect.animationLoop();
      return;
    }
    try {
      effect = window.VANTA.WAVES({
        el: ocean,
        THREE: window.THREE,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 100,
        minWidth: 100,
        scale: Math.max(1, window.devicePixelRatio || 1),
        scaleMobile: Math.max(1.5, window.devicePixelRatio || 1),
        color: 0x326b73,
        shininess: 22,
        waveHeight: 8,
        waveSpeed: 0.38,
        zoom: 0.90
      });
      if (!effect?.renderer || !effect?.plane) {
        destroyOcean();
        webglFailed = true;
        return;
      }
      effect.renderer.domElement.addEventListener('webglcontextlost', onContextLost, { once: true });
      ocean.dataset.renderer = 'vanta';
      landscape.classList.add('vanta-ready');
    } catch (error) {
      webglFailed = true;
      destroyOcean();
      ocean.dataset.renderer = 'fallback';
      console.warn('Ocean background is using the illustrated fallback.', error);
    }
  }

  function syncAnimation() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    lastTime = null;
    lastDraw = -Infinity;
    syncOcean();
    if (reducedMotion.matches) draw(0);
    else if (!document.hidden) frame = requestAnimationFrame(tick);
  }
  const resizeObserver = new ResizeObserver(() => effect?.resize());
  resizeObserver.observe(landscape);
  window.addEventListener('pagehide', () => {
    if (frame !== null) cancelAnimationFrame(frame);
    destroyOcean();
  });
  window.addEventListener('pageshow', syncAnimation);
  draw(0);
  reducedMotion.addEventListener('change', syncAnimation);
  document.addEventListener('visibilitychange', syncAnimation);
  syncAnimation();
})();
