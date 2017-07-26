## 菜单配置

菜单配置文件为左侧二级导航的配置文件。

<img src="/img/develop/menu.png" style="width: 100%">

其目录在`kunkka/halo/client/{项目名}/config.json`，但该文件被`.gitignore`忽略掉，实际上传到代码库里的是同文件夹下的`config.json.sample`。

如需提交到代码库需要修改`config.json.sample`，在实际开发调试修改`config.json`查看效果。

以下为`kunkka/halo/client/dashboard/config.json`文件举例。

``` json
{
  "modules": [{                   //modules为menu的信息组合
    "items": [                    //每个对象为一个block的信息，该block没有title有items
      "overview"
    ]
  }, {
    "title": "compute",           //该block有title和items
    "items": [
      "instance",
      "image",
      "image-snapshot",
      "keypair",
      "ike-policy",
      "ipsec-policy"
    ]
  }, {
    "title": "network",
    "items": [
      "topology",
      "network",
      "subnet",
      "floating-ip",
      "router",
      "port",
      "security-group",
      "loadbalancer",
      "resource-pool",
      "ike-policy",
      "ipsec-policy"
    ]
  }, {
    "title": "storage",
    "items": [
      "volume",
      "snapshot"
    ]
  }, {
    "title": "monitor",
    "items": [
      "alarm",
      "notification"
    ]
  }],
  "default_module": "overview",     //default_module为用户登录进入之后的第一个默认显示的模块
  "languages": [                    //面板的语言类型，支持英文和中文
    "en",
    "zh-CN"
  ],
  "routers": [{                     //显示在应用中的tab而不在左侧menu的模块
    "key": "subnet",                //key为需要在menu隐藏的模块
    "link": "network"               //link为显示key模块的应用
  }, {
    "key": "resource-pool",
    "link": "loadbalancer"
  }],
  "hidden": [                       //需要隐藏的menu
    "ike-policy",
    "ipsec-policy"
  ],
  "theme": "default"                //uskin的主题颜色名称，现支持default主题
}
```