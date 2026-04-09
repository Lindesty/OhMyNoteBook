# SRE 站点可靠性工程实战教程

## 完整目录

### 第一篇：负载均衡与高可用
- [第1章：Nginx Web服务](#第一篇负载均衡与高可用)
- [第2章：HAProxy 负载均衡](#第2章haproxy-负载均衡)
- [第3章：Keepalived 高可用](#第3章keepalived-高可用)

### 第二篇：虚拟化技术
- [第4章：KVM 虚拟化](#第二篇虚拟化技术)
- [第5章：VMware vSphere](#第5章vmware-vsphere)

### 第三篇：容器技术
- [第6章：Docker 容器基础](#第三篇容器技术)
- [第7章：Kubernetes 基础入门](#第7章kubernetes-基础入门)
- [第8章：Kubernetes 生产实战](#第8章kubernetes-生产实战)

### 第四篇：运维基础设施
- [第9章：JumpServer 跳板机](#第四篇运维基础设施)
- [第10章：Zabbix 分布式监控](#第10章zabbix-分布式监控)

### 第五篇：DevOps 与 CI/CD
- [第11章：Jenkins + GitLab 持续集成部署](#第五篇devops-与-cicd)
- [第12章：Redis 分布式缓存](#第12章redis-分布式缓存)
- [第13章：消息队列与微服务](#第13章消息队列与微服务)

### 第六篇：日志与存储
- [第14章：ELK 日志收集](#第六篇日志与存储)
- [第15章：Ceph 分布式存储](#第15章ceph-分布式存储)

---

# 第一篇：负载均衡与高可用

本篇介绍企业级负载均衡与高可用架构的核心技术，包括 Nginx、HAProxy 和 Keepalived 三大组件。

---

## 第1章：Nginx Web服务

### 1.1 Web服务基础介绍

#### 1.1.1 正常的单次web服务访问流程

用户通过浏览器发起请求，经过DNS解析、TCP连接、HTTP请求/响应等步骤完成一次完整的Web访问。

#### 1.1.2 Apache HTTP Server 介绍

Apache是目前广泛使用的Web服务器，支持三种MPM模式：

| 模式 | 特点 | 优点 | 缺点 |
|------|------|------|------|
| prefork | 进程模型，每个子进程响应一个请求 | 稳定 | 占用内存大，最大并发1024 |
| worker | 多进程+多线程混合模型 | 内存占用较少 | 长连接占用线程问题 |
| event | 事件驱动模型(epoll) | 高并发表现优秀 | 无线程安全控制 |

#### 1.1.3 Nginx 简介

Nginx是由俄罗斯工程师Igor Sysoev开发的高性能Web服务器：
- 2002年开始开发，2004年开源
- 支持HTTP服务器、反向代理、负载均衡
- 支持FastCGI/SSL/Virtual Host/URL Rewrite/Gzip等功能
- 天猫、淘宝、小米、163、京东等一线互联网公司都在使用

#### 1.1.4 用户访问体验 - 1-3-10原则

- **1秒**：最优体验
- **1-3秒**：较优体验
- **3-10秒**：比较慢
- **10秒以上**：用户无法接受

> 79%的用户不太可能再次打开缓慢的网站
> 47%的用户期望网页能在2秒内加载
> 页面加载延迟1秒可能导致转换损失7%

### 1.2 I/O模型

#### 1.2.1 系统I/O模型分类

| 模型 | 特点 |
|------|------|
| 同步阻塞型 | 简单，但每个连接需要独立进程 |
| 同步非阻塞型 | 需要轮询，浪费CPU |
| I/O多路复用 | select/poll/epoll，单进程处理多连接 |
| 信号驱动式 | 内核通知，效率高 |
| 异步I/O | 两阶段都非阻塞，效率最高 |

#### 1.2.2 Nginx支持的事件驱动模型

- **select**：跨平台，最大并发1024
- **poll**：select升级版，无并发限制
- **epoll**：Linux高性能模型，推荐使用
- **kqueue**：BSD系列平台
- **iocp**：Windows异步I/O

### 1.3 Nginx安装与配置

```bash
# CentOS安装
yum install nginx -y

# Ubuntu安装
apt install nginx -y

# 编译安装
./configure --prefix=/usr/local/nginx
make && make install
```

### 1.4 Nginx核心配置

#### 1.4.1 配置文件结构

```nginx
# 全局配置
worker_processes auto;
events {
    worker_connections 1024;
}

# HTTP配置
http {
    include       mime.types;
    default_type  application/octet-stream;

    server {
        listen       80;
        server_name  localhost;

        location / {
            root   html;
            index  index.html;
        }
    }
}
```

#### 1.4.2 虚拟主机配置

```nginx
server {
    listen 80;
    server_name www.example.com;
    root /data/www;
}

server {
    listen 80;
    server_name bbs.example.com;
    root /data/bbs;
}
```

#### 1.4.3 location 匹配规则

| 符号 | 含义 |
|------|------|
| `=` | 精确匹配 |
| `^~` | 前缀匹配，优先级高于正则 |
| `~` | 区分大小写的正则匹配 |
| `~*` | 不区分大小写的正则匹配 |
| `/` | 通用匹配 |

### 1.5 反向代理与负载均衡

#### 1.5.1 反向代理配置

```nginx
server {
    listen 80;
    server_name www.example.com;

    location / {
        proxy_pass http://192.168.1.100:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### 1.5.2 负载均衡配置

```nginx
upstream backend {
    server 192.168.1.101:80 weight=1;
    server 192.168.1.102:80 weight=2;
    server 192.168.1.103:80 backup;
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}
```

#### 1.5.3 负载均衡算法

| 算法 | 说明 |
|------|------|
| round-robin | 轮询（默认） |
| weight | 加权轮询 |
| ip_hash | 基于客户端IP哈希 |
| least_conn | 最少连接数 |
| url_hash | 基于URL哈希 |

### 1.6 常用功能配置

#### 1.6.1 Rewrite重写

```nginx
# 域名跳转
server {
    listen 80;
    server_name old.example.com;
    rewrite ^/(.*)$ http://new.example.com/$1 permanent;
}

# URL重写
location / {
    rewrite ^/product/([0-9]+)$ /product?id=$1 last;
}
```

#### 1.6.2 HTTPS配置

```nginx
server {
    listen 443 ssl;
    server_name www.example.com;

    ssl_certificate     /etc/nginx/ssl/server.crt;
    ssl_certificate_key /etc/nginx/ssl/server.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
}
```

#### 1.6.3 Gzip压缩

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1024;
gzip_comp_level 6;
```

---

## 第2章：HAProxy 负载均衡

### 2.1 负载均衡简介

负载均衡(Load Balance)是一种高可用反向代理技术，将业务分担给多个后端服务器，提高并发处理能力。

#### 2.1.1 负载均衡类型

- **四层负载**：基于IP+PORT转发（LVS、Nginx stream）
- **七层负载**：基于协议+内容交换（Nginx http、HAProxy）

#### 2.1.2 HAProxy介绍

- 2000年由Willy Tarreau开发
- 支持TCP和HTTP负载均衡
- 高并发（万级以上）、高性能
- 支持基于cookie的持久性
- 自动故障切换

### 2.2 HAProxy安装

```bash
# CentOS
yum install haproxy -y

# Ubuntu
apt install haproxy -y

# 编译安装
wget http://www.haproxy.org/download/2.0/src/haproxy-2.0.0.tar.gz
tar xf haproxy-2.0.0.tar.gz
cd haproxy-2.0.0
make TARGET=linux-glibc
make install
```

### 2.3 HAProxy配置详解

#### 2.3.1 配置文件结构

```
global      # 全局配置
defaults    # 默认配置
frontend    # 前端配置
backend     # 后端配置
listen      # 组合配置
```

#### 2.3.2 global配置参数

```haproxy
global
    log 127.0.0.1 local3 info
    maxconn 4096
    user haproxy
    group haproxy
    daemon
    nbproc 4           # 进程数
    cpu-map 1 0        # CPU绑定
```

#### 2.3.3 proxies配置

```haproxy
defaults
    mode http
    log global
    option httplog
    timeout connect 5000ms
    timeout client 50000ms
    timeout server 50000ms

frontend web
    bind *:80
    default_backend servers

backend servers
    balance roundrobin
    server web1 192.168.1.101:80 check
    server web2 192.168.1.102:80 check
```

### 2.4 HAProxy调度算法

#### 2.4.1 静态算法

| 算法 | 说明 |
|------|------|
| static-rr | 基于权重的轮询，不支持运行时调整 |
| first | 按服务器顺序，上限后才分配到下一台 |

#### 2.4.2 动态算法

| 算法 | 说明 |
|------|------|
| roundrobin | 加权轮询，支持运行时调整 |
| leastconn | 最少连接，适合长连接场景 |

#### 2.4.3 哈希算法

| 算法 | 说明 |
|------|------|
| source | 源地址哈希，用于会话保持 |
| uri | URI哈希，用于缓存 |
| url_param | URL参数哈希 |
| hdr | HTTP头部哈希 |
| rdp-cookie | RDP会话保持 |

### 2.5 高级功能

#### 2.5.1 基于cookie的会话保持

```haproxy
backend servers
    balance roundrobin
    cookie SERVERID insert indirect nocache
    server web1 192.168.1.101:80 check cookie web1
    server web2 192.168.1.102:80 check cookie web2
```

#### 2.5.2 状态页配置

```haproxy
listen stats
    bind *:9000
    stats enable
    stats uri /haproxy-stats
    stats auth admin:admin123
```

#### 2.5.3 ACL访问控制

```haproxy
# 域名匹配
acl www hdr_dom(host) www.example.com
use_backend www_servers if www

# 源IP控制
acl allowed src 192.168.1.0/24
http-request deny if !allowed

# 动静分离
acl static path_end .css .js .jpg .png
use_backend static_servers if static
```

#### 2.5.4 四层负载

```haproxy
listen mysql
    bind *:3306
    mode tcp
    balance leastconn
    server mysql1 192.168.1.101:3306 check
    server mysql2 192.168.1.102:3306 check backup
```

---

## 第3章：Keepalived 高可用

### 3.1 高可用集群概念

#### 3.1.1 集群类型

| 类型 | 说明 | 示例 |
|------|------|------|
| LB | 负载均衡集群 | LVS/HAProxy/Nginx |
| HA | 高可用集群 | 数据库、ZooKeeper、Redis |
| HPC | 高性能集群 | 科学计算 |

#### 3.1.2 系统可用性指标

| SLA | 年停机时间 |
|-----|-----------|
| 99.9% | 8.76小时 |
| 99.99% | 52.56分钟 |
| 99.999% | 5.26分钟 |

### 3.2 VRRP协议

VRRP(Virtual Router Redundancy Protocol)虚拟路由冗余协议，解决静态网关单点风险。

#### 3.2.1 核心概念

| 术语 | 说明 |
|------|------|
| VRID | 虚拟路由器标识（0-255） |
| Master | 主设备 |
| Backup | 备用设备 |
| Priority | 优先级（1-254） |
| VIP | 虚拟IP |

### 3.3 Keepalived安装

```bash
# CentOS
yum install keepalived -y

# Ubuntu
apt install keepalived -y
```

### 3.4 Keepalived配置

#### 3.4.1 MASTER配置

```haproxy
global_defs {
    router_id ha1.example.com
    vrrp_mcast_group4 224.0.0.18
}

vrrp_instance VI_1 {
    state MASTER
    interface eth0
    virtual_router_id 80
    priority 100
    advert_int 1

    authentication {
        auth_type PASS
        auth_pass 1111qwer
    }

    virtual_ipaddress {
        192.168.7.248 dev eth0 label eth0:0
    }
}
```

#### 3.4.2 BACKUP配置

```haproxy
global_defs {
    router_id ha2.example.com
    vrrp_mcast_group4 224.0.0.18
}

vrrp_instance VI_1 {
    state BACKUP
    interface eth0
    virtual_router_id 80
    priority 90
    advert_int 1

    authentication {
        auth_type PASS
        auth_pass 1111qwer
    }

    virtual_ipaddress {
        192.168.7.248 dev eth0 label eth0:0
    }
}
```

### 3.5 高级配置

#### 3.5.1 非抢占模式

```haproxy
vrrp_instance VI_1 {
    state BACKUP
    priority 100
    nopreempt    # 关闭VIP抢占
}
```

#### 3.5.2 抢占延迟

```haproxy
vrrp_instance VI_1 {
    state BACKUP
    priority 100
    preempt_delay 60s    # 抢占延迟60秒
}
```

#### 3.5.3 单播配置

```haproxy
vrrp_instance VI_1 {
    unicast_src_ip 192.168.1.101
    unicast_peer {
        192.168.1.102
    }
}
```

### 3.6 VRRP Script 脚本监控

```haproxy
vrrp_script chk_nginx {
    script "/etc/keepalived/chk_nginx.sh"
    interval 1
    weight -80
    fall 3
    rise 5
}

vrrp_instance VI_1 {
    track_script {
        chk_nginx
    }
}
```

监控脚本示例：

```bash
#!/bin/bash
/usr/bin/killall -0 nginx
```

### 3.7 与IPVS集成

Keepalived原生支持IPVS负载均衡：

```haproxy
virtual_server 192.168.7.248 80 {
    delay_loop 6
    lb_algo wrr
    lb_kind DR
    protocol TCP

    real_server 192.168.7.103 80 {
        weight 1
        TCP_CHECK {
            connect_timeout 5
            nb_get_retry 3
            delay_before_retry 3
            connect_port 80
        }
    }
}
```

### 3.8 实战案例

#### 3.8.1 高可用Nginx

架构：Keepalived + Nginx 双主模式

```
VIP1(192.168.1.100) -> Master: Nginx1, Backup: Nginx2
VIP2(192.168.1.101) -> Master: Nginx2, Backup: Nginx1
```

#### 3.8.2 高可用HAProxy

架构：Keepalived + HAProxy 主备模式

```
VIP(192.168.1.100) -> Master: HAProxy1, Backup: HAProxy2
          |
    +-----+-----+
    |           |
  Web1        Web2
```

---

# 第二篇：虚拟化技术

本篇介绍企业级虚拟化技术，包括 KVM 和 VMware vSphere 两大主流虚拟化平台。

---

## 第4章：KVM 虚拟化

### 4.1 虚拟化基础

#### 4.1.1 什么是虚拟化

虚拟化是一种资源管理技术，将计算机的实体资源（CPU、内存、磁盘、网络）予以抽象、转换后呈现出来，可供分割、组合为一个或多个计算机配置环境。

#### 4.1.2 虚拟化类型

| 类型 | 说明 | 示例 |
|------|------|------|
| 服务器虚拟化 | 在单台物理服务器运行多个操作系统 | KVM、VMware、Xen |
| 网络虚拟化 | 软件定义网络 | OpenStack Neutron、NSX |
| 桌面虚拟化 | 虚拟桌面基础设施 | Citrix XenDesktop、VMware Horizon |
| 存储虚拟化 | 存储资源池化 | SAN、NAS、GlusterFS、Ceph |
| 容器技术 | 轻量级虚拟化 | Docker、LXC |

#### 4.1.3 虚拟化技术分类

| 类型 | 特点 | 代表 |
|------|------|------|
| 模拟器 | 完全模拟硬件 | QEMU |
| 全虚拟化 | 需要硬件支持 | KVM、VMware |
| 半虚拟化 | 需要修改Guest OS内核 | Xen(PV) |

#### 4.1.4 KVM与Xen对比

| 项目 | Xen | KVM |
|------|-----|-----|
| 问世时间 | 2003年 | 2007年 |
| 虚拟化技术 | 全虚拟化、半虚拟化 | 全虚拟化 |
| 内核支持 | 需要打补丁 | 内置在内核中 |
| 动态迁移 | 支持 | 支持 |

### 4.2 KVM环境准备

#### 4.2.1 CPU虚拟化支持验证

```bash
# 查看CPU是否支持虚拟化
grep -E 'vmx|svm' /proc/cpuinfo

# Intel CPU显示 vmx
# AMD CPU显示 svm
```

#### 4.2.2 安装KVM工具包

```bash
# CentOS
yum install qemu-kvm qemu-img virt-manager libvirt libvirt-python \
    virt-manager libvirt-client virt-install virt-viewer -y

# Ubuntu
apt install qemu-kvm qemu-utils virt-manager libvirt-daemon-system \
    virtinst libvirt-clients bridge-utils -y
```

#### 4.2.3 启动libvirtd服务

```bash
systemctl start libvirtd
systemctl enable libvirtd
```

### 4.3 创建虚拟机

#### 4.3.1 创建磁盘镜像

```bash
# 创建10G的qcow2格式磁盘
qemu-img create -f qcow2 /var/lib/libvirt/images/centos7.qcow2 10G

# 查看磁盘信息
qemu-img info /var/lib/libvirt/images/centos7.qcow2
```

#### 4.3.2 创建NAT网络虚拟机

```bash
virt-install --name centos7 \
    --ram 2048 \
    --vcpus 2 \
    --disk path=/var/lib/libvirt/images/centos7.qcow2,size=10 \
    --os-type linux \
    --os-variant centos7.0 \
    --network network=default \
    --graphics vnc,listen=0.0.0.0 \
    --cdrom /path/to/CentOS-7-x86_64.iso
```

#### 4.3.3 创建桥接网络虚拟机

```bash
# 创建桥接网卡
virsh iface-bridge eth0 br0

# 使用桥接网络创建虚拟机
virt-install --name centos7-bridge \
    --ram 2048 \
    --vcpus 2 \
    --disk path=/var/lib/libvirt/images/centos7-bridge.qcow2,size=10 \
    --network bridge=br0 \
    --graphics vnc,listen=0.0.0.0 \
    --cdrom /path/to/CentOS-7-x86_64.iso
```

### 4.4 虚拟机管理命令

#### 4.4.1 virsh常用命令

| 命令 | 说明 |
|------|------|
| virsh list --all | 列出所有虚拟机 |
| virsh start vmname | 启动虚拟机 |
| virsh shutdown vmname | 关闭虚拟机 |
| virsh destroy vmname | 强制关闭虚拟机 |
| virsh reboot vmname | 重启虚拟机 |
| virsh suspend vmname | 挂起虚拟机 |
| virsh resume vmname | 恢复虚拟机 |
| virsh undefine vmname | 删除虚拟机定义 |
| virsh console vmname | 连接虚拟机控制台 |
| virsh dumpxml vmname | 查看虚拟机配置 |
| virsh edit vmname | 编辑虚拟机配置 |

#### 4.4.2 虚拟机快照

```bash
# 创建快照
virsh snapshot-create-as centos7 snap1 "before update"

# 查看快照列表
virsh snapshot-list centos7

# 恢复快照
virsh snapshot-revert centos7 snap1

# 删除快照
virsh snapshot-delete centos7 snap1
```

### 4.5 虚拟机迁移

#### 4.5.1 在线迁移

```bash
virsh migrate --live centos7 qemu+ssh://dest-host/system
```

#### 4.5.2 离线迁移

```bash
virsh migrate --offline centos7 qemu+ssh://dest-host/system
```

---

## 第5章：VMware vSphere

### 5.1 vSphere组件介绍

| 组件 | 说明 |
|------|------|
| ESXi | 虚拟化平台（Hypervisor） |
| vCenter Server | 集中管理平台 |
| vSphere Client | Web管理客户端 |
| vMotion | 虚拟机在线迁移 |
| DRS | 动态资源调度 |
| HA | 高可用性 |

### 5.2 ESXi安装

#### 5.2.1 硬件要求

- 64位CPU（至少2核）
- 支持硬件虚拟化
- 最小4GB内存
- 支持的存储控制器

#### 5.2.2 安装步骤

1. 下载ESXi ISO镜像
2. 创建启动介质（U盘/光盘）
3. 从启动介质引导
4. 按向导完成安装
5. 配置管理网络

### 5.3 vCenter Server部署

#### 5.3.1 部署模式

- **嵌入式部署**：vCenter和PSC在同一台设备
- **外部部署**：vCenter和PSC分别部署在不同设备

#### 5.3.2 部署步骤

1. 下载vCenter ISO镜像
2. 挂载ISO运行安装程序
3. 选择部署类型和规模
4. 配置网络和存储
5. 完成部署

### 5.4 虚拟机管理

#### 5.4.1 创建虚拟机

1. 选择计算资源
2. 选择存储
3. 选择兼容性
4. 选择操作系统
5. 配置硬件
6. 完成创建

#### 5.4.2 虚拟机硬件配置

| 设备 | 说明 |
|------|------|
| CPU | 配置虚拟CPU数量 |
| 内存 | 配置内存大小 |
| 硬盘 | 配置虚拟磁盘 |
| 网络 | 配置网络适配器 |
| SCSI控制器 | 磁盘控制器类型 |

### 5.5 高级功能

#### 5.5.1 vMotion在线迁移

将运行中的虚拟机从一台主机迁移到另一台主机，无需停机。

**前提条件：**
- 共享存储
- 配置vMotion网络
- CPU兼容性

#### 5.5.2 DRS动态资源调度

自动平衡集群内主机的资源负载。

**自动化级别：**
- 手动
- 部分自动
- 全自动

#### 5.5.3 HA高可用性

当主机故障时，自动在其他主机重启虚拟机。

**故障检测：**
- 主机心跳检测
- 数据存储心跳检测

### 5.6 存储管理

#### 5.6.1 存储类型

| 类型 | 协议 | 特点 |
|------|------|------|
| 本地存储 | 本地磁盘 | 性能好，无共享 |
| iSCSI存储 | IP网络 | 成本低，易部署 |
| FC存储 | 光纤通道 | 性能高，成本高 |
| NFS存储 | TCP/IP | 文件级共享 |

#### 5.6.2 数据存储管理

```bash
# ESXi命令行查看数据存储
esxcli storage filesystem list

# 查看存储适配器
esxcli storage core adapter list
```

### 5.7 网络管理

#### 5.7.1 虚拟交换机

- **标准交换机（vSS）**：单主机级别
- **分布式交换机（vDS）**：集群级别，集中管理

#### 5.7.2 端口组类型

| 类型 | 说明 |
|------|------|
| VMkernel | 管理流量、vMotion、存储 |
| 虚拟机 | 虚拟机业务流量 |

---

# 第三篇：容器技术

本篇介绍容器技术的核心知识，包括 Docker 基础、Kubernetes 入门和生产实战。

---

## 第6章：Docker 容器基础

### 6.1 Docker简介

#### 6.1.1 什么是Docker

Docker是一个开源的应用容器引擎，基于Go语言开发，可以让开发者将应用及其依赖打包到一个可移植的容器中，实现应用的快速部署。

#### 6.1.2 Docker vs 虚拟机

| 对比项 | Docker容器 | 虚拟机 |
|--------|-----------|--------|
| 启动速度 | 秒级 | 分钟级 |
| 资源占用 | MB级别 | GB级别 |
| 性能 | 接近原生 | 有损耗 |
| 隔离性 | 进程级 | 操作系统级 |
| 操作系统 | 共享宿主机内核 | 独立内核 |

#### 6.1.3 Docker核心技术

- **Namespace**：实现资源隔离（PID、NET、IPC、MNT、UTS、USER）
- **Cgroups**：实现资源限制（CPU、内存、磁盘IO）
- **UnionFS**：实现镜像分层存储

### 6.2 Docker安装

#### 6.2.1 CentOS安装

```bash
# 安装依赖
yum install -y yum-utils device-mapper-persistent-data lvm2

# 添加Docker源
yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 安装Docker
yum install -y docker-ce docker-ce-cli containerd.io

# 启动Docker
systemctl start docker
systemctl enable docker
```

#### 6.2.2 Ubuntu安装

```bash
# 安装依赖
apt-get update
apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release

# 添加Docker源
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 安装Docker
apt-get install -y docker-ce docker-ce-cli containerd.io
```

#### 6.2.3 镜像加速配置

```bash
# 配置阿里云镜像加速
mkdir -p /etc/docker
cat > /etc/docker/daemon.json << EOF
{
  "registry-mirrors": ["https://xxx.mirror.aliyuncs.com"]
}
EOF

systemctl daemon-reload
systemctl restart docker
```

### 6.3 Docker镜像管理

#### 6.3.1 镜像操作命令

| 命令 | 说明 |
|------|------|
| docker search | 搜索镜像 |
| docker pull | 下载镜像 |
| docker images | 查看本地镜像 |
| docker rmi | 删除镜像 |
| docker tag | 镜像打标签 |
| docker save | 导出镜像 |
| docker load | 导入镜像 |

#### 6.3.2 镜像操作示例

```bash
# 搜索镜像
docker search nginx

# 下载镜像
docker pull nginx:1.20

# 查看本地镜像
docker images

# 镜像打标签
docker tag nginx:1.20 mynginx:v1

# 导出镜像
docker save -o nginx.tar nginx:1.20

# 导入镜像
docker load -i nginx.tar

# 删除镜像
docker rmi nginx:1.20
```

### 6.4 Docker容器操作

#### 6.4.1 容器生命周期管理

| 命令 | 说明 |
|------|------|
| docker run | 创建并启动容器 |
| docker start | 启动容器 |
| docker stop | 停止容器 |
| docker restart | 重启容器 |
| docker kill | 强制停止容器 |
| docker rm | 删除容器 |

#### 6.4.2 容器操作示例

```bash
# 启动交互式容器
docker run -it centos:7 /bin/bash

# 启动后台容器
docker run -d --name nginx nginx:1.20

# 端口映射
docker run -d -p 8080:80 --name nginx nginx:1.20

# 挂载数据卷
docker run -d -v /data/html:/usr/share/nginx/html -p 8080:80 nginx:1.20

# 进入运行中的容器
docker exec -it nginx /bin/bash

# 查看容器日志
docker logs nginx
docker logs -f nginx  # 实时查看

# 查看容器状态
docker ps        # 运行中的容器
docker ps -a     # 所有容器
```

### 6.5 Dockerfile构建镜像

#### 6.5.1 Dockerfile指令

| 指令 | 说明 |
|------|------|
| FROM | 指定基础镜像 |
| MAINTAINER | 维护者信息 |
| RUN | 执行命令 |
| COPY | 复制文件 |
| ADD | 添加文件（支持URL和解压） |
| WORKDIR | 工作目录 |
| ENV | 环境变量 |
| EXPOSE | 暴露端口 |
| CMD | 容器启动命令 |
| ENTRYPOINT | 入口点 |
| VOLUME | 数据卷 |

#### 6.5.2 Dockerfile示例

```dockerfile
FROM centos:7
MAINTAINER zhangsan@example.com

# 安装Nginx
RUN yum install -y epel-release && \
    yum install -y nginx && \
    yum clean all

# 复制配置文件
COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /usr/share/nginx/html/

# 暴露端口
EXPOSE 80

# 启动命令
CMD ["nginx", "-g", "daemon off;"]
```

#### 6.5.3 构建镜像

```bash
docker build -t mynginx:v1 .
```

### 6.6 Docker数据管理

#### 6.6.1 数据卷类型

| 类型 | 说明 |
|------|------|
| bind mount | 绑定挂载，指定宿主机路径 |
| volume | Docker管理的数据卷 |
| tmpfs | 临时文件系统，存储在内存中 |

#### 6.6.2 数据卷操作

```bash
# 创建数据卷
docker volume create mydata

# 查看数据卷
docker volume ls

# 使用数据卷
docker run -d -v mydata:/data nginx:1.20

# 绑定挂载
docker run -d -v /host/path:/container/path nginx:1.20
```

### 6.7 Docker网络

#### 6.7.1 网络模式

| 模式 | 说明 |
|------|------|
| bridge | 默认模式，容器通过NAT访问外部 |
| host | 容器使用宿主机网络 |
| none | 无网络 |
| container | 共享其他容器网络 |

#### 6.7.2 自定义网络

```bash
# 创建自定义网络
docker network create -d bridge mynet

# 使用自定义网络
docker run -d --name web1 --network mynet nginx:1.20
docker run -d --name web2 --network mynet nginx:1.20

# 容器间通过名称通信
docker exec web1 ping web2
```

### 6.8 Docker Compose

#### 6.8.1 安装Docker Compose

```bash
# 下载
curl -L "https://github.com/docker/compose/releases/download/v2.0.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 添加执行权限
chmod +x /usr/local/bin/docker-compose

# 验证
docker-compose --version
```

#### 6.8.2 docker-compose.yml示例

```yaml
version: '3'
services:
  nginx:
    image: nginx:1.20
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html
    networks:
      - webnet

  redis:
    image: redis:6.2
    networks:
      - webnet

networks:
  webnet:
```

#### 6.8.3 Compose命令

```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs
```

---

## 第7章：Kubernetes 基础入门

### 7.1 Kubernetes简介

#### 7.1.1 什么是Kubernetes

Kubernetes（K8s）是一个开源的容器编排平台，用于自动化部署、扩展和管理容器化应用。

#### 7.1.2 Kubernetes架构

```
                   +------------------+
                   |   kubectl/CLI    |
                   +--------+---------+
                            |
                   +--------v---------+
                   |   API Server     |
                   |   (Master)       |
                   +--------+---------+
                            |
            +---------------+---------------+
            |               |               |
     +------v------+ +------v------+ +------v------+
     | Controller  | |  Scheduler  | |    etcd     |
     |  Manager    | |             | |  (存储)     |
     +-------------+ +-------------+ +-------------+

            +---------------+---------------+
            |               |               |
     +------v------+ +------v------+ +------v------+
     |   Node 1    | |   Node 2    | |   Node 3    |
     | kubelet     | | kubelet     | | kubelet     |
     | kube-proxy  | | kube-proxy  | | kube-proxy  |
     | Container   | | Container   | | Container   |
     | Runtime     | | Runtime     | | Runtime     |
     +-------------+ +-------------+ +-------------+
```

#### 7.1.3 核心组件

| 组件 | 说明 |
|------|------|
| API Server | 集群统一入口，RESTful API |
| etcd | 键值存储，保存集群状态 |
| Scheduler | 调度Pod到合适的节点 |
| Controller Manager | 维护集群状态 |
| kubelet | 节点代理，管理容器生命周期 |
| kube-proxy | 维护网络规则 |

### 7.2 集群部署

#### 7.2.1 kubeadm部署

```bash
# 安装kubeadm（所有节点）
yum install -y kubeadm kubelet kubectl
systemctl enable kubelet

# 初始化Master节点
kubeadm init --apiserver-advertise-address=192.168.1.100 \
    --image-repository registry.aliyuncs.com/google_containers \
    --kubernetes-version v1.23.0 \
    --service-cidr=10.96.0.0/12 \
    --pod-network-cidr=10.244.0.0/16

# 配置kubectl
mkdir -p $HOME/.kube
cp -i /etc/kubernetes/admin.conf $HOME/.kube/config

# Worker节点加入集群
kubeadm join 192.168.1.100:6443 --token <token> --discovery-token-ca-cert-hash <hash>
```

#### 7.2.2 安装网络插件

```bash
# 安装Flannel
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml

# 安装Calico
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml
```

### 7.3 资源对象

#### 7.3.1 Pod

Pod是Kubernetes最小的部署单元，包含一个或多个容器。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.20
    ports:
    - containerPort: 80
```

#### 7.3.2 Deployment

Deployment管理Pod的副本数量和更新策略。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.20
        ports:
        - containerPort: 80
```

#### 7.3.3 Service

Service提供Pod的访问入口。

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP
```

#### 7.3.4 Service类型

| 类型 | 说明 |
|------|------|
| ClusterIP | 集群内部访问（默认） |
| NodePort | 通过节点端口暴露 |
| LoadBalancer | 云厂商负载均衡器 |
| ExternalName | 映射到外部服务 |

### 7.4 kubectl命令

#### 7.4.1 基础命令

```bash
# 查看资源
kubectl get pods
kubectl get pods -o wide
kubectl get deployments
kubectl get services
kubectl get all

# 创建资源
kubectl create -f pod.yaml
kubectl apply -f deployment.yaml

# 删除资源
kubectl delete -f pod.yaml
kubectl delete pod nginx-pod

# 查看详情
kubectl describe pod nginx-pod

# 查看日志
kubectl logs nginx-pod
kubectl logs -f nginx-pod

# 进入容器
kubectl exec -it nginx-pod -- /bin/bash
```

### 7.5 存储管理

#### 7.5.1 PV和PVC

```yaml
# PersistentVolume
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv001
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteOnce
  nfs:
    path: /data/pv001
    server: 192.168.1.100

---
# PersistentVolumeClaim
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc001
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
```

### 7.6 配置管理

#### 7.6.1 ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-config
data:
  nginx.conf: |
    server {
      listen 80;
      location / {
        root /usr/share/nginx/html;
      }
    }
```

#### 7.6.2 Secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysql-secret
type: Opaque
data:
  password: cGFzc3dvcmQxMjM=  # base64编码
```

---

## 第8章：Kubernetes 生产实战

### 8.1 集群高可用架构

#### 8.1.1 架构规划

```
                    Load Balancer (HAProxy/Keepalived)
                              |
                    +---------+---------+
                    |                   |
              Master 1             Master 2
              (API Server)          (API Server)
              (Controller)          (Controller)
              (Scheduler)           (Scheduler)
                    |                   |
                    +---------+---------+
                              |
                    etcd Cluster (3/5 nodes)
                              |
            +---------+---------+---------+
            |         |         |         |
          Node 1   Node 2    Node 3    Node N
```

### 8.2 服务暴露方案

#### 8.2.1 Ingress

```yaml
# Ingress Controller (Nginx)
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: www.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx-service
            port:
              number: 80
```

### 8.3 监控告警

#### 8.3.1 Prometheus + Grafana

```yaml
# Prometheus部署
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prometheus
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      containers:
      - name: prometheus
        image: prom/prometheus:v2.30.0
        ports:
        - containerPort: 9090
        volumeMounts:
        - name: config
          mountPath: /etc/prometheus
      volumes:
      - name: config
        configMap:
          name: prometheus-config
```

### 8.4 日志收集

#### 8.4.1 EFK架构

```
应用容器 ---> Filebeat ---> Logstash ---> Elasticsearch ---> Kibana
```

### 8.5 集群维护

#### 8.5.1 节点维护

```bash
# 标记节点不可调度
kubectl cordon node1

# 驱逐节点上的Pod
kubectl drain node1 --ignore-daemonsets

# 维护完成后恢复
kubectl uncordon node1
```

#### 8.5.2 集群升级

```bash
# 升级kubeadm
yum install -y kubeadm-1.24.0

# 升级Master节点
kubeadm upgrade apply v1.24.0

# 升级kubelet和kubectl
yum install -y kubelet-1.24.0 kubectl-1.24.0
systemctl restart kubelet
```

---

# 第四篇：运维基础设施

本篇介绍运维基础设施的核心组件，包括 JumpServer 跳板机和 Zabbix 监控系统。

---

## 第9章：JumpServer 跳板机

### 9.1 JumpServer简介

JumpServer是一款使用Python、Django开发的开源跳板机系统，为互联网企业提供认证、授权、审计、自动化运维等功能。

#### 9.1.1 核心功能

| 功能模块 | 说明 |
|----------|------|
| 身份验证 | 登录认证、LDAP、OpenID单点登录、MFA多因子认证 |
| 账号管理 | 集中账号管理、统一密码管理、批量密码变更 |
| 授权控制 | 资产授权管理、细粒度应用级授权、指令限制 |
| 安全审计 | 会话管理、录像管理、指令审计、文件传输审计 |

#### 9.1.2 官方地址

- 官网：http://www.jumpserver.org/
- GitHub：https://github.com/jumpserver/jumpserver

### 9.2 JumpServer部署

#### 9.2.1 环境要求

| 组件 | 版本要求 |
|------|----------|
| 操作系统 | CentOS 7/8、Ubuntu 18.04+ |
| Python | 3.6+ |
| MySQL | 5.7+ 或 MariaDB 10.2+ |
| Redis | 5.0+ |

#### 9.2.2 Docker部署

```bash
# 部署MySQL
docker run --name jms_mysql -d \
  -e MYSQL_ROOT_PASSWORD=Password123 \
  -e MYSQL_DATABASE=jumpserver \
  -e MYSQL_USER=jumpserver \
  -e MYSQL_PASSWORD=Password123 \
  -v /data/mysql:/var/lib/mysql \
  mysql:5.7

# 部署Redis
docker run --name jms_redis -d \
  -v /data/redis:/data \
  redis:5.0

# 部署JumpServer
docker run --name jms_all -d \
  -p 80:80 -p 2222:2222 \
  -e SECRET_KEY=your_secret_key \
  -e BOOTSTRAP_TOKEN=your_bootstrap_token \
  -e DB_HOST=jms_mysql \
  -e DB_PORT=3306 \
  -e DB_USER=jumpserver \
  -e DB_PASSWORD=Password123 \
  -e DB_NAME=jumpserver \
  -e REDIS_HOST=jms_redis \
  -e REDIS_PORT=6379 \
  --link jms_mysql:mysql \
  --link jms_redis:redis \
  jumpserver/jms_all:latest
```

### 9.3 用户和资产管理

#### 9.3.1 用户管理

1. **创建用户**：设置用户名、姓名、邮箱、角色
2. **用户组管理**：按部门或功能分组
3. **密码策略**：设置密码复杂度和过期时间

#### 9.3.2 资产管理

1. **管理用户**：用于连接目标服务器的账号
2. **系统用户**：用于用户登录目标服务器的账号
3. **资产节点**：按业务或区域组织服务器

#### 9.3.3 授权管理

创建授权规则，将用户/用户组授权给资产节点，绑定系统用户。

### 9.4 安全审计

#### 9.4.1 会话管理

- 在线会话监控
- 历史会话查询
- 会话录像回放

#### 9.4.2 命令过滤

```bash
# 创建命令过滤器
# 黑名单模式：禁止执行指定命令
# 白名单模式：只允许执行指定命令

# 示例：禁止执行rm命令
命令过滤规则: rm *
动作: 禁止
```

### 9.5 文件传输

- Web SFTP文件管理
- 文件上传/下载审计
- 文件传输日志

---

## 第10章：Zabbix 分布式监控

### 10.1 监控服务介绍

#### 10.1.1 常见监控方案

| 方案 | 特点 |
|------|------|
| Zabbix | 功能全面，企业级监控 |
| Prometheus | 云原生监控，适合容器环境 |
| Nagios | 插件丰富，老牌监控 |
| Cacti | 图形化强，适合网络设备 |
| 夜莺 | 小米开源，国内化程度高 |

#### 10.1.2 Zabbix核心组件

| 组件 | 说明 |
|------|------|
| Zabbix Server | 服务端，收集和处理数据 |
| Zabbix Agent | 客户端，采集本地数据 |
| Zabbix Proxy | 代理，分布式部署时使用 |
| Database | 存储配置信息和历史数据 |
| Web UI | Web管理界面 |

### 10.2 Zabbix部署

#### 10.2.1 yum/apt安装

```bash
# CentOS安装
rpm -Uvh https://repo.zabbix.com/zabbix/5.0/rhel/7/x86_64/zabbix-release-5.0-1.el7.noarch.rpm
yum install -y zabbix-server-mysql zabbix-agent zabbix-web-mysql

# Ubuntu安装
wget https://repo.zabbix.com/zabbix/5.0/ubuntu/pool/main/z/zabbix-release/zabbix-release_5.0-1+bionic_all.deb
dpkg -i zabbix-release_5.0-1+bionic_all.deb
apt update
apt install -y zabbix-server-mysql zabbix-agent zabbix-frontend-php
```

#### 10.2.2 数据库配置

```bash
# 创建数据库
mysql -uroot -p
mysql> create database zabbix character set utf8 collate utf8_bin;
mysql> create user zabbix@localhost identified by 'password';
mysql> grant all privileges on zabbix.* to zabbix@localhost;
mysql> quit;

# 导入初始数据
zcat /usr/share/doc/zabbix-server-mysql*/create.sql.gz | mysql -uzabbix -p zabbix
```

#### 10.2.3 启动服务

```bash
# 启动Zabbix Server和Agent
systemctl start zabbix-server zabbix-agent
systemctl enable zabbix-server zabbix-agent

# 启动Web服务
systemctl start httpd
systemctl enable httpd
```

### 10.3 监控配置

#### 10.3.1 添加主机

1. 配置 → 主机 → 创建主机
2. 填写主机名、可见名称、群组
3. 配置接口（IP地址、端口）
4. 关联模板

#### 10.3.2 监控项(Item)

监控项是Zabbix采集数据的基本单位。

| 类型 | 说明 |
|------|------|
| Zabbix agent | 通过Agent采集 |
| Simple check | 简单检查（如ping） |
| SNMP | 网络设备监控 |
| HTTP agent | HTTP接口监控 |
| Database monitor | 数据库监控 |

#### 10.3.3 触发器(Trigger)

定义触发告警的条件表达式。

```
# 示例：CPU使用率超过90%触发告警
{host:system.cpu.util.last()}>90
```

#### 10.3.4 告警动作(Action)

定义告警触发后的操作：
- 发送消息（邮件、短信、微信、钉钉）
- 执行远程命令

### 10.4 模板使用

#### 10.4.1 内置模板

| 模板 | 说明 |
|------|------|
| Template OS Linux | Linux系统监控 |
| Template OS Windows | Windows系统监控 |
| Template DB MySQL | MySQL数据库监控 |
| Template App Nginx | Nginx监控 |
| Template App Redis | Redis监控 |

#### 10.4.2 自定义模板

1. 配置 → 模板 → 创建模板
2. 添加监控项、触发器、图形
3. 将模板关联到主机

### 10.5 分布式监控

#### 10.5.1 Zabbix Proxy架构

```
           Zabbix Server
                 |
       +---------+---------+
       |         |         |
   Proxy1    Proxy2    Proxy3
       |         |         |
    +--+--+   +--+--+   +--+--+
    |  |  |   |  |  |   |  |  |
   Agent    Agent      Agent
```

#### 10.5.2 Proxy部署

```bash
# 安装Zabbix Proxy
yum install -y zabbix-proxy-mysql

# 配置Proxy
vi /etc/zabbix/zabbix_proxy.conf
Server=192.168.1.100          # Zabbix Server地址
Hostname=zabbix-proxy-node1   # Proxy名称

# 在Zabbix Server添加Proxy
管理 → Agent代理程序 → 创建代理
```

### 10.6 监控模式

#### 10.6.1 被动模式

Zabbix Server主动连接Agent获取数据。

```
Server -> Agent: 请求数据
Agent -> Server: 返回数据
```

#### 10.6.2 主动模式

Agent主动向Server发送数据。

```
Agent -> Server: 请求任务
Server -> Agent: 返回任务列表
Agent -> Server: 发送数据
```

### 10.7 可视化

#### 10.7.1 仪表盘(Dashboard)

- 添加图形、地图、拓扑图
- 自定义布局和样式
- 支持幻灯片展示

#### 10.7.2 聚合图形(Screen)

将多个图形组合在一个页面展示。

### 10.8 告警通知

#### 10.8.1 媒体类型

| 类型 | 说明 |
|------|------|
| Email | 邮件通知 |
| SMS | 短信通知 |
| Script | 自定义脚本（微信、钉钉） |
| Webhook | HTTP回调 |

#### 10.8.2 钉钉告警脚本

```python
#!/usr/bin/env python3
import requests
import json
import sys

webhook = "https://oapi.dingtalk.com/robot/send?access_token=xxx"

message = {
    "msgtype": "text",
    "text": {
        "content": sys.argv[1]
    }
}

requests.post(webhook, data=json.dumps(message), headers={'Content-Type': 'application/json'})
```

---

# 第五篇：DevOps 与 CI/CD

本篇介绍 DevOps 文化与实践，包括 Jenkins+GitLab 持续集成部署、Redis 缓存和消息队列。

---

## 第11章：Jenkins + GitLab 持续集成部署

### 11.1 DevOps简介

#### 11.1.1 什么是DevOps

DevOps是Development（开发）和Operations（运维）的组合词，是一组过程、方法与系统的统称，用于促进开发、技术运营和质量保障部门之间的沟通、协作与整合。

#### 11.1.2 CI/CD概念

| 概念 | 说明 |
|------|------|
| CI（持续集成） | 频繁将代码集成到主干，每次集成都通过自动化构建验证 |
| CD（持续交付） | 将集成后的代码部署到类生产环境，确保可随时发布 |
| CD（持续部署） | 自动将代码部署到生产环境 |

### 11.2 GitLab部署

#### 11.2.1 安装GitLab

```bash
# CentOS安装
curl -s https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | sudo bash
yum install -y gitlab-ce

# Ubuntu安装
curl -s https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash
apt install -y gitlab-ce

# Docker部署
docker run --detach \
  --hostname gitlab.example.com \
  --publish 443:443 --publish 80:80 --publish 22:22 \
  --name gitlab \
  --restart always \
  --volume /srv/gitlab/config:/etc/gitlab \
  --volume /srv/gitlab/logs:/var/log/gitlab \
  --volume /srv/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest
```

#### 11.2.2 配置GitLab

```bash
# 编辑配置文件
vi /etc/gitlab/gitlab.rb

# 修改外部URL
external_url 'http://gitlab.example.com'

# 重新配置
gitlab-ctl reconfigure

# 常用命令
gitlab-ctl start       # 启动
gitlab-ctl stop        # 停止
gitlab-ctl restart     # 重启
gitlab-ctl status      # 状态
gitlab-ctl tail        # 查看日志
```

### 11.3 Jenkins部署

#### 11.3.1 安装Jenkins

```bash
# CentOS安装
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
yum install -y jenkins java-11-openjdk
systemctl start jenkins
systemctl enable jenkins

# Docker部署
docker run -d -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  --name jenkins \
  jenkins/jenkins:lts
```

#### 11.3.2 初始化配置

1. 访问 http://server-ip:8080
2. 获取初始密码：`cat /var/lib/jenkins/secrets/initialAdminPassword`
3. 安装推荐插件
4. 创建管理员账号

### 11.4 CI/CD流水线

#### 11.4.1 Pipeline语法

```groovy
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'http://gitlab.example.com/group/project.git'
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Deploy') {
            steps {
                sh 'scp target/app.jar user@server:/app/'
                sh 'ssh user@server "systemctl restart app"'
            }
        }
    }

    post {
        success {
            mail to: 'dev-team@example.com',
                 subject: "Build Success: ${env.JOB_NAME}",
                 body: "构建成功"
        }
        failure {
            mail to: 'dev-team@example.com',
                 subject: "Build Failed: ${env.JOB_NAME}",
                 body: "构建失败"
        }
    }
}
```

### 11.5 部署策略

#### 11.5.1 蓝绿部署

准备两套完全相同的生产环境，通过切换流量实现零停机部署。

```
          +-------------+
          | Load Balance|
          +------+------+
                 |
         +-------+-------+
         |               |
    +----v----+     +----v----+
    |  Blue   |     |  Green  |
    | (v1.0)  |     | (v2.0)  |
    +---------+     +---------+
         ^
      当前流量
```

#### 11.5.2 金丝雀发布

先将新版本部署到少量服务器，观察无问题后逐步扩大范围。

```
          +-------------+
          | Load Balance|
          +------+------+
                 |
    +------+-----+------+
    |      |          |
+---v--+ +-v---+ +----v--+
| v1.0 | | v1.0| | v2.0  |
| 90%  | | 90% | | 10%   |
+------+ +-----+ +-------+
```

#### 11.5.3 滚动发布

逐台更新服务器，确保始终有足够的实例提供服务。

---

## 第12章：Redis 分布式缓存

### 12.1 Redis简介

Redis(Remote Dictionary Server)是一个开源的、基于内存的键值数据库，支持数据持久化。

#### 12.1.1 Redis特点

- 高性能：读写速度极快
- 数据类型丰富：String、List、Set、Hash、ZSet
- 支持数据持久化：RDB、AOF
- 支持主从复制
- 支持集群模式

#### 12.1.2 缓存概念

| 概念 | 说明 |
|------|------|
| Buffer | 写缓冲，先写入内存再写入磁盘 |
| Cache | 读缓存，加速数据读取 |
| 命中率 | 缓存读取成功的比例 |

### 12.2 Redis部署

#### 12.2.1 安装Redis

```bash
# CentOS
yum install -y redis

# Ubuntu
apt install -y redis-server

# 编译安装
wget http://download.redis.io/releases/redis-6.2.0.tar.gz
tar xzf redis-6.2.0.tar.gz
cd redis-6.2.0
make
make install
```

#### 12.2.2 配置文件

```bash
# /etc/redis/redis.conf
bind 0.0.0.0
port 6379
daemonize yes
logfile /var/log/redis/redis.log
dir /var/lib/redis
requirepass your_password

# 持久化配置
save 900 1      # 900秒内至少1次修改触发RDB
appendonly yes  # 开启AOF
appendfsync everysec  # 每秒同步
```

### 12.3 Redis数据类型

#### 12.3.1 String（字符串）

```bash
SET key value
GET key
INCR key
DECR key
SETEX key seconds value  # 设置过期时间
```

#### 12.3.2 List（列表）

```bash
LPUSH key value   # 左侧插入
RPUSH key value   # 右侧插入
LPOP key          # 左侧弹出
RPOP key          # 右侧弹出
LRANGE key 0 -1   # 获取所有元素
```

#### 12.3.3 Set（集合）

```bash
SADD key member
SREM key member
SMEMBERS key
SISMEMBER key member
```

#### 12.3.4 Hash（哈希）

```bash
HSET key field value
HGET key field
HGETALL key
HDEL key field
```

#### 12.3.5 ZSet（有序集合）

```bash
ZADD key score member
ZRANGE key 0 -1 WITHSCORES
ZREM key member
```

### 12.4 Redis主从复制

```bash
# 从节点配置
replicaof 192.168.1.100 6379
masterauth your_password
```

### 12.5 Redis Sentinel

Sentinel用于监控Redis主从架构，实现自动故障转移。

```bash
# sentinel.conf
port 26379
sentinel monitor mymaster 192.168.1.100 6379 2
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000
```

### 12.6 Redis Cluster

```bash
# 创建集群
redis-cli --cluster create \
  192.168.1.101:6379 192.168.1.102:6379 192.168.1.103:6379 \
  192.168.1.104:6379 192.168.1.105:6379 192.168.1.106:6379 \
  --cluster-replicas 1
```

---

## 第13章：消息队列与微服务

### 13.1 消息队列简介

#### 13.1.1 什么是消息队列

消息队列（Message Queue）是一种应用间的通信方式，消息发送后可以立即返回，消息系统确保消息的可靠传递。

#### 13.1.2 应用场景

| 场景 | 说明 |
|------|------|
| 异步处理 | 发送邮件、短信等异步任务 |
| 应用解耦 | 订单系统与库存系统解耦 |
| 流量削峰 | 大促时控制请求流量 |
| 日志处理 | 日志采集与分析 |

#### 13.1.3 常见消息队列

| 产品 | 特点 |
|------|------|
| RabbitMQ | Erlang开发，AMQP协议，可靠性高 |
| Kafka | 高吞吐量，适合大数据场景 |
| RocketMQ | 阿里开源，适合电商场景 |
| ActiveMQ | Java开发，老牌MQ |

### 13.2 RabbitMQ部署

#### 13.2.1 安装RabbitMQ

```bash
# Ubuntu安装
apt install -y rabbitmq-server

# 启动服务
systemctl start rabbitmq-server
systemctl enable rabbitmq-server

# 开启管理插件
rabbitmq-plugins enable rabbitmq_management

# 添加用户
rabbitmqctl add_user admin password
rabbitmqctl set_user_tags admin administrator
rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
```

#### 13.2.2 核心概念

| 概念 | 说明 |
|------|------|
| Broker | 消息代理服务器 |
| Virtual Host | 虚拟主机，隔离不同租户 |
| Connection | 客户端与Broker的TCP连接 |
| Channel | 连接内的逻辑连接 |
| Exchange | 交换机，路由消息到队列 |
| Queue | 队列，存储消息 |
| Binding | Exchange与Queue的绑定关系 |

#### 13.2.3 Exchange类型

| 类型 | 说明 |
|------|------|
| direct | 精确匹配routing key |
| topic | 模糊匹配routing key |
| fanout | 广播到所有绑定队列 |
| headers | 基于消息头匹配 |

### 13.3 RabbitMQ集群

#### 13.3.1 普通集群

队列数据只存在一个节点，其他节点保存元数据。

#### 13.3.2 镜像队列

队列数据同步到所有镜像节点，实现高可用。

```bash
# 设置镜像策略
rabbitmqctl set_policy ha-all "^" '{"ha-mode":"all"}'
```

### 13.4 微服务简介

#### 13.4.1 什么是微服务

微服务是一种架构风格，将应用拆分为一组小型服务，每个服务独立部署、独立扩展。

#### 13.4.2 微服务优势

- 独立部署，快速迭代
- 技术栈灵活
- 故障隔离
- 易于扩展

#### 13.4.3 常见框架

| 框架 | 语言 |
|------|------|
| Spring Cloud | Java |
| Dubbo | Java |
| Go Micro | Go |
| Service Mesh | 通用 |

---

# 第六篇：日志与存储

本篇介绍企业级日志收集和分布式存储技术，包括 ELK 和 Ceph。

---

## 第14章：ELK 日志收集

### 14.1 ELK简介

ELK是三个开源项目的首字母缩写：
- **E**lasticsearch：搜索和分析引擎
- **L**ogstash：数据处理管道
- **K**ibana：数据可视化平台

#### 14.1.1 架构组成

```
应用服务器 → Filebeat → Logstash → Elasticsearch → Kibana
    |                          ↑
    +-------- Kafka -----------+
```

### 14.2 Elasticsearch部署

#### 14.2.1 安装Elasticsearch

```bash
# 安装Java环境
yum install -y java-11-openjdk

# 导入GPG密钥
rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch

# 配置yum源
cat > /etc/yum.repos.d/elasticsearch.repo << EOF
[elasticsearch]
name=Elasticsearch repository
baseurl=https://artifacts.elastic.co/packages/7.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
EOF

# 安装
yum install -y elasticsearch
```

#### 14.2.2 配置Elasticsearch

```yaml
# /etc/elasticsearch/elasticsearch.yml
cluster.name: my-cluster
node.name: node-1
path.data: /var/lib/elasticsearch
path.logs: /var/log/elasticsearch
network.host: 0.0.0.0
http.port: 9200
discovery.seed_hosts: ["192.168.1.101", "192.168.1.102"]
cluster.initial_master_nodes: ["node-1", "node-2"]
```

#### 14.2.3 启动服务

```bash
systemctl start elasticsearch
systemctl enable elasticsearch

# 验证
curl http://localhost:9200
```

### 14.3 Logstash部署

#### 14.3.1 安装Logstash

```bash
yum install -y logstash
```

#### 14.3.2 配置文件示例

```ruby
# /etc/logstash/conf.d/logstash.conf
input {
  file {
    path => "/var/log/nginx/access.log"
    type => "nginx-access"
    start_position => "beginning"
  }
  file {
    path => "/var/log/messages"
    type => "syslog"
  }
}

filter {
  if [type] == "nginx-access" {
    grok {
      match => { "message" => "%{COMBINEDAPACHELOG}" }
    }
  }
}

output {
  elasticsearch {
    hosts => ["http://localhost:9200"]
    index => "logstash-%{+YYYY.MM.dd}"
  }
}
```

### 14.4 Kibana部署

#### 14.4.1 安装Kibana

```bash
yum install -y kibana
```

#### 14.4.2 配置Kibana

```yaml
# /etc/kibana/kibana.yml
server.port: 5601
server.host: "0.0.0.0"
elasticsearch.hosts: ["http://localhost:9200"]
```

#### 14.4.3 启动服务

```bash
systemctl start kibana
systemctl enable kibana
```

### 14.5 Filebeat部署

#### 14.5.1 安装Filebeat

```bash
yum install -y filebeat
```

#### 14.5.2 配置Filebeat

```yaml
# /etc/filebeat/filebeat.yml
filebeat.inputs:
- type: log
  paths:
    - /var/log/nginx/*.log

output.logstash:
  hosts: ["192.168.1.100:5044"]
```

### 14.6 常用命令

```bash
# 查看索引列表
curl -X GET "localhost:9200/_cat/indices?v"

# 删除索引
curl -X DELETE "localhost:9200/logstash-2024.01.01"

# 集群健康状态
curl -X GET "localhost:9200/_cluster/health?pretty"
```

---

## 第15章：Ceph 分布式存储

### 15.1 Ceph简介

Ceph是一个统一的分布式存储系统，提供对象存储、块存储和文件系统三种存储接口。

#### 15.1.1 存储分类

| 类型 | 说明 | 示例 |
|------|------|------|
| 块存储 | 需要格式化，直接读写磁盘 | iSCSI、RBD |
| 文件存储 | 通过文件系统接口访问 | NFS、CephFS |
| 对象存储 | 通过HTTP API访问 | S3、Swift、RGW |

#### 15.1.2 Ceph架构

```
+------------------+
|     Client       |
+--------+---------+
         |
+--------v---------+
|   RADOS Gateway  |
+--------+---------+
         |
+--------v---------+
|      RADOS       | (可靠自动分布式对象存储)
+--------+---------+
         |
    +----+----+
    |    |    |
  OSD  OSD  OSD
```

### 15.2 Ceph组件

| 组件 | 说明 |
|------|------|
| MON (Monitor) | 维护集群状态映射，至少3个实现高可用 |
| OSD | 对象存储守护进程，每个磁盘一个OSD |
| MGR (Manager) | 集群监控和管理 |
| MDS | 元数据服务器，CephFS使用 |
| RGW | 对象存储网关，提供S3/Swift接口 |

### 15.3 Ceph部署

#### 15.3.1 环境准备

```bash
# 所有节点配置hosts
192.168.1.101 ceph-node1
192.168.1.102 ceph-node2
192.168.1.103 ceph-node3

# 配置NTP时间同步
yum install -y chrony
systemctl start chronyd

# 创建ceph用户
useradd -d /home/ceph -m ceph
echo "ceph ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
```

#### 15.3.2 安装Ceph

```bash
# 在部署节点安装ceph-deploy
yum install -y ceph-deploy

# 创建集群
mkdir my-cluster && cd my-cluster
ceph-deploy new ceph-node1 ceph-node2 ceph-node3

# 安装Ceph包
ceph-deploy install ceph-node1 ceph-node2 ceph-node3

# 部署Monitor
ceph-deploy mon create-initial

# 部署OSD
ceph-deploy osd create --data /dev/sdb ceph-node1
ceph-deploy osd create --data /dev/sdb ceph-node2
ceph-deploy osd create --data /dev/sdb ceph-node3

# 部署MGR
ceph-deploy mgr create ceph-node1
```

### 15.4 Ceph使用

#### 15.4.1 块存储(RBD)

```bash
# 创建存储池
ceph osd pool create rbd_pool 128

# 创建块设备镜像
rbd create myimage --size 10240 --pool rbd_pool

# 客户端映射
rbd map rbd_pool/myimage

# 格式化并挂载
mkfs.xfs /dev/rbd0
mount /dev/rbd0 /mnt
```

#### 15.4.2 对象存储(RGW)

```bash
# 部署RGW
ceph-deploy rgw create ceph-node1

# 创建S3用户
radosgw-admin user create --uid="testuser" --display-name="Test User"

# 使用S3 API访问
aws s3 --endpoint-url http://ceph-node1:7480 ls
```

#### 15.4.3 文件系统(CephFS)

```bash
# 创建元数据池和数据池
ceph osd pool create cephfs_data 128
ceph osd pool create cephfs_metadata 128

# 创建文件系统
ceph fs new myfs cephfs_metadata cephfs_data

# 客户端挂载
mount -t ceph 192.168.1.101:6789:/ /mnt -o name=admin
```

### 15.5 集群维护

#### 15.5.1 常用命令

```bash
# 查看集群状态
ceph -s

# 查看OSD状态
ceph osd tree

# 查看存储池
ceph osd lspools

# 查看容量使用
ceph df

# 平衡数据
ceph osd reweight-by-utilization
```

#### 15.5.2 故障处理

```bash
# 重新平衡PG
ceph osd reweight-by-utilization

# 修复不一致的PG
ceph pg repair <pg_id>

# 标记OSD为out
ceph osd out <osd_id>

# 从集群移除OSD
ceph osd down <osd_id>
ceph osd rm <osd_id>
```

---

# 第七篇：云服务与职业发展

本篇介绍云服务实践和职业发展相关内容，包括阿里云和面试准备。

---

## 第16章：阿里云实践

### 16.1 阿里云简介

阿里云是中国领先的云计算服务提供商，提供IaaS、PaaS、SaaS全栈云服务。

#### 16.1.1 核心产品

| 产品类型 | 产品名称 | 说明 |
|----------|----------|------|
| 计算 | ECS | 云服务器 |
| 计算 | 弹性伸缩 | 自动调整计算资源 |
| 网络 | VPC | 私有网络 |
| 网络 | SLB | 负载均衡 |
| 存储 | OSS | 对象存储 |
| 存储 | NAS | 文件存储 |
| 数据库 | RDS | 关系型数据库 |
| 数据库 | Redis | 缓存服务 |
| 安全 | 安全组 | 网络访问控制 |
| 安全 | WAF | Web应用防火墙 |

### 16.2 ECS云服务器

#### 16.2.1 实例规格

| 规格族 | 适用场景 |
|--------|----------|
| 通用型 | 中小规模企业应用 |
| 计算型 | 计算密集型应用 |
| 内存型 | 数据库、缓存 |
| 大数据型 | Hadoop、Spark |
| GPU型 | 深度学习、渲染 |

#### 16.2.2 常用操作

```bash
# 使用CLI管理ECS
aliyun ecs DescribeInstances --RegionId cn-hangzhou

# 创建实例
aliyun ecs CreateInstance \
  --RegionId cn-hangzhou \
  --ImageId centos_7_06_64_20G_alibase_20190218.vhd \
  --InstanceType ecs.g5.large

# 启动实例
aliyun ecs StartInstance --InstanceId i-xxxxxx
```

### 16.3 SLB负载均衡

#### 16.3.1 负载均衡类型

| 类型 | 说明 |
|------|------|
| 四层负载 | TCP/UDP协议 |
| 七层负载 | HTTP/HTTPS协议 |

#### 16.3.2 健康检查

```bash
# 配置健康检查
aliyun slb SetBackendServers \
  --LoadBalancerId lb-xxxxxx \
  --BackendServers '[{"ServerId":"i-xxxxxx","Weight":"100"}]'
```

### 16.4 RDS数据库

#### 16.4.1 数据库类型

| 类型 | 说明 |
|------|------|
| MySQL | 最常用的关系型数据库 |
| PostgreSQL | 开源关系型数据库 |
| SQL Server | 微软数据库 |
| MariaDB | MySQL分支 |

#### 16.4.2 高可用架构

- 主备架构：一主一备，自动故障转移
- 集群架构：一主多从，读写分离

### 16.5 OSS对象存储

#### 16.5.1 存储类型

| 类型 | 适用场景 |
|------|----------|
| 标准存储 | 热点数据 |
| 低频存储 | 访问频率较低 |
| 归档存储 | 长期保存数据 |

#### 16.5.2 使用ossutil

```bash
# 安装ossutil
wget http://gosspublic.alicdn.com/ossutil/1.6.7/ossutil64
chmod 755 ossutil64

# 配置
./ossutil64 config

# 上传文件
./ossutil64 cp localfile.txt oss://bucket/path/

# 下载文件
./ossutil64 cp oss://bucket/path/file.txt ./
```

### 16.6 安全组

#### 16.6.1 常见规则配置

```bash
# 开放SSH端口
aliyun ecs AuthorizeSecurityGroup \
  --SecurityGroupId sg-xxxxxx \
  --IpProtocol tcp \
  --PortRange 22/22 \
  --SourceCidrIp 0.0.0.0/0

# 开放HTTP端口
aliyun ecs AuthorizeSecurityGroup \
  --SecurityGroupId sg-xxxxxx \
  --IpProtocol tcp \
  --PortRange 80/80 \
  --SourceCidrIp 0.0.0.0/0
```

---

## 第17章：面试注意事项与面试题

### 17.1 面试准备

#### 17.1.1 自我介绍

- 控制在2-3分钟
- 突出与岗位相关的技能和经验
- 准备多个版本（技术面、HR面）

#### 17.1.2 面试流程

1. **自我介绍**（2-3分钟）
2. **技术面试**：技术问题、项目经验
3. **综合面试**：职业规划、团队协作
4. **HR面试**：薪资、入职时间

### 17.2 核心面试题

#### 17.2.1 Nginx相关

**Q: Nginx几种调度算法？**
- 轮询(round-robin)、加权轮询(weight)、ip_hash、least_conn、url_hash

**Q: Nginx优化方案？**
- worker进程绑定CPU、调整worker_connections、开启gzip压缩、配置缓存

**Q: Nginx四层/七层负载区别？**
- 四层：基于IP+端口转发（TCP/UDP）
- 七层：基于HTTP协议内容转发

#### 17.2.2 HAProxy相关

**Q: HAProxy调度算法？**
- 静态：static-rr、first
- 动态：roundrobin、leastconn
- 哈希：source、uri、url_param、hdr

#### 17.2.3 监控相关

**Q: Zabbix主被动模式区别？**
- 被动模式：Server主动连接Agent获取数据
- 主动模式：Agent主动向Server发送数据

**Q: 如何监控MySQL主从同步？**
- 检查Slave_IO_Running和Slave_SQL_Running状态是否为Yes

#### 17.2.4 数据库相关

**Q: MySQL主从同步原理？**
- Master：IO线程读取binlog发送给Slave
- Slave：IO线程接收binlog写入relay log，SQL线程执行relay log

**Q: Cookie和Session区别？**
- Cookie：存储在客户端浏览器
- Session：存储在服务器端

#### 17.2.5 容器相关

**Q: Dockerfile常用指令？**
- FROM、RUN、COPY、ADD、WORKDIR、ENV、EXPOSE、CMD、ENTRYPOINT

**Q: K8s中Service的作用？**
- 提供Pod的稳定访问入口，实现服务发现和负载均衡

### 17.3 场景题

**Q: 如何快速释放磁盘空间？**
```bash
# 查找大文件
find / -type f -size +100M

# 清理日志
> /var/log/messages
# 或者使用logrotate

# 清理yum缓存
yum clean all
```

**Q: 网站访问量如何统计？**
- PV（页面访问量）：500万
- UV（独立访客）：50万
- IP（独立IP）：10万

**Q: 日志收集流程？**
```
应用服务器 → Filebeat → Kafka → Logstash → Elasticsearch → Kibana
```

### 17.4 职业发展路径

#### 17.4.1 运维岗位层级

| 级别 | 能力要求 |
|------|----------|
| 初级运维 | 基础服务部署、监控配置、日常巡检 |
| 中级运维 | 服务维护、故障排查、脚本编写 |
| 高级运维 | 架构设计、性能优化、自动化运维 |
| 运维架构师 | 技术选型、架构规划、团队管理 |

#### 17.4.2 技能发展建议

1. **打好基础**：Linux、网络、数据库
2. **深入专项**：负载均衡、监控、容器
3. **拓展广度**：云服务、自动化、安全
4. **持续学习**：新技术、最佳实践

---

## 附录

### 常用命令速查

#### Linux系统

```bash
# 查看系统信息
uname -a
cat /etc/os-release

# 查看资源使用
top
htop
free -h
df -h

# 查看网络连接
netstat -tlnp
ss -tlnp
```

#### 服务管理

```bash
# systemd管理
systemctl start nginx
systemctl stop nginx
systemctl restart nginx
systemctl status nginx
systemctl enable nginx

# 查看日志
journalctl -u nginx -f
```

#### 网络诊断

```bash
# 网络连通性
ping 8.8.8.8
traceroute 8.8.8.8

# 端口检测
telnet 192.168.1.1 80
nc -zv 192.168.1.1 80

# 抓包分析
tcpdump -i eth0 port 80
```
