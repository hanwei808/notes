# 笔记模式

## 介绍

* 编辑工具：VSCode
* 版本管理：GitHub
* 输入辅助：GitHub Copilot、ChatGPT
* 笔记格式：Markdown
* 思维导图：MindMap

## ChatGPT

## MarkDown

## MindMap

---

## 其他

### 解决 GitHub Copilot 无法使用的问题

1. 浏览器插件 Ghelper 中购买VIP，下载 Clash for Windows 客户端
2. 运行 Clash 后配置git代理：

``` JavaScript
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```

取消代理

``` JavaScript
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### VSCode 插件

使用 VSCode 插件，实现 Markdown、MindMap 的实时预览

* Markdown Mind Map Preview
* Markdown All in One


我需要将给定文件夹中的所有Excel表数据，汇总到一个给定的Excel表中，请按照以下要求，编写Python：
一、每个分表中有两个sheet，第一个是班级基本信息，第二个是班级学生成绩排名；
二、班级基本信息sheet中，班级编号、教师姓名、班级人数、班长、教师姓名；
三、班级成绩排名sheet中，第一列是序号、第二列是学号、第三列是学生姓名、第四列是成绩；
四、总表只需要一个sheet，并且需将列设置为序号、班级编号、教师姓名、班级人数、班长、教师姓名、学号、学生姓名、成绩；
五、班级编号、教师姓名、班级人数，必须要和每个学生的成绩信息一一对应；
六、做一个程序运行进度条，表示已复制到的学生条目数。