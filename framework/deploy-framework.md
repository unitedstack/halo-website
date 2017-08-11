---
prev: system-framework.html
prevname: 系统架构
distinction: 架构
---
## 部署架构

Halo 部署在 OpenStack 集群的 API （web服务器）节点，其部署架构如下图所示：
<p style="text-align: center">
  <img src="/img/framework/deployment_architecture.png" style="width: 100%">
</p>

该节点需要访问数据库节点，缓存节点，OpenStack 服务