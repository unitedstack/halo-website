## 应用配置

应用配置文件为每个应用的界面布局的配置文件。

<img src="img/develop/model.png" style="width: 100%">

其目录在`kunkka/halo/client/{项目名}/modules/{模块名}/config.json`，每个应用模块有自己的`config.json`文件支持页面布局。

以下为`kunkka/halo/client/dashboard/modules/network/config.json`文件举例。

``` json
{
  "tabs": [{                                //tabs为应用导航栏，显示当前模块下的所有应用
    "name": ["network"],                    //name为i18n key值组成的数组
    "key": "network",                       //key为tab key，需要唯一值
    "default": true                         //default为进入模块时默认选中的应用
  }, {
    "name": ["subnet"],
    "key": "subnet"
  }],
  "btns": [{                                //btns为按钮集合
    "value": ["create", "prv_network"],     //value为i18n key值组成的数组（自动拼接）
    "key": "create",                        //button key值，需要唯一值
    "type": "create",                       //button type类型，有create，delete，warning，cancel
    "icon": "create"                        //按钮的icon
  }, {
    "value": ["create", "subnet"],
    "key": "crt_subnet",
    "type": "create",
    "icon": "create",
    "disabled": true                        //初始加载应用时按钮是否为禁用状态
  }, {
    "value": ["delete"],
    "key": "delete",
    "type": "delete",
    "icon": "delete",
    "disabled": true
  }, {
    "key": "refresh",                       //没有value只有icon类型的button
    "icon": "refresh"
  }],
  "search": {                               //搜索栏，根据table的name来匹配搜索
    "column": {
      "name": true
    }
  },
  "table": {                                //table的全部属性在该对象中配置
    "checkbox": true,                       //是否有checkbox
    "dataKey": "id",                        //table以data中的哪个字段设为row的key值，一般为id
    "loading": true,                        //初始加载应用时是否显示loading
    "column": [{                            //table column的列表
      "title": ["name"],                    //title为i18n key值组成的数组（自动拼接）
      "dataIndex": "name",                  //根据data中的哪个字段为该列的数据，比如说row[i].name
      "key": "name",                        //该column的key值
      "type": "captain",                    //是否为captain类型，也就是说可以点击之后滑动出detail框
      "sort": true                          //是否可以排序，默认为根据string排序
    }, {
      "title": ["subnet"],
      "dataIndex": "",
      "key": "subnet"
    }, {
      "title": ["status"],
      "dataIndex": "status",
      "type": "status",
      "key": "status",
      "filter": [{                          //改列是否有过滤功能
        "name": ["active"],                 //title为i18n key值组成的数组（自动拼接）
        "key": "active",                    //该filter的key值
        "filterBy": "ACTIVE"                //根据data中的哪个字段作为该filter的匹配值，例如row[i].status === 'ACTIVE'
      }]
    }, {
      "title": ["security", "restrict"],
      "dataIndex": "restrict",
      "key": "restrict",
      "type": ""
    }],
    "data": [],
    "detail": {                             //captain被点击后滑出的detail框信息
      "tabs": [{                            //detail的tab信息
        "name": ["description"],            //name为i18n key值组成的数组（自动拼接）
        "key": "description",               //tab key，需要唯一值
        "default": true                     //进入detail时默认选中的tab
      }]
    }
  }
}
```