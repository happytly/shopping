<!--  -->
<template>
  <div class="orderbox">
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
              <van-button
                v-if="item.orderStatus==3"
                plain
                type="default"
                size="small"
                round
                @click="returngood(item)"
              >申请退货</van-button>
            </div>
          </div>
        </div>
        <div v-else class="order_wxg">您还没相关的订单</div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order_content: {
        width: "100%",
        height: "auto",
        "overflow-y": "auto"
      },
      orderList: [],
      finished_text: "我是有底线的",
      isUpLoading: false, // 上拉加载
      upFinished: false, // 上拉加载完毕
      pageSize: 15, // 每页条数
      pageIndex: 1, // 页码
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
    this.order_content.height = window.innerHeight+ "px";
    this.oreder_list();
  },
  //方法集合
  methods: {
    oreder_list(){
      const _self = this;
      let params = new FormData();
      params.append("page", _self.pageIndex);
      params.append("limit", _self.pageSize);
      params.append("userId", '123');
      params.append("search", );
      _self.axiosApi("https://hc.gztv.com/order/api/shop/order/list", params);
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
              // _self.show = false;
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
            // setTimeout(() => {
            //   _self.show = false;
            // }, 600);
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
      this.oreder_list();
    },
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
