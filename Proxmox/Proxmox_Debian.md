# Debian 通过微软APT源安装 dotnet sdk 


1.  **添加微软包源**：打开终端，执行以下命令以下载并安装微软官方包源。请注意，微软源目前主要提供适用于 **x64** 和 **Arm64** 架构的 .NET 10 软件包。
    ```bash
    wget https://packages.microsoft.com/config/debian/13/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
    dpkg -i packages-microsoft-prod.deb
    rm packages-microsoft-prod.deb
    ```

2.  **安装 SDK**：更新包列表并安装 .NET 10 SDK。
    ```bash
    apt-get update
    apt-get install -y dotnet-sdk-10.0
    ```
    SDK 包含了对应的运行时，安装后即可直接用于开发、编译和运行 .NET 应用。

3.  **验证安装**：安装完成后，可以运行以下命令来检查是否安装成功。
    ```bash
    dotnet --version
    ```

# Debian 安装docker 及其必要组件

在 Debian 13 上安装 Docker 及其必要组件，推荐使用 Docker 官方 APT 仓库进行安装。这种方式能确保你获得最新的稳定版 Docker Engine、命令行工具、containerd 运行时以及 Compose 和 Buildx 等核心插件。

下面是详细的操作步骤，供你参考。

## 准备工作

在开始前，建议先卸载可能存在的旧版或冲突的 Docker 包，以确保安装环境干净。

```bash
# 移除旧版本或冲突的包
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do apt-get remove $pkg; done
```

## 详细安装步骤

按照以下步骤，通过 APT 仓库完成安装。

**1. 更新系统并安装依赖**
首先更新软件包索引，并安装让 `apt` 支持 HTTPS 仓库的必要工具。

```bash
apt-get update
apt-get install ca-certificates curl gnupg lsb-release -y
```

**2. 添加 Docker 官方 GPG 密钥**
下载并添加 Docker 的官方 GPG 密钥，以验证软件包的完整性和真实性。

```bash
# 创建密钥存储目录
install -m 0755 -d /etc/apt/keyrings
# 下载并安装密钥
curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
```

**3. 添加 Docker 官方 APT 仓库**
此命令会自动识别 Debian 13 的代号 `trixie`，并将 Docker 的稳定版仓库添加到系统源中。

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null
```

**4. 安装 Docker 及其组件**
再次更新软件包索引，然后一次性安装 Docker Engine、CLI、containerd 以及 `docker compose` 和 `docker buildx` 插件。

```bash
apt-get update
apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
```

### 验证与后续配置

安装完成后，通过以下步骤验证并完成基本配置。

**1. 验证安装**
运行经典的 `hello-world` 镜像来测试 Docker 是否能正常工作。

```bash
docker run hello-world
```
如果看到 `Hello from Docker!` 的输出，就说明安装成功了。

**2. 以非 Root 用户管理 Docker**
为了安全，不建议一直使用 `root` 权限运行 Docker 命令。可以将你的用户添加到 `docker` 用户组，之后使用 `docker` 命令时就无需再加 `sudo` 了。

```bash
# 创建 docker 组，如果它不存在
groupadd docker
# 将当前用户添加到 docker 组
usermod -aG docker $USER
```
**注意**：你需要**注销并重新登录**，或者运行 `newgrp docker` 命令，使 group 成员的变更在当前终端会话中立即生效。

**3. 设置 Docker 开机自启**
确保 Docker 服务在系统启动时自动运行。

```bash
systemctl enable docker
systemctl enable containerd
```

### 组件说明

通过以上步骤，你实际上安装了一套完整的 Docker 环境，其中包含了几个必要的核心组件：

*   **docker-ce**: Docker 社区版引擎，是运行容器的核心服务（守护进程）。
*   **docker-ce-cli**: Docker 命令行界面工具，用于与 Docker 守护进程交互。
*   **containerd.io**: 一个工业标准的容器运行时，负责容器的生命周期管理。
*   **docker-buildx-plugin**: 一个用于构建 Docker 镜像的增强型 CLI 插件，支持多平台构建等高级功能。
*   **docker-compose-plugin**: Docker Compose V2，作为一个 CLI 插件安装，用于定义和运行多容器应用。其命令格式为 `docker compose`，注意中间没有横线。