# -*- coding: utf-8 -*-
CHAPTER = {
 "id":"ch20","no":20,"volume":2,
 "title":"曲线积分","en":"Line Integrals","sym":"∮",
 "desc":"第一类（对弧长）与第二类（对坐标）曲线积分，格林公式与积分路径无关性。",
 "intro":r"""积分从直线段走向曲线，就产生**曲线积分**。它有两副面孔：

- **第一类**（对弧长）：积分元是“弧长 \(\mathrm{d}s\)”，与方向无关，用于求曲线型构件的质量、重心等，如 \(\int_C f(x,y)\,\mathrm{d}s\)；
- **第二类**（对坐标）：积分元是“位移的分量”，与方向有关，物理意义是**力沿曲线做的功**，如 \(\int_C P\mathrm{d}x+Q\mathrm{d}y\)。

第二类曲线积分与微积分基本定理的“高维版”——**格林公式**——紧密相连：平面闭曲线上的环量等于区域内某二重积分。互动演示里，绕保守场一圈做功为 0，绕旋转场一圈做功 \(2\pi r^2\)，一“转”便知分晓。""",
 "sections":[
  {"id":"s1","title":"第一类曲线积分（对弧长）","sub":"与方向无关的“质量积分”","blocks":[
   {"t":"def","tag":"定义 20.1","title":"第一类曲线积分","x":r"""设光滑曲线 \(C\) 有参数方程 \(\mathbf{r}(t)=(x(t),y(t))\)（\(\alpha\le t\le\beta\)），\(f(x,y)\) 在 \(C\) 上连续。将 \(C\) 分成小段，取 \(\Delta s_i\) 为弧长、\((\xi_i,\eta_i)\) 为段内点，作和 \(\sum f(\xi_i,\eta_i)\Delta s_i\)，取极限得

$$\int_C f(x,y)\,\mathrm{d}s=\int_\alpha^\beta f(x(t),y(t))\sqrt{x'(t)^2+y'(t)^2}\,\mathrm{d}t.$$

**与方向无关**：沿 \(C\) 反向积分值不变（\(\mathrm{d}s\) 是长度）。\(f=1\) 时即曲线弧长。"""},
   {"t":"ex","tag":"例 20.1","title":"计算对弧长的积分","x":r"""求 \(\int_C(x+y)\,\mathrm{d}s\)，其中 \(C\) 是圆 \(x^2+y^2=a^2\) 在第一象限的部分。""","ans":r"""参数化 \(x=a\cos t,\ y=a\sin t\)（\(0\le t\le\frac\pi2\)），\(\mathrm{d}s=a\,\mathrm{d}t\)。\(\int_0^{\pi/2}a(\cos t+\sin t)\cdot a\,\mathrm{d}t=a^2[\sin t-\cos t]_0^{\pi/2}=2a^2\)。"""}
  ]},
  {"id":"s2","title":"第二类曲线积分（对坐标）","sub":"力做的功","blocks":[
   {"t":"def","tag":"定义 20.2","title":"第二类曲线积分","x":r"""设 \(\mathbf{F}=(P(x,y),Q(x,y))\) 为平面向量场，沿曲线 \(C\)（参数 \(\mathbf{r}(t)\)，\(\alpha\le t\le\beta\)）的积分为

$$\int_C P\,\mathrm{d}x+Q\,\mathrm{d}y=\int_\alpha^\beta\left[P(x(t),y(t))x'(t)+Q(x(t),y(t))y'(t)\right]\mathrm{d}t.$$

物理意义：\(\mathbf{F}\) 是力，积分是沿 \(C\) 从起点到终点力所做的功 \(W=\int_C\mathbf{F}\cdot\mathrm{d}\mathbf{r}\)。**与方向有关**：反向积分变号。绕闭曲线一周的积分叫**环量**，记 \(\oint_C\)。"""},
   {"t":"note","title":"第一类与第二类的关系","x":r"""若 \(C\) 的单位切向量为 \(\mathbf{T}=(\cos\alpha,\cos\beta)\)，则 \(\mathrm{d}x=\cos\alpha\,\mathrm{d}s\)、\(\mathrm{d}y=\cos\beta\,\mathrm{d}s\)，故

$$\int_C P\mathrm{d}x+Q\mathrm{d}y=\int_C(P\cos\alpha+Q\cos\beta)\,\mathrm{d}s,$$

即第二类可化为第一类（点乘切向量）。互动演示中可观察：沿圆走一圈，径向场做功为 0（力与位移垂直），旋转场做功为 \(2\pi r^2\)。"""}
  ]},
  {"id":"s3","title":"格林公式与路径无关性","sub":"闭路环量 = 区域上的二重积分","blocks":[
   {"t":"thm","tag":"定理 20.1","title":"格林公式","x":r"""设 \(D\) 是由分段光滑闭曲线 \(C\) 围成的有界闭区域，\(P,Q\) 在 \(D\) 上有连续偏导数，则（\(C\) 取**正向**，即沿边界逆时针、区域在左手边）

$$\oint_C P\,\mathrm{d}x+Q\,\mathrm{d}y=\iint_D\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)\mathrm{d}x\,\mathrm{d}y.$$

它是微积分基本定理在平面上的推广：边界上的曲线积分 = 内部“旋度”的积分。用途：① 把难算的曲线积分化为二重积分；② 把难算的二重积分化为边界曲线积分；③ 计算区域面积 \(A=\frac12\oint_C x\mathrm{d}y-y\mathrm{d}x\)。"""},
   {"t":"thm","tag":"定理 20.2","title":"积分与路径无关（保守场）","x":r"""设 \(D\) 为单连通区域，\(P,Q\) 有连续偏导数。下列命题等价：

- \(\oint_C P\mathrm{d}x+Q\mathrm{d}y=0\) 对 \(D\) 内任意闭曲线成立（环量为 0）；
- 积分 \(\int_C P\mathrm{d}x+Q\mathrm{d}y\) 在 \(D\) 内与路径无关，只取决于起终点；
- 存在 \(D\) 上的函数 \(u(x,y)\)（势函数）使 \(\mathrm{d}u=P\mathrm{d}x+Q\mathrm{d}y\)，即 \(u_x=P,\ u_y=Q\)；
- \(\frac{\partial P}{\partial y}=\frac{\partial Q}{\partial x}\) 在 \(D\) 内处处成立。

求势函数：\(u(x,y)=\int_{(x_0,y_0)}^{(x,y)}P\mathrm{d}x+Q\mathrm{d}y\) 沿折线积分即可。"""},
   {"t":"ex","tag":"例 20.2","title":"验证保守场并求势函数","x":r"""对 \(\mathbf{F}=(2xy,\ x^2+\cos y)\)，验证积分与路径无关并求势函数。""","ans":r"""\(P_y=2x\)、\(Q_x=2x\)，相等，故保守。\(u_x=2xy\Rightarrow u=x^2y+\varphi(y)\)；由 \(u_y=x^2+\varphi'(y)=x^2+\cos y\) 得 \(\varphi'(y)=\cos y\)，取 \(\varphi=\sin y\)。故 \(u=x^2y+\sin y\)。"""}
  ]}
 ],
 "summary":r"""**本章小结**

1. 第一类曲线积分（对弧长 \(\mathrm{d}s\)）：参数化后代 \(\mathrm{d}s=\sqrt{x'^2+y'^2}\mathrm{d}t\)，与方向无关。
2. 第二类曲线积分（对坐标）：\(\int P\mathrm{d}x+Q\mathrm{d}y\)，做功，反向变号。
3. 格林公式：\(\oint_C P\mathrm{d}x+Q\mathrm{d}y=\iint_D(Q_x-P_y)\mathrm{d}x\mathrm{d}y\)。
4. 单连通区域内 \(P_y=Q_x\) ⇔ 与路径无关 ⇔ 存在势函数 ⇔ 闭路积分为 0。

**常见误区**
- 两类曲线积分混淆：一个乘 \(\mathrm{d}s\) 一个乘 \(\mathrm{d}x,\mathrm{d}y\)，方向性相反。
- 用格林公式时区域含“洞”（非单连通）或方向取反、\(P,Q\) 在某点无连续偏导（如 \((x\mathrm{d}y-y\mathrm{d}x)/(x^2+y^2)\) 绕原点）都需小心。
- 判断路径无关时只验 \(P_y=Q_x\) 却忽略区域单连通。""",
 "exercises":[
  {"t":"choice","q":"第一类曲线积分 \\(\\int_C f\\,\\mathrm{d}s\\) 与第二类 \\(\\int_C P\\mathrm{d}x+Q\\mathrm{d}y\\) 相比？","opts":["第一类与方向无关，第二类反向变号","两者都与方向无关","两者反向都变号","第二类与方向无关"],"ans":0,"why":"\\(\\mathrm{d}s\\) 是弧长元，无方向；\\(\\mathrm{d}x,\\mathrm{d}y\\) 随方向变号。"},
  {"t":"tf","q":"若 \\(P_y=Q_x\\) 在某区域内处处成立，则该区域内第二类曲线积分与路径无关。","opts":["正确","错误"],"ans":1,"why":"还需区域**单连通**且 \\(P,Q\\) 有连续偏导（如 \\((x\\mathrm{d}y-y\\mathrm{d}x)/(x^2+y^2)\\) 在去心圆盘内 \\(P_y=Q_x\\) 但绕原点一周积分为 \\(2\\pi\\)）。"},
  {"t":"choice","q":"格林公式中 \\(\\oint_C P\\mathrm{d}x+Q\\mathrm{d}y=\\iint_D(\\ \\ )\\mathrm{d}x\\mathrm{d}y\\)，括号内是？","opts":["\\(Q_x-P_y\\)","\\(P_x-Q_y\\)","\\(Q_y-P_x\\)","\\(P_y-Q_x\\)"],"ans":0,"why":"\\(\\oint P\\mathrm{d}x+Q\\mathrm{d}y=\\iint_D(\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y})\\mathrm{d}x\\mathrm{d}y\\)。"},
  {"t":"choice","q":"向量场 \\(\\mathbf{F}=(y,x)\\) 是保守的吗？","opts":["是，势函数 \\(u=xy\\)","不是","是，势函数 \\(u=x+y\\)","无法判断"],"ans":0,"why":"\\(P_y=1=Q_x\\) 且定义在全平面（单连通），势函数 \\(u=xy\\)（\\(u_x=y,u_y=x\\)）。"},
  {"t":"calc","q":"计算 \\(\\int_C(x^2+y^2)\\mathrm{d}s\\)，其中 \\(C\\) 是圆 \\(x^2+y^2=a^2\\) 一周。","hint":"圆上 \\(x^2+y^2=a^2\\) 为常数，总长 \\(2\\pi a\\)。","ans":"圆上被积函数恒为 \\(a^2\\)，\\(\\int_C\\mathrm{d}s=2\\pi a\\)，故积分 \\(=2\\pi a^3\\)。"},
  {"t":"calc","q":"计算 \\(\\int_C y\\,\\mathrm{d}x+x\\,\\mathrm{d}y\\)，\\(C\\)：从 \\((0,0)\\) 到 \\((1,1)\\) 的直线段。","hint":"参数化 \\(x=t,y=t\\)（\\(0\\le t\\le1\\)）。","ans":"\\(\\int_0^1(t\\cdot1+t\\cdot1)\\mathrm{d}t=\\int_0^12t\\,\\mathrm{d}t=1\\)。（该场保守，\\(u=xy\\)，结果 \\(=u(1,1)-u(0,0)=1\\)。）"},
  {"t":"calc","q":"用格林公式求 \\(\\oint_C x^2y\\,\\mathrm{d}x+xy^2\\,\\mathrm{d}y\\)，\\(C\\) 为单位圆正向。","hint":"\\(Q_x-P_y=y^2-x^2\\)，转极坐标。","ans":"\\(\\iint_D(y^2-x^2)\\mathrm{d}x\\mathrm{d}y=\\int_0^{2\\pi}\\int_0^1r^2(\\sin^2\\theta-\\cos^2\\theta)r\\,\\mathrm{d}r\\mathrm{d}\\theta=0\\)（角向积分为 0）。"},
  {"t":"calc","q":"判断 \\(\\oint_C\\frac{x\\mathrm{d}y-y\\mathrm{d}x}{x^2+y^2}\\) 沿不包围原点的闭曲线是否为 0；沿单位圆呢？","hint":"在去掉原点的区域上 \\(P_y=Q_x\\)，但该区域非单连通。","ans":"沿不包围原点的闭曲线（单连通小区域）由格林公式为 0。沿单位圆正向：\\(x=\\cos t,y=\\sin t\\)，积分 \\(=\\int_0^{2\\pi}(\\cos^2t+\\sin^2t)\\mathrm{d}t=2\\pi\\ne0\\)。这正说明区域必须单连通。"}
 ]
}
