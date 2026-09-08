# -*- coding: utf-8 -*-
"""把 build/chapters/*.py 中的 22 章内容打包成 data/content.js"""
import io, os, sys, json, importlib

BASE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE)

mods = []
for n in range(1, 23):
    name = "chapters.ch%02d" % n
    mods.append(importlib.import_module(name))

chapters = []
for m in mods:
    chapters.append(m.CHAPTER)

# 在对应小节的末尾注入互动演示块
DEMO_INJECT = {
 "ch01": [("s2", "nested", "十进制逐步逼近 √2：区间套思想", "拖动“查看第 k 层”，看十进制小数如何一层层把 √2 夹在中间——这是确界与闭区间套的直观入口。")],
 "ch02": [("s1", "epsN", "数列极限的 ε–N 语言", "调节 ε，观察 N(ε) 随之变化：ε 越小，N 越大；绿色点 = 已进入 ε 带的项。")],
 "ch03": [("s1", "epsD", "函数极限的 ε–δ 语言", "调节 ε 与 δ：只要紫色竖带内的曲线没有红色段，这个 δ 就有效。试试“自动给出可行 δ”。")],
 "ch04": [("s3", "bisection", "介值定理与二分法求根", "连续函数 f(a)f(b)<0 ⇒ 区间内必有零点。看二分法如何一步步把根“套”出来。")],
 "ch05": [("s1", "deriv", "割线 → 切线：导数的几何意义", "拖动 h 让 B 点滑向 A 点，割线旋转贴近切线，斜率趋于导数 f′(a)。")],
 "ch06": [("s1", "mvt", "拉格朗日中值定理的几何画面", "弦 AB 的斜率一定等于区间内某点的切线斜率——看看 c 在哪里。")],
 "ch07": [("s1", "nested", "闭区间套：把实数“套”出来", "闭区间一层层包含、长度趋于 0，公共点唯一存在——这正是实数完备性的直观。")],
 "ch09": [("s1", "riemann", "定积分 = 黎曼和的极限", "分割数 n 越大，左和/右和/中点/梯形和都收敛到同一个定积分。")],
 "ch10": [("s2", "arclen", "用折线逼近弧长", "n 段折线长度越来越接近弧长 ∫√(1+(f′)²)dx——弧长公式的来源。")],
 "ch11": [("s1", "improper", "反常积分：p 值决定收敛还是发散", "把 p 从 1 拨过去：∫₁^∞ x⁻ᵖ dx 在 p>1 收敛、p≤1 发散；看“面积”是趋于有限值还是无限增长。")],
 "ch12": [("s1", "series", "级数 = 部分和数列的极限", "对比几何级数、p-级数、交错级数：收敛与否看 Sₙ 的走向。")],
 "ch13": [("s1", "uniform", "一致收敛 vs 逐点收敛", "fₙ(x)=xⁿ 无论 n 多大，右端总翘在 ε 带外；x/(1+nx) 却能整条进入带内。差距就是 sup|fₙ−f|。")],
 "ch14": [("s3", "taylor", "泰勒多项式逼近", "提高阶数 n，红色多项式在 0 附近越来越“贴”住蓝色函数；注意收敛半径外会急剧偏离。")],
 "ch15": [("s1", "fourier", "傅里叶级数合成方波（吉布斯现象）", "增加 N，三角波在连续点逼近方波；间断点附近出现过冲（吉布斯现象），N→∞ 也不消失。")],
 "ch16": [("s2", "pathlimit", "二重极限与逼近路径", "沿不同角度 θ 逼近原点，f=xy/(x²+y²) 趋于不同值 ⇒ 二重极限不存在。试试 θ=0° 与 90°。")],
 "ch17": [("s1", "tangent3d", "切平面：曲面的最佳线性逼近", "在曲面上移动点 P，红色切平面始终“贴”住曲面；它由 f_x、f_y 两个方向张成。"),
          ("s2", "grad", "方向导数与梯度", "点 P 处红色箭头=梯度（垂直于等高线、指向最陡上升）；转动 θ 看方向导数 D_u f=∇f·u 如何变化。")],
 "ch18": [("s1", "implicit", "隐函数求导：不用解出 y 也能求切线", "在圆/椭圆上移动点 P：y′=−F_x/F_y 给出的切线始终与曲线相切（与半径垂直）。")],
 "ch20": [("s2", "lineint", "第二类曲线积分 = 沿路径做功", "绕一圈：保守径向场做功为 0，旋转场做功 2πr²。观察力与位移的关系。")],
 "ch21": [("s2", "slice", "二重积分化成累次积分：先切片后累积", "固定 x 先对 y 积分得“薄片”h(x)，再对 x 累积——两步走就是累次积分。")],
}
for c in chapters:
    for secid, demo, title, desc in DEMO_INJECT.get(c["id"], []):
        for sec in c["sections"]:
            if sec["id"] == secid:
                sec["blocks"].append({"t": "inter", "id": demo, "title": title, "desc": desc})

volumes = [
    {"v": 1, "name": "数学分析（上册）", "desc": "一元微积分基础：实数、极限、连续、导数、微分中值定理与实数完备性（第 1–7 章）"},
    {"v": 2, "name": "数学分析（下册）", "desc": "积分与级数、多元微积分：不定/定积分及其应用、级数、多元微分与各类积分（第 8–22 章）"}
]
out = {"volumes": volumes, "chapters": chapters}
payload = "window.MA_DATA = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n"
dst = os.path.join(BASE, "..", "data", "content.js")
with io.open(dst, "w", encoding="utf-8") as f:
    f.write(payload)
print("wrote", os.path.abspath(dst), "chapters:", len(chapters))
# 快速校验
ids = [c["id"] for c in chapters]
assert len(ids) == len(set(ids)), "重复 id"
for c in chapters:
    assert c["id"] and c["title"]
    assert isinstance(c.get("sections"), list) and c["sections"]
    assert isinstance(c.get("exercises"), list)
    for s in c["sections"]:
        assert s.get("id") and s.get("title") and isinstance(s.get("blocks"), list)
print("validation ok")
