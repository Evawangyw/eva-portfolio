const stargazingCase = {
  en: {
    title: 'Under the stars',
    lead: 'From a weather forecast to a better night outside.',
    meta: 'Stargazing Assistant · February–May 2026',
    stats: [['0–100', 'observing suitability score'], ['1–4 days', 'hourly forecast range'], ['70/100', 'nearby-trip activation threshold']],
    nav: ['The question', 'The experience', 'Product walkthrough', 'From data to decisions', 'Design choices'],
    question: 'When is the sky worth going out for—and what makes one observing window better than another? Stargazing Assistant brings weather, astronomy, and light pollution into one place so users can compare their options before heading outside.',
    experience: 'Choose a location, set the forecast range and city-light level, then run the live data pipeline. The interface ranks observing windows, plots changing sky conditions, and shows how the scoring model reaches its recommendation. A nearby-trip workflow becomes available when the forecast is good enough.',
    galleryIntro: 'Explore five screens captured from the working app. Each step follows a practical question: where to start, when to go, what the sky is doing, how to assess the score, and whether to plan a trip. Open any screenshot for a closer look.',
    captions: [
      ['Set the location and forecast', 'Start with a city preset or custom coordinates, choose a one-to-four-day forecast, and adjust the Bortle city-light index. Optional browser location and astronomy inputs support different observing setups.', 'Choose a starting point'],
      ['Compare the best observing windows', 'Ranked cards bring together the local date and time, a 0–100 score, a recommendation label, and the conditions behind it. Users can compare alternatives instead of relying on a single headline forecast.', 'Find a better time to go'],
      ['See how sky conditions change', 'Interactive time-series charts show cloud cover, transparency, seeing, moon illumination, and the model’s darkness and atmosphere factors. A feature selector lets users inspect one signal in more detail.', 'Read the changing sky'],
      ['Check the score and its inputs', 'The validation dashboard recomputes the scoring formula and checks recommendation labels. It also distinguishes reproducibility from real-world credibility, making input sources, fallback data, and remaining calibration work visible.', 'Understand the recommendation'],
      ['Decide whether to plan a nearby trip', 'Travel planning opens when the best forecast score reaches 70/100. Eligible runs can compare nearby candidates, show them on a map, and produce a trip plan. This captured New York run is below the threshold, so the app explains why planning is paused.', 'Turn a forecast into a decision']
    ],
    pipeline: [
      ['Collect the conditions', 'Location and timezone anchor the hourly forecast. Weather, twilight and Moon data are combined, with fallback sources when a primary service is unavailable.'],
      ['Score and compare the hours', 'A deterministic model combines visibility constraints, atmospheric quality, and effective darkness. The resulting 0–100 scores rank observing windows and drive the recommendation labels.'],
      ['Explain and plan', 'The interface exposes the factors behind the score. Optional AI/RAG adds forecast explanations and knowledge search; the nearby-trip workflow searches and compares destinations when the forecast clears the threshold.']
    ],
    choices: [
      ['Keep the score separate from the explanation', 'AI text explains the fixed model output; it does not silently change the score or reorder the observing windows.'],
      ['Show the quality of the evidence', 'Source labels and diagnostics make fallback inputs visible. Matching the formula is treated separately from validating predictions against observations.'],
      ['Make planning conditional', 'A 70/100 threshold connects nearby-trip planning to observing suitability. When AI generation is off, eligible runs can still produce a deterministic trip plan.']
    ],
    tags: ['Python', 'Streamlit', 'Plotly', 'Weather APIs', 'Scoring', 'OpenStreetMap', 'FAISS', 'RAG'],
    expand: 'Enlarge screenshot', previous: 'Previous screenshot', next: 'Next screenshot', close: 'Close screenshot', full: 'View full size', fit: 'Fit to screen',
    demo: 'Try interactive demo', source: 'Explore the source code'
  },
  zh: {
    title: '在星空之下',
    lead: '从一份天气预报，找到更适合出门观星的夜晚。',
    meta: '观星助手 · 2026 年 2–5 月',
    stats: [['0–100', '观星适宜度评分'], ['1–4 天', '逐小时预报范围'], ['70/100', '周边观星行程启用门槛']],
    nav: ['想回答的问题', '使用体验', '产品演示', '从数据到决策', '关键设计选择'],
    question: '什么时候值得出门看星星？为什么一个观测时段比另一个更合适？观星助手将天气、天文与光污染信息放在一起，帮助用户在出发前比较不同选择。',
    experience: '选择地点、预报天数和城市灯光等级，运行实时数据流程。界面会排列推荐观测时段、展示天空条件随时间的变化，并解释评分模型如何得出建议。当预报条件足够好时，还可以继续规划周边观星行程。',
    galleryIntro: '通过五张真实应用截图，依次了解地点设置、时段比较、天空条件、评分核查与行程决策。每一步都对应一个实际使用问题，点击截图即可放大查看。',
    captions: [
      ['设置地点与预报范围', '从预设城市或自定义经纬度开始，选择一至四天的预报，并调整 Bortle 城市灯光指数。浏览器定位和可选天文数据输入，可以支持不同的观测场景。', '从哪里开始'],
      ['比较最值得关注的观测时段', '推荐卡片将当地日期与时间、0–100 分的评分、建议等级和影响条件放在一起。用户可以比较多个选择，而不必只依赖一句天气概述。', '什么时候出门更合适'],
      ['观察天空条件如何变化', '交互时间序列图展示云量、透明度、视宁度、月面照明，以及模型中的黑暗度与大气质量因素。通过指标选择器，还可以进一步查看单个信号。', '读懂变化中的天空'],
      ['核查评分公式与输入依据', '验证面板重新计算评分公式，并核对建议标签。同时将公式可复现性与实际预测可信度分开呈现，让数据来源、备用数据和后续校准工作更清楚。', '理解建议是如何得出的'],
      ['判断是否值得规划周边行程', '当最佳预报评分达到 70/100 时，周边行程功能才会启用。符合条件的运行可以比较附近候选地点、在地图上展示位置并生成计划。这张纽约示例截图低于门槛，因此界面解释了暂不生成行程的原因。', '把预报变成出行决策']
    ],
    pipeline: [
      ['收集环境条件', '以地点与时区为基准，整合逐小时天气、暮光和月亮信息；当主要服务不可用时，使用备用来源继续提供结果。'],
      ['评分并比较时段', '确定性的模型结合可见度约束、大气质量与有效黑暗度，生成 0–100 分的适宜度评分，用于排列观测时段和给出建议等级。'],
      ['解释结果与规划行程', '界面展示评分背后的因素。可选 AI/RAG 支持预报解读与知识检索；当预报达到门槛时，周边行程流程会进一步搜索和比较目的地。']
    ],
    choices: [
      ['将评分与解释分开', 'AI 文本解释已有的模型结果，不会在后台改变评分或重新排列推荐时段。'],
      ['展示依据的质量', '来源标签和诊断面板让备用输入可见。公式是否一致，与预测是否得到实际观测验证，被作为两个问题分别呈现。'],
      ['让规划取决于观测条件', '70/100 的门槛将周边行程规划与观星适宜度连接起来。关闭 AI 文本生成后，符合条件的运行仍可提供确定性的行程计划。']
    ],
    tags: ['Python', 'Streamlit', 'Plotly', '天气 API', '评分模型', 'OpenStreetMap', 'FAISS', 'RAG'],
    expand: '放大截图', previous: '上一张截图', next: '下一张截图', close: '关闭截图', full: '查看原始尺寸', fit: '适应屏幕',
    demo: '体验交互演示', source: '查看项目源码'
  }
};

const stargazingFiles = ['01-location', '02-windows', '03-conditions', '04-validation', '05-travel'];
const stargazingSrc = index => `assets/stargazing/${stargazingFiles[index]}.jpg`;

function renderStargazing() {
  const p = stargazingCase[lang];
  const section = (id, i, body) => `<section id="case-${id}" class="case-section"><h3><span>0${i + 1}</span>${p.nav[i]}</h3>${body}</section>`;
  return `<p class="story-eyebrow">${choose('04 / IMAGINE · SELECTED PROJECT', '04 / 想象 · 精选项目')}</p><h2 id="story-title">${p.title}</h2><p class="story-lead">${p.lead}</p><p class="story-meta">${p.meta}</p>
    <dl class="case-stats">${p.stats.map(([value, label]) => `<div><dt>${value}</dt><dd>${label}</dd></div>`).join('')}</dl>
    <nav class="case-nav" aria-label="${choose('Case study sections', '案例目录')}">${p.nav.map((title, i) => `<button data-case-section="${['question', 'experience', 'walkthrough', 'pipeline', 'choices'][i]}">${title} ↘</button>`).join('')}</nav>
    ${section('question', 0, `<p>${p.question}</p>`)}
    ${section('experience', 1, `<p>${p.experience}</p>`)}
    ${section('walkthrough', 2, `<p>${p.galleryIntro}</p><div id="walkthrough-content" aria-live="polite">${renderWalkthrough()}</div>`)}
    ${section('pipeline', 3, `<ol class="case-pipeline">${p.pipeline.map(([title, text], i) => `<li><span class="pipeline-step">${i + 1}</span><div><h4>${title}</h4><p>${text}</p></div></li>`).join('')}</ol>`)}
    ${section('choices', 4, p.choices.map(([title, text]) => `<div class="case-choice"><h4>${title}</h4><p>${text}</p></div>`).join(''))}
    <div class="tags">${p.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
    <div class="project-actions"><a class="story-demo-link" href="https://eva-gazing-at-stars.streamlit.app/" target="_blank" rel="noopener noreferrer">${p.demo} ↗</a><a class="story-link" href="https://github.com/Evawangyw/Gazing-at-stars" target="_blank" rel="noopener noreferrer">${p.source} ↗</a></div>`;
}
