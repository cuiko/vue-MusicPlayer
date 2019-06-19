<template>
  <div id="actionSheet-musicList">
    <transition name="fade">
      <div class="actionSheet-musicList-Model" v-if="isShow" @click="cancel"></div>
    </transition>
    <transition name="slide">
      <div class="actionSheet-musicList-content" v-if="isShow">
        <div class="actionSheet-musicList-top">
          <div class="musicList-playModel" @click="changePlayModel">
            <span class="musicList-playModel__icon">
              <img
              :src="def.play_model[currentPlayModel].icon_black"
              width="24px"
              height="24px"
            >
            </span>
            <span class="musicList-playModel__title">{{ currentPlayModel }}({{ musicList.length }})</span>
          </div>
          <div class="musicList-delete" @click="showActionSheet_modal">
            <img src="@/assets/bin&8a8a8a&32x32.png" width="20px" height="20px">
          </div>
        </div>
        <div class="actionSheet-musicList-main" v-if="musicList.length">
          <div class="musicList-block" v-for="item in musicList" :key="item.id">
            <div class="musicList-block__info" @click="requestSongApi({ id:item.id, playList:musicList });">
              <img style="margin-right: 1vw;" v-if="item.id == currentSongId" src="@/assets/playing&d81e06&64x64.png" width="26px" height="26px">
              <span class="musicList-block__name" :class="{ playing: item.id == currentSongId }">{{ item.name }}</span>
              <span class="musicList-block__songer" :class="{ playing: item.id == currentSongId }">&nbsp;-&nbsp;{{ filterSonger(item.artists || item.ar, "未知歌手", "name", " / ", "id").res }}</span>
            </div>
            <div class="musicList-block__delBtn" @click="removeSongFromPlayList(item.id)">
              <img src="@/assets/close&8a8a8a&64x64.png" width="24px" height="24px">
            </div>
          </div>
        </div>
        <div class="actionSheet-musicList-bottom" @click="cancel">
          关闭
        </div>
      </div>
    </transition>
    <action-sheet--modal
      v-if="isShowActionSheet_modal"
      title="提示"
      content="确定清空当前播放列表?"
      :confirm-event="emptyPlayList"
    ></action-sheet--modal>
  </div>
</template>
<script>
import { setTimeout } from 'timers';
import { mapGetters, mapMutations, mapActions } from "vuex";

import tools from "@/utils/tools";
import def from "@/config/def";

import ActionSheet_Modal from "@/components/interaction/actionSheet-modal";

export default {
  data() {
    return {
      isShow: false,
      isShowActionSheet_modal: false,
      def
    }
  },
  components: {
    "action-sheet--modal": ActionSheet_Modal
  },
  computed: {
    ...mapGetters("player", {
      musicList: "getPlayList",
      currentPlayModel: "getCurrentPlayModel",
      currentSongId: "getSongId"
    })
  },
  mounted() {
    let vm = this;
    
    vm.isShow = true;
    vm.$on("showactionSheet-modal", function(boolean) {
      vm.isShowActionSheet_modal = boolean;
    });
  },
  methods: {
    ...mapMutations("player", ["changePlayModel", "emptyPlayList"]),
    ...mapActions("player", ["requestSongApi", "removeSongFromPlayList"]),
    filterSonger: tools.filterSonger,
    cancel() {
      this.isShow = false;
      setTimeout(() => {
        this.bus.$emit("showActionSheet-musicList", false);
      }, 200);
    },
    showActionSheet_modal() {
      this.isShowActionSheet_modal = true;
    }
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
  transition: all .2s;
}

#actionSheet-musicList {
  --borderColor: #eee;
  --contentHeight: 60vh;
  --topHeight: 12vw;
  --mainHeight: calc(var(--contentHeight) - var(--topHeight) - var(--bottomHeight));
  --bottomHeight: 15vw;
  --mainBlockHeight: 10vw;
  --safeAreaPadding: 4vw;
  --titleFontSize: 4vw;
  --subtitleFontSize: calc(var(--titleFontSize) - 1vw);

  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: var(--actionSheetZindex);
}
.actionSheet-musicList-Model {
  height: 100vh;
  background: rgba(0, 0, 0, .1);
}
.actionSheet-musicList-content {
  position: absolute;
  height: var(--contentHeight);
  border-radius: 30px 30px 0 0;
  bottom: 0;
  background: #fff;
  color: #000;
}
.actionSheet-musicList-top {
  position: absolute;
  top: 0;
  height: var(--topHeight);
  padding: 0 var(--safeAreaPadding);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--borderColor);
}
.musicList-playModel {
  width: auto;
  display: flex;
  align-items: center;
}
.musicList-playModel > span {
  margin-right: 2vw;
}
.musicList-playModel__icon {
  display: flex;
  align-items: center;
}
.musicList-playModel__title {
  font-size: var(--titleFontSize);
  white-space: nowrap;
  letter-spacing: .5px;
}
.musicList-delete {
  width: 12%;
  border-left: 1px solid var(--borderColor);
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.actionSheet-musicList-main {
  overflow-x: hidden;
  overflow-y: scroll;
  height: var(--mainHeight);
  margin-top: var(--topHeight);
  margin-bottom: var(--bottomHeight);
  padding-left: var(--safeAreaPadding);
}
.musicList-block {
  height: var(--mainBlockHeight);
  padding-right: var(--safeAreaPadding);
  border-bottom: 1px solid var(--borderColor);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.musicList-block__info {
  flex-grow: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.musicList-block__name {
  font-size: var(--titleFontSize);
  font-weight: 400;
}
.musicList-block__songer {
  font-size: var(--subtitleFontSize);
  color: #999;
}
.musicList-block__delBtn {
  width: auto;
  padding: 1.5vw 0 1.5vw 1.5vw;
  margin-left: 2vw;
}
.actionSheet-musicList-bottom {
  position: absolute;
  background: #fff;
  bottom: 0;
  height:      var(--bottomHeight);
  line-height: var(--bottomHeight);
  text-align: center;
  font-weight: 400;
  font-size: 5vw;
  border-top: 1px solid var(--borderColor);
}
</style>