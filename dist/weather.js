// Eva's current city, shared by every visitor. Update this when Eva moves cities.
(() => {
  const location = { en: 'Shanghai', zh: '上海', latitude: 31.2304, longitude: 121.4737 };
  const temperature = document.getElementById('weather-temperature');
  const city = document.getElementById('weather-city');
  const note = document.querySelector('.sea-note');
  if (!temperature || !city || !note) return;

  const refreshInterval = 15 * 60 * 1000;
  const maxAge = 60 * 60 * 1000;
  const cacheKey = `shore-weather-v1:${location.latitude},${location.longitude}`;
  let reading = null;
  let loading = true;
  let request = null;

  function valid(value) {
    const now = Date.now();
    return value && Number.isFinite(value.temperature) && value.temperature >= -100 &&
      value.temperature <= 70 && Number.isFinite(value.observedAt) &&
      value.observedAt <= now + 5 * 60 * 1000 && now - value.observedAt < maxAge &&
      Number.isFinite(value.fetchedAt) && value.fetchedAt <= now;
  }

  function render() {
    const chinese = document.documentElement.lang.startsWith('zh');
    const name = chinese ? location.zh : location.en;
    const available = valid(reading);
    city.textContent = name;
    temperature.textContent = available ? `${Math.round(reading.temperature)}°C` : loading ? '…°C' : '—°C';
    note.dataset.weather = available ? 'ready' : loading ? 'loading' : 'unavailable';
    note.setAttribute('aria-label', available
      ? (chinese ? `${name}当前气温 ${Math.round(reading.temperature)} 摄氏度` : `Current temperature in ${name}: ${Math.round(reading.temperature)} degrees Celsius`)
      : (chinese ? `${name}，${loading ? '正在获取气温' : '暂时无法获取气温'}` : `${name}: ${loading ? 'loading temperature' : 'temperature temporarily unavailable'}`));
    if (available) {
      const time = new Intl.DateTimeFormat(chinese ? 'zh-CN' : 'en-GB', {
        timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit'
      }).format(reading.observedAt);
      note.title = chinese ? `上海时间 ${time} · 气象数据：Open-Meteo` : `${time} Shanghai time · Weather data by Open-Meteo`;
    } else {
      note.title = chinese ? '上海实时气温 · 气象数据：Open-Meteo' : 'Current Shanghai temperature · Weather data by Open-Meteo';
    }
  }

  async function refresh() {
    if (request || document.hidden) return;
    if (valid(reading) && Date.now() - reading.fetchedAt < refreshInterval) {
      render();
      return;
    }
    const controller = new AbortController();
    request = controller;
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const params = new URLSearchParams({
        latitude: location.latitude, longitude: location.longitude,
        current: 'temperature_2m', temperature_unit: 'celsius',
        timeformat: 'unixtime', forecast_days: '1'
      });
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
        signal: controller.signal, credentials: 'omit', referrerPolicy: 'no-referrer'
      });
      if (!response.ok) throw new Error(`Weather response: ${response.status}`);
      const data = await response.json();
      const next = {
        temperature: data.current?.temperature_2m,
        observedAt: data.current?.time * 1000,
        fetchedAt: Date.now()
      };
      if (data.current_units?.temperature_2m !== '°C' || !valid(next)) {
        throw new Error('Weather response has no recent Celsius reading.');
      }
      reading = next;
      try { localStorage.setItem(cacheKey, JSON.stringify(reading)); } catch { /* Storage is optional. */ }
    } catch {
      // Show a recent cached reading, or a dash. Never substitute an invented temperature.
    } finally {
      clearTimeout(timeout);
      request = null;
      loading = false;
      render();
    }
  }

  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey));
    if (valid(cached)) reading = cached;
  } catch { /* Private browsing and unavailable storage still support live weather. */ }
  render();
  refresh();
  setInterval(refresh, refreshInterval);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
