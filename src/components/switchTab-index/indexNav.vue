<template>
  <div id="index-nav">
    <switch-tab :tabList="switchTab"></switch-tab>
    <transition name="nav-fade">
      <!-- <keep-alive> -->
        <component :is="currentTabComponent"></component>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>
<script>
import SwitchTab from "./switchTab";
import TabCommend from "./tab-commend";
import TabRank from "./tab-rank";

export default {
  data() {
    return {
      switchTab: [
        {
          title: "排行榜",
          name: "rank"
        },
        {
          title: "推荐",
          name: "commend"
        }
      ],
      currentTab: "rank"
    };
  },
  mounted() {
    let vm = this;
    
    vm.$on("currentTab", name => {
      vm.currentTab = name;
    });
  },
  computed: {
    currentTabComponent() {
      return "tab-" + this.currentTab.toLowerCase();
    }
  },
  components: {
    "switch-tab": SwitchTab,
    "tab-commend": TabCommend,
    "tab-rank": TabRank
  }
};
</script>
<style scoped>
.nav-fade-enter,
.nav-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.nav-fade-leave-to {
  position: absolute;
}
.nav-fade-enter-active,
.nav-fade-leave-active {
  transition: all 0.5s;
}
</style>
