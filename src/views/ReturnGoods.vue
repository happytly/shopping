<!--  -->
<template>
  <div class="orderbox">
    <div class="order-be">
      <van-cell>
        <div class="meti">
          <span style="font-weight: bold;">订单号:{{order_details.orderNo}}</span>
          <!-- <span style="font-weight: bold;color: red;">{{formatPrice(order_details.orderPrice)}}</span> -->
        </div>
      </van-cell>
      <van-card
        :num="order_details.orderCount"
        :price="formatPrice(order_details.orderPrice)"
        :desc="order_details.orderSpecs"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
        style="background-color:white"
      ></van-card>
    </div>
    <!-- <van-cell-group>
      <van-field v-model="username" label="联系人" placeholder="请输入联系人"/>
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" error-message="" />
    </van-cell-group> -->
    <van-address-edit
          :area-list="areaList"
          show-postal
          :address-info="addressInfo"
          :area-columns-placeholder="['请选择', '请选择', '请选择']"
          @save="onSave"
        />
  </div>
</template>

<script>
import areaList from '../assets/area'
export default {
  data() {
    return {
      areaList,
      addressInfo:{},
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
    $(".orderbox").height($(window).height());
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
    onSave(content){//提交收货地址

      console.log(content);
      this.th_addr(content);
    },
    th_addr(addr){
      let params = new FormData();
      params.append("userId",'123');
      params.append("id",this.$route.query.orderDetails.id);
      params.append("orderRejectName",addr.name);
      params.append("orderRejectPhone",addr.tel);
      params.append("orderRejectAddr",addr.province+addr.city+addr.county+addr.addressDetail);
      params.append("orderRejectCode",addr.areaCode);
      let res=this.$api.post('https://hc.gztv.com/order/api/shop/order/reject',params).then(response=>{
        const {data,code,msg}=response.data;
        console.log(response);

        if(code === 200){
          this.$toast("提交退货地址成功");
          this.$router.push({ name: "myorder" });
        }
      }).catch(error=>{
        this.$toast("提交退货地址失败");
      })
    }
  },
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
.meti {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.order-be {
  background-color: white;
  width: 100%;
  height: auto;
  border-radius: 0px;
  margin-bottom: 10px;
  overflow: hidden;
}
</style>
