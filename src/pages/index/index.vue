<template>
  <view :style="{ height: pageHeight, overflow: 'hidden' }">
    <search @search="disableScroll" />
    <!-- 焦点图 -->
    <swiper
      class="banner"
      indicator-dots
      indicator-color="rgba(255, 255, 255, 0.6)"
      indicator-active-color="#fff"
    >
      <swiper-item :key="banner.goods_id" v-for="banner in bannerList">
        <navigator :url="'/pages/goods/index?id=' + banner.goods_id">
          <image :src="banner.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 自定义转发按钮 -->
    <!-- <button open-type="share" type="primary">转发</button> -->
    <!-- 主导航 -->
    <view class="navs">
      <!-- 如果一个页面的路径属于 tabBar -->
      <!-- 只能通过 wx.switchTab 才可以跳转 -->
      <!-- 或者 navigator 且 open-type="switchTab" -->
      <navigator
        :key="nav.name"
        v-for="nav in navList"
        :open-type="nav.open_type || 'navigate'"
        :url="
          nav.open_type
            ? '/pages/category/index'
            : '/pages/list/index?query=' + nav.name
        "
      >
        <image :src="nav.image_src"></image>
      </navigator>
    </view>
    <!-- 楼层 -->
    <view class="floors">
      <view class="floor" :key="index" v-for="(floor, index) in floorList">
        <view class="title">
          <image :src="floor.floor_title.image_src"></image>
        </view>
        <view class="items">
          <navigator
            :key="key"
            v-for="(product, key) in floor.product_list"
            :url="'/pages/list/index?query=' + product.name"
          >
            <image :src="product.image_src"></image>
          </navigator>
        </view>
      </view>
    </view>
    <!-- 回到顶部 -->
    <!-- uni-app 中 v-show 存在 bug -->
    <view v-if="scrollTop > 200" @click="goTop" class="goTop icon-top"></view>
  </view>
</template>

<script>
import search from "@/components/search";

export default {
  data() {
    return {
      pageHeight: "auto",
      // 轮播图数据
      bannerList: [],
      // 导航数据
      navList: [],
      // 楼层数据
      floorList: [],
      // 滚动高度
      scrollTop: 0,
    };
  },

  components: {
    search,
  },

  methods: {
    disableScroll(ev) {
      this.pageHeight = ev.pageHeight + "px";
    },

    // 设置页面的滚动位置
    goTop() {
      // 调用小程序的 API 来进行设置
      uni.pageScrollTo({
        scrollTop: 0,
      });
    },

    // 轮播图接口
    async getBannerList() {
      // 请求后端接口（异步方式）
      // uni.request({
      //   url: 'https://ugo.botue.com/api/public/v1/home/swiperdata',
      //   success (info) {
      //     console.log(info);
      //   }
      // });

      // Promise方式
      // const res = await uni.request({
      //   url: 'https://ugo.botue.com/api/public/v1/home/swiperdata'
      // });

      // console.log(res[1]);

      // 调用封装后的请求
      const { message } = await this.http({
        url: "/api/public/v1/home/swiperdata",
      });

      // 响应数据
      // console.log(message);
      this.bannerList = message;
    },

    // 导航接口
    async getNavList() {
      // 请求后端接口
      const { message } = await this.http({
        url: "/api/public/v1/home/catitems",
      });

      // 后端数据
      // console.log(message);
      this.navList = message;
    },

    // 楼层接口
    async getFloorList() {
      // 请求后端接口
      const { message } = await this.http({
        url: "/api/public/v1/home/floordata",
      });

      // 响应数据
      // console.log(message);
      this.floorList = message;
    },
  },

  onLoad() {
    // 当前加载加载时执行该回调
    // 发起请求，获取首页数据

    // 调用接口
    this.getBannerList();
    this.getNavList();
    this.getFloorList();

    // 开启转发
    // uni.showShareMenu();
  },

  // 监听用户的下接操作
  async onPullDownRefresh() {
    // console.log('有人下接操作啦~');

    // 调用接口
    await this.getBannerList(); // 2
    await this.getNavList(); // 1
    await this.getFloorList(); // 4

    // 调用 API 可以主动关闭下接动画交互
    uni.stopPullDownRefresh();
  },

  // 监听页面的滚动
  onPageScroll(ev) {
    // console.log(ev)
    // 修改滚动高度
    this.scrollTop = ev.scrollTop;
  },

  // 监听页面滚动是否快到达底部了
  onReachBottom() {
    console.log("快到底儿了...");
  },

  // 监视用户的转发操作，实现转发内容的自定义

  // 如果页面监听了转发事件，默认会开启转发功能
  onShareAppMessage() {
    // 通过返回值即可实现转发内容的自定义
    return {
      title: "快来传智播客学习前端吧~",
      path: "/pages/index/index?id=1",
      imageUrl:
        "http://www.999zx.cn/adm_file/fck/images/2018/4/Image/20184386447866.jpg",
    };
  },
 };
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
  height: 340rpx;

  image {
    width: 100%;
    height: 340rpx;
  }
}

.navs {
  display: flex;
  justify-content: space-between;
  padding: 30rpx 44rpx;

  image {
    width: 128rpx;
    height: 140rpx;
  }
}

.floor {
  .title {
    width: 750rpx;
    height: 60rpx;
    padding: 20rpx 0 0 8rpx;
    background-color: #f4f4f4;
  }

  .items {
    padding: 20rpx 16rpx;
    overflow: hidden;

    navigator {
      width: 193rpx;
      height: 188rpx;
      margin-left: 10rpx;
      margin-bottom: 10rpx;
      float: left;
    }

    navigator:first-child {
      width: 232rpx;
      height: 386rpx;
      margin-left: 0rpx;
    }

    navigator:nth-child(2),
    navigator:nth-child(5) {
      width: 273rpx;
    }
  }

  &:first-child {
    .items {
      navigator {
        width: 233rpx;
      }
    }
  }
}

.goTop {
  position: fixed;
  bottom: 30rpx;
  /* #ifdef H5 */
  bottom: 65px;
  /* #endif */
  right: 30rpx;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100rpx;
  height: 100rpx;
  font-size: 48rpx;
  color: #666;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
