<template>
  <div id="cover-description">
    <blur-img :width="'100%'" :height="'100%'" :cover-img="coverImg"></blur-img>
    <div>{{ description }}</div>
  </div>
</template>
<script>
import BlurImg from "@/components/blurImg";

export default {
  props: {
    tags: {
      type: Array,
      default: ["vue"]
    },
    coverImg: {
      type: String,
      default: require("@/assets/logo.png")
    },
    title: {
      type: String,
      default: "vue music"
    },
    description: {
      type: String,
      default: "vue music"
    }
  },
  components: {
    "blur-img": BlurImg
  }
};
</script>
<style scoped>
#cover-description {
  width: 100vw;
  height: 100vh;
  z-index: 100;
  position: fixed;
  top: 0;
  overflow: hidden;
}
</style>