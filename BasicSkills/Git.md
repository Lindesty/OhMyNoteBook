# gitignore



# Git基础使用


## 本地管理 

取消最近N个commit，其中N为要取消的commit数量

```bash
git reset HEAD~N
```



## 远程管理

### 从远端克隆项目 

```bash
git clone [url]
```

### 修改远程仓库的地址

先查看当前拥有的远程仓库地址

```bash
git remote -v
```

修改远程仓库地址 

```bash
git remote set-url <远程仓库别名> <新的仓库地址>
```

删除所有仓库地址
```bash
git remote remove <远程仓库别名>
```


# Git子模块与子树