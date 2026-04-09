


## 修改ip地址

```bash
vim /etc/network/interfaces
```


配置文件案例

```
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
allow-hotplug ens18
auto ens18
iface ens18 inet static
    address 192.168.1.110
    netmask 255.255.254.0
    gateway 192.168.1.1
```

修改DNS

```bash
vim /etc/resolv.conf
```

```
nameserver 223.5.5.5
nameserver 8.8.8.8
```


配置命令

```bash
sudo systemctl restart networking
```