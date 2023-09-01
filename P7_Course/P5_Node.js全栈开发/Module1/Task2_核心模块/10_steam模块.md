# 核心模块之Stream

> Node.js诞生之初就是为了提高IO性能
> 文件操作系统和网络模块实现了流接口
> Node.js中的流是一个抽象接口，所有的流都继承自stream模块

## 流处理数据的优势

- 时间效率：流的分段处理可以同时操作多个数据chunk
- 空间效率：同一时间流无须占据大内存空间
- 使用方便：流配合管理，扩展程序变得简单

## Node.js流特点

- Steam模块实现了四个具体的抽象
- 所有流都继承自EventEmitter

## Node.js中流的分类

- Readable：可读流，能够实现数据的读取
- Writable：可写流，能够实现数据的写入
- Duplex：双工流，同时实现数据读取与写入
- Transform：转换流，实现数据转换操作

### Readable可读流

#### 自定义可读流

- 继承steam里的Readable
- 重写_read方法调用push产出数据
- 明确数据生产与消费流程
- 利用API实现自定义的可读流
- 明确数据消费的事件使用
- 消费数据
  - readable事件：当流中存在可读取数据时触发
  - data事件：当流中数据块传给消费者后触发

### Writable可写流

```JavaScript
const fs = require('fs')
// 创建一个可写流，生产数据
const rs = fs.createWriteStream('./test.txt')
// 修改字符编码，便于后续使用
rs.setEncoding('utf8')
// 创建一个可写流，消费数据
let ws = fs.createWriteStream('./test.txt')
// 监听事件调用方法完成具体的消费
rs.on('data', (chunk) => {
    // 写入数据
  ws.write(chunk)
})
```

- 继承steam里的Writable
- 重写 _write方法，调用write执行写入
- 可写流事件
  - pipe事件：可读流调用pipe方法时触发
  - unpipe事件：可读流调用unpipe方法时触发

### Duplex双工流

#### 自定义双工流

- 继承steam里的Duplex
- 重写_read方法调用push产出数据
- 重写 _write方法，调用write执行写入

### Transform转换流

#### 自定义转换流

- 继承steam里的Transform
- 重写 _transform方法，调用push产出数据
- 重写 _flush方法，调用push产出数据
- 转换流事件
  - finish事件：当调用end方法时触发
  - end事件：当调用end方法时触发

## 文件可读流创建和消费

```JavaScript
const fs = require('fs')
let rs = fs.createReadStream('./test.txt', {
    flags: 'r',
    encoding: null,
    fd: null,
    mode: 438,
    autoClose: true,
    start: 0,
    // end: 3,
    highWaterMark: 4 // 水位线，每次读流字节数，默认64
})
// 监听data事件：当流中数据块传给消费者后触发
rs.on('data', (chunk) => {
    console.log(chunk.toString())
    rs.pause()
    setTimeout(() => {
        rs.resume()
    }, 1000)
})
// 监听readable事件：当流中存在可读取数据时触发
rs.on('readable', () => {
    let data
    while((data = rs.read(1)) !== null) {
        console.log(data.toString())
        console.log('------', rs._readableState.length)
    }
})
```

## 文件可读流事件与应用

```JavaScript
const fs = require('fs')
let rs = fs.createReadStream('./test.txt', {
    flags: 'r',
    encoding: null,
    fd: null,
    mode: 438,
    autoClose: true,
    start: 0,
    // end: 3,
    highWaterMark: 4 // 水位线，每次读流字节数，默认64
})
rs.on('open', (fd) => {
    console.log('文件打开了')
})
let bufferArr = []
rs.on('data', (chunk) => {
    bufferArr.push(chunk)
    console.log('数据被消费了')
})
rs.on('end', () => {
    console.log(Buffer.concat(bufferArr).toString(), '数据被清空')
})
rs.on('close', () => {
    console.log('文件关闭了')
})
rs.on('error', (err) => {
    console.log('出错了')
})
```

## 文件可写流

```JavaScript
const fs = require('fs')
let ws = fs.createReadStream('test.txt', {
    flags: 'w',
    encoding: null,
    fd: null,
    mode: 438,
    autoClose: true,
    start: 0,
    // end: 3,
    highWaterMark: 3 // 水位线，每次读流字节数，默认64
})

let buf = Buffer.from('拉钩教育')
ws.write(buf, () => {
    console.log('写入成功')
})

ws.on('open', (fd) => {
    console.log('文件打开了', fd)
})
ws.write(1)
// close 是在数据写入操作全部完成之后再执行
ws.on('close', () => {
    console.log('文件关闭了')
})
// end 执行之后意味着数据写入完成
ws.end();
ws.on('error', (err) => {
    console.log('出错了')
})
```

## 控制写入速度

## 背压机制
