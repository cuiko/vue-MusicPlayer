<template>
  <div id="dots">
    <span
      class="dot"
      v-for="index in length"
      :key="index"
      :class="{ active: index - 1 == currentIndex}"
      @click="jump(index - 1)"
    ></span>
  </div>
</template>
<script>
export default {
  props: {
    currentIndex: {
      type: Number,
      required: true
    },
    length: {
      type: Number,
      required: true
    }
  },
  methods: {
    jump(index) {
      this.$parent.$emit("jump", index);
    }
  }
};
</script>
<style scoped>
#dots {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
}
.dot {
  width: 2vw;
  height: 2vw;
  border-radius: 100%;
  background: rgba(233, 233, 233, 0.3);
  margin: 0 7px;
  cursor: pointer;
}
.active {
  background: #efefef;
}
</style>
