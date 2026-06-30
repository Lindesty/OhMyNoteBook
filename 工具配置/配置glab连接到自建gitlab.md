# glab CLI 使用指南 —— 自建 GitLab 实战

> 自建 GitLab 实例: `https://gitlab.lindesty.com:54430` (HTTPS) / `ssh://gitlab.lindesty.com:50220` (SSH)


---

## 目录

1. [环境与登录](#1-环境与登录)
2. [项目 (Repo) 管理](#2-项目-repo-管理)
3. [组 (Group) 管理](#3-组-group-管理)
4. [合并请求 (MR)](#4-合并请求-mr)
5. [Issue 管理](#5-issue-管理)
6. [CI/CD 流水线](#6-cicd-流水线)
7. [API 直接调用](#7-api-直接调用)
8. [搜索](#8-搜索)
9. [常用组合技巧](#9-常用组合技巧)

---

## 1. 环境与登录

### 1.1 安装

| 平台                 | 命令                                                         |
| -------------------- | ------------------------------------------------------------ |
| **Windows (Scoop)**  | `scoop install glab`                                         |
| **macOS (Homebrew)** | `brew install glab`                                          |
| **Linux (deb/rpm)**  | 见 [GitLab CLI 官方安装指南](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/install/index.md) |

### 1.2 登录自建实例

```bash
# 使用 Personal Access Token 登录（指定 hostname 和端口）
glab auth login --hostname gitlab.lindesty.com:54430 --token [your-token]

# SSH 方式登录（如果 SSH 端口非默认 22）
glab auth login --hostname gitlab.lindesty.com:54430 --token [your-token] --git-protocol ssh
```

> **注意**: 自建实例端口非标准 443 时，hostname 需要带上端口号（如 `gitlab.lindesty.com:54430`）
> SSH 端口也同理（`gitlab.lindesty.com:50220`）

### 1.3 查看登录状态

```bash
glab auth status
```

示例输出：

```
gitlab.lindesty.com:54430
  ✓ Logged in to gitlab.lindesty.com:54430 as lindesty
  ✓ Git operations for gitlab.lindesty.com:54430 configured to use ssh protocol.
  ✓ API calls for gitlab.lindesty.com:54430 are made over https protocol.
  ✓ REST API Endpoint: https://gitlab.lindesty.com:54430/api/v4/
  ✓ GraphQL Endpoint: https://gitlab.lindesty.com:54430/api/graphql/
  ✓ Token found
```

### 1.4 多实例 / 切换配置

```bash
# 查看当前配置
glab config get --host gitlab.lindesty.com:54430 gl_host

# 设置默认 Git 协议（https / ssh）
glab config set -g git_protocol ssh

# 查看所有主机配置
# 配置文件路径: ~/.config/glab-cli/config.yml (Linux/macOS)
#                 %LocalAppData%\glab-cli\config.yml (Windows)
```

---

### 1.5 修改配置文件来登录 

在windows端，glab的配置文件位于`~\AppData\Local\glab-cli\config.yml`,需要进行如下修改

```yml
# Default GitLab hostname to use.
host: gitlab.lindesty.com:54430
# Configuration specific for GitLab instances.
hosts:
    gitlab.lindesty.com:54430: {token: [your_access_token], api_protocol: https}
```

在linux端，glab的配置文件位于`~/.config/glab-cli/config.yml`,需要进行如下修改

```yml
# Default GitLab hostname to use.
host: gitlab.lindesty.com:54430
# Configuration specific for GitLab instances.
hosts:
    gitlab.lindesty.com:54430: 
        token: [your_access_token], 
        api_protocol: https
```


## 2. 项目 (Repo) 管理

### 2.1 列出项目

```bash
# 列出当前用户可见的所有项目（含用户个人项目和组项目）
glab repo list

# 指定每页数量（默认 30）
glab repo list --per-page 100

# 搜索项目
glab repo search <关键词>

# 列出用户个人项目（通过 API）
glab api '/projects?owned=true&per_page=100'
```

### 2.2 查看项目详情

```bash
glab repo view <namespace/project>
glab repo view lindesty/whisper-console
```

### 2.3 克隆项目

```bash
# SSH 克隆（推荐）
glab repo clone lindesty/whisper-console
glab repo clone LearnBook/dapr

# HTTPS 克隆
glab repo clone lindesty/whisper-console --protocol https

# 克隆到指定目录
glab repo clone lindesty/whisper-console ./my-dir

# 克隆组的全部项目（批量）
glab repo clone -g LearnBook ./learnbook-all
```

### 2.4 创建 / Fork 项目

```bash
# 创建新项目
glab repo create my-new-project

# 在指定组下创建
glab repo create LearnBook/my-new-book

# Fork 项目
glab repo fork lindesty/whisper-console
```

### 2.5 删除项目

```bash
# 删除项目（需要权限）
glab repo delete <namespace/project>
glab repo delete lindesty/old-project
```

---

## 3. 组 (Group) 管理

### 3.1 列出组

```bash
# 列出当前用户所属的所有组
glab api '/groups?per_page=100'
```

### 3.2 查看组详情

```bash
glab api '/groups/<group-id>'
glab api '/groups/40'  # LearnBook 组信息
```

### 3.3 列出组内项目

```bash
glab api '/groups/<group-id>/projects?per_page=100'
glab api '/groups/40/projects'  # LearnBook 组下的项目
```

### 3.4 查看组成员

```bash
glab api '/groups/<group-id>/members'
glab api '/groups/40/members'
```

---

## 4. 合并请求 (MR)

### 4.1 查看 MR

```bash
# 列出当前项目的 MR
glab mr list

# 列出所有状态的 MR
glab mr list --all

# 查看特定 MR 详情
glab mr view <mr-id>

# 查看 MR 的 diff
glab mr diff <mr-id>
```

### 4.2 创建 MR

```bash
glab mr create --title "新增功能" --description "描述变更内容" \
  --source-branch feature/my-feature --target-branch main

# 创建 MR 并指定审查人
glab mr create -t "修复Bug" -d "修复了...问题" --reviewer @username
```

### 4.3 合并 / 关闭 MR

```bash
# 合并 MR
glab mr merge <mr-id>

# 关闭 MR（不合并）
glab mr close <mr-id>

# 用 squash 方式合并
glab mr merge <mr-id> --squash
```

### 4.4 检出 MR 到本地

```bash
glab mr checkout <mr-id>
```

---

## 5. Issue 管理

### 5.1 列出和查看 Issue

```bash
# 列出项目 Issues
glab issue list

# 列出所有状态 Issues
glab issue list --all

# 查看特定 Issue
glab issue view <issue-id>

# 搜索 Issue
glab issue list --search "关键词"
```

### 5.2 创建和关闭 Issue

```bash
# 创建 Issue
glab issue create --title "新功能建议" --description "建议实现..."

# 关闭 Issue
glab issue close <issue-id>

# 重新打开 Issue
glab issue reopen <issue-id>

# 给 Issue 加标签
glab issue create -t "Bug" -d "复现步骤..." --label "bug,high-priority"
```

---

## 6. CI/CD 流水线

### 6.1 查看流水线

```bash
# 列出 CI 流水线
glab ci list

# 查看流水线详情
glab ci view <pipeline-id>

# 查看流水线状态
glab ci status
```

### 6.2 管理 Job

```bash
# 列出流水线中的所有 Job
glab ci jobs

# 查看 Job 日志
glab ci job logs <job-id>

# 重试失败的 Job
glab ci retry

# 取消正在运行的 Job
glab ci cancel
```

### 6.3 触发流水线

```bash
# 手动触发现流水线
glab ci run

# 指定分支运行流水线
glab ci run --branch main

# 带变量触发
glab ci run --variables "DEPLOY_ENV=staging"
```

---

## 7. API 直接调用

`glab api` 是最强大的命令 —— 可以调用 GitLab REST API 的任何端点，实现普通命令不支持的操作。

### 7.1 常用 API 调用

```bash
# 获取当前用户信息
glab api '/user'

# 列出项目中所有文件
glab api '/projects/<namespace>%2F<project>/repository/tree'

# URL 编码示例：lindesty/whisper-console → lindesty%2Fwhisper-console
glab api '/projects/lindesty%2Fwhisper-console/repository/tree'

# 获取文件内容
glab api '/projects/lindesty%2Fwhisper-console/repository/files/README.md/raw'

# 创建 Issue（通过 API）
glab api '/projects/lindesty%2Fwhisper-console/issues' -f title="API创建的Issue"

# 列出所有 Runner
glab api '/runners/per_page=100'

# 获取系统状态
glab api '/application/statistics'
```

### 7.2 API 参数说明

| 参数             | 说明                 | 示例                              |
| ---------------- | -------------------- | --------------------------------- |
| `-f` / `--field` | POST/PUT 的表单字段  | `-f title="标题"`                 |
| `-F`             | 文件字段             | `-F file=@./file.txt`             |
| `-X`             | HTTP 方法            | `-X POST`、`-X PUT`、`-X DELETE`  |
| `--paginate`     | 自动分页遍历所有结果 | `glab api '/projects' --paginate` |

---

## 8. 搜索

```bash
# 搜索项目
glab repo search <关键词>

# 搜索代码（beta）
glab search code --query "import React" --page 1 --per-page 20

# 搜索 Issue
glab search issue --query "bug" --page 1 --per-page 10

# 搜索 MR
glab search mr --query "feature" --page 1 --per-page 10
```

---

## 9. 常用组合技巧

### 9.1 列出项目中所有分支

```bash
glab api '/projects/<namespace>%2F<project>/repository/branches'
```

### 9.2 批量克隆组内所有项目

```bash
glab repo clone -g LearnBook
```

### 9.3 查看当天的 CI 运行状态

```bash
glab ci list --per-page 50 | Select-String "running|pending|failed"
```

### 9.4 快速创建 Issue 并指派给自己

```bash
glab issue create -t "待办事项" -d "描述" --assignee @me
```

### 9.5 获取项目统计信息

```bash
# 获取项目详情（含统计）
glab api '/projects/<namespace>%2F<project>?statistics=true'
```

### 9.6 格式化 API 输出

```bash
# PowerShell: 将 JSON 转为表格
glab api '/groups?per_page=100' | ConvertFrom-Json | Select-Object id,name,full_path,visibility | Format-Table

# 或使用 jq (需要安装)
glab api '/groups?per_page=100' | jq '.[] | {id, name, full_path, visibility}'
```

---
