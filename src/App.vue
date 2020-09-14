<template>
  <div id="app">
    <!-- <transition :name="transitionName"> -->
      <!-- <keep-alive> -->
        <router-view class="Router"></router-view>
      <!-- </keep-alive> -->
    <!-- </transition> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionName: "slide-right"
    };
  },
  created() {
    this.$nextTick(() => {
      // 禁用右键
      document.oncontextmenu = new Function("event.returnValue=false");
      // 禁用选择
      document.onselectstart = new Function("event.returnValue=false");
    });
  },
  watch: {
    $route(to, from) {
      let isBack = this.$router.isBack;
      if (isBack) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
      this.$router.isBack = false;
    }
  }
};
</script>
<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

.Router {
  position: absolute;
  width: 100%;
  transition: all 0.3s ease;
overflow:hidden;
}

.slide-left-enter, .slide-right-leave-active {
  opacity: 1;

}

.slide-left-leave-active, .slide-right-enter {
  opacity: 1;
}
</style>
