##### 目录结构
```bash
├── config                                       // 暴露的webpack配置
├── public                                       // 打包目录和放入的静态文件
├── script                                       // 暴露的webpack命令配置
├── src                                          // 项目代码
│   ├── axios                                   // axios封装以及jsonp
│   ├── components                              // 组件
│   │   ├── BaseFrom                           // from封装组件
│   │   ├── ETable                             // table封装组件
│   │   ├── Footer                             // 底部组件
│   │   ├── Header                             // 头部组件
│   │   ├── NavLeft                            // 左侧菜单组件
│   ├── config
│   │   ├──menuConfig.js                       // 导航菜单数据
│   ├── pages                                   // 页面
│   │   ├── city                                //城市开通(查询)
│   │   ├── echarts                             //图表
│   │   ├── from                                //表单
│   │   ├── home                                //首页
│   │   ├── login                                //登陆注册
│   │   ├── map                                  //车辆地图
│   │   ├── order                                //订单管理/订单详情
│   │   ├── permission                           //权限分配
│   │   ├── rich                                 //富文本
│   │   ├── table                                //表格permission
│   │   ├── ui                                   //ui组件
│   │   ├── user                                 //员工管理
│   ├── redux                                    // redux
│   │   ├── action                               //action事件触发（dispath）
│   │   ├── reducer                              //reducer数据管理
│   │   ├── store                                //store数据源
│   ├── style
│   ├── util                                    // 公共方法
│   ├── admin.js                                // 主页面结构layout布局页面
│   ├── App.js                                  // 项目入口（容器组件存放子组件)
│   ├── common.js                               // 第三方通用 页面加载布局
│   ├── index.js                                // 程序入口文件，加载各种公共组件
│   ├── router.js                               // 路由配置
```
### 项目运行
  ![image](https://github.com/wl001/react-antd-admin/blob/master/public/react-antd-admin.gif)
### 项目笔记
- https://wl001.github.io/2018/06/13/react_demo/
### 项目运行 npm/yarn
```bash
 npm install
 npm start
```
