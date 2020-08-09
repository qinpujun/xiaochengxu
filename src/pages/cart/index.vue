<template>
  <view class="wrapper">
    <!-- 收货信息 -->
    <view class="shipment">
      <block v-if="address">
         <view class="dt">收货人: </view>
        <view class="dd meta">
        <text class="name">{{address.userName}}</text>
        <text class="phone">{{address.telNumber}}</text>
      </view>
      <view class="dt">收货地址:</view>
      <view class="dd">{{detailAddress}}</view>
      </block>
      <button type ='primary' @click="chooseAddress" v-else>添加用户信息</button>
    </view>
    <!-- 购物车 -->
    <view class="carts">
      <view class="item">
        <!-- 店铺名称 -->
        <view class="shopname">优购生活馆</view>
        <view class="goods" v-for="(item,index) in carts" :key="item.goods_id">
          <!-- 商品图片 -->
          <image class="pic" :src="item.goods_small_logo"></image>
          <!-- 商品信息 -->
          <view class="meta">
            <view class="name">{{item.goods_name}}</view>
            <view class="price">
              <text>￥</text>{{item.goods_price}}<text>.00</text>
            </view>
            <!-- 加减 -->
            <view class="amount">
              <text class="reduce" @click="changeNumber(index,-1)">-</text>
              <input type="number" disabled=true	 :value="item.goods_number" class="number">
              <text class="plus" @click="changeNumber(index,1)">+</text>
            </view>
          </view>
          <!-- 选框 -->
          <view class="checkbox">
            <icon type="success" size="20" :color="item.goods_checked ? '#ea4451' : '#ccc'" @click="toggle(index)"></icon>
          </view>
        </view>
      </view>
    </view>
    <!-- 其它 -->
    <view class="extra">
      <label class="checkall">
        <icon type="success" :color="call? '#ea4451':'#ccc'" size="20"></icon>
        全选
      </label>
      <view class="total">
        合计: <text>￥</text><label>{{amount}}</label><text>.00</text>
      </view>
      <view class="pay">结算({{checkedGoods.length}})</view>
    </view>
  </view>
</template>

<script>
  export default {
    data(){
        return{
             carts:[],
             address:null 
      }
    },
      computed:{
        detailAddress(){
        return this.address&& [
             this.address.provinceName,
            this.address.cityName,
          this.address.countyName,
          this.address.detailInfo,
         
          ].join('')
        },
          checkedGoods() {
      return this.carts.filter((goods) => {
        return goods.goods_checked;
      });
    },
    call(){
      return this.checkedGoods.length===this.carts.length
    },
    amount(){
      var total=0
       this.checkedGoods.forEach(item => {
    total+=item.goods_number*item.goods_price
        
      });
return total
    }
    
    },
    methods:{
      chooseAddress(){
      uni.chooseAddress({
  success :(res)=>{
      this.address=res
      console.log(this.address);
        }
      })
      },

      changeNumber(index,num){
        // console.log(index,num);
        var set=this.carts[index].goods_number
        if (set<=1&&num===-1) return
          if (set>=10&&num===1) return
          this.carts[index].goods_number+=num
            uni.setStorageSync("carts", this.carts);
      },
    toggle(index){
      console.log(index);
            this.carts[index].goods_checked=!this.carts[index].goods_checked
          uni.setStorageSync("carts", this.carts);
          },
    getCarts(){
        this.carts=uni.getStorageSync('carts')||[]
      
        }
      },
    onLoad(){
       // 获取购物车数据
    this.getCarts();
    }
  }
</script>

<style scoped lang="scss">
  .shipment {
    height: 100rpx;
    line-height: 2;
    padding: 30rpx 30rpx 40rpx 30rpx;
    font-size: 27rpx;
    color: #333;
    background-color: #fff;
    background-image: url(http://static.botue.com/ugo/images/cart_border%402x.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;

    .dt {
      width: 140rpx;
      float: left;
      clear: both;
    }

    .dd {
      padding-left: 160rpx;
    }

    .meta {
      padding-right: 50rpx;
    }

    text.phone {
      float: right;
    }
  }

  .carts {
    background-color: #f4f4f4;
    padding-bottom: 110rpx;
    overflow: hidden;

    .shopname {
      padding: 30rpx;
      margin-top: 20rpx;
      font-size: 30rpx;
      color: #333;
      background-color: #fff;
      border-top: 1rpx solid #eee;
      border-bottom: 1rpx solid #eee;
    }

    .goods {
      display: flex;
      padding: 30rpx 20rpx 30rpx 0;
      margin-left: 100rpx;
      border-bottom: 1rpx solid #eee;
      background-color: #fff;
  
      position: relative;

      .checkbox {
        width: 101rpx;
        height: 100%;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        left: -100rpx;
        top: 0;
      }

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

      .amount {
        position: absolute;
        bottom: 0;
        right: 20rpx;

        height: 48rpx;
        text-align: center;
        border: 1rpx solid #ddd;
        border-radius: 8rpx;

        display: flex;
        align-items: center;

        text {
          display: block;
          width: 60rpx;
          line-height: 48rpx;
          font-size: 36rpx;
          color: #ddd;
          text-align: center;
        }

        input {
          width: 60rpx;
          height: 48rpx;
          min-height: 48rpx;
          font-size: 27rpx;
          border-left: 1rpx solid #ddd;
          border-right: 1rpx solid #ddd;
        }
      }
    }
  }

  .extra {
    position: fixed;
    bottom: 0;
    /* #ifdef H5 */
    bottom: 50px;
    /* #endif */
    left: 0;
    z-index: 9;

    width: 750rpx;
    height: 96rpx;
    text-align: center;
    line-height: 96rpx;
    font-size: 36rpx;
    border-top: 1rpx solid #eee;
    background-color: #fff;
    color: #333;
    display: flex;

    .checkall {
      width: 140rpx;
      line-height: 1;
      margin-left: 25rpx;
      display: flex;
      align-items: center;

      icon {
        margin-right: 20rpx;
      }
    }

    .total {
      display: flex;
      justify-content: center;
      flex: 1;

      label, text {
        color: #ea4451;
        vertical-align: bottom;
        position: relative;
        bottom: -2rpx;
      }

      text {
        position: relative;
        bottom: -3rpx;
        font-size: 24rpx;

        &:first-child {
          margin-left: 10rpx;
        }
      }
    }

    .pay {
      width: 200rpx;
      background-color: #ea4451;
      color: #fff;
    }
  }
</style>

