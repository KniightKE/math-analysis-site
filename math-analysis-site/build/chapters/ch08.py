# -*- coding: utf-8 -*-
CHAPTER = {
 "id":"ch08","no":8,"volume":2,
 "title":"不定积分","en":"Indefinite Integrals","sym":"∫",
 "desc":"原函数与不定积分、换元积分法与分部积分法——求导的“逆运算”及技巧。",
 "intro":r"""求导有一套机械的法则，而它的逆运算——**求不定积分**却更像“解谜”：没有万能公式，全靠识别结构、灵活变形。本章的任务是：给定 \(f(x)\)，找出所有导数等于 \(f(x)\) 的函数 \(F(x)+C\)。

学习策略：① 把基本积分表当作“求导公式反过来背”；② 换元法对应链式法则（凑微分是第一类换元，“反链式”；第二类换元则是“主动制造 \(\mathrm{d}u\)”）；③ 分部积分对应乘积法则，专门对付“两类函数相乘”。多做练习、积累模式是学好不定积分的唯一途径。""",
 "sections":[
  {"id":"s1","title":"概念与基本积分表","sub":"原函数、不定积分、线性性质","blocks":[
   {"t":"def","tag":"定义 8.1","title":"原函数与不定积分","x":r"""若在区间 \(I\) 上 \(F'(x)=f(x)\)，称 \(F\) 为 \(f\) 的一个**原函数**。\(f\) 的**全体原函数** \(\{F(x)+C\}\) 称为不定积分，记

$$\int f(x)\,\mathrm{d}x=F(x)+C.$$

两个基本事实：\(\left(\int f\,\mathrm{d}x\right)'=f\)；\(\int F'(x)\,\mathrm{d}x=F(x)+C\)。不定积分是**函数族**，常数 \(C\) 不能丢。"""},
   {"t":"note","title":"基本积分表（与求导表互逆）","x":r"""$$\int x^\alpha\mathrm{d}x=\frac{x^{\alpha+1}}{\alpha+1}+C\ (\alpha\ne-1),\qquad \int\frac{\mathrm{d}x}{x}=\ln|x|+C,$$
$$\int \mathrm{e}^x\mathrm{d}x=\mathrm{e}^x+C,\quad \int a^x\mathrm{d}x=\frac{a^x}{\ln a}+C,$$
$$\int\sin x\,\mathrm{d}x=-\cos x+C,\quad \int\cos x\,\mathrm{d}x=\sin x+C,$$
$$\int\sec^2x\,\mathrm{d}x=\tan x+C,\quad \int\frac{\mathrm{d}x}{1+x^2}=\arctan x+C,\quad \int\frac{\mathrm{d}x}{\sqrt{1-x^2}}=\arcsin x+C.$$

注意 \(\int\frac1x\mathrm{d}x=\ln|x|+C\) 中绝对值不能省（\(x<0\) 时 \((\ln(-x))'=1/x\)）。"""},
   {"t":"thm","tag":"定理 8.1","title":"线性性质","x":r"""$$\int[\alpha f(x)+\beta g(x)]\,\mathrm{d}x=\alpha\int f(x)\,\mathrm{d}x+\beta\int g(x)\,\mathrm{d}x.$$

（由求导的线性直接得到。）"""},
   {"t":"ex","tag":"例 8.1","title":"化简后再积分","x":r"""求 \(\int\frac{x^4+1}{x^2}\,\mathrm{d}x\) 与 \(\int\tan^2x\,\mathrm{d}x\)。""","ans":r"""① \(\int(x^2+x^{-2})\mathrm{d}x=\frac{x^3}{3}-\frac1x+C\)。
② \(\tan^2x=\sec^2x-1\)，故 \(\int\tan^2x\,\mathrm{d}x=\tan x-x+C\)。先代数/三角变形，常比硬凑更有效。"""}
  ]},
  {"id":"s2","title":"换元积分法","sub":"第一类（凑微分）与第二类（变量代换）","blocks":[
   {"t":"thm","tag":"定理 8.2","title":"第一类换元法（凑微分）","x":r"""若 \(\int f(u)\,\mathrm{d}u=F(u)+C\)，则

$$\int f(\varphi(x))\,\varphi'(x)\,\mathrm{d}x=F(\varphi(x))+C.$$

操作上就是把 \(\varphi'(x)\mathrm{d}x\) “凑”成 \(\mathrm{d}\varphi(x)\)。例如：

$$\int \mathrm{e}^{x^2}\,x\,\mathrm{d}x=\frac12\int\mathrm{e}^{x^2}\mathrm{d}(x^2)=\frac12\mathrm{e}^{x^2}+C.$$"""},
   {"t":"thm","tag":"定理 8.3","title":"第二类换元法","x":r"""设 \(x=\psi(t)\) 单调可导、\(\psi'(t)\ne0\)，则

$$\int f(x)\,\mathrm{d}x=\left.\int f(\psi(t))\psi'(t)\,\mathrm{d}t\,\right|_{t=\psi^{-1}(x)}.$$

典型代换：含 \(\sqrt{a^2-x^2}\) 用 \(x=a\sin t\)；含 \(\sqrt{x^2+a^2}\) 用 \(x=a\tan t\)（或双曲代换）；含 \(\sqrt{x^2-a^2}\) 用 \(x=a\sec t\)；含 \(\sqrt[n]{ax+b}\) 用整体根式代换。"""},
   {"t":"ex","tag":"例 8.2","title":"三角代换","x":r"""求 \(\int\sqrt{1-x^2}\,\mathrm{d}x\)。""","ans":r"""令 \(x=\sin t\)，\(\mathrm{d}x=\cos t\,\mathrm{d}t\)，\(\sqrt{1-x^2}=\cos t\)（取 \(t\in[-\frac\pi2,\frac\pi2]\)）：

$$\int\cos^2t\,\mathrm{d}t=\int\frac{1+\cos2t}{2}\mathrm{d}t=\frac t2+\frac{\sin2t}{4}+C=\frac{\arcsin x}{2}+\frac{x\sqrt{1-x^2}}{2}+C.$$"""}
  ]},
  {"id":"s3","title":"分部积分法","sub":"对付乘积的“转移”技巧","blocks":[
   {"t":"thm","tag":"定理 8.4","title":"分部积分公式","x":r"""由 \((uv)'=u'v+uv'\) 积分得

$$\int u\,\mathrm{d}v=uv-\int v\,\mathrm{d}u.$$

选择口诀：把容易“求导变简单”的（多项式、\(\ln x\)、反三角函数）当 \(u\)，容易积分的（\(\mathrm{e}^x\)、\(\sin x\)、\(\cos x\)）当 \(\mathrm{d}v\)。"""},
   {"t":"ex","tag":"例 8.3","title":"分部积分的典型用法","x":r"""求 \(\int x\mathrm{e}^x\mathrm{d}x\)、\(\int\ln x\,\mathrm{d}x\)、\(\int\mathrm{e}^x\sin x\,\mathrm{d}x\)。""","ans":r"""① 令 \(u=x\)，\(\mathrm{d}v=\mathrm{e}^x\mathrm{d}x\)：\(\int x\mathrm{e}^x\mathrm{d}x=x\mathrm{e}^x-\int\mathrm{e}^x\mathrm{d}x=(x-1)\mathrm{e}^x+C\)。

② 令 \(u=\ln x\)，\(\mathrm{d}v=\mathrm{d}x\)：\(\int\ln x\,\mathrm{d}x=x\ln x-x+C\)。

③ 两次分部后出现“回环”：设 \(I=\int\mathrm{e}^x\sin x\,\mathrm{d}x\)，算两次分部得 \(I=\mathrm{e}^x\sin x-\mathrm{e}^x\cos x-I\)，故 \(I=\frac{\mathrm{e}^x}{2}(\sin x-\cos x)+C\)。"""},
   {"t":"note","title":"有理函数积分速览","x":r"""有理函数 \(\frac{P(x)}{Q(x)}\) 的积分套路：① 假分式先做多项式除法；② 真分式分母分解因式，拆成部分分式 \(\frac{A}{(x-a)^k}\)、\(\frac{Bx+C}{(x^2+px+q)^k}\)；③ 逐项积分。其中 \(\int\frac{\mathrm{d}x}{x^2+a^2}=\frac1a\arctan\frac xa+C\)、\(\int\frac{\mathrm{d}x}{x^2-a^2}=\frac{1}{2a}\ln\left|\frac{x-a}{x+a}\right|+C\) 要熟记。"""}
  ]}
 ],
 "summary":r"""**本章小结**

1. 不定积分 = 原函数族 \(F(x)+C\)；与求导互逆。
2. 换元法：第一类（凑微分，对应链式法则）、第二类（主动代换，用于根式）；分式与三角结构优先想代换。
3. 分部积分：\(\int u\,\mathrm{d}v=uv-\int v\,\mathrm{d}u\)，用于乘积；出现回环时移项求解。
4. 技巧顺序：先化简（代数/三角恒等）→ 凑微分 → 换元 → 分部 → 部分分式。

**常见误区**
- 忘记 \(+C\)；\(\int\frac1x\mathrm{d}x\) 忘绝对值。
- 凑微分时漏系数（\(\mathrm{d}x^2=2x\,\mathrm{d}x\)）。
- 三角代换后忘记把结果换回 \(x\)（用直角三角形还原）。
- 分部积分选错 \(u\)（把 \(\mathrm{e}^x\) 当 \(u\) 会使问题更复杂）。""",
 "exercises":[
  {"t":"choice","q":"\\(\\int\\frac{1}{x^2}\\,\\mathrm{d}x=\\)？","opts":["\\(-\\frac1x+C\\)","\\(\\frac1x+C\\)","\\(\\ln x^2+C\\)","\\(\\frac{1}{3x^3}+C\\)"],"ans":0,"why":"\\(\\int x^{-2}\\mathrm{d}x=\\frac{x^{-1}}{-1}+C=-\\frac1x+C\\)。"},
  {"t":"choice","q":"\\(\\int\\sin x\\cos x\\,\\mathrm{d}x\\) 用 \\(u=\\sin x\\) 凑微分的结果是？","opts":["\\(\\frac12\\sin^2x+C\\)","\\(-\\frac12\\cos^2x+C\\)","\\(\\frac14\\cos2x+C\\)","以上都对（它们只差常数）"],"ans":3,"why":"三种写法都正确：\\(\\frac12\\sin^2x\\)、\\(-\\frac12\\cos^2x\\) 与 \\(-\\frac14\\cos2x\\) 彼此只差常数，属于同一个原函数族。"},
  {"t":"tf","q":"若 \\(F,G\\) 都是 \\(f\\) 的原函数，则 \\(F-G\\) 为常数。","opts":["正确","错误"],"ans":0,"why":"\\((F-G)'=f-f=0\\)，故 \\(F-G\\) 为常数。"},
  {"t":"choice","q":"求 \\(\\int x\\cos x\\,\\mathrm{d}x\\) 应优先使用？","opts":["凑微分","第二类换元","分部积分","部分分式"],"ans":2,"why":"多项式 × 三角函数是分部积分的典型模式，令 \\(u=x\\)。"},
  {"t":"calc","q":"求 \\(\\int\\frac{\\mathrm{d}x}{x\\ln x}\\)。","hint":"凑微分：\\(\\frac{\\mathrm{d}x}{x}=\\mathrm{d}(\\ln x)\\)。","ans":"\\(\\int\\frac{1}{\\ln x}\\mathrm{d}(\\ln x)=\\ln|\\ln x|+C\\)。"},
  {"t":"calc","q":"求 \\(\\int\\mathrm{e}^{x}\\sin x\\,\\mathrm{d}x\\)（写出关键步骤）。","hint":"两次分部后解方程。","ans":"设 \\(I=\\int\\mathrm{e}^x\\sin x\\,\\mathrm{d}x\\)。一次分部：\\(I=\\mathrm{e}^x\\sin x-\\int\\mathrm{e}^x\\cos x\\,\\mathrm{d}x\\)；再分部：\\(\\int\\mathrm{e}^x\\cos x\\,\\mathrm{d}x=\\mathrm{e}^x\\cos x+\\int\\mathrm{e}^x\\sin x\\,\\mathrm{d}x=\\mathrm{e}^x\\cos x+I\\)。代入得 \\(I=\\mathrm{e}^x\\sin x-\\mathrm{e}^x\\cos x-I\\)，故 \\(I=\\frac{\\mathrm{e}^x}{2}(\\sin x-\\cos x)+C\\)。"},
  {"t":"calc","q":"求 \\(\\int\\frac{\\mathrm{d}x}{\\sqrt{x^2+1}}\\)（可用代换 \\(x=\\tan t\\) 或直接记结论）。","hint":"\\(x=\\tan t\\) 时 \\(\\sqrt{x^2+1}=\\sec t\\)。","ans":"令 \\(x=\\tan t\\)，\\(\\mathrm{d}x=\\sec^2t\\,\\mathrm{d}t\\)：\\(\\int\\sec t\\,\\mathrm{d}t=\\ln|\\sec t+\\tan t|+C=\\ln(x+\\sqrt{x^2+1})+C\\)。"},
  {"t":"calc","q":"求 \\(\\int\\arctan x\\,\\mathrm{d}x\\)。","hint":"分部积分，令 \\(u=\\arctan x\\)。","ans":"\\(\\int\\arctan x\\,\\mathrm{d}x=x\\arctan x-\\int\\frac{x}{1+x^2}\\mathrm{d}x=x\\arctan x-\\frac12\\ln(1+x^2)+C\\)。"}
 ]
}
