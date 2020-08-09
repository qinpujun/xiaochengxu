import Vue from "vue";
import App from "./App";
// 导入 uni.request 的封装
import request from "./utils/request";

Vue.config.productionTip = false;

App.mpType = "app";

// 插件
const plugin = request({
  // 基础路径
  baseURL: "https://www.uinav.com",
});

// 挂载插件
Vue.use(plugin);

const app = new Vue({
  ...App,
});
app.$mount();
