/* ============ 演示 1：实数/区间套（第一章、第七章） ============ */
MA_DEMOS.register('nested', {
  title: '十进制小数逐步逼近 √2 —— 区间套思想',
  height: 320,
  controls: [
    { key: 'k', label: '查看第 k 层', type: 'range', min: 0, max: 6, step: 1, val: 3, fmt: function (v) { return v; } }
  ],
  draw: function (ctx, w, h, S) {
    var R = Math.SQRT2;
    var rows = 7, j;
    var top = 34, bot = 30;
    var rowH = (h - top - bot) / rows;
    var x0 = 118, x1 = w - 74;
    var labelW = 96;
    // √2 标题
    ctx.save();
    ctx.font = '13px "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#c0392b';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText('√2 ≈ 1.414213562…', 6, 14);
    ctx.restore();
    for (j = 0; j < rows; j++) {
      var step = Math.pow(10, -j);
      var aj = Math.floor(R / step + 1e-9) * step;
      var bj = aj + step;
      var lo = aj - 0.55 * step, hi = bj + 0.55 * step;
      var yMid = top + j * rowH + rowH * 0.5;
      var px = function (x) { return x0 + (x - lo) / (hi - lo) * (x1 - x0); };
      var isCur = (j === S.k);
      // 行标签
      ctx.font = '12.5px "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillStyle = isCur ? '#55418f' : '#8a93a3';
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      ctx.fillText('第 ' + j + ' 层', x0 - 10, yMid);
      // 区间线
      ctx.strokeStyle = isCur ? '#55418f' : '#b9c0ce';
      ctx.lineWidth = isCur ? 4 : 2.2;
      ctx.beginPath();
      ctx.moveTo(px(aj), yMid); ctx.lineTo(px(bj), yMid);
      ctx.stroke();
      // 端点竖线
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px(aj), yMid - (isCur ? 8 : 5)); ctx.lineTo(px(aj), yMid + (isCur ? 8 : 5));
      ctx.moveTo(px(bj), yMid - (isCur ? 8 : 5)); ctx.lineTo(px(bj), yMid + (isCur ? 8 : 5));
      ctx.stroke();
      // 端点标签
      ctx.fillStyle = isCur ? '#2b4a9b' : '#6b7484';
      var dec = Math.max(1, j);
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.font = '11.5px "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillText(aj.toFixed(dec), px(aj), yMid + 6);
      ctx.fillText(bj.toFixed(dec), px(bj), yMid + 6);
      // 长度标注
      ctx.fillStyle = '#8a93a3';
      ctx.textAlign = 'left';
      ctx.fillText('长度 ' + step.toExponential(0), x1 + 8, yMid);
      // √2 所在位置（每个放大窗口内 √2 恒在区间中央附近）
      var pr = px(R);
      ctx.strokeStyle = 'rgba(192,57,43,.85)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(pr, top + j * rowH + 2); ctx.lineTo(pr, yMid - 4);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#c0392b';
      ctx.beginPath(); ctx.arc(pr, yMid, 3, 0, Math.PI * 2); ctx.fill();
    }
  },
  status: function (S) {
    var step = Math.pow(10, -S.k);
    var aj = Math.floor(Math.SQRT2 / step + 1e-9) * step;
    var bj = aj + step;
    return '第 ' + S.k + ' 层区间 [' + aj.toFixed(Math.max(1, S.k)) + ', ' + bj.toFixed(Math.max(1, S.k)) +
      ']，长度 10^(' + (-S.k) + ') = ' + step + '。√2 始终被“夹”在其中；层数越多区间越窄，最终“套”出唯一的实数 √2。' +
      ' 这正体现了用有理数（有限十进制小数）构造/逼近实数的思想，也是第七章“闭区间套定理”的雏形。';
  }
});

/* ============ 演示 2：数列极限的 ε–N 语言（第二章） ============ */
MA_DEMOS.register('epsN', {
  title: '数列极限的 ε–N 语言：把“趋于”变成“可检验”',
  height: 360,
  controls: [
    { key: 'seq', label: '数列', type: 'select', val: 'inv', options: [
      { v: 'inv', t: 'aₙ = 1/n  → 0' },
      { v: 'inv2', t: 'aₙ = 1/n²  → 0' },
      { v: 'geo', t: 'aₙ = (1/2)ⁿ  → 0' },
      { v: 'alt', t: 'aₙ = (−1)ⁿ⁺¹/n  → 0' }
    ] },
    { key: 'eps', label: 'ε', type: 'range', min: 0.02, max: 0.5, step: 0.01, val: 0.1, fmt: function (v) { return v.toFixed(2); } }
  ],
  draw: function (ctx, w, h, S) {
    var SEQS = {
      inv: { fn: function (n) { return 1 / n; }, ymin: -0.35, ymax: 1.15, name: '1/n' },
      inv2: { fn: function (n) { return 1 / (n * n); }, ymin: -0.2, ymax: 1.1, name: '1/n²' },
      geo: { fn: function (n) { return Math.pow(0.5, n); }, ymin: -0.2, ymax: 0.62, name: '(1/2)ⁿ' },
      alt: { fn: function (n) { return (n % 2 === 1 ? 1 : -1) / n; }, ymin: -0.55, ymax: 0.75, name: '(−1)ⁿ⁺¹/n' }
    };
    var q = SEQS[S.seq];
    var eps = S.eps;
    var Nmax = 60;
    // 求 N(ε)：最小的 N，使 n≥N 时 |aₙ−0|<ε
    var Neps = 1;
    while (Neps <= 6000 && Math.abs(q.fn(Neps)) >= eps) Neps++;
    var P = MA_DRAW.plot(w, h, 0, Nmax, q.ymin, q.ymax, { ml: 56, mb: 44 });
    // ε 带
    ctx.fillStyle = 'rgba(46,125,50,.12)';
    ctx.fillRect(P.X(0), P.Y(eps), P.X(Nmax) - P.X(0), P.Y(-eps) - P.Y(eps));
    // 尾部 n≥N 区域
    var xN = P.X(Math.min(Nmax, Math.max(1, Neps)));
    ctx.fillStyle = 'rgba(43,74,155,.08)';
    ctx.fillRect(xN, P.Y(q.ymax), P.X(Nmax) - xN, P.Y(q.ymin) - P.Y(q.ymax));
    MA_DRAW.axes(ctx, P, {
      xticks: [10, 20, 30, 40, 50, 60], yticks: [-0.5, -0.25, 0, 0.25, 0.5, 0.75, 1],
      xlabel: 'n', ylabel: 'aₙ', fmtY: function (v) { return v.toFixed(2).replace(/\.?0+$/, ''); }
    });
    // ε 边界虚线
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.2; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(P.X(0), P.Y(eps)); ctx.lineTo(P.X(Nmax), P.Y(eps)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(P.X(0), P.Y(-eps)); ctx.lineTo(P.X(Nmax), P.Y(-eps)); ctx.stroke();
    ctx.setLineDash([]);
    MA_DRAW.text(ctx, P.X(Nmax) - 6, P.Y(eps) - 8, 'ε=' + eps.toFixed(2), { color: '#c0392b', align: 'right', size: 12 });
    MA_DRAW.text(ctx, P.X(Nmax) - 6, P.Y(-eps) + 14, '−ε', { color: '#c0392b', align: 'right', size: 12 });
    // 数列点
    for (var n = 1; n <= Nmax; n++) {
      var y = q.fn(n);
      var col = (n >= Neps) ? '#1e7d32' : '#a8b0bd';
      MA_DRAW.dot(ctx, P.X(n), P.Y(y), 3.2, col);
    }
    // N(ε) 竖线
    if (Neps <= Nmax) {
      ctx.strokeStyle = '#55418f'; ctx.lineWidth = 1.6; ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(xN, P.Y(q.ymin)); ctx.lineTo(xN, P.Y(q.ymax)); ctx.stroke();
      ctx.setLineDash([]);
      MA_DRAW.text(ctx, xN, P.Y(q.ymin) + 14, 'N(ε)=' + Neps, { color: '#55418f', align: 'center', size: 12.5 });
    }
    MA_DRAW.text(ctx, P.X(2), P.Y(q.ymax) - 8, 'aₙ = ' + q.name, { color: '#2b4a9b', size: 13.5 });
  },
  status: function (S) {
    var q = { inv: '1/n', inv2: '1/n²', geo: '(1/2)ⁿ', alt: '(−1)ⁿ⁺¹/n' }[S.seq];
    var eps = S.eps, Neps = 1;
    var fns = { inv: function (n) { return 1 / n; }, inv2: function (n) { return 1 / (n * n); }, geo: function (n) { return Math.pow(0.5, n); }, alt: function (n) { return (n % 2 === 1 ? 1 : -1) / n; } };
    while (Neps <= 6000 && Math.abs(fns[S.seq](Neps)) >= eps) Neps++;
    return '对 aₙ=' + q + '，取 ε=' + eps.toFixed(2) + '，存在 N(ε)=' + Neps +
      '，使得一切 n≥' + Neps + ' 都有 |aₙ−0|<' + eps.toFixed(2) +
      '（图中绿色点全部落在红色 ε 带内）。试一试：把 ε 调小，N(ε) 会怎样变化？';
  }
});

/* ============ 演示 3：函数极限的 ε–δ 语言（第三章） ============ */
MA_DEMOS.register('epsD', {
  title: '函数极限的 ε–δ 语言：邻域里的“逼近游戏”',
  height: 380,
  controls: [
    { key: 'preset', label: '函数', type: 'select', val: 'sq', options: [
      { v: 'sq', t: 'f(x)=x², x→1（极限 1）' },
      { v: 'rec', t: 'f(x)=1/x, x→1.6（极限 0.625）' },
      { v: 'sinc', t: 'f(x)=sin x / x, x→0（极限 1）' }
    ] },
    { key: 'eps', label: 'ε', type: 'range', min: 0.15, max: 2.4, step: 0.01, val: 0.8, fmt: function (v) { return v.toFixed(2); } },
    { key: 'delta', label: 'δ', type: 'range', min: 0.02, max: 1.5, step: 0.01, val: 0.25, fmt: function (v) { return v.toFixed(2); } }
  ],
  P: null,
  onPreset: function (entry) {
    var PRES = {
      sq: { epsMin: 0.1, epsMax: 2.4, eps0: 0.8, dmax: 1.5, d0: 0.25, a: 1, L: 1, f: function (x) { return x * x; } },
      rec: { epsMin: 0.08, epsMax: 1.6, eps0: 0.5, dmax: 1.3, d0: 0.25, a: 1.6, L: 0.625, f: function (x) { return 1 / x; } },
      sinc: { epsMin: 0.06, epsMax: 1.0, eps0: 0.3, dmax: 4.2, d0: 0.4, a: 0, L: 1, f: function (x) { return x === 0 ? 1 : Math.sin(x) / x; } }
    };
    var p = PRES[entry.S.preset];
    entry.setRange('eps', { min: p.epsMin, max: p.epsMax, val: p.eps0 });
    entry.setRange('delta', { min: 0.02, max: p.dmax, val: p.d0 });
    if (!entry._ab) {
      entry._ab = document.createElement('button');
      entry._ab.textContent = '自动给出可行 δ';
      entry._ab.addEventListener('click', function () {
        var p2 = PRES[entry.S.preset];
        var sd = suggestDelta(p2, parseFloat(entry.S.eps));
        entry.setRange('delta', { min: 0.02, max: p2.dmax, val: sd });
        MA_DEMOS.redrawAll();
      });
      entry.ctlBox.appendChild(entry._ab);
    }
  },
  draw: function (ctx, w, h, S, entry) {
    var PRES = {
      sq: { t: 'f(x)=x²', f: function (x) { return x * x; }, a: 1, L: 1, xmin: -0.7, xmax: 2.9, ymin: -0.7, ymax: 8.8, xt: [0, 1, 2], yt: [0, 2, 4, 6, 8], dmax: 1.5, cont: true },
      rec: { t: 'f(x)=1/x', f: function (x) { return 1 / x; }, a: 1.6, L: 0.625, xmin: 0.1, xmax: 3.1, ymin: -0.3, ymax: 5.6, xt: [0.5, 1, 1.6, 2, 2.5, 3], yt: [0, 1, 2, 3, 4, 5], dmax: 1.3, cont: true },
      sinc: { t: 'f(x)=sin x / x', f: function (x) { return x === 0 ? 1 : Math.sin(x) / x; }, a: 0, L: 1, xmin: -4.6, xmax: 4.6, ymin: -0.45, ymax: 1.35, xt: [-4, -2, 0, 2, 4], yt: [0, 0.25, 0.5, 0.75, 1, 1.25], dmax: 4.2, cont: false }
    };
    var p = PRES[S.preset];
    var eps = S.eps, d = S.delta;
    var P = MA_DRAW.plot(w, h, p.xmin, p.xmax, p.ymin, p.ymax, { ml: 62, mb: 44 });
    // 竖带：|x−a|<δ
    ctx.fillStyle = 'rgba(106,85,201,.06)';
    ctx.fillRect(P.X(Math.max(p.xmin, p.a - d)), P.Y(p.ymax), P.X(Math.min(p.xmax, p.a + d)) - P.X(Math.max(p.xmin, p.a - d)), P.Y(p.ymin) - P.Y(p.ymax));
    // 横带：|f−L|<ε
    ctx.fillStyle = 'rgba(232,135,30,.10)';
    ctx.fillRect(P.X(p.xmin), P.Y(p.L + eps), P.X(p.xmax) - P.X(p.xmin), P.Y(p.L - eps) - P.Y(p.L + eps));
    MA_DRAW.axes(ctx, P, { xticks: p.xt, yticks: p.yt, xlabel: 'x', ylabel: 'y' });
    // ε 带边界
    ctx.strokeStyle = '#e8871e'; ctx.lineWidth = 1.4; ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(P.X(p.xmin), P.Y(p.L + eps)); ctx.lineTo(P.X(p.xmax), P.Y(p.L + eps)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(P.X(p.xmin), P.Y(p.L - eps)); ctx.lineTo(P.X(p.xmax), P.Y(p.L - eps)); ctx.stroke();
    ctx.setLineDash([]);
    MA_DRAW.text(ctx, P.X(p.xmax) - 6, P.Y(p.L + eps) - 8, 'L+ε', { color: '#c0781a', align: 'right', size: 12 });
    MA_DRAW.text(ctx, P.X(p.xmax) - 6, P.Y(p.L - eps) + 13, 'L−ε', { color: '#c0781a', align: 'right', size: 12 });
    // 曲线：按“是否在 δ 窗口 + 是否在 ε 带”着色
    var n = 600, i;
    ctx.save();
    ctx.lineWidth = 2.4; ctx.lineJoin = 'round';
    ctx.beginPath();
    for (i = 0; i <= n; i++) {
      var x = p.xmin + (p.xmax - p.xmin) * i / n;
      var y = p.f(x);
      if (!isFinite(y)) { ctx.stroke(); ctx.beginPath(); continue; }
      var sx = P.X(x), sy = P.Y(y);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.strokeStyle = '#2b4a9b'; ctx.stroke();
    ctx.restore();
    // 重新画：δ 窗口内的红/绿段
    ctx.save(); ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath();
    var pen = false;
    for (i = 0; i <= n; i++) {
      var x2 = p.xmin + (p.xmax - p.xmin) * i / n;
      if (Math.abs(x2 - p.a) < d) {
        var y2 = p.f(x2);
        var sx2 = P.X(x2), sy2 = P.Y(y2);
        if (i === 0 || !pen) { ctx.moveTo(sx2, sy2); pen = true; }
        else ctx.lineTo(sx2, sy2);
      } else pen = false;
    }
    ctx.strokeStyle = 'rgba(43,74,155,0)'; ctx.stroke();
    ctx.restore();
    // 逐段判断红绿（窗口内的点）
    var m = 900;
    for (i = 0; i < m; i++) {
      var xa = p.xmin + (p.xmax - p.xmin) * i / m;
      var xb = p.xmin + (p.xmax - p.xmin) * (i + 1) / m;
      if (Math.abs(xa - p.a) >= d && Math.abs(xb - p.a) >= d) continue;
      var ya = p.f(xa), yb = p.f(xb);
      var inBanda = Math.abs(ya - p.L) < eps, inBandb = Math.abs(yb - p.L) < eps;
      ctx.strokeStyle = (inBanda && inBandb) ? '#2e7d32' : '#c0392b';
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.moveTo(P.X(xa), P.Y(ya)); ctx.lineTo(P.X(xb), P.Y(yb));
      ctx.stroke();
    }
    // δ 竖线
    ctx.strokeStyle = '#55418f'; ctx.lineWidth = 1.6; ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(P.X(p.a - d), P.Y(p.ymin)); ctx.lineTo(P.X(p.a - d), P.Y(p.ymax));
    ctx.moveTo(P.X(p.a + d), P.Y(p.ymin)); ctx.lineTo(P.X(p.a + d), P.Y(p.ymax));
    ctx.stroke();
    ctx.setLineDash([]);
    MA_DRAW.text(ctx, P.X(p.a - d), P.Y(p.ymin) + 16, 'a−δ', { color: '#55418f', align: 'center', size: 12.5 });
    MA_DRAW.text(ctx, P.X(p.a + d), P.Y(p.ymin) + 16, 'a+δ', { color: '#55418f', align: 'center', size: 12.5 });
    // a 点
    ctx.fillStyle = '#55418f';
    ctx.beginPath(); ctx.arc(P.X(p.a), P.Y(p.ymin), 3.5, 0, Math.PI * 2); ctx.fill();
    MA_DRAW.text(ctx, P.X(p.a), P.Y(p.ymin) + 28, 'a=' + p.a, { color: '#55418f', align: 'center', size: 12.5 });
    // (a,L) 点 / 空心（可去间断）
    var px = P.X(p.a), py = P.Y(p.L);
    if (p.cont) { MA_DRAW.dot(ctx, px, py, 4.5, '#c0392b'); }
    else {
      ctx.save(); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
      MA_DRAW.text(ctx, px + 9, py - 10, 'f(0) 无定义，极限为 1', { color: '#c0392b', size: 11.5 });
    }
    MA_DRAW.text(ctx, P.X(p.xmin) + 6, P.Y(p.ymax) - 8, p.t, { color: '#2b4a9b', size: 13.5 });
    entry.__valid = checkValid(p, eps, d);
    entry.__sugg = suggestDelta(p, eps);
  },
  status: function (S) {
    var PRES = {
      sq: { a: 1, L: 1, f: function (x) { return x * x; }, dmax: 1.5 },
      rec: { a: 1.6, L: 0.625, f: function (x) { return 1 / x; }, dmax: 1.3 },
      sinc: { a: 0, L: 1, f: function (x) { return x === 0 ? 1 : Math.sin(x) / x; }, dmax: 4.2 }
    };
    var p = PRES[S.preset];
    var eps = S.eps, d = S.delta;
    var valid = checkValid(p, eps, d);
    if (!window.__epsDcache || window.__epsDcache.preset !== S.preset || Math.abs(window.__epsDcache.eps - eps) > 1e-9) {
      window.__epsDcache = { preset: S.preset, eps: eps, val: suggestDelta(p, eps) };
    }
    var sugg = window.__epsDcache.val;
    var head = valid
      ? '✓ 所选 δ=' + d.toFixed(2) + ' 有效：区间 (a−δ, a+δ) 内的曲线全部落在 L±ε 带内（紫色竖带里没有红色段）。'
      : '✗ 所选 δ=' + d.toFixed(2) + ' 无效：紫色竖带内仍有红色曲线段跑出 L±ε 带，请把 δ 调小。';
    return head + ' 当前 ε=' + eps.toFixed(2) + '，经程序验证该函数可取的（近似）最大 δ ≈ ' + sugg.toFixed(3) + '。';
  }
});

function checkValid(p, eps, d) {
  var m = 1600;
  for (var i = 1; i < m; i++) {
    var x = p.a - d + 2 * d * i / m;
    if (Math.abs(x - p.a) < 1e-12) continue;
    var y = p.f(x);
    if (!isFinite(y)) return false;
    if (Math.abs(y - p.L) >= eps) return false;
  }
  return true;
}
function suggestDelta(p, eps) {
  var dmax = p.dmax;
  var steps = 260;
  for (var i = steps; i >= 1; i--) {
    var d = dmax * i / steps;
    if (checkValid(p, eps, d)) return d;
  }
  return 0.001;
}

/* ============ 演示 4：连续函数的介值性 + 二分法求根（第四章） ============ */
MA_DEMOS.register('bisection', {
  title: '介值定理与二分法：怎样“抓到”方程的根',
  height: 380,
  controls: [
    { key: 'preset', label: '方程', type: 'select', val: 'a', options: [
      { v: 'a', t: 'f(x)=x³−x−1=0，区间 [1,2]' },
      { v: 'b', t: 'f(x)=cos x − x =0，区间 [0,1]' },
      { v: 'c', t: 'f(x)=x³−3x+1=0，区间 [0,1]' }
    ] },
    { key: 'k', label: '二分次数 k', type: 'range', min: 1, max: 24, step: 1, val: 8, fmt: function (v) { return v; } }
  ],
  draw: function (ctx, w, h, S) {
    var PRES = {
      a: { f: function (x) { return x * x * x - x - 1; }, a: 1, b: 2, xmin: 0.7, xmax: 2.3, ymin: -1.6, ymax: 2.6, root: 1.324718, xt: [1, 1.3247, 2], yt: [-1, 0, 1, 2] },
      b: { f: function (x) { return Math.cos(x) - x; }, a: 0, b: 1, xmin: -0.15, xmax: 1.15, ymin: -0.7, ymax: 1.2, root: 0.739085, xt: [0, 0.5, 0.7391, 1], yt: [-0.5, 0, 0.5, 1] },
      c: { f: function (x) { return x * x * x - 3 * x + 1; }, a: 0, b: 1, xmin: -0.15, xmax: 1.15, ymin: -1.2, ymax: 1.3, root: 0.347296, xt: [0, 0.5, 1], yt: [-1, -0.5, 0, 0.5, 1] }
    };
    var p = PRES[S.preset];
    var A = p.a, B = p.b;
    var fa = p.f(A), fb = p.f(B);
    for (var i = 0; i < S.k; i++) {
      var m = (A + B) / 2;
      if (p.f(A) * p.f(m) <= 0) B = m; else A = m;
    }
    var P = MA_DRAW.plot(w, h, p.xmin, p.xmax, p.ymin, p.ymax, { ml: 56, mb: 44 });
    MA_DRAW.axes(ctx, P, { xticks: p.xt, yticks: p.yt, xlabel: 'x', ylabel: 'y' });
    MA_DRAW.curve(ctx, P, p.f, p.xmin, p.xmax, { color: '#2b4a9b', width: 2.4 });
    // 区间高亮
    ctx.fillStyle = 'rgba(46,125,50,.13)';
    ctx.fillRect(P.X(A), P.Y(p.ymin), P.X(B) - P.X(A), P.Y(p.ymax) - P.Y(p.ymin));
    ctx.strokeStyle = '#2e7d32'; ctx.lineWidth = 2;
    ctx.strokeRect(P.X(A), P.Y(p.ymin), P.X(B) - P.X(A), P.Y(p.ymax) - P.Y(p.ymin));
    // A B 竖线
    ctx.strokeStyle = '#1e7d32'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 3]);
    ctx.beginPath(); ctx.moveTo(P.X(A), P.Y(p.ymin)); ctx.lineTo(P.X(A), P.Y(p.ymax));
    ctx.moveTo(P.X(B), P.Y(p.ymin)); ctx.lineTo(P.X(B), P.Y(p.ymax));
    ctx.stroke(); ctx.setLineDash([]);
    MA_DRAW.text(ctx, P.X(A), P.Y(p.ymin) + 18, 'aₖ', { color: '#1e7d32', align: 'center', size: 13 });
    MA_DRAW.text(ctx, P.X(B), P.Y(p.ymin) + 18, 'bₖ', { color: '#1e7d32', align: 'center', size: 13 });
    // 中点
    var c = (A + B) / 2;
    MA_DRAW.dot(ctx, P.X(c), P.Y(0), 4.5, '#c0392b');
    MA_DRAW.text(ctx, P.X(c), P.Y(p.ymin) + 30, 'cₖ=(aₖ+bₖ)/2', { color: '#c0392b', align: 'center', size: 12 });
    // 真实根
    MA_DRAW.dot(ctx, P.X(p.root), P.Y(0), 5, '#7a4fbf');
    MA_DRAW.text(ctx, P.X(p.root), P.Y(0) + 16, '根*', { color: '#7a4fbf', align: 'center', size: 12 });
    // 符号信息
    MA_DRAW.text(ctx, P.X(p.xmin) + 8, P.Y(p.ymax) - 8, 'f(a₀)·f(b₀)<0', { color: '#5b6472', size: 13 });
  },
  status: function (S) {
    var PRES = {
      a: { f: function (x) { return x * x * x - x - 1; }, a: 1, b: 2, root: 1.324718 },
      b: { f: function (x) { return Math.cos(x) - x; }, a: 0, b: 1, root: 0.739085 },
      c: { f: function (x) { return x * x * x - 3 * x + 1; }, a: 0, b: 1, root: 0.347296 }
    };
    var p = PRES[S.preset];
    var A = p.a, B = p.b;
    for (var i = 0; i < S.k; i++) {
      var m = (A + B) / 2;
      if (p.f(A) * p.f(m) <= 0) B = m; else A = m;
    }
    var c = (A + B) / 2;
    var len = B - A;
    return '二分 ' + S.k + ' 次后：aₖ=' + A.toFixed(7) + '，bₖ=' + B.toFixed(7) + '，区间长度 ' + len.toExponential(2) +
      '。取 cₖ=' + c.toFixed(7) + ' 作为近似根，误差不超过 ' + (len / 2).toExponential(2) +
      '；与真实根比较，实际误差 |cₖ−r|≈' + Math.abs(c - p.root).toExponential(2) + '。';
  }
});

/* ============ 演示 5：导数的几何意义（第五章） ============ */
MA_DEMOS.register('deriv', {
  title: '割线 → 切线：导数就是切线斜率',
  height: 380,
  controls: [
    { key: 'preset', label: '函数', type: 'select', val: 'sq', options: [
      { v: 'sq', t: 'f(x)=x²' }, { v: 'sin', t: 'f(x)=sin x' }, { v: 'cb', t: 'f(x)=x³−x' }
    ] },
    { key: 'a', label: 'a', type: 'range', min: -1.2, max: 1.2, step: 0.01, val: 0.9, fmt: function (v) { return v.toFixed(2); } },
    { key: 'h', label: 'h', type: 'range', min: -1.4, max: 1.4, step: 0.01, val: 0.7, fmt: function (v) { return v.toFixed(2); } }
  ],
  onPreset: function (entry) {
    var R = {
      sq: { arange: [-1.2, 1.2], a0: 0.9 },
      sin: { arange: [-2.4, 2.4], a0: 0.9 },
      cb: { arange: [-1.1, 1.1], a0: 0.8 }
    };
    var r = R[entry.S.preset];
    entry.setRange('a', { min: r.arange[0], max: r.arange[1], val: r.a0 });
  },
  draw: function (ctx, w, h, S) {
    var PRES = {
      sq: { f: function (x) { return x * x; }, df: function (x) { return 2 * x; }, xmin: -2.6, xmax: 2.6, ymin: -0.9, ymax: 7.2, xt: [-2, -1, 0, 1, 2], yt: [0, 2, 4, 6], name: 'f(x)=x²' },
      sin: { f: function (x) { return Math.sin(x); }, df: function (x) { return Math.cos(x); }, xmin: -5.2, xmax: 5.2, ymin: -1.45, ymax: 1.45, xt: [-4, -2, 0, 2, 4], yt: [-1, -0.5, 0, 0.5, 1], name: 'f(x)=sin x' },
      cb: { f: function (x) { return x * x * x - x; }, df: function (x) { return 3 * x * x - 1; }, xmin: -2.2, xmax: 2.2, ymin: -5.6, ymax: 5.6, xt: [-2, -1, 0, 1, 2], yt: [-4, -2, 0, 2, 4], name: 'f(x)=x³−x' }
    };
    var p = PRES[S.preset];
    var a = S.a, h = S.h;
    var P = MA_DRAW.plot(w, h, p.xmin, p.xmax, p.ymin, p.ymax, { ml: 56, mb: 44 });
    MA_DRAW.axes(ctx, P, { xticks: p.xt, yticks: p.yt, xlabel: 'x', ylabel: 'y' });
    MA_DRAW.curve(ctx, P, p.f, p.xmin, p.xmax, { color: '#7d8bb3', width: 2.4 });
    var fa = p.f(a);
    var df = p.df(a);
    var secSlope = null;
    var b = a + h;
    var secValid = (Math.abs(h) > 1e-6);
    if (secValid) secSlope = (p.f(b) - fa) / h;
    // 切线
    var drawLine = function (slope, xa, ya, color, width, dash) {
      var xL = p.xmin, xR = p.xmax;
      var yL = ya + slope * (xL - xa), yR = ya + slope * (xR - xa);
      MA_DRAW.line(ctx, [[P.X(xL), P.Y(yL)], [P.X(xR), P.Y(yR)]], { color: color, width: width, dash: dash });
    };
    drawLine(df, a, fa, '#c0392b', 2.4, []);
    if (secValid && isFinite(secSlope)) drawLine(secSlope, a, fa, '#7a4fbf', 2, [6, 4]);
    // 点
    MA_DRAW.dot(ctx, P.X(a), P.Y(fa), 5, '#c0392b');
    if (secValid) MA_DRAW.dot(ctx, P.X(b), P.Y(p.f(b)), 5, '#7a4fbf');
    MA_DRAW.text(ctx, P.X(a), P.Y(fa) - 12, 'A(a,f(a))', { color: '#c0392b', align: 'center', size: 12.5 });
    if (secValid) MA_DRAW.text(ctx, P.X(b), P.Y(p.f(b)) + 16, 'B(a+h,f(a+h))', { color: '#7a4fbf', align: 'center', size: 12 });
    // 图例
    var ly = P.Y(p.ymax) - 12;
    MA_DRAW.text(ctx, P.X(p.xmin) + 8, ly, '— 切线（斜率 f′(a)）', { color: '#c0392b', size: 13 });
    if (secValid) MA_DRAW.text(ctx, P.X(p.xmin) + 8, ly + 18, '╌╌ 割线 AB（斜率 ' + (isFinite(secSlope) ? secSlope.toFixed(3) : '?') + '）', { color: '#7a4fbf', size: 13 });
  },
  status: function (S) {
    var p = { sq: { f: function (x) { return x * x; }, df: function (x) { return 2 * x; } }, sin: { f: Math.sin, df: Math.cos }, cb: { f: function (x) { return x * x * x - x; }, df: function (x) { return 3 * x * x - 1; } } }[S.preset];
    var fa = p.f(S.a);
    var sec = Math.abs(S.h) > 1e-6 ? (p.f(S.a + S.h) - fa) / S.h : null;
    return '割线斜率 (f(a+h)−f(a))/h = ' + (sec === null ? '—' : sec.toFixed(4)) +
      '，切线斜率 f′(' + S.a.toFixed(2) + ') = ' + p.df(S.a).toFixed(4) +
      '。把 h 向 0 移动（可点 h 滑块并观察），割线会“旋转”贴近切线，两者斜率趋于一致。';
  }
});

/* ============ 演示 6：拉格朗日中值定理（第六章） ============ */
MA_DEMOS.register('mvt', {
  title: '拉格朗日中值定理：曲线上必有“与弦平行”的切线',
  height: 380,
  controls: [
    { key: 'preset', label: '函数', type: 'select', val: 'sq', options: [
      { v: 'sq', t: 'f(x)=x²，区间 [1,3]' },
      { v: 'sinp', t: 'f(x)=sin x，区间 [0,π]' },
      { v: 'cub', t: 'f(x)=x³−3x，区间 [−2,2]' }
    ] }
  ],
  draw: function (ctx, w, h, S) {
    var PRES = {
      sq: { f: function (x) { return x * x; }, df: function (x) { return 2 * x; }, a: 1, b: 3, xmin: 0.6, xmax: 3.4, ymin: -0.9, ymax: 9.9, xt: [1, 2, 3], yt: [0, 2, 4, 6, 8], name: 'f(x)=x²' },
      sinp: { f: function (x) { return Math.sin(x); }, df: function (x) { return Math.cos(x); }, a: 0, b: Math.PI, xmin: -0.5, xmax: 3.7, ymin: -1.25, ymax: 1.35, xt: [0, Math.PI / 2, Math.PI], yt: [-1, -0.5, 0, 0.5, 1], name: 'f(x)=sin x' },
      cub: { f: function (x) { return x * x * x - 3 * x; }, df: function (x) { return 3 * x * x - 3; }, a: -2, b: 2, xmin: -2.4, xmax: 2.4, ymin: -3.6, ymax: 3.8, xt: [-2, -1, 0, 1, 2], yt: [-3, -2, -1, 0, 1, 2, 3], name: 'f(x)=x³−3x' }
    };
    var p = PRES[S.preset];
    var P = MA_DRAW.plot(w, h, p.xmin, p.xmax, p.ymin, p.ymax, { ml: 58, mb: 44 });
    MA_DRAW.axes(ctx, P, { xticks: p.xt, yticks: p.yt, xlabel: 'x', ylabel: 'y', fmtX: function (v) { return Math.abs(v - Math.PI) < 0.01 ? 'π' : (Math.abs(v - Math.PI / 2) < 0.01 ? 'π/2' : v); } });
    MA_DRAW.curve(ctx, P, p.f, p.xmin, p.xmax, { color: '#2b4a9b', width: 2.6 });
    // 弦
    var fa = p.f(p.a), fb = p.f(p.b);
    var slope = (fb - fa) / (p.b - p.a);
    MA_DRAW.line(ctx, [[P.X(p.a), P.Y(fa)], [P.X(p.b), P.Y(fb)]], { color: '#7b8494', width: 2, dash: [7, 5] });
    // 找满足 f′(c)=弦斜率的 c
    var cs = [];
    var prev = p.df(p.a) - slope;
    for (var i = 1; i <= 3000; i++) {
      var x = p.a + (p.b - p.a) * i / 3000;
      var cur = p.df(x) - slope;
      if (prev * cur < 0) {
        var lo = x - (p.b - p.a) / 3000, hi = x;
        for (var it = 0; it < 40; it++) {
          var mid = (lo + hi) / 2;
          if ((p.df(mid) - slope) * (p.df(lo) - slope) <= 0) hi = mid; else lo = mid;
        }
        cs.push((lo + hi) / 2);
      }
      prev = cur;
    }
    // 平行切线
    cs.forEach(function (c) {
      var yc = p.f(c);
      var xL = Math.max(p.xmin, c - 1.4), xR = Math.min(p.xmax, c + 1.4);
      MA_DRAW.line(ctx, [[P.X(xL), P.Y(yc + slope * (xL - c))], [P.X(xR), P.Y(yc + slope * (xR - c))]], { color: '#c0392b', width: 2.6 });
      MA_DRAW.dot(ctx, P.X(c), P.Y(yc), 5, '#c0392b');
      ctx.strokeStyle = 'rgba(192,57,43,.4)'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(P.X(c), P.Y(p.ymin)); ctx.lineTo(P.X(c), P.Y(yc)); ctx.stroke();
      ctx.setLineDash([]);
    });
    // 端点
    MA_DRAW.dot(ctx, P.X(p.a), P.Y(fa), 4.5, '#2b4a9b');
    MA_DRAW.dot(ctx, P.X(p.b), P.Y(fb), 4.5, '#2b4a9b');
    MA_DRAW.text(ctx, P.X(p.a), P.Y(fa) + 14, 'a', { color: '#2b4a9b', align: 'center', size: 13 });
    MA_DRAW.text(ctx, P.X(p.b), P.Y(fb) + 14, 'b', { color: '#2b4a9b', align: 'center', size: 13 });
    MA_DRAW.text(ctx, P.X(p.xmin) + 6, P.Y(p.ymax) - 8, '弦斜率 = ' + slope.toFixed(3), { color: '#7b8494', size: 13 });
    MA_DRAW.text(ctx, P.X(p.xmin) + 6, P.Y(p.ymax) - 26, p.name, { color: '#2b4a9b', size: 13.5 });
  },
  status: function (S) {
    var p = { sq: { f: function (x) { return x * x; }, df: function (x) { return 2 * x; }, a: 1, b: 3 }, sinp: { f: function (x) { return Math.sin(x); }, df: function (x) { return Math.cos(x); }, a: 0, b: Math.PI }, cub: { f: function (x) { return x * x * x - 3 * x; }, df: function (x) { return 3 * x * x - 3; }, a: -2, b: 2 } }[S.preset];
    var slope = (p.f(p.b) - p.f(p.a)) / (p.b - p.a);
    var cs = [];
    var prev = p.df(p.a) - slope;
    for (var i = 1; i <= 3000; i++) {
      var x = p.a + (p.b - p.a) * i / 3000;
      var cur = p.df(x) - slope;
      if (prev * cur < 0) {
        var lo = x - (p.b - p.a) / 3000, hi = x;
        for (var it = 0; it < 40; it++) { var mid = (lo + hi) / 2; if ((p.df(mid) - slope) * (p.df(lo) - slope) <= 0) hi = mid; else lo = mid; }
        cs.push((lo + hi) / 2);
      }
      prev = cur;
    }
    return '弦 AB 斜率 = (f(b)−f(a))/(b−a) = ' + slope.toFixed(4) +
      '。定理保证存在 c∈(a,b) 使 f′(c) 等于该斜率（红色平行切线的切点）：c = ' + cs.map(function (v) { return v.toFixed(4); }).join('、') + '。';
  }
});
