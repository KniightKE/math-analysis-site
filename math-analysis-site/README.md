# 数分学堂 · 数学分析学习网站

以**华东师范大学数学科学学院《数学分析》第五版（上、下册，高等教育出版社）**的知识体系为纲制作的互动学习网站。覆盖第 1–22 章（上册第 1–7 章、下册第 8–22 章），每章包含：

- 📖 **本章导读** 与若干小节的知识讲解（定义、定理、直观理解、例题）；
- 🧭 **互动演示**：在极限语言、中值定理、黎曼和、级数、泰勒展开、傅里叶级数、梯度/切平面、隐函数、曲线积分、累次积分等难点处，提供可拖拽的 Canvas 动画；
- ✍️ **章节练习**：每章 8 题（选择 / 判断可即时反馈判分，计算 / 证明题可查看提示与解答），共 176 题；
- 📊 **本地学习进度**：可标记“已完成”，进度保存在浏览器 localStorage 中。

## 使用方式

**直接打开**：用浏览器打开 `index.html` 即可（KaTeX 已本地内置，可完全离线使用，无需联网、无需安装）。

**本地服务器方式（可选）**：

```powershell
cd math-analysis-site
python -m http.server 8000
# 浏览器访问 http://localhost:8000
```

## 目录结构

```
math-analysis-site/
├─ index.html            # 唯一入口（单页应用）
├─ css/style.css         # 样式
├─ js/
│  ├─ app.js             # 路由、渲染、进度、练习交互
│  └─ demos-core.js / demos1.js / demos2.js / demos3.js   # 互动演示框架与 19 个演示
├─ data/content.js       # 生成的 22 章内容数据（由 build 生成，勿手改）
├─ vendor/katex/         # 本地 KaTeX（离线公式渲染）
└─ build/
   ├─ build.py           # 把 chapters/*.py 打包为 data/content.js
   └─ chapters/ch01.py … ch22.py   # 每章的内容源（可编辑扩展）
```

## 修改 / 扩充内容

1. 编辑 `build/chapters/chXX.py`（章节结构：`sections[].blocks[]`，内容块支持 `def/thm/prop/lemma/cor/ex/note/tip/warn/quote/p/inter`；练习在 `exercises`，支持 `choice/tf/calc`；数学公式用 KaTeX：行内 `\( ... \)`，行间 `$$ ... $$`）。
2. 重新生成数据：`python build/build.py`。
3. 刷新浏览器即可看到改动。

新增互动演示：在 `js/demos3.js`（或新建文件）里调用 `MA_DEMOS.register('id', {...})`，然后在章节内容里插入 `{"t":"inter","id":"你的id","title":"...","desc":"..."}` 块。

## 说明

- 本站为学习辅助材料：讲解与例题均为围绕教材知识体系编写的原创笔记/题目，正式定义、定理与习题请以教材原文为准。
- 知识点顺序尽量贴近教材目录，个别小节为便于学习做了合并或调整。
- 兼容现代浏览器（Chrome / Edge / Firefox）；移动端有响应式布局。
