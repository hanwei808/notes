# 创建TCP通信

## 通讯过程

- 创建服务端：接受和会写客户端数据
- 创建客户端：发送和接受服务端数据
- 数据传输：内置服务事件和方法读写数据

## 通信事件&方法

- listening事件：调用server.listen方法之后触发
- connection事件：新的连接建立时触发
- close事件：当server关闭时触发
- error事件：当错误出现时触发
- data事件：当接收到数据的时候触发
- write方法：在socket上发送数据，默认是UT8编码
- end操作：当socket的一端发送FIN包时触发，结束可读端

## 通信案例

### 服务端

```JavaScript
// server.js
const net = require('net')

// 创建服务端实例
const server = net.createServer()
const PORT = 1234
const HOST = 'localhost'
server.listen(PORT, HOST)
server.on('listening', () => {
    console.log(`服务端已经启动，正在监听${HOST}:${PORT}`)
})
//接收消息 回写消息
server.on('connection', () => {
    socket.on('data', (chunk) => {
        const msg = chunk.toString()
        console.log(msg)

        // 回数据
        soket.write(Buffer.from('您好' + msg))
    })
})
server.on('close', () => {
    console.log('服务端关闭了')
})
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log('地址正被使用，重试中...')
        setTimeout(() => {
            server.close()
            server.listen(PORT, HOST)
        }, 1000)
    } else {
        console.log(err)
    }
})
```

### 客户端

```JavaScript
// client.js
const net = require('net')

// 创建客户端实例
const client = net.createConnection({
    port: 1234,
    host: '127.0.0.1'
})
client.on('connect', () => {
    client.write('拉钩教育')
})
client.on('data', (chunk) => {
    console.log(chunk.toString())
})
client.on('error', (err) => {
    console.log(err)
})
client.on('close', () => {
    console.log('客户端断开连接')
})
```

> 上述代码响应结果：您好拉钩教育

## TCP粘包及解决

## 封包拆包实现
