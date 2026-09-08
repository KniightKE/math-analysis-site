/* =========================================================
 * 互动演示框架（核心）：注册 + Canvas 绘图小工具 + 控件
 * 每个演示 = { title, desc, height, controls:[...], draw(ctx,w,h,S), status(S), onPreset(S) }
 * ========================================================= */
(function () {
  var reg = {};
  window.MA_DEMOS = {
    register: function (id, spec) { reg[id] = spec; },
    get: function (id) { return reg[id]; },
    all: function () { return Object.keys(reg); }
  };

  /* ---------- 绘图小工具 ---------- */
  window.MA_DRAW = {
    plot: function (w, h, xmin, xmax, ymin, ymax, o) {
      o = o || {};
      var ml = o.ml != null ? o.ml : 58, mr = o.mr != null ? o.mr : 20;
      var mt = o.mt != null ? o.mt : 18, mb = o.mb != null ? o.mb : 40;
      var PW = w - ml - mr, PH = h - mt - mb;
      return {
        w: w, h: h, ml: ml, mr: mr, mt: mt, mb: mb,
        PW: PW, PH: PH, xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax,
        X: function (x) { return ml + (x - xmin) / (xmax - xmin) * PW; },
        Y: function (y) { return mt + PH - (y - ymin) / (ymax - ymin) * PH; },
        invX: function (px) { return xmin + (px - ml) / PW * (xmax - xmin); },
        invY: function (py) { return ymin + (mt + PH - py) / PH * (ymax - ymin); }
      };
    },

    axes: function (ctx, P, o) {
      o = o || {};
      ctx.save();
      ctx.font = (o.font || 12) + 'px ' + (o.fontFamily || 'Segoe UI, PingFang SC, Microsoft YaHei, sans-serif');
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      var x0 = P.X(0), y0 = P.Y(0);
      var xAxisY = (0 >= P.ymin && 0 <= P.ymax) ? y0 : P.Y(P.ymin);
      var yAxisX = (0 >= P.xmin && 0 <= P.xmax) ? x0 : P.X(P.xmin);
      ctx.strokeStyle = 'rgba(0,0,0,.06)'; ctx.lineWidth = 1;
      var xt = o.xticks || [], yt = o.yticks || [];
      ctx.beginPath();
      xt.forEach(function (t) { var x = P.X(t); ctx.moveTo(x, P.Y(P.ymin)); ctx.lineTo(x, P.Y(P.ymax)); });
      yt.forEach(function (t) { var y = P.Y(t); ctx.moveTo(P.X(P.xmin), y); ctx.lineTo(P.X(P.xmax), y); });
      ctx.stroke();
      ctx.strokeStyle = '#7b8494'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(P.X(P.xmin), xAxisY); ctx.lineTo(P.X(P.xmax), xAxisY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(yAxisX, P.Y(P.ymin)); ctx.lineTo(yAxisX, P.Y(P.ymax)); ctx.stroke();
      ctx.fillStyle = '#8a93a3';
      var fy = o.fmtX || function (v) { return v; }, fx = o.fmtY || function (v) { return v; };
      xt.forEach(function (t) {
        ctx.fillText(String(fy(t)), P.X(t), xAxisY + 6);
      });
      yt.forEach(function (t) {
        var y = P.Y(t);
        ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        ctx.fillText(String(fx(t)), yAxisX - 7, y);
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      });
      if (o.xlabel) { ctx.fillStyle = '#5b6472'; ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.fillText(o.xlabel, P.X((P.xmin + P.xmax) / 2), P.h - 12); }
      if (o.ylabel) { ctx.save(); ctx.translate(15, P.Y((P.ymin + P.ymax) / 2)); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.ylabel, 0, 0); ctx.restore(); }
      ctx.restore();
    },

    line: function (ctx, pts, o) {
      o = o || {};
      if (!pts || pts.length < 2) return;
      ctx.save();
      ctx.strokeStyle = o.color || '#2b4a9b';
      ctx.lineWidth = o.width || 2;
      ctx.setLineDash(o.dash || []);
      ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.stroke();
      ctx.restore();
    },

    curve: function (ctx, P, fn, a, b, o) {
      o = o || {};
      var n = o.n || 260, pts = [];
      for (var i = 0; i <= n; i++) {
        var x = a + (b - a) * i / n;
        var y = fn(x);
        pts.push(isFinite(y) ? [P.X(x), P.Y(y)] : null);
      }
      ctx.save();
      ctx.strokeStyle = o.color || '#2b4a9b';
      ctx.lineWidth = o.width || 2.2;
      ctx.setLineDash(o.dash || []);
      ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      ctx.beginPath();
      var pen = false;
      for (var j = 0; j < pts.length; j++) {
        if (!pts[j]) { pen = false; continue; }
        if (!pen) { ctx.moveTo(pts[j][0], pts[j][1]); pen = true; }
        else ctx.lineTo(pts[j][0], pts[j][1]);
      }
      ctx.stroke();
      ctx.restore();
    },

    dot: function (ctx, x, y, r, color) {
      ctx.save();
      ctx.fillStyle = color || '#2b4a9b';
      ctx.beginPath(); ctx.arc(x, y, r || 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },

    text: function (ctx, x, y, s, o) {
      o = o || {};
      ctx.save();
      ctx.fillStyle = o.color || '#333';
      ctx.font = (o.size || 13) + 'px ' + (o.fontFamily || 'Segoe UI, PingFang SC, Microsoft YaHei, sans-serif');
      ctx.textAlign = o.align || 'left';
      ctx.textBaseline = o.baseline || 'middle';
      ctx.fillText(s, x, y);
      ctx.restore();
    },

    simpson: function (fn, a, b, n) {
      n = n || 1000;
      if (n % 2) n++;
      var h = (b - a) / n, s = fn(a) + fn(b);
      for (var i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * fn(a + i * h);
      return s * h / 3;
    },

    niceRound: function (v, d) { var p = Math.pow(10, d); return Math.round(v * p) / p; }
  };

  /* ---------- 演示挂载 ---------- */
  var active = [];
  var dpr = (window.devicePixelRatio || 1);

  function fmtVal(ctl, v) {
    try { return ctl.fmt ? ctl.fmt(v) : String(v); } catch (e) { return String(v); }
  }

  function makeControl(ctl, entry) {
    var box = document.createElement('div'); box.className = 'ctl';
    var lab = document.createElement('label'); lab.textContent = ctl.label;
    box.appendChild(lab);
    var valEl = null;
    if (ctl.type === 'select') {
      var sel = document.createElement('select');
      ctl.options.forEach(function (op) {
        var opEl = document.createElement('option');
        opEl.value = op.v; opEl.textContent = op.t;
        if (String(op.v) === String(ctl.val)) opEl.selected = true;
        sel.appendChild(opEl);
      });
      sel.addEventListener('input', function () {
        entry.S[ctl.key] = sel.value;
        if (entry.spec.onPreset) entry.spec.onPreset(entry);
        redraw(entry);
      });
      box.appendChild(sel);
      entry.ctls[ctl.key] = sel;
    } else if (ctl.type === 'check') {
      var chk = document.createElement('input'); chk.type = 'checkbox';
      chk.checked = !!ctl.val;
      chk.addEventListener('change', function () { entry.S[ctl.key] = chk.checked; redraw(entry); });
      var sp = document.createElement('span'); sp.textContent = ctl.label;
      box.appendChild(chk); box.appendChild(sp);
      entry.ctls[ctl.key] = chk;
    } else {
      var inp = document.createElement('input'); inp.type = 'range';
      inp.min = ctl.min; inp.max = ctl.max; inp.step = ctl.step || 0.01; inp.value = ctl.val;
      valEl = document.createElement('span'); valEl.className = 'val'; valEl.textContent = fmtVal(ctl, ctl.val);
      inp.addEventListener('input', function () {
        var v = parseFloat(inp.value);
        valEl.textContent = fmtVal(ctl, v);
        entry.S[ctl.key] = v;
        redraw(entry);
      });
      box.appendChild(inp); box.appendChild(valEl);
      entry.ctls[ctl.key] = inp;
      entry.valEls[ctl.key] = valEl;
    }
    return box;
  }

  function redraw(entry) {
    var rect = entry.canvas.getBoundingClientRect();
    var cssW = Math.max(240, Math.round(rect.width || entry.host.clientWidth - 36));
    var cssH = entry.H;
    if (entry.canvas.width !== Math.round(cssW * dpr)) {
      entry.canvas.width = Math.round(cssW * dpr);
      entry.canvas.height = Math.round(cssH * dpr);
    }
    var ctx = entry.canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cssW, cssH);
    try {
      entry.spec.draw(ctx, cssW, cssH, entry.S, entry);
      if (entry.spec.status) {
        var st = entry.spec.status(entry.S);
        entry.statusEl.innerHTML = st || '';
        entry.statusEl.style.display = st ? '' : 'none';
      }
    } catch (err) {
      entry.statusEl.innerHTML = '演示出错：' + err.message;
      console.error(err);
    }
  }

  window.MA_DEMOS.mount = function (id, host, title, desc) {
    var spec = reg[id];
    if (!spec) { host.innerHTML = '<p>找不到演示：' + id + '</p>'; return null; }
    host.innerHTML = '';
    var head = document.createElement('div'); head.className = 'inter-head';
    head.textContent = '🧭 ' + (title || spec.title);
    host.appendChild(head);
    if (desc) { var d = document.createElement('p'); d.className = 'inter-desc'; d.textContent = desc; host.appendChild(d); }
    var canvas = document.createElement('canvas');
    host.appendChild(canvas);
    var ctlBox = document.createElement('div'); ctlBox.className = 'controls';
    host.appendChild(ctlBox);
    var statusEl = document.createElement('div'); statusEl.className = 'inter-status';
    host.appendChild(statusEl);

    var S = {};
    (spec.controls || []).forEach(function (c) { S[c.key] = c.val; });
    var entry = {
      host: host, spec: spec, canvas: canvas, S: S, H: spec.height || 340,
      statusEl: statusEl, ctlBox: ctlBox, ctls: {}, valEls: {}
    };
    entry.setRange = function (key, cfg) {
      var inp = entry.ctls[key], valEl = entry.valEls[key];
      if (!inp) return;
      inp.min = cfg.min; inp.max = cfg.max; inp.step = cfg.step != null ? cfg.step : inp.step;
      var v = cfg.val != null ? cfg.val : parseFloat(inp.value);
      v = Math.min(cfg.max, Math.max(cfg.min, v));
      inp.value = v; entry.S[key] = v;
      if (valEl && entry.spec.controls) {
        var ctl = entry.spec.controls.filter(function (c) { return c.key === key; })[0];
        if (ctl && ctl.fmt) valEl.textContent = ctl.fmt(v); else valEl.textContent = String(v);
      }
    };
    entry.setEnabled = function (key, on) {
      var c = entry.ctls[key];
      if (c) c.disabled = !on;
    };
    (spec.controls || []).forEach(function (c) { ctlBox.appendChild(makeControl(c, entry)); });
    if (spec.onPreset) spec.onPreset(entry);
    active.push(entry);
    redraw(entry);
    return entry;
  };

  window.MA_DEMOS.redrawAll = function () { active.forEach(redraw); };
  var rt = null;
  window.addEventListener('resize', function () {
    clearTimeout(rt); rt = setTimeout(function () { window.MA_DEMOS.redrawAll(); }, 120);
  });
})();
