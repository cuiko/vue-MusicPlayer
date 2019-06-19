<template>
  <div id="player--page">
    <blur-img :cover-img="currentSongCover" :z-index="10"></blur-img>
    <div class="player-main">
      <div class="player-header">
        <div class="goback" @click="goBack">
          <img src="@/assets/down&fff&64x64.png" width="32px" height="32px">
        </div>
        <div class="player-songs--info">
          <div class="player-songname">{{ currentSongName }}</div>
          <div class="player-songer">
            <span>{{ filterSonger(currentSongSonger, "未知歌手", "name", "/", "id").res }}</span>
          </div>
        </div>
        <div class="share">
          <img src="@/assets/share1&fff&64x64.png" width="28px" height="28px">
        </div>
      </div>
      <div class="player-cover">
        <img :src="currentSongCover" :class="isPlay ? '' : 'paused'">
      </div>
      <div class="player-controller">
        <div class="controller__progressBar">
          <span
            class="progressBar__time"
            :class="[{ time_touched: isTouch }]"
          >{{ isTouch ? changingTime : currentTime }}</span>
          <div id="progressBar-main" ref="progressBar" :class="[{ progressBar_touched: isTouch }]">
            <div
              class="progressBar__played"
              :class="[{ progressBar_touched: isTouch }]"
              :style="{ width: (isTouch ? changingTime_per : currentPlayed_per ) * 100 + '%' }"
            >
              <div
                class="progressBar__dot"
                :class="[{ dot_touched: isTouch }]"
                @touchstart="touch_start"
                @touchmove="touch_move"
                @touchend="touch_end"
              ></div>
            </div>
          </div>
          <span class="progressBar__time">{{ currentSongDuration }}</span>
        </div>
        <div class="controller-block">
          <div @click="tapModelBtn">
            <img :src="def.play_model[currentPlayModel].icon_white" width="32px" height="32px">
          </div>
          <div class="controller-block__main">
            <img @click="prev" src="@/assets/prev&fff&64x64.png" width="32px" height="32px">
            <img
              @click="playOrPause"
              :src="isPlay ? require('@/assets/pause2&white&fff&128x128.png') : require('@/assets/play2&white&fff&128x128.png')"
              width="64px"
              height="64px"
            >
            <img @click="next" src="@/assets/next&fff&64x64.png" width="32px" height="32px">
          </div>
          <div @click="showActionSheet_musicList">
            <img src="@/assets/playlist&fff&64x64.png" width="32px" height="32px">
          </div>
        </div>
      </div>
    </div>
    <action-sheet--music-list v-if="isShowActionSheet_musicList"></action-sheet--music-list>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import tools from "@/utils/tools";
import def from "@/config/def";

import BlurImg from "@/components/blurImg";
import ActionSheet_MusicList from "@/components/interaction/actionSheet-musicList";

export default {
  data() {
    return {
      isShowActionSheet_musicList: false,
      def
    };
  },
  components: {
    "blur-img": BlurImg,
    "action-sheet--music-list": ActionSheet_MusicList
  },
  computed: {
    ...mapGetters("player", {
      isPlay: "isPlay",
      isTouch: "isTouch",
      currentSongName: "getSongName",
      currentSongCover: "getSongCover",
      currentSongSonger: "getSongSonger",
      currentSongDuration: "getDuration",
      currentPlayModel: "getCurrentPlayModel",
      currentTime: "getCurrentTime_format",
      changingTime: "getChangingTime_format",
      currentPlayed_per: "getCurrentTime_per",
      changingTime_per: "getChangingTime_per",
      playModels: "getPlayModels"
    })
  },
  methods: {
    ...mapMutations("player", ["changePlayModel"]),
    ...mapActions("player", [
      "next",
      "prev",
      "playOrPause",
      "touch_start",
      "touch_move",
      "touch_end"
    ]),
    tapModelBtn() {
      this.changePlayModel();
      this.bus.$emit("showToast", true, this.currentPlayModel);
    },
    showActionSheet_musicList() {
      this.isShowActionSheet_musicList = true;
    },
    goBack() {
      this.$parent.$emit("hiddenPlayerPage");
    },
    filterSonger: tools.filterSonger
  },
  mounted() {
    let vm = this;
    
    vm.bus.$on("showActionSheet-musicList", function(boolean) {
      vm.isShowActionSheet_musicList = boolean;
    });
  }
};
</script>
<style scoped>
#player--page {
  --zIndex: var(--playerPageZindex);
  --savePadding: 4%;
  --dotSize: 3vw;

  position: fixed;
  background: #ccc;
  top: 0;
  overflow: hidden;
}
.player-main {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  padding: 0 var(--savePadding);
  z-index: calc(var(--zIndex) + 1);
}
.player-header {
  height: 50px;
  margin: var(--savePadding) 0;
  display: flex;
  justify-content: space-between;
}
.player-header > div {
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.player-songs--info {
  flex-grow: 1;
  text-align: center;
  padding: 0 10px;
}
.player-songname {
  font-size: 6vw;
  letter-spacing: 1.5px;
  font-weight: 400;
  color: #fff;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.player-songer {
  font-size: 3.7vw;
  letter-spacing: 1px;
  color: #eee;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.player-cover {
  position: absolute;
  width: 60vw;
  height: 60vw;
  border-radius: 100%;
  overflow: hidden;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 100px 20px #e8e8e8;
}
.player-cover > img {
  width: 100%;
  height: 100%;
  animation: rotateCover 22s linear infinite;
}
.paused {
  animation-play-state: paused !important;
}
.player-controller {
  max-width: calc(100% - var(--savePadding) * 2);
  margin: var(--savePadding) 0;
  position: absolute;
  bottom: 0;
}
.player-controller > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  margin: 10px 0;
}
.controller__progressBar > .progressBar__time {
  font-size: 3.5vw;
  color: #efefef;
  transition: all 0.1s;
}
.controller__progressBar > #progressBar-main {
  flex-grow: 1;
  height: 3px;
  margin: 0 4vw;
  background: rgba(230, 230, 230, 0.5);
}
#progressBar-main > .progressBar__played {
  height: 3px;
  background: rgba(240, 240, 240, 0.9);
  position: relative;
  transition: all 0.1s;
}
.progressBar__played > .progressBar__dot {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  width: var(--dotSize);
  height: var(--dotSize);
  border-radius: 100%;
  background: #fff;
  transition: all 0.1s;
  box-sizing: content-box;
}
.progressBar__dot::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(var(--dotSize) * 2.5);
  height: calc(var(--dotSize) * 2.5);
  border-radius: calc(var(--dotSize) * 2.5);
  transform: translate(-50%, -50%);
}
/* 点击进度条 dot后样式改变 start */
.time_touched {
  color: #fff !important;
}
.progressBar_touched {
  height: 4px !important;
}
.dot_touched {
  width: calc(var(--dotSize) + 1vw) !important;
  height: calc(var(--dotSize) + 1vw) !important;
}
/* end */
.controller-block > div {
  width: auto;
}
.controller-block__main {
  flex-grow: 1;
  margin: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

@keyframes rotateCover {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
