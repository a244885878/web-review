#### 一、 初始化与配置

- `git init`: 初始化一个新的 Git 仓库。
- `git config --global user.name "Your Name"`: 设置全局用户名。
- `git config --global user.email "your.email@example.com"`: 设置全局邮箱。

#### 二、 克隆与更新

- `git clone <repository_url>`: 克隆远程仓库到本地。
- `git fetch`: 从远程仓库下载最新的提交，但不自动合并到当前分支。
- `git pull`: 从远程仓库下载最新的提交并合并到当前分支。

#### 三、 提交与修改

- `git add <file>`: 将指定文件添加到暂存区。
- `git add .`: 将所有修改过的文件添加到暂存区。
- `git commit -m "commit message"`: 提交暂存区的修改，并添加提交信息。
- `git commit -a -m "commit message"`: 跳过暂存区，直接提交所有修改，并添加提交信息。
- `git status`: 查看工作区和暂存区的状态。
- `git diff`: 查看工作区和暂存区的差异。
- `git rm <file>`: 从版本库中删除指定文件。
- `git mv <old_file> <new_file>`: 重命名或移动文件。

#### 四、 分支操作

- `git branch`: 查看本地分支列表。
- `git branch <branch_name>`: 创建一个新的分支。
- `git checkout <branch_name>`: 切换到指定分支。
- `git checkout -b <branch_name>`: 创建并切换到新的分支。
- `git merge <branch_name>`: 将指定分支合并到当前分支。
- `git branch -d <branch_name>`: 删除指定分支（已合并）。
- `git branch -D <branch_name>`: 强制删除指定分支（未合并）。

#### 五、 版本回溯

- `git log`: 查看提交历史。
- `git log --oneline`: 以简洁的单行格式查看提交历史。
- `git show <commit_id>`: 查看指定提交的详细信息。
- `git revert <commit_id>`: 撤销指定提交的更改，并创建一个新的提交。
- `git reset <commit_id>`: 将当前分支的指针移动到指定提交，可以选择保留或丢弃之前的提交。

#### 六、 远程仓库操作

- `git remote add origin <repository_url>`: 添加远程仓库。
- `git remote -v`: 查看远程仓库信息。
- `git push origin <branch_name>`: 将本地分支推送到远程仓库。
- `git push -u origin <branch_name>`: 将本地分支推送到远程仓库，并建立关联。

#### 七、 其他

- `git help <command>`: 查看指定命令的帮助信息。
