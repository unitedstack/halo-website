---
prev: deployment.html
prevname: 服务器端部署
distinction: 快速开始
---
## 更多命令

以下操作均在 `halo` 目录中运行，注意不是 `kunkka` 目录

#### 安装

###### 1. 手动安装子模块

```
$ git clone git@git.ustack.com:ustack/halo.git --recursive
```

###### 2. 安装依赖包

```
$ npm install
```

###### 3. 安装pm2

```
$ sudo npm install pm2 -g
```

#### 初始化

###### 1. 手动添加eslint

```
$ ./scripts/csc.sh
```

#### 开发

###### 1. 启动后端服务器（每次dev或build时需要运行）

```
$ npm start
```

###### 2. 重启后端服务器（每次dev或build时需要运行）

```
$ npm restart
```

###### 3. dev模式（默认语言，默认watch所有项目）

``` json
$ npm run dev
$ npm start
```

###### 4. dev模式，指定语言

```
$ npm run dev --lang=zh-CN
$ npm start
```

```
$ npm run dev --lang=en
$ npm start
```

###### 5. dev模式，指定项目

```
$ npm run dev --app=dashboard,admin,login
$ npm start
```

###### 6. build模式

```
$ npm run build
$ npm start
```

###### 7. i18n编译

```
$ npm run transpile
```

## 服务器端pm2

###### 1. 查看后端进程列表

```
$ pm2 list
```

###### 2. 删除指定后端进程

```
$ pm2 delete id(或者name)
```

###### 3. 查看后端操作log

```
$ pm2 logs
```