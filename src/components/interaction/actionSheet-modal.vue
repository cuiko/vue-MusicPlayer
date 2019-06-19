<template>
  <transition name="fade">
    <div id="actionSheet-modal" v-if="isShow">
      <div class="actionSheet-model"></div>
      <div class="actionSheet-main">
        <div class="actionSheet__title">{{ title }}</div>
        <div class="actionSheet__content">{{ content }}</div>
        <div class="actionSheet__btn">
          <div
            class="btn--cancel"
            :style="{ color: cancelColor }"
            v-if="showCancel"
            @click="cancelEvent(); completeEvent(); hidden();"
          >{{ cancelText }}</div>
          <div
            class="btn--confirm"
            :style="{ color: confirmColor }"
            @click="confirmEvent(); completeEvent(); hidden();"
          >{{ confirmText }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { setTimeout } from "timers";

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    cancelColor: {
      type: String,
      default: "#000"
    },
    confirmText: {
      type: String,
      default: "确定"
    },
    confirmColor: {
      type: String,
      default: "#576B95"
    },
    confirmEvent: {
      type: Function,
      default() {}
    },
    cancelEvent: {
      type: Function,
      default() {}
    },
    completeEvent: {
      type: Function,
      default() {}
    }
  },
  methods: {
    hidden() {
      this.isShow = false;
      setTimeout(() => {
        this.$parent.$emit("showactionSheet-modal", false);
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
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 200ms;
}

#actionSheet-modal {
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
  width: 80%;
  background: #fff;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  font-size: 3.5vw;
  transform: translate(-50%, -50%);
}
.actionSheet__title {
  padding: 3vw 20%;
  font-weight: bold;
  color: #000;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.actionSheet__content {
  padding: 0 20%;
  margin-bottom: 3vw;
  color: #666;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.actionSheet__btn {
  display: flex;
  flex-wrap: nowrap;
  border-top: 1px solid #efefef;
}
.actionSheet__btn > div {
  padding: 2vw 0;
  font-weight: bold;
  border-top: 1px solid #efefef;
}
.btn--cancel {
  border-right: 1px solid #efefef;
}
</style>
