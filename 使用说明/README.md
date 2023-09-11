# 笔记模式

## 介绍

- 编辑工具：VSCode
- 版本管理：GitHub
- 输入辅助：GitHub Copilot、ChatGPT
- 笔记格式：MarkDown
- 思维导图：MindMap

## ChatGPT

- 解答问题
- 优化代码
- 修复报错
- 生成MarkDown

## Copilot

> 根据上下文，自动联网生成补充内容

- Alt+\：行内建议代码
- Alt+]：切换建议代码
- ctrl+enter：打开提示面板选用10个意见代码中的一个

## MarkDown

- 记录笔记内容
- 生成MindMap
- 生成HTML页面
- 生成目录（可跳转）

## MindMap

> 根据思路，汇总笔记，全局预览，查漏补缺

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
