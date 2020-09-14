<!--  -->
<template>
  <div class="orderbox">
    <van-search
      v-model="value"
      placeholder="搜索我的订单"
      show-action
      shape="round"
      @search="onSearch"
      class="searchs"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <van-tabs v-model="active" swipeable animated :sticky="false" :offset-top="0" @change="tabsfn">
      <van-tab title="全部">
        <div :style="order_content">
          <van-list
            v-model="isUpLoading"
            :finished="upFinished"
            :immediate-check="false"
            :finished-text="finished_text"
            @load="onLoadList"
          >
            <div v-if="orderList.length!=0">
              <div class="order-be" v-for="(item,index) in orderList" :key="index">
                <van-cell>
                  <div class="meti">
                    <span style="font-weight: bold;">订单号:{{item.orderNo}}</span>
                    <span style="font-weight: bold;color: red;">{{item.orderStatusName}}</span>
                  </div>
                </van-cell>
                <van-card
                  :num="item.orderCount"
                  :price="formatPrice(item.orderPrice)"
                  desc="描述信息"
                  title="商品标题"
                  thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
                  @click="order_details(item)"
                  style="background-color:white"
                >
                  <!-- <div slot="tags">
              <van-tag plain type="danger">7天无理由退换货</van-tag>
                  </div>-->
                </van-card>
                <div slot="footer" class="order_but">
                  <van-button v-if="item.orderStatus==3" plain type="default" size="small" round @click="returngood(item)">申请退货</van-button>
                </div>
              </div>
            </div>
            <div v-else class="order_wxg">您还没相关的订单</div>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="待付款">
        <div class="order-content" :style="order_content">
          <van-list
            v-model="isUpLoading"
            :finished="upFinished"
            :immediate-check="false"
            :finished-text="finished_text"
            @load="onLoadList"
          >
            <div v-if="orderList.length!=0">
              <div class="order-be" v-for="(item,index) in orderList" :key="index">
                <van-cell>
                  <div class="meti">
                    <span style="font-weight: bold;">订单号:{{item.orderNo}}</span>
                    <span style="font-weight: bold;color: red;">{{item.orderStatusName}}</span>
                  </div>
                </van-cell>
                <van-card
                  :num="item.orderCount"
                  :price="formatPrice(item.orderPrice)"
                  desc="描述信息"
                  title="商品标题"
                  thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
                  @click="order_details"
                  style="background-color:white"
                >
                  <!-- <div slot="tags">
              <van-tag plain type="danger">7天无理由退换货</van-tag>
                  </div>-->
                </van-card>
                <div slot="footer" class="order_but">
                  <!-- <van-button plain type="default" size="small" round @click="returngood">申请退货</van-button> -->
                </div>
              </div>
            </div>
            <div v-else class="order_wxg">您还没相关的订单</div>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="待收货">
        <div class="order-content" :style="order_content">
          <van-list
            v-model="isUpLoading"
            :finished="upFinished"
            :immediate-check="false"
            :finished-text="finished_text"
            @load="onLoadList"
          >
            <div v-if="orderList.length!=0">
              <div class="order-be" v-for="(item,index) in orderList" :key="index">
                <van-cell>
                  <div class="meti">
                    <span style="font-weight: bold;">订单号:{{item.orderNo}}</span>
                    <span style="font-weight: bold;color: red;">{{item.orderStatusName}}</span>
                  </div>
                </van-cell>
                <van-card
                  :num="item.orderCount"
                  :price="formatPrice(item.orderPrice)"
                  desc="描述信息"
                  title="商品标题"
                  thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
                  @click="order_details"
                  style="background-color:white"
                >
                  <!-- <div slot="tags">
              <van-tag plain type="danger">7天无理由退换货</van-tag>
                  </div>-->
                </van-card>
                <div slot="footer" class="order_but">
                  <!-- <van-button plain type="default" size="small" round @click="returngood">申请退货</van-button> -->
                </div>
              </div>
            </div>
            <div v-else class="order_wxg">您还没相关的订单</div>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="已完成">
        <div class="order-content" :style="order_content">
          <van-list
            v-model="isUpLoading"
            :finished="upFinished"
            :immediate-check="false"
            :finished-text="finished_text"
            @load="onLoadList"
          >
            <div v-if="orderList.length!=0">
              <div class="order-be" v-for="(item,index) in orderList" :key="index">
                <van-cell>
                  <div class="meti">
                    <span style="font-weight: bold;">订单号:{{item.orderNo}}</span>
                    <span style="font-weight: bold;color: red;">{{item.orderStatusName}}</span>
                  </div>
                </van-cell>
                <van-card
                  :num="item.orderCount"
                  :price="formatPrice(item.orderPrice)"
                  desc="描述信息"
                  title="商品标题"
                  thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
                  @click="order_details(item)"
                  style="background-color:white"
                >
                  <!-- <div slot="tags">
              <van-tag plain type="danger">7天无理由退换货</van-tag>
                  </div>-->
                </van-card>
                <div slot="footer" class="order_but">
                  <van-button plain type="default" size="small" round @click="returngood(item)">申请退货</van-button>
                </div>
              </div>
            </div>
            <div v-else class="order_wxg">您还没相关的订单</div>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
    <van-overlay :show="show" z-index="999">
      <div class="wrapper">
        <!-- <div class="block" /> -->
        <van-loading size="24px" vertical color="#fff">加载中...</van-loading>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      orderNo: "",
      order_content: {
        width: "100%",
        height: "auto",
        "overflow-y": "auto"
      },
      orderList: [],
      show: false,
      finished_text: "我是有底线的",
      isUpLoading: false, // 上拉加载
      upFinished: false, // 上拉加载完毕
      pageSize: 15, // 每页条数
      pageIndex: 1, // 页码
      value:''
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
    this.order_content.height = window.innerHeight - 98 + "px";
    this.orderListApi(this.active);
  },
  //方法集合
  methods: {
    onSearch(){
      this.$toast(this.value);
      this.$router.push({name:"search_details",query:{searchValue:this.value}});
    },
    formatPrice(price) {
      //详情页价格
      return price.toFixed(2);
    },
    tabsfn(name) {
      console.log(name);
      this.active = name;
      this.pageIndex = 1;
      this.orderList = [];
      this.upFinished = false;
      this.isUpLoading = true;
      this.show = true;
      this.orderListApi(this.active);
    },
    orderListApi(active) {
      const _self = this;
      switch (active) {
        case 0:
          let params = new FormData();
          params.append("page", _self.pageIndex);
          params.append("limit", _self.pageSize);
          _self.axiosApi("https://hc.gztv.com/order/api/shop/order/list", params);
          break;
        case 1:
          let params1 = new FormData();
          params1.append("orderStatus", 0);
          params1.append("page", _self.pageIndex);
          params1.append("limit", _self.pageSize);
          _self.axiosApi("https://hc.gztv.com/order/api/shop/order/list", params1);
          break;
        case 2:
          let params2 = new FormData();
          params2.append("orderStatus", 2);
          params2.append("page", _self.pageIndex);
          params2.append("limit", _self.pageSize);
          _self.axiosApi("https://hc.gztv.com/order/api/shop/order/list", params2);
          break;
        case 3:
          let params3 = new FormData();
          params3.append("orderStatus", 3);
          params3.append("page", _self.pageIndex);
          params3.append("limit", _self.pageSize);
          _self.axiosApi("https://hc.gztv.com/order/api/shop/order/list", params3);
          break;
        default:
          break;
      }
    },
    axiosApi(url, params) {
      const _self = this;
      let res = this.$api
        .post(url, params)
        .then(response => {
          const { data, code } = response.data;
          if (code === 200) {
            if (data.list == null || data.list.length === 0) {
              _self.upFinished = true;
              _self.finished_text = "";
              _self.orderList = [];
              _self.show = false;
              return;
            }
            if (data.list.length < _self.pageSize) {
              _self.upFinished = true;
              // _self.isUpLoading = false;
            }
            if (_self.pageIndex === 1) {
              _self.orderList = data.list;
            } else {
              _self.orderList = _self.orderList.concat(data.list);
            }
            setTimeout(() => {
              _self.show = false;
            }, 600);
          }
          console.log(_self.orderList);
        })
        .catch(error => {
          this.$toast("加载失败");
        })
        .finally(() => {
          _self.isDownLoading = false;
          _self.isUpLoading = false;
        });
    },
    onLoadList() {
      this.pageIndex++;
      this.orderListApi(this.active);
    },
    returngood(item) {
      this.$router.push({ name: "returngoods",query:{orderDetails:item}});
    },
    order_details(item) {
      this.$router.push({ name: "order_details",query:{orderDetails:item}});
    }
  }
};
</script>
<style scoped>
.order_but {
  display: flex;
  justify-content: flex-end;
  margin-right: 16px;
  padding-bottom: 10px;
}
.order-content {
  padding-bottom: env(safe-area-inset-bottom);
}
.b {
  width: 100%;
  background-color: greenyellow;
  height: 200px;
}
.c {
  width: 100%;
  background-color: blue;
  height: 200px;
}
.d {
  width: 100%;
  background-color: yellow;
  height: 200px;
}
.orderbox {
  background-color: #f3f3f3;
  /* padding-bottom: 10px;   */
}
.order-be {
  background-color: white;
  width: 94%;
  height: auto;
  border-radius: 10px;
  margin-top: 10px;
  overflow: hidden;
  margin: 10px auto;
}
.meti {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
.van-loading__text {
  color: #fff;
}
.order_wxg {
  margin-top: 2vh;
}
.van-list {
  width: 100%;
}
</style>
