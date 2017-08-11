---
prev: font-develop.html
next: learning-materials.html
prevname: 前端开发
nextname: 研发学习资料
distinction: 开发
---
## 后端开发

后端的文件目录所示：

``` javascript
server
  |-api
  |-boot
  |-config
  |-drivers
  |-helpers
  |-middlewares
  |-views
```
#### pm2

pm2 作为 process manager，可以配置环境变量，将`server`目录加到环境变量中，所以在代码中使用`require('drivers')`便是引用 server 中的 drivers，可以简化书写，修改文件结构时也不用改跟多相对目录。

``` json
 "env": {
    "NODE_PATH": "server:."
  }
```
#### boot

node 服务的入口，读取配置文件，加载中间件和子项目。

程序目前使用的 node 框架是 express。`const app = express();`得到app；

#### middlewares

这里是中间件，包含

+ i18n
+ session处理
+ 错误处理
+ ...

这里面的功能大多在服务启动时加载，处理每一个请求。

使用方式一般是在`boot`中，通过`app.use()`的方式将中间件加载进来。

#### helpers

包含工具性的一些功能，比如 querystring，paginate 等，这里的功能供其他项目调用。

#### drivers

此目录中包含子项目，比如数据库连接，OpenStack API 封装，它们被 api 调用时加载。

#### drivers/index.js

当 drivers 第一次被引用时，执行此文件，他的作用是遍历目录里所有的文件。然后将所有的 driver 组合起来，引用的方式 `const mysql = require('dirvers').mysql`;

``` javascript
let driver = {};

fs.readdirSync(__dirname)
  .filter(c => {
    return fs.statSync(path.join(__dirname, c)).isDirectory();
  })
  .forEach(c => {
    let cloud = require(__dirname + '/' + c);
    Object.assign(driver, cloud);
  });

module.exports = driver;
```

每个 driver 是一个文件夹，文件夹中有入口`index.js`文件。

## api

api目录里面都是子项目。目录结构：

``` javascript
api
  |-index.js
  |-api1
    |-index.js
    |-api
    |-models
    |-views
  |-api2
    |-index.js
    |-api
    |-models
    |-views
```

``` javascript
//api/index.js

const fs = require('fs');

module.exports = function (app) {
  fs.readdirSync(__dirname)
    .filter(c => {
      return c.indexOf('.') === -1;
    })
    .forEach(c => {
      require(__dirname + '/' + c)(app);
    });
  return app;
};
```
#### api目录

在启动时加载，执行`api/index.js`接收 app，然后去遍历所有的目录。 api 下面的每个目录都是一个子项目，相互独立解耦，可以自由的增减。

#### api子项目

每个项目都有入口`index.js`文件，他们都暴露一个函数，接收 app，然后对 app 进行处理。 每个项目一般包含：api 定义接口，controller 处理业务逻辑，models 定义数据库表结构。 这里结构也不固定，可能没有数据库或逻辑层很简单。