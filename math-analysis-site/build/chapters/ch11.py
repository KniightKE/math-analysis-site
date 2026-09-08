# -*- coding: utf-8 -*-
CHAPTER = {
 "id":"ch11","no":11,"volume":2,
 "title":"反常积分","en":"Improper Integrals","sym":"∞",
 "desc":"无穷区间与无界函数的积分：收敛定义、p-判别法与比较判别法。",
 "intro":r"""普通的定积分要求“区间有限 + 被积函数有界”。实际中常遇到两类“越界”情形：区间无穷（\(\int_1^\infty\frac{\mathrm{d}x}{x^2}\)），或被积函数在某点无界（\(\int_0^1\frac{\mathrm{d}x}{\sqrt{x}}\)）。它们统称**反常积分**，不能直接代上下限，要先“砍断”再取极限。

反常积分的核心问题是**收敛性**：这个“面积”是有限的还是无穷的？直观上，\(\int_1^\infty\frac{\mathrm{d}x}{x}\) 的曲线很快趋近 0，可面积竟然是无穷大——这正说明“趋于 0 的速度”必须精确刻画。互动演示里把 \(p\) 从 1 拨到 1.01，观察面积从“发散”跳到“收敛”的临界。""",
 "sections":[
  {"id":"s1","title":"无穷区间上的反常积分","sub":"定义与 p-积分","blocks":[
   {"t":"def","tag":"定义 11.1","title":"无穷限反常积分","x":r"""若 \(\lim_{b\to+\infty}\int_a^b f(x)\mathrm{d}x\) 存在，称 \(\int_a^{+\infty}f(x)\mathrm{d}x\) **收敛**，其值即该极限；否则**发散**。类似定义 \(\int_{-\infty}^b f\)，而

$$\int_{-\infty}^{+\infty}f=\int_{-\infty}^c f+\int_c^{+\infty}f$$

要求**两个**积分都收敛（不能拿对称极限 \(\lim_{R\to\infty}\int_{-R}^{R}f\) 代替，如 \(\int_{-\infty}^{+\infty}x\,\mathrm{d}x\) 的“主值”是 0 但积分发散）。"""},
   {"t":"thm","tag":"定理 11.1","title":"p-积分（第一类）","x":r"""$$\int_1^{+\infty}\frac{\mathrm{d}x}{x^p}\ \begin{cases}\text{收敛，当}\ p>1\\ \text{发散，当}\ p\le1\end{cases}$$

\(p=1\) 时 \(\int_1^R\frac{\mathrm{d}x}{x}=\ln R\to+\infty\)（对数发散，非常缓慢）。\(p>1\) 时极限为 \(\frac{1}{p-1}\)。"""},
   {"t":"ex","tag":"例 11.1","title":"计算并判断","x":r"""判断 \(\int_1^{+\infty}\frac{\mathrm{d}x}{x^2}\) 与 \(\int_1^{+\infty}\frac{\mathrm{d}x}{\sqrt{x}}\) 的敛散性。""","ans":r"""\(\int_1^R\frac{\mathrm{d}x}{x^2}=[-\frac1x]_1^R=1-\frac1R\to1\)，收敛于 1。\(\int_1^R x^{-1/2}\mathrm{d}x=2(\sqrt R-1)\to+\infty\)，发散（\(p=\frac12\le1\)）。"""}
  ]},
  {"id":"s2","title":"无界函数的反常积分","sub":"瑕积分与 p-判别","blocks":[
   {"t":"def","tag":"定义 11.2","title":"瑕积分","x":r"""设 \(f\) 在 \((a,b]\) 上有定义，\(x=a\) 附近无界（\(a\) 叫**瑕点**）。若 \(\lim_{\varepsilon\to0^+}\int_{a+\varepsilon}^b f(x)\mathrm{d}x\) 存在，称 \(\int_a^b f(x)\mathrm{d}x\) **收敛**。瑕点在区间内部或右端点时，先分段再按定义取极限。"""},
   {"t":"thm","tag":"定理 11.2","title":"p-积分（第二类）","x":r"""$$\int_0^1\frac{\mathrm{d}x}{x^p}\ \begin{cases}\text{收敛，当}\ p<1\\ \text{发散，当}\ p\ge1\end{cases}$$

注意与第一类**正好相反**：瑕点在 0 时，\(p\) 越小越“温和”，越容易收敛。\(\int_0^1\frac{\mathrm{d}x}{\sqrt{x}}=2\)（收敛），\(\int_0^1\frac{\mathrm{d}x}{x}\) 发散。"""},
   {"t":"warn","title":"不要把反常积分当普通积分算","x":r"""\(\int_{-1}^1\frac{\mathrm{d}x}{x^2}\) 这类含瑕点的积分**不能**直接写 \([-\frac1x]_{-1}^1=-2\)。被积函数在 0 无界，必须先拆成 \(\int_{-1}^0+\int_0^1\) 分别取极限；二者都发散，故原积分发散。"""}
  ]},
  {"id":"s3","title":"收敛性判别法","sub":"比较判别、绝对收敛","blocks":[
   {"t":"thm","tag":"定理 11.3","title":"比较判别法","x":r"""设 \(f,g\ge0\)（在相应范围内），且 \(f(x)\le g(x)\)：

- 若 \(\int g\) 收敛 ⇒ \(\int f\) 收敛（**大收则小收**）；
- 若 \(\int f\) 发散 ⇒ \(\int g\) 发散（**小发则大发**）。

实用形式（极限比较）：若 \(f,g\ge0\) 且 \(\lim\frac{f}{g}=c\in(0,\infty)\)，则 \(\int f\) 与 \(\int g\) 同敛散。比较对象通常取 \(\frac1{x^p}\)。"""},
   {"t":"def","tag":"定义 11.3","title":"绝对收敛与条件收敛","x":r"""若 \(\int|f|\) 收敛，称 \(\int f\) **绝对收敛**；\(\int f\) 收敛但 \(\int|f|\) 发散，称**条件收敛**。

**绝对收敛 ⇒ 收敛**（由比较判别法：\(0\le|f|\pm f\le2|f|\)）。例：\(\int_1^\infty\frac{\sin x}{x}\mathrm{d}x\) 条件收敛（狄利克雷判别），而 \(\int_1^\infty\frac{|\sin x|}{x}\mathrm{d}x\) 发散。"""},
   {"t":"ex","tag":"例 11.2","title":"用比较法判断","x":r"""判断 \(\int_0^{+\infty}\mathrm{e}^{-x^2}\mathrm{d}x\) 收敛。""","ans":r"""拆成 \(\int_0^1+\int_1^\infty\)。前一部分是普通定积分（有界）。后一部分 \(x\ge1\) 时 \(\mathrm{e}^{-x^2}\le\mathrm{e}^{-x}\)，而 \(\int_1^\infty\mathrm{e}^{-x}\mathrm{d}x=\mathrm{e}^{-1}\) 收敛，故整体收敛。其值 \(=\frac{\sqrt\pi}{2}\)（高斯积分，后续课程证明）。"""}
  ]}
 ],
 "summary":r"""**本章小结**

1. 反常积分 = “砍断 + 取极限”。两类：无穷区间、无界函数（瑕积分）。
2. 两个 p-判别要对比记忆：\(\int_1^\infty\frac{\mathrm{d}x}{x^p}\) 收敛 ⇔ \(p>1\)；\(\int_0^1\frac{\mathrm{d}x}{x^p}\) 收敛 ⇔ \(p<1\)。
3. 判别收敛性：找同阶比较对象 \(\frac1{x^p}\)，用比较（极限比较）判别；绝对收敛 ⇒ 收敛。

**常见误区**
- 含瑕点直接代上下限（牛顿–莱布尼茨失效）。
- \(\int_{-\infty}^{+\infty}\) 用对称极限代替（柯西主值 ≠ 收敛）。
- 被积函数变号时不能用比较判别法（它要求非负），先取绝对值看是否绝对收敛。
- \(p=1\) 是临界：对数发散“慢”，仍是发散。""",
 "exercises":[
  {"t":"choice","q":"\\(\\int_1^{+\\infty}\\frac{\\mathrm{d}x}{x^{1.5}}\\) 的敛散性为？","opts":["收敛","发散","无法判断","条件收敛"],"ans":0,"why":"第一类 p-积分，\\(p=1.5>1\\) 收敛。"},
  {"t":"choice","q":"\\(\\int_0^1\\frac{\\mathrm{d}x}{x^{0.8}}\\) 的敛散性为？","opts":["收敛","发散","无法判断","条件收敛"],"ans":0,"why":"瑕积分 \\(\\int_0^1x^{-p}\\)，\\(p=0.8<1\\) 收敛。"},
  {"t":"tf","q":"\\(\\int_{-1}^{1}\\frac{\\mathrm{d}x}{x}\\) 收敛（因为 \\(1/x\\) 是奇函数）。","opts":["正确","错误"],"ans":1,"why":"0 是瑕点，且 \\(\\int_0^1\\frac{\\mathrm{d}x}{x}\\) 发散，故整个积分发散；奇函数对称性在这里不适用（那是针对普通可积函数的）。"},
  {"t":"choice","q":"下列反常积分中**收敛**的是？","opts":["\\(\\int_1^\\infty\\frac{\\mathrm{d}x}{x}\\)","\\(\\int_0^1\\frac{\\mathrm{d}x}{x^2}\\)","\\(\\int_1^\\infty\\frac{\\mathrm{d}x}{x^2}\\)","\\(\\int_0^1\\frac{\\mathrm{d}x}{x}\\)"],"ans":2,"why":"只有 \\(\\int_1^\\infty x^{-2}\\) 属收敛情形；其余均为发散的 p-积分。"},
  {"t":"calc","q":"判断 \\(\\int_1^\\infty\\frac{x}{x^3+1}\\mathrm{d}x\\) 的敛散性。","hint":"\\(x\\to\\infty\\) 时被积函数 \\(\\sim\\frac1{x^2}\\)。","ans":"\\(\\frac{x}{x^3+1}\\sim\\frac1{x^2}\\)（\\(x\\to\\infty\\)），与收敛的 \\(\\int_1^\\infty\\frac{\\mathrm{d}x}{x^2}\\) 同阶，由极限比较判别法知原积分收敛。"},
  {"t":"calc","q":"计算 \\(\\int_0^1\\frac{\\mathrm{d}x}{\\sqrt{1-x}}\\)。","hint":"\\(x=1\\) 是瑕点，令 \\(t=1-x\\)。","ans":"\\(\\int_0^1(1-x)^{-1/2}\\mathrm{d}x=\\lim_{\\varepsilon\\to0}\\int_0^{1-\\varepsilon}(1-x)^{-1/2}\\mathrm{d}x=\\lim_{\\varepsilon\\to0}[-2\\sqrt{1-x}]_0^{1-\\varepsilon}=2\\)。"},
  {"t":"calc","q":"判断 \\(\\int_1^\\infty\\frac{\\sin x}{x}\\mathrm{d}x\\) 是否绝对收敛、是否收敛。","hint":"\\(\\int_1^\\infty\\frac{|\\sin x|}{x}\\mathrm{d}x\\) 与 \\(\\int\\frac1x\\) 比较（在正弦不为 0 的区间上）。","ans":"\\(\\int_1^\\infty\\frac{|\\sin x|}{x}\\mathrm{d}x\\) 发散（\\(|\\sin x|\\) 的平均值非零，可与其下界比较证明发散），故不绝对收敛；但 \\(\\int_1^\\infty\\frac{\\sin x}{x}\\mathrm{d}x\\) 由狄利克雷判别法收敛，是条件收敛。"},
  {"t":"calc","q":"判断 \\(\\int_0^{+\\infty}\\frac{\\mathrm{d}x}{x^2+1}\\) 并求其值。","hint":"先拆成 \\(\\int_0^1+\\int_1^\\infty\\) 或用 \\(\\arctan\\) 取极限。","ans":"\\(\\lim_{b\\to\\infty}\\int_0^b\\frac{\\mathrm{d}x}{1+x^2}=\\lim_{b\\to\\infty}\\arctan b=\\frac\\pi2\\)，收敛且值为 \\(\\frac\\pi2\\)。"}
 ]
}
