/* ============ 演示 7：定积分 = 黎曼和的极限（第九章） ============ */
MA_DEMOS.register('riemann', {
  title: '定积分：把曲边梯形切成小矩形再求和',
  height: 380,
  controls: [
    { key: 'preset', label: '函数', type: 'select', val: 'x2', options: [
      { v: 'x2', t: 'f(x)=x²，[0,2]' },
      { v: 'ex', t: 'f(x)=eˣ，[0,1]' },
      { v: 'sinp', t: 'f(x)=sin x，[0,π]' }
    ] },
    { key: 'n', label: '分割数 n', type: 'range', min: 1, max: 120, step: 1, val: 10, fmt: function (v) { return v; } },
    { key: 'method', label: '取点方式', type: 'select', val: 'left', options: [
      { v: 'left', t: '左端点（不足近似）' },
      { v: 'right', t: '右端点（过剩近似）' },
      { v: 'mid', t: '中点' },
      { v: 'trap', t: '梯形' }
    ] }
  ],
  draw: function (ctx, w, h, S) {
    var PRES = {
      x2: { f: function (x) { return x * x; }, a: 0, b: 2, I: 8 / 3, xmin: -0.15, xmax: 2.15, ymin: -0.35, ymax: 4.4, xt: [0, 1, 2], yt: [0, 1, 2, 3, 4], name: 'f(x)=x²' },
      ex: { f: function (x) { return Math.exp(x); }, a: 0, b: 1, I: Math.E - 1, xmin: -0.12, xmax: 1.12, ymin: -0.35, ymax: 3.1, xt: [0, 0.5, 1], yt: [0, 1, 2, 3], name: 'f(x)=eˣ' },
      sinp: { f: function (x) { return Math.sin(x); }, a: 0, b: Math.PI, I: 2, xmin: -0.3, xmax: Math.PI + 0.3, ymin: -0.25, ymax: 1.25, xt: [0, Math.PI / 2, Math.PI], yt: [0, 0.5, 1], name: 'f(x)=sin x' }
    };
    var p = PRES[S.preset];
    var n = S.n, a = p.a, b = p.b, dx = (b - a) / n;
    var sum = 0;
    var pts = [], rects = [];
    for (var i = 0; i < n; i++) {
      var x0 = a + i * dx, x1 = x0 + dx;
      var hh;
      if (S.method === 'left') hh = p.f(x0);
      else if (S.method === 'right') hh = p.f(x1);
      else if (S.method === 'mid') hh = p.f((x0 + x1) / 2);
      else hh = (p.f(x0) + p.f(x1)) / 2;
      sum += hh * dx;
      rects.push([x0, x1, hh]);
    }
    var P = MA_DRAW.plot(w, h, p.xmin, p.xmax, p.ymin, p.ymax, { ml: 60, mb: 44 });
    MA_DRAW.axes(ctx, P, { xticks: p.xt, yticks: p.yt, xlabel: 'x', ylabel: 'y', fmtX: function (v) { return Math.abs(v - Math.PI) < 0.01 ? 'π' : (Math.abs(v - Math.PI / 2) < 0.01 ? 'π/2' : v); } });
    // 矩形
    rects.forEach(function (r) {
      var xl = P.X(r[0]), xr = P.X(r[1]), yt2 = P.Y(r[2]);
      ctx.fillStyle = 'rgba(43,74,155,.16)';
      ctx.fillRect(xl, yt2, xr - xl, P.Y(0) - yt2);
      ctx.strokeStyle = 'rgba(43,74,155,.75)'; ctx.lineWidth = 1;
      ctx.strokeRect(xl, yt2, xr - xl, P.Y(0) - yt2);
    });
    // 梯形
    if (S.method === 'trap') {
      ctx.strokeStyle = 'rgba(43,74,155,.75)'; ctx.lineWidth = 1.4;
      for (var i2 = 0; i2 < n; i2++) {
        var xa = a + i2 * dx, xb = xa + dx;
        MA_DRAW.line(ctx, [[P.X(xa), P.Y(p.f(xa))], [P.X(xb), P.Y(p.f(xb))]], { color: '#2b4a9b', width: 1.4 });
      }
    }
    MA_DRAW.curve(ctx, P, p.f, a, b, { color: '#c0392b', width: 2.6 });
    MA_DRAW.text(ctx, P.X(p.xmin) + 8, P.Y(p.ymax) - 10, p.name, { color: '#c0392b', size: 13.5 });
    var names = { left: '左和 Lₙ', right: '右和 Rₙ', mid: '中点和 Mₙ', trap: '梯形和 Tₙ' };
    MA_DRAW.text(ctx, P.X(p.xmin) + 8, P.Y(p.ymax) - 30, names[S.method] + ' = ' + sum.toFixed(5) + '　误差 |S−I|=' + Math.abs(sum - p.I).toExponential(2), { color: '#2b4a9b', size: 13.5 });
  },
  status: function (S) {
    var PRES = {
      x2: { f: function (x) { return x * x; }, a: 0, b: 2, I: 8 / 3 },
      ex: { f: function (x) { return Math.exp(x); }, a: 0, b: 1, I: Math.E - 1 },
      sinp: { f: function (x) { return Math.sin(x); }, a: 0, b: Math.PI, I: 2 }
    };
    var p = PRES[S.preset];
    var n = S.n, dx = (p.b - p.a) / n, sum = 0;
    for (var i = 0; i < n; i++) {
      var x0 = p.a + i * dx, x1 = x0 + dx;
      var hh = S.method === 'left' ? p.f(x0) : S.method === 'right' ? p.f(x1) : S.method === 'mid' ? p.f((x0 + x1) / 2) : (p.f(x0) + p.f(x1)) / 2;
      sum += hh * dx;
    }
    var names = { left: '左和', right: '右和', mid: '中点和', trap: '梯形和' };
    var Istr = p.I === 8 / 3 ? '8/3≈2.66667' : (p.I === 2 ? '2' : 'e−1≈1.71828');
    return names[S.method] + ' S=' + sum.toFixed(6) + '，定积分（精确值）=' + Istr +
      '，误差 |S−I|=' + Math.abs(sum - p.I).toExponential(3) +
      '。调大 n（把区间分得更细），S 越来越接近 I——这就是“分割、近似、求和、取极限”。';
  }
});

/* ============ 演示 8：弧长 = 折线长的极限（第十章） ============ */
MA_DEMOS.register('arclen', {
  title: '平面曲线弧长：用折线去“测量”曲线',
  height: 380,
  controls: [
    { key: 'preset', label: '曲线', type: 'select', val: 'x2', options: [
      { v: 'x2', t: 'y=x²，0≤x≤1' },
      { v: 'sinp', t: 'y=sin x，0≤x≤π' },
      { v: 'half', t: '上半圆 x²+y²=1' }
    ] },
    { key: 'n', label: '折线段数 n', type: 'range', min: 2, max: 200, step: 1, val: 16, fmt: function (v) { return v; } }
  ],
  draw: function (ctx, w, h, S) {
    var PRES = {
      x2: { f: function (x) { return x * x; }, df: function (x) { return 2 * x; }, a: 0, b: 1, xmin: -0.12, xmax: 1.12, ymin: -0.3, ymax: 1.25, xt: [0, 0.5, 1], yt: [0, 0.5, 1], name: 'y=x²' },
      sinp: { f: function (x) { return Math.sin(x); }, df: function (x) { return Math.cos(x); }, a: 0, b: Math.PI, xmin: -0.3, xmax: Math.PI + 0.3, ymin: -0.4, ymax: 1.35, xt: [0, Math.PI / 2, Math.PI], yt: [0, 0.5, 1], name: 'y=sin x' },
      half: { f: function (x) { return Math.sqrt(Math.max(0, 1 - x * x)); }, df: function (x) { return -x / Math.sqrt(Math.max(1e-6, 1 - x * x)); }, a: -1, b: 1, xmin: -1.18, xmax: 1.18, ymin: -0.3, ymax: 1.3, xt: [-1, 0, 1], yt: [0, 0.5, 1], name: '上半圆' }
    };
    var p = PRES[S.preset];
    var P = MA_DRAW.plot(w, h, p.xmin, p.xmax, p.ymin, p.ymax, { ml: 60, mb: 44 });
    MA_DRAW.axes(ctx, P, { xticks: p.xt, yticks: p.yt, xlabel: 'x', ylabel: 'y', fmtX: function (v) { return Math.abs(v - Math.PI) < 0.01 ? 'π' : v; } });
    MA_DRAW.curve(ctx, P, p.f, p.a, p.b, { color: '#c0392b', width: 2.4 });
    // 折线
    var n = S.n, len = 0, xPrev = p.a, yPrev = p.f(p.a);
    ctx.strokeStyle = '#2b4a9b'; ctx.lineWidth = 2; ctx.setLineDash([5, 3]);
    ctx.beginPath();
    ctx.moveTo(P.X(xPrev), P.Y(yPrev));
    for (var i = 1; i <= n; i++) {
      var x = p.a + (p.b - p.a) * i / n;
      var y = p.f(x);
      len += Math.sqrt((x - xPrev) * (x - xPrev) + (y - yPrev) * (y - yPrev));
      ctx.lineTo(P.X(x), P.Y(y));
      xPrev = x; yPrev = y;
    }
    ctx.stroke();
    ctx.setLineDash([]);
    // 折点
    for (var j = 0; j <= n; j++) {
      var xd = p.a + (p.b - p.a) * j / n;
      MA_DRAW.dot(ctx, P.X(xd), P.Y(p.f(xd)), 2.6, '#2b4a9b');
    }
    var exact = MA_DRAW.simpson(function (x) { return Math.sqrt(1 + p.df(x) * p.df(x)); }, p.a, p.b, 2000);
    MA_DRAW.text(ctx, P.X(p.xmin) + 8, P.Y(p.ymax) - 10, p.name, { color: '#c0392b', size: 13.5 });
    MA_DRAW.text(ctx, P.X(p.xmin) + 8, P.Y(p.ymax) - 30, '折线长≈' + len.toFixed(5) + '，弧长=' + exact.toFixed(5), { color: '#2b4a9b', size: 13.5 });
  },
  status: function (S) {
    var PRES = {
      x2: { f: function (x) { return x * x; }, df: function (x) { return 2 * x; }, a: 0, b: 1 },
      sinp: { f: function (x) { return Math.sin(x); }, df: function (x) { return Math.cos(x); }, a: 0, b: Math.PI },
      half: { f: function (x) { return Math.sqrt(Math.max(0, 1 - x * x)); }, df: function (x) { return -x / Math.sqrt(Math.max(1e-6, 1 - x * x)); }, a: -1, b: 1 }
    };
    var p = PRES[S.preset];
    var n = S.n, len = 0, xPrev = p.a, yPrev = p.f(p.a);
    for (var i = 1; i <= n; i++) {
      var x = p.a + (p.b - p.a) * i / n, y = p.f(x);
      len += Math.sqrt((x - xPrev) * (x - xPrev) + (y - yPrev) * (y - yPrev));
      xPrev = x; yPrev = y;
    }
    var exact = MA_DRAW.simpson(function (x) { return Math.sqrt(1 + p.df(x) * p.df(x)); }, p.a, p.b, 2000);
    return 'n=' + n + ' 段折线长 = ' + len.toFixed(6) + '，弧长 L=∫√(1+(f′)²)dx = ' + exact.toFixed(6) +
      '，误差 ≈ ' + Math.abs(len - exact).toExponential(3) + '。n 越大折线越贴近曲线，长度越接近弧长。';
  }
});

/* ============ 演示 9：反常积分（第十一章） ============ */
MA_DEMOS.register('improper', {
  title: '反常积分：无穷区间 / 无界函数的“面积”何时有限？',
  height: 380,
  controls: [
    { key: 'type', label: '类型', type: 'select', val: 'I', options: [
      { v: 'I', t: '∫₁^∞ 1/xᵖ dx（无穷区间）' },
      { v: 'II', t: '∫₀¹ 1/xᵖ dx（无界函数）' }
    ] },
    { key: 'p', label: 'p', type: 'range', min: 0.2, max: 2.4, step: 0.05, val: 1.0, fmt: function (v) { return v.toFixed(2); } },
    { key: 'log', label: 'R 或 1/δ', type: 'range', min: 0.1, max: 6, step: 0.1, val: 1.5, fmt: function (v) { return '10^(' + v.toFixed(1) + ')'; } }
  ],
  onPreset: function (entry) {
    if (entry.S.type === 'II') {
      entry.setRange('log', { min: 0.1, max: 8, val: 2, step: 0.1 });
      entry.setRange('p', { min: 0.2, max: 2.4, val: 0.7, step: 0.05 });
      entry.setEnabled('log', true);
    } else {
      entry.setRange('log', { min: 0.1, max: 6, val: 1.5, step: 0.1 });
      entry.setRange('p', { min: 0.2, max: 2.4, val: 1.0, step: 0.05 });
    }
  },
  draw: function (ctx, w, h, S) {
    var p = S.p;
    var isI = S.type === 'I';
    var XMIN = 0, XMAX = isI ? 6 : 8;   // R:10^0..10^6；δ:10^0..10^-8
    var lim = null;
    if (isI && p > 1) lim = 1 / (p - 1);
    if (!isI && p < 1) lim = 1 / (1 - p);
    var ymax = 1.2;
    var N = 400;
    for (var i = 0; i <= N; i++) {
      var lg = XMIN + (XMAX - XMIN) * i / N;
      var R = Math.pow(10, lg);
      var A = isI ? areaI(p, R) : areaII(p, R);
      if (isFinite(A)) ymax = Math.max(ymax, A);
    }
    if (lim !== null) ymax = Math.max(ymax, lim * 1.15);
    ymax = Math.min(ymax, 600);
    var P2 = MA_DRAW.plot(w, h, XMIN, XMAX, 0, ymax, { ml: 60, mb: 46, mt: 18 });
    var yt = niceTicks(ymax);
    MA_DRAW.axes(ctx, P2, { xticks: [], yticks: yt, xlabel: isI ? 'R（对数刻度）' : 'δ（对数刻度，向左趋向 0）' });
    // 对数刻度 x 轴标签
    var labels = isI ? ['1', '10', '10²', '10³', '10⁴', '10⁵', '10⁶'] : ['1', '10⁻¹', '10⁻²', '10⁻³', '10⁻⁴', '10⁻⁵', '10⁻⁶', '10⁻⁷', '10⁻⁸'];
    ctx.fillStyle = '#8a93a3';
    ctx.font = '12px "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    for (var t = 0; t <= (isI ? 6 : 8); t++) {
      ctx.fillText(labels[t], P2.X(t), P2.Y(0) + 8);
    }
    // 渐近线（若收敛）
    if (lim !== null && lim < ymax) {
      ctx.strokeStyle = '#2e7d32'; ctx.lineWidth = 1.6; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(P2.X(XMIN), P2.Y(lim)); ctx.lineTo(P2.X(XMAX), P2.Y(lim)); ctx.stroke();
      ctx.setLineDash([]);
      MA_DRAW.text(ctx, P2.X(XMAX) - 4, P2.Y(lim) - 8, '极限值 ' + lim.toFixed(3), { color: '#2e7d32', align: 'right', size: 12 });
    }
    // 曲线 A(R)/A(δ)
    ctx.save(); ctx.strokeStyle = '#2b4a9b'; ctx.lineWidth = 2.4; ctx.beginPath();
    for (var j = 0; j <= N; j++) {
      var lg2 = XMIN + (XMAX - XMIN) * j / N;
      var R2 = Math.pow(10, lg2);
      var A2 = isI ? areaI(p, R2) : areaII(p, R2);
      if (!isFinite(A2) || A2 > ymax) continue;
      var sx = P2.X(lg2), sy = P2.Y(Math.max(0, A2));
      if (j === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke(); ctx.restore();
    // 当前点
    var curLog = S.log;
    var curVal = isI ? areaI(p, Math.pow(10, curLog)) : areaII(p, Math.pow(10, -curLog));
    var cxp = P2.X(curLog), cyp = P2.Y(Math.min(curVal, ymax));
    MA_DRAW.dot(ctx, cxp, cyp, 5, '#c0392b');
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.4; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(cxp, P2.Y(0)); ctx.lineTo(cxp, cyp); ctx.stroke();
    ctx.setLineDash([]);
    var tag = isI ? ('R=10^' + curLog.toFixed(1)) : ('δ=10^(' + (-curLog).toFixed(1) + ')');
    MA_DRAW.text(ctx, cxp, P2.Y(0) + 24, tag, { color: '#c0392b', align: 'center', size: 12 });
    MA_DRAW.text(ctx, P2.X(XMIN) + 8, P2.Y(ymax) - 8, (isI ? 'A(R)=∫₁^R x^(−p) dx' : 'A(δ)=∫_δ¹ x^(−p) dx'), { color: '#2b4a9b', size: 13 });
  },
  status: function (S) {
    var p = S.p, isI = S.type === 'I';
    var curVal = isI ? areaI(p, Math.pow(10, S.log)) : areaII(p, Math.pow(10, -S.log));
    var concl, lim;
    if (isI) {
      if (p > 1) { lim = 1 / (p - 1); concl = '收敛，∫₁^∞ x^(−p) dx = 1/(p−1) = ' + lim.toFixed(4); }
      else if (p === 1) concl = '发散（∫₁^R dx/x = ln R → +∞，对数发散）';
      else concl = '发散（A(R) 随 R 无限增长）';
    } else {
      if (p < 1) { lim = 1 / (1 - p); concl = '收敛，∫₀¹ x^(−p) dx = 1/(1−p) = ' + lim.toFixed(4); }
      else if (p === 1) concl = '发散（∫_δ¹ dx/x = −ln δ → +∞）';
      else concl = '发散（A(δ) 随 δ→0⁺ 无限增长）';
    }
    return 'p=' + p.toFixed(2) + '：' + (isI ? '当前 A(R)=' : '当前 A(δ)=') +
      (isFinite(curVal) ? curVal.toFixed(4) : '∞') + '。判定：' + concl + '。记法：p=1 是临界点。';
  }
});

function areaI(p, R) {
  if (Math.abs(p - 1) < 1e-9) return Math.log(R);
  return (Math.pow(R, 1 - p) - 1) / (1 - p);
}
function areaII(p, d) {
  if (Math.abs(p - 1) < 1e-9) return -Math.log(d);
  return (1 - Math.pow(d, 1 - p)) / (1 - p);
}
function niceTicks(maxv) {
  if (maxv <= 1.2) return [0, 0.25, 0.5, 0.75, 1];
  if (maxv <= 3) return [0, 1, 2, 3];
  if (maxv <= 6) return [0, 1, 2, 3, 4, 5, 6];
  if (maxv <= 12) return [0, 2, 4, 6, 8, 10, 12];
  if (maxv <= 30) return [0, 5, 10, 15, 20, 25, 30];
  if (maxv <= 70) return [0, 10, 20, 30, 40, 50, 60, 70];
  if (maxv <= 150) return [0, 25, 50, 75, 100, 125, 150];
  if (maxv <= 400) return [0, 50, 100, 150, 200, 250, 300, 350, 400];
  return [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
}

/* ============ 演示 10：数项级数 = 部分和的极限（第十二章） ============ */
MA_DEMOS.register('series', {
  title: '级数“和”到底是什么？——部分和数列的极限',
  height: 380,
  controls: [
    { key: 'preset', label: '级数', type: 'select', val: 'geo2', options: [
      { v: 'geo2', t: 'Σ (1/2)ⁿ  （收敛于 1）' },
      { v: 'geo3', t: 'Σ (1/3)ⁿ  （收敛于 1/2）' },
      { v: 'pinv2', t: 'Σ 1/n²  （收敛于 π²/6）' },
      { v: 'harm', t: 'Σ 1/n  （调和级数，发散）' },
      { v: 'alt', t: 'Σ (−1)ⁿ⁺¹/n （收敛于 ln 2）' }
    ] },
    { key: 'N', label: '部分和项数 N', type: 'range', min: 1, max: 200, step: 1, val: 20, fmt: function (v) { return v; } }
  ],
  draw: function (ctx, w, h, S) {
    var PRES = {
      geo2: { fn: function (n) { return Math.pow(0.5, n); }, L: 1, ymin: -0.15, ymax: 1.35, yt: [0, 0.25, 0.5, 0.75, 1, 1.25], name: 'Σ(1/2)ⁿ' },
      geo3: { fn: function (n) { return Math.pow(1 / 3, n); }, L: 0.5, ymin: -0.15, ymax: 0.75, yt: [0, 0.25, 0.5, 0.75], name: 'Σ(1/3)ⁿ' },
      pinv2: { fn: function (n) { return 1 / (n * n); }, L: Math.PI * Math.PI / 6, ymin: -0.1, ymax: 1.8, yt: [0, 0.5, 1, 1.5], name: 'Σ1/n²' },
      harm: { fn: function (n) { return 1 / n; }, L: null, ymin: -0.3, ymax: 6.6, yt: [0, 1, 2, 3, 4, 5, 6], name: 'Σ1/n（调和）' },
      alt: { fn: function (n) { return (n % 2 === 1 ? 1 : -1) / n; }, L: Math.LN2, ymin: -0.2, ymax: 0.9, yt: [0, 0.25, 0.5, 0.75], name: 'Σ(−1)ⁿ⁺¹/n' }
    };
    var p = PRES[S.preset];
    var P = MA_DRAW.plot(w, h, 0, 200, p.ymin, p.ymax, { ml: 58, mb: 44 });
    MA_DRAW.axes(ctx, P, { xticks: [50, 100, 150, 200], yticks: p.yt, xlabel: 'n', ylabel: 'Sₙ' });
    if (p.L !== null) {
      ctx.strokeStyle = '#2e7d32'; ctx.lineWidth = 1.6; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(P.X(0), P.Y(p.L)); ctx.lineTo(P.X(200), P.Y(p.L)); ctx.stroke();
      ctx.setLineDash([]);
      MA_DRAW.text(ctx, P.X(198), P.Y(p.L) - 8, '和 = ' + (p.L === Math.PI * Math.PI / 6 ? 'π²/6' : p.L.toFixed(3)), { color: '#2e7d32', align: 'right', size: 12.5 });
    }
    // 部分和折线/点
    var pts = [], s = 0;
    ctx.fillStyle = '#2b4a9b';
    for (var n = 1; n <= 200; n++) {
      s += p.fn(n);
      pts.push([P.X(n), P.Y(s)]);
      if (n <= 60) MA_DRAW.dot(ctx, P.X(n), P.Y(s), 1.7, n <= S.N ? '#2b4a9b' : '#c7cdd8');
    }
    // 到 N 的粗线
    var s2 = 0, start = null;
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2.2;
    ctx.beginPath();
    for (var m = 1; m <= S.N; m++) {
      s2 += p.fn(m);
      if (!start) { ctx.moveTo(P.X(m), P.Y(s2)); start = true; }
      else ctx.lineTo(P.X(m), P.Y(s2));
    }
    ctx.stroke();
    MA_DRAW.dot(ctx, P.X(S.N), P.Y(s2), 5, '#c0392b');
    MA_DRAW.text(ctx, P.X(S.N), P.Y(s2) + 14, 'S_' + S.N, { color: '#c0392b', align: 'center', size: 12.5 });
    MA_DRAW.text(ctx, P.X(6), P.Y(p.ymax) - 8, p.name, { color: '#2b4a9b', size: 13.5 });
  },
  status: function (S) {
    var PRES = {
      geo2: { fn: function (n) { return Math.pow(0.5, n); }, L: 1, note: '公比 |q|<1 的几何级数收敛于 a/(1−q)' },
      geo3: { fn: function (n) { return Math.pow(1 / 3, n); }, L: 0.5, note: '公比 |q|<1 的几何级数收敛' },
      pinv2: { fn: function (n) { return 1 / (n * n); }, L: Math.PI * Math.PI / 6, note: 'p=2>1 的 p-级数收敛（欧拉：和=π²/6）' },
      harm: { fn: function (n) { return 1 / n; }, L: null, note: '虽然 aₙ→0，但调和级数发散（p=1 临界）' },
      alt: { fn: function (n) { return (n % 2 === 1 ? 1 : -1) / n; }, L: Math.LN2, note: '莱布尼茨判别法：交错调和级数收敛于 ln2' }
    };
    var p = PRES[S.preset];
    var s = 0;
    for (var n = 1; n <= S.N; n++) s += p.fn(n);
    var tail = '';
    if (p.L !== null) tail = '，与和之差 |S_N−S|=' + Math.abs(s - p.L).toExponential(3);
    return 'S_' + S.N + ' = ' + s.toFixed(6) + tail + '。' + p.note + '。关键：级数收敛 ⇔ 部分和数列 {Sₙ} 收敛。';
  }
});

/* ============ 演示 11：函数列的一致收敛 vs 逐点收敛（第十三章） ============ */
MA_DEMOS.register('uniform', {
  title: '一致收敛 vs 逐点收敛：曲线列的整体逼近',
  height: 400,
  controls: [
    { key: 'preset', label: '函数列', type: 'select', val: 'pow', options: [
      { v: 'pow', t: 'fₙ(x)=xⁿ，x∈[0,1]（不一致收敛）' },
      { v: 'frac', t: 'fₙ(x)=x/(1+nx)，x∈[0,1]（一致收敛）' },
      { v: 'osc', t: 'fₙ(x)=sin(nx)/n，x∈[0,1]（一致收敛）' }
    ] },
    { key: 'n', label: 'n', type: 'range', min: 1, max: 200, step: 1, val: 10, fmt: function (v) { return v; } },
    { key: 'eps', label: 'ε 带', type: 'range', min: 0.02, max: 0.4, step: 0.01, val: 0.1, fmt: function (v) { return v.toFixed(2); } }
  ],
  draw: function (ctx, w, h, S) {
    var PRES = {
      pow: { fn: function (x, n) { return Math.pow(x, n); }, ymin: -0.22, ymax: 1.25, yt: [0, 0.25, 0.5, 0.75, 1], label: 'fₙ(x)=xⁿ' },
      frac: { fn: function (x, n) { return x / (1 + n * x); }, ymin: -0.15, ymax: 0.7, yt: [0, 0.2, 0.4, 0.6], label: 'fₙ(x)=x/(1+nx)' },
      osc: { fn: function (x, n) { return Math.sin(n * x) / n; }, ymin: -0.4, ymax: 0.4, yt: [-0.4, -0.2, 0, 0.2, 0.4], label: 'fₙ(x)=sin(nx)/n' }
    };
    var p = PRES[S.preset];
    var n = S.n, eps = S.eps;
    var P = MA_DRAW.plot(w, h, 0, 1, p.ymin, p.ymax, { ml: 60, mb: 44 });
    MA_DRAW.axes(ctx, P, { xticks: [0, 0.25, 0.5, 0.75, 1], yticks: p.yt, xlabel: 'x', ylabel: 'y' });
    // ε 带（极限函数 y=0）
    ctx.fillStyle = 'rgba(46,125,50,.12)';
    ctx.fillRect(P.X(0), P.Y(eps), P.X(1) - P.X(0), P.Y(-eps) - P.Y(eps));
    ctx.strokeStyle = '#2e7d32'; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(P.X(0), P.Y(eps)); ctx.lineTo(P.X(1), P.Y(eps));
    ctx.moveTo(P.X(0), P.Y(-eps)); ctx.lineTo(P.X(1), P.Y(-eps));
    ctx.stroke(); ctx.setLineDash([]);
    MA_DRAW.text(ctx, P.X(1) - 4, P.Y(eps) - 7, 'ε', { color: '#2e7d32', align: 'right', size: 12 });
    // 几条较早曲线（浅灰）
    var olds = [2, 3, 5, 8];
    olds.forEach(function (m) {
      if (m >= n) return;
      MA_DRAW.curve(ctx, P, function (x) { return p.fn(x, m); }, 0, 1, { color: 'rgba(140,150,170,.6)', width: 1.6 });
    });
    // 当前曲线分段着色：带内绿 / 带外红
    ctx.save(); ctx.lineWidth = 3.2; ctx.lineJoin = 'round';
    var m2 = 700;
    for (var i = 0; i < m2; i++) {
      var xa = i / m2, xb = (i + 1) / m2;
      var ya = p.fn(xa, n), yb = p.fn(xb, n);
      ctx.strokeStyle = (Math.abs(ya) < eps && Math.abs(yb) < eps) ? '#2e7d32' : '#c0392b';
      ctx.beginPath(); ctx.moveTo(P.X(xa), P.Y(ya)); ctx.lineTo(P.X(xb), P.Y(yb)); ctx.stroke();
    }
    ctx.restore();
    // 计算 d_n = sup|f_n - f|（对 pow：在 [0,1] 上取到 1；这里数值近似）
    var dmax = 0;
    var best = 0;
    for (var j = 0; j <= 4000; j++) {
      var xv = j / 4000;
      var dv = Math.abs(p.fn(xv, n));
      if (dv > dmax) { dmax = dv; best = xv; }
    }
    MA_DRAW.dot(ctx, P.X(best), P.Y(p.fn(best, n)), 5, '#7a4fbf');
    MA_DRAW.text(ctx, P.X(best) + 6, P.Y(p.fn(best, n)) - 8, '最大偏差处', { color: '#7a4fbf', size: 12 });
    MA_DRAW.text(ctx, P.X(0.02), P.Y(p.ymax) - 8, p.label + '，n=' + n, { color: '#2b4a9b', size: 13.5 });
    MA_DRAW.text(ctx, P.X(0.02), P.Y(p.ymax) - 26, 'dₙ = sup|fₙ−f| ≈ ' + dmax.toFixed(4), { color: '#7a4fbf', size: 13 });
  },
  status: function (S) {
    var PRES = {
      pow: { fn: function (x, n) { return Math.pow(x, n); }, concl: '不一致收敛：在 x=1 处每项都等于 1，无论 n 多大，曲线“右端”都翘在 ε 带外；极限函数在 x=1 处为 1，不连续' },
      frac: { fn: function (x, n) { return x / (1 + n * x); }, concl: '一致收敛：dₙ=1/(1+n)→0，整条曲线（含 x=1）最终全部进入 ε 带' },
      osc: { fn: function (x, n) { return Math.sin(n * x) / n; }, concl: '一致收敛：dₙ=1/n→0，振幅整体衰减' }
    };
    var p = PRES[S.preset];
    var n = S.n;
    var dmax = 0;
    for (var j = 0; j <= 4000; j++) {
      var dv = Math.abs(p.fn(j / 4000, n));
      if (dv > dmax) dmax = dv;
    }
    return 'n=' + n + '：dₙ=sup_{[0,1]}|fₙ−f| ≈ ' + dmax.toFixed(4) +
      '（紫色点标出最大偏差位置）。' + (dmax < S.eps ? '此时 dₙ<ε，整条曲线已进入带内。' : '此时仍有红色部分在 ε 带外。') +
      ' 结论：' + p.concl + '。判定法：一致收敛 ⇔ dₙ→0。';
  }
});

/* ============ 演示 12：泰勒多项式逼近（第十四章） ============ */
MA_DEMOS.register('taylor', {
  title: '泰勒展开：用多项式“拼”出复杂函数',
  height: 400,
  controls: [
    { key: 'preset', label: '函数', type: 'select', val: 'exp', options: [
      { v: 'exp', t: 'f(x)=eˣ，展开点 0' },
      { v: 'sin', t: 'f(x)=sin x，展开点 0' },
      { v: 'ln', t: 'f(x)=ln(1+x)，展开点 0' },
      { v: 'geo', t: 'f(x)=1/(1−x)，展开点 0' }
    ] },
    { key: 'n', label: '阶数 n', type: 'range', min: 0, max: 14, step: 1, val: 4, fmt: function (v) { return v; } }
  ],
  draw: function (ctx, w, h, S) {
    var PRES = {
      exp: { f: function (x) { return Math.exp(x); }, T: taylorExp, xmin: -2.8, xmax: 2.8, ymin: -4, ymax: 14, xt: [-2, -1, 0, 1, 2], yt: [0, 2, 4, 6, 8, 10, 12], name: 'f(x)=eˣ' },
      sin: { f: function (x) { return Math.sin(x); }, T: taylorSin, xmin: -7.2, xmax: 7.2, ymin: -1.6, ymax: 1.6, xt: [-6, -4, -2, 0, 2, 4, 6], yt: [-1, -0.5, 0, 0.5, 1], name: 'f(x)=sin x' },
      ln: { f: function (x) { return Math.log(1 + x); }, T: taylorLn, xmin: -0.92, xmax: 2.4, ymin: -4.6, ymax: 1.6, xt: [-0.5, 0, 0.5, 1, 1.5, 2], yt: [-4, -3, -2, -1, 0, 1], name: 'f(x)=ln(1+x)' },
      geo: { f: function (x) { return 1 / (1 - x); }, T: taylorGeo, xmin: -0.92, xmax: 0.92, ymin: -3.5, ymax: 9, xt: [-0.5, 0, 0.5], yt: [0, 2, 4, 6, 8], name: 'f(x)=1/(1−x)' }
    };
    var p = PRES[S.preset];
    var n = S.n;
    var P = MA_DRAW.plot(w, h, p.xmin, p.xmax, p.ymin, p.ymax, { ml: 60, mb: 44 });
    MA_DRAW.axes(ctx, P, { xticks: p.xt, yticks: p.yt, xlabel: 'x', ylabel: 'y' });
    MA_DRAW.curve(ctx, P, p.f, p.xmin, p.xmax, { color: '#2b4a9b', width: 2.6 });
    MA_DRAW.curve(ctx, P, function (x) { return p.T(x, n); }, p.xmin, p.xmax, { color: '#c0392b', width: 2.2, dash: [7, 4] });
    // 展开点
    MA_DRAW.dot(ctx, P.X(0), P.Y(p.f(0)), 5, '#e8871e');
    MA_DRAW.text(ctx, P.X(0) + 8, P.Y(p.f(0)) - 10, 'x₀=0', { color: '#e8871e', size: 12.5 });
    MA_DRAW.text(ctx, P.X(p.xmin) + 8, P.Y(p.ymax) - 10, p.name + '（蓝）与 n 阶泰勒多项式 Tₙ（红虚）', { color: '#5b6472', size: 13 });
    // 误差标注（x=1 处参考）
    if (p === PRES.exp || p === PRES.sin) {
      var err = Math.abs(p.f(1) - p.T(1, n));
      MA_DRAW.text(ctx, P.X(p.xmin) + 8, P.Y(p.ymax) - 28, '在 x=1 处 |f−Tₙ|=' + err.toExponential(2), { color: '#c0392b', size: 12.5 });
    }
  },
  status: function (S) {
    var INFO = {
      exp: { s: 'eˣ = Σ xᵏ/k!', r: '收敛半径 R=+∞；n 越大，在更大范围内逼近越好' },
      sin: { s: 'sin x = Σ (−1)ᵏ·x^(2k+1)/(2k+1)!', r: '收敛半径 R=+∞' },
      ln: { s: 'ln(1+x) = Σ (−1)^(k−1)·xᵏ/k', r: '收敛半径 R=1，端点 x=1 收敛（ln2）' },
      geo: { s: '1/(1−x) = Σ xᵏ', r: '收敛半径 R=1，|x|<1 内收敛；端点发散' }
    };
    var info = INFO[S.preset];
    return 'Tₙ 为 ' + info.s + ' 的 n=' + S.n + ' 阶部分和。' + info.r +
      '。观察：阶数越高，红色虚线在 0 附近越“贴住”蓝色曲线；但在收敛半径之外会急剧偏离（如 1/(1−x) 在 |x|≥1）。';
  }
});
function taylorExp(x, n) {
  var s = 1, term = 1;
  for (var k = 1; k <= n; k++) { term *= x / k; s += term; }
  return s;
}
function taylorSin(x, n) {
  // 取不超过 n 的最大奇数阶 2m+1
  var m = Math.floor((n - 1) / 2);
  var s = 0, term = x;
  for (var k = 0; k <= m; k++) {
    s += (k % 2 === 0 ? 1 : -1) * term;
    term *= x * x / ((2 * k + 2) * (2 * k + 3));
  }
  return s;
}
function taylorLn(x, n) {
  var s = 0, term = x;
  for (var k = 1; k <= n; k++) {
    s += (k % 2 === 1 ? 1 : -1) * term / k;
    term *= x;
  }
  return s;
}
function taylorGeo(x, n) {
  var s = 0, term = 1;
  for (var k = 0; k <= n; k++) { s += term; term *= x; }
  return s;
}

/* ============ 演示 13：傅里叶级数（第十五章） ============ */
MA_DEMOS.register('fourier', {
  title: '傅里叶级数：用三角波“拼接”方波（含吉布斯现象）',
  height: 400,
  controls: [
    { key: 'N', label: '部分和项数 N', type: 'range', min: 1, max: 60, step: 1, val: 6, fmt: function (v) { return v; } }
  ],
  draw: function (ctx, w, h, S) {
    var N = S.N;
    var xmin = -7.4, xmax = 7.4;
    var P = MA_DRAW.plot(w, h, xmin, xmax, -1.55, 1.55, { ml: 60, mb: 44 });
    MA_DRAW.axes(ctx, P, { xticks: [-2 * Math.PI, -Math.PI, 0, Math.PI, 2 * Math.PI], yticks: [-1, -0.5, 0, 0.5, 1], xlabel: 'x', ylabel: 'y', fmtX: function (v) {
      var m = Math.round(v / Math.PI * 2) / 2;
      if (m === 2) return '2π'; if (m === 1) return 'π'; if (m === -1) return '−π'; if (m === -2) return '−2π';
      return v;
    } });
    // 方波
    ctx.save(); ctx.lineWidth = 2; ctx.strokeStyle = '#2b4a9b';
    ctx.beginPath();
    var n2 = 2000;
    for (var i = 0; i <= n2; i++) {
      var x = xmin + (xmax - xmin) * i / n2;
      var r = ((x + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
      var y = r > 0 ? 1 : (r < 0 ? -1 : 0);
      if (i === 0) ctx.moveTo(P.X(x), P.Y(y)); else ctx.lineTo(P.X(x), P.Y(y));
    }
    ctx.stroke(); ctx.restore();
    // 傅里叶部分和
    ctx.save(); ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2.2;
    ctx.beginPath();
    for (var j = 0; j <= n2; j++) {
      var x2 = xmin + (xmax - xmin) * j / n2;
      var s = 0;
      for (var k = 1; k <= N; k++) s += Math.sin((2 * k - 1) * x2) / (2 * k - 1);
      var y2 = 4 / Math.PI * s;
      if (j === 0) ctx.moveTo(P.X(x2), P.Y(y2)); else ctx.lineTo(P.X(x2), P.Y(y2));
    }
    ctx.stroke(); ctx.restore();
    // 吉布斯上冲线
    var g = 1.17898;
    ctx.strokeStyle = 'rgba(192,57,43,.4)'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(P.X(xmin), P.Y(g)); ctx.lineTo(P.X(xmax), P.Y(g));
    ctx.moveTo(P.X(xmin), P.Y(-g)); ctx.lineTo(P.X(xmax), P.Y(-g));
    ctx.stroke(); ctx.setLineDash([]);
    MA_DRAW.text(ctx, P.X(xmax) - 6, P.Y(g) - 7, '吉布斯上冲 ≈1.179', { color: 'rgba(192,57,43,.9)', align: 'right', size: 12 });
    MA_DRAW.text(ctx, P.X(xmin) + 8, P.Y(1.45), '方波 f(x)：周期 2π，f=1（0<x<π），f=−1（−π<x<0）', { color: '#2b4a9b', size: 13 });
    MA_DRAW.text(ctx, P.X(xmin) + 8, P.Y(1.45) - 20, '红色：部分和 S_N(x)=(4/π)Σ sin((2k−1)x)/(2k−1)，N=' + N, { color: '#c0392b', size: 13 });
  },
  status: function (S) {
    var N = S.N;
    return 'N=' + N + '：红色部分和在连续点处逼近方波；在间断点 x=kπ 处，傅里叶级数收敛到左右极限的平均值 (1+(−1))/2=0（蓝线跳变中点）。' +
      '注意间断点附近出现过冲（吉布斯现象），上冲幅度约为函数跳变的 8.9%，且 N→∞ 也不消失。';
  }
});
