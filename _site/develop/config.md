## 环境配置

对于OpenStack后端对接的配置文件在`kunkka/halo/configs/server.json`。通过修改Keystone、MySQL、Memchaed等地址进行后端对接。

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