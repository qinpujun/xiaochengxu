<template>

  <view>
    <view v-if="loaded && !goodsList.length" class="tips">没有找到相关商品~</view>
    <!-- 筛选 -->
    <view class="filter">
      <text class="active">综合</text>
      <text>销量</text>
      <text>价格</text>
    </view>
    <!-- 商品列表 -->
    <scroll-view class="goods" scroll-y
    @scrolltolower='getMore'>
      <view class="item" @click="goDetail(item.goods_id)" v-for="item in goodsList" :key="item.goods_id">
        <!-- 商品图片 -->
        <image class="pic" :src="item.goods_big_logo"></image>
        <!-- 商品信息 -->
        <view class="meta">
      <view class="name">{{item.goods_name}}</view>
          <view class="price">
            <text>￥</text>{{item.goods_price}}<text>.00</text>
          </view>
        </view>
      </view>
      
     
   
    </scroll-view>
  </view>
</template>

<script>
  export default {
data(){
return{
         // 地址参数
          querys:'',
        // 商品列表
        goodsList: [],
           // 分页相关参数
        pagenum: 1,
        pagesize: 5,
        total: 0,
        loaded:false
}
},
    methods: {
      getMore(){
        if(this.goodsList.length===this.total) return
        this.pagenum++
        this.getGoodsList()
      },
      
      async getGoodsList(){
          const res=await this.http({
           url:'/api/public/v1/goods/search',
         data:{
            query:this.querys,
            pagenum:this.pagenum,
            pagesize:this.pagesize
          }
        })
// this.goodsList=res.message.goods
          this.goodsList=this.goodsList.concat(res.message.goods)
          this.total=res.message.total
          this.loaded=true
      },
      goDetail (id) {
        uni.navigateTo({
          url: '/pages/goods/index'
        })
      }
    },
    onLoad(e){

this.querys=e.query

 this.getGoodsList();
    }

  }
</script>

<style scoped lang="scss">
  .filter {
    display: flex;
    height: 96rpx;
    line-height: 96rpx;
    border-bottom: 1rpx solid #ddd;

    /* #ifdef H5 */
    position: relative;
    z-index: 99;
    /* #endif */

    text {
      flex: 1;
      text-align: center;
      font-size: 30rpx;
      color: #333;

      &.active {
        color: #ea4451;
      }
    }
  }
  
  .goods {
    position: absolute;
    width: 100%;
    top: 97rpx;
    bottom: 0;
  }

  .item {
    display: flex;
    padding: 30rpx 20rpx 30rpx 0;
    margin-left: 20rpx;
    border-bottom: 1rpx solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .pic {
      width: 200rpx;
      height: 200rpx;
      margin-right: 30rpx;
    }

    .meta {
      flex: 1;
      font-size: 27rpx;
      color: #333;
      position: relative;
    }

    .name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .price {
      position: absolute;
      bottom: 0;

      color: #ea4451;
      font-size: 33rpx;

      text {
        font-size: 22rpx;
      }
    }
  }
</style>
