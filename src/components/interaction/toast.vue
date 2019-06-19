<template>
  <div id="toast">
    <slot>这是一条消息</slot>
  </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
  props: {
    duration: {
      type: Number,
      default: 1000
    }
  },
  created() {
    let vm = this;
    
    setTimeout(() => {
      vm.bus.$emit("showToast", false);
    }, vm.duration);
  }
};
</script>
<style scoped>
#toast {
  position: fixed;
  width: auto;
  z-index: var(--toastZindex);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 3.5vw;
  padding: 10px 15px;
  background: rgba(33, 33, 33, .7);
  color: #fff;
  border-radius: 5px;
}
</style>