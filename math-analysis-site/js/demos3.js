/* =========================================================
 * 演示 14-19：多元函数部分（等值线、梯度、切平面、隐函数、曲线积分、二重积分切片）
 * ========================================================= */

/* ---------- 等值线绘制（marching squares） ---------- */
function contourMap(w, h, xmin, xmax, ymin, ymax, pad) {
  pad = pad || 16;
  var W = w - 2 * pad, H = h - 2 * pad;
  return {
    xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax, pad: pad, W: W, H: H,
    X: function (x) { return pad + (x - xmin) / (xmax - xmin) * W; },
    Y: function (y) { return pad + H - (y - ymin) / (ymax - ymin) * H; },
    invX: function (px) { return xmin + (px - pad) / W * (xmax - xmin); },
    invY: function (py) { return ymin + (pad + H - py) / H * (ymax - ymin); }
  };
}
function drawContours(ctx, map, f, levels, color) {
  var gx = 110, gy = 110;
  var vals = [];
  var i, j;
  for (i = 0; i <= gx; i++) {
    for (j = 0; j <= gy; j++) {
      var x = map.xmin + (map.xmax - map.xmin) * i / gx;
      var y = map.ymin + (map.ymax - map.ymin) * j / gy;
      vals[i * (gy + 1) + j] = f(x, y);
    }
  }
  var edgePts = function (x0, y0, x1, y1, L) {
    var v0 = f(x0, y0), v1 = f(x1, y1);
    if ((v0 - L) * (v1 - L) >= 0) return null;
    var t = (L - v0) / (v1 - v0);
    var cx = x0 + (x1 - x0) * t, cy = y0 + (y1 - y0) * t;
    return [map.X(cx), map.Y(cy)];
  };
  ctx.save();
  ctx.lineWidth = 1.6;
  levels.forEach(function (L, li) {
    ctx.strokeStyle = (typeof color === 'function') ? color(L, li) : (color || '#6a55c9');
    ctx.beginPath();
    for (i = 0; i < gx; i++) {
      for (j = 0; j < gy; j++) {
        var x0 = map.xmin + (map.xmax - map.xmin) * i / gx, x1 = map.xmin + (map.xmax - map.xmin) * (i + 1) / gx;
        var y0 = map.ymin + (map.ymax - map.ymin) * j / gy, y1 = map.ymin + (map.ymax - map.ymin) * (j + 1) / gy;
        var v00 = vals[i * (gy + 1) + j], v10 = vals[(i + 1) * (gy + 1) + j];
        var v11 = vals[(i + 1) * (gy + 1) + (j + 1)], v01 = vals[i * (gy + 1) + (j + 1)];
        var n = ((v00 > L) ? 1 : 0) | ((v10 > L) ? 2 : 0) | ((v11 > L) ? 4 : 0) | ((v01 > L) ? 8 : 0);
        if (n === 0 || n === 15) continue;
        var edges = [];
        var e;
        if (((n >> 0) & 1) !== ((n >> 1) & 1)) { e = edgePts(x0, y0, x1, y0, L); if (e) edges.push([0, e]); }
        if (((n >> 1) & 1) !== ((n >> 2) & 1)) { e = edgePts(x1, y0, x1, y1, L); if (e) edges.push([1, e]); }
        if (((n >> 2) & 1) !== ((n >> 3) & 1)) { e = edgePts(x1, y1, x0, y1, L); if (e) edges.push([2, e]); }
        if (((n >> 3) & 1) !== ((n >> 0) & 1)) { e = edgePts(x0, y1, x0, y0, L); if (e) edges.push([3, e]); }
        var segs = [];
        if (edges.length === 2) segs.push([edges[0][1], edges[1][1]]);
        else if (edges.length === 4) {
          var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
          var centerHigh = f(cx, cy) > L;
          if (centerHigh) segs.push([edges[0][1], edges[1][1]], [edges[2][1], edges[3][1]]);
          else segs.push([edges[0][1], edges[3][1]], [edges[1][1], edges[2][1]]);
        }
        segs.forEach(function (sg) {
          ctx.moveTo(sg[0][0], sg[0][1]);
          ctx.lineTo(sg[1][0], sg[1][1]);
        });
      }
    }
    ctx.stroke();
  });
  ctx.restore();
}
function numGrad(f, x, y) {
  var h = 1e-6;
  return [(f(x + h, y) - f(x - h, y)) / (2 * h), (f(x, y + h) - f(x, y - h)) / (2 * h)];
}

/* ============ 演示 14：多元函数沿不同路径的极限（第十六章） ============ */
MA_DEMOS.register('pathlimit', {
  title: '二元函数极限：沿不同路径逼近，结果一致吗？',
  height: 440,
  controls: [
    { key: 'preset', label: '函数', type: 'select', val: 'a', options: [
      { v: 'a', t: 'f=xy/(x²+y²)（极限不存在）' },
      { v: 'b', t: 'f=(x²−y²)/(x²+y²)（极限不存在）' },
      { v: 'c', t: 'f=x²y/(x²+y²)（极限存在 = 0）' }
    ] },
    { key: 'th', label: '方向 θ°', type: 'range', min: 0, max: 360, step: 1, val: 45, fmt: function (v) { return v; } },
    { key: 'logt', label: '距离指数', type: 'range', min: -3, max: 0, step: 0.05, val: -0.6, fmt: function (v) { return v.toFixed(1); } }
  ],
  draw: function (ctx, w, h, S) {
    var PRES = {
      a: { f: function (x, y) { var d = x * x + y * y; return d === 0 ? 0 : x * y / d; }, label: 'xy/(x²+y²)' },
      b: { f: function (x, y) { var d = x * x + y * y; return d === 0 ? 0 : (x * x - y * y) / d; }, label: '(x²−y²)/(x²+y²)' },
      c: { f: function (x, y) { var d = x * x + y * y; return d === 0 ? 0 : x * x * y / d; }, label: 'x²y/(x²+y²)' }
    };
    var p = PRES[S.preset];
    var L = 2.3, pad = 46;
    var map = contourMap(w, h, -L, L, -L, L, pad);
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    // 值域求等值线
    var fmin = 1e9, fmax = -1e9;
    var gs = 60;
    for (var i = 0; i <= gs; i++) for (var j = 0; j <= gs; j++) {
      var v = p.f(-L + 2 * L * i / gs, -L + 2 * L * j / gs);
      if (v < fmin) fmin = v; if (v > fmax) fmax = v;
    }
    var levels = [];
    var k;
    for (k = 0; k <= 8; k++) levels.push(fmin + (fmax - fmin) * k / 8);
    if (fmin < 0 && fmax > 0) levels.push(0);
    drawContours(ctx, map, p.f, levels, 'rgba(90,85,201,.55)');
    // 坐标轴
    ctx.strokeStyle = '#9aa2b0'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(map.X(0), map.Y(-L)); ctx.lineTo(map.X(0), map.Y(L));
    ctx.moveTo(map.X(-L), map.Y(0)); ctx.lineTo(map.X(L), map.Y(0)); ctx.stroke();
    // 方框
    ctx.strokeStyle = '#cfd4e0';
    ctx.strokeRect(map.X(-L), map.Y(L), map.X(L) - map.X(-L), map.Y(-L) - map.Y(L));
    ctx.fillStyle = '#8a93a3'; ctx.font = '12px "Segoe UI","PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText('x', map.X(L) - 8, map.Y(0) + 8);
    ctx.fillText('y', map.X(0) + 8, map.Y(-L) + 6);
    // 逼近射线（双向淡线）
    var th = S.th * Math.PI / 180;
    var ux = Math.cos(th), uy = Math.sin(th);
    ctx.strokeStyle = 'rgba(192,57,43,.25)'; ctx.lineWidth = 1.4; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(map.X(-L * ux), map.Y(-L * uy)); ctx.lineTo(map.X(L * ux), map.Y(L * uy)); ctx.stroke();
    ctx.setLineDash([]);
    // 动点：沿射线向原点移动
    var t = Math.pow(10, S.logt);
    var px = t * ux, py = t * uy;
    var val = p.f(px, py);
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(map.X(0), map.Y(0)); ctx.lineTo(map.X(px), map.Y(py)); ctx.stroke();
    MA_DRAW.dot(ctx, map.X(px), map.Y(py), 6, '#c0392b');
    MA_DRAW.dot(ctx, map.X(0), map.Y(0), 3.5, '#333');
    MA_DRAW.text(ctx, map.X(px) + 9, map.Y(py) - 8, 'P(t cosθ, t sinθ)', { color: '#c0392b', size: 12 });
    // 值标签
    var boxY = h - 26;
    ctx.fillStyle = 'rgba(255,255,255,.85)';
    ctx.fillRect(4, boxY - 14, w - 8, 24);
    ctx.fillStyle = '#333';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.font = '14px "Segoe UI","PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('t=' + t.toExponential(1) + '，f(P)=' + val.toFixed(4), 10, boxY);
    // 图例文字
    MA_DRAW.text(ctx, map.X(-L) + 8, map.Y(-L) + 16, p.label, { color: '#6a55c9', size: 13 });
    MA_DRAW.text(ctx, map.X(-L) + 8, map.Y(-L) + 34, '（等值线；红色射线为逼近路径）', { color: '#8a93a3', size: 12 });
  },
  status: function (S) {
    var PRES = {
      a: { f: function (x, y) { var d = x * x + y * y; return d === 0 ? 0 : x * y / d; }, label: 'xy/(x²+y²)' },
      b: { f: function (x, y) { var d = x * x + y * y; return d === 0 ? 0 : (x * x - y * y) / d; }, label: '(x²−y²)/(x²+y²)' },
      c: { f: function (x, y) { var d = x * x + y * y; return d === 0 ? 0 : x * x * y / d; }, label: 'x²y/(x²+y²)' }
    };
    var p = PRES[S.preset];
    var th = S.th * Math.PI / 180;
    var val = p.f(Math.cos(th), Math.sin(th)); // 沿单位方向（径向）的“方向极限”
    var th2 = (S.th + 90) * Math.PI / 180;
    var val2 = p.f(Math.cos(th2), Math.sin(th2));
    if (S.preset === 'c') {
      return '沿任何射线（方向）逼近原点，f 都趋于 0，且可验证沿任意曲线也趋于 0，故二重极限存在且等于 0（与路径无关）。';
    }
    return '沿 θ=' + S.th + '° 的方向逼近原点，值趋于 ' + val.toFixed(3) + '；沿 θ=' + ((S.th + 90) % 360) + '° 则趋于 ' + val2.toFixed(3) +
      '。不同路径得到不同极限 ⇒ 二重极限 lim_{ (x,y)→(0,0) } f 不存在！（可把 θ 从 0° 转到 360° 观察红色射线扫过等值线）';
  }
});

/* ============ 演示 15：方向导数与梯度（第十七章） ============ */
MA_DEMOS.register('grad', {
  title: '梯度：等高线上“最陡上升”的方向',
  height: 460,
  controls: [
    { key: 'preset', label: '函数', type: 'select', val: 'ell', options: [
      { v: 'ell', t: 'f=x²+2y²' },
      { v: 'par', t: 'f=x²+y²' },
      { v: 'sad', t: 'f=x²−y²' }
    ] },
    { key: 'x0', label: 'x₀', type: 'range', min: -1.9, max: 1.9, step: 0.01, val: 1.1, fmt: function (v) { return v.toFixed(2); } },
    { key: 'y0', label: 'y₀', type: 'range', min: -1.9, max: 1.9, step: 0.01, val: 0.6, fmt: function (v) { return v.toFixed(2); } },
    { key: 'th', label: '方向 θ°', type: 'range', min: 0, max: 360, step: 1, val: 20, fmt: function (v) { return v; } }
  ],
  onPreset: function (entry) {
    if (entry._gradBound) return;
    entry._gradBound = true;
    entry.canvas.style.cursor = 'crosshair';
    entry.canvas.addEventListener('click', function (ev) {
      var rect = entry.canvas.getBoundingClientRect();
      var cssW = entry.canvas.width / (window.devicePixelRatio || 1);
      var px = (ev.clientX - rect.left) / rect.width * cssW;
      var py = (ev.clientY - rect.top) / rect.height * entry.H;
      var L = 2.35, pad = 40;
      var map = contourMap(cssW, entry.H, -L, L, -L, L, pad);
      var x = Math.max(-1.9, Math.min(1.9, map.invX(px)));
      var y = Math.max(-1.9, Math.min(1.9, map.invY(py)));
      entry.setRange('x0', { min: -1.9, max: 1.9, val: x });
      entry.setRange('y0', { min: -1.9, max: 1.9, val: y });
      MA_DEMOS.redrawAll();
    });
  },
  draw: function (ctx, w, h, S) {
    var PRES = {
      ell: { f: function (x, y) { return x * x + 2 * y * y; }, label: 'f=x²+2y²' },
      par: { f: function (x, y) { return x * x + y * y; }, label: 'f=x²+y²' },
      sad: { f: function (x, y) { return x * x - y * y; }, label: 'f=x²−y²' }
    };
    var p = PRES[S.preset];
    var L = 2.35, pad = 40;
    var map = contourMap(w, h, -L, L, -L, L, pad);
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    var gs = 70, fmin = 1e9, fmax = -1e9, i, j;
    for (i = 0; i <= gs; i++) for (j = 0; j <= gs; j++) {
      var v = p.f(-L + 2 * L * i / gs, -L + 2 * L * j / gs);
      if (v < fmin) fmin = v; if (v > fmax) fmax = v;
    }
    var levels = [];
    for (var k = 0; k <= 9; k++) levels.push(fmin + (fmax - fmin) * k / 9);
    if (fmin < 0 && fmax > 0) levels.push(0);
    drawContours(ctx, map, p.f, levels, function (lev) {
      return Math.abs(lev) < 1e-6 ? 'rgba(192,57,43,.8)' : 'rgba(90,85,201,.45)';
    });
    ctx.strokeStyle = '#9aa2b0'; ctx.lineWidth = 1.1;
    ctx.beginPath(); ctx.moveTo(map.X(0), map.Y(-L)); ctx.lineTo(map.X(0), map.Y(L));
    ctx.moveTo(map.X(-L), map.Y(0)); ctx.lineTo(map.X(L), map.Y(0)); ctx.stroke();
    ctx.strokeStyle = '#cfd4e0'; ctx.strokeRect(map.X(-L), map.Y(L), map.X(L) - map.X(-L), map.Y(-L) - map.Y(L));
    // 点 P
    var x0 = S.x0, y0 = S.y0;
    var g = numGrad(p.f, x0, y0);
    var gn = Math.sqrt(g[0] * g[0] + g[1] * g[1]);
    var Px = map.X(x0), Py = map.Y(y0);
    // 方向 u(θ)
    var th = S.th * Math.PI / 180;
    var du = g[0] * Math.cos(th) + g[1] * Math.sin(th);
    var uLen = 46;
    // 梯度箭头（单位方向×长度，尾端在 P）
    var gLen = Math.min(92, 26 + gn * 12);
    var gx = g[0] / (gn || 1), gy = g[1] / (gn || 1);
    arrow(ctx, Px, Py, Px + gx * gLen, Py - gy * gLen, '#c0392b', 2.6);
    // u 箭头
    arrow(ctx, Px, Py, Px + Math.cos(th) * uLen, Py - Math.sin(th) * uLen, '#2b4a9b', 2.2);
    MA_DRAW.dot(ctx, Px, Py, 5, '#333');
    MA_DRAW.text(ctx, Px + 8, Py - 10, 'P(' + x0.toFixed(1) + ',' + y0.toFixed(1) + ')', { color: '#333', size: 12.5 });
    // 说明文字
    MA_DRAW.text(ctx, map.X(-L) + 10, map.Y(-L) + 16, p.label + '　∇f = (' + g[0].toFixed(2) + ', ' + g[1].toFixed(2) + ')　|∇f|=' + gn.toFixed(2), { color: '#c0392b', size: 13 });
    MA_DRAW.text(ctx, map.X(-L) + 10, map.Y(-L) + 34, 'D_u f = ∇f·u = ' + du.toFixed(3) + (Math.abs(du - gn) < 0.02 ? '（≈|∇f|：方向 u 与梯度同向，增长最快）' : (Math.abs(du + gn) < 0.02 ? '（≈−|∇f|：与梯度反向，下降最快）' : (Math.abs(du) < 0.02 ? '（≈0：u 沿等高线方向，函数值不变）' : ''))), { color: '#2b4a9b', size: 12.5 });
  },
  status: function (S) {
    var PRES = { ell: function (x, y) { return x * x + 2 * y * y; }, par: function (x, y) { return x * x + y * y; }, sad: function (x, y) { return x * x - y * y; } };
    var g = numGrad(PRES[S.preset], S.x0, S.y0);
    var gn = Math.sqrt(g[0] * g[0] + g[1] * g[1]);
    var th = S.th * Math.PI / 180;
    var du = g[0] * Math.cos(th) + g[1] * Math.sin(th);
    return '∇f=(' + g[0].toFixed(3) + ', ' + g[1].toFixed(3) + ')，|∇f|=' + gn.toFixed(3) +
      '。梯度方向是函数增长最快的方向（红色箭头），且垂直于过该点的等高线；方向导数 D_u f=∇f·u=' + du.toFixed(3) +
      '。试试转动 θ：当 u 与 ∇f 同向时 D_u f 最大，反向时最小，垂直时等于 0。（可点击画布移动点 P）';
  }
});
function arrow(ctx, x0, y0, x1, y1, color, width) {
  ctx.save();
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width || 2;
  var dx = x1 - x0, dy = y1 - y0;
  var len = Math.sqrt(dx * dx + dy * dy) || 1;
  var ux = dx / len, uy = dy / len;
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
  var as = Math.min(11, len / 2.4);
  var bx = x1 - ux * as * 0.6, by = y1 - uy * as * 0.6;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(bx - uy * as * 0.55, by + ux * as * 0.55);
  ctx.moveTo(x1, y1);
  ctx.lineTo(bx + uy * as * 0.55, by - ux * as * 0.55);
  ctx.fill();
  ctx.restore();
}

/* ============ 演示 16：切平面 = 曲面的最佳线性逼近（第十七章） ============ */
MA_DEMOS.register('tangent3d', {
  title: '切平面：曲面在某点的“贴身”平面',
  height: 460,
  controls: [
    { key: 'preset', label: '曲面', type: 'select', val: 'par', options: [
      { v: 'par', t: 'z=x²+y²（椭圆抛物面）' },
      { v: 'sad', t: 'z=x²−y²（马鞍面）' }
    ] },
    { key: 'x0', label: 'x₀', type: 'range', min: -1.3, max: 1.3, step: 0.01, val: 0.7, fmt: function (v) { return v.toFixed(2); } },
    { key: 'y0', label: 'y₀', type: 'range', min: -1.3, max: 1.3, step: 0.01, val: 0.5, fmt: function (v) { return v.toFixed(2); } },
    { key: 'showPlane', label: '显示切平面', type: 'check', val: true }
  ],
  draw: function (ctx, w, h, S) {
    var PRES = {
      par: { f: function (x, y) { return x * x + y * y; }, fx: function (x) { return 2 * x; }, fy: function (y) { return 2 * y; }, label: 'z=x²+y²' },
      sad: { f: function (x, y) { return x * x - y * y; }, fx: function (x) { return 2 * x; }, fy: function (y) { return -2 * y; }, label: 'z=x²−y²' }
    };
    var p = PRES[S.preset];
    var R = 1.7, x0 = S.x0, y0 = S.y0;
    var f0 = p.f(x0, y0), fx0 = p.fx(x0), fy0 = p.fy(y0);
    var zplane = function (x, y) { return f0 + fx0 * (x - x0) + fy0 * (y - y0); };
    var raw = function (x, y, z) { return [(x - y) * 0.866, (x + y) * 0.5 - z * 0.62]; };
    // 收集所有原始点求包围盒
    var pts = [], i, j, k;
    var N = 14;
    for (i = 0; i <= N; i++) for (j = 0; j <= N; j++) {
      var xa = -R + 2 * R * i / N, ya = -R + 2 * R * j / N;
      pts.push(raw(xa, ya, p.f(xa, ya)));
      if (S.showPlane) pts.push(raw(xa, ya, zplane(xa, ya)));
    }
    var minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    pts.forEach(function (q) { minX = Math.min(minX, q[0]); maxX = Math.max(maxX, q[0]); minY = Math.min(minY, q[1]); maxY = Math.max(maxY, q[1]); });
    var pad = 42;
    var sc = Math.min((w - 2 * pad) / (maxX - minX), (h - 2 * pad) / (maxY - minY));
    var cx0 = (w) / 2, cy0 = (h) / 2 + 6;
    var mx = function (q) { return cx0 + (q[0] - (minX + maxX) / 2) * sc; };
    var my = function (q) { return cy0 + (q[1] - (minY + maxY) / 2) * sc; };
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    // 曲面网格线
    var step = 0.5, g;
    var drawSurf = function (color, width) {
      ctx.strokeStyle = color; ctx.lineWidth = width;
      var M = 26;
      for (var ix = 0; ix <= 14; ix++) {
        var xv = -R + 2 * R * ix / 14;
        ctx.beginPath();
        for (var i1 = 0; i1 <= M; i1++) {
          var yv = -R + 2 * R * i1 / M;
          var q = raw(xv, yv, p.f(xv, yv));
          if (i1 === 0) ctx.moveTo(mx(q), my(q)); else ctx.lineTo(mx(q), my(q));
        }
        ctx.stroke();
      }
      for (var iy = 0; iy <= 14; iy++) {
        var yv2 = -R + 2 * R * iy / 14;
        ctx.beginPath();
        for (var i2 = 0; i2 <= M; i2++) {
          var xv2 = -R + 2 * R * i2 / M;
          var q2 = raw(xv2, yv2, p.f(xv2, yv2));
          if (i2 === 0) ctx.moveTo(mx(q2), my(q2)); else ctx.lineTo(mx(q2), my(q2));
        }
        ctx.stroke();
      }
    };
    drawSurf('rgba(43,74,155,.75)', 1.3);
    // 切平面补片
    if (S.showPlane) {
      var rp = 0.9;
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.7;
      var M2 = 12;
      for (var a = 0; a <= M2; a++) {
        var t = -rp + 2 * rp * a / M2;
        ctx.beginPath();
        for (i = 0; i <= M2; i++) {
          var t2 = -rp + 2 * rp * i / M2;
          var qx = x0 + t, qy = y0 + t2, qz = zplane(qx, qy);
          var qq = raw(qx, qy, qz);
          if (i === 0) ctx.moveTo(mx(qq), my(qq)); else ctx.lineTo(mx(qq), my(qq));
        }
        ctx.stroke();
      }
      for (var b = 0; b <= M2; b++) {
        var t3 = -rp + 2 * rp * b / M2;
        ctx.beginPath();
        for (i = 0; i <= M2; i++) {
          var t4 = -rp + 2 * rp * i / M2;
          var qx2 = x0 + t4, qy2 = y0 + t3, qz2 = zplane(qx2, qy2);
          var qq2 = raw(qx2, qy2, qz2);
          if (i === 0) ctx.moveTo(mx(qq2), my(qq2)); else ctx.lineTo(mx(qq2), my(qq2));
        }
        ctx.stroke();
      }
    }
    // 切点
    var qP = raw(x0, y0, f0);
    MA_DRAW.dot(ctx, mx(qP), my(qP), 6, '#e8871e');
    MA_DRAW.text(ctx, mx(qP) + 10, my(qP) - 6, 'P(x₀,y₀,f(x₀,y₀))', { color: '#e8871e', size: 12.5 });
    // 坐标轴
    ctx.strokeStyle = '#7b8494'; ctx.lineWidth = 1.4;
    [[1.6, 0, 0, 'x'], [0, 1.6, 0, 'y'], [0, 0, 1.6, 'z']].forEach(function (ax) {
      var q0 = raw(0, 0, 0), q1 = raw(ax[0], ax[1], ax[2]);
      ctx.beginPath(); ctx.moveTo(mx(q0), my(q0)); ctx.lineTo(mx(q1), my(q1)); ctx.stroke();
      MA_DRAW.text(ctx, mx(q1) + 6, my(q1), ax[3], { color: '#7b8494', size: 13 });
    });
    MA_DRAW.text(ctx, 12, 18, p.label + '　红色网格：切平面 z=' + f0.toFixed(2) + '+' + fx0.toFixed(2) + '(x−' + x0.toFixed(2) + ')+' + fy0.toFixed(2) + '(y−' + y0.toFixed(2) + ')', { color: '#5b6472', size: 13 });
  },
  status: function (S) {
    var PRES = {
      par: { f: function (x, y) { return x * x + y * y; }, fx: function (x) { return 2 * x; }, fy: function (y) { return 2 * y; } },
      sad: { f: function (x, y) { return x * x - y * y; }, fx: function (x) { return 2 * x; }, fy: function (y) { return -2 * y; } }
    };
    var p = PRES[S.preset];
    var f0 = p.f(S.x0, S.y0), fx0 = p.fx(S.x0), fy0 = p.fy(S.y0);
    var c = f0 - fx0 * S.x0 - fy0 * S.y0;
    return '切平面方程：z = ' + fx0.toFixed(3) + 'x + ' + fy0.toFixed(3) + 'y + (' + c.toFixed(3) + ')' +
      '。它由两条切线（沿 x 方向斜率 f_x，沿 y 方向斜率 f_y）张成，在 P 点“贴住”曲面——多元函数在一点附近可以用切平面（线性函数）近似，这就是全微分/线性化的几何含义。';
  }
});

/* ============ 演示 17：隐函数求导——切线斜率（第十八章） ============ */
MA_DEMOS.register('implicit', {
  title: '隐函数求导：不用解出 y，也能求切线',
  height: 400,
  controls: [
    { key: 'preset', label: '曲线', type: 'select', val: 'cir', options: [
      { v: 'cir', t: 'x²+y²=1（圆）' },
      { v: 'ell', t: 'x²/4+y²=1（椭圆）' }
    ] },
    { key: 'th', label: '点的角度 θ°', type: 'range', min: 1, max: 179, step: 1, val: 60, fmt: function (v) { return v; } }
  ],
  draw: function (ctx, w, h, S) {
    var isEll = S.preset === 'ell';
    var a = isEll ? 2 : 1;
    var F = function (x, y) { return x * x / (a * a) + y * y - 1; };
    var th = S.th * Math.PI / 180;
    var x0 = a * Math.cos(th), y0 = Math.sin(th);
    var L = isEll ? 2.5 : 1.4;
    var P = MA_DRAW.plot(w, h, -L, L, -L * 0.9, L * 0.9, { ml: 58, mb: 44 });
    MA_DRAW.axes(ctx, P, { xticks: isEll ? [-2, -1, 0, 1, 2] : [-1, 0, 1], yticks: [-1, 0, 1], xlabel: 'x', ylabel: 'y' });
    // 隐式曲线（采样参数）
    ctx.save(); ctx.strokeStyle = '#2b4a9b'; ctx.lineWidth = 2.6;
    ctx.beginPath();
    for (var i = 0; i <= 300; i++) {
      var tt = 2 * Math.PI * i / 300;
      var xc = a * Math.cos(tt), yc = Math.sin(tt);
      if (i === 0) ctx.moveTo(P.X(xc), P.Y(yc)); else ctx.lineTo(P.X(xc), P.Y(yc));
    }
    ctx.stroke(); ctx.restore();
    // 切线：由隐函数求导 y' = -F_x/F_y = -x/(a²y)
    var Fx = 2 * x0 / (a * a), Fy = 2 * y0;
    var slope = -Fx / Fy;
    // 画切线（用参数化避免斜率无穷大问题）
    var dx = 1, dy = slope;
    var len = Math.sqrt(dx * dx + dy * dy);
    var s1 = Math.min(1.6, L);
    MA_DRAW.line(ctx, [[P.X(x0 - dx / len * s1), P.Y(y0 - dy / len * s1)], [P.X(x0 + dx / len * s1), P.Y(y0 + dy / len * s1)]], { color: '#c0392b', width: 2.2, dash: [7, 4] });
    // 半径/法线
    MA_DRAW.line(ctx, [[P.X(0), P.Y(0)], [P.X(x0), P.Y(y0)]], { color: 'rgba(120,130,150,.7)', width: 1.2, dash: [3, 3] });
    MA_DRAW.dot(ctx, P.X(x0), P.Y(y0), 5.5, '#e8871e');
    MA_DRAW.text(ctx, P.X(x0) + 8, P.Y(y0) - 8, 'P(x₀,y₀)', { color: '#e8871e', size: 13 });
    MA_DRAW.text(ctx, P.X(-L) + 8, P.Y(L * 0.9) - 8, (isEll ? 'x²/4+y²=1' : 'x²+y²=1') + '　切线：x·x₀/' + (a * a) + ' + y·y₀ = 1', { color: '#2b4a9b', size: 13.5 });
    MA_DRAW.text(ctx, P.X(-L) + 8, P.Y(L * 0.9) - 26, "y′ = −F_x/F_y = −" + Fx.toFixed(3) + '/' + Fy.toFixed(3) + ' = ' + slope.toFixed(3), { color: '#c0392b', size: 13 });
  },
  status: function (S) {
    var isEll = S.preset === 'ell';
    var a = isEll ? 2 : 1;
    var th = S.th * Math.PI / 180;
    var x0 = a * Math.cos(th), y0 = Math.sin(th);
    var Fx = 2 * x0 / (a * a), Fy = 2 * y0;
    var slope = -Fx / Fy;
    return '在 P(' + x0.toFixed(3) + ', ' + y0.toFixed(3) + ') 处：对 F(x,y)=0 两边关于 x 求导得 F_x + F_y·y′=0，故 y′= −F_x/F_y = −' + x0.toFixed(3) + '/' + (a * a * y0).toFixed(3) + ' = ' + slope.toFixed(3) +
      '。隐函数定理保证：只要 F_y≠0（该点切线不竖直），曲线在 P 附近就能唯一地表成 y=y(x)（或 x=x(y)），且导数由上式给出，无需显式解出 y。';
  }
});

/* ============ 演示 18：第二类曲线积分 = 力沿路径做的功（第二十章） ============ */
MA_DEMOS.register('lineint', {
  title: '第二类曲线积分：向量场沿曲线的“累积”',
  height: 440,
  controls: [
    { key: 'preset', label: '向量场 F', type: 'select', val: 'rot', options: [
      { v: 'rot', t: 'F=(−y, x)（旋转场，非保守）' },
      { v: 'rad', t: 'F=(x, y)（径向场，保守）' }
    ] },
    { key: 'r', label: '半径 r', type: 'range', min: 0.3, max: 2.2, step: 0.05, val: 1.0, fmt: function (v) { return v.toFixed(2); } },
    { key: 'n', label: '分段数 n', type: 'range', min: 4, max: 160, step: 1, val: 48, fmt: function (v) { return v; } }
  ],
  draw: function (ctx, w, h, S) {
    var PRES = {
      rot: { P: function (x, y) { return -y; }, Q: function (x, y) { return x; }, label: 'F=(−y, x)', exact: function (r) { return 2 * Math.PI * r * r; } },
      rad: { P: function (x, y) { return x; }, Q: function (x, y) { return y; }, label: 'F=(x, y)', exact: function () { return 0; } }
    };
    var p = PRES[S.preset];
    var L = 2.8, r = S.r;
    var P = MA_DRAW.plot(w, h, -L, L, -L, L, { ml: 56, mb: 44 });
    MA_DRAW.axes(ctx, P, { xticks: [-2, -1, 0, 1, 2], yticks: [-2, -1, 0, 1, 2], xlabel: 'x', ylabel: 'y' });
    // 场箭头网格
    ctx.save();
    for (var gx = -2; gx <= 2; gx += 0.5) for (var gy = -2; gy <= 2; gy += 0.5) {
      if (Math.abs(gx) < 0.01 && Math.abs(gy) < 0.01) continue;
      var fx = p.P(gx, gy), fy = p.Q(gx, gy);
      var m = Math.sqrt(fx * fx + fy * fy) || 1;
      var scl = 9 / m;
      var sx0 = P.X(gx), sy0 = P.Y(gy);
      arrow(ctx, sx0, sy0, sx0 + fx * scl, sy0 - fy * scl, 'rgba(90,85,201,.55)', 1.4);
    }
    ctx.restore();
    // 圆路径
    ctx.strokeStyle = '#2e7d32'; ctx.lineWidth = 2.4;
    ctx.beginPath();
    var circ = [];
    for (var i = 0; i <= 360; i++) {
      var tt = 2 * Math.PI * i / 360;
      circ.push([P.X(r * Math.cos(tt)), P.Y(r * Math.sin(tt))]);
    }
    ctx.beginPath();
    circ.forEach(function (q, idx) { if (idx === 0) ctx.moveTo(q[0], q[1]); else ctx.lineTo(q[0], q[1]); });
    ctx.stroke();
    // 方向箭头（逆时针）
    [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2].forEach(function (tt) {
      var x1 = r * Math.cos(tt), y1 = r * Math.sin(tt);
      var x2 = r * Math.cos(tt + 0.3), y2 = r * Math.sin(tt + 0.3);
      arrow(ctx, P.X(x1), P.Y(y1), P.X(x2), P.Y(y2), '#2e7d32', 2.2);
    });
    // 计算折线近似功
    var n = S.n, W = 0;
    for (var k = 0; k < n; k++) {
      var t1 = 2 * Math.PI * k / n, t2 = 2 * Math.PI * (k + 1) / n;
      var xa = r * Math.cos(t1), ya = r * Math.sin(t1);
      var xb = r * Math.cos(t2), yb = r * Math.sin(t2);
      var xm = (xa + xb) / 2, ym = (ya + yb) / 2;
      W += p.P(xm, ym) * (xb - xa) + p.Q(xm, ym) * (yb - ya);
    }
    var ex = p.exact(r);
    MA_DRAW.text(ctx, P.X(-L) + 8, P.Y(L) - 10, p.label + '　∮ F·dr ≈ ' + W.toFixed(4) + '　（精确值 ' + (ex === 0 ? '0' : '2πr²=' + ex.toFixed(4)) + '）', { color: '#2b4a9b', size: 13.5 });
    MA_DRAW.text(ctx, P.X(-L) + 8, P.Y(L) - 28, '沿逆时针闭曲线一周的环量', { color: '#5b6472', size: 12.5 });
  },
  status: function (S) {
    var PRES = {
      rot: { P: function (x, y) { return -y; }, Q: function (x, y) { return x; }, exact: function (r) { return 2 * Math.PI * r * r; }, concl: '非保守场：环量 = ∬(∂Q/∂x − ∂P/∂y)dσ = 2·(圆盘面积) = 2πr² ≠ 0。做功与路径有关（逆时针绕一圈净做功为正）。' },
      rad: { P: function (x, y) { return x; }, Q: function (x, y) { return y; }, exact: function () { return 0; }, concl: '保守场：F=∇( (x²+y²)/2 )，存在势函数，闭路积分为 0（做功与路径无关，只与起终点有关）。' }
    };
    var p = PRES[S.preset];
    var n = S.n, r = S.r, W = 0;
    for (var k = 0; k < n; k++) {
      var t1 = 2 * Math.PI * k / n, t2 = 2 * Math.PI * (k + 1) / n;
      var xa = r * Math.cos(t1), ya = r * Math.sin(t1), xb = r * Math.cos(t2), yb = r * Math.sin(t2);
      var xm = (xa + xb) / 2, ym = (ya + yb) / 2;
      W += p.P(xm, ym) * (xb - xa) + p.Q(xm, ym) * (yb - ya);
    }
    return 'n=' + n + ' 段折线近似：∮_C F·dr ≈ ' + W.toFixed(5) + '（精确 ' + p.exact(r).toFixed(5) + '）。' + p.concl;
  }
});

/* ============ 演示 19：二重积分 = 累次积分（第二十一章） ============ */
MA_DEMOS.register('slice', {
  title: '二重积分化成累次积分：“切片—累积”两步走',
  height: 440,
  controls: [
    { key: 'preset', label: '区域与函数', type: 'select', val: 'A', options: [
      { v: 'A', t: 'D={x²≤y≤x, 0≤x≤1}，f(x,y)=xy' },
      { v: 'B', t: 'D={0≤y≤√(1−x²), 0≤x≤1}，f(x,y)=1' }
    ] },
    { key: 'x', label: '切片位置 x', type: 'range', min: 0.02, max: 0.98, step: 0.01, val: 0.55, fmt: function (v) { return v.toFixed(2); } }
  ],
  draw: function (ctx, w, h, S) {
    var PRES = {
      A: { y1: function (x) { return x * x; }, y2: function (x) { return x; }, f: function (x, y) { return x * y; }, a: 0, b: 1, I: 1 / 24, name: 'D：x²≤y≤x' },
      B: { y1: function (x) { return 0; }, y2: function (x) { return Math.sqrt(Math.max(0, 1 - x * x)); }, f: function (x, y) { return 1; }, a: 0, b: 1, I: Math.PI / 4, name: 'D：y≤√(1−x²)' }
    };
    var p = PRES[S.preset];
    var x0 = S.x;
    var hInt = function (x) { return MA_DRAW.simpson(function (y) { return p.f(x, y); }, p.y1(x), p.y2(x), 80); };
    var hx0 = hInt(x0);
    var leftHalf = w / 2 - 14, rightHalf = w / 2 + 14;
    var P1 = MA_DRAW.plot(leftHalf, h, -0.08, 1.08, -0.15, 1.18, { ml: 46, mr: 10, mb: 40 });
    // 左图：区域与切片
    ctx.save();
    // 区域填充
    ctx.fillStyle = 'rgba(43,74,155,.13)';
    ctx.beginPath();
    var n2 = 120;
    for (var i = 0; i <= n2; i++) { var xa = p.a + (p.b - p.a) * i / n2; var ya = p.y1(xa); ctx.lineTo(P1.X(xa), P1.Y(ya)); }
    for (i = n2; i >= 0; i--) { xa = p.a + (p.b - p.a) * i / n2; ya = p.y2(xa); ctx.lineTo(P1.X(xa), P1.Y(ya)); }
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#2b4a9b'; ctx.lineWidth = 2;
    ctx.beginPath();
    for (i = 0; i <= n2; i++) { xa = p.a + (p.b - p.a) * i / n2; var yb = p.y2(xa); if (i === 0) ctx.moveTo(P1.X(xa), P1.Y(yb)); else ctx.lineTo(P1.X(xa), P1.Y(yb)); }
    for (i = n2; i >= 0; i--) { xa = p.a + (p.b - p.a) * i / n2; yb = p.y1(xa); ctx.lineTo(P1.X(xa), P1.Y(yb)); }
    ctx.closePath(); ctx.stroke(); ctx.restore();
    MA_DRAW.axes(ctx, P1, { xticks: [0, 0.5, 1], yticks: [0, 0.5, 1], xlabel: 'x', ylabel: 'y' });
    // 切片（x=x0 处竖线 y1..y2）
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(P1.X(x0), P1.Y(p.y1(x0))); ctx.lineTo(P1.X(x0), P1.Y(p.y2(x0))); ctx.stroke();
    MA_DRAW.dot(ctx, P1.X(x0), P1.Y(p.y1(x0)), 4, '#c0392b');
    MA_DRAW.dot(ctx, P1.X(x0), P1.Y(p.y2(x0)), 4, '#c0392b');
    MA_DRAW.text(ctx, P1.X(x0) + 6, P1.Y((p.y1(x0) + p.y2(x0)) / 2), '切片', { color: '#c0392b', size: 12 });
    MA_DRAW.text(ctx, P1.X(0.02), P1.Y(1.12), p.name + '（左：区域，竖线=切片）', { color: '#2b4a9b', size: 12.5 });
    // 右图：h(x) 曲线与累积
    var P2off = MA_DRAW.plot(w - leftHalf, h, -0.08, 1.08, -0.1, 1.15, { ml: 46, mr: 10, mb: 40 });
    ctx.save();
    ctx.translate(leftHalf, 0);
    // h 曲线
    MA_DRAW.curve(ctx, P2off, hInt, 0.001, 0.999, { color: '#2e7d32', width: 2.6 });
    // 累积面积（a→x0）
    ctx.fillStyle = 'rgba(46,125,50,.18)';
    ctx.beginPath();
    ctx.moveTo(P2off.X(0), P2off.Y(0));
    var m3 = 60;
    for (i = 0; i <= m3; i++) {
      var xc = x0 * i / m3;
      ctx.lineTo(P2off.X(xc), P2off.Y(Math.max(0, hInt(xc))));
    }
    ctx.lineTo(P2off.X(x0), P2off.Y(0));
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(P2off.X(x0), P2off.Y(0)); ctx.lineTo(P2off.X(x0), P2off.Y(hx0)); ctx.stroke();
    MA_DRAW.dot(ctx, P2off.X(x0), P2off.Y(hx0), 4.5, '#c0392b');
    MA_DRAW.axes(ctx, P2off, { xticks: [0, 0.5, 1], yticks: [0, 0.5, 1], xlabel: 'x', ylabel: 'h(x)' });
    MA_DRAW.text(ctx, P2off.X(0.02), P2off.Y(1.12), '右：内层积分 h(x)=∫ f(x,y)dy（绿色）', { color: '#2e7d32', size: 12.5 });
    MA_DRAW.text(ctx, P2off.X(0.02), P2off.Y(1.12) - 16, '绿色填充 = 外层积分累积到 x=' + x0.toFixed(2), { color: '#5b6472', size: 12 });
    ctx.restore();
  },
  status: function (S) {
    var PRES = {
      A: { y1: function (x) { return x * x; }, y2: function (x) { return x; }, f: function (x, y) { return x * y; }, a: 0, b: 1, I: 1 / 24 },
      B: { y1: function (x) { return 0; }, y2: function (x) { return Math.sqrt(Math.max(0, 1 - x * x)); }, f: function (x, y) { return 1; }, a: 0, b: 1, I: Math.PI / 4 }
    };
    var p = PRES[S.preset];
    var hInt = function (x) { return MA_DRAW.simpson(function (y) { return p.f(x, y); }, p.y1(x), p.y2(x), 80); };
    var x0 = S.x;
    var hx0 = hInt(x0);
    var partial = MA_DRAW.simpson(hInt, p.a, x0, 300);
    var total = MA_DRAW.simpson(hInt, p.a, p.b, 2400);
    var Itxt = p.I === 1 / 24 ? '1/24≈0.041667' : 'π/4≈0.785398';
    return '固定 x=' + x0.toFixed(2) + '，先对 y 积分：h(x)=∫_{y₁}^{y₂} f(x,y) dy ≈ ' + hx0.toFixed(5) +
      '（这就是该处“切片”的贡献）。再对 x 从 0 累积到 ' + x0.toFixed(2) + '：∫ h(x)dx ≈ ' + partial.toFixed(5) +
      '；全区域积分为 ' + Itxt + '（数值 ' + total.toFixed(5) + '）。口诀：先 y 后 x，先“切片”再“累积”。';
  }
});
