# -*- coding: utf-8 -*-
CHAPTER = {
 "id":"ch21","no":21,"volume":2,
 "title":"重积分","en":"Multiple Integrals","sym":"∬",
 "desc":"二重/三重积分的概念、化累次积分计算、极坐标与换元公式及应用。",
 "intro":r"""一重积分算“长度上的累积”（面积），**二重积分**算“面积上的累积”（体积）：把区域切成小方块，每块乘上函数值再求和取极限。它同样有两种“性格”：作为黎曼和的极限（定义），以及化为**累次积分**计算（先对 \(y\) 再对 \(x\)，像切面包片一样先算每片再叠加）。

本章关键在“**把区域描述清楚**”：\(x\)-型区域 \(a\le x\le b,\ y_1(x)\le y\le y_2(x)\) 先 \(y\) 后 \(x\)；必要时交换积分次序；圆域换**极坐标**。互动演示把“先切片后累积”两步走可视化：竖线切片的内层积分形成曲线，外层积分再把它下面的面积累积起来。""",
 "sections":[
  {"id":"s1","title":"二重积分的概念与性质","sub":"黎曼和的二维版","blocks":[
   {"t":"def","tag":"定义 21.1","title":"二重积分","x":r"""设 \(f(x,y)\) 在有界闭区域 \(D\) 上有定义。把 \(D\) 分割成若干小区域 \(\Delta\sigma_i\)（面积仍记 \(\Delta\sigma_i\)，直径最大值 \(\lambda\to0\)），任取 \((\xi_i,\eta_i)\in\Delta\sigma_i\)，作和 \(\sum f(\xi_i,\eta_i)\Delta\sigma_i\)。若极限存在且与分割、取点无关，称 \(f\) 在 \(D\) 上可积：

$$\iint_D f(x,y)\,\mathrm{d}\sigma=\lim_{\lambda\to0}\sum_i f(\xi_i,\eta_i)\Delta\sigma_i.$$

几何：\(f\ge0\) 时是以 \(D\) 为底、\(z=f\) 为顶的曲顶柱体体积。连续函数在有界闭区域上必可积。"""},
   {"t":"thm","tag":"定理 21.1","title":"二重积分的基本性质","x":r"""线性、区域可加性（\(D=D_1\cup D_2\) 不重叠则积分相加）、保序性、估值与**中值定理**（\(f\) 连续时存在 \((\xi,\eta)\in D\) 使 \(\iint_D f=f(\xi,\eta)\cdot S_D\)，\(S_D\) 为面积）都与一重积分平行。特别地 \(\iint_D1\,\mathrm{d}\sigma=\) 区域 \(D\) 的面积。"""},
   {"t":"quote","title":"为什么叫“二重”？","x":r"""“二重”指积分区域是二维的，不是“积两次”。它严格的定义是二维黎曼和的极限；只是计算时通常化成两次一重积分（累次积分）。几何上：一重积分求面积，二重积分求体积，三重积分求“四维超体积”（物理中常表示质量等）。"""}
  ]},
  {"id":"s2","title":"二重积分的计算","sub":"化累次积分、换序、极坐标","blocks":[
   {"t":"thm","tag":"定理 21.2","title":"化累次积分（直角坐标）","x":r"""**\(x\)-型区域** \(D=\{(x,y): a\le x\le b,\ y_1(x)\le y\le y_2(x)\}\)：

$$\iint_D f(x,y)\mathrm{d}x\mathrm{d}y=\int_a^b\left[\int_{y_1(x)}^{y_2(x)}f(x,y)\,\mathrm{d}y\right]\mathrm{d}x.$$

**\(y\)-型区域**同理先 \(x\) 后 \(y\)。口诀：先积的变量其上下限可以是外层变量的函数，外层上下限是常数。画图定限是基本功。"""},
   {"t":"note","title":"交换积分次序","x":r"""若给定次序难积（如 \(\int_0^1\int_x^1\mathrm{e}^{y^2}\mathrm{d}y\mathrm{d}x\) 内层积不出），可**交换次序**：先把区域按另一型重新描述。上例区域 \(0\le x\le1,\ x\le y\le1\) 即 \(0\le y\le1,\ 0\le x\le y\)，交换后 \(\int_0^1\int_0^y\mathrm{e}^{y^2}\mathrm{d}x\mathrm{d}y=\int_0^1y\mathrm{e}^{y^2}\mathrm{d}y=\frac{\mathrm{e}-1}{2}\)。"""},
   {"t":"thm","tag":"定理 21.3","title":"极坐标换元","x":r"""\(x=r\cos\theta,\ y=r\sin\theta\)，雅可比 \(=r\)，故

$$\iint_D f(x,y)\mathrm{d}x\mathrm{d}y=\iint_{D'} f(r\cos\theta,r\sin\theta)\,r\,\mathrm{d}r\mathrm{d}\theta.$$

**别忘了多乘一个 \(r\)**（它是小扇形的面积元 \(\mathrm{d}\sigma=r\mathrm{d}r\mathrm{d}\theta\)）。圆域、含 \(x^2+y^2\) 的被积函数优先用极坐标。例：\(\iint_{x^2+y^2\le R^2}\mathrm{e}^{-(x^2+y^2)}\mathrm{d}x\mathrm{d}y=\int_0^{2\pi}\int_0^R\mathrm{e}^{-r^2}r\,\mathrm{d}r\mathrm{d}\theta=\pi(1-\mathrm{e}^{-R^2})\)。"""},
   {"t":"ex","tag":"例 21.1","title":"用对称性化简","x":r"""计算 \(\iint_D xy\,\mathrm{d}x\mathrm{d}y\)，\(D\) 为单位圆盘。""","ans":r"""\(D\) 关于 \(x\) 轴与 \(y\) 轴都对称，\(xy\) 关于 \(x\)（或 \(y\)）是奇函数，故积分为 0。"""}
  ]},
  {"id":"s3","title":"三重积分与应用","sub":"柱面坐标、球面坐标与重积分应用","blocks":[
   {"t":"def","tag":"定义 21.2","title":"三重积分","x":r"""\(\iiint_\Omega f(x,y,z)\mathrm{d}V\) 是三维黎曼和的极限。**化累次积分**：\(\Omega=\{(x,y):(x,y)\in D,\ z_1(x,y)\le z\le z_2(x,y)\}\) 时，\(\iiint_\Omega f=\iint_D\left[\int_{z_1}^{z_2}f\,\mathrm{d}z\right]\mathrm{d}x\mathrm{d}y\)（“先一后二”）。"""},
   {"t":"def","tag":"定义 21.3","title":"柱面坐标与球面坐标","x":r"""**柱面坐标** \((r,\theta,z)\)：\(x=r\cos\theta,\ y=r\sin\theta,\ z=z\)，体积元 \(\mathrm{d}V=r\mathrm{d}r\mathrm{d}\theta\mathrm{d}z\)。

**球面坐标** \((r,\theta,\varphi)\)：\(x=r\sin\varphi\cos\theta,\ y=r\sin\varphi\sin\theta,\ z=r\cos\varphi\)，体积元 \(\mathrm{d}V=r^2\sin\varphi\,\mathrm{d}r\mathrm{d}\theta\mathrm{d}\varphi\)。

含 \(x^2+y^2\)、圆柱/圆锥域用柱面坐标；含 \(x^2+y^2+z^2\)、球域用球面坐标。一般换元公式：\(\mathrm{d}x\mathrm{d}y=|J|\mathrm{d}u\mathrm{d}v\)（\(J\) 为雅可比行列式），一重到三重统一。"""},
   {"t":"note","title":"重积分的应用","x":r"""- **体积**：\(V=\iiint_\Omega\mathrm{d}V\)（或曲顶柱体 \(\iint_D[f_2-f_1]\)）；
- **平面区域面积**：\(S=\iint_D\mathrm{d}x\mathrm{d}y\)；
- **质量**：\(m=\iiint_\Omega\rho(x,y,z)\mathrm{d}V\)（面密度/线密度类似）；
- **重心**：\(\bar x=\frac{1}{m}\iiint x\rho\,\mathrm{d}V\) 等；
- **转动惯量**：\(I_z=\iiint(x^2+y^2)\rho\,\mathrm{d}V\)。"""}
  ]}
 ],
 "summary":r"""**本章小结**

1. 二重积分 = 二维黎曼和极限；连续 ⇒ 可积；性质与一重平行。
2. 计算：画区域 → 判定型（\(x\)-型/\(y\)-型）→ 化累次积分；积不出就**交换次序**；圆域用极坐标（乘 \(r\)）。
3. 三重积分：先一后二（截面法）或先二后一；柱面坐标 \(r\)、球面坐标 \(r^2\sin\varphi\)。
4. 应用：面积/体积/质量/重心/转动惯量，本质都是“微元乘密度再积分”。

**常见误区**
- 极坐标忘乘 \(r\)、球坐标忘乘 \(r^2\sin\varphi\)。
- 累次积分上下限写反或外层上限含内层变量。
- 交换次序不重新画区域，凭感觉换限。
- 利用对称性时函数奇偶与区域对称不匹配（奇函数在对称区域积分为 0，偶函数为一半的两倍）。""",
 "exercises":[
  {"t":"choice","q":"\\(\\iint_D1\\,\\mathrm{d}x\\mathrm{d}y\\)（\\(D\\) 为单位圆盘）等于？","opts":["\\(\\pi\\)","\\(2\\pi\\)","\\(1\\)","\\(\\frac\\pi2\\)"],"ans":0,"why":"\\(\\iint_D1\\) 即区域面积，单位圆面积为 \\(\\pi\\)。"},
  {"t":"choice","q":"极坐标下 \\(\\iint_D\\mathrm{d}x\\mathrm{d}y\\) 的面积元是？","opts":["\\(r\\,\\mathrm{d}r\\mathrm{d}\\theta\\)","\\(\\mathrm{d}r\\mathrm{d}\\theta\\)","\\(r^2\\mathrm{d}r\\mathrm{d}\\theta\\)","\\(r\\mathrm{d}r\\mathrm{d}\\theta^2\\)"],"ans":0,"why":"雅可比行列式 \\(=r\\)，面积元 \\(\\mathrm{d}\\sigma=r\\mathrm{d}r\\mathrm{d}\\theta\\)。"},
  {"t":"tf","q":"\\(\\iint_{x^2+y^2\\le a^2}x\\,\\mathrm{d}x\\mathrm{d}y=0\\)。","opts":["正确","错误"],"ans":0,"why":"\\(x\\) 关于 \\(y\\) 轴是奇函数，圆盘关于 \\(y\\) 轴对称，积分为 0。"},
  {"t":"choice","q":"化累次积分 \\(\\int_0^1\\int_{x^2}^x f(x,y)\\mathrm{d}y\\mathrm{d}x\\) 交换次序后，\\(y\\) 的范围是？","opts":["\\(0\\le y\\le1\\) 且 \\(y\\le x\\le\\sqrt y\\)","\\(x^2\\le y\\le x\\)","\\(0\\le x\\le1\\)","\\(0\\le y\\le x^2\\)"],"ans":0,"why":"区域 \\(0\\le x\\le1\\)、\\(x^2\\le y\\le x\\) 可改写为 \\(0\\le y\\le1\\)、\\(y\\le x\\le\\sqrt y\\)。"},
  {"t":"calc","q":"计算 \\(\\iint_D xy\\,\\mathrm{d}x\\mathrm{d}y\\)，\\(D=\\{0\\le x\\le1,\\ 0\\le y\\le1\\}\\)。","hint":"\\(\\int_0^1x\\mathrm{d}x\\cdot\\int_0^1y\\mathrm{d}y\\)（可分离变量）。","ans":"\\(\\iint_D xy\\,\\mathrm{d}x\\mathrm{d}y=\\int_0^1x\\mathrm{d}x\\int_0^1y\\mathrm{d}y=\\frac12\\cdot\\frac12=\\frac14\\)。"},
  {"t":"calc","q":"计算 \\(\\iint_D(x^2+y^2)\\mathrm{d}x\\mathrm{d}y\\)，\\(D\\)：\\(x^2+y^2\\le1\\)。","hint":"极坐标。","ans":"\\(\\int_0^{2\\pi}\\int_0^1r^2\\cdot r\\mathrm{d}r\\mathrm{d}\\theta=2\\pi\\cdot\\frac14=\\frac\\pi2\\)。"},
  {"t":"calc","q":"求由抛物面 \\(z=x^2+y^2\\) 与平面 \\(z=1\\) 所围立体的体积。","hint":"\\(V=\\iint_{x^2+y^2\\le1}[1-(x^2+y^2)]\\mathrm{d}x\\mathrm{d}y\\)。","ans":"极坐标：\\(V=\\int_0^{2\\pi}\\int_0^1(1-r^2)r\\mathrm{d}r\\mathrm{d}\\theta=2\\pi[\\frac{r^2}{2}-\\frac{r^4}{4}]_0^1=\\frac\\pi2\\)。"},
  {"t":"calc","q":"用球面坐标计算 \\(\\iiint_\\Omega(x^2+y^2+z^2)\\mathrm{d}V\\)，\\(\\Omega\\)：\\(x^2+y^2+z^2\\le R^2\\)。","hint":"球面坐标下 \\(x^2+y^2+z^2=r^2\\)，体积元 \\(r^2\\sin\\varphi\\)。","ans":"\\(\\int_0^{2\\pi}\\int_0^\\pi\\int_0^R r^2\\cdot r^2\\sin\\varphi\\,\\mathrm{d}r\\mathrm{d}\\varphi\\mathrm{d}\\theta=2\\pi\\cdot2\\cdot\\frac{R^5}{5}=\\frac{4\\pi R^5}{5}\\)。"}
 ]
}
