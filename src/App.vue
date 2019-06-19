<template>
  <div id="app">
    <!-- 路由 -->
    <transition :name="transitionName">
      <keep-alive :include="keepAlives">
        <router-view class="Router"></router-view>
      </keep-alive>
    </transition>
    <!-- 底部播放器 -->
    <player></player>
    <!-- 交互 -->
    <action-sheet--music-info
      :music-info="actionSheetData_musicInfo"
      v-if="isShowActionSheet_musicInfo"
    ></action-sheet--music-info>
    <transition name="fade">
      <toast v-if="isShowToast">{{ toastMsg }}</toast>
    </transition>
  </div>
</template>

<script>
import Player from "@/components/player-bottom";
import ActionSheet_MusicInfo from "@/components/interaction/actionSheet-musicInfo";
import Toast from "@/components/interaction/toast";

import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      isShowActionSheet_musicInfo: false,
      isShowToast: false,
      toastMsg: "",
      transitionName: "slide-right",
      actionSheetData_musicInfo: {}
    };
  },
  components: {
    player: Player,
    toast: Toast,
    "action-sheet--music-info": ActionSheet_MusicInfo
  },
  computed: {
    ...mapGetters("other", {
      keepAlives: "getKeepAlives"
    }),
  },
  watch: {
    $route(to, from) {
      if (this.$router.isBack) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
      this.$router.isBack = false;
    }
  },
  mounted() {
    let vm = this;
    
    // 应用页面：tab-songs rank-Page playlist-Page
    vm.bus.$on("showActionSheet-musicInfo", function(boolean, data) {
      vm.isShowActionSheet_musicInfo = boolean;
      vm.actionSheetData_musicInfo = data;
    });
    // 应用页面：player-page
    vm.bus.$on("showToast", function(boolean, msg) {
      vm.isShowToast = boolean;
      vm.toastMsg = msg;
    });
  }
};
</script>

<style>
:root {
  --rootWidth: 100vw;
  --bottomPlayerHeight: 10vw;

  /* 1vw ≈ 5px */

  /* z-index */
  /* 子页面 */
  --subpageZindex: 5;
  /* 底部播放器 */
  --playerBottomZindex: 5;
  /* 播放器页面 */
  --playerPageZindex: 10;
  /* 交互列表 */
  --actionSheetZindex: 12;
  /* 通知信息 */
  --toastZindex: 20;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translateX(100%);
}
.slide-left-leave-active,
.slide-right-enter {
  transform: translateX(100%);
}

#app {
  width: var(--rootWidth);
  height: 100%;
  font-size: 2.2vw;
  font-family: "Arial", "Microsoft YaHei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
.Router {
  transition: all 0.4s ease;
}
.playing {
  color: #d81e06 !important;
}
div[lazy="loaded"],
img[lazy="loaded"] {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: imgFadeIn;
}

@keyframes imgFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
