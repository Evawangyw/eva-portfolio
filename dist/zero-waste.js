const zeroWasteCase = {
  en: {
    title: 'Zero-Waste Knowledge Base',
    lead: 'Turning a foundation’s document collection into an evidence-grounded knowledge portal',
    meta: 'Project Lead · October 2026',
    stats: [['68,608', 'searchable passages'], ['260', 'publishers'], ['2001–2026', 'resource coverage']],
    nav: ['The problem', 'My contribution', 'Product walkthrough', 'From documents to answers', 'Key design choices', 'Delivered system'],
    problem: [
      'Anhui Liuchixiang Charity Foundation’s zero-waste collection is intended to help people working at other charitable foundations research topics, plan activities, and find evidence for their writing. The challenge was to make this collection easier to navigate and apply in their own work.',
      'I led a team building a portal that connects document browsing, hybrid search, and question answering with clickable source citations, helping users find relevant information and trace it back to the original material.'
    ],
    contribution: [
      'My work connected product planning with technical implementation. As project lead, I coordinated requirements and delivery. I also built the ingestion path, designed the hybrid retrieval pipeline, and connected evidence-based answer generation to the reader interface.',
      'The resulting product includes topic shelves, document preview and download, account-based chat history, and an administration dashboard.'
    ],
    galleryIntro: 'Follow the reader’s journey, from discovering the collection to checking an answer against its source. Select a step, then open the image for a closer look.',
    captions: [
      ['Collections at a glance', 'Two collections make the scope of the available material visible before registration.'],
      ['Browse and filter the collection', 'Find resources by year, publisher, document type, and topic.'],
      ['Ask questions and trace the evidence', 'Ask the knowledge base a question and follow citations back to the original material.'],
      ['Preview and download source documents', 'Read the original file online or download it for further use.'],
      ['Manage content, monitor usage, and configure retrieval', 'Maintain the collection through document management, usage statistics, and question-answering settings.']
    ],
    pipeline: [
      ['Prepare the collection', 'Metadata is stored in SQLite. Newly uploaded PDFs are converted into overlapping Markdown passages, creating retrieval units while retaining their connection to the original documents.'],
      ['Retrieve complementary evidence', 'Chinese character n-gram BM25 retrieves lexical matches, while a quantized bge-small-zh-v1.5 embedding index retrieves semantically related passages. Reciprocal rank fusion combines the top 80 results from each method into 40 candidates. Additional ranking considers document-type authority, geography, and core-term overlap.'],
      ['Generate with traceable sources', 'Alibaba Bailian generates answers from extracted evidence. Responses stream with inline citations that open the source file. When no citable evidence remains, the system withholds an answer.']
    ],
    choices: [
      ['Combine lexical and semantic retrieval', 'Users may search with precise terms or describe the same issue in different words. The two retrieval methods address these different ways of asking.'],
      ['Keep evidence visible', 'Citations are part of the reading experience. Users can move from an answer to its source and inspect the underlying material.'],
      ['Build for ongoing maintenance', 'Uploading, reviewing, and managing documents are part of keeping the collection useful. The administration interface supports this continuing work.']
    ],
    delivered: [
      'The project brings together a Vue 3 reader interface, an ECharts administration dashboard, SQLite metadata storage, and a hybrid retrieval pipeline. Docker Compose and Nginx support deployment.',
      'The 68,608-passage index describes the system’s retrieval scope. A next iteration would evaluate retrieval relevance, citation support, and completion of representative user tasks.'
    ],
    tags: ['Vue 3', 'ECharts', 'SQLite', 'BM25', 'bge-small-zh-v1.5', 'RRF', 'Alibaba Bailian', 'Docker Compose', 'Nginx'],
    source: 'Explore the source code', expand: 'Enlarge image', previous: 'Previous image', next: 'Next image', close: 'Close image', full: 'View full size', fit: 'Fit to screen'
  },
  zh: {
    title: '零废弃知识库',
    lead: '让基金会的资料库成为可以检索、提问和核查的知识工具',
    meta: '项目组长 · 2026 年 10 月',
    stats: [['68,608', '个可检索段落'], ['260', '家出版机构'], ['2001–2026', '年资料时间跨度']],
    nav: ['要解决的问题', '我的贡献', '产品演示', '从资料到回答', '关键设计选择', '交付成果'],
    problem: [
      '安徽省六尺巷慈善基金会整理的零废弃资料，主要面向其他公益基金会的工作人员，支持他们研究议题、策划活动和查找写作依据。项目需要解决的问题是：如何让这些资料更容易被找到，并应用到不同机构的实际工作中。',
      '我带领团队搭建知识门户，将资料浏览、混合检索和带有原文引用的问答连接起来，帮助使用者找到相关信息，并追溯到原始资料。'
    ],
    contribution: [
      '我的工作连接了产品规划与技术实现。作为项目组长，我协调需求与交付，同时搭建资料处理流程、设计混合检索管线，并将基于证据的回答接入读者界面。',
      '最终产品包括主题书架、文件预览与下载、按账号保存的聊天记录，以及管理面板。'
    ],
    galleryIntro: '从了解资料规模，到查找资料、提问和核查原文，按顺序了解产品的使用流程。选择一个步骤，点击图片即可放大查看。',
    captions: [
      ['两个资料库的内容与规模', '注册前即可了解两个资料库的内容范围和资料规模。'],
      ['按年份、机构、类型和议题查找资料', '通过资料书架与筛选条件，找到与工作议题相关的文件。'],
      ['向知识库提问，并追溯回答来源', '从一个具体问题出发，通过引用回到原始资料核查依据。'],
      ['在线预览与下载原始文件', '在网页中阅读原文，或下载文件以便进一步使用。'],
      ['管理资料、查看使用情况与调整问答设置', '通过文档管理、使用统计和问答设置，支持资料库的持续维护。']
    ],
    pipeline: [
      ['整理资料', '元数据存储在 SQLite 中，新上传的 PDF 被转换为相互重叠的 Markdown 段落，形成可检索的内容单元，并保留与原始文件的连接。'],
      ['检索互补证据', '中文字符 n-gram BM25 寻找词面匹配，量化的 bge-small-zh-v1.5 向量索引寻找语义相关段落。系统通过倒数排名融合，将两路各前 80 条结果合并为 40 个候选，再结合文档类型权威性、地域和核心词重叠进行排序。'],
      ['生成可追溯的回答', '阿里云百炼根据抽取出的证据生成回答，以流式方式呈现，并附上可以打开原文的内联引用。当没有可引用证据时，系统不生成回答。']
    ],
    choices: [
      ['结合词面与语义检索', '用户可能使用准确术语，也可能换一种说法描述问题。两种检索方式分别回应这些不同的提问习惯。'],
      ['让证据留在阅读流程中', '引用直接连接回答与原文，用户可以继续查看资料，判断回答是否得到支持。'],
      ['支持持续维护', '上传、审核和文档管理也是产品的一部分，帮助基金会持续更新和使用资料库。']
    ],
    delivered: [
      '项目整合了 Vue 3 读者端、ECharts 管理面板、SQLite 元数据存储和混合检索管线，并通过 Docker Compose 与 Nginx 支持部署。',
      '68,608 个段落体现了系统的检索范围。下一轮迭代可以进一步评估检索相关性、引用支持程度，以及用户完成典型任务的情况。'
    ],
    tags: ['Vue 3', 'ECharts', 'SQLite', 'BM25', 'bge-small-zh-v1.5', 'RRF', '阿里云百炼', 'Docker Compose', 'Nginx'],
    source: '查看项目源码', expand: '放大查看', previous: '上一张', next: '下一张', close: '关闭图片', full: '查看原始尺寸', fit: '适应屏幕'
  }
};

let walkthroughIndex = 0;
const walkthroughFiles = ['01-two-libraries', '02-shelf', '03-ask', '04-read', '05-admin'];
const zeroWasteWalkthroughSrc = index => `assets/zero-waste/${lang}/${walkthroughFiles[index]}.png`;

const activeWalkthroughCase = () => currentStory === 'stars' ? stargazingCase[lang] : zeroWasteCase[lang];
const walkthroughSrc = index => currentStory === 'stars' ? stargazingSrc(index) : zeroWasteWalkthroughSrc(index);
const walkthroughSize = () => currentStory === 'stars' ? [1280, 720] : [1080, 1920];

function renderWalkthrough() {
  const p = activeWalkthroughCase();
  return `<div class="walkthrough-steps" role="group" aria-label="${p.nav[2]}">${p.captions.map((c, i) => `<button data-walkthrough="${i}" aria-pressed="${i === walkthroughIndex}"><span>0${i + 1}</span>${c[0]}</button>`).join('')}</div>
    <figure class="walkthrough-feature ${currentStory === 'stars' ? 'landscape-walkthrough' : ''}">
      <button class="walkthrough-image" data-enlarge="${walkthroughIndex}" aria-label="${p.expand}: ${p.captions[walkthroughIndex][0]}"><img src="${walkthroughSrc(walkthroughIndex)}" alt="${p.captions[walkthroughIndex][0]}" width="${walkthroughSize()[0]}" height="${walkthroughSize()[1]}"><span>${p.expand} ↗</span></button>
      <figcaption><span class="case-kicker">0${walkthroughIndex + 1} / 05</span><h4>${p.captions[walkthroughIndex][0]}</h4><p>${p.captions[walkthroughIndex][1]}</p><div class="walkthrough-arrows"><button data-walkthrough="${(walkthroughIndex + 4) % 5}" aria-label="${p.previous}">←</button><button data-walkthrough="${(walkthroughIndex + 1) % 5}" aria-label="${p.next}">→</button></div></figcaption>
    </figure>`;
}

function renderZeroWaste() {
  const p = zeroWasteCase[lang];
  const paragraphs = list => list.map(text => `<p>${text}</p>`).join('');
  const section = (id, index, body) => `<section id="case-${id}" class="case-section"><h3><span>0${index + 1}</span>${p.nav[index]}</h3>${body}</section>`;
  return `<p class="story-eyebrow">${choose('01 / BUILD · SELECTED PROJECT', '01 / 创造 · 精选项目')}</p><h2 id="story-title">${p.title}</h2><p class="story-lead">${p.lead}</p><p class="story-meta">${p.meta}</p>
    <dl class="case-stats">${p.stats.map(([value, label]) => `<div><dt>${value}</dt><dd>${label}</dd></div>`).join('')}</dl>
    <nav class="case-nav" aria-label="${choose('Case study sections', '案例目录')}">${p.nav.map((title, i) => `<button data-case-section="${['problem', 'contribution', 'walkthrough', 'pipeline', 'choices', 'delivered'][i]}">${title} ↘</button>`).join('')}</nav>
    ${section('problem', 0, paragraphs(p.problem))}
    ${section('contribution', 1, paragraphs(p.contribution))}
    ${section('walkthrough', 2, `<p>${p.galleryIntro}</p><div id="walkthrough-content" aria-live="polite">${renderWalkthrough()}</div>`)}
    ${section('pipeline', 3, `<ol class="case-pipeline">${p.pipeline.map(([title, text], i) => `<li><span class="pipeline-step">${i + 1}</span><div><h4>${title}</h4><p>${text}</p></div></li>`).join('')}</ol>`)}
    ${section('choices', 4, p.choices.map(([title, text]) => `<div class="case-choice"><h4>${title}</h4><p>${text}</p></div>`).join(''))}
    ${section('delivered', 5, paragraphs(p.delivered))}
    <div class="tags">${p.tags.map(tag => `<span>${tag}</span>`).join('')}</div><a class="story-link" href="https://github.com/Evawangyw/zero-waste-portal" target="_blank" rel="noopener noreferrer">${p.source} ↗</a>`;
}

function initWalkthrough() {
  const viewer = document.getElementById('image-dialog');
  let viewerIndex = 0;
  let fullSize = false;
  function renderViewer() {
    const p = activeWalkthroughCase();
    viewer.style.setProperty('--walkthrough-width', `${walkthroughSize()[0]}px`);
    document.getElementById('image-title').textContent = `0${viewerIndex + 1} / 05 · ${p.captions[viewerIndex][0]}`;
    document.getElementById('image-view').innerHTML = `<img src="${walkthroughSrc(viewerIndex)}" alt="${p.captions[viewerIndex][0]}" width="${walkthroughSize()[0]}" height="${walkthroughSize()[1]}">`;
    document.getElementById('image-view').classList.toggle('full-size', fullSize);
    document.getElementById('image-zoom').textContent = fullSize ? p.fit : p.full;
    document.getElementById('image-close').textContent = `${p.close} ×`;
    document.getElementById('image-previous').ariaLabel = p.previous;
    document.getElementById('image-next').ariaLabel = p.next;
    document.getElementById('image-language').textContent = choose('中文', 'EN');
    document.getElementById('image-language').ariaLabel = choose('Switch to Chinese', '切换到英文');
  }
  function moveViewer(delta) {
    viewerIndex = (viewerIndex + delta + 5) % 5;
    walkthroughIndex = viewerIndex;
    fullSize = false;
    renderViewer();
  }
  document.addEventListener('click', event => {
    const step = event.target.closest('[data-walkthrough]');
    if (step) {
      walkthroughIndex = Number(step.dataset.walkthrough);
      document.getElementById('walkthrough-content').innerHTML = renderWalkthrough();
      document.querySelector(`[data-walkthrough="${walkthroughIndex}"]`).focus({ preventScroll: true });
    }
    const enlarge = event.target.closest('[data-enlarge]');
    if (enlarge) {
      viewerIndex = Number(enlarge.dataset.enlarge);
      fullSize = false;
      renderViewer();
      viewer.showModal();
    }
    const sectionButton = event.target.closest('[data-case-section]');
    if (sectionButton) document.getElementById(`case-${sectionButton.dataset.caseSection}`).scrollIntoView({ block: 'start' });
  });
  document.getElementById('image-close').addEventListener('click', () => viewer.close());
  document.getElementById('image-previous').addEventListener('click', () => moveViewer(-1));
  document.getElementById('image-next').addEventListener('click', () => moveViewer(1));
  document.getElementById('image-zoom').addEventListener('click', () => { fullSize = !fullSize; renderViewer(); });
  document.getElementById('image-language').addEventListener('click', () => { toggleLanguage(); renderViewer(); });
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      moveViewer(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
  viewer.addEventListener('close', () => {
    const walkthrough = document.getElementById('walkthrough-content');
    if (walkthrough) walkthrough.innerHTML = renderWalkthrough();
    document.querySelector(`[data-enlarge="${walkthroughIndex}"]`)?.focus({ preventScroll: true });
  });
}
