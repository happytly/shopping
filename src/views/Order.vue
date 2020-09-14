<!--  -->
<template>
  <div class="orderbox">
    <van-cell-group class="ds">
      <van-cell>
        <div v-if="addressData.length != 0" @click="addressEditClick">
          <div class="area-address">
            <div class="van-ellipsis">{{ addressData.province }}{{ addressData.city }}{{ addressData.county }}</div>
          </div>
          <div class="order-address">
            <div class="van-ellipsis">{{ addressData.addressDetail }}</div>
            <van-icon name="arrow" />
          </div>
          <div class="order-phonr">电话{{ addressData.tel }}</div>
        </div>
        <div class="shouj-address" @click="addressClick" v-else>
          <van-icon name="add" size="30px" color="red" />
          <div style="margin-left:10px">请添加收货地址</div>
        </div>
      </van-cell>
    </van-cell-group>
    <div class="order-be">
      <van-cell>
        <div class="meti">
          <van-icon name="send-gift" size="18" color="red" />
          <span style="margin-left:6px;">花城+店</span>
        </div>
      </van-cell>
      <van-card
        :price="formatPrice(orderlist.goods.selectedSkuComb.price)"
        :desc="`规格:${orderlist.specifications.name}`"
        :title="orderlist.goodss.goodsName"
        :thumb="orderlist.specifications.imgUrl"
        style="background-color:white"
      >
        <div slot="num">
          <van-stepper v-model="orderlist.goods.selectedNum" min="1" :max="orderlist.goods.selectedSkuComb.stock_num" :disable-input="true" button-size="22px" />
        </div>
        <!-- <div slot="tags">
          <van-tag plain type="danger">7天无理由退换货</van-tag>
        </div> -->
      </van-card>
    </div>
    <van-submit-bar :price="hePrice()" button-text="提交订单" :disabled="disabled" :safe-area-inset-bottom="true" @submit="onSubmit" />
    <van-popup v-model="addressfrom" id="popups">
      <van-address-edit :area-list="areaList" show-postal :address-info="addressInfo" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" />
    </van-popup>
  </div>
</template>

<script>
import areaList from '../assets/area'
export default {
  data() {
    return {
      areaList,
      nums: 1,
      orderlist: {
        goods: {
          selectedSkuComb: {}
        },
        goodss: {},
        specifications: {}
      },
      addressfrom: false,
      addressData: [],
      addressInfo: {
        // name: '张三',
        // tel: '13888888888',
        // province: '广东省',
        // city: '广州市',
        // county: '海珠区',
        // areaCode: '440105',
        // addressDetail: '广州市海珠区地方',
        // postalCode: '510000'
      },
      addr_Data: {
        name: '',
        tel: '',
        orderAddr: '',
        areaCode: ''
      },
      disabled: false
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
    this.orderlist = odList
    console.log(this.orderlist)
    // this.addressApi();//初始化查询地址
  },
  //方法集合
  methods: {
    addressApi() {
      //查询收货地址
      let params = new FormData()
      params.append('userId', '123')
      let res = this.$api
        .get('https://hc.gztv.com/order/api/shop/usr/addr/list', params)
        .then(response => {
          const { data, code } = response.data
          if (code === 200) {
            if (data.list != null || data.list.length != 0) {
              let addressDatas = {
                addressDetail: data.list[0].address,
                city: data.list[0].city,
                areaCode: data.list[0].areaCode,
                county: data.list[0].area,
                name: data.list[0].receivingName,
                province: data.list[0].province,
                tel: data.list[0].mobile
              }
              this.addressData = addressDatas
              this.addr_Data.name = addressDatas.name
              this.addr_Data.tel = addressDatas.tel
              this.addr_Data.areaCode = addressDatas.areaCode
              this.addr_Data.orderAddr = addressDatas.province + addressDatas.city + addressDatas.county + addressDatas.addressDetail
              console.log(response)
            }
          }
        })
        .catch(error => {
          this.$toast('提交失败')
        })
    },
    formatPrice() {
      //详情页价格
      return (this.orderlist.goods.selectedSkuComb.price / 100).toFixed(2)
    },
    hePrice() {
      //总价格
      return this.orderlist.goods.selectedSkuComb.price * this.orderlist.goods.selectedNum
    },
    onSubmit() {
      //提交订单
      this.disabled = true
      if (this.addressData.length == 0) {
        this.$toast('请添加收货地址！！！')
        this.disabled = false
      } else {
        let params = new FormData()
        params.append('goodsId', this.orderlist.goods.goodsId)
        params.append('orderSpecs', this.orderlist.specifications.name)
        params.append('orderCount', this.orderlist.goods.selectedNum)
        params.append('orderPrice', this.formatPrice())
        params.append('orderReceiver', this.addr_Data.name)
        params.append('orderPhone', this.addr_Data.tel)
        params.append('orderAddr', this.addr_Data.orderAddr)
        params.append('orderAreaCode', this.addr_Data.areaCode)
        let res = this.$api
          .post('https://hc.gztv.com/order/api/shop/order/save', params)
          .then(response => {
            const { data, code, msg } = response.data
            console.log(response)
            if (code === 200) {
              this.$toast('提交' + msg)
              this.disabled = false
              this.$router.push({
                name: 'cashier',
                query: {
                  tradeNo: data.orderNo,
                  price: this.hePrice(),
                  orderDatas: JSON.stringify(this.$route.query.orderDatas)
                }
              })
            }
          })
          .catch(error => {
            this.$toast('提交失败')
            this.disabled = false
          })
        // }
      }
    },
    addressNewly(addr) {
      //保存收货地址
      let params = new FormData()
      params.append('userId', '123')
      params.append('receivingName', addr.name)
      params.append('province', addr.province)
      params.append('city', addr.city)
      params.append('area', addr.county)
      params.append('address', addr.addressDetail)
      params.append('mobile', addr.tel)
      params.append('areaCode', addr.areaCode)
      let res = this.$api
        .post('https://hc.gztv.com/order/api/shop/usr/addr/save', params)
        .then(response => {
          const { data, code, msg } = response.data
          console.log(response)
          if (code === 200) {
            this.addressApi()
          }
        })
        .catch(error => {
          this.$toast('提交收货地址失败')
        })
    },
    onSave(content) {
      //提交收货地址
      this.addressData = content
      this.addressfrom = false
      this.addr_Data.name = content.name
      this.addr_Data.tel = content.tel
      this.addr_Data.areaCode = content.areaCode
      this.addr_Data.orderAddr = content.province + content.city + content.county + content.addressDetail
      this.addressNewly(content)
      console.log(content)
    },
    addressClick() {
      //点击添加收货地址
      this.addressfrom = true
    },
    addressEditClick() {
      //点击收货地址编辑
      this.addressfrom = true
      this.addressInfo = this.addressData
    }
  }
  // beforeEnter: (to, from, next) => {
  //   // ...
  //   this.orderlist = JSON.stringify(to.query.orderDatas);
  //   next();
  // }
}
</script>
<style scoped>
/deep/ .van-card__content {
  text-align: left;
}
.orderbox {
  background-color: #f3f3f3;
  padding-bottom: 10px;
}
.order-be {
  background-color: white;
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-top: 10px;
  overflow: hidden;
}
.order-address {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.order-phonr {
  font-size: 14px;
}
.meti {
  display: flex;
  flex-direction: row;
  align-items: center;
}
#popups {
  width: 320px;
  border-radius: 10px;
  padding-top: 14px;
}
.shouj-address {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
}
.ds {
  padding-bottom: 3px;
  background: #fff url('../assets/bjd.png') -7px bottom repeat-x;
  background-size: 64px 5px;
}
</style>
