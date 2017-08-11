---
prev: idea.html
next: deploy-framework.html
prevname: 理念
nextname: 部署架构
distinction: 架构
---
## 系统架构

<img src="/img/framework/project_architecture.png" style="width: 100%">

Halo 是一个 web 项目框架，用来拼装 Client 端和 Server 端的各个子项目组成 OpenStack dashboard 项目。

## Client 端

Client 端主要包含 Applications 和 USkin 两个大模块 USkin 是一个前端组建库，包含了 dashboard 用的所有UI组件。这个项目是在 github 上开源的，url：[https://github.com/unitedstack/uskin](https://github.com/unitedstack/uskin) Applications 则包含了 dashboard 所用的所有子项目：

* 项目（project）：OpenStack 项目面板
* 管理（admin）: OpenStack 管理面板
* 登陆（login）：登陆面板
* 注册（register）：注册面板

## Server 端

Server 端主要包含 API 和 Driver 两个大模块 API. API 里面包含了提供 API 服务的子项目：

* OpenStack API(slardar): 对 OpenStack 原生API进行了一些封装
* 配置管理（tusk）：配置管理 API
* 登陆（brewmaster）: 登陆 API Driver
* OpenStack Driver（huskar）: 封装了对 OpenStack 原生 API 的请求
* Mysql Driver（meepo）：数据库连接库