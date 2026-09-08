/* =========================================================
 * 数分学堂 · 应用逻辑：路由 / 渲染 / 进度 / 练习交互
 * ========================================================= */
(function () {
  var DATA = window.MA_DATA;
  if (!DATA || !DATA.chapters) { console.error('内容数据缺失'); return; }
  var chapters = DATA.chapters;
  var PROG_KEY = 'ma-progress-v2';

  var $ = function (s) { return document.querySelector(s); };

  /* ---------- 工具 ---------- */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function inline(s) {
    // 先转义，再支持 **加粗**
    return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  }
  function paras(s) {
    var out = [];
    String(s).split(/\n{2,}/).forEach(function (p) {
      p = p.replace(/^\n+|\n+$/g, '');
      if (!p) return;
      var lines = p.split('\n');
      var isList = lines.every(function (l) { return /^[-•]\s+/.test(l); }) && lines.length > 1;
      if (isList) {
        var lis = lines.map(function (l) { return '<li>' + inline(l.replace(/^[-•]\s+/, '')) + '</li>'; }).join('');
        out.push('<ul>' + lis + '</ul>');
      } else {
        out.push('<p>' + lines.map(inline).join('<br>') + '</p>');
      }
    });
    return out.join('');
  }
  function katexRender(el) {
    if (!window.renderMathInElement) return;
    try {
      renderMathInElement(el, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    } catch (e) { console.error(e); }
  }

  /* ---------- 进度 ---------- */
  function loadProg() { try { return JSON.parse(localStorage.getItem(PROG_KEY)) || {}; } catch (e) { return {}; } }
  var progress = loadProg();
  function saveProg() { try { localStorage.setItem(PROG_KEY, JSON.stringify(progress)); } catch (e) {} }
  function doneCount() { return chapters.filter(function (c) { return progress[c.id]; }).length; }
  function volTitle(c) { return c.volume === 2 ? '下册' : '上册'; }

  /* ---------- 顶栏/进度 ---------- */
  function updateBadge() {
    var el = $('#progressBadge');
    if (el) el.textContent = '进度 ' + doneCount() + '/' + chapters.length;
    $('#resetBtn').onclick = function () {
      if (!confirm('确定清除本地学习进度吗？')) return;
      progress = {}; saveProg(); updateBadge(); renderSidebar();
      if (currentRoute().page === 'home') renderHome(); else renderChapter(currentRoute().id);
    };
  }

  /* ---------- 侧边栏 ---------- */
  function renderSidebar(activeId) {
    var nav = $('#sideNav');
    var html = '<a class="nav-item nav-home" href="#/">⌂ 首页</a>';
    [1, 2].forEach(function (v) {
      html += '<h4>数学分析（' + (v === 1 ? '上' : '下') + '册）</h4>';
      chapters.filter(function (c) { return c.volume === v; }).forEach(function (c) {
        var on = progress[c.id] ? '<span class="done">✓</span>' : '';
        html += '<a class="nav-item' + (c.id === activeId ? ' active' : '') + '" href="#/ch/' + c.id + '"><span class="no">第' + c.no + '章</span><span class="t">' + esc(c.title) + '</span>' + on + '</a>';
      });
    });
    nav.innerHTML = html;
  }

  /* ---------- 侧边栏移动端开关 ---------- */
  function closeDrawer() {
    $('#sidebar').classList.remove('open');
    $('#backdrop').classList.remove('show');
  }
  function openDrawer() {
    $('#sidebar').classList.add('open');
    $('#backdrop').classList.add('show');
  }

  /* ---------- 路由 ---------- */
  function currentRoute() {
    var h = location.hash || '#/';
    var m = h.match(/^#\/ch\/([^/]+)(?:\/(.+))?$/);
    if (m) return { page: 'chapter', id: m[1], sec: m[2] };
    return { page: 'home' };
  }
  function navigate() {
    closeDrawer();
    var r = currentRoute();
    if (r.page === 'home') { renderHome(); renderSidebar(null); }
    else { renderChapter(r.id, r.sec); renderSidebar(r.id); }
    updateBadge();
  }

  /* ---------- 首页 ---------- */
  function renderHome() {
    var view = $('#view');
    var total = chapters.length, done = doneCount();
    var pct = Math.round(done / total * 100);
    var html = '';
    html += '<section class="hero"><h1>数分学堂</h1>' +
      '<p class="sub">以华东师范大学数学科学学院《数学分析》第五版（上、下册）知识体系为纲的互动学习网站。' +
      '逐章学习知识点，配合互动演示理解难点，最后用章节练习检验自己。</p>' +
      '<div class="feats"><span>📖 22 章系统讲义</span><span>🧭 互动演示帮助理解</span><span>✍️ 每章适量练习</span><span>📊 本地学习进度</span></div></section>';
    html += '<div class="stats-row">' +
      '<div class="stat-card"><div class="num">' + done + '/' + total + '</div><div class="lbl">已完成章节</div><div class="stat-bar"><i style="width:' + pct + '%"></i></div></div>' +
      '<div class="stat-card"><div class="num">' + chapters.length + '</div><div class="lbl">按教材编排的章节</div></div>' +
      '<div class="stat-card"><div class="num">∞</div><div class="lbl">ε–δ / 极限 / 级数等互动演示</div></div></div>';
    html += '<div class="home-block"><h2>📚 学习目录</h2><p class="hint">从第一章开始顺序学习，或点击任意章节直接进入；每章末尾都有练习。</p></div>';
    [1, 2].forEach(function (v) {
      var chs = chapters.filter(function (c) { return c.volume === v; });
      var vmeta = null;
      (DATA.volumes || []).forEach(function (vm) { if (vm.v === v) vmeta = vm; });
      html += '<div class="vol-section"><div class="vol-head"><span class="vol-badge' + (v === 2 ? ' v2' : '') + '">' + (v === 1 ? '上册' : '下册') + '</span><span class="vd">' + esc((vmeta && vmeta.desc) || '') + '</span></div>';
      html += '<div class="ch-grid">';
      chs.forEach(function (c) {
        var doneCls = progress[c.id] ? ' done' : '';
        html += '<a class="ch-card' + (v === 2 ? ' v2' : '') + doneCls + '" href="#/ch/' + c.id + '">' +
          '<div class="ch-no">第 ' + c.no + ' 章</div><div class="ch-title">' + esc(c.title) + '</div>' +
          '<div class="ch-desc">' + esc(c.desc || '') + '</div>' +
          '<div class="ch-meta"><span>' + (c.sections ? c.sections.length : 0) + ' 节</span><span>·</span><span>' + (c.exercises ? c.exercises.length : 0) + ' 题练习</span></div></a>';
      });
      html += '</div></div>';
    });
    html += '<div class="home-block"><h2>💡 使用建议</h2><div class="ch-intro"><p>① 每个章节先读<b>本章导读</b>，把握主线；② 遇到标着 🧭 的<b>互动演示</b>，动手拖一拖滑块，把抽象语言“看出来”；③ 学完知识后完成<b>章节练习</b>，计算题先自己做再看答案；④ 点击章节末尾的“标记为已完成”跟踪进度。</p><p>本站公式使用 KaTeX 本地渲染，可离线打开使用。</p></div></div>';
    view.innerHTML = html;
    document.title = '数分学堂 · 数学分析学习网站';
    window.scrollTo(0, 0);
  }

  /* ---------- 内容块渲染 ---------- */
  function renderBlock(b, cid) {
    switch (b.t) {
      case 'p': return '<div class="blk plain"><div class="blk-body">' + paras(b.x) + '</div></div>';
      case 'def':
        return '<div class="blk def"><div class="blk-title"><span class="blk-tag">' + esc(b.tag || '定义') + '</span>' + (b.title ? '<span>' + inline(b.title) + '</span>' : '') + '</div><div class="blk-body">' + paras(b.x) + '</div></div>';
      case 'thm':
        var pr = b.proof ? '<div class="ans-box"><div class="blk-body" style="font-weight:600;font-size:13px">证明思路</div><div class="blk-body">' + paras(b.proof) + '</div></div>' : '';
        return '<div class="blk thm"><div class="blk-title"><span class="blk-tag">' + esc(b.tag || '定理') + '</span>' + (b.title ? '<span>' + inline(b.title) + '</span>' : '') + '</div><div class="blk-body">' + paras(b.x) + '</div>' + pr + '</div>';
      case 'prop':
      case 'lemma':
      case 'cor':
        return '<div class="blk ' + b.t + '"><div class="blk-title"><span class="blk-tag">' + esc(b.tag || (b.t === 'prop' ? '命题' : b.t === 'lemma' ? '引理' : '推论')) + '</span>' + (b.title ? '<span>' + inline(b.title) + '</span>' : '') + '</div><div class="blk-body">' + paras(b.x) + '</div></div>';
      case 'ex':
        var ans = b.ans ? '<div class="ans-box"><button class="ans-toggle" data-act="ex-ans">显示解答</button><div class="q-calc-ans">' + paras(b.ans) + '</div></div>' : '';
        return '<div class="blk ex"><div class="blk-title"><span class="blk-tag">' + esc(b.tag || '例') + '</span>' + (b.title ? '<span>' + inline(b.title) + '</span>' : '') + '</div><div class="blk-body">' + paras(b.x) + '</div>' + ans + '</div>';
      case 'note':
      case 'tip':
      case 'warn':
      case 'quote':
        var tagMap = { note: '注意', tip: '学习提示', warn: '常见误区', quote: '直观理解' };
        return '<div class="blk ' + b.t + '"><div class="blk-title"><span class="blk-tag">' + esc(b.tag || tagMap[b.t]) + '</span>' + (b.title ? '<span>' + inline(b.title) + '</span>' : '') + '</div><div class="blk-body">' + paras(b.x) + '</div></div>';
      case 'inter':
        return '<div class="inter" data-demo="' + esc(b.id) + '" data-title="' + esc(b.title || '') + '" data-desc="' + esc(b.desc || '') + '"></div>';
      default:
        return '<p>未知内容块</p>';
    }
  }

  function renderSection(sec, cid) {
    var html = '<section class="sec" id="' + cid + '-' + sec.id + '"><div class="sec-head"><span class="sec-no">' + esc(sec.id.replace(/^s/, '§')) + '</span><h2>' + esc(sec.title) + '</h2></div>';
    html += sec.sub ? '<p class="sec-sub">' + inline(sec.sub) + '</p>' : '';
    (sec.blocks || []).forEach(function (b) { html += renderBlock(b, cid); });
    html += '</section>';
    return html;
  }

  /* ---------- 练习渲染 ---------- */
  function renderExercises(exs) {
    if (!exs || !exs.length) return '';
    var html = '<div class="exercise-zone"><div class="ez-head"><h2>✍️ 章节练习</h2><span class="cnt">共 ' + exs.length + ' 题 · 选择题可直接作答，计算/证明题先自己思考再看解答</span></div><div class="ez-body">';
    var score = 0, answered = 0;
    exs.forEach(function (q, qi) {
      var typeBadge = q.t === 'choice' ? '选择题' : (q.t === 'tf' ? '判断题' : '计算/证明题');
      html += '<div class="q-item" data-q="' + qi + '">';
      html += '<span class="q-badge">' + typeBadge + '</span><span class="q-no">' + (qi + 1) + '.</span><span class="q-text">' + inline(q.q) + '</span>';
      if (q.t === 'choice' || q.t === 'tf') {
        html += '<div class="q-options">';
        (q.opts || []).forEach(function (op, oi) {
          html += '<button class="q-opt" data-oi="' + oi + '">' + inline(op) + '</button>';
        });
        html += '</div>';
        html += '<div class="q-feedback"></div>';
      } else {
        html += '<div class="q-actions">';
        if (q.hint) html += '<button class="ans-toggle" data-act="q-hint">提示</button>';
        html += '<button class="ans-toggle" data-act="q-ans">显示解答</button></div>';
        if (q.hint) html += '<div class="q-hint" style="display:none">' + inline(q.hint) + '</div>';
        html += '<div class="q-calc-ans">' + paras(q.ans || '') + '</div>';
      }
      html += '</div>';
    });
    html += '<div class="ez-score" id="ezScore"></div>';
    html += '</div></div>';
    return html;
  }

  function wireExerciseEvents(root) {
    // 例子解答开关
    root.querySelectorAll('[data-act="ex-ans"]').forEach(function (btn) {
      btn.onclick = function () {
        var box = btn.parentElement.querySelector('.q-calc-ans');
        var show = !box.classList.contains('show');
        box.classList.toggle('show', show);
        btn.textContent = show ? '收起解答' : '显示解答';
      };
    });
    var qitems = root.querySelectorAll('.q-item');
    var score = 0, answered = 0;
    qitems.forEach(function (item) {
      var qi = parseInt(item.getAttribute('data-q'), 10);
      var btns = item.querySelectorAll('.q-opt');
      var fb = item.querySelector('.q-feedback');
      var answeredFlag = false;
      btns.forEach(function (btn) {
        btn.onclick = function () {
          if (answeredFlag) return;
          answeredFlag = true;
          var oi = parseInt(btn.getAttribute('data-oi'), 10);
          var q = exsRef[qi];
          var ok = (oi === q.ans);
          btns.forEach(function (b2) { b2.disabled = true; });
          if (ok) {
            btn.classList.add('correct');
            fb.className = 'q-feedback show ok';
            fb.innerHTML = '✅ 回答正确。' + (q.why ? inline(q.why) : '');
            score++; answered++;
          } else {
            btn.classList.add('wrong');
            var rightBtn = item.querySelector('.q-opt[data-oi="' + q.ans + '"]');
            if (rightBtn) rightBtn.classList.add('correct');
            fb.className = 'q-feedback show bad';
            fb.innerHTML = '❌ 回答错误，正确答案是 <b>' + esc(q.opts[q.ans]) + '</b>。' + (q.why ? inline(q.why) : '');
            answered++;
          }
          var sc = item.closest('.exercise-zone').querySelector('#ezScore');
          if (sc) sc.textContent = '选择题/判断题得分：' + score + ' / ' + answered;
        };
      });
      // 计算题提示与解答
      var hintBtn = item.querySelector('[data-act="q-hint"]');
      if (hintBtn) hintBtn.onclick = function () {
        var hb = item.querySelector('.q-hint');
        var show = hb.style.display !== 'block';
        hb.style.display = show ? 'block' : 'none';
        hintBtn.textContent = show ? '收起提示' : '提示';
      };
      var ansBtn = item.querySelector('[data-act="q-ans"]');
      if (ansBtn) ansBtn.onclick = function () {
        var ab = item.querySelector('.q-calc-ans');
        var show = !ab.classList.contains('show');
        ab.classList.toggle('show', show);
        ansBtn.textContent = show ? '收起解答' : '显示解答';
      };
    });
  }

  /* ---------- 章节页 ---------- */
  function renderChapter(cid, secId) {
    var ch = null;
    chapters.forEach(function (c) { if (c.id === cid) ch = c; });
    if (!ch) { location.hash = '#/'; return; }
    var view = $('#view');
    var idx = chapters.indexOf(ch);
    var prev = idx > 0 ? chapters[idx - 1] : null;
    var next = idx < chapters.length - 1 ? chapters[idx + 1] : null;
    var html = '';
    html += '<nav class="crumb"><a href="#/">首页</a> › <span>' + volTitle(ch) + ' · 第 ' + ch.no + ' 章</span></nav>';
    html += '<header class="ch-header" data-sym="' + esc(ch.sym || '∑') + '"><div class="vol">' + volTitle(ch) + ' · 第 ' + ch.no + ' 章</div><h1>' + esc(ch.title) + '</h1>' +
      (ch.en ? '<div class="en">' + esc(ch.en) + '</div>' : '') +
      (ch.desc ? '<div class="ch-tagline">' + esc(ch.desc) + '</div>' : '') + '</header>';
    html += '<div class="ch-toc">' + (ch.sections || []).map(function (s) {
      return '<a class="toc-chip" href="#/ch/' + ch.id + '/' + s.id + '">' + esc(s.title) + '</a>';
    }).join('') + (ch.exercises && ch.exercises.length ? '<a class="toc-chip" href="#/ch/' + ch.id + '/exercises">✍️ 章节练习</a>' : '') + '</div>';
    html += '<div class="ch-intro"><h3>📖 本章导读</h3>' + paras(ch.intro || '') + '</div>';
    (ch.sections || []).forEach(function (s) { html += renderSection(s, ch.id); });
    if (ch.summary) html += '<section class="sec" id="' + ch.id + '-summary"><div class="sec-head"><span class="sec-no">小结</span><h2>本章小结与常见误区</h2></div>' + paras(ch.summary) + '</section>';
    html += '<div id="exercises" style="scroll-margin-top:80px">' + renderExercises(ch.exercises) + '</div>';
    html += '<div class="mark-zone"><button id="markBtn" class="btn ' + (progress[ch.id] ? 'accent' : 'soft') + '">' + (progress[ch.id] ? '✓ 已完成本章（点击取消）' : '学完了？标记为已完成') + '</button></div>';
    html += '<div class="ch-nav">';
    html += prev ? '<a class="btn ghost" href="#/ch/' + prev.id + '"><small>← 上一章</small>' + esc(prev.title) + '</a>' : '<span></span>';
    html += next ? '<a class="btn ghost" href="#/ch/' + next.id + '"><small>下一章 →</small>' + esc(next.title) + '</a>' : '<span></span>';
    html += '</div>';
    view.innerHTML = html;
    document.title = '第' + ch.no + '章 ' + ch.title + ' · 数分学堂';
    katexRender(view);
    // 互动演示
    view.querySelectorAll('.inter[data-demo]').forEach(function (host) {
      var id = host.getAttribute('data-demo');
      if (window.MA_DEMOS && MA_DEMOS.get(id)) {
        MA_DEMOS.mount(id, host, host.getAttribute('data-title') || '', host.getAttribute('data-desc') || '');
      }
    });
    // 练习事件
    wireExerciseEvents(view);
    // 标记完成
    var markBtn = $('#markBtn');
    if (markBtn) markBtn.onclick = function () {
      var now = !progress[ch.id];
      progress[ch.id] = now;
      saveProg(); updateBadge(); renderSidebar(ch.id);
      markBtn.textContent = now ? '✓ 已完成本章（点击取消）' : '学完了？标记为已完成';
      markBtn.className = 'btn ' + (now ? 'accent' : 'soft');
    };
    window.scrollTo(0, 0);
    if (secId) {
      setTimeout(function () {
        var target = document.getElementById(ch.id + '-' + secId) ||
          (secId === 'exercises' ? document.getElementById('exercises') : null);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
  }

  /* ---------- 启动 ---------- */
  window.addEventListener('hashchange', navigate);
  $('#navToggle').onclick = openDrawer;
  $('#backdrop').onclick = closeDrawer;
  // 章节练习索引（供 wireExerciseEvents 使用）
  var exsRef = {};
  chapters.forEach(function (c) {
    (c.exercises || []).forEach(function (q, qi) { exsRef[c.id + '-' + qi] = q; });
  });
  // 调整 wireExerciseEvents：读取当前章节练习
  var _origRender = renderChapter;
  // 在 wire 中通过容器内顺序对应练习数组
  function wireExerciseEvents2(root) {
    var cid = null;
    var mm = location.hash.match(/^#\/ch\/([^/]+)/);
    if (mm) cid = mm[1];
    var ch = null;
    chapters.forEach(function (c) { if (c.id === cid) ch = c; });
    window.__currentExercises = ch ? ch.exercises : [];
    // 事件绑定（与上面逻辑共用）
    root.querySelectorAll('[data-act="ex-ans"]').forEach(function (btn) {
      btn.onclick = function () {
        var box = btn.parentElement.querySelector('.q-calc-ans');
        var show = !box.classList.contains('show');
        box.classList.toggle('show', show);
        btn.textContent = show ? '收起解答' : '显示解答';
      };
    });
    var qitems = root.querySelectorAll('.q-item');
    var score = 0, answered = 0;
    qitems.forEach(function (item) {
      var qi = parseInt(item.getAttribute('data-q'), 10);
      var ex = window.__currentExercises[qi];
      var btns = item.querySelectorAll('.q-opt');
      var fb = item.querySelector('.q-feedback');
      var done = false;
      btns.forEach(function (btn) {
        btn.onclick = function () {
          if (done) return;
          done = true;
          var oi = parseInt(btn.getAttribute('data-oi'), 10);
          var ok = oi === ex.ans;
          btns.forEach(function (b2) { b2.disabled = true; });
          answered++;
          if (ok) {
            btn.classList.add('correct');
            fb.className = 'q-feedback show ok';
            fb.innerHTML = '✅ 正确。' + (ex.why ? inline(ex.why) : '');
            katexRender(fb);
            score++;
          } else {
            btn.classList.add('wrong');
            var rb = item.querySelector('.q-opt[data-oi="' + ex.ans + '"]');
            if (rb) rb.classList.add('correct');
            fb.className = 'q-feedback show bad';
            fb.innerHTML = '❌ 不对。正确答案：<b>' + esc(ex.opts[ex.ans]) + '</b>。' + (ex.why ? inline(ex.why) : '');
            katexRender(fb);
          }
          var sc = item.closest('.exercise-zone').querySelector('#ezScore');
          if (sc) sc.textContent = '客观题得分：' + score + ' / ' + answered;
        };
      });
      var hb = item.querySelector('[data-act="q-hint"]');
      if (hb) hb.onclick = function () {
        var el = item.querySelector('.q-hint');
        var show = el.style.display !== 'block';
        el.style.display = show ? 'block' : 'none';
        hb.textContent = show ? '收起提示' : '提示';
      };
      var ab = item.querySelector('[data-act="q-ans"]');
      if (ab) ab.onclick = function () {
        var el = item.querySelector('.q-calc-ans');
        var show = !el.classList.contains('show');
        el.classList.toggle('show', show);
        ab.textContent = show ? '收起解答' : '显示解答';
      };
    });
  }
  // 用统一实现替换旧的 wireExerciseEvents
  wireExerciseEvents = wireExerciseEvents2;

  updateBadge();
  navigate();
})();
