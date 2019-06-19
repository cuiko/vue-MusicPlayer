<template>
  <div id="actionSheet-musicInfo">
    <transition name="fade">
      <div class="actionSheet-model" v-if="isShow" @click="cancel"></div>
    </transition>
    <transition name="slide">
      <div class="actionSheet-main" v-if="isShow">
        <div class="actionSheet__info">
          <div class="info-songName">{{ musicInfo.name }}</div>
          <div class="info-songer">
            <span>{{ filterSonger(musicInfo.ar || musicInfo.artists, "未知歌手", "name", " ", "id").res }}</span>
          </div>
        </div>
        <div class="actionSheet__nextBtn" @click="add2NextSong(musicInfo); complete()">下一首播放</div>
        <div class="actionSheet__addBtn" @click="add2PlayList(musicInfo); complete()">添加到播放列表</div>
        <div class="actionSheet__cancelBtn" @click="cancel">取消</div>
      </div>
    </transition>
  </div>
</template>
<script>
import { setTimeout } from "timers";
import tools from "@/utils/tools";

import { mapActions } from "vuex";

export default {
  props: {
    musicInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions("player", ["add2NextSong", "add2PlayList"]),
    cancel() {
      this.isShow = false;
      setTimeout(() => {
        this.bus.$emit("showActionSheet-musicInfo", false);
      }, 200);
    },
    complete() {
      this.cancel();
      this.bus.$emit("showToast", true, "已添加到播放列表");
    },
    filterSonger: tools.filterSonger
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

#actionSheet-musicInfo {
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
  color: #000;
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
.actionSheet__info {
  cursor: default !important;
}
.info-songer {
  font-size: 3vw;
  color: #8a8a8a;
}
.actionSheet__cancelBtn {
  margin-top: 10px;
}
</style>
