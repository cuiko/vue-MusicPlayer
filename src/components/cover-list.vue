<template>
  <div id="cover-list" :style="styleObj" lazy="loaded">
    <span class="leftTop">
      <slot name="left-top"></slot>
    </span>
    <span class="rightTop">
      <slot name="right-top"></slot>
    </span>
    <span class="leftBottom">
      <slot name="left-bottom"></slot>
    </span>
    <span class="rightBottom">
      <slot name="right-bottom"></slot>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    coverImg: {
      type: String
    },
    width: {
      type: String,
      default: "120px"
    },
    height: {
      type: String,
      default: "120px"
    }
  },
  data() {
    return {
      styleObj: {
        width: this.width,
        height: this.height,
        backgroundImage: `url(${this.coverImg})`,
        minWidth: this.width,
        minHeight: this.height
      }
    };
  },
  watch: {
    backgroundImage(val) {
      this.styleObj.backgroundImage = `url(${val})`;
    }
  },
  computed: {
    backgroundImage() {
      return this.coverImg;
    }
  }
};
</script>
<style scoped>
#cover-list {
  border-radius: 5px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  box-shadow: inset 0px 40px 40px -50px rgba(80, 80, 80, 0.9),
    inset 0px -40px 40px -50px rgba(80, 80, 80, 0.9);
}
#cover-list > span {
  position: absolute;
  color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  text-shadow: 0px 1px 3px #333;
}
.leftTop {
  left: 2px;
}
.rightTop {
  right: 2px;
}
.leftBottom {
  left: 2px;
  bottom: 0;
}
.rightBottom {
  right: 2px;
  bottom: 0;
}
</style>
