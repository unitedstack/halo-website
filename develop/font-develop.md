---
prev: popup.html
next: after-develop.html
prevname: 弹窗配置
nextname: 后端开发
---
## 前端开发

#### kunkka目录

先分析一下`kunkka`的文件目录。所有的前端开发代码在`halo/client`目录中。其中`applications`为每个不同的应用模块`以外，其他文件夹都是通用代码库。

```
kunkka
|--halo
   |--client                  //前端目录
      |--applications         //所有的app都放入applications目录中
         |--admin
         |--dashboard
         |--login
         |--...
      |--assets               //所有图片集合
      |--components           //halo中频繁使用的自定义React组件
      |--dist                 //dev或build后生成的最终CSS、JS、字体、图片等文件
      |--libs                 //除了node_modules以外的一些依赖库
      |--style                //通用样式
      |--uskin                //uskin为React组件库
      |--utils                //通用方法
   |--configs
   |--locale
   |--node_modules
   |--scripts
   |--server
   |--tests
```

#### dashboard目录

applications中的每个文件为实际不同的应用，其目录之间结构非常相似。已dashboard为例看一下其文件目录，其路径为`kunkka/halo/client/applications/dashboard`。

```
|--dashboard
   |--components              //dashboard通用组件
   |--cores                   //辅助前端库
   |--locale                  //通用i18n文件
      |--lang.json
   |--modules                 //应用的每个不同模块页面
      |--overview
      |--instance
      |--image
      |--...
   |--style                   //通用样式
   |--utils                   //通用方法
   |--.gitignore
   |--.gitreview
   |--config.json             //与下面的sample文件相同，但被gitignore掉
   |--config.json.sample      //进入代码库的菜单配置文件，具体规则查看菜单配置
   |--index.jsx               //入口文件
   |--model.jsx               //生成和控制左侧一级，二级菜单的组件
```

#### instance目录

modules中的每个文件为每个不同模块的页面，instance作为通用页面与其他绝大部分的模块页面有相似的文件结构。以instance页面为例看一下文件目录结构，其路径为`kunkka/halo/client/applications/dashboard/modules/instance`。

```
|--instance
    |--pop                    //所有弹窗文件集合
        |--pop1               //一个单独的弹窗
            |--config.json    //弹窗样式的配置文件
            |--index.js       //弹窗的逻辑以及请求
        |--...
    |--style                  //instance模块用到的样式
        |--index.less
    |--cache.js               //缓存所需的ajax请求列表，函数名以get+模块名称首字母大写+List组成，例如getInstaceList(){}
    |--config.json            //instance应用页面配置
    |--lang.json              //i18n
    |--model.jsx              //instance的所有逻辑，包括：按钮、table、弹窗、detail
    |--request.js             //ajax请求列表
```