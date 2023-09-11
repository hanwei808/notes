# 创建http协议

## 服务端

```JavaScript
// server.js
const http = require('http')
const url = require('url')
//创建服务端
let server = http.createServer((req, res) => {
    // 针对于请求和响应完成各自的操作
    console.log('请求进来了')
    // 请求信息
    let { pathname, query } = url.parse(req.url, true)
    console.log(pathname, '---', query, req.method, req.httpVersion, req.headers)
    // 请求体
    let arr = []
    req.on('data', (chunk) => {
        arr.push(chunk)
    })
    req.on('end', () => {
        console.log(Buffer.concat(arr).toString())
    })
    //响应信息
    res.statusCode = 302
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.end('拉钩教育')
})
server.listen(1234, () => {
    console.log('server is running......')
})
```

## 客户端

> 通过浏览器访问：127.0.01:1234/index.html?a=1

## 代理客户端

```JavaScript
// agent_client.js
const http = require('http')
let options = {
    host: 'localhost',
    port: 1234
    path: '/?a=1'
    method: 'post',
    headers: {
        'Content-type': 'application/json'
    }
}
let req = http.request(options, (res) => {
    let arr = []
    res.on('data', data => {
        arr.push(data)
    })
    res.on('end', () => {
        console.log(Buffer.concat(arr).toString())
    })
})
res.end('拉钩教育')
```

## 代理客户端解决跨域

```JavaScript
// agent_client.js
const http = require('http')

let options = {
    host: 'localhost',
    port: 1234,
    path: '/',
    method: 'post',
}
let server = http.createServer((request, response) => {
    let req = http.request(options, res => {
        let arr = []
        res.on('data', data => {
            arr.push(data)
        })
        res.on('end', () => {
            let ret = Buffer.concat(arr).toString()
            response.setHeader('content-type', 'text/html;charset=utf-8')
        })
    })

    req.end('拉钩教育')
})
server.listen(1235, () => {
    console.log('server is running......')
})
```

## Http静态服务
