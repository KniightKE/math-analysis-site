# -*- coding: utf-8 -*-
CHAPTER = {
 "id":"ch22","no":22,"volume":2,
 "title":"曲面积分","en":"Surface Integrals","sym":"∬",
 "desc":"第一类（对面积）与第二类（对坐标）曲面积分，高斯公式与斯托克斯公式。",
 "intro":r"""曲线积分之后自然轮到**曲面积分**。同样有两类：

- **第一类**（对面积）：\(\iint_S f\,\mathrm{d}S\)，与面的朝向无关，用于求曲面质量、重心等；
- **第二类**（对坐标）：\(\iint_S P\mathrm{d}y\mathrm{d}z+Q\mathrm{d}z\mathrm{d}x+R\mathrm{d}x\mathrm{d}y\)，需要**定向**，物理意义是向量场穿过曲面的**通量**（流量）。

本章两大“高维基本定理”收束全课程：**高斯公式**把闭曲面上的通量与内部散度的三重积分相连；**斯托克斯公式**把曲面上的旋度通量与边界曲线的环量相连。它们与格林公式一脉相承，共同构成“微积分基本定理”在 2、3 维的完整图景。""",
 "sections":[
  {"id":"s1","title":"第一类曲面积分（对面积）","sub":"dS 与方向无关","blocks":[
   {"t":"def","tag":"定义 22.1","title":"第一类曲面积分","x":r"""设光滑曲面 \(S: z=z(x,y)\)，\((x,y)\in D\)，\(f(x,y,z)\) 在 \(S\) 上连续。把 \(S\) 切成小片，面积 \(\Delta S_i\)，作和取极限：

$$\iint_S f(x,y,z)\,\mathrm{d}S=\iint_D f(x,y,z(x,y))\sqrt{1+z_x^2+z_y^2}\,\mathrm{d}x\mathrm{d}y.$$

**面积元** \(\mathrm{d}S=\sqrt{1+z_x^2+z_y^2}\,\mathrm{d}x\mathrm{d}y\) 来自切平面小片的面积（比 \(\mathrm{d}x\mathrm{d}y\) 多出“倾斜因子”）。与面的哪一侧无关。"""},
   {"t":"ex","tag":"例 22.1","title":"计算对面积的曲面积分","x":r"""求 \(\iint_S\mathrm{d}S\)，其中 \(S\) 是球面 \(x^2+y^2+z^2=R^2\)。""","ans":r"""\(\iint_S\mathrm{d}S\) 就是曲面面积，等于 \(4\pi R^2\)。若要按公式算，把上半球投影到 \(xOy\) 平面：\(z=\sqrt{R^2-x^2-y^2}\)，\(\sqrt{1+z_x^2+z_y^2}=\frac{R}{\sqrt{R^2-x^2-y^2}}\)，上半球面积 \(=\iint_{x^2+y^2\le R^2}\frac{R}{\sqrt{R^2-x^2-y^2}}\mathrm{d}x\mathrm{d}y=2\pi R^2\)，整体 \(4\pi R^2\)。"""}
  ]},
  {"id":"s2","title":"第二类曲面积分（对坐标）","sub":"定向与通量","blocks":[
   {"t":"def","tag":"定义 22.2","title":"第二类曲面积分（通量）","x":r"""设向量场 \(\mathbf{F}=(P,Q,R)\)，\(S\) 是**定向**光滑曲面（选定单位法向量 \(\mathbf{n}\)），第二类曲面积分为

$$\iint_S P\,\mathrm{d}y\mathrm{d}z+Q\,\mathrm{d}z\mathrm{d}x+R\,\mathrm{d}x\mathrm{d}y=\iint_S\mathbf{F}\cdot\mathbf{n}\,\mathrm{d}S.$$

物理意义：单位时间穿过 \(S\) 的**流量**。**换一侧（法向量反向）积分变号**。对曲面 \(z=z(x,y)\) 取上侧（\(\mathbf{n}\) 与 \(z\) 轴正向夹角为锐角）时，

$$\iint_S R\,\mathrm{d}x\mathrm{d}y=\iint_D R(x,y,z(x,y))\,\mathrm{d}x\mathrm{d}y,$$

取上侧为正、下侧为负——投影时**符号不能丢**。"""},
   {"t":"warn","title":"两类曲面积分最容易混淆的地方","x":r"""- 第一类 \(\iint f\,\mathrm{d}S\)：无方向，投影后乘 \(\sqrt{1+z_x^2+z_y^2}\)；
- 第二类 \(\iint P\mathrm{d}y\mathrm{d}z+\cdots\)：有方向（选侧），投影是**有向投影**（如 \(\mathrm{d}x\mathrm{d}y\) 在上侧为正），不要乘根号、不要丢符号。

第二类可化为第一类：\(\iint\mathbf{F}\cdot\mathbf{n}\mathrm{d}S\)，其中 \(\mathbf{n}\) 是单位法向量。"""}
  ]},
  {"id":"s3","title":"高斯公式与斯托克斯公式","sub":"通量-散度、环量-旋度","blocks":[
   {"t":"thm","tag":"定理 22.1","title":"高斯公式（散度定理）","x":r"""设空间区域 \(\Omega\) 由分片光滑闭曲面 \(S\) 围成，\(P,Q,R\) 在 \(\Omega\) 上有连续一阶偏导数，则

$$\oiint_S P\mathrm{d}y\mathrm{d}z+Q\mathrm{d}z\mathrm{d}x+R\mathrm{d}x\mathrm{d}y=\iiint_\Omega\left(\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}\right)\mathrm{d}V,$$

其中 \(S\) 取**外侧**。被积函数 \(\operatorname{div}\mathbf{F}=P_x+Q_y+R_z\) 叫**散度**。高斯公式说：边界上的通量 = 内部散度的总和。用途：① 通量化为三重积分；② 反之用闭曲面算三重积分；③ 判断向量场是否为“管形场”（散度为 0）。"""},
   {"t":"thm","tag":"定理 22.2","title":"斯托克斯公式","x":r"""设 \(S\) 是分片光滑的有向曲面，边界为分段光滑闭曲线 \(C\)（方向与 \(S\) 的法向满足右手定则），\(P,Q,R\) 有连续一阶偏导，则

$$\oint_C P\mathrm{d}x+Q\mathrm{d}y+R\mathrm{d}z=\iint_S\begin{vmatrix}\mathrm{d}y\mathrm{d}z&\mathrm{d}z\mathrm{d}x&\mathrm{d}x\mathrm{d}y\\ \partial_x&\partial_y&\partial_z\\ P&Q&R\end{vmatrix}.$$

右端被积向量 \(\operatorname{rot}\mathbf{F}=(R_y-Q_z,\ P_z-R_x,\ Q_x-P_y)\) 叫**旋度**。斯托克斯公式把“边界环量”与“曲面上的旋度通量”相连；取 \(S\) 为平面区域即回到格林公式。"""},
   {"t":"note","title":"三定理对照（微积分基本定理的高维版）","x":r"""| 公式 | 左边 | 右边 | 核心量 |
|---|---|---|---|
| 牛顿–莱布尼茨 | \(F(b)-F(a)\) | \(\int_a^b f\) | 导数 |
| 格林 | \(\oint_C P\mathrm{d}x+Q\mathrm{d}y\) | \(\iint_D(Q_x-P_y)\) | 旋度（平面） |
| 高斯 | \(\oiint_S\mathbf{F}\cdot\mathbf{n}\mathrm{d}S\) | \(\iiint_\Omega\operatorname{div}\mathbf{F}\,\mathrm{d}V\) | 散度 |
| 斯托克斯 | \(\oint_C\mathbf{F}\cdot\mathrm{d}\mathbf{r}\) | \(\iint_S\operatorname{rot}\mathbf{F}\cdot\mathbf{n}\mathrm{d}S\) | 旋度 |

共同模式：**边界上的积分 = 内部某种“导数/变化率”的积分**。"""},
   {"t":"ex","tag":"例 22.2","title":"用高斯公式算通量","x":r"""求 \(\mathbf{F}=(x,y,z)\) 穿过球面 \(x^2+y^2+z^2=R^2\)（外侧）的通量。""","ans":r"""\(\operatorname{div}\mathbf{F}=3\)，由高斯公式，通量 \(=\iiint_\Omega3\,\mathrm{d}V=3\cdot\frac43\pi R^3=4\pi R^3\)。"""}
  ]}
 ],
 "summary":r"""**本章小结**

1. 第一类（对面积）：\(\iint f\mathrm{d}S\)，投影后乘 \(\sqrt{1+z_x^2+z_y^2}\)，与侧无关。
2. 第二类（对坐标）：\(\iint\mathbf{F}\cdot\mathbf{n}\mathrm{d}S\)（通量），要定向，投影有符号。
3. 高斯公式：外侧通量 = \(\iiint\operatorname{div}\mathbf{F}\)；斯托克斯：边界环量 = \(\iint\operatorname{rot}\mathbf{F}\cdot\mathbf{n}\)；格林是斯托克斯的平面特例。

**常见误区**
- 两类曲面积分混淆（是否乘根号、是否有方向）。
- 第二类投影不处理“侧”的符号。
- 高斯/斯托克斯公式用错方向（外侧/右手定则）或 \(P,Q,R\) 连续性不满足。
- 把 \(\operatorname{div}\)（标量）与 \(\operatorname{rot}\)（向量）混为一谈。""",
 "exercises":[
  {"t":"choice","q":"第一类曲面积分 \\(\\iint_S f\\,\\mathrm{d}S\\) 与第二类曲面积分相比？","opts":["第一类与曲面侧无关，第二类换侧变号","两者都无关","两者都换侧变号","第二类与侧无关"],"ans":0,"why":"\\(\\mathrm{d}S\\) 是面积元无方向；第二类通量依赖法向量取向，换侧变号。"},
  {"t":"choice","q":"高斯公式把闭曲面外侧的通量化为？","opts":["内部散度的三重积分","内部旋度的三重积分","边界曲线的环量","面积的二重积分"],"ans":0,"why":"\\(\\oiint_S\\mathbf{F}\\cdot\\mathbf{n}\\mathrm{d}S=\\iiint_\\Omega\\operatorname{div}\\mathbf{F}\\mathrm{d}V\\)。"},
  {"t":"tf","q":"斯托克斯公式可视为格林公式在空间曲面上的推广。","opts":["正确","错误"],"ans":0,"why":"格林公式是斯托克斯公式在平面区域（\\(S\\subset z=0\\) 平面）时的特例。"},
  {"t":"choice","q":"\\(\\mathbf{F}=(x,y,z)\\) 的散度为？","opts":["\\(3\\)","\\(0\\)","\\(x+y+z\\)","\\(1\\)"],"ans":0,"why":"\\(\\operatorname{div}\\mathbf{F}=1+1+1=3\\)。"},
  {"t":"calc","q":"计算 \\(\\iint_S\\mathrm{d}S\\)，\\(S\\) 是平面 \\(x+y+z=1\\) 位于第一卦限的部分。","hint":"\\(z=1-x-y\\)，\\(\\sqrt{1+z_x^2+z_y^2}=\\sqrt3\\)。","ans":"\\(D\\) 为 \\(x\\ge0,y\\ge0,x+y\\le1\\)，面积 \\(=\\frac12\\)，故 \\(\\iint_S\\mathrm{d}S=\\sqrt3\\cdot\\frac12=\\frac{\\sqrt3}{2}\\)。"},
  {"t":"calc","q":"用高斯公式求 \\(\\mathbf{F}=(x^2,y^2,z^2)\\) 穿过球面 \\(x^2+y^2+z^2\\le R^2\\) 边界的通量。","hint":"\\(\\operatorname{div}\\mathbf{F}=2(x+y+z)\\)。","ans":"\\(\\operatorname{div}\\mathbf{F}=2x+2y+2z\\)，在球上关于各坐标对称，\\(\\iiint x=\\iiint y=\\iiint z=0\\)，故通量为 0。"},
  {"t":"calc","q":"验证 \\(\\mathbf{F}=(-y,x,0)\\) 的旋度，并说明其几何意义。","hint":"\\(\\operatorname{rot}\\mathbf{F}=(0,0,Q_x-P_y)=(0,0,2)\\)。","ans":"\\(\\operatorname{rot}\\mathbf{F}=(0,0,2)\\)：绕 \\(z\\) 轴旋转的场，旋度恒指向 \\(z\\) 轴正方向，大小为 2（角速度的 2 倍）。"},
  {"t":"calc","q":"求 \\(\\oint_C y\\mathrm{d}x+z\\mathrm{d}y+x\\mathrm{d}z\\)，\\(C\\) 是平面 \\(x+y+z=1\\) 与球面 \\(x^2+y^2+z^2=1\\) 的交线（方向任取，结果取绝对值）。","hint":"用斯托克斯公式，\\(\\operatorname{rot}\\mathbf{F}=(-1,-1,-1)\\)，取 \\(S\\) 为平面内圆盘。","ans":"\\(\\operatorname{rot}\\mathbf{F}=(-1,-1,-1)\\)。圆盘法向量 \\(\\mathbf{n}=\\frac1{\\sqrt3}(1,1,1)\\)，\\(\\operatorname{rot}\\mathbf{F}\\cdot\\mathbf{n}=-\\sqrt3\\)。交线为半径 \\(\\sqrt{2/3}\\) 的圆，面积 \\(=\\frac{2\\pi}{3}\\)，故环量绝对值 \\(=\\sqrt3\\cdot\\frac{2\\pi}{3}=\\frac{2\\pi}{\\sqrt3}\\)。"}
 ]
}
