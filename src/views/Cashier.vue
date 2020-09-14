<!--  -->
<template>
  <div class="orderbox">
    <van-cell-group class="pricebox">￥{{ formatPrice() }}</van-cell-group>
    <div class="order-be">
      <van-radio-group v-model="radio" @change="radiofn">
        <van-cell-group>
          <!-- <van-cell clickable @click="radio = '1'">
            <div class="fkbox">
              <van-icon name="https://sub.gztv.com/img/wx.png" size="21px" />
              <span style="margin-left: 10px;">微信支付</span>
            </div>
            <van-radio slot="right-icon" name="1" checked-color="#F0250F" />
          </van-cell> -->
          <van-cell clickable @click="radio = '1'">
            <div class="fkbox">
              <van-icon name="https://sub.gztv.com/img/zfb.png" size="26px" />
              <span style="margin-left: 10px;">支付宝</span>
            </div>
            <van-radio slot="right-icon" name="1" checked-color="#F0250F" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="payment">
      <van-button round type="danger" :disabled="disabled" style="width:96%;" @click="payment_but">{{ payment() }}</van-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  data() {
    return {
      radio: '1',
      kis: false,
      disabled: false,
      orderlist: {
        goods: {
          selectedSkuComb: {}
        },
        goodss: {},
        specifications: {}
      }
    }
  },

  //import引入的组件需要注入到对象中才能使用
  components: {},
  //监听属性 类似于data概念
  computed: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    let odList = JSON.parse(this.$route.query.orderDatas)
    this.orderlist = JSON.parse(odList)
    console.log(this.orderlist)
    console.log(this.orderlist.goodss.uuid)
  },
  //方法集合
  methods: {
    formatPrice() {
      //详情页价格
      return (this.$route.query.price / 100).toFixed(2)
    },
    payment() {
      if (this.radio == 1) {
        return '支付宝' + this.formatPrice()
      }
    },
    payment_but() {
      this.$toast('支付中,请稍后')
      this.$api
        .get('https://hc.gztv.com/alipay/api/pay', {
          params: {
            tradeNo: this.$route.query.tradeNo,
            subject: this.orderlist.goodss.goodsName,
            desc: this.orderlist.goodss.goodsName,
            totalAmount: this.formatPrice()
          }
        })
        .then(res => {
          let data = res.data
          // this.$toast('返回数据：' + data)
          // let action = data.substring(data.indexOf('action') + 8, data.indexOf('>') - 1)
          // let appendParams =
          //   'alipay://alipayclient/?{"dataString":"h5_route_token=1b58cba25962406cab2555ba498589ab&is_h5_route=true&return_url=https://hc.gztv.com/return","fromAppUrlScheme":"com.news.GZNews","requestType":"SafePay"}'
          // let newAction = action + '&appendParam=[' + appendParams + ']'
          // // console.log(newAction);
          // data = data.replace(action, newAction)
          // this.$toast('新的数据：' + data)
          // setTimeout(function() {
          document.querySelector('body').innerHTML = data //查找到当前页面的body，将后台返回的form替换掉他的内容
          document.forms[0].submit() //执行submit表单提交，让页面重定向，跳转到支付宝页面
          // }, 6000)
        })
        .catch(err => {})
    },
    radiofn(name) {
      console.log(name)
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   // ...
  //   console.log(from);
  //   if(from.path == '/myorder'){
  //     this.$router.replace({name:"home"})
  //   }else{
  //     next();
  //   }

  // },
  beforeRouteLeave(to, from, next) {
    // Dialog.confirm({
    //   title: "确定要离开收银台？",
    //   message: "请尽快完成支付。",
    //   cancelButtonText: "继续支付",
    //   confirmButtonText: "确认离开",
    //   confirmButtonColor: "#ee0a24"
    // })
    //   .then(() => {
    //     // on confirm
    //     this.kis = true;
    //     this.$router.push({ name: "myorder" });
    //   })
    //   .catch(() => {
    //     this.kis = false;
    //     // on cancel
    //   });
    // if (this.kis) {
    //   Dialog.close();
    //   next();
    // } else {
    //   next(false);
    // }
  }
}
</script>
<style scoped>
.orderbox {
  background-color: #f3f3f3;
  padding-bottom: 10px;
}
.pricebox {
  font-size: 28px;
  padding: 24px 0;
  color: #f23030;
}
.order-be {
  background-color: white;
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-top: 10px;
  overflow: hidden;
}
.fkbox {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.payment {
  width: 100%;
  position: fixed;
  bottom: 6px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  padding: 6px 0;
  border-top: 1px solid #ebedf0;
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
