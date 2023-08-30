# Buffer

## 什么是Buffer

- Nodejs中Buffer 是一片内存空间
- Buffer是Nodejs的内置类
- 无需require的一个全局变量
- 实现Nodejs平台下的二进制数据操作
- 不占据V8堆内存大小的内存空间
- 内存的使用由Node来控制，由V8的GC回收
- 一般配合Stream流使用，充当数据缓冲区

## 创建Buffer

- alloc()：创建指定字节大小的buffer
- allocUnsafe(): 创建指定字节大小的buffer，但是可能包含敏感数据
- from()：将数据转换为buffer

## Buffer实例方法

- fill()：使用数据填充buffer
- write()：向buffer中写入数据
- toString()：将buffer转换为字符串
- slice()：截取buffer中的数据
- indexOf()：检索buffer中是否包含指定数据
- copy()：复制buffer中的数据

## Buffer静态方法

- isBuffer()：判断是否为Buffer对象
- concat()：将多个buffer拼接成一个新的buffer
