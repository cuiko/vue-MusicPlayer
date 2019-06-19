<template>
  <div id="switchTab-searchRes">
    <div
      v-for="(key,index) in tabList"
      ref="item"
      :key="index"
      class="tab-block"
      :class="{active: currentTab == key.name}"
      @click="selected(key.name, index)"
    >
      <span>{{ key.title }}</span>
    </div>
    <span class="bottomLine" :style="lineStyleObj"></span>
  </div>
</template>
<script>
export default {
  props: ["tabList"],
  methods: {
    selected(name, index) {
      this.currentTab = name;
      this.lineStyleObj.left = this.$refs.item[index].offsetLeft + "px";
      this.lineStyleObj.width =
        this.$refs.item[index].getBoundingClientRect().width + "px";

      this.$parent.$emit("switchTab", name);
    }
  },
  mounted() {
    let vm = this;

    vm.lineStyleObj.width =
      this.$refs.item[0].getBoundingClientRect().width + "px";
  },
  data() {
    return {
      currentTab: this.tabList[0].name,
      currentIndex: 0,
      lineStyleObj: {
        width: "0px",
        left: "0px"
      }
    };
  }
};
</script>
<style scoped>
#switchTab-searchRes {
  --tabHeight: 8vw;

  height: var(--tabHeight);
  overflow-x: auto;
  display: flex;
  align-items: center;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #ddd;
  z-index: 1;
}
#switchTab-searchRes::-webkit-scrollbar {
  display: none;
}
.tab-block {
  flex: 0 0 auto;
  width: auto;
  box-sizing: border-box;
  height: 100%;
  line-height: var(--tabHeight);
  display: inline-block;
  text-align: center;
  padding: 0 2vw;
  font-weight: 600;
  transition: color 0.3s;
  cursor: pointer;
}
.active {
  color: red;
}
.bottomLine {
  position: absolute;
  bottom: 0;
  left: 0;
  display: inline-block;
  border-bottom: 1.5px solid red;
  transition: all 0.3s;
}
</style>
