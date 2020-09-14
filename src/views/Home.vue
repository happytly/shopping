<!--  -->
<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="thumb in goodss.thumb" :key="thumb">
        <img :src="thumb" />
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goodss.goodsName }}</div>
        <div class="goods-price" v-text="formatPrice(goodss.default_price)"></div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：免运费</van-col>
        <!-- <van-col span="14">剩余：{{ goods.remain }}</van-col> -->
      </van-cell>
    </van-cell-group>

    <!-- <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
        <template slot="title">
          <span class="van-cell-text">有赞的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />
    </van-cell-group>-->

    <!-- <van-cell-group class="goods-cell-group">
      <van-cell title="查看商品详情" is-link @click="sorry" />
    </van-cell-group>-->
    <!-- <van-sticky>
      <div class="details-text">商品详情</div>
    </van-sticky>-->
    <van-divider>商品详情</van-divider>
    <div class="goods-details" v-html="goodss.goodsContent"></div>
    <van-goods-action safe-area-inset-bottom>
      <van-goods-action-button type="danger" @click="sorry">立即抢购</van-goods-action-button>
    </van-goods-action>
    <van-sku v-model="show" :sku="sku" :goods="goods" :goods-id="goodss.uuid" :quota="0" :hide-stock="false" :show-add-cart-btn="false" :safe-area-inset-bottom="true" @buy-clicked="onBuyClicked" />
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      show: false,
      goodsId: '946755',
      sku: {},
      goods: {
        // 默认商品 sku 缩略图
        picture: require('../assets/logon.png')
      },
      // initialSku: {
      //   s1: "30349",
      //   selectedNum: 1
      // },
      goodss: []
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
    this.commodity()
    // let that = this;
    // that.form.resetFields();
    // history.pushState(null, null, document.URL); //首页加载时候先置空
    // window.addEventListener("popstate", function(e) {
    //   //后退事件置空
    //   if (
    //     document.URL.split("/")[document.URL.split("/").length - 1] == "home"
    //   ) {
    //     history.pushState(null, null, document.URL);
    //     let len = history.length;
    //     history.go(-(len - 1));
    //   }
    // });
  },
  //方法集合
  methods: {
    async commodity() {
      //请求商品信息
      const _self = this
      console.log(_self)
      let res = await this.$api
        .get('/goods/getGoods?id=' + _self.$route.query.goodsId)
        .then(response => {
          const { data, code } = response.data
          if (code === '200') {
            _self.goodss = data.goodss
            _self.sku = data.sku
          }
        })
        .catch(error => {
          this.$toast('加载失败')
        })
    },
    formatPrice() {
      //详情页价格
      return '¥' + parseInt(this.goodss.default_price).toFixed(2)
    },
    onBuyClicked(skuData) {
      console.log(skuData)
      //点击立即购买
      this.show = false
      let guig = {}
      for (let index = 0; index < this.sku.tree[0].v.length; index++) {
        if (this.sku.tree[0].v[index].id === skuData.selectedSkuComb.s1) {
          guig['id'] = this.sku.tree[0].v[index].id
          guig['imgUrl'] = this.sku.tree[0].v[index].imgUrl
          guig['name'] = this.sku.tree[0].v[index].name
          guig['previewImgUrl'] = this.sku.tree[0].v[index].previewImgUrl
          break
        }
      }
      let orderData = {
        goods: skuData,
        specifications: guig,
        goodss: this.goodss
      }
      this.$router.push({
        name: 'order',
        query: { orderDatas: JSON.stringify(orderData) }
      })
    },
    sorry() {
      //立即抢购
      // this.$toast("暂无后续逻辑~");
      this.show = true
    }
  }
  // beforeRouteLeave(to, from, next) {
  //   console.log(to);
  //   console.log(from);
  //   debugger
  //   if (to.path === '/cashier') {
  //       next('/');
  //   }else{
  //     return next()
  //   }
  // }
}
</script>
<style lang="stylus" scoped>
/deep/ .van-button{
  border-radius:0;
}
/deep/.van-sku-row{
  text-align:left;
}
.goods {
  padding-bottom: 40px;
}

.goods-swipe img {
  width: 100%;
  display: block;
}

.goods-title {
  font-size: 16px;
}

.goods-price {
  color: #f44;
}

.goods-express {
  color: #999;
  font-size: 12px;
  padding: 5px 15px;
}

.goods-cell-group {
  margin: 15px 0;
}

.goods-cell-group .van-cell__value {
  color: #999;
}

.goods-tag {
  margin-left: 5px;
}

.goods-details img {
  display: block;
  width: 100%;
}

.details-text {
  width: 100%;
  padding: 10px 0;
  color: white;
  font-size: 14px;
  background: -webkit-linear-gradient(left, #ff6034, #ee0a24);
  background: linear-gradient(to right, #ff6034, #ee0a24);
}
</style>
