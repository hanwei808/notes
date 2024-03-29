# RESTful接口规范

## 1. 什么是RESTful接口

- RESTful是一种软件架构风格，而不是标准，只是提供了一组设计原则和约束条件。
- RESTful是Representational State Transfer的缩写，中文意思是表现层状态转化。
- RESTful是一种设计风格，不是标准，只是提供了一组设计原则和约束条件。

## 2. RESTful接口的设计原则

- 1.每一个URI代表一种资源；
- 2.客户端和服务器之间，传递这种资源的某种表现层；
- 3.客户端通过五个HTTP动词，对服务器端资源进行操作，实现"表现层状态转化"。
- 4.通过URI指定资源，通过HTTP动词（GET, POST, PUT, PATCH，DELETE）描述操作。
- 5.使用JSON数据格式。
- 6.无状态通信。
- 7.遵循HATEOAS原则。
- 8.使用HTTPS协议。
- 9.使用自定义头部信息。

## 3. RESTful接口的设计规范

- 1.使用名词，不要使用动词。
- 2.使用复数形式。
- 3.使用子资源来表示一对多的关系。
- 4.使用HTTP状态码来表示不同的结果。
- 5.使用HTTP动词来表示操作。
- 6.使用HTTP头信息来表示版本。
- 7.使用分页和过滤来控制返回结果的数量。
- 8.使用HATEOAS来控制资源之间的关系。
- 9.使用自定义头部信息来表示特殊含义。
- 10.使用HTTPS协议来保证安全性。
- 11.使用JSON数据格式。

## HTTP动词

> 对于资源的具体操作类型，由HTTP动词表示

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。
- 以下是不常用：
  - HEAD：获取资源的元数据。
  - OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。
  - CONNECT：用于代理进行传输，如使用SSL（HTTPS）加密传输。
  - TRACE：回显服务器收到的请求，主要用于测试或诊断。

## 域名

> 应该尽量将API部署在专用域名之下
> > `https://api.example.com`
> 如果确定API很简单，不会有进一步扩展，可以考虑放在主域名下
> > `https://example.org/api/`

## 版本

> 应该将API的版本号放入URL。
> > `https://api.example.com/v1/`
> 另一种做法是，将版本号放在HTTP头信息中，但不如放入URL方便和直观

## 路径

> 路径又称“终点”（endpoint），表示API的具体网址。
> 在RESTful架构中，每个网址代表一种资源（resource），所以网址中不能有动词，只能有名词，而且所用的名词往往与数据库的表格名对应。一般来说，数据库中的表都是同种记录的集合，所以API中的名词也应该使用复数。

## 例子

- GET /zoos：列出所有动物园
- POST /zoos：新建一个动物园
- GET /zoos/ID：获取某个指定动物园的信息
- PUT /zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）
- PATCH /zoos/ID：更新某个指定动物园的信息（提供该动物园的部分信息）
- DELETE /zoos/ID：删除某个动物园
- GET /zoos/ID/animals：列出某个指定动物园的所有动物
- DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物

## 过滤信息

> 如果记录数量很多，服务器不可能都将它们返回给用户。API应该提供参数，过滤返回结果。
> > `?limit=10`：指定返回记录的数量
> > `?offset=10`：指定返回记录的开始位置。
> > `?page=2&per_page=100`：指定第几页，以及每页的记录数。
> > `?sortby=name&order=asc`：指定返回结果按照哪个属性排序，以及排序顺序。
> > `?animal_type_id=1`：指定筛选条件

## 状态码

> 客户端的每一次请求，服务器都必须给出回应。回应包括HTTP状态码和数据两部分。
> HTTP状态码就是一个三位数，分成五个类别。

- 1xx：临时回应，表示客户端请继续。
- 2xx：请求成功。
- 3xx：重定向，要完成请求必须进行更进一步的操作。
- 4xx：客户端请求错误。
- 5xx：服务器端错误。

> 这五大类总共包含100多种状态码，覆盖了绝大部分可能遇到的情况。每一种码都有标准的解释，客户端只需查看状态码，就可以判断出发生了什么情况，所以服务器应该返回尽可能精确的状态码。
> 常见的有一下一些

- 200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
- 201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
- 202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
- 204 NO CONTENT - [DELETE]：用户删除数据成功。
- 400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
- 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
- 403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
- 404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
- 406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
- 410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
- 422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
- 500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。

## 返回结果

> API返回的数据格式，应该尽量使用JSON，避免使用XML。因为这样才能返回标准的结构化数据。所以，服务器回应的HTTP头的Content-Type属性要设为application/json。
> 针对不同操作，服务器向用户返回的结果应该符合以下规范。

- GET /collection：返回资源对象的列表（数组）
- GET /collection/resource：返回单个资源对象
- POST /collection：返回新生成的资源对象
- PUT /collection/resource：返回完整的资源对象
- PATCH /collection/resource：返回完整的资源对象
- DELETE /collection/resource：返回一个空文档

## 错误处理

> 如果状态码是4xx，就应该向用户返回出错信息。一般来说，返回的信息中将error作为键名，出错信息作为键值即可。

```json
{
  "error": "Invalid API key"
}
```

> 如果状态码是5xx，就不需要返回任何错误信息。
> > 500错误有可能是服务器内部出现了bug，也有可能是服务器暂时停止服务，可以等一等再试试。

## 身份认证

> 基于JWT的接口权限认证：
> > 字段名：Authorization
> > 字段值：Bearer + token

## 跨域处理

> 可以在服务端设置CORS允许客户端跨域资源请求。
