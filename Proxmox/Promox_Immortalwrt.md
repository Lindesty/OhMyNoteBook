










immortalwrt 命令行修改静态ip

```
uci set network.lan.ipaddr='192.168.1.120'
uci set network.lan.netmask='255.255.254.0'
uci commit network
/etc/init.d/network restart
ip a show br-lan
```











