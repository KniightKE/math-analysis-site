# -*- coding: utf-8 -*-
CHAPTER = {
 "id":"ch02","no":2,"volume":1,
 "title":"数列极限","en":"Limits of Sequences","sym":"ε",
 "desc":"用 ε–N 语言严格定义“趋于”，并建立收敛数列的性质与判别法。",
 "intro":r"""极限是数学分析的灵魂，数列极限又是最基础的极限。这一章要解决两个问题：**什么叫一个数列收敛？**以及**如何判断它收敛、收敛到什么？**

“\(a_n\) 趋于 \(a\)”的通俗说法是“越到后面越接近 \(a\)”，但“越接近”必须量化——这就是 \(\varepsilon\text{–}N\) 语言：对任意给定的允许误差 \(\varepsilon\)，总能找到一项 \(a_N\)，使得它**之后所有项**都在 \(a\) 的 \(\varepsilon\) 邻域内。请务必亲手在互动演示里拖一拖 \(\varepsilon\)，体会 \(N\) 随 \(\varepsilon\) 变化的感觉。""",
 "sections":[
  {"id":"s1","title":"数列极限的概念","sub":"ε–N 语言","blocks":[
   {"t":"def","tag":"定义 2.1","title":"数列","x":r"""定义在正整数集上的函数 \(a_n=f(n)\) 称为**数列**，记作 \(\{a_n\}\)。数列是“离散”的：它只有第 1 项、第 2 项、……没有“最后一项”。"""},
   {"t":"def","tag":"定义 2.2","title":"数列极限（ε–N 定义）","x":r"""设 \(\{a_n\}\) 是数列，\(a\) 是常数。若对**任意** \(\varepsilon>0\)，都存在正整数 \(N\)，使得当 \(n>N\) 时恒有

$$|a_n-a|<\varepsilon,$$

则称 \(\{a_n\}\) **收敛于** \(a\)，记 \(\lim_{n\to\infty}a_n=a\) 或 \(a_n\to a\ (n\to\infty)\)。若不收敛，称数列**发散**。

要点：\(N\) 一般依赖于 \(\varepsilon\)（记 \(N=N(\varepsilon)\)）；\(\varepsilon\) 要能**任意小**，只说“存在某个 \(\varepsilon\)”是不够的。"""},
   {"t":"quote","title":"怎么理解 ε–N？","x":r"""把 \(\varepsilon\) 想成“验收精度”：\(a\) 是目标，\(\varepsilon\) 是允许的偏差。\(\varepsilon\)–\(N\) 定义说：**不管你提出多小的偏差要求 \(\varepsilon\)，数列从某一项之后都能全部满足**。\(\varepsilon\) 越小，一般 \(N\) 就越大——这正是“无限接近”的严格含义。"""},
   {"t":"ex","tag":"例 2.1","title":"用定义证明 1/n→0","x":r"""证明 \(\lim_{n\to\infty}\frac{1}{n}=0\)。""","ans":r"""对任意 \(\varepsilon>0\)，要 \(\left|\frac1n-0\right|<\varepsilon\)，只需 \(n>\frac1\varepsilon\)。取 \(N=\left[\frac1\varepsilon\right]+1\)（或任意大于 \(\frac1\varepsilon\) 的整数），则当 \(n>N\) 时 \(\frac1n<\varepsilon\) 成立。由 \(\varepsilon\) 的任意性，\(\lim\frac1n=0\)。"""},
   {"t":"note","title":"ε–N 语言的常用变形","x":r"""证明时常用“放缩”：不直接证明 \(|a_n-a|<\varepsilon\)，而是找一个简单的 \(b_n\)，满足 \(|a_n-a|\le b_n\) 且 \(b_n<\varepsilon\) 容易由 \(n>N\) 推出。例如证 \(\frac{n+1}{n^2}\to0\)：\(\frac{n+1}{n^2}\le \frac{2}{n}\)，取 \(N>[2/\varepsilon]\) 即可。"""}
  ]},
  {"id":"s2","title":"收敛数列的性质","sub":"唯一性、有界性、保号性、夹逼与四则运算","blocks":[
   {"t":"thm","tag":"定理 2.1","title":"极限唯一","x":r"""收敛数列的极限是唯一的。""","proof":r"""若 \(a_n\to a\) 且 \(a_n\to b\)，取 \(\varepsilon=\frac{|a-b|}{2}>0\)。当 \(n\) 充分大时 \(|a_n-a|<\varepsilon\)、\(|a_n-b|<\varepsilon\)，于是 \(|a-b|\le|a_n-a|+|a_n-b|<2\varepsilon=|a-b|\)，矛盾。"""},
   {"t":"thm","tag":"定理 2.2","title":"收敛 ⇒ 有界","x":r"""收敛数列必有界；反之**不真**（如 \(a_n=(-1)^n\) 有界但发散）。

直观：收敛数列的项最终都落在 \((a-1,a+1)\) 内，前面有限项当然有界。"""},
   {"t":"thm","tag":"定理 2.3","title":"保号性与保不等式","x":r"""若 \(a_n\to a>0\)，则存在 \(N\)，当 \(n>N\) 时 \(a_n>0\)（保号性）。

若 \(a_n\le b_n\)（对充分大的 \(n\)）且两数列都收敛，则 \(\lim a_n\le \lim b_n\)。注意：严格不等号经极限后只能保持 \(\le\)，如 \(\frac1n>0\) 但极限 \(0\) 不 \(>0\)。"""},
   {"t":"thm","tag":"定理 2.4","title":"夹逼（迫敛）定理","x":r"""若 \(a_n\le c_n\le b_n\)（对充分大的 \(n\)），且 \(\lim a_n=\lim b_n=L\)，则 \(\{c_n\}\) 收敛且 \(\lim c_n=L\)。

用途：把难算的数列夹在两个好算的数列之间。"""},
   {"t":"thm","tag":"定理 2.5","title":"四则运算法则","x":r"""若 \(a_n\to a,\ b_n\to b\)，则

$$a_n\pm b_n\to a\pm b,\qquad a_nb_n\to ab,\qquad \frac{a_n}{b_n}\to\frac{a}{b}\ (b\ne 0,\ b_n\ne 0).$$

特别地，\(k a_n\to ka\)，\(a_n^k\to a^k\)。"""},
   {"t":"ex","tag":"例 2.2","title":"用四则运算求极限","x":r"""求 \(\lim_{n\to\infty}\frac{2n^2-n+1}{3n^2+2n-5}\)。""","ans":r"""分子分母同除以 \(n^2\)：

$$\frac{2n^2-n+1}{3n^2+2n-5}=\frac{2-\frac1n+\frac{1}{n^2}}{3+\frac2n-\frac{5}{n^2}}\to\frac{2-0+0}{3+0-0}=\frac23.$$

一般技巧：\(\frac{\text{多项式}}{\text{多项式}}\) 型极限看**最高次项**；\(\sqrt{n^2+n}-n\) 型先**有理化**。"""},
   {"t":"ex","tag":"例 2.3","title":"用夹逼定理求极限","x":r"""求 \(\lim_{n\to\infty}\frac{\sin n}{n}\) 与 \(\lim_{n\to\infty}\frac{n}{2^n}\)。""","ans":r"""① \(-\frac1n\le \frac{\sin n}{n}\le \frac1n\)，两边趋于 0，故极限为 0。

② 对 \(n\ge2\)，\(0<\frac{n}{2^n}\le\frac{n}{n(n-1)}=\frac{1}{n-1}\to0\)（因 \(2^n\ge n(n-1)\) 可由归纳法验证），故极限为 0。"""}
  ]},
  {"id":"s3","title":"极限存在的条件","sub":"单调有界定理、重要极限 e 与柯西准则","blocks":[
   {"t":"thm","tag":"定理 2.6","title":"单调有界定理","x":r"""单调**上升且有上界**的数列必收敛（极限即其上确界）；单调**下降且有下界**的数列必收敛。

这条定理的价值：**不必预先知道极限值**，只要单调 + 有界就能断言收敛。它的证明依赖确界原理：以 \(\sup\{a_n\}\) 为极限候选。"""},
   {"t":"def","tag":"定义 2.3","title":"自然常数 e","x":r"""数列 \(a_n=\left(1+\frac1n\right)^n\) 单调上升且有上界（可证 \(a_n<3\)），故收敛。其极限记为

$$\mathrm{e}=\lim_{n\to\infty}\left(1+\frac1n\right)^n\approx 2.718281828\ldots$$

验证单调性的常用工具：\(\frac{a_{n+1}}{a_n}\) 与 1 比较；或用伯努利不等式。"""},
   {"t":"thm","tag":"定理 2.7","title":"柯西收敛准则","x":r"""数列 \(\{a_n\}\) 收敛当且仅当：对任意 \(\varepsilon>0\)，存在 \(N\)，使对一切 \(m,n>N\) 都有

$$|a_m-a_n|<\varepsilon.$$

这样的数列叫**基本列（柯西列）**。准则的意义：判断收敛**不需要知道极限值**，只需看“尾巴上的项彼此是否无限接近”。它是实数完备性的又一表现（在有理数中不成立）。""","proof":r"""必要性：\(a_n\to a\) 时，\(|a_m-a_n|\le|a_m-a|+|a_n-a|<\varepsilon\)。

充分性：可证柯西列有界，再用单调有界技巧（或第 7 章的闭区间套/致密性定理）推出收敛，这里从略。"""},
   {"t":"ex","tag":"例 2.4","title":"用柯西准则否定收敛","x":r"""证明 \(a_n=(-1)^n\) 发散。""","ans":r"""取 \(\varepsilon=1\)。对任意 \(N\)，取 \(m,n\) 为大于 \(N\) 的一奇一偶，则 \(|a_m-a_n|=|-1-1|=2\ge1\)，不满足柯西条件，故发散。"""}
  ]}
 ],
 "summary":r"""**本章小结**

1. 收敛的定义：\(\forall\varepsilon>0,\ \exists N,\ n>N\Rightarrow|a_n-a|<\varepsilon\)。抓住“\(\varepsilon\) 任意小”与“\(N=N(\varepsilon)\)”。
2. 性质链条：收敛 ⇒ 唯一、有界、保号；夹逼定理与四则运算是**求极限**的两大工具。
3. 存在性判别：单调有界定理、柯西准则（都不需要先知道极限）。

**常见误区**
- \(N\) 是正整数，可以依赖 \(\varepsilon\)，但不能反过来“\(\varepsilon\) 依赖 \(n\)”。
- “当 \(n>N\) 时 \(|a_n-a|<\varepsilon\)”中 \(>\) 与 \(\ge\) 不影响结论（常把 \(\le\varepsilon\)、\(<2\varepsilon\) 当 \(<\varepsilon\) 处理，只需说明可任意小）。
- 夹逼要求**两边的极限相等**；四则运算要求分母极限非零。
- 有界不一定收敛，收敛不一定单调。""",
 "exercises":[
  {"t":"choice","q":"设 \\(a_n=1+\\frac{(-1)^n}{n}\\)，则 \\(\\{a_n\\}\\) 的极限为？","opts":["\\(1\\)","\\(0\\)","发散","\\(1\\pm\\frac1n\\)"],"ans":0,"why":"\\(|a_n-1|=\\frac1n\\to0\\)，故 \\(a_n\\to1\\)。"},
  {"t":"choice","q":"“收敛数列必有界”这一命题是？","opts":["正确","错误"],"ans":0,"why":"收敛数列的项最终落在极限的 \\(\\varepsilon\\) 邻域内，加上前面有限项，整体有界。"},
  {"t":"choice","q":"下列数列中发散的是？","opts":["\\(\\left(\\frac12\\right)^n\\)","\\(\\frac{n}{n+1}\\)","\\((-1)^n\\)","\\(\\frac{1}{n^2}\\)"],"ans":2,"why":"\\((-1)^n\\) 在 1 与 −1 之间震荡，不收敛；其余都收敛。"},
  {"t":"tf","q":"有界数列必收敛。","opts":["正确","错误"],"ans":1,"why":"反例 \\(a_n=(-1)^n\\)：有界但不收敛。有界 + 单调才保证收敛。"},
  {"t":"calc","q":"用 ε–N 定义证明 \\(\\lim_{n\\to\\infty}\\frac{2n+1}{3n+4}=\\frac23\\)。","hint":"先算 \\(\\left|\\frac{2n+1}{3n+4}-\\frac23\\right|\\)。","ans":"\\(\\left|\\frac{2n+1}{3n+4}-\\frac23\\right|=\\left|\\frac{3(2n+1)-2(3n+4)}{3(3n+4)}\\right|=\\frac{5}{3(3n+4)}<\\frac{5}{3n}\\)。对任意 \\(\\varepsilon>0\\)，取 \\(N>\\frac{5}{3\\varepsilon}\\)，当 \\(n>N\\) 时该式 \\(<\\varepsilon\\)，故极限为 \\(\\frac23\\)。"},
  {"t":"calc","q":"求 \\(\\lim_{n\\to\\infty}\\frac{n^3-2n+1}{2n^3+n^2}\\)。","hint":"分子分母同除以 \\(n^3\\)。","ans":"\\(\\frac{n^3-2n+1}{2n^3+n^2}=\\frac{1-\\frac{2}{n^2}+\\frac{1}{n^3}}{2+\\frac1n}\\to\\frac12\\)。"},
  {"t":"calc","q":"求 \\(\\lim_{n\\to\\infty}\\left(\\sqrt{n^2+n}-n\\right)\\)。","hint":"分子有理化：\\(\\sqrt{n^2+n}-n=\\frac{n}{\\sqrt{n^2+n}+n}\\)。","ans":"\\(\\sqrt{n^2+n}-n=\\frac{n}{\\sqrt{n^2+n}+n}=\\frac{1}{\\sqrt{1+\\frac1n}+1}\\to\\frac{1}{1+1}=\\frac12\\)。"},
  {"t":"calc","q":"用夹逼定理求 \\(\\lim_{n\\to\\infty}\\left(\\frac{1}{n^2+1}+\\frac{1}{n^2+2}+\\cdots+\\frac{1}{n^2+n}\\right)\\)。","hint":"\\(n\\) 项，每项介于 \\(\\frac{1}{n^2+n}\\) 与 \\(\\frac{1}{n^2+1}\\) 之间。","ans":"\\(\\frac{n}{n^2+n}\\le S_n\\le\\frac{n}{n^2+1}\\)，即 \\(\\frac{1}{n+1}\\le S_n\\le\\frac{1}{n+1/n}\\)，两边都趋于 0，故 \\(S_n\\to0\\)。"}
 ]
}
