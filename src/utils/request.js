export default function(config) {
    // 将配置参数中的 baseURL 解构出来
    const { baseURL } = config;
  
    // console.log(baseURL);
  
    // 这才是真正的插件
    return function(Vue) {
      // console.log(Vue);
  
      return (Vue.prototype.http = async function(params) {
        // console.log('全局方法添加上了');
        // 请求相关的参数
        // console.log(params);
        // 解析请求相关参数
        const { url, method, data, header } = params;
  
        // 显示加载框
        uni.showLoading({
          title: "正在加载...",
          mask: true,
        });
  
        // 真正的请求
        const res = await uni.request({
          url: baseURL + url,
          method,
          header,
          data,
        });
  
        // 关闭加载框
        uni.hideLoading();
  
        // console.log(res);
        // 响应结果
        return res[1].data;
      });
    };
  }
  