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

若仍然无法使用GitHub Copilot，则需为Vscode配置代理
![配置代理](./images/setting.png)


取消代理

``` JavaScript
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### VSCode 插件

使用 VSCode 插件，实现 Markdown、MindMap 的实时预览

* Markdown Mind Map Preview
* Markdown All in One
