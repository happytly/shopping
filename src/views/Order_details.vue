<!--  -->
<template>
  <div class="orderbox">
    <van-row class="order_state">
      <van-col span="12" style="text-align:left;font-size:20px;padding-left: 38px;">{{order_details.orderStatusName}}</van-col>
      <van-col span="12" style="height:100%;text-align:center;">
        <img src="../assets/ki.webp" height="100%" />
      </van-col>
    </van-row>
    <van-steps direction="vertical" :active="0">
      <van-step v-for="(itme,index) in 2" :key="index">
        <h3>【城市】物流状态1</h3>
        <p>2016-07-12 12:41</p>
      </van-step>
    </van-steps>
    <van-cell-group class="ds">
      <van-cell style="padding-left:10px">
        <div class="diz">
          <!-- <van-icon name="location-o" size="26" color="#ee0a24"/> -->
          <van-icon name="location" size="26" color="#ee0a24"/>
          <div style="margin-left: 8px;">
            <div class="area-address">
              <div class="van-ellipsis">{{order_details.orderReceiver}}电话{{order_details.orderPhone}}</div>
            </div>
            <div class="order-address">
              <div class="van-multi-ellipsis--l2">{{order_details.orderAddr}}</div>
            </div>
          </div>
        </div>
      </van-cell>
    </van-cell-group>
    <div class="order-be">
      <van-cell>
        <div class="meti">
          <span style="font-weight: bold;">订单号:{{order_details.orderNo}}</span>
        </div>
      </van-cell>
      <van-card
        :num="order_details.orderCount"
        :price="formatPrice(order_details.orderPrice)"
        :desc="order_details.orderSpecs"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
        style="background-color:white"
      >
        <!-- <div slot="tags">
          <van-tag plain type="danger">7天无理由退换货</van-tag>
        </div>-->
      </van-card>
      <van-cell style="border-top: 1px solid #ebedf0;">
        <div class="meti">
          <span style="font-weight: bold;">运费</span>
          <span style="color: red;">￥{{freight(0)}}</span>
        </div>
        <div class="meti">
          <span style="font-weight: bold;">实付款</span>
          <span style="font-weight: bold;color: red;">{{hePrice()}}</span>
        </div>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order_details:[]
    };
  },

  //import引入的组件需要注入到对象中才能使用
  components: {},
  //监听属性 类似于data概念
  computed: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.order_details=this.$route.query.orderDetails;
    this.orderdetails();
  },
  //方法集合
  methods: {
    orderdetails(){
      const _self=this;
      let res=_self.$api.post('https://hc.gztv.com/order/api/shop/order/detail/'+this.$route.query.orderDetails.id).then(response=>{
        const {data,code}=response.data;
        this.order_details=data;
        console.log(response)
      }).catch(err=>{
        _self.$toast("查询失败");
      })
    },
    formatPrice(price) {
      //详情页价格
      return (price);
    },
    freight(freight) {
      //运费价格
      return (freight / 100).toFixed(2);
    },
    hePrice() {
      //总价格
      return (
        "¥" + (this.order_details.orderCount * this.formatPrice(this.order_details.orderPrice) - this.freight(0)).toFixed(2)
      );
    }
  }
  //   beforeRouteLeave(to, from, next) {
  //     if (to.fullPath === '/myorder') {
  //         return next()
  //     }else{
  //       next('/myorder');
  //     }

  //   }
};
</script>
<style scoped>
.orderbox {
  background-color: #f3f3f3;
  /* padding-bottom: 10px;   */
  overflow: hidden;
}
.order_state {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 110px;
  color: white;
  background: linear-gradient(to right, #ff6034, #ee0a24);
}
.order_state {
  background: linear-gradient(to right, #ff6034, #ee0a24);
  padding: 0;
}
.order-be {
  background-color: white;
  width: 100%;
  height: auto;
  border-radius: 0px;
  margin-bottom: 10px;
  margin-top: 10px;
  overflow: hidden;
}
.meti {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.ds {
  padding-bottom: 3px;
  background: #fff url("../assets/bjd.png") -7px bottom repeat-x;
  background-size: 64px 5px;
}
.order-address {
  font-size: 14px;
  /* font-weight: bold; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.diz {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
</style>
