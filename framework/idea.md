## 理念

HALO是一种SPA(Single Page Applciation)页面，其意味着加载单个HTML 页面并在用户与应用程序交互时动态更新该页面的Web应用程序。考虑到实现时，HALO存在着以下潜在的问题。

* 整个项目非常大，依赖的包多
* 前端文件太大可能会超过预期，影响加载速度和初始化速度
* 逻辑复杂，交互部分的实现较为棘手
* 需要维护大量的数据来保持页面正确的更新

为了实现业务，同时避免上述问题的出现，我们对HALO进行了严谨的架构设计，具体参考[系统架构](/framework/system-framework.html) 和[部署架构](/framework/deploy-framework.html)。

前端采用[React](https://facebook.github.io/react/)框架，是一款基于基于JavaScript的用户界面库。采用React库不仅仅是因为它是最流行的前端框架之一，而是它提出的virtual DOM概念可以把复杂的界面组件化，每个组件只需要维护自身视图，根据接收的数据相应改变界面和变换交互。已virtual DOM的方式拆分页面组件并组合成SPA可以大幅度减少代码量，同时确保数据流传输正确无误。除此之外，React利用它的生命周期对DOM更新进行了优化，相同数据的情况下不会进行DOM更新，当数据发生变化时，只对有变化的部分进行DOM更新，保证大量的数据显示和更新的流畅性得到一定的优化和保障。

就如同在浏览器中一样，现在我们也可以在服务器上运行JavaScript，从前端跨越到后端，这样巨大的反差让人难以想象，但NodeJS可以做到这一切。Node.js 的主要思路是：使用非阻塞的，事件驱动的 I/O 操作来保持在处理跨平台 (across distributed devices) 数据密集型实时应用时的轻巧高效。这听起来有点绕口。Node 真正的亮点在于建设高性能，高扩展性的互联网应用——因为它能够处理庞大的并且高吞吐量的并发连接。这也是我们后端采用Node的重要原因。

<!-- ![idea](/img/framework/nodejs_flow.png) -->
<p style="text-align: center">
  <img src="img/framework/nodejs_flow.png" style="width: 400px; max-width: 100%">
</p>

它的工作原理是相当有趣的。传统的网络服务技术，是每个新增一个连接（请求）便生成一个新的线程，这个新的线程会占用系统内存，最终会占掉所有的可用内存。而 Node.js 仅仅只运行在一个单线程中，使用非阻塞的异步 I/O 调用，所有连接都由该线程处理，在 libuv 的加分下，可以允许其支持数万并发连接（全部挂在该线程的事件循环中）。

对技术选型的严禁筛选以外，我们还对项目进行了拆分：kunkka负责打包管理、HALO负责通用逻辑代码、USkin为页面组件的集合、dashboard/admin等项目是每个可视化单独应用，应用之间互不干扰，具体文件及代码结构可以参考[前端开发指南](/framework/system-framework.html)。