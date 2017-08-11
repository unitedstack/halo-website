---
prev: config.html
next: menu.html
prevname: 环境配置
nextname: 菜单配置
distinction: 开发
---
## Mirana配置

Mirana 是 dashboard 的消息转发系统。

它后端连接 OpenStack 的消息服务，当浏览器访问时与之建立 websocket 连接。每当后台有消息产生时，推送到浏览器。

#### Mirana配置文件

``` json
{
  "mq": {
    "remotes": ["42.62.101.195"], //rabbitMQ的host地址，数组，
    "heartbeat": 60, //连接周期，单位：秒。
    "username": "openstack", //rabbitMQ的账户名
    "password": "4260ea44d3c55ac74c3241db",//rabbitMQ的账户密码
    "port": 5672, //rabbitMQ的端口
    "sourceExchanges": ["nova", "neutron", "cinder", "glance"], //配置有哪些channel
    "reconnectTimeout": 1000, //在连接失败的时候，隔多长时间重新连接，单位：毫秒
    "maxTimeoutLimit": 120000, //最大尝试时间，单位：毫秒
    "exchangeDurable": false //exchange持久化
  },
  "websocket": {
    "port": 5679,  //监听端口号
    "host": "0.0.0.0" //绑定IP,0.0.0.0为不限IP。
  },
  "log": {
    "errorLog": "/var/log/mirana/error.log" //错误日志存放路径
  }
}
```

#### Mirana安装文档

``` javascript
# 依赖 node v5+
$ git clone git@gitlab.ustack.com:ued/mirana.git
$ cd mirana
$ cp config.json.sample config.json
$ # 修改配置文件 config.json
$ npm install  # 安装依赖
$ npm start #启动服务
```