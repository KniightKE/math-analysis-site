# 将本项目部署到 Render（render.com）

本网站是**纯静态站点**（无后端、无构建步骤），只需把 `math-analysis-site/` 目录原样发布即可。
仓库根目录已放好 `render.yaml`（Blueprint），并配置了：

```yaml
type: static
name: shuxue-fenxi
rootDir: math-analysis-site      # 网站代码所在子目录
staticPublishPath: .            # 发布整个子目录（无需构建）
autoDeploy: true                # 推送后自动部署
```

## 前提：把代码推到 Git 仓库

Render 需要连接 GitHub / GitLab / Bitbucket 仓库。本机仓库目前没有远端，先推一次：

```powershell
# 1) 在 GitHub/GitLab 新建一个空仓库，例如 https://github.com/<你的账号>/math-analysis-site
# 2) 添加远端并推送
git remote add origin https://github.com/<你的账号>/math-analysis-site.git
git branch -M master
git push -u origin master
```

## 方式 A：Blueprint 自动部署（推荐，最省事）

1. 登录 [Render 控制台](https://dashboard.render.com)；
2. 点 **New +** → **Blueprint**；
3. 选择刚推送的仓库；
4. Render 会读取仓库根目录的 `render.yaml`，自动创建名为 `shuxue-fenxi` 的 Static Site；
5. 首次部署完成后，访问 `https://shuxue-fenxi.onrender.com`。

## 方式 B：手动创建 Static Site

1. Render 控制台 → **New +** → **Static Site** → 连接仓库；
2. 填写：
   - **Root Directory**: `math-analysis-site`
   - **Build Command**: （留空，纯静态无需构建）
   - **Publish Directory**: `.`
   - Auto-Deploy 按需开启；
3. 点 **Create Static Site**，等待部署完成。

## 更新站点

- 改了章节内容：先在本机运行 `python build/build.py` 重新生成 `data/content.js`，再 `git push`，Render 会自动重新部署（autoDeploy）。
- 只改了样式/JS：直接 `git push` 即可。

## 说明：为什么我不能直接替你点“部署”

当前会话环境里**没有 Render 账号的 API Key、也没有该仓库的 Git 远端**，而 Render 的部署必须由你的账号发起。你可以在下面二选一，我就能继续代办：

1. **给我一个 Git 远端地址**（并把你的 Render 账号与该 Git 平台连好）→ 我帮你完成 `push`，Render 会按 `render.yaml` 自动部署；
2. **给我 Render API Key**（`RENDER_API_KEY`，Render 控制台 → Account Settings → API Keys）→ 我可通过 Render API/Blueprint 触发创建与部署。
