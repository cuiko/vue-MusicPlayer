<template>
  <div id="actionSheet-default">
    <transition name="fade">
      <div class="actionSheet-model" v-if="isShow" @click="cancel"></div>
    </transition>
    <transition name="slide">
      <div class="actionSheet-main" v-if="isShow">
        <div
          class="actionSheet__block"
          :style="{ color: item.color }"
          v-for="(item, index) in init"
          :key="index"
          @click="item.callBack()"
        >{{ item.title }}</div>
        <div class="actionSheet__cancelBtn" @click="cancel">取消</div>
      </div>
    </transition>
  </div>
</template>
<script>
import { setTimeout } from "timers";

export default {
  props: {
    init: {
      type: Array,
      required: true,
      default() {
        return [
          {
            title: "A",
            color: "#000",
            callBack() {
              console.log("A");
            }
          }
        ];
      }
    }
  },
  methods: {
    cancel() {
      this.isShow = false;
      setTimeout(() => {
        this.bus.$emit("showactionSheet-default", false);
      }, 200);
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  mounted() {
    this.isShow = true;
  }
};
</script>
<style scoped>
.slide-enter,
.slide-leave-to {
  transform: translateY(100%);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.slide-enter-active,
.fade-enter-active,
.slide-leave-active,
.fade-leave-active {
  transition: all 0.2s;
}

#actionSheet-default {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: var(--actionSheetZindex);
}
.actionSheet-model {
  height: 100vh;
  background: rgba(33, 33, 33, 0.7);
}
.actionSheet-main {
  position: absolute;
  bottom: 0;
  background: #eee;
}
.actionSheet-main > div {
  padding: 10px;
  min-height: 25px;
  font-size: 5.3vw;
  margin-bottom: 1px;
  text-align: center;
  background: #fff;
  cursor: pointer;
}
.actionSheet__cancelBtn {
  margin-top: 10px;
  color: #000;
}
</style>
