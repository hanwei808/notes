# Express案例总结

## npm 资源包

- cors：跨域中间件
- express：服务器框架
- express-validator：校验中间件
- jsonwebtoken：生成token
- mongoose：操作mongodb数据库
- morgan：日志中间件

## 项目结构

```bash
├── config # 配置文件，数据库、jwt uuid等
├── controller # 处理请求
├── middleware # 中间件 公共auth、公共validate
├── model # 数据库模型
│   └── index.js # 数据库连接，导出模型
├── router # 路由
│   └── index.js # 路由入口
├── util # 工具，jwt加解密、md5加解密
├── validator # 封装业务校验
├── app.js # 入口文件，挂载路由、中间件、配置等
├── package.json
└── README.md
```

## 启动与流程

### 启动服务

```bash
    nodemon ./app.js
```

### 流程

1. **app.js** -> 挂载路由router
2. **路由 router**
   1. **挂载中间件middleware**
      1. **权限校验Token Auth**：从请求头获取token数据（用户登录时使用jwt加密userId生成的token），使用**工具util**封装的jwt方法解析token得到userId，与数据库中的userId比较，判断是否有权限
      2. **数据校验validator**
         1. 使用第三方包（express-validator）校验字段格式
         2. 根据业务查询数据库校验数据是否存在或是否有权限
   2. **挂载控制器controller**
      1. **导入模型model**：连接数据库 -> 定义模型文档字段 -> 绑定模型 -> 导出模型
      2. 接收请求：req请求对象、res响应对象
      3. 处理请求：调用模型方法，增new Model()、删remove()、改save()、查find()，模型操作数据库
      4. 返回响应：res.send()、res.json()、res.status().send()、res.status().json()
