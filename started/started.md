---
next: deployment.html
nextname: 服务器端部署
---
## 快速开始

管理平台分为两大项目，kunkka和mirana。kunkka主要负责视窗、交互和逻辑部分，mirana则负责后端的消息推送。当两个项目正确的安装时用户可以使用完整的UOS平台服务。以下介绍kunkka和mirana的本地运行方法。服务器端部署请参考[服务器端部署](/started/deployment.html)。

## 环境检测

安装HALO之前，对本地或服务器进行以下的环境检测。若每项检测准确无误，可以进行接下来Kunkka和Mirana的安装。

+ 检测是否安装`NodeJS`，并且是v5或v6版本。若没有，先安装`nvm`，通过`nvm`安装v5或v6的版本的`NodeJS`，若有`NodeJS`但版本不对，请用`nvm use 5`切换到v5环境中
+ 检测是否安装`pm2`，若没有，请用`npm install -g pm2`全局安装`pm2`
+ 检测后端配置文件中`memcached`及`mysql`服务是否正常
+ 检测后端配置文件中OpenStack的`Keystone`及admin_user、admin_password、admin_projectId是否可用

## Kunkka

#### 1. 下载

从远程代码库里下载项目 `git clone git@gitlab.ustack.com:ued/kunkka.git`

#### 2. 安装

+ 远程代码复制到本地后，在kunkka的目录中跑`./init.sh`。该命令运行以下的操作，可能需要较长的时间
+ 下载halo子模块
+ 下载uskin子模块
+ 下载前端和后端的所有子项目（dashboard, admin, slardar等），并且添加eslint pre-commit hook
+ 安装子模块中的dependencies
+ 运行`npm run build`

#### 3. 修改配置

+ 进入`kunkka/halo/config.json`根据自己的环境修改配置项

``` json
{
  "sessionEngine": {
    "type": "Memcached",         // 缓存服务器，默认是memcahced，保持不变
    "remotes": [                 // Memcached缓存服务器地址，数组，可以存放多个地址（我们的架构是三个memcached 服务节点）
      "PREFIX.47:11211",         // 请把PREFIX替换为网段地址
      "PREFIX.48:11211",         // 请把PREFIX替换为网段地址
      "PREFIX.49:11211"          // 请把PREFIX替换为网段地址
    ],
    "secret": "keyboard cat",    // 值可以随机, 不影响
    "cookie_name": "ustack"      // 值可以随机, 不影响
  },
  "cookie": {
    "maxAge": 604800000          // cookie 过期时间, 默认是一周，保持不变
  },
  "log": {
    "accessLogPath": "/var/log/kunkka/access.log",  // 访问日志文件路径，请配成 /var/log/kunkka/access.log
    "errorLogPath": "/var/log/kunkka/error.log",    // 错误日志文件路径, 请配成 /var/log/kunkka/error.log
    "debug": false,                                   // 生产环境为false，保持默认
    "format": "combined",                            //  默认为combined，保持默认
    "printAccessLog": true                          // true 为打印日志， 保持默认
  },
  "websocket": {
    "url": ":5679"                                // websocket 服务地址，保持默认
  },
  "region": [                                    // region 信息， 需根据环境的region信息配置
    {
      "name": {
        "en": "regionOne",           // region 的英文名
        "zh-CN": "一区"              // region 的中文名
      },
      "id": "regionOne"             // region 的ID
    }
  ],
  "domain": "default",                  // 默认default， keystone domian信息
  "port": 5678,                         // kunkka的服务端口，默认5678 保持不变
  "mysql": {                           // mysql 配置
    "host": "lb.XXX.XXX.ustck.in",  // mysql 服务地址, 格式为： lb.XXX.XXX.ustck.in
    "port": 3306,                         //mysql 端口号
    "user": "root",                    // mysql 用户名
    "password": "1234",                // mysql 密码
    "database": "kunkka",         // 保持默认 kunkka
    "table": "tusk"                  //  保持默认 tusk
  },
  "reg_token_expire": 86400,      //注册邮件token过期日期
  "reg_sms_expire": 600,          //注册短信验证码过期日期
  "phone_area_code": "86",        //手机号默认区号
  "ticket_flow": [                //工单处理流程角色按顺序由低到高
    "member",
    "owner",
    "admin"
  ],
  "ticket_attachment_path": "/opt/attachment/nfs", //工单附件保存路径
  "ticket_attachment_size_limit": 10485760,        //工单附件大小限制
  "approval_flow": [   //审批流程 角色按顺序由低到高
    "Member",
    "owner",
    "admin"
  ],
  "currency": { //支付系统，币种
    "ISO4217": "CNY",
    "name": "人民币",
    "unit": "元"
  },
  "paypal": {  //PayPal账户配置
    "mode": "live",
    "client_id": "",
    "client_secret": ""
  },
  "alipay": { //支付宝配置
    /**
     * service
     * 国内账户:create_direct_pay_by_user
     * 国外账户:create_forex_trade
     */
    "service": "create_direct_pay_by_user",
    "partner": "",//合作身份者id，以2088开头的16位纯数字
    "partnerKey": "",//安全检验码，以数字和字母组成的32位字符
    /**
     * seller_id,seller_email,seller_account_name三个参数至少必须传递一个(国内账户,国外无要求)。
     * 当签约账号就是收款账号时，请务必使用参数seller_id，即seller_id的值与partner的值相同。
     * 三个参数的优先级别是：seller_id>seller_account_name>seller_email
    */
    "seller_id": "",
    "seller_account_name": "",
    "seller_email": "",
    "subject": "账户充值/Recharge:",
    "body": "金额/Amount:",
    "_input_charset": "utf-8",
    "payment_type": "1",
    "gateway": "https://mapi.alipay.com/gateway.do?"
  },
  "keystone": "lb.XXX.XXX.ustck.in:5000"    // openstack keystone 服务地址, 需要手动填写，格式为：lb.XXX.XXX.ustck.in:端口号。
}
```

#### 4. 运行

安装和修改配置完成后，通过以下操作查看项目是否正常运行

+ 进入 `cd halo`
+ 开启后端 `npm start`
+ 访问 `localhost:5678` 查看是否正常运行

## Mirana

#### 1. 下载

```
$ git clone git@gitlab.ustack.com:ued/mirana.git
```

#### 2. 安装

安装依赖模块。

```
$ npm install
```

#### 3. 修改配置

复制配置文件，根据需求修改config.json文件

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

#### 4. 运行

运行之后，通过界面操作查看是否有后端消息推送。

```
$ npm start
```
