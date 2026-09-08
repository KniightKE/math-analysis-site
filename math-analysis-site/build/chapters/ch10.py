# -*- coding: utf-8 -*-
CHAPTER = {
 "id":"ch10","no":10,"volume":2,
 "title":"定积分的应用","en":"Applications of Definite Integrals","sym":"⌒",
 "desc":"微元法：平面面积、旋转体体积、曲线弧长与变力做功的统一思想。",
 "intro":r"""定积分能算的不只是面积。只要某个量“在小区间上近似等于 \(f(x)\Delta x\)，且误差是 \(\Delta x\) 的高阶无穷小”，就可以用 \(\int f(x)\,\mathrm{d}x\) 精确表示。这套“**微元法**”（元素法）把面积、体积、弧长、功、压力等统统纳入同一框架：

1. **分割**：把整体切成小段；
2. **近似**：每一小段上，把所求量近似为 \(f(x)\Delta x\)（微元 \(\mathrm{d}A=f(x)\mathrm{d}x\)）；
3. **求和取极限**：得到定积分。

学完本章你会看到：物理与几何里那些“看起来不同”的公式，其实是同一个思想。""",
 "sections":[
  {"id":"s1","title":"平面图形的面积","sub":"直角坐标与极坐标","blocks":[
   {"t":"def","tag":"公式 10.1","title":"直角坐标下的面积","x":r"""由曲线 \(y=f(x)\)、\(y=g(x)\)（\(f\ge g\)）与 \(x=a\)、\(x=b\) 围成的图形面积：

$$A=\int_a^b[f(x)-g(x)]\,\mathrm{d}x.$$

微元观点：竖条面积 \(\mathrm{d}A=[f(x)-g(x)]\mathrm{d}x\)，把 \(x\) 从 \(a\) 积到 \(b\)。“谁在上谁在下”决定了被减顺序。"""},
   {"t":"def","tag":"公式 10.2","title":"极坐标下的面积","x":r"""极坐标曲线 \(r=r(\theta)\)（\(\alpha\le\theta\le\beta\)）与射线围成的扇形面积：

$$A=\frac12\int_\alpha^\beta r(\theta)^2\,\mathrm{d}\theta.$$

微元是“小扇形” \(\mathrm{d}A=\frac12r^2\mathrm{d}\theta\)。例如心形线 \(r=a(1+\cos\theta)\) 面积 \(=\frac{3\pi a^2}{2}\)。"""},
   {"t":"ex","tag":"例 10.1","title":"求两曲线围成的面积","x":r"""求抛物线 \(y=x^2\) 与直线 \(y=x\) 围成的面积。""","ans":r"""交点 \(x^2=x\) 得 \(x=0,1\)，在 \([0,1]\) 上 \(x\ge x^2\)，故 \(A=\int_0^1(x-x^2)\mathrm{d}x=[\frac{x^2}{2}-\frac{x^3}{3}]_0^1=\frac16\)。"""}
  ]},
  {"id":"s2","title":"旋转体体积与平面曲线弧长","sub":"旋转体、截面法、弧长公式","blocks":[
   {"t":"def","tag":"公式 10.3","title":"旋转体体积","x":r"""曲线 \(y=f(x)\ge0\)（\(a\le x\le b\)）绕 \(x\) 轴旋转所得旋转体体积：

$$V=\pi\int_a^b f(x)^2\,\mathrm{d}x\quad(\text{垫圈法：微元为薄圆盘}\ \mathrm{d}V=\pi f^2\mathrm{d}x).$$

曲线绕 \(y\) 轴旋转（\(x=\varphi(y)\)）：\(V=\pi\int_c^d \varphi(y)^2\mathrm{d}y\)。若绕 \(y\) 轴且用 \(x\) 表示，可用**柱壳法** \(V=2\pi\int_a^b x f(x)\mathrm{d}x\)。已知截面面积 \(A(x)\) 的立体体积为 \(V=\int_a^b A(x)\mathrm{d}x\)。"""},
   {"t":"def","tag":"公式 10.4","title":"平面曲线弧长","x":r"""**直角坐标**：\(y=f(x)\)（\(a\le x\le b\)）的弧长

$$s=\int_a^b\sqrt{1+[f'(x)]^2}\,\mathrm{d}x.$$

**参数方程** \(x=x(t),\ y=y(t)\)：\(s=\int_\alpha^\beta\sqrt{x'(t)^2+y'(t)^2}\,\mathrm{d}t\)。**极坐标** \(r=r(\theta)\)：\(s=\int\sqrt{r^2+r'^2}\,\mathrm{d}\theta\)。

弧长公式的来源就是把曲线切成小段，每段用“直角三角形的斜边”近似：\(\mathrm{d}s=\sqrt{(\mathrm{d}x)^2+(\mathrm{d}y)^2}\)。到互动演示里用折线逼近弧长，理解 \(\mathrm{d}s\)。"""},
   {"t":"ex","tag":"例 10.2","title":"求旋转体体积","x":r"""求 \(y=\sqrt{x}\)（\(0\le x\le1\)）绕 \(x\) 轴旋转所得体积。""","ans":r"""\(V=\pi\int_0^1(\sqrt{x})^2\mathrm{d}x=\pi\int_0^1x\,\mathrm{d}x=\frac\pi2\)。"""}
  ]},
  {"id":"s3","title":"物理应用举例","sub":"变力做功与平均值","blocks":[
   {"t":"def","tag":"公式 10.5","title":"变力做功","x":r"""物体沿 \(x\) 轴从 \(a\) 移动到 \(b\)，所受外力 \(F(x)\)（沿运动方向），做功

$$W=\int_a^b F(x)\,\mathrm{d}x.$$

例如弹簧从自然长度拉长 \(l\)（\(F=kx\)，胡克定律）：\(W=\int_0^l kx\,\mathrm{d}x=\frac12kl^2\)。微元 \(\mathrm{d}W=F(x)\mathrm{d}x\)。液体对竖直平面压力、细杆质量、曲线型构件的质量等问题同理，关键是写对“微元”。"""},
   {"t":"def","tag":"定义 10.1","title":"连续函数的平均值","x":r"""\(f\) 在 \([a,b]\) 上的**平均值**定义为

$$\bar f=\frac{1}{b-a}\int_a^b f(x)\,\mathrm{d}x.$$

它由积分中值定理而来：连续函数在区间上必取到其平均值。"""},
   {"t":"note","title":"微元法检查清单","x":r"""① 明确自变量与变化区间；② 写出小区间上所求量的**近似** \(f(x)\Delta x\)（要说明误差是 \(\Delta x\) 的高阶无穷小）；③ 积分。若近似式写错（如漏掉 \(\pi\)、\(2\pi\)、\(\frac12\) 等系数），结果必错；写完可用量纲或特殊情形自检。"""}
  ]}
 ],
 "summary":r"""**本章小结**

1. 面积：\(\int[f-g]\)（直角）、\(\frac12\int r^2\mathrm{d}\theta\)（极坐标）。
2. 体积：旋转体用薄圆盘/垫圈 \(\pi\int f^2\) 或柱壳 \(2\pi\int xf\)；一般立体用截面法 \(\int A(x)\)。
3. 弧长：\(\int\sqrt{1+y'^2}\mathrm{d}x\)；参数/极坐标各有对应式，本质都是 \(\int\mathrm{d}s\)。
4. 变力做功 \(W=\int F\mathrm{d}x\)；平均值 \(\bar f=\frac1{b-a}\int f\)。

**常见误区**
- 面积忘判断上下位置（\(f-g\) 可能为负）；极坐标面积系数 \(\frac12\) 漏写。
- 旋转体绕 \(y\) 轴时误用绕 \(x\) 轴公式；垫圈法内外半径写反。
- 弧长用 \(\int\sqrt{1+(y')^2}\)，不是 \(\int\sqrt{1+y'}\)，也不是直接 \(\int\mathrm{d}y\)。""",
 "exercises":[
  {"t":"choice","q":"曲线 \\(y=x^2\\) 与 \\(y=x\\) 所围面积是？","opts":["\\(\\frac16\\)","\\(\\frac13\\)","\\(\\frac12\\)","\\(1\\)"],"ans":0,"why":"\\(\\int_0^1(x-x^2)\\mathrm{d}x=\\frac16\\)。"},
  {"t":"tf","q":"\\(y=\\sin x\\)（\\(0\\le x\\le\\pi\\)）绕 \\(x\\) 轴旋转所得体积为 \\(\\pi\\int_0^\\pi\\sin^2x\\,\\mathrm{d}x\\)。","opts":["正确","错误"],"ans":0,"why":"由薄圆盘法 \\(V=\\pi\\int f(x)^2\\mathrm{d}x\\)，正确。计算得 \\(\\frac{\\pi^2}{2}\\)。"},
  {"t":"choice","q":"曲线 \\(y=x^{3/2}\\)（\\(0\\le x\\le4\\)）的弧长表达式是？","opts":["\\(\\int_0^4\\sqrt{1+\\frac94x}\\,\\mathrm{d}x\\)","\\(\\int_0^4\\sqrt{1+x^3}\\,\\mathrm{d}x\\)","\\(\\int_0^4(1+\\frac94x)\\mathrm{d}x\\)","\\(\\int_0^4\\sqrt{1+\\frac32\\sqrt{x}}\\mathrm{d}x\\)"],"ans":0,"why":"\\(y'=\\frac32x^{1/2}\\)，\\((y')^2=\\frac94x\\)，弧长 \\(=\\int_0^4\\sqrt{1+\\frac94x}\\,\\mathrm{d}x\\)。"},
  {"t":"tf","q":"极坐标 \\(r=\\sin\\theta\\)（\\(0\\le\\theta\\le\\pi\\)）围成图形的面积等于 \\(\\frac12\\int_0^\\pi\\sin^2\\theta\\,\\mathrm{d}\\theta\\)。","opts":["正确","错误"],"ans":0,"why":"极坐标面积公式 \\(A=\\frac12\\int r^2\\mathrm{d}\\theta\\)。该图形是直径为 1 的圆，面积 \\(\\frac\\pi8\\)。"},
  {"t":"calc","q":"求由 \\(y=\\mathrm{e}^x\\)、\\(y=\\mathrm{e}^{-x}\\) 与 \\(x=1\\) 所围图形的面积。","hint":"\\(\\mathrm{e}^x\\ge\\mathrm{e}^{-x}\\) 当 \\(x\\ge0\\)。","ans":"\\(A=\\int_0^1(\\mathrm{e}^x-\\mathrm{e}^{-x})\\mathrm{d}x=[\\mathrm{e}^x+\\mathrm{e}^{-x}]_0^1=\\mathrm{e}+\\mathrm{e}^{-1}-2\\)。"},
  {"t":"calc","q":"求圆盘 \\(x^2+(y-b)^2\\le a^2\\)（\\(b>a\\)）绕 \\(x\\) 轴旋转所得圆环体的体积。","hint":"用垫圈法，外半径 \\(b+\\sqrt{a^2-x^2}\\)、内半径 \\(b-\\sqrt{a^2-x^2}\\)。","ans":"\\(V=\\pi\\int_{-a}^{a}[(b+\\sqrt{a^2-x^2})^2-(b-\\sqrt{a^2-x^2})^2]\\mathrm{d}x=4\\pi b\\int_{-a}^a\\sqrt{a^2-x^2}\\mathrm{d}x=4\\pi b\\cdot\\frac{\\pi a^2}{2}=2\\pi^2a^2b\\)。"},
  {"t":"calc","q":"求曲线 \\(y=\\frac23x^{3/2}\\) 从 \\(x=0\\) 到 \\(x=3\\) 的弧长。","hint":"\\(y'=x^{1/2}\\)。","ans":"\\(s=\\int_0^3\\sqrt{1+x}\\,\\mathrm{d}x=[\\frac23(1+x)^{3/2}]_0^3=\\frac23(8-1)=\\frac{14}{3}\\)。"},
  {"t":"calc","q":"弹簧从自然长度拉长 0.2 m 需做功 \\(W\\)（弹性系数 \\(k=100\\) N/m），求 \\(W\\)。","hint":"\\(F=kx\\)，\\(W=\\int_0^{0.2}kx\\,\\mathrm{d}x\\)。","ans":"\\(W=\\int_0^{0.2}100x\\,\\mathrm{d}x=50x^2\\big|_0^{0.2}=50\\times0.04=2\\) 焦耳。"}
 ]
}
