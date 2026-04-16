# 常用按键字符

- &lt;Esc&gt; 表示 Esc 键；显示为“⎋”
- &lt;CR&gt; 表示回车键；显示为“↩”
- &lt;Space&gt; 表示空格键；显示为“␣”
- &lt;Tab&gt; 表示 Tab 键；显示为“⇥”
- &lt;BS&gt; 表示退格键；显示为“⌫”
- &lt;Del&gt; 表示删除键；显示为“⌦”
- &lt;lt&gt; 表示 &lt; 键；显示为“&lt;”
- &lt;Up&gt; 表示光标上移键；显示为“⇡”
- &lt;Down&gt; 表示光标下移键；显示为“⇣”
- &lt;Left&gt; 表示光标左移键；显示为“⇠”
- &lt;Right&gt; 表示光标右移键；显示为“⇢”
- &lt;PageUp&gt; 表示 Page Up 键；显示为“⇞”
- &lt;PageDown&gt; 表示 Page Down 键；显示为“⇟”
- &lt;Home&gt; 表示 Home 键；显示为“↖”
- &lt;End&gt; 表示 End 键；显示为“↘”
- &lt;F1&gt; - &lt;F12&gt; 表示功能键 1 到 12；显示为“F1”到“F12”
- &lt;S-…&gt; Shift 组合键；显示为“⇧”（较少使用，因为我们需要写 ! 而不是 &lt;S-1&gt;；和特殊键组合时仍然有用）
- &lt;C-…&gt; Control 组合键；显示为“⌃”
- &lt;M-…&gt; Alt 组合键；显示为“⌥”（对于大部分用户，它的原始键名 Meta 应该只具有历史意义）
- &lt;D-…&gt; Command 组合键；显示为“⌘”（Mac 键盘）

# 运行sh脚本


使用Ctrl + R在终端快速搜索之前用过的命令


~~~
bash *.sh
sh *.sh
~~~



# 权限管理

进入root用户
~~~
su root
~~~

认证失败解决方法：使用passwd命令重新设置下root密码
~~~
me@ubuntu:~$ sudo passwd 
密码：&lt;--- 输入安装时那个用户的密码
输入新的 UNIX 密码：&lt;--- 新的Root用户密码
重新输入新的 UNIX 密码：&lt;--- 重复新的Root用户密码
passwd：已成功更新密码 
me@ubuntu:~$ su 
密码：&lt;--输入重置的新密码 
root@ubuntu:/home/me#         #已经进入root用户
~~~

## liunx 用户管理

useradd     新建用户

userdel     删除用户

groupadd    添加用户组

passwd      修改用户密码

usermod     修改用户属性

chage       修改用户属性

id          查看系统中已经存在的用户

su          切换当前命令行用户

sudo        以其它用户身份执行命令

visudo      打开用户权限配置文件

## 文件权限

文件类型

- -普通文件
- d目录文件
- b块特殊文件
- c字符特殊文件
- l符号链接
- f命名管道
- s套接字文件          

字符权限表示方法 

- r读
- w写
- x执行

数字权限的表示方法 

- r=4
- w=2
- x=1

更改权限的方法

- chmod 修改文件、目录权限
- chown 更改属主、属组
- chgrp 可以单独更改属组，不常用





# 文件相关操作

## 常见目录

liunx 中常见的目录
~~~
/ 根目录
/root root用户的家目录
/home/username 普通用户的家目录
/etc配置文件目录
/bin命令目录
/sbin管理命令目录
/usr/bin 或 /usr sbin系统预装的其它命令
~~~



## 文件查看

pwd 显示当前的目录名称

ls 显示指定工作目录下的内容
~~~
ls [选项，选项...] 参数...
常用参数
-l 长格式显示文件
-a 显示隐藏文件
-r 逆序显示
-t 按照时间顺序显示
-R 递归显示
~~~

查看文件方详细信息，以MB为单位显示文件大小
~~~
ls -lh [文件路径]
~~~

cd 更改当前的操作目录,使用“./”表示当前目录,使用“../”表示上层目录
~~~
cd /root/
~~~

## 目录文件的创建与删除

mkdir 创建目录

rmdir 删除目录，只有当目录中的内容的空的时候才能删除

rm -r 递归删除目录及内容

rm -rf 递归删除目录及内容并不提示

## 通配符

"*"表示多个字符

"?"表示单个字符


## 文件操作

touch 创建文件


cp (copy) 复制文件，使用“-v”显示进度
~~~
cp [文件地址] [目标地址]
cp -r [文件夹地址] [目标地址]
~~~

cp (copy) 复制文件，使用“-a”保留原有属性
~~~
cp -a [文件地址] [目标地址]
~~~


mv (move)移动文件
~~~
mv [文件地址] [目标地址]
~~~

## 文本内容查看

- cat 文本内容显示到终端
- head 查看文件开关

查看文件前n行的内容
~~~
head -n [文件地址]
~~~
- tail 查看文件结尾

查看文件结尾内容，随文件增长即时输出新增数据
~~~
tail -f [文件地址]
~~~
- wc 统计文件内容信息

## 文件的备份压缩

tar 打包命令

常用参数：
- c 打包 
- x 解包
- f 指定操作类型为文件

例：将/ect(liunx配置文件)文件打包成文件并存储到桌面,其中"c"表示打包,"f"表示文件
~~~
tar cf ./backup/etc-backup.tar /etc
~~~
通过添加压缩参数将文件压缩成gzip/bzip2
~~~
tar czf ./backup/etc-backup.tar.gz /etc
tar cjf ./backup/etc-backup.tar.bz2 /etc
~~~

例：将打包的文件解压到桌面tmp文件夹下
~~~
tar xf ./backup/etc-backup.tar -C ./tmp/
~~~

分别使用"zxf"/"jxf"来解压gzip/bzip2打包文件(tar.gz =&gt;  tgz  /  .tar.bz2 =&gt; .tbz2)
~~~
tar zxf ./backup/etc-backup.tar.gz -C ./tmp/
tar jxf ./backup/etc-backup.tar.bz2 -C ./tmp/
~~~

# init命令

~~~
init 0 - 停机（千万不能把initdefault 设置为0 ）

init 1 - 单用户模式，只root用户进行维护

init 2 - 多用户，不能使用NFS(Net File System) 不联网

init 3 - 完全多用户模式(标准的运行级)

init 4 - 安全模式

init 5 - X11 （xwindow) 图形化界面模式

init 6 - 重新启动 （千万不要把initdefault 设置为6 
~~~

# 网络管理

## 网络状态查看

1. net-tools

- ifconfig
- route
- netstat

2. iproute2

- ip

为接口添加IP地址
ip addr add/del {{ip}}/{{mask}} dev {{interface}}

打开/关闭某个接口
ip link set {{interface}} up/down

修改路由
ip route add {{ip}}/{{mask}} via 192.168.0.1

- ss

## 网络故障排除命令

- ping (目标是否畅通)
- traceroute (检查到目标主机间的每一跳)
- mtr (检查到目标主机间是否有数据丢失)
- nslookup (查看域名地址)


- telnet (检查端口的连接状态)
- tcpdump (更细致的检查数据包)

例：找到所有发送到10.0.0.1，80端口的数据包,并保存
~~~
tcpdump -i any -n host 192.168.239.2 and port 80 -w /home/lindesty/Downloads/cap
~~~

- netstat

~~~
netstat -ntpl
~~~
    - n 不要显示域名
    - t 以tcp方式截取内容
    - p 显示端口对应进程
    - l licene

- ss ()

## 网络服务管理 

网络服务管理程序分为两种，分别为SysV和systemd

- service network start|stop|restart
- chkconfig -list network
- systemctl list-unit-files NetworkManager.service
- systemctl start|stop|restart NetworkManger
- systemctl enable|disable NetworkManger

网络配置文件：

- ifcfg-eth0
- /etc/hosts



常用网络配置文件

# 进程管理

## 进程的概念与进程查看

进程——运行中的程序，从程序开始远征到终止的生命周期是可管理的

- 进程的开始
  - C启动是从main函数开始的
  - ……
- 进行的终止
  - 正常终止（main返回、调用exit等）
  - 异常终止（调用abort、接收信号等）

## 进程的控制命令

- ps

- pstree

查看当前运行的进程

PIP - 进程的唯一标识；TTY - 查询的终端

- top
  - 按下键盘上的1显示每个逻辑CPU的状态
  - 按下键盘上的s再按1，更改刷新从3s到1s



- 调整优先级
  - nice 范围从-20到19，值越小优先级越高，抢占资源就越多
  - renice 重新设置优先级
- 进程的作业控制
  - jobs
  - &符号

~~~
./a.sh & --后台运行程序

jobs --查看后台运行程序
fg 1 将后台运行中编号为1的程序拉到前台
bg 1 将后台运行中编号为1的程序拉到后台

~~~

~~~
./a.sh
按下ctrl + z ,后台运行程序并挂起

~~~

## 进行的通信方式——信号

典型用法是：终端用户输入中断命令，通过信号机制停止一个程序的运行

使用信号的常用快捷键和命令

- kill -l  查看所有的命令
- SIGINT 通知前台进程终止进程 ctrl + c
- SIGKILL 立即结束程序，不能被阻塞和处理 kill -9 {pid} 

## 守护进程和系统日志

- 使用nohup与&符号配合运行一个命令
  - nohup命令使进程忽略hangup(挂起)信号

~~~
nohup {指令} &
--使指令在后台运行并在终端关闭后也运行
~~~

- 守护进程(deamon)与一般进程的差别：
- 使用screen命令
  - screen进入screen环境
  - ctrl + a d 退出(detached) screen 环境
  - screen -ls 查看screen的会话
  - screen -r sessionid 恢复会话


# 服务管理工具 systemctl

服务（提供觉功能的守护进程）集中管理工具

- service
- systemctl
  - 常见操作
systemctl start|stop|restart|reload|enable|disable {服务名称}

软件包安装的服务单元 /usr/lib/systemd/system/

ls -l runlevel*.target

查看当前所在状态 systemctl get-default

设置下次启动时系统状态 systemctl set-default {启动状态}

~~~
poweroff.target
rescue.target
multi-user.target
multi-user.target
multi-user.target
graphical.target
reboot.target
~~~

# 内存与磁盘管理

## 内存和磁盘使用率查看

- 内存使用率
  - free 
    - 常用free -m 以MB为单位显示
  - top

- 磁盘使用率
  - fdisk 或 parted
    - 查看所有分区
  - df
    - 查看分区挂载到的目录
  - du
  - du 与 ls 的区别
    - du查出来的是实际占用大小，ls是文件的大小

~~~
创建一个40M的文件
dd if=/dev/zero bs=4M count=10 of=afile
创建一个120M的文件，实际大小40M
dd if=/dev/zero bs=4M count=10 seek=20 of=bfile
~~~


## 文件系统

- linux 支持多种文件系统，觉的有
  - ext4
  - xfs
  - NTFS

- ext4
  - 超级块:
    - 用于描述文件系统总体信息（如文件块大小，最大文件大小，文件系统魔数等）
  - 超级块副本
  - i节点(inode)
  - 数据块(datablock)

删除文件后只是将i节点与文件的链接断开，并没有真正的删除文件

- 使用ln将将文件指向一个i节点(创建硬链接/软连接)

~~~
ln afile bfile   
创建一个bfile指向afile，i节点相同，不可跨分区

ln -s afile aafile
创建了aafile，记录了afile的路径，i节点不同，可跨分区
对链接进行权限操作会传递到原文件
~~~

~~~
setfacl -m u:user1:r afile
为user1赋予对afile的读取权限

getfacl
查看当前的权限

setfacl -x ……
回收权限
~~~

## 磁盘的分区与挂载

- 常见命令
  - fdisk
  - mkfs
  - parted （超过2T的磁盘）
  - mount

- 常见配置文件
  - /etc/fstab

~~~
fdisk /dev/sdb
为sdb设备进行分区

mkfs.ext4 /dev/sdb1 
在分区上创建ext4文件系统（格式化）


mkdir /mnt/sdb1
mount -t auto /dev/sdb1 /mnt/sdb1
将sdb1挂载到/mnt/sdb1文件夹上（临时）

vim etc/fstab
在下面加上
/dev/sdb1 /mnt/sdb1 ext4 defaults 0 0

通过更改配置文件将sdb1挂载到/mnt/sdb1目录上

~~~

## 用户磁盘配额

- xfs文件系统用户磁盘配额quota

~~~
mkfs.xfs /dev/sdb1
mkdir /mnt/disk1
mount -o uquota,gquota /dev/sdb1 /mnt/disk1
chmod 1777 /mnt/disk1
xfs_quota -x -c 'report -ugibh' /mnt/disk1
xfs_quota -x -c 'limit -u isoft=5 ihard=10 user1' /mnt/disk1
~~~

## 交换分区（虚拟内存）的查看与创建

- 增加交换分区的大小
  - mkswap
  - swapon
  - swapoff 取消挂载
- 使用文件制作交换分区
  - dd if/dev/zero bs=4M count=1024 of=/swapfile

使用mkswap将分区sdb1作为swap空间
~~~
mkswap /dev/sdb1
swapon /dev/sdb1
~~~

创建一个swapfile文件作为虚拟内存挂载
~~~shell
dd if=/dev/zero bs=4M count=1024 of=/swapfile
chmod 600 ./swapfile
mkswapfile ./swapfile
swapon ./swapfile

vim /dev/sftab
写入/swapfile swap swap defaults 0 0 
~~~

## 软件RAID的使用

- RAID的常见级别及其含义
  - RAID 0 striping 条带方式，将数据分成两份，分别存到两个盘中
  - RAID 1 mirroring 镜像方式，数据同时存储在两块盘中
  - RAID 5 奇偶校验，三块（两块数据，一块存奇偶校验值），能坏一块
  - RAID 10 RAID 1 与 RAID 0 的结合

- 软件RAID的使用
- mdadm


## 逻辑卷管理

- 逻辑卷和文件系统的关系
  - 逻辑卷是一种在物理磁盘上创建的虚拟磁盘，它可以将多个物理磁盘组合成一个大的逻辑磁盘。文件系统是一种用于管理和组织文件的机制，它可以在逻辑卷上创建. 逻辑卷和文件系统之间的关系是，文件系统是在逻辑卷上创建的，而逻辑卷是在物理磁盘上创建的。逻辑卷可以被分成多个逻辑分区，每个逻辑分区可以有自己的文件系统.
- 为Linux创建逻辑卷
  - pvcreate
  - lvcreate
- 动态扩容逻辑卷

## 系统综合状态查看

- 使用sar命令查看系统综合状态
- 使用第方命令查看网络流量
  - yum install epel-release
  - yum install iftop
  - iftop -P

## SELinux

MAC(强行访问控制)与DAC(自主访问控制)

- 查看SELinuxr命令
  - getenforce
  - /usr/sbin/sestatus
  - ps -Z and ls -Z and id -Z
- 关闭SELinux
  - setenforce 0
  - /etc/selinux/sysconfig

# Shell脚本编程

- 什么是Shell

Shell 是命令解释器，用于解释用户对操作系统的操作

通过查看/etc/shells可以看到系统中存在的shell

- Linux的启动过程
  - BIOS
  - MBR
  - BootLoader(grub)
  - Kernel
  - systemd
  - 系统初始化
  - shell

~~~
查看mbr的分区表
dd if=/dev/sda of=mbr.bin bs=512 count=1
hexdump -C mbr.bin | more

查看用于引导的grub
cd /boot/grub/
grub-editenv list
uname -r
~~~

## 编写一个Shell脚本

为了组合命令和多次执行使用脚本文件来保存需要执行的命令

需赋予该文件执行权限（chmod u+rx filename）

- 标准的Shell脚本要包含的元素
  - Sha-Bang （用#!/bin/bash声明使用的是bash执行）
  - 命令
  - \# 开头的注释
  - chmod u+rx filename 可执行权限
  - 执行命令
    - 外部命令
      - bash ./1.sh
      - ./1.sh
    - 内建命令（不需要创建子进程，对当前Shell生效）
      - source ./1.sh
      - . ./1.sh

## 管道与重定向

- 管道与管道符
  - 管道和信号一样，也是进程通信的方式之一
  - 匿名管道（管道符）是Shell编程经常用到的通信工具
  - 管道符是"|"，将前一个命令执行得到的结果传递给后面的命令
    - ps | cat
    - echo 123 | ps

- 重定向符号
  - 一个进程默认会打开标准输入、标准输出、错误输出三个文件描述符
  - 输入重定向符号“<”
    - wc -l < /etc/passwd
    - read var < /path/to/a/file
  - 输出重定向符号“>”(覆盖) “>>”(追加) “2>”(输出错误) “&>”(全部输出)
    - echo 123 > /path/to/a/file
  - 输入和输出重定向组合使用
    - cat > /path/to/a/file << EOF
    - I an $USER
    - EOF

~~~shell
# 将读取的数据存入到var中
read var < a.txt
# 查看var变量的值
echo $var
~~~

## 变量

- 变量的定义
  - 变量的命名规则
    - 字母、数字、下划线
    - 不以数字开头

- 为变量赋值的过程，称为变量替换，等号左右不允许有空格
  - 变量名=变量值
    - a=213
  - 使用let为变量赋值
    - let a=10+20
  - 将命令赋值给变量
    - b=a
  - 将命令结果赋值给变量，使用$()或``
    - letc=$(ls -l /etc)
    - letc=\`ls -l /etc\`
  - 变量值有空格等特殊字符可以包含在""或''中

- 变量的引用
  - \$\{变量名\}称作对变量的引用
  - echo \$\{变量名\}查看变量的值
  - \$\{变量名\}在部分情况下可以省略为\$变量名

- 变量的作用范围
  - 变量的默认作用范围，只在当前的shell中生效
  - 变量的导出(使子进程获取父进程的变量)
    - export
  - 变量的删除
    - unset

- 系统环境变量：每个Shell打开都可以获得到的变量
  - set和env命令
  - $?(上一条命令是否正常执行) $$(当前进程PID) $0(当前进程名称)
  - $PATH (终端上可以用的命令所在的路径)
  - $PS1  (终端上的信息)
- 位置变量
  - $1 $2 ... ${n}

~~~shell
#!/bin/bash
# $1 $2 ... ${10}

pos1=$1
pos2=${2-_} (如果为空值，就用第2个参数赋值)

echo $pos1
echo $pos2
#获取第1个与第二个参数并显示
~~~

## 环境变量配置文件

- 配置文件位置
  - /etc/profile
  - /etc/profile.d/
  - ~/.bash_profile
  - ~/.bashrc
  - /etc/bashrc

## 数组

- 定义数组
  - IPTS=(10.0.0.1 10.0.0.2 10.0.0.3)
- 显示数组的所有元素
  - echo ${IPTS[@]}
- 显示数组元素个数
  - echo ${#IPTS[@]}
- 显示数组的第一个元素
  - echo ${IPTS[0]}

## 转义与引用

- 特殊字符：一个字符不仅有字面意义，还有元意(meta-meaning)
  - \# 注释
  - ; 分号
  - \ 转义符号
  - '与" 引号
- 单个字符前的转义符号
  - \n \r \t 单个字母的转义
  - <pre>\$ \" \\ 单个非字母转义</pre>
- 引用
  - 常用的引用符号
    - " 双引号(不完全引用)
      - <pre>a=10;echo "-$a" 结果为-10</pre>
    - ' 单引号(完全引用，是什么就显示什么)
      - <pre>a=10;echo '-$a" 结果为-$a</pre>
    - ` 反引号(执行命令)

## 运算符

- 赋值运算符
  - = 赋值去处符，用于算数赋值和字符串赋值
  - 使用 unset取消为变量的赋值
  - = 除了作为赋值去处符还可以作为测试操作符
- 算数运算符
  - 基本运算符
    - \+ \- \* / ** \%
  - 使用expr进行运算
    - expr 4 + 5
- 数字常量
  - let "变量名 = 变量值"
    - 双圆括号简化
      - ((a=10))
      - ((a++))
      - echo $((10+20))
  - 变量值使用0开关为八进行
  - 变量值使用0x开关为十六进制
- 双圆括号

## 测试与判断

- 退出与退出状态
  - 退出程序命令
    - exit
    - exit 10 返回10 给shell,返回值非0位不正常退出
    - $?判断当前Shell前一个进程是否正常退出
- 测试命令test用于检查文件或者比较值
  - 文件测试
    - test -f /etc/passwd;echo $? 用于测试文件是否存在
  - 整数比较测试 
  - 字符串测试
- test测试语句可以简化为[]符号
    - [ -e /etc ] 检查文件是否存在的简写
- [] 符号还有扩展写法[[]]支持&&、||、<、>
  

- 使用if-then-else语句
  - if [ 测试条件 ] 或 命令返回值是否为0
  - then 执行相应命令
  - *else 测试条件不成立，执行相应命令*
  - *elif [测试条件]*
  - *then 执行相应命令*
  - *else 测试条件不成立，执行相应命令*
  - fi 结束

- []中常用的判断符号
  - eq 是否相等
  - ne 是否不等
  - gt 大于
  - lt 小于
  - ge 小于或等于
  - le 小于或等于


~~~shell
#!/bin/bash
if [ $USER = root ];then
        echo "user root";
        echo "user:$USER";
else
        echo "other user";
        echo $USER;
fi
~~~

- 嵌套if的使用

- 分支结构
~~~shell
case "$变量" in
  "情况1" )
    命令...;;
  "情况2" )
    命令...;;
  *)
    命令...;;
esac
~~~

~~~shell
#!/bin/bash
# case demo
case "$1" in
	"start"|"START")
		echo "$0 start......"
		;;
	"stop")
		echo "$0 stop......"
		;;
	"restart"|"reload")
		echo "$0 restart......"
		;;
	*)
		echo "Usage: $0 {start|stop|restart|reload}"
		;;
esac
~~~

## 循环

- 使用for循环遍历命令的执行结果
  - 语法
    ~~~
    for 参数 in 列表
    do 执行的命令
    done 封闭一个循环
    ~~~
  - 使用反引号或$()方式执行命令，命令的结果当作列表进行处理
  - 列表中包含多个变量，变量用空格分隔
  - 对文本处理，要使用文本查看命令取出文本内容
    - 默认逐行处理，如果文本出现空格会当做多行处理
- 使用for循环遍历变量和文件的内容

案例：将mp3后缀改成mp4
~~~shell
touch a.mp3 b.mp3 c.mp3
for filename in `ls *.mp3`
do
  mv $filename $(basename $filename .mp3).mp4
done
~~~

- c语言风格的for命令

~~~shell
# 原风格
for i in {0..9}
do
  echo $i
done

# c风格
for (( i=1 ; i<=10 ; i++ ))
do
  echo $i
done
~~~

- while循环

~~~shell
a=1
while [ $a -lt 10 ]
do
  echo $a;
  ((a++));
done
~~~


- 死循环

~~~shell
while :
do
  echo always
done
~~~

- until循环

条件为假时执行

综合案例
~~~shell
#将/etc/profile.d/中的所有可执行文件执行
for sc_name in /etc/profile.d/*.sh
do
  if [ -x $sc_name ]; then
    . $sc_name
  fi
done
~~~

99乘法表
~~~shell
#!/bin/bash
for i in {1..9}
do
    for j in {1..9}
    do
        if [ $j -le $i ]
        then
            echo -ne "$j×$i=$((i*j))\t"
        fi
    done
    echo
done

~~~


- break和continue语句

- 使用循环对命令行参数的处理
  - 命令行参数可以使用 $1 $2 ${10} ${n} 进行读取
  - $0 代表脚本名称
  - $* 和 $@ 代表所有位置参数
  - $# 代表位置参数的数量

遍历参数，如果参数等于help则输出两次help
~~~
#!/bin/bash
# help display help help

for pos in $*;
do
       if [ "$pos" = "help" ]; then
               echo $pos $pos
       fi
done


while [ $# -ge 1 ]
do
        if [ "$1" = "help" ]; then
                echo $1 $1
        fi
        shift
done

~~~

## 函数

- 自定义函数
  - 函数用于“包含”重复使用的命令集合
  - 自定义函数
    - <pre>function fname(){命令}</pre>
  - 函数的执行
    - fname
- 函数作用范围的变量
  - local 变量名
- 函数的参数
  - $1 $2 ... $n



~~~shell
# 进入一个目录并显示所有文件
cdls() {
  cd $1
  ls
}

# 检查一个进程是否存在
checkpid() {
  local i
  for i in $*; do
    [ -d "proc/$i" ] && return 0
  done
}
~~~

- 系统脚本
  - 系统自建了函数库，可以在脚本中引用
    - /etc/init.d/functions   (CentOS)
    - /etc/profile
    - ~/.bashrc
    - ~/.bash_profile
  - 自建函数库
    - 使用source脚本文件“导入”函数

## 脚本控制

- 脚本优先级控制
  - 可以使用nice和renice调整脚本优优先级
  - 避免出现“不可控的”死循环
    - 死循环导致cpu占用过高
    - 死循环导致死机
- 捕获信号
  - kill默认会发送15号信号给应用程序
  - ctrl + c 发送2号信号给应用程序
  - 9号信号不可阻塞

~~~shell
ulimit -a #可以查看当前终端的权限

#不断在后台创建进程
func() { func | func& } ;func


#获取15信号与2信号时不退出程序
#!/bin/bash
# signal demo
trap "echo sig 15" 15
trap "echo sig 2" 2
echo $$
while :
do
  :
done
~~~

## 计划任务at

- 一次性计划任务at
  - 计划任务：让计算机在指定的时间运行程序
  - 计划任务分为：一次性计划任务 \ 周期性计划任务
  - 一次性计划任务
    - at
- 周期性计划任务
  - cron
    - 配置方式
      - crontab -e
    - 查看现有的计划任务
      - crontab -l
    - 配置格式
      - 分钟 小时 日期 月份 星期 执行的命令
      - 注意命令的路径问题
- 计划任务加锁 flock
  - 如果计算机不能按照预期时间运行
    - anacontab 延时计划任务
    - flock 锁文件

~~~shell
# cron 的周期性任务最少1分钟执行一次

lindesty@lindesty:~/Downloads/test$ which date
/usr/bin/date
lindesty@lindesty:~/Downloads/test$ crontab -e

# 添加计划任务
* * * * * /usr/bin/date >> /home/lindesty/Downloads/test/test.txt

# 查看计划任务的日志（ubuntu）
grep CRON /var/log/syslog

# 每个用户的配置文件所在位置
/var/spool/cron/crontabs
~~~

## 正则表达式文本搜索

- [匹配字符写法](https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md)
- 文件的查找命令 find
- 文本内容的过滤

~~~
# 统计 /etc/passwd 文件中每种 shell 的使用次数。
cut -d ":" -f7 /etc/passwd | sort | uniq -c | sort -r
~~~

## vim 与 sed 、AWK 的区别
- 交互式与非交互式
- 文件操作模式与行操作模式

- sed 一般用于对文本内容做替换
  - <pre>sed `/user1/s/user1/u1/` etc/passwd </pre>
- AWK一般用于对文本内容进行统计、按需要的格式进行输出
  - <pre>cut 命令：cut -d : -f1 /etc/passwd</pre>
  - <pre>-F:'/wd$/{print$1}' /etc/passwd</pre>


- sed 的模式空间
  - 基本工作方式
    - 将文件以行为单位读取到内存（模式空间）
    - 使用sed的每个脚本对该行进行操作
    - 处理完成后输出该行
- 替换命令s
  - <pre>sed 's/old/new/' filename</pre>
  - <pre>sed -e 's/old/new/' -e 's/old/new/' filename ...</pre>
  - <pre>sed -i 's/old/new/' 's/old/new/' filename > ...</pre>
  - <pre></pre>

~~~shell
# 将文件file中找到的第一个a替换成aa
sed 's/a/aa/' file

# 将文件中找到的第一个/替换成abc
sed 's!/!abc!' file
~~~

## sed的替换命令加强版


- s/old/new/标志位
  - 数字，第几次出现才进行替换
  - g为全局替换，用于替换所有出现的次数
      - /如果和与此同时匹配的内容冲突可以使用其他符号，如：
      - s@old@new@g
  - p打印模式空间的内容
      - sed -n 'script' filename 阻止默认输出
  - w file 将模式窨的内容写入到文件
- 寻址（默认对每行进行操作，增加寻址后对匹配的行进行操作）
  - /与此同时表达式/s/old/new/g
  - 行号s/old/new/g
    - 行号可以是具体的行，也可以是最后一行$符号
  - 可以使用两个寻址符号，也可以混合使用行号和正则地址
- 分组
  - 寻址可以匹配多条命令
  - /regular/{s/old/new/; s/old/new/}
- sed脚本文件
  - 可以将选项保存为文件，使用-f加载脚本文件
  - sed -f sedscript filename

- sed其他命令
  - 删除命令
    - [寻址] d
      - 删除模式窨内容，改变脚本的控制流，读取新的输入行（d后面的指令都不会执行）
      - sed '/ab/d' bfile # 将所有匹配到ab的行删除
  - 追加、插入、更改
    - sed '/ab/i hello' bfile # 只要匹配到ab就在上一行插入hello
    - sed '/ab/a hello' bfile # 只要匹配到ab就在下一行插入hello
    - sed '/ab/c hello' bfile # 只要匹配到ab就将该行改写成hello
    - sed '/ab/r afile' bfile # 只要匹配到ab就追加文件中的内容
  - 打印
    - 打印行号命令=
    - 打印命令p
  - 下一行
    - 下一行命令n
  - 读文件和写文件
    - 读文件命令r
    - 写文件命令w
  - 退出命令
    -  q 

# 防火墙

- 防火墙分类
  - 软件防火墙和硬件防火墙
  - 包过滤防火墙和应用层防火墙
- iptables 的表和链
  - 规则表
    - filter
    - nat
    - mangle
    - raw
  - 规则链
    - INPUT OUTPUT FORWARD
    - PREROUTING POSTROUTING
- iptables 的 filter 表
- iptables 的 nat 表
- iptables 配置文件
- firewallD服务



~~~
# 查看所有规则
sudo iptables -vnL

# 接收从10.0.0.2 到本机所有端口的数据，规则添加到最后一行
iptables -A INPUT -s 10.0.0.2 -j ACCEPT

# 拒绝从10.0.0.3 到本机所有端口的数据，规则添加到第一行
iptables -I INPUT -s 10.0.0.3 -j DROP

# 更改默认不允许所有数据包进入 
iptables -P INPUT DROP

# 清空所有规则
iptables -F


~~~

# SSH服务

- SSH服务介绍
- SSH服务配置文件
  - /etc/ssh/sshd_config
    - Port 22默认端口
    - PermitRootLogin yes 是否允许 root 登陆
    - AuthorizedKeysFile .ssh/authorized_keys
- SSH命令
- SSH公钥认证
  - 常用命令
    - ssh-keygen -t rsa
    - ssh-copy-id
- scp 和 sftp 远程拷贝文件
  - <pre>scp /mnt/c/Users/lindesty/Downloads/wsl-help.txt lindesty@192.168.171.129:~/Downloads</pre>

~~~shell
sudo apt update
sudo apt install openssh-server

# 启动ssh服务
sudo systemctl start ssh.service
sudo systemctl status ssh

# 查看ssh的默认端口
grep ssh /etc/services

# 开放ssh的端口
iptables -I INPUT -p tcp --dport 23 -j ACCEPT
~~~


~~~shell
# 更改ssh端口并连接
sudo vim /etc/ssh/sshd_config

Port 2222


sudo systemctl restart ssh.service


# 连接
ssh -p 2222 lindesty@192.168.171.129


# 查看ssh服务占用了2222端口
sudo lsof -i:2222
~~~

# FTP 服务

- 协议介绍
- vsftpd服务器安装
- vsftpd服务配置文件
- FTP命令
- 使用虚拟用户进行验证

# smba服务与NFS服务

- 常见共享服务的区别
  - 协议不同
  - 对操作系统的支持程度不㺾
  - 交互的便利性不同
- Samba服务的安装
- Samba服务的配置文件
- Samba用户的设置
- Samba服务的和停止
- NFS服务的配置
- NFS服务的和停止

# nginx

- Nginx和Web服务介绍
  - Nginx（engine x）是一个高性能的Web和反向代理服务器
  - Nginx支持、HTTPS和电子邮件代理协议
  - OpenResty是基于Nginx和Lua实现的Web应用网关，集成了大量的第三方模块
- OpenResty软件的下载和安装
  - [安装方法](https://www.kancloud.cn/gxlct008/openresty-best-practices-last/2248859)
- OpenResty的配置文件
  - /usr/local/openresty/nginx/conf/nginx.conf
  - openresty start|stop|restart|reload
- 使用OpenResty配置域名虚拟主机
  - 

~~~
# 添加服务

cd /usr/local/openresty/nginx/conf/
sudo vim nginx.conf

# 文件中添加的内容
server{
  listen 80;
  server_name www.servera.com;
  location / {
    root html/servera;
    index index.html index.htm;
  }
}

server{
  listen 80;
  server_name www.serverb.com;
  location / {
    root html/serverb;
    index index.html index.htm;
  }
}

# 检查语法
cd ../sbin
./nginx -t

# 添加servera serverb 网站


# 重新启动
./nginx -s stop
./nginx

./nginx -s reload


~~~

# LNMP

LAMP (Linux+Apache+PHP+MySQL)
LNMP (<del>Apache</del> -> Nginx)

- 环境搭建


~~~shell
# 安装数据库
sudo apt install mariadb-server

# 修改配置文件
vim /etc/mysql/my.cnf

# 开启sql服务
systemctl start mariadb.service

# 进入sql控制台
mysql

# 检查默认编码,确认是否为utf8
show variables like '%character_set%';

# 退出
quit

# 安装php mysql支持
sudo apt install php-mysql

# 安装php-fpm使得php可做作为一个独立的进程来运行
sudo apt install php-fpm

# 配置nginx配置文件
cd /usr/local/openresty/nginx/conf
vim nginx.conf

# 添加内容
# location ~ /.php$ {
#   root html;
#   fastcgi_pass 127.0.0.1:9000;
#   fastcgi_index index.php;
#   fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
#   include fastcgi_params;
# }

# 确认配置文件无问题并重启nginx 
sudo ./nginx -t
sudo ./nginx -s reload

# 构建所需的html文件
cd ../html
vim index.php


~~~

# DNS服务

- DNS(Domain Name System) 域名系统
- FQDN(Full Qualified Domain Name) 完全限定域名
- 域域分类：根域、顶级域（TLD）
- 查询方式：递归、迭代
- 解析方式：正向解析、反向解析
- DNS服务器的类型：缓存域名服务器、主域名服务器、从域名服务器

- /etc/hosts

## 安装BIND

- /etc/hosts
- sudo apt install bind9
- sudo systemctl start named.service

# NAS

- NAS(NetWork Attached Storage) 网络附属存储
- NAS支持的协议NFS、CIFS、FTP
- 保证数据安全方式 磁盘阵列

~~~shell
# 添加一些硬盘，对sdb sdc sdd进行以下操作
fdisk /dev/sdb
d
n
p
w

# 将三块盘组成raid5 并 映射成/dev/md0
sudo mdadm --create /dev/md0 --level 5 --raid-devices 3 /dev/sd[b-d]

# 将raid配置写入开机执行的配置文件，使得下次开机也能生效
mdadm --detail --scan --verbose >> /etc/mdadm/mdadm.conf

# 将raid映射到上层逻辑卷，方便拓展
sudo pvcreate /dev/md0
sudo vgcreate vg1 /dev/md0
sudo lvcreate -l 100%FREE -n lv1 vg1

# 为逻辑添加xfs文件管理系统
mkfs.xfs /dev/vg1/lv1

# 将卷挂载到/share目录上
mkdir /share
mount /dev/vg1/lv1 /share
vim /etc/fstab
# 文件添加   /dev/vg1/lv1 /share xfs defaults 0 0

# 检查是否挂载
root@lindesty:/home/lindesty# mount -a
root@lindesty:/home/lindesty# mount | grep share
/dev/mapper/vg1-lv1 on /share type xfs (rw,relatime,attr2,inode64,logbufs=8,logbsize=32k,sunit=1024,swidth=2048,noquota)

# 添加用于分享文件的用户
useradd shareuser -d /share/shareuser

# 写FTP服务配置
vim /etc/vsftpd.conf
pam_service_name=vsftpd # 支持本地用户
local_enable=YES #  支持读取
write_enable=YES #  支持写入

# 为用户添加密码
echo shareuser:UserForShare | chpasswd

# 给用户读写权限
sudo chown -R shareuser /share
chmod shareuser u+ /share

# 重启FTP服务
systemctl restart vsftpd.service


~~~




# 关于特殊符号

- 引号
  - ' 完全引用
  - " 不完全引用
  - ` 执行命令
- 括号
  - () (()) $() 圆括号
    - 单独使用圆括号会产生一个子shell(xyz=123)
    - 数组初始化 IPS=(ip1 ip2 ip3)
    - 算数运算 echo $(( 10 + 20 ))
    - cmd1=$(ls)
  - [] [[]] 方括号
    - 单独使用方括号是测试(test)或数组元素功能
      - [ 5 -gt 4 ] ; echo $? 结果 0
    - 两个方括号表示测试表述式
      - [[ 5 > 4 ]] ; echo $? 结果 0
  - <> 尖括号 重定向符号
  - {} 花括号
    - 输出范围 echo{0..9}
    - 文件复制 cp/etc/passwd{,.bak}
- 运算和逻辑符号
  - \+ \- \* / % 算数运算符
  - \>\<\= 比较运算符
  - && || ! 逻辑运算符
- 转义符号
  - \n 字符转义之后有不同的功能
  - \\' 字符转义之后，当做普通字符来使用 
- 其他符号
  - \# 注释符
  - ; 命令分隔符
  - : 空指令
  - . 和 source 命令相同
  - ~ 家目录
  - , 分隔目录
  - \* 通配符
  - ？ 条件测试 或通配符
  - $ 取值符号
  - | 管道符
  - & 后台运行
  - _ 空格



# 帮助命令

## man
man 是 manual 的缩写

man章节的含义

1. 可执行程序或 shell 命令
2. 系统调用(内核提供的函数)
3. 库调用(程序库中的函数)
4. 特殊文件(通常位于 /dev)
5. File formats and conventions, e.g. /etc/asswd
6. 游戏
7. 杂项(包括宏包和规范，如 man(7)，groff(7))
8. 系统管理命令(通常只针对 root 用户)
9. 内核例程 

man 帮助用法演示
~~~
man 1 ls
~~~

对于不知道的关键词进行查询
~~~
man -a [关键词]
~~~


 ## help

shell（命令解释器）处事的命令称为内部命令，其它是外部命令

内部命令使用help帮助
~~~
help cd
~~~

外部命令使用help帮助
~~~
ls --help
~~~

使用type命令查看命令类型
~~~
type cd
~~~

 ## info

info 帮助经help更详细，作为help的补充
~~~
info ls
~~~

# tldr

~~~
sudo apt install tldr

~~~



# vim 编辑器的使用

在shell中输入"which vim&lt;CR&gt;"来检查vim命令的位置
~~~shell
l@l:~/Desktop/cProject$ which vim
/usr/bin/vim
l@l:~/Desktop/cProject$ 
~~~


四种模式

1. 正常模式(Normal-mode)

正常（normal）模式（也称为普通模式），缺省的编辑模式；如果不加特殊说明，一般提到的命令都直接在正常模式下输入；在任何其他模式中，都可以通过键盘上的 Esc 键回到正常模式。

2. 插入模式(Insert-mode)

插入（insert）模式，输入文本时使用；比如在正常模式下键入 i（insert）或 a（append）即可进入插入模式。

3. 命令模式(Command-mode)

可视（visual）模式，用于选定文本块；教程中已经提到可以用键 v（小写）来按字符选定，Vim 里也提供其他不同的选定方法，包括按行和按列块。

4. 可视模式(Visual-mode)

命令行（command-line）模式，用于执行较长、较复杂的命令；在正常模式下键入冒号（:）即可进入该模式；使用斜杠（/）和问号（?）开始搜索也算作命令行模式。命令行模式下的命令要输入回车键（Enter）才算完成。


## 正常模式



## 插入模式



## 命令模式

- 在Vim中显示当前编织文件的类型
~~~
:set ft?
~~~



## 可视模式






# 奇奇怪怪的问题

- 软件包*需要重新安装，但是我无法找到相应的安装文件 解决方法

~~~
sudo dpkg --remove --force-remove-reinstreq 软件包名
~~~



# 包管理工具的使用

包管理器是方便软件安装、卸载，解决软件依赖关系的重要工具

- CentOS、RedHat使用yum包管理器，软件安装包格式为rpm
- Debian、Ubuntu使用apt包管理器，软件安装包格式为deb


查找能更新的包
~~~
sudo apt update
~~~

更新所有包
~~~
sudo apt upgrade -y
~~~


软件包管理器

apt包和apt命令

仓库


源代码编译安装

内核升级

grub配置文件


~~~
~~~



~~~
~~~


~~~
~~~



~~~
~~~