# Linux 基础教程

> **文档说明**：本文档基于经典 Linux 教程优化整理，修复了过时的技术描述，补充了现代 Linux 系统的相关变化。
> 
> **适用版本**：CentOS 7.x / Rocky Linux 8/9 / AlmaLinux 8/9 / Ubuntu 20.04+ / Debian 11+
> 
> **最后更新**：2025年

---

## 目录

1. [计算机概论](#第零章-计算机概论)
2. [Linux 安装与基本概念](#第一章-linux-安装与基本概念)
3. [文件系统与磁盘管理](#第二章-文件系统与磁盘管理)
4. [Shell 与脚本编程](#第三章-shell-与脚本编程)
5. [Vim 编辑器](#第四章-vim-编辑器)
6. [账号管理与 ACL](#第五章-账号管理与-acl)
7. [磁盘配额与高级文件系统管理](#第六章-磁盘配额与高级文件系统管理)
8. [进程管理与性能监控](#第七章-进程管理与性能监控)
9. [系统服务与守护进程](#第八章-系统服务与守护进程)
10. [日志分析与系统安全](#第九章-日志分析与系统安全)
11. [网络基础配置](#第十章-网络基础配置)
12. [软件包管理](#第十一章-软件包管理)
13. [Linux 核心编译](#第十二章-linux-核心编译)

---

## 第零章 计算机概论

### 0.1 计算机：辅助人脑的好工具

#### 什么是计算机

计算机是一种**计算器**，其定义为：
> 接受用户输入指令与数据，经由中央处理器的数学与逻辑单元运算处理后，以产生或储存成有用的信息。

现代计算机设备包括：
- 桌面计算机（台式机）
- 笔记本电脑
- 平板计算机
- 智能手机
- 单板计算机（Raspberry Pi、Banana Pi 等）
- 智能手表与可穿戴设备

#### 计算机硬件的五大单元

```
┌─────────────────────────────────────────────────────────────┐
│                        计算机系统架构                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐    ┌──────────────────┐    ┌──────────┐      │
│  │  输入单元  │───▶│      主机部分     │───▶│  输出单元  │      │
│  └──────────┘    │  ┌────────────┐  │    └──────────┘      │
│                   │  │    CPU     │  │                      │
│                   │  │ ┌────────┐ │  │                      │
│                   │  │ │控制单元 │ │  │                      │
│                   │  │ │算数逻辑 │ │  │                      │
│                   │  │ │  单元   │ │  │                      │
│                   │  │ └────────┘ │  │                      │
│                   │  └────────────┘  │                      │
│                   │  ┌────────────┐  │                      │
│                   │  │  主存储器   │  │                      │
│                   │  │   (RAM)    │  │                      │
│                   │  └────────────┘  │                      │
│                   └──────────────────┘                      │
└─────────────────────────────────────────────────────────────┘
```

**五大核心组件**：
1. **输入单元**：键盘、鼠标、扫描仪、触摸屏等
2. **输出单元**：显示器、打印机、音箱等
3. **CPU 控制单元**：协调各组件工作
4. **CPU 算数逻辑单元**：执行运算与逻辑判断
5. **主存储器**：临时存储正在处理的数据

> **重要概念**：所有数据都必须经过主存储器，因此内存容量直接影响系统性能。

#### CPU 架构

**RISC（精简指令集）**：
- 指令精简，执行时间短
- 代表：ARM、RISC-V、SPARC、Power Architecture
- 应用：移动设备、嵌入式系统、服务器

**CISC（复杂指令集）**：
- 指令复杂，功能丰富
- 代表：x86、x86_64（AMD64）
- 应用：个人计算机、服务器

**现代 CPU 特性**（已更新）：
| 特性 | Intel | AMD |
|------|-------|-----|
| 多媒体指令集 | SSE4、AVX、AVX2、AVX-512 | SSE4、AVX、AVX2、AVX-512 |
| 虚拟化 | VT-x、VT-d | AMD-V、AMD-Vi |
| 省电技术 | SpeedStep、Turbo Boost | PowerNow!、Precision Boost |
| 64位技术 | Intel 64 (EM64T) | AMD64 |

### 0.2 个人计算机架构

#### 现代主板架构（已更新）

```
┌─────────────────────────────────────────────────────────────┐
│                    现代 Intel 芯片架构                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────┐      ┌─────────┐      ┌─────────┐          │
│   │  CPU    │◄────►│  内存   │      │  PCIe   │          │
│   │ (集成   │      │ (DDR4/  │      │  插槽   │          │
│   │ 内存    │      │  DDR5)  │      │         │          │
│   │ 控制器) │      └─────────┘      └────┬────┘          │
│   └────┬────┘                            │               │
│        │                                  │               │
│        │         ┌─────────────────────────┘               │
│        │         │                                       │
│        └────────►│    PCH（平台控制器中心）                │
│                  │    ┌─────────┐  ┌─────────┐           │
│                  │    │  SATA   │  │  USB    │           │
│                  │    │  控制器  │  │ 控制器  │           │
│                  │    └─────────┘  └─────────┘           │
│                  │    ┌─────────┐  ┌─────────┐           │
│                  │    │  网络   │  │  声卡   │           │
│                  │    │  控制器  │  │         │           │
│                  │    └─────────┘  └─────────┘           │
│                  └──────────────────────────────────────  │
└─────────────────────────────────────────────────────────────┘
```

> **架构变化**：现代 CPU 已将内存控制器集成到 CPU 内部，传统"北桥"芯片的功能已被 CPU 取代，主板芯片组现在主要称为 PCH（Platform Controller Hub）。

#### 内存技术演进

| 类型 | 数据宽度 | 传输速率 | 带宽 |
|------|----------|----------|------|
| DDR3-1600 | 64-bit | 1600 MT/s | 12.8 GB/s |
| DDR4-3200 | 64-bit | 3200 MT/s | 25.6 GB/s |
| DDR5-4800 | 64-bit | 4800 MT/s | 38.4 GB/s |
| DDR5-6400 | 64-bit | 6400 MT/s | 51.2 GB/s |

**多通道技术**：
- 双通道：128-bit 数据宽度
- 四通道：256-bit 数据宽度
- 服务器级支持六通道、八通道

#### 存储设备

**硬盘接口演进**（已更新）：
| 接口 | 理论带宽 | 实际应用 |
|------|----------|----------|
| SATA III | 6 Gbps | ~600 MB/s |
| NVMe (PCIe 3.0 x4) | 32 Gbps | ~3.5 GB/s |
| NVMe (PCIe 4.0 x4) | 64 Gbps | ~7 GB/s |
| NVMe (PCIe 5.0 x4) | 128 Gbps | ~14 GB/s |

> **注意**：现代系统已普遍采用 NVMe SSD 替代传统 SATA SSD/HDD，速度提升显著。

### 0.3 计算机分类

| 类型 | 特点 | 应用场景 |
|------|------|----------|
| 超级计算机 | 运算速度极快，维护成本高 | 国防军事、气象预测、科学研究 |
| 大型机 | 多高速 CPU，处理大量数据 | 金融交易、大型企业数据库 |
| 服务器 | 强调稳定性，7×24运行 | Web服务、云计算、虚拟化 |
| 工作站 | 高性能/价格比，专业用途 | 工程设计、科学计算 |
| 个人计算机 | 体积小，价格低，功能全 | 日常办公、娱乐 |

### 0.4 计算单位

#### 容量单位

```
1 Byte = 8 bits
1 KB = 1024 Bytes (二进制) / 1000 Bytes (十进制)
1 MB = 1024 KB
1 GB = 1024 MB
1 TB = 1024 GB
1 PB = 1024 TB
```

> **注意**：硬盘制造商使用十进制（1GB = 10^9 Bytes），而操作系统使用二进制（1GB = 2^30 Bytes），因此 500GB 硬盘显示为约 465GB 是正常的。

#### 速度单位

- **CPU 频率**：GHz（每秒十亿次周期）
- **网络带宽**：Mbps/Gbps（每秒百万/十亿比特）
- **内存带宽**：GB/s

---

## 第一章 Linux 安装与基本概念

### 1.1 什么是 Linux

Linux 是一种**类 Unix 操作系统**，由 Linus Torvalds 于 1991 年发布。严格来说：
- **Linux**：指操作系统内核（Kernel）
- **GNU/Linux**：完整的操作系统（内核 + 系统工具 + 应用程序）

#### Linux 发行版

| 发行版 | 包管理器 | 特点 | 适用场景 |
|--------|----------|------|----------|
| **RHEL/CentOS** | RPM/YUM/DNF | 企业级，稳定 | 服务器、企业 |
| **Rocky Linux** | RPM/DNF | CentOS 替代品 | 服务器 |
| **AlmaLinux** | RPM/DNF | CentOS 替代品 | 服务器 |
| **Ubuntu** | DEB/APT | 易用，社区活跃 | 桌面、服务器、云 |
| **Debian** | DEB/APT | 稳定，自由软件 | 服务器 |
| **Fedora** | RPM/DNF | 新技术测试 | 桌面开发 |
| **Arch Linux** | Pacman | 滚动更新 | 高级用户 |

> **CentOS 变化说明**：CentOS 8 已于 2021 年底停止维护，转向 CentOS Stream（滚动更新）。建议生产环境迁移至 Rocky Linux 或 AlmaLinux。

### 1.2 磁盘分区

#### MBR vs GPT

| 特性 | MBR | GPT |
|------|-----|-----|
| 最大磁盘容量 | 2 TB | 18 EB（exabytes） |
| 最大分区数 | 4 主分区 / 15 逻辑分区 | 128 个分区 |
| 数据安全性 | 单份分区表 | 主备双份分区表 |
| 兼容性 | 传统 BIOS | UEFI 必需 |
| 校验机制 | 无 | CRC32 校验 |

> **现代建议**：新系统应使用 GPT + UEFI 模式。

#### Linux 分区方案

**基础方案**：
```
/       (root)      - 系统根目录，建议 50GB+
/boot   (可选)      - 启动分区，UEFI 下为 /boot/efi，1GB
swap    (交换分区)  - 内存不足时使用，建议：
                    - RAM ≤ 2GB: swap = 2×RAM
                    - RAM 2-8GB: swap = RAM
                    - RAM ≥ 8GB: swap = 4-8GB 或禁用
/home   (可选)      - 用户数据，建议单独分区
```

**服务器方案**：
```
/           - 50GB
/boot/efi   - 1GB (UEFI)
swap        - 根据内存大小
/home       - 根据用户数据量
/var        - 日志、缓存，建议单独分区
/opt        - 第三方软件
/data       - 数据分区（自定义）
```

### 1.3 文件系统

#### Linux 标准目录结构（FHS）

```
/                   # 根目录
├── /bin            # 基本用户命令（ls, cp, mv 等）
├── /boot           # 启动文件
├── /dev            # 设备文件
├── /etc            # 系统配置文件
├── /home           # 用户主目录
│   ├── /home/user1
│   └── /home/user2
├── /lib            # 共享库
├── /lib64          # 64位共享库
├── /media          # 可移动媒体挂载点
├── /mnt            # 临时挂载点
├── /opt            # 可选软件包
├── /proc           # 进程信息（虚拟文件系统）
├── /root           # root 用户主目录
├── /run            # 运行时变量数据
├── /sbin           # 系统管理命令
├── /srv            # 服务数据
├── /sys            # 系统信息（虚拟文件系统）
├── /tmp            # 临时文件
├── /usr            # 用户程序
│   ├── /usr/bin    # 用户命令
│   ├── /usr/lib    # 库文件
│   ├── /usr/local  # 本地安装软件
│   └── /usr/share  # 共享数据
├── /var            # 可变数据
│   ├── /var/log    # 日志文件
│   ├── /var/spool  # 队列数据
│   └── /var/tmp    # 持久临时文件
└── /lost+found     # 文件系统修复目录
```

#### 常用文件系统类型

| 文件系统 | 特点 | 适用场景 |
|----------|------|----------|
| **ext4** | 稳定，成熟， journaling | 通用，推荐 |
| **XFS** | 高性能，大文件，扩展性好 | 大数据，服务器 |
| **Btrfs** | 快照，校验和，子卷 | 桌面，实验性 |
| **ZFS** | 高级卷管理，数据完整性 | 企业存储 |
| **NTFS** | Windows 兼容 | 双系统数据共享 |
| **exFAT** | 跨平台兼容 | U盘，移动硬盘 |

### 1.4 安装模式

#### 安装源选择

1. **本地安装**：DVD/USB 安装介质
2. **网络安装**：PXE、HTTP、FTP、NFS
3. **云镜像**：AWS、Azure、GCP 等云平台

#### 安装类型

- **最小安装**：仅基础系统，适合服务器
- **服务器安装**：包含常用服务器软件
- **桌面安装**：图形界面 + 办公软件
- **自定义**：手动选择软件包

---

## 第二章 文件系统与磁盘管理

### 2.1 文件与目录管理

#### 基本命令

```bash
# 目录操作
pwd                     # 显示当前目录
ls -la                  # 列出文件（含隐藏文件）
cd /path/to/dir         # 切换目录
cd ~ 或 cd              # 返回主目录
cd -                    # 返回上次目录
mkdir -p dir1/dir2      # 递归创建目录
rmdir dir               # 删除空目录
rm -rf dir              # 递归强制删除（谨慎使用）

# 文件操作
cp file1 file2          # 复制文件
cp -r dir1 dir2         # 递归复制目录
mv file1 file2          # 移动/重命名文件
rm file                 # 删除文件
rm -i file              # 交互式删除
touch file              # 创建空文件或更新时间戳

# 查看文件
cat file                # 显示文件内容
head -n 20 file         # 显示前20行
tail -n 20 file         # 显示后20行
tail -f /var/log/messages  # 实时跟踪日志
less file               # 分页查看（可上下滚动）
more file               # 分页查看（仅向下）
```

#### 文件权限

```
-rwxr-xr-x  1 user group  1234 Jan 1 12:00 file.txt
│└┬┘└┬┘└┬┘
│ │  │  │
│ │  │  └── 其他用户权限
│ │  └───── 所属组权限
│ └──────── 所有者权限
└────────── 文件类型（- 普通文件，d 目录，l 链接）
```

权限数字表示：
```
r = 4, w = 2, x = 1

rwx = 4+2+1 = 7
rw- = 4+2+0 = 6
r-x = 4+0+1 = 5
r-- = 4+0+0 = 4
```

```bash
chmod 755 file          # 设置权限 rwxr-xr-x
chmod u+x file          # 给所有者添加执行权限
chmod g-w file          # 移除组的写权限
chmod o=r file          # 设置其他用户只读

chown user:group file   # 更改所有者和组
chown -R user:group dir # 递归更改
```

#### 特殊权限

| 权限 | 符号 | 数字 | 作用 |
|------|------|------|------|
| SUID | s (所有者) | 4 | 执行时获得所有者权限 |
| SGID | s (组) | 2 | 执行时获得组权限，目录下新建文件继承组 |
| Sticky | t (其他) | 1 | 目录中仅所有者能删除自己的文件 |

```bash
chmod 4755 file         # 设置 SUID
chmod 2755 dir          # 设置 SGID
chmod 1755 /tmp         # 设置 Sticky（/tmp 默认）
```

### 2.2 磁盘分区与格式化

#### 查看磁盘信息

```bash
# 查看块设备
lsblk

# 详细磁盘信息
fdisk -l

# 查看磁盘使用情况
df -h
df -Th                  # 显示文件系统类型

# 查看目录占用空间
du -sh /var
du -h --max-depth=1 /home
```

#### 分区工具

**fdisk**（MBR）：
```bash
fdisk /dev/sda

# 常用命令：
# n - 新建分区
# d - 删除分区
# p - 显示分区表
# w - 写入并退出
# q - 不保存退出
# t - 更改分区类型
```

**gdisk**（GPT）：
```bash
gdisk /dev/sda

# 命令与 fdisk 类似
```

**parted**（通用）：
```bash
parted /dev/sda

# 创建 GPT 分区表
mklabel gpt

# 创建分区
mkpart primary ext4 1MiB 100GiB

# 查看分区
print
```

#### 格式化文件系统

```bash
# 创建 ext4 文件系统
mkfs.ext4 /dev/sda1
mkfs -t ext4 /dev/sda1

# 创建 XFS 文件系统
mkfs.xfs /dev/sda1
mkfs.xfs -f /dev/sda1      # 强制格式化（如果已有文件系统）

# 创建 Btrfs 文件系统
mkfs.btrfs /dev/sda1

# 查看文件系统信息
tune2fs -l /dev/sda1      # ext2/3/4
xfs_info /dev/sda1        # XFS
btrfs filesystem show      # Btrfs
```

### 2.3 挂载与卸载

#### 手动挂载

```bash
# 基本挂载
mount /dev/sda1 /mnt

# 指定文件系统类型
mount -t ext4 /dev/sda1 /mnt
mount -t ntfs-3g /dev/sdb1 /mnt/windows

# 挂载时指定选项
mount -o ro /dev/sda1 /mnt          # 只读挂载
mount -o remount,rw /mnt            # 重新挂载为读写
mount -o noexec,nosuid /dev/sda1 /mnt  # 安全选项
```

#### 自动挂载（/etc/fstab）

```bash
# 格式：
# <设备> <挂载点> <文件系统> <选项> <dump> <fsck>

# 示例 /etc/fstab
UUID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx  /      ext4    defaults        1 1
UUID=yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy  /boot  ext4    defaults        1 2
UUID=zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz  swap   swap    defaults        0 0
/dev/sdb1                                  /data  xfs     defaults,noatime 0 0

# 获取 UUID
blkid
lsblk -f
```

**选项说明**：
| 选项 | 说明 |
|------|------|
| defaults | 默认选项（rw, suid, dev, exec, auto, nouser, async） |
| noatime | 不更新访问时间，减少磁盘 I/O |
| nodiratime | 不更新目录访问时间 |
| ro | 只读挂载 |
| rw | 读写挂载 |
| auto | 开机自动挂载 |
| noauto | 开机不自动挂载 |

#### 交换分区管理

```bash
# 创建 swap 文件
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile

# 添加到 /etc/fstab
/swapfile none swap sw 0 0

# 查看 swap 使用情况
swapon -s
free -h

# 关闭 swap
swapoff /swapfile
```

### 2.4 LVM 逻辑卷管理

#### LVM 架构

```
物理卷 (PV) ──┐
物理卷 (PV) ──┼──► 卷组 (VG) ──► 逻辑卷 (LV) ──► 文件系统
物理卷 (PV) ──┘
```

#### LVM 操作

```bash
# 创建物理卷
pvcreate /dev/sdb1 /dev/sdc1
pvcreate /dev/sdb

# 查看物理卷
pvdisplay
pvs

# 创建卷组
vgcreate vg_data /dev/sdb1 /dev/sdc1

# 查看卷组
vgdisplay
vgs

# 创建逻辑卷
lvcreate -L 100G -n lv_data vg_data
lvcreate -l 100%FREE -n lv_data vg_data  # 使用全部剩余空间

# 查看逻辑卷
lvdisplay
lvs

# 格式化逻辑卷
mkfs.ext4 /dev/vg_data/lv_data

# 挂载
mount /dev/vg_data/lv_data /data

# 扩展逻辑卷
lvextend -L +50G /dev/vg_data/lv_data
lvextend -l +100%FREE /dev/vg_data/lv_data

# 扩展文件系统（ext4）
resize2fs /dev/vg_data/lv_data

# 扩展文件系统（XFS）
xfs_growfs /data

# 扩展卷组
vgextend vg_data /dev/sdd1

# 缩减逻辑卷（ext4 支持，XFS 不支持）
# 1. 先卸载
umount /data
# 2. 检查文件系统
e2fsck -f /dev/vg_data/lv_data
# 3. 缩减文件系统
resize2fs /dev/vg_data/lv_data 50G
# 4. 缩减逻辑卷
lvreduce -L 50G /dev/vg_data/lv_data
# 5. 重新挂载
mount /dev/vg_data/lv_data /data

# 删除逻辑卷
lvremove /dev/vg_data/lv_data

# 删除卷组
vgremove vg_data

# 删除物理卷
pvremove /dev/sdb1
```

### 2.5 RAID 磁盘阵列

#### RAID 级别对比

| 级别 | 名称 | 最少磁盘 | 可用容量 | 容错能力 | 读性能 | 写性能 |
|------|------|----------|----------|----------|--------|--------|
| RAID 0 | 条带 | 2 | 100% | 无 | 高 | 高 |
| RAID 1 | 镜像 | 2 | 50% | 1块 | 高 | 中 |
| RAID 5 | 分布式奇偶校验 | 3 | (n-1)/n | 1块 | 中 | 中 |
| RAID 6 | 双分布式奇偶校验 | 4 | (n-2)/n | 2块 | 中 | 低 |
| RAID 10 | 镜像+条带 | 4 | 50% | 每组1块 | 高 | 高 |

#### mdadm 管理 RAID

```bash
# 创建 RAID 1
mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb1 /dev/sdc1

# 创建 RAID 5
mdadm --create /dev/md0 --level=5 --raid-devices=3 /dev/sdb1 /dev/sdc1 /dev/sdd1

# 创建 RAID 10
mdadm --create /dev/md0 --level=10 --raid-devices=4 /dev/sd[b-e]1

# 查看 RAID 状态
cat /proc/mdstat
mdadm --detail /dev/md0

# 格式化
mkfs.ext4 /dev/md0

# 添加到 /etc/fstab
/dev/md0 /data ext4 defaults 0 0

# 保存 RAID 配置
mdadm --detail --scan >> /etc/mdadm.conf

# 模拟磁盘故障
mdadm --fail /dev/md0 /dev/sdb1

# 移除故障磁盘
mdadm --remove /dev/md0 /dev/sdb1

# 添加新磁盘
mdadm --add /dev/md0 /dev/sdf1

# 停止 RAID
mdadm --stop /dev/md0

# 重新组装
mdadm --assemble /dev/md0 /dev/sdb1 /dev/sdc1
```

---

## 第三章 Shell 与脚本编程

### 3.1 Shell 基础

#### 常见 Shell

| Shell | 特点 | 默认路径 |
|-------|------|----------|
| Bash | 最常用，兼容 sh | /bin/bash |
| Zsh | 功能丰富，配置强大 | /bin/zsh |
| Fish | 用户友好，自动补全 | /usr/bin/fish |
| Sh | POSIX 标准 shell | /bin/sh |

#### 基础命令

```bash
# 命令别名
alias ll='ls -alF'
alias rm='rm -i'
unalias ll

# 历史命令
history                 # 显示历史
history -c              # 清空历史
!100                    # 执行第100条历史命令
!!                      # 执行上一条命令
!$                      # 上一条命令的最后一个参数

# 命令查找
which ls                # 查找命令位置
whereis ls              # 查找相关文件
locate filename         # 快速查找（基于数据库）
find / -name "*.conf"   # 实时查找
```

#### 重定向与管道

```bash
# 输出重定向
command > file          # 覆盖输出
command >> file         # 追加输出
command 2> file         # 错误输出
command &> file         # 标准输出和错误都重定向

# 输入重定向
command < file
command << EOF          # 多行输入
...
EOF

# 管道
cat file | grep "pattern"
ps aux | grep nginx | awk '{print $2}'

# 命令组合
command1 ; command2     # 顺序执行
command1 && command2    # 成功才执行 command2
command1 || command2    # 失败才执行 command2
```

### 3.2 变量与环境变量

#### 变量操作

```bash
# 定义变量
var="value"
var=100

# 引用变量
echo $var
echo ${var}

# 只读变量
readonly var="value"

# 删除变量
unset var

# 环境变量
export PATH=$PATH:/usr/local/bin
export VAR="value"

# 查看环境变量
env
printenv
printenv PATH
```

#### 重要环境变量

| 变量 | 说明 |
|------|------|
| PATH | 命令搜索路径 |
| HOME | 用户主目录 |
| USER | 当前用户名 |
| SHELL | 当前 shell |
| LANG | 系统语言 |
| PS1 | 命令提示符格式 |
| EDITOR | 默认编辑器 |

### 3.3 正则表达式

#### 基础正则表达式

| 符号 | 含义 |
|------|------|
| . | 任意单个字符 |
| * | 前一个字符 0 次或多次 |
| ^ | 行首 |
| $ | 行尾 |
| [] | 字符集合 |
| [^] | 反向字符集合 |
| \ | 转义字符 |

#### 扩展正则表达式

| 符号 | 含义 |
|------|------|
| + | 前一个字符 1 次或多次 |
| ? | 前一个字符 0 次或 1 次 |
| {n,m} | 前一个字符 n 到 m 次 |
| () | 分组 |
| | | 或 |

#### grep 使用

```bash
# 基本用法
grep "pattern" file
grep -i "pattern" file      # 忽略大小写
grep -v "pattern" file      # 反向匹配
grep -n "pattern" file      # 显示行号
grep -r "pattern" dir       # 递归搜索
grep -E "pattern" file      # 使用扩展正则
grep -F "pattern" file      # 固定字符串匹配

# 示例
grep -E "^[0-9]{3}-[0-9]{4}$" file    # 匹配电话号码格式
grep -v "^#" /etc/nginx/nginx.conf    # 过滤注释行
grep -v "^$" file                     # 过滤空行
```

### 3.4 文本处理工具

#### sed 流编辑器

```bash
# 基本替换
sed 's/old/new/' file           # 每行第一个匹配
sed 's/old/new/g' file          # 全局替换
sed 's/old/new/2' file          # 每行第2个匹配
sed 's/old/new/2g' file         # 从第2个开始替换

# 删除行
sed '3d' file                   # 删除第3行
sed '3,5d' file                 # 删除3-5行
sed '/pattern/d' file            # 删除匹配行

# 插入和追加
sed '3i\new line' file          # 第3行前插入
sed '3a\new line' file          # 第3行后追加

# 修改
sed -i 's/old/new/g' file       # 直接修改文件
sed -i.bak 's/old/new/g' file   # 修改并备份

# 多命令
sed -e 's/foo/bar/' -e 's/baz/qux/' file
sed 's/foo/bar/; s/baz/qux/' file
```

#### awk 文本处理

```bash
# 基本用法
awk '{print $1}' file           # 打印第1列
awk '{print $1, $3}' file       # 打印第1和第3列
awk -F: '{print $1}' /etc/passwd  # 指定分隔符

# 条件过滤
awk '$3 > 100 {print $1}' file
awk '/pattern/ {print $0}' file
awk '$2 ~ /regex/ {print}' file

# 内置变量
awk '{print NR, $0}' file       # 行号
awk '{print NF}' file           # 字段数
awk 'END {print NR}' file       # 总行数

# 计算
awk '{sum += $1} END {print sum}' file
awk '{sum += $1; count++} END {print sum/count}' file

# 示例：统计内存使用
free | awk '/Mem:/ {printf "内存使用率: %.2f%%\n", $3/$2 * 100}'
```

### 3.5 Shell 脚本编程

#### 脚本结构

```bash
#!/bin/bash
# 脚本名称: example.sh
# 描述: 示例脚本
# 作者: Your Name
# 日期: 2025-01-01

# 设置严格模式
set -euo pipefail

# 变量定义
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="/var/log/example.log"

# 函数定义
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

check_root() {
    if [[ $EUID -ne 0 ]]; then
        log "错误: 需要 root 权限"
        exit 1
    fi
}

# 主程序
check_root
log "脚本开始执行"

# ... 脚本逻辑 ...

log "脚本执行完成"
```

#### 条件判断

```bash
# 数值比较
if [ "$a" -eq "$b" ]; then ... fi    # 等于
if [ "$a" -ne "$b" ]; then ... fi    # 不等于
if [ "$a" -gt "$b" ]; then ... fi    # 大于
if [ "$a" -ge "$b" ]; then ... fi    # 大于等于
if [ "$a" -lt "$b" ]; then ... fi    # 小于
if [ "$a" -le "$b" ]; then ... fi    # 小于等于

# 字符串比较
if [ "$a" = "$b" ]; then ... fi      # 等于
if [ "$a" != "$b" ]; then ... fi     # 不等于
if [ -z "$a" ]; then ... fi          # 空字符串
if [ -n "$a" ]; then ... fi          # 非空字符串

# 文件测试
if [ -e "$file" ]; then ... fi       # 存在
if [ -f "$file" ]; then ... fi       # 是普通文件
if [ -d "$file" ]; then ... fi       # 是目录
if [ -r "$file" ]; then ... fi       # 可读
if [ -w "$file" ]; then ... fi       # 可写
if [ -x "$file" ]; then ... fi       # 可执行
if [ -s "$file" ]; then ... fi       # 非空文件

# 逻辑运算
if [ "$a" = "$b" ] && [ "$c" = "$d" ]; then ... fi
if [ "$a" = "$b" ] || [ "$c" = "$d" ]; then ... fi
if [[ "$a" == "$b" && "$c" == "$d" ]]; then ... fi
```

#### 循环结构

```bash
# for 循环
for i in 1 2 3 4 5; do
    echo $i
done

for i in {1..10}; do
    echo $i
done

for file in *.txt; do
    echo "$file"
done

for ((i=0; i<10; i++)); do
    echo $i
done

# while 循环
counter=0
while [ $counter -lt 10 ]; do
    echo $counter
    ((counter++))
done

# until 循环
counter=0
until [ $counter -ge 10 ]; do
    echo $counter
    ((counter++))
done

# 读取文件
while read line; do
    echo "$line"
done < file.txt

# case 语句
case "$var" in
    start)
        echo "Starting..."
        ;;
    stop)
        echo "Stopping..."
        ;;
    restart)
        echo "Restarting..."
        ;;
    *)
        echo "Unknown command"
        exit 1
        ;;
esac
```

#### 数组操作

```bash
# 定义数组
arr=("value1" "value2" "value3")
arr[0]="value1"
arr[1]="value2"

# 访问数组元素
echo "${arr[0]}"          # 第一个元素
echo "${arr[-1]}"         # 最后一个元素
echo "${arr[@]}"          # 所有元素
echo "${#arr[@]}"         # 数组长度
echo "${!arr[@]}"         # 所有索引

# 遍历数组
for item in "${arr[@]}"; do
    echo "$item"
done

for i in "${!arr[@]}"; do
    echo "$i: ${arr[$i]}"
done

# 添加元素
arr+=("value4")
arr=("${arr[@]}" "value5")

# 删除元素
unset arr[0]
unset arr
```

#### 函数

```bash
#!/bin/bash

# 定义函数
function_name() {
    local var="local value"    # 局部变量
    echo "参数1: $1"
    echo "参数2: $2"
    echo "所有参数: $@"
    echo "参数个数: $#"
    return 0
}

# 调用函数
function_name "arg1" "arg2"
result=$?                       # 获取返回值

# 带返回值的函数
get_result() {
    echo "result value"         # 使用 echo 返回
}

result=$(get_result)
```

---

## 第四章 Vim 编辑器

### 4.1 基本操作

#### 模式切换

```
┌─────────────────────────────────────────────┐
│                                             │
│   普通模式 ──i/I/a/A/o/O──► 插入模式        │
│      │ ◄────Esc/CTRL-[────│                │
│      │                                     │
│      ├──:──► 命令行模式 ◄─Enter─│          │
│      │                                     │
│      └──v/V/CTRL-v──► 可视模式 ◄─Esc─│     │
│                                             │
└─────────────────────────────────────────────┘
```

#### 启动与退出

```vim
vim filename            " 打开文件
vim +10 filename        " 打开文件并跳到第10行
vim +/pattern filename  " 打开文件并跳到第一个匹配

:q                      " 退出（未修改时）
:q!                     " 强制退出不保存
:w                      " 保存
:wq 或 :x 或 ZZ         " 保存并退出
:w filename             " 另存为
```

### 4.2 普通模式命令

#### 移动光标

| 命令 | 功能 |
|------|------|
| `h/j/k/l` | 左/下/上/右 |
| `w/b` | 下一个/上一个单词 |
| `0/^/$` | 行首/第一个非空字符/行尾 |
| `gg/G` | 文件首/文件尾 |
| `nG` | 跳到第n行 |
| `Ctrl+f/b` | 向下/向上翻页 |
| `Ctrl+d/u` | 向下/向上半页 |
| `H/M/L` | 屏幕顶部/中间/底部 |
| `%` | 匹配括号 |
| `*`/`#` | 向下/向上搜索当前单词 |

#### 编辑操作

| 命令 | 功能 |
|------|------|
| `x` | 删除光标处字符 |
| `dd` | 删除整行 |
| `dw` | 删除单词 |
| `d$` 或 `D` | 删除到行尾 |
| `yy` | 复制整行 |
| `yw` | 复制单词 |
| `p`/`P` | 在光标后/前粘贴 |
| `u`/`Ctrl+r` | 撤销/重做 |
| `.` | 重复上次操作 |
| `r`/`R` | 替换单个字符/进入替换模式 |
| `>>`/`<<` | 缩进/反缩进 |

#### 插入模式进入

| 命令 | 功能 |
|------|------|
| `i` | 光标前插入 |
| `a` | 光标后插入 |
| `I` | 行首插入 |
| `A` | 行尾插入 |
| `o` | 下方新开一行 |
| `O` | 上方新开一行 |
| `s` | 删除字符并插入 |
| `S` | 删除整行并插入 |

### 4.3 搜索与替换

```vim
/pattern                " 向下搜索
?pattern                " 向上搜索
n/N                     " 下一个/上一个匹配

:s/old/new/             " 替换当前行第一个
:s/old/new/g            " 替换当前行所有
:%s/old/new/g           " 替换整个文件
:%s/old/new/gc          " 替换并确认
:n,ms/old/new/g         " 替换n到m行
```

### 4.4 可视模式

| 命令 | 功能 |
|------|------|
| `v` | 字符可视模式 |
| `V` | 行可视模式 |
| `Ctrl+v` | 块可视模式 |
| `>`/`<` | 缩进/反缩进选区 |
| `y`/`d` | 复制/删除选区 |

### 4.5 多文件编辑

```vim
:e filename             " 打开另一个文件
:bn/:bp                 " 下一个/上一个缓冲区
:bd                     " 关闭当前缓冲区
:ls                     " 列出缓冲区
:b n                    " 切换到第n个缓冲区

:sp/:vsp filename       " 水平/垂直分割窗口
Ctrl+w w                " 切换窗口
Ctrl+w h/j/k/l          " 移动到左/下/上/右窗口
Ctrl+w c                " 关闭窗口
Ctrl+w o                " 只保留当前窗口

:tabnew filename        " 新建标签页
gt/gT                   " 下一个/上一个标签页
:ngt                    " 跳到第n个标签页
:tabs                   " 列出标签页
```

### 4.6 配置（~/.vimrc）

```vim
" 基本设置
set nocompatible        " 不与 Vi 兼容
set number              " 显示行号
set relativenumber      " 相对行号
set cursorline          " 高亮当前行
set showmatch           " 高亮匹配括号

" 缩进
set expandtab           " Tab 转空格
set tabstop=4           " Tab 宽度
set shiftwidth=4        " 自动缩进宽度
set softtabstop=4       " 退格处理
set autoindent          " 自动缩进
set smartindent         " 智能缩进

" 搜索
set hlsearch            " 高亮搜索
set incsearch           " 增量搜索
set ignorecase          " 忽略大小写
set smartcase           " 智能大小写

" 外观
set laststatus=2        " 始终显示状态栏
set ruler               " 显示光标位置
set wildmenu            " 命令补全菜单
set showcmd             " 显示输入命令

" 编码
set encoding=utf-8
set fileencodings=utf-8,gbk,gb2312

" 备份
set backup
set backupdir=~/.vim/backup
set undofile
set undodir=~/.vim/undo

" 插件管理（vim-plug）
call plug#begin('~/.vim/plugged')
Plug 'tpope/vim-sensible'
Plug 'preservim/nerdtree'
Plug 'vim-airline/vim-airline'
call plug#end()
```

---

## 第五章 账号管理与 ACL

### 5.1 用户与组管理

#### 用户配置文件

| 文件 | 说明 |
|------|------|
| /etc/passwd | 用户账号信息 |
| /etc/shadow | 用户密码（加密） |
| /etc/group | 组信息 |
| /etc/gshadow | 组密码 |
| /etc/skel | 新建用户默认文件模板 |
| /etc/login.defs | 用户创建默认配置 |

#### 用户管理命令

```bash
# 创建用户
useradd username
useradd -m -s /bin/bash -G wheel username
useradd -u 1000 -g users -d /home/username username

# 选项说明
# -m: 创建主目录
# -s: 指定 shell
# -G: 附加组
# -u: 指定 UID
# -g: 指定主组

# 修改用户
usermod -aG wheel username      # 添加到 wheel 组
usermod -s /bin/zsh username    # 修改 shell
usermod -L username             # 锁定用户
usermod -U username             # 解锁用户

# 删除用户
userdel username                # 删除用户
userdel -r username             # 删除用户及主目录

# 设置密码
passwd username
passwd -l username              # 锁定密码
passwd -u username              # 解锁密码
passwd -d username              # 删除密码
chage -l username               # 查看密码过期信息

# 查看用户信息
id username
finger username
getent passwd username
```

#### 组管理

```bash
# 创建组
groupadd groupname
groupadd -g 1000 groupname      # 指定 GID

# 修改组
groupmod -n newname oldname     # 重命名
groupmod -g 2000 groupname      # 修改 GID

# 删除组
groupdel groupname

# 管理组成员
gpasswd -a username groupname   # 添加用户到组
gpasswd -d username groupname   # 从组移除用户
gpasswd -A admin groupname      # 设置组管理员
```

### 5.2 权限管理

#### 文件权限基础

```bash
# 查看权限
ls -l filename
stat filename

# 修改权限
chmod 755 file
chmod u+x file
chmod g-w file
chmod o=r file
chmod -R 755 directory

# 修改所有者
chown user:group file
chown user file
chown :group file
chown -R user:group directory

# 特殊权限
chmod 4755 file         # SUID
chmod 2755 directory    # SGID
chmod 1755 /tmp         # Sticky
```

#### ACL（访问控制列表）

```bash
# 查看 ACL
getfacl filename

# 设置 ACL
setfacl -m u:username:rw file           # 给用户添加权限
setfacl -m g:groupname:rwx directory    # 给组添加权限
setfacl -m o::r file                     # 修改其他用户权限
setfacl -m m::rx file                    # 修改掩码
setfacl -x u:username file                # 删除用户 ACL
setfacl -b file                          # 删除所有 ACL
setfacl -R -m u:username:rx directory     # 递归设置
setfacl -d -m u:username:rx directory     # 设置默认 ACL

# 示例：给特定用户访问权限
setfacl -m u:guest:r-x /home/user/private
setfacl -R -m u:guest:rx /home/user/shared
```

### 5.3 sudo 配置

```bash
# 编辑 sudoers 文件
visudo

# 配置示例
# 用户权限
username ALL=(ALL) ALL

# 组权限
%wheel ALL=(ALL) ALL
%wheel ALL=(ALL) NOPASSWD: ALL

# 命令限制
username ALL=(root) /usr/bin/systemctl restart nginx
username ALL=(root) NOPASSWD: /usr/bin/apt update

# 别名配置
User_Alias ADMINS = user1, user2
Cmnd_Alias NETWORK = /sbin/ifconfig, /sbin/route
ADMINS ALL=(root) NETWORK
```

### 5.4 PAM 认证

PAM（Pluggable Authentication Modules）配置目录：
- `/etc/pam.d/` - 服务配置文件
- `/etc/pam.conf` - 主配置文件（较少使用）

```bash
# 常见 PAM 模块配置
# /etc/pam.d/system-auth

auth        required      pam_env.so
auth        sufficient    pam_unix.so nullok try_first_pass
auth        requisite     pam_succeed_if.so uid >= 1000 quiet_success
auth        required      pam_deny.so

account     required      pam_unix.so
account     sufficient    pam_localuser.so
account     sufficient    pam_succeed_if.so uid < 1000 quiet
account     required      pam_permit.so

password    requisite     pam_pwquality.so try_first_pass local_users_only retry=3 authtok_type=
password    sufficient    pam_unix.so sha512 shadow nullok try_first_pass use_authtok
password    required      pam_deny.so

session     optional      pam_keyinit.so revoke
session     required      pam_limits.so
session     [success=1 default=ignore] pam_succeed_if.so service in crond quiet use_uid
session     required      pam_unix.so
```

---

## 第六章 磁盘配额与高级文件系统管理

### 6.1 磁盘配额（Quota）

#### 启用 Quota

```bash
# 1. 编辑 /etc/fstab，添加 usrquota,grpquota
UUID=xxx /home ext4 defaults,usrquota,grpquota 0 0

# 2. 重新挂载
mount -o remount /home

# 3. 创建配额数据库
quotacheck -cug /home
quotacheck -avug            # 检查并创建

# 4. 启用配额
quotaon -v /home
quotaon -avug               # 启用所有

# 5. 关闭配额
quotaoff /home
```

#### 配额管理

```bash
# 设置用户配额
edquota username

# 内容格式：
# Filesystem    blocks       soft       hard     inodes     soft     hard
# /dev/sda1      10000      15000      20000       1000       0        0

# 复制配额设置
edquota -p user1 user2 user3

# 设置宽限时间
edquota -t

# 查看配额
quota username              # 用户配额
repquota /home              # 所有用户配额报告
repquota -avugs             # 详细报告

# 警告邮件
warnquota                   # 发送警告邮件
```

### 6.2 软件 RAID 管理

见 2.5 节 RAID 磁盘阵列

### 6.3 LVM 快照

```bash
# 创建快照（必须和原 LV 在同一 VG）
lvcreate -L 10G -s -n lv_data_snap /dev/vg_data/lv_data

# 查看快照
lvs
lvdisplay /dev/vg_data/lv_data_snap

# 挂载快照
mount /dev/vg_data/lv_data_snap /mnt/snap

# 恢复快照（合并）
lvconvert --merge /dev/vg_data/lv_data_snap
# 注意：恢复快照后原 LV 会被还原，快照会被删除

# 删除快照
lvremove /dev/vg_data/lv_data_snap
```

### 6.4 Btrfs 文件系统

```bash
# 创建 Btrfs
mkfs.btrfs /dev/sdb1
mkfs.btrfs -d raid1 -m raid1 /dev/sdb1 /dev/sdc1

# 挂载
mount /dev/sdb1 /data

# 查看信息
btrfs filesystem show
btrfs filesystem df /data
btrfs filesystem usage /data

# 创建子卷
btrfs subvolume create /data/subvol1

# 列出子卷
btrfs subvolume list /data

# 快照
btrfs subvolume snapshot /data/subvol1 /data/subvol1_snap

# 删除子卷
btrfs subvolume delete /data/subvol1

# 添加设备
btrfs device add /dev/sdc1 /data
btrfs balance start /data

# 移除设备
btrfs device delete /dev/sdc1 /data

# 碎片整理
btrfs filesystem defragment /data

#  scrub（数据校验）
btrfs scrub start /data
btrfs scrub status /data
```

---

## 第七章 进程管理与性能监控

### 7.1 进程查看

```bash
# 查看进程
ps aux                      # BSD 格式
ps -ef                      # 标准格式
ps aux | grep nginx         # 过滤进程
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu  # 自定义输出

# 树形显示
pstree
pstree -p                   # 显示 PID

# 实时进程监控
top
htop                        # 更友好的界面（需安装）

# 进程详细信息
cat /proc/PID/status
cat /proc/PID/cmdline
cat /proc/PID/environ
ls -l /proc/PID/fd          # 打开的文件
```

#### top 命令详解

```
top - 14:32:01 up 3 days, 2:15, 2 users, load average: 0.52, 0.58, 0.59
Tasks: 235 total,   1 running, 234 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.3 us,  1.0 sy,  0.0 ni, 96.3 id,  0.3 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :  15923.2 total,   2341.5 free,   8234.2 used,   5347.5 buff/cache
MiB Swap:   8192.0 total,   7890.5 free,    301.5 used.   7689.0 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 1234 root      20   0  523456  23456   5678 S   5.6   0.1   2:34.56 nginx
```

**top 交互命令**：
| 按键 | 功能 |
|------|------|
| `h` | 帮助 |
| `q` | 退出 |
| `M` | 按内存排序 |
| `P` | 按 CPU 排序 |
| `T` | 按时间排序 |
| `k` | 杀死进程 |
| `r` | 修改优先级 |
| `1` | 显示所有 CPU |
| `c` | 显示完整命令 |
| `u` | 按用户过滤 |

### 7.2 进程控制

```bash
# 前台/后台运行
command &                   # 后台运行
Ctrl+Z                      # 暂停并放入后台
bg                          # 后台继续运行
fg                          # 前台继续运行
fg %1                       # 将作业1放到前台

# 作业控制
jobs                        # 查看后台作业
jobs -l                     # 显示 PID
kill %1                     # 终止作业1
disown                      # 从当前 shell 分离作业

# 发送信号
kill PID                    # 默认 SIGTERM (15)
kill -9 PID                 # SIGKILL (9)，强制终止
kill -1 PID                 # SIGHUP (1)，重载配置
killall process_name        # 按名称终止
pkill pattern               # 按模式终止

# 信号列表
kill -l
# 常用信号：
# 1  SIGHUP   终端断开
# 9  SIGKILL  强制终止
# 15 SIGTERM  正常终止（默认）
# 18 SIGCONT  继续
# 19 SIGSTOP  暂停
```

### 7.3 进程优先级

```bash
# 查看优先级
ps -eo pid,ni,cmd | grep nginx

# nice 值范围：-20 到 19（值越小优先级越高）

# 以指定优先级启动
nice -n 10 command
nice --10 command           # 负值需要 --

# 修改运行中进程的优先级
renice 10 -p PID
renice -5 -u username      # 修改用户所有进程

# 实时优先级（chrt）
chrt -f 99 command          # FIFO 实时调度
chrt -r 50 command          # RR 实时调度
chrt -o 0 command           # 普通调度

# 查看调度策略
chrt -p PID
```

### 7.4 系统监控工具

```bash
# 系统资源监控
vmstat 1 10               # 每秒刷新，共10次
vmstat -s                   # 显示统计信息

# CPU 监控
mpstat -P ALL 1           # 显示所有 CPU
mpstat 1 10                 # 每秒刷新

# 内存监控
free -h
smem                        # 更详细的内存使用（需安装）

# IO 监控
iostat -x 1 10              # 扩展统计
iotop                       # IO 实时监控（需安装）

# 网络监控
ss -tuln                    # 查看端口
ss -s                       # 统计信息
iftop                       # 流量监控（需安装）
nethogs                     # 按进程显示流量（需安装）

# 综合监控
dstat --full                # 全能系统监控
glances                     # 高级监控工具（需安装）

# 系统调用跟踪
strace -p PID               # 跟踪进程系统调用
strace -c command           # 统计系统调用
ltrace -p PID               # 跟踪库函数调用
```

### 7.5 性能分析

```bash
# CPU 分析
perf top                    # 性能热点
perf record -g command      # 记录性能数据
perf report                 # 分析报告

# 火焰图生成
perf record -F 99 -a -g -- sleep 60
perf script | ./stackcollapse-perf.pl | ./flamegraph.pl > perf.svg

# 内存分析
valgrind --tool=memcheck ./program
valgrind --tool=massif ./program

# 磁盘分析
iostat -dx 1
blktrace /dev/sda

# 网络分析
tcpdump -i eth0 -w capture.pcap
wireshark capture.pcap
```

---

## 第八章 系统服务与守护进程

### 8.1 systemd 系统管理

#### 基本命令

```bash
# 服务管理
systemctl start service
systemctl stop service
systemctl restart service
systemctl reload service    # 重载配置（不中断服务）
systemctl status service
systemctl is-active service
systemctl is-enabled service

# 开机启动
systemctl enable service
systemctl disable service
systemctl mask service      # 屏蔽服务
systemctl unmask service    # 解除屏蔽

# 查看服务
systemctl list-units --type=service
systemctl list-units --type=service --state=running
systemctl list-unit-files --type=service

# 电源管理
systemctl poweroff
systemctl reboot
systemctl suspend
systemctl hibernate
systemctl hybrid-sleep
```

#### 服务单元文件

```ini
# /etc/systemd/system/myapp.service
[Unit]
Description=My Application
Documentation=https://example.com/docs
After=network.target
Wants=network.target

[Service]
Type=simple
User=myuser
Group=myuser
WorkingDirectory=/opt/myapp
ExecStart=/opt/myapp/bin/start.sh
ExecStop=/opt/myapp/bin/stop.sh
ExecReload=/bin/kill -HUP $MAINPID
Restart=on-failure
RestartSec=5
Environment=ENV=production
EnvironmentFile=/etc/myapp/env

[Install]
WantedBy=multi-user.target
```

**Service 类型**：
| 类型 | 说明 |
|------|------|
| simple | 前台运行，ExecStart 启动后主进程即存在 |
| forking | 后台运行，父进程退出后子进程继续运行 |
| oneshot | 一次性执行，执行完即退出 |
| notify | 服务启动后发送通知信号 |
| idle | 延迟到其他任务完成后启动 |

### 8.2 定时任务

#### systemd Timer（现代推荐）

```ini
# /etc/systemd/system/backup.service
[Unit]
Description=Backup Service

[Service]
Type=oneshot
ExecStart=/usr/local/bin/backup.sh

# /etc/systemd/system/backup.timer
[Unit]
Description=Run backup daily

[Timer]
OnCalendar=daily
OnCalendar=*-*-* 02:00:00
Persistent=true

[Install]
WantedBy=timers.target
```

```bash
systemctl enable backup.timer
systemctl start backup.timer
timers                      # 列出所有定时器
```

#### cron（传统方式）

```bash
# 系统级定时任务
/etc/crontab
/etc/cron.d/
/etc/cron.hourly/
/etc/cron.daily/
/etc/cron.weekly/
/etc/cron.monthly/

# 用户级定时任务
crontab -e                  # 编辑
crontab -l                  # 列出
crontab -r                  # 删除
```

**crontab 格式**：
```
# 分钟 小时 日期 月份 星期 命令
# 范围：0-59 0-23 1-31 1-12 0-7 (0和7都是周日)

# 示例
0 2 * * * /usr/local/bin/backup.sh        # 每天2点
*/5 * * * * /usr/local/bin/check.sh       # 每5分钟
0 */6 * * * /usr/local/bin/task.sh        # 每6小时
0 0 * * 0 /usr/local/bin/weekly.sh        # 每周日
0 0 1 * * /usr/local/bin/monthly.sh       # 每月1日

# 特殊字符串
@reboot     # 启动时
@yearly     # 每年1月1日
@monthly    # 每月1日
@weekly     # 每周日
@daily      # 每天
@hourly     # 每小时
```

### 8.3 日志管理

#### journalctl

```bash
# 基本查看
journalctl                  # 查看所有日志
journalctl -u service       # 查看服务日志
journalctl -f               # 实时跟踪
journalctl -n 100           # 最后100行
journalctl --since "2025-01-01 00:00:00"
journalctl --since yesterday
journalctl --since "1 hour ago"

# 过滤
journalctl -p err           # 错误级别以上
journalctl _PID=1234        # 按 PID
journalctl _UID=1000        # 按 UID
journalctl _COMM=nginx      # 按命令名

# 维护
journalctl --disk-usage     # 查看占用空间
journalctl --vacuum-size=500M   # 限制大小
journalctl --vacuum-time=30d    # 限制时间
```

#### rsyslog（传统日志）

```bash
# 配置文件
/etc/rsyslog.conf
/etc/rsyslog.d/

# 日志文件
/var/log/messages           # 一般日志
/var/log/secure             # 安全日志
/var/log/maillog            # 邮件日志
/var/log/cron               # 定时任务日志
/var/log/boot.log           # 启动日志
```

**日志轮转（logrotate）**：
```bash
# 配置
/etc/logrotate.conf
/etc/logrotate.d/

# 示例配置
/var/log/myapp/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 0644 user group
    sharedscripts
    postrotate
        /bin/kill -HUP $(cat /var/run/myapp.pid 2>/dev/null) 2>/dev/null || true
    endscript
}

# 手动执行
logrotate -f /etc/logrotate.conf
logrotate -d /etc/logrotate.conf  # 调试模式
```

---

## 第九章 日志分析与系统安全

### 9.1 日志分析工具

```bash
# 基本分析
grep "error" /var/log/messages
grep -i "fail" /var/log/secure | wc -l
awk '{print $1}' /var/log/secure | sort | uniq -c | sort -rn

# 高级分析
# 统计 IP 访问
awk '{print $11}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -20

# 查找暴力破解
grep "Failed password" /var/log/secure | awk '{print $11}' | sort | uniq -c | sort -rn

# 日志聚合工具
# 安装 logwatch、goaccess、awstats 等
```

### 9.2 SELinux

```bash
# 查看状态
getenforce                  # Enforcing/Permissive/Disabled
sestatus

# 临时切换
setenforce 0                # 宽容模式
setenforce 1                # 强制模式

# 配置文件
/etc/selinux/config

# 查看上下文
ls -Z /var/www
ps auxZ | grep nginx

# 修改上下文
chcon -t httpd_sys_content_t /var/www/html/index.html
chcon -R -t httpd_sys_content_t /var/www/html
restorecon -Rv /var/www/html

# 添加规则
semanage fcontext -a -t httpd_sys_content_t "/var/www/html(/.*)?"
restorecon -Rv /var/www/html

# 布尔值
getsebool -a | grep httpd
setsebool -P httpd_can_network_connect on

# 查看日志
ausearch -m AVC -ts recent
cat /var/log/audit/audit.log | grep AVC
```

### 9.3 防火墙

#### firewalld（推荐）

```bash
# 基本管理
systemctl enable firewalld
systemctl start firewalld
firewall-cmd --state

# 查看配置
firewall-cmd --get-default-zone
firewall-cmd --get-active-zones
firewall-cmd --zone=public --list-all

# 添加服务
firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --zone=public --add-service=https
firewall-cmd --permanent --zone=public --add-service=ssh

# 添加端口
firewall-cmd --permanent --zone=public --add-port=8080/tcp
firewall-cmd --permanent --zone=public --add-port=10000-20000/tcp

# 移除规则
firewall-cmd --permanent --zone=public --remove-service=http

# 富规则
firewall-cmd --permanent --zone=public --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" service name="ssh" accept'
firewall-cmd --permanent --zone=public --add-rich-rule='rule family="ipv4" source address="10.0.0.0/8" port port="3306" protocol="tcp" reject'

# 重新加载
firewall-cmd --reload

# IP 伪装（NAT）
firewall-cmd --permanent --zone=public --add-masquerade
```

#### nftables（新一代）

```bash
# 查看规则
nft list ruleset
nft list table inet filter

# 创建表和链
nft add table inet filter
nft add chain inet filter input { type filter hook input priority 0 \; }

# 添加规则
nft add rule inet filter input tcp dport 22 accept
nft add rule inet filter input tcp dport { 80, 443 } accept
nft add rule inet filter input ct state established,related accept
nft add rule inet filter input drop

# 保存和加载
nft list ruleset > /etc/nftables.conf
nft -f /etc/nftables.conf
```

### 9.4 入侵检测

#### AIDE（文件完整性检查）

```bash
# 安装
yum install aide

# 初始化数据库
aide --init
mv /var/lib/aide/aide.db.new.gz /var/lib/aide/aide.db.gz

# 检查
aide --check

# 更新数据库
aide --update
```

#### Fail2ban（暴力破解防护）

```bash
# 安装
yum install fail2ban

# 配置
# /etc/fail2ban/jail.local
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/secure

# 查看状态
fail2ban-client status
fail2ban-client status sshd
fail2ban-client set sshd unbanip 192.168.1.100
```

---

## 第十章 网络基础配置

### 10.1 网络配置

#### 现代工具（NetworkManager + nmcli）

```bash
# 查看连接
nmcli connection show
nmcli device status

# 配置静态 IP
nmcli connection modify eth0 \
    ipv4.method manual \
    ipv4.addresses 192.168.1.100/24 \
    ipv4.gateway 192.168.1.1 \
    ipv4.dns "8.8.8.8,8.8.4.4"

nmcli connection up eth0

# 配置 DHCP
nmcli connection modify eth0 ipv4.method auto

# 添加第二个 IP
nmcli connection modify eth0 +ipv4.addresses 192.168.1.101/24

# 创建新连接
nmcli connection add type ethernet \
    con-name my-eth \
    ifname eth0 \
    ipv4.method manual \
    ipv4.addresses 192.168.1.100/24 \
    ipv4.gateway 192.168.1.1
```

#### 传统配置文件

```bash
# RHEL/CentOS/Rocky/AlmaLinux
# /etc/sysconfig/network-scripts/ifcfg-eth0
TYPE=Ethernet
BOOTPROTO=static
NAME=eth0
DEVICE=eth0
ONBOOT=yes
IPADDR=192.168.1.100
PREFIX=24
GATEWAY=192.168.1.1
DNS1=8.8.8.8
DNS2=8.8.4.4

# Ubuntu/Debian (netplan)
# /etc/netplan/01-netcfg.yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      addresses:
        - 192.168.1.100/24
      gateway4: 192.168.1.1
      nameservers:
        addresses:
          - 8.8.8.8
          - 8.8.4.4

# 应用配置
netplan apply
```

### 10.2 网络诊断

```bash
# 查看网络配置
ip addr
ip addr show eth0
ip -s link                # 统计信息

# 路由
ip route
ip route get 8.8.8.8

# 邻居（ARP）
ip neigh

# 传统命令
ifconfig                  # 需安装 net-tools
netstat -tuln             # 需安装 net-tools
route -n                  # 需安装 net-tools
arp -a                    # 需安装 net-tools

# 连通性测试
ping 8.8.8.8
ping -c 4 -s 1400 8.8.8.8

traceroute 8.8.8.8
tracepath 8.8.8.8
mtr 8.8.8.8               # 综合诊断工具

# DNS 查询
host example.com
nslookup example.com
dig example.com
dig @8.8.8.8 example.com
dig -x 8.8.8.8            # 反向查询

# 端口扫描
nc -zv 192.168.1.1 22
nc -zv 192.168.1.1 1-1000
ss -tuln                  # 查看监听端口
lsof -i :80               # 查看端口占用

# 抓包
tcpdump -i eth0
tcpdump -i eth0 -w capture.pcap
tcpdump -i eth0 port 80
tcpdump -i eth0 host 192.168.1.1
tcpdump -i eth0 -nn -s0 -v
```

### 10.3 SSH 配置

```bash
# 客户端配置 ~/.ssh/config
Host myserver
    HostName 192.168.1.100
    User admin
    Port 2222
    IdentityFile ~/.ssh/mykey
    ServerAliveInterval 60

# 生成密钥
ssh-keygen -t ed25519 -C "comment"
ssh-keygen -t rsa -b 4096 -C "comment"

# 复制公钥
ssh-copy-id user@host
ssh-copy-id -i ~/.ssh/mykey.pub user@host

# 代理转发
eval $(ssh-agent)
ssh-add ~/.ssh/id_ed25519
ssh-add -l

# 服务端配置 /etc/ssh/sshd_config
Port 22
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2

# 安全加固
# 1. 禁用 root 登录
# 2. 使用密钥认证
# 3. 更改默认端口
# 4. 使用 fail2ban
# 5. 限制允许用户/组
```

---

## 第十一章 软件包管理

### 11.1 RPM/YUM/DNF（RHEL 系列）

#### RPM 基础

```bash
# 查询
rpm -qa                     # 列出所有包
rpm -q package              # 查询包
rpm -qi package             # 包信息
rpm -ql package             # 列出文件
rpm -qf /path/to/file       # 查询文件所属包
rpm -qc package             # 配置文件
rpm -qd package             # 文档文件
rpm -qR package             # 依赖关系
rpm -qp package.rpm         # 查询未安装包

# 验证
rpm -V package              # 验证包
rpm -Va                     # 验证所有包
rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-*

# 安装/卸载
rpm -ivh package.rpm        # 安装
rpm -Uvh package.rpm        # 升级
rpm -e package              # 卸载
rpm --nodeps -e package     # 强制卸载（不推荐）
```

#### YUM/DNF

```bash
# 搜索和查询
yum search keyword
dnf search keyword
yum info package
dnf info package
yum list installed
dnf list installed

# 安装和卸载
yum install package
dnf install package
yum remove package
dnf remove package
yum reinstall package
dnf reinstall package

# 更新
yum update                  # 更新所有
dnf update
yum update package          # 更新指定包
dnf upgrade

# 组管理
yum grouplist
dnf grouplist
yum groupinstall "Development Tools"
dnf groupinstall "Development Tools"

# 仓库管理
yum repolist
dnf repolist
yum repolist all
dnf repolist --all

# 缓存
yum clean all
dnf clean all
yum makecache
dnf makecache

# 历史
yum history
dnf history
yum history undo N
dnf history rollback N

# 插件
yum install yum-utils
yumdownloader package       # 下载 RPM 包
repoquery -l package        # 查询文件
```

#### 仓库配置

```bash
# 仓库文件 /etc/yum.repos.d/
# example.repo
[example]
name=Example Repository
baseurl=https://example.com/repo/$releasever/$basearch/
        https://mirror.example.com/repo/$releasever/$basearch/
enabled=1
gpgcheck=1
gpgkey=https://example.com/RPM-GPG-KEY-example

# 使用镜像列表
mirrorlist=https://example.com/mirrorlist

# 本地仓库
baseurl=file:///mnt/repo

# EPEL 仓库（额外包）
yum install epel-release
dnf install epel-release
```

### 11.2 APT（Debian/Ubuntu）

```bash
# 更新包列表
apt update

# 升级
apt upgrade                 # 安全升级
apt full-upgrade            # 完整升级（可能删除包）
apt dist-upgrade            # 发行版升级

# 安装和卸载
apt install package
apt install package=version
apt remove package          # 保留配置
apt purge package           # 删除配置
apt autoremove              # 删除自动安装的依赖

# 搜索和查询
apt search keyword
apt show package
apt list --installed
apt list --upgradeable

# 缓存管理
apt clean                   # 清理下载的包
apt autoclean               # 清理旧版本

# 其他
apt-cache search keyword
apt-cache show package
apt-cache policy package
apt-cache depends package
apt-cache rdepends package
apt-file search filename    # 查找文件所属包（需安装 apt-file）
```

### 11.3 源码编译安装

```bash
# 通用步骤
# 1. 下载源码
curl -O https://example.com/software-1.0.tar.gz
tar -xzf software-1.0.tar.gz
cd software-1.0

# 2. 配置
./configure --prefix=/usr/local \
    --with-feature \
    --without-feature

# 常见选项
# --prefix=PATH       安装路径
# --sysconfdir=PATH   配置文件路径
# --enable-feature    启用功能
# --disable-feature   禁用功能
# --with-library      使用库
# --without-library   不使用库

# 3. 编译
make -j$(nproc)             # 使用所有 CPU 核心

# 4. 安装
sudo make install

# 5. 卸载（如果支持）
sudo make uninstall

# 使用 checkinstall（创建包）
sudo checkinstall           # Debian/Ubuntu
sudo checkinstall -R        # RPM 格式
```

### 11.4 容器化部署

#### Docker

```bash
# 安装
# CentOS/RHEL
yum install docker-ce
dnf install docker-ce

# Ubuntu/Debian
apt install docker.io

# 基本使用
docker pull image:tag
docker images
docker run -d -p 80:80 --name web nginx
docker ps
docker ps -a
docker exec -it container /bin/bash
docker stop container
docker start container
docker rm container
docker rmi image

# 构建镜像
docker build -t myimage:tag .
docker push registry/myimage:tag
```

#### Podman（无守护进程）

```bash
# 安装
yum install podman
dnf install podman

# 使用（与 Docker 命令类似）
podman pull image:tag
podman run -d -p 80:80 --name web nginx
podman ps
podman exec -it container /bin/bash

# rootless 容器
podman run --user $(id -u):$(id -g) image

# 生成 systemd 服务
podman generate systemd --new --name container > /etc/systemd/system/container.service
```

---

## 第十二章 Linux 核心编译

> **注意**：现代 Linux 发行版通常不需要手动编译内核。仅在以下情况考虑：
> - 需要启用特定功能
> - 嵌入式系统开发
> - 性能优化研究
> - 学习目的

### 12.1 准备工作

```bash
# 安装依赖
yum groupinstall "Development Tools"
yum install ncurses-devel openssl-devel elfutils-libelf-devel

# 下载内核源码
cd /usr/src
wget https://cdn.kernel.org/pub/linux/kernel/v6.x/linux-6.x.y.tar.xz
tar -xvf linux-6.x.y.tar.xz
ln -s linux-6.x.y linux
cd linux
```

### 12.2 配置内核

```bash
# 清理
make mrproper               # 深度清理
make clean                  # 清理编译文件

# 配置方式
make menuconfig             # 文本菜单（推荐）
make xconfig                # Qt 图形界面
make gconfig                # GTK 图形界面
make oldconfig              # 基于旧配置
make defconfig              # 默认配置

# 从当前运行内核复制配置
cp /boot/config-$(uname -r) .config
make oldconfig
```

### 12.3 编译与安装

```bash
# 编译
make -j$(nproc)             # 使用所有 CPU 核心

# 或分步编译
make -j$(nproc) bzImage     # 编译内核
make -j$(nproc) modules     # 编译模块

# 安装模块
make modules_install

# 安装内核
make install                # 自动安装到 /boot

# 或手动安装
cp arch/x86/boot/bzImage /boot/vmlinuz-6.x.y-custom
cp .config /boot/config-6.x.y-custom
cp System.map /boot/System.map-6.x.y-custom

# 创建 initramfs
dracut -v /boot/initramfs-6.x.y-custom.img 6.x.y-custom

# 更新引导
grub2-mkconfig -o /boot/grub2/grub.cfg
```

### 12.4 内核模块管理

```bash
# 查看模块
lsmod
modinfo module_name

# 加载/卸载模块
modprobe module_name
modprobe -r module_name
insmod /path/to/module.ko
rmmod module_name

# 模块参数
modprobe module_name parameter=value

# 模块配置 /etc/modprobe.d/
# example.conf
options module_name parameter=value
blacklist module_name

# 自动加载 /etc/modules-load.d/
# example.conf
module_name

# 依赖关系
depmod -a
```

### 12.5 内核参数

```bash
# 临时修改（运行时）
sysctl parameter=value
sysctl -w net.ipv4.ip_forward=1

# 查看参数
sysctl -a
sysctl parameter

# 永久配置 /etc/sysctl.conf 或 /etc/sysctl.d/
# example.conf
net.ipv4.ip_forward = 1
net.ipv4.conf.all.rp_filter = 1
vm.swappiness = 10

# 应用配置
sysctl -p
sysctl -p /etc/sysctl.d/example.conf

# 通过 /proc/sys/
cat /proc/sys/net/ipv4/ip_forward
echo 1 > /proc/sys/net/ipv4/ip_forward
```

**常用内核参数**：
```
# 网络
net.ipv4.ip_forward = 0                 # IP 转发
net.ipv4.tcp_syncookies = 1            # SYN cookies
net.ipv4.icmp_echo_ignore_broadcasts = 1  # 忽略广播 ping

# 内存
vm.swappiness = 30                     # 交换倾向
vm.dirty_ratio = 40                    # 脏页比例
vm.vfs_cache_pressure = 100            # 缓存回收倾向

# 内核
kernel.msgmax = 65536                  # 最大消息大小
kernel.msgmnb = 65536                  # 消息队列大小
kernel.shmmax = 68719476736            # 共享内存最大
```

---

## 附录

### A. 常用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+C` | 终止当前进程 |
| `Ctrl+Z` | 暂停当前进程 |
| `Ctrl+D` | 退出 shell |
| `Ctrl+L` | 清屏 |
| `Ctrl+A` | 行首 |
| `Ctrl+E` | 行尾 |
| `Ctrl+K` | 删除到行尾 |
| `Ctrl+U` | 删除到行首 |
| `Ctrl+W` | 删除单词 |
| `Ctrl+R` | 历史搜索 |
| `Ctrl+G` | 取消搜索 |
| `Tab` | 自动补全 |
| `Tab` `Tab` | 显示补全选项 |

### B. 退出状态码

| 状态码 | 含义 |
|--------|------|
| 0 | 成功 |
| 1 | 通用错误 |
| 2 | 误用命令 |
| 126 | 命令不可执行 |
| 127 | 命令未找到 |
| 128+N | 被信号 N 终止 |
| 130 | 被 Ctrl+C 终止 |
| 255 | 退出状态码溢出 |

### C. 在线资源

- [Linux 基金会](https://www.linuxfoundation.org/)
- [Kernel.org](https://www.kernel.org/)
- [Linux 文档项目](https://www.tldp.org/)
- [Arch Wiki](https://wiki.archlinux.org/)
- [Red Hat 文档](https://access.redhat.com/documentation/)

---

**文档版本**：1.0  
**最后更新**：2025年  
**许可证**：CC BY-SA 4.0
