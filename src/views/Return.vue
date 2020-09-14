<!--  -->
<template>
  <div>
    <van-row class="order_state">
      <van-col
        span="12"
        style="text-align:left;font-size:20px;padding-left: 38px;"
        >支付成功</van-col
      >
      <van-col span="12" style="height:100%;text-align:center;">
        <img src="../assets/logon.png" style="height: 22vw;margin-top: 4vw;" />
      </van-col>
    </van-row>
    <van-cell-group>
      <van-cell
        class="itmes"
        title="商户订单号"
        :label="this.$route.query.out_trade_no"
      />
      <van-cell
        class="itmes"
        title="订单金额"
        :label="this.$route.query.total_amount"
      />
      <van-cell
        class="itmes"
        title="付款金额"
        :label="this.$route.query.total_amount"
      />
      <van-cell
        class="itmes"
        title="交易时间"
        :label="this.$route.query.timestamp"
      />
    </van-cell-group>
    <van-button
      square
      type="danger"
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      style="margin-top: 10vw;"
      @click="okye"
      >返回首页</van-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  //import引入的组件需要注入到对象中才能使用
  components: {},
  //监听属性 类似于data概念
  computed: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let tradeNo = this.$route.query.out_trade_no;
    if (tradeNo != null && tradeNo != "") {
      tradeNo = tradeNo.substring(0, 35);
    }
    let params = new FormData();
    params.append("tradeNo", tradeNo);
    let res = this.$api
      .post("https://hc.gztv.com/order/api/shop/order/status", params)
      .then(response => {
        const { data, code, msg } = response.data;
        console.log(response);
        if (code === 200) {
          this.$toast("修改状态成功");
        }
      })
      .catch(error => {
        this.$toast("提交失败");
        this.disabled = false;
      });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    okye() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>
<style scoped>
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
.itmes {
  text-align: left;
}
/* /deep/ .van-cell__title{
  text-align: left;
} */
</style>
