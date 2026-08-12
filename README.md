# 🧱 PullNail — 积木与钉子

> 一款基于 Unreal Engine 5 的休闲策略游戏  
> **点击积木上的钉子将其拔出，消除每一个角落的钉子！**

---

## 🔗 快速链接

| 链接 | 地址 |
| :--- | :--- |
| **游戏仓库** | [https://github.com/NullLis/PullNail](https://github.com/NullLis/PullNail) |
| **游戏介绍页面** | [https://NullLis.github.io/PullNail/](https://NullLis.github.io/PullNail/) <br> [https://pullnail.pages.dev/](https://pullnail.pages.dev/) |
| **在线配置文件** | [https://NullLis.github.io/PullNail/config.json](https://NullLis.github.io/PullNail/config.json) <br> [https://pullnail.pages.dev//config.json](https://pullnail.pages.dev//config.json) |

---

## 📖 游戏简介

《PullNail》是一款轻松上手的 3D 消图游戏。你需要将积木表面的每一枚钉子消除，同时遵循严格的规则：

- 每块积木上只能有 **1～6 颗钉子**
- **相邻积木的贴合面上，最多只能有一侧存在钉子**
- 同一种颜色的钉子总数必须是 **3 的倍数**

游戏在随机生成与逻辑约束之间找到平衡，既可享受随机带来的新鲜感，又需要运用策略来满足所有规则。

---

## 🕹️ 核心玩法

| 阶段 | 说明 |
| :--- | :--- |
| **1. 生成积木** | 自动生成由多种多边形组成的积木群，每个积木拥有多个方向的表面。 |
| **2. 附加钉子** | 钉子随机选择空闲面附加，颜色数量由全局算法动态平衡，保证满足“3 的倍数”。 |
| **3. 贴合面处理** | 相邻积木的贴合面上不能同时存在钉子，冲突时自动将钉子移动到其他空闲面。 |
| **4. 颜色平衡** | 生成结束后全局调整颜色分布，确保每种颜色数量均为 3 的倍数。 |

---

## 🛠️ 技术亮点

| 技术点 | 描述 |
| :--- | :--- |
| **引擎** | Unreal Engine 5.3+ |
| **逻辑实现** | 蓝图 (Blueprints) 与少量 C++ |
| **贴合检测** | 基于面法线 + 距离的精准贴合面识别算法 |
| **颜色平衡** | 动态规划算法保证颜色数量满足 3 的倍数 |
| **热更新** | 通过 HTTP + JSON 从 Cloudflare Pages 拉取配置文件，无需重新打包 |

---

## ⚙️ 远程配置

游戏在启动时会自动从以下地址拉取最新配置：
