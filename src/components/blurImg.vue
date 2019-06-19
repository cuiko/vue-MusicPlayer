<template>
  <div class="model" :style="styleObj">
    <!-- <slot></slot> -->
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: "100vw"
    },
    height: {
      type: String,
      default: "100vh"
    },
    coverImg: {
      type: String
    },
    zIndex: {
      type: [Number, String],
      default: "auto"
    }
  },
  data() {
    return {
      styleObj: {
        width: this.width,
        height: this.height,
        "z-index": this.zIndex,
        backgroundImage: "url(" + this.coverImg + ")"
      }
    };
  },
  watch: {
    coverImg(val) {
      Object.assign(this.styleObj, {
        backgroundImage: "url(" + val + ")"
      });
    }
  }
};
</script>
<style scoped>
.model {
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  transform: scale(2);
  filter: blur(25px);
  position: relative;
  overflow: hidden;
}
.model::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #888;
  opacity: 0.7;
  filter: blur(150px);
}
</style>
