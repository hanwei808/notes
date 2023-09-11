# md转html实现

## 1. 引用资源

``` JavaScript
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const browserSync = require('browser-sync');
```

## 2. 实现思路

- 1. 读取md和css文件内容
- 2. 将上述文件读取出来的内容替换占位符，生成要展示的Html字符串
- 3. 将上述Html字符串写入到指定的Html文件中
- 4. 监听md文档内容的变化，然后更新到Html文件中
- 5. 使用browser-sync实现浏览器自动刷新
