<template>
  <div id="switchTab-index">
    <div
      class="tab-block"
      :class="{ active: currentTab == item.name }"
      v-for="(item, index) in tabList"
      :key="index"
      @click="selected(item.name)"
    >{{ item.title }}</div>
  </div>
</template>
<script>
export default {
  props: ["tabList"],
  data() {
    return {
      currentTab: this.tabList[0].name
    };
  },
  methods: {
    selected(name) {
      this.currentTab = name;
      this.$parent.$emit("currentTab", name);
    }
  }
};
</script>
<style scoped>
#switchTab-index {
  --blockFontSize: 5vw;

  background: #fff;
  display: flex;
}
.tab-block {
  flex-grow: 1;
  height: 55px;
  line-height: 55px;
  text-align: center;
  font-size: var(--blockFontSize);
  cursor: pointer;
  color: #999;
}
.active {
  color: #000;
}

@media screen and (min-width: 700px) {
    #switchTab-index {
        --blockFontSize: 3vw;
    }
}
</style>
