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


### 使用分支

查看本地与远程的分支

```bash 
git branch -a
```

创建并切换分支

```bash
git switch -c feature/login-page
```

将主分支的内容同步到子分支中

```bash
# 确保在主分支是最新的
git checkout main
git pull origin main
# 切回你的功能分支
git checkout feature/login-page
# 将 main 的更新合并进来
git merge main
# 或使用 rebase（保持线性历史，适合个人分支）：
# git rebase main
```










# Git子模块与子树