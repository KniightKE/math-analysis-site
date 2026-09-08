# -*- coding: utf-8 -*-
CHAPTER = {
 "id":"ch19","no":19,"volume":2,
 "title":"含参量积分","en":"Integrals Depending on a Parameter","sym":"Γ",
 "desc":"含参量定积分与反常积分的连续性、可积性、可导性，以及 Γ、B 函数。",
 "intro":r"""积分 \(\int_a^b f(x,y)\mathrm{d}x\) 的结果通常还依赖参数 \(y\)，于是得到一个**以参数为变量的函数** \(F(y)\)。这类“含参量积分”在数学物理中无处不在（如 \(\Gamma\) 函数、傅里叶变换）。问题自然产生：\(F(y)\) 是否连续？能否对 \(y\) 求导（把导数搬进积分号）？能否再对 \(y\) 积分（交换积分次序）？

答案与第十三章如出一辙：需要某种“一致”条件。对正常积分，只要被积函数连续，诸性质都成立；对反常积分，则要求**一致收敛**。本课程用“控制收敛”的思想统一处理：找到一个与参数无关的可积控制函数，就能放心地交换极限、积分与导数。""",
 "sections":[
  {"id":"s1","title":"含参量正常积分","sub":"连续性、可导性（莱布尼茨公式）","blocks":[
   {"t":"thm","tag":"定理 19.1","title":"连续性（积分号内取极限）","x":r"""设 \(f(x,y)\) 在矩形 \([a,b]\times[c,d]\) 上连续，则 \(F(y)=\int_a^b f(x,y)\mathrm{d}x\) 在 \([c,d]\) 上连续，即

$$\lim_{y\to y_0}\int_a^b f(x,y)\mathrm{d}x=\int_a^b f(x,y_0)\mathrm{d}x.$$

直观：\(f\) 在闭矩形上**一致连续**，所以 \(y\) 的小变化带来 \(f\) 的整体小变化，积分也随之小变化。"""},
   {"t":"thm","tag":"定理 19.2","title":"可导性（莱布尼茨公式）","x":r"""若 \(f\) 与 \(f_y\) 在矩形上连续，则 \(F(y)\) 可导且

$$F'(y)=\int_a^b f_y(x,y)\,\mathrm{d}x.$$

若上下限也依赖 \(y\)：\(F(y)=\int_{a(y)}^{b(y)}f(x,y)\mathrm{d}x\)，则

$$F'(y)=f(b(y),y)b'(y)-f(a(y),y)a'(y)+\int_{a(y)}^{b(y)}f_y(x,y)\mathrm{d}x.$$

（把“变限积分求导 + 莱布尼茨公式”结合。）"""},
   {"t":"ex","tag":"例 19.1","title":"先导后积算积分","x":r"""求 \(I(a)=\int_0^1\frac{x^a-1}{\ln x}\mathrm{d}x\)（\(a>-1\)）。""","ans":r"""对参数 \(a\) 求导（被积函数及其对 \(a\) 的偏导连续）：\(I'(a)=\int_0^1x^a\mathrm{d}x=\frac{1}{a+1}\)。又 \(I(0)=0\)，积分得 \(I(a)=\ln(a+1)\)。"""}
  ]},
  {"id":"s2","title":"含参量反常积分的一致收敛","sub":"控制收敛的思想","blocks":[
   {"t":"def","tag":"定义 19.1","title":"含参量反常积分的一致收敛","x":r"""对 \(\int_a^{+\infty}f(x,y)\mathrm{d}x\)，若对任意 \(\varepsilon>0\)，存在与 \(y\) 无关的 \(N\)，使当 \(A,B>N\) 时对一切 \(y\) 有 \(\left|\int_A^B f(x,y)\mathrm{d}x\right|<\varepsilon\)，则称该积分在 \(y\) 的范围内**一致收敛**。直观：余尾（任意长的远段）能对全体 \(y\) 统一地压到任意小。"""},
   {"t":"thm","tag":"定理 19.3","title":"M-判别法与性质","x":r"""若存在与 \(y\) 无关的非负 \(g(x)\)，使 \(|f(x,y)|\le g(x)\) 且 \(\int_a^{+\infty}g(x)\mathrm{d}x\) 收敛，则 \(\int_a^{+\infty}f(x,y)\mathrm{d}x\) 一致收敛（魏尔斯特拉斯 M-判别）。

在一致收敛 + 被积函数连续（或 \(f_y\) 连续且对应积分一致收敛）的条件下，含参量反常积分同样可**取极限、逐项积分（换序）、对参数求导**。这些性质与第十三章函数项级数的定理完全平行。"""},
   {"t":"def","tag":"定义 19.2","title":"Γ 函数与 B 函数","x":r"""**伽马函数** \(\Gamma(s)=\int_0^{+\infty}x^{s-1}\mathrm{e}^{-x}\mathrm{d}x\)（\(s>0\)）。性质：\(\Gamma(s+1)=s\Gamma(s)\)，故 \(\Gamma(n+1)=n!\)；\(\Gamma(\frac12)=\sqrt\pi\)。

**贝塔函数** \(B(p,q)=\int_0^1x^{p-1}(1-x)^{q-1}\mathrm{d}x\)（\(p,q>0\)）。关系：\(B(p,q)=\frac{\Gamma(p)\Gamma(q)}{\Gamma(p+q)}\)。它们把阶乘、二项式积分等推广到连续参数，是含参量积分最重要的例子。"""},
   {"t":"ex","tag":"例 19.2","title":"用 Γ 函数计算积分","x":r"""计算 \(\int_0^{+\infty}\mathrm{e}^{-x^2}\mathrm{d}x\)。""","ans":r"""令 \(t=x^2\)，\(\mathrm{d}x=\frac12t^{-1/2}\mathrm{d}t\)：原式 \(=\frac12\int_0^\infty t^{-1/2}\mathrm{e}^{-t}\mathrm{d}t=\frac12\Gamma(\frac12)=\frac{\sqrt\pi}{2}\)。"""}
  ]}
 ],
 "summary":r"""**本章小结**

1. 含参量正常积分：被积函数连续 ⇒ 积分结果连续；\(f_y\) 连续 ⇒ 可对参数求导（莱布尼茨公式），导数搬进积分号。
2. 含参量反常积分：需要**一致收敛**才能交换极限/积分/导数；M-判别法是最常用工具。
3. Γ 函数：\(\Gamma(s+1)=s\Gamma(s)\)、\(\Gamma(n+1)=n!\)、\(\Gamma(\frac12)=\sqrt\pi\)；B 函数与 Γ 通过 \(B(p,q)=\frac{\Gamma(p)\Gamma(q)}{\Gamma(p+q)}\) 联系。
4. 思想主线：**找一个与参数无关的控制函数，把“一致”性质转化为可交换性**。

**常见误区**
- 对反常含参量积分直接“把导数搬进积分号”，没验证一致收敛。
- 忘记莱布尼茨公式中上下限求导的两项。
- \(\Gamma\) 的递推方向搞反：是 \(\Gamma(s+1)=s\Gamma(s)\)（不是 \(\Gamma(s)=(s+1)\Gamma(s+1)\)）。""",
 "exercises":[
  {"t":"choice","q":"\\(\\Gamma(n+1)\\)（\\(n\\) 为正整数）等于？","opts":["\\(n!\\)","\\(n\\)","\\((n+1)!\\)","\\(\\sqrt\\pi\\)"],"ans":0,"why":"由 \\(\\Gamma(s+1)=s\\Gamma(s)\\) 递推得 \\(\\Gamma(n+1)=n!\\)。"},
  {"t":"tf","q":"含参量反常积分只要对每个参数值收敛，就能对参数求导并交换求导与积分。","opts":["正确","错误"],"ans":1,"why":"逐点收敛不够，需要一致收敛（或控制函数）才能交换。"},
  {"t":"choice","q":"\\(\\Gamma(\\frac12)=\\)？","opts":["\\(\\sqrt\\pi\\)","\\(\\frac{\\sqrt\\pi}{2}\\)","\\(\\pi\\)","\\(1\\)"],"ans":0,"why":"由高斯积分 \\(\\int_0^\\infty\\mathrm{e}^{-x^2}\\mathrm{d}x=\\frac{\\sqrt\\pi}{2}\\) 换元可得 \\(\\Gamma(\\frac12)=\\sqrt\\pi\\)。"},
  {"t":"tf","q":"若 \\(f(x,y)\\) 在矩形上连续，则 \\(F(y)=\\int_a^b f(x,y)\\mathrm{d}x\\) 是 \\(y\\) 的连续函数。","opts":["正确","错误"],"ans":0,"why":"闭矩形上连续 ⇒ 一致连续，可交换极限与积分。"},
  {"t":"calc","q":"求 \\(F'(y)\\)，其中 \\(F(y)=\\int_0^1\\sin(xy)\\mathrm{d}x\\)（两种方法：先积后导，或莱布尼茨公式）。","hint":"\\(\\frac{\\partial}{\\partial y}\\sin(xy)=x\\cos(xy)\\)。","ans":"\\(F'(y)=\\int_0^1x\\cos(xy)\\mathrm{d}x=[\\frac{x\\sin(xy)}{y}+\\frac{\\cos(xy)}{y^2}]_0^1=\\frac{\\sin y}{y}+\\frac{\\cos y-1}{y^2}\\)（\\(y\\ne0\\)；\\(y=0\\) 时 \\(F'(0)=\\frac12\\)）。"},
  {"t":"calc","q":"求 \\(F(y)=\\int_0^{+\\infty}\\mathrm{e}^{-yx}\\mathrm{d}x\\)（\\(y>0\\)）并验证 \\(F'(y)=-\\int_0^\\infty x\\mathrm{e}^{-yx}\\mathrm{d}x\\)。","hint":"先直接算出 \\(F(y)=1/y\\)。","ans":"\\(F(y)=[-\\frac1y\\mathrm{e}^{-yx}]_0^\\infty=\\frac1y\\)，故 \\(F'(y)=-\\frac1{y^2}\\)。而 \\(\\int_0^\\infty x\\mathrm{e}^{-yx}\\mathrm{d}x=\\frac1{y^2}\\)（分部积分），一致收敛性允许交换，结论相符。"},
  {"t":"calc","q":"计算 \\(\\int_0^{+\\infty}\\frac{\\mathrm{d}x}{1+x^2}\\) 是否等于 \\(\\frac\\pi2\\)，并指出它可作为 \\(B\\) 函数哪种特例。","hint":"令 \\(x=\\tan t\\)；或与 \\(B(\\frac12,\\frac12)\\) 联系。","ans":"\\(\\int_0^\\infty\\frac{\\mathrm{d}x}{1+x^2}=\\lim_{b\\to\\infty}\\arctan b=\\frac\\pi2\\)。令 \\(x=\\frac{t}{1-t}\\) 可化为 \\(B(\\frac12,\\frac12)=\\frac{\\Gamma(\\frac12)^2}{\\Gamma(1)}=\\pi\\) 的一半。"},
  {"t":"calc","q":"利用 \\(\\Gamma\\) 函数计算 \\(\\int_0^{+\\infty}x^3\\mathrm{e}^{-x}\\mathrm{d}x\\)。","hint":"即 \\(\\Gamma(4)\\)。","ans":"\\(\\int_0^\\infty x^3\\mathrm{e}^{-x}\\mathrm{d}x=\\Gamma(4)=3!=6\\)。"}
 ]
}
