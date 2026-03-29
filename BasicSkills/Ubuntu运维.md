# Ubuntu常用指令

## 查看系统资源使用

可交互的命令工具

```bash 
apt update 
apt install htop
```
## 查看系统服务与日志

### Systemd

服务设置

```bash
# 启动服务
systemctl start <服务名>
# 停止服务
systemctl stop <服务名>
# 重启服务
systemctl restart <服务名>
# 查看服务状态
systemctl status <服务名>
# 设置开机自启
sudo systemctl enable <服务名>
# 禁用开机自启
sudo systemctl disable <服务名>

```

日志查看
```bash
# 查看指定服务的完整日志
journalctl -u <服务名>.service
# 实时查看最新日志
sudo journalctl -u apache2.service -f

```
