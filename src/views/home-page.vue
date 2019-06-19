<template>
  <div class="home-page">
    <!-- 搜索框 -->
    <search></search>
    <!-- 导航内容：排行榜、推荐歌单 -->
    <transition name="fade">
      <index-nav v-show="isShowIndexNav"></index-nav>
    </transition>
  </div>
</template>
<script>
import Search from "@/components/search";
import indexNav from "@/components/switchTab-index/indexNav";

export default {
  name: "home-page",
  components: {
    search: Search,
    "index-nav": indexNav
  },
  data() {
    return {
      isShowIndexNav: true
    }
  },
  mounted() {
    let vm = this;
    
    vm.$on("showList", function(boolean) {
      vm.isShowIndexNav = boolean;
    });
  }
};
</script>
<style scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

#home-page {
  width: 100%;
  height: 100%;
  max-width: var(--rootWidth);
  min-height: 100%;
  z-index: var(--subpageZindex);
  overflow-x: hidden;
  position: absolute;
  top: 0;
}
</style>