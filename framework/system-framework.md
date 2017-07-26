## 系统架构
<img src="/img/framework/project_architecture.png" style="width: 100%">

kunkka 是一个拼装项目，用来拼装各个子项目到 kunkka 当中组成 OpenStack dashboard 项目，项目的配置在 kunkka/config.json 文件里面。 kunkka 当中的核心项目是halo，是一个 web 项目框架，主要包含 Client 端和 Server 端。

## Client 端

Client 端主要包含 Applications 和 USkin 两个大模块 USkin 是一个前端组建库，包含了 dashboard 用的所有UI组件。这个项目是在github上开源的，url：[https://github.com/icecreamliker/uskin](https://github.com/icecreamliker/uskin) Applications 则包含了 dashboard 所用的所有子项目：

* 项目（project）：OpenStack 项目面板
* 管理（admin）: OpenStack 管理面板
* 计费 （bill）： 计费面板
* 审批（approval）: 审批面板
* 工单（ticket）：工单面板
* 登陆（login）：登陆面板

## Server 端

Server 端主要包含 API 和 Driver 两个大模块 API API 里面包含了提供 API 服务的子项目：

* OpenStack API(slardar): 对 OpenStack 原生API进行了一些封装
* 审批 API（lich）：审批API
* 工单 API（invoker）: 工单API
* 配置管理 （tusk）：配置管理API
* 登陆（brewmaster）: 登陆API Driver
* OpenStack Driver（huskar）: 封装了对 OpenStack 原生 API 的请求
* Mysql Driver（meepo）：数据库连接库