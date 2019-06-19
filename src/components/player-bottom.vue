<template>
  <div id="player">
    <div id="player-simple">
      <div class="music-name" @click="showPlayerPage">
        <img :src="currentSongCover" alt="cover" width="10%" height="10%">
        <span>{{ currentSongName }}</span>
      </div>
      <img
        @click="playOrPause"
        width="27px"
        height="27px"
        :src="isPlay ? require('@/assets/pause1&black&000&64x64.png') : require('@/assets/play1&black&000&64x64.png')"
      >
    </div>
    <transition name="slide">
      <player-page v-if="isShowPlayerPage"></player-page>
    </transition>
    <audio :src="currentSongUrl" :id="audioElementId"></audio>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import PlayerPage from "@/components/player-page";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      isShowPlayerPage: false
    };
  },
  components: {
    "player-page": PlayerPage
  },
  computed: {
    ...mapGetters("player", {
      isPlay: "isPlay",
      currentSongUrl: "getSongUrl",
      currentSongName: "getSongName",
      currentSongCover: "getSongCover",
      audioElementId: "getAudioElementId",
      audioElement: "getAudioElement"
    })
  },
  methods: {
    ...mapActions("player", ["playOrPause"]),
    showPlayerPage() {
      this.isShowPlayerPage = true;
    }
  },
  mounted() {
    let vm = this;
    
    vm.$on("hiddenPlayerPage", () => {
      vm.isShowPlayerPage = false;
    });
    (function() {
      document.addEventListener(
        "WeixinJSBridgeReady",
        function() {
          vm.audioElement.play();
          vm.audioElement.pause();
        },
        false
      );
    })();
  }
};
</script>
<style scoped>
.slide-enter {
  transform: translateY(100%);
}
.slide-enter-to {
  transform: translateY(0);
}
.slide-leave-to {
  transform: translateY(100%);
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

#player {
  width: var(--rootWidth);
  background: #f8f8f8;
  height: var(--bottomPlayerHeight);
  position: fixed;
  bottom: 0;
  z-index: var(--playerBottomZindex);
}
#player-simple {
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  align-items: center;
}
#player-simple > * {
  cursor: pointer;
}
.music-name {
  width: 80%;
  font-size: 6vw;
  display: flex;
  align-items: center;
}
.music-name > img {
  border-radius: 5px;
}
.music-name > span {
  margin-left: 15px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
