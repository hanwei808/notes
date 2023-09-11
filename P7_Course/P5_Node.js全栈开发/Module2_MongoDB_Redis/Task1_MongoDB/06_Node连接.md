# Node连接MongoDB

## 1. 安装MongoDB包

- npm install mongodb --save

## 连接

```JavaScript
const { MongoClient, ObjectID } = require('mongodb')
const client = new MongoClient('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })

async function run () {
    try {
        // 开始连接
        await client.connect()
        const testDb = client.db('test')
        const inventoryCollection = testDb.collection('inventory')

        // 创建文档
        const ret = await inventoryCollection.insertOne({
            a: 1,
            b: '2',
            c: true,
            d: [1, 2, 3]
        })
        // 查询文档
        const res = await inventoryCollection.find()
        console.log(await res.toArray())
        // 删除文档
        inventoryCollection.deleteOne({ a: 1 })
    } catch (err) {
        console.log('连接失败', err)
    }
}
run()
```
