<template>
  <view>
    <!-- 搜索 -->
    <search />
    <!-- 分类 -->
    <view class="category">
      <!-- 顶级分类 -->
      <view class="sup">
        <scroll-view scroll-y>
          <!-- <text class="active">大家电</text>
          <text>热门推荐</text>
          <text>海外购</text>
          <text>苏宁房产</text>
          <text>手机相机</text>
          <text>电脑办公</text>
          <text>厨卫电器</text>
          <text>食品酒水</text>
          <text>居家生活</text> -->
          <text v-for="(item,index) in topCategories" :key="item.cat_id" @click="getChildCategories(index)" :class="currentIndex==index? 'active':''">{{item.cat_name}}</text>
        </scroll-view>
      </view>
      <!-- 子级分类 -->
      <view class="sub">
        <scroll-view scroll-y>
          <!-- 封面图 -->
          <image src="http://static.botue.com/ugo/uploads/category.png" class="thumb"></image>
          
          <view class="children" v-for="chrend in topCategories[currentIndex].children" :key="chrend.cat_id">
            <view class="title">{{chrend.cat_name}}</view>
            <!-- 品牌 -->
            <view class="brands">
              <navigator :url="'/pages/list/index?query=' + addf.cat_name" v-for="addf in chrend.children" :key="addf.cat_id">
                <image :src="addf.cat_icon"></image>
                <text>{{addf.cat_name}}</text>
              </navigator>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
  import search from '@/components/search';

  export default {
    data(){
// 顶级分类数据
        return{
          topCategories: [],
             // 当前顶级分类的索引值
        currentIndex: 0
        }
    },
    components: {
      search
    },
    methods:{
     async getTopCategories(){
       const res=await this.http({
              url: '/api/public/v1/categories'
        })
        this.topCategories=res.message
        // console.log(this.topCategories);     
         },
         getChildCategories(index){
           this.currentIndex=index
     
         }
    },

    onLoad(){
      this.getTopCategories()
    }
  }
</script>

<style scoped lang="scss">
  scroll-view {
    height: 100%;
  }

  .category {
    display: flex;
    width: 100%;
    position: absolute;
    top: 100rpx;
    bottom: 0;

    .sup {
      width: 196rpx;
      background-color: #f4f4f4;

      text {
        display: block;
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
        font-size: 27rpx;
        color: #333;
        border-bottom: 1rpx solid #eee;

        &:last-child {
          border-bottom: none;
        }
        
        &.active {
          background-color: #FFF;
          color: #ea4451;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 8rpx;
            height: 60rpx;
            transform: translateY(-50%);
            background-color: #ea4451;

            position: absolute;
            left: 0;
            top: 50%;
          }
        }
      }
    }

    .sub {
      flex: 1;
      padding: 20rpx 18rpx;

      .thumb {
        width: 100%;
        height: 180rpx;
      }

      .children {
        text-align: center;
        color: #333;

        .title {
          display: inline-block;
          margin: 40rpx 0 20rpx;
          font-size: 30rpx;

          &::before {
            content: '/';
            margin-right: 20rpx;
            color: #666;
          }

          &::after {
            content: '/';
            margin-left: 20rpx;
            color: #666;
          }
        }
      }

      .brands {
        display: flex;
        flex-wrap: wrap;

        navigator {
          width: 33%;
          margin-bottom: 20rpx;
        }

        image {
          width: 120rpx;
          height: 120rpx;
        }

        text {
          display: block;
          font-size: 24rpx;
        }
      }
    }
  }
</style>
