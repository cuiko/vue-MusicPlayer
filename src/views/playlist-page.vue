<template>
  <div id="playlist-page">
    <div class="playlist-info">
      <blur-img :width="'100%'" :height="'100%'" :cover-img="data.coverImgUrl"></blur-img>
      <div class="info-content">
        <div class="info-top" ref="headerBar">
          <blur-img :width="'100%'" :height="'200px'" :cover-img="data.coverImgUrl"></blur-img>
          <div class="back-content">
            <div class="back-icon" @click="goBack">
              <img src="@/assets/left&fff&64x64.png" width="25px" height="25px">
            </div>
            <div class="back-title">歌单</div>
            <div class="func-icon">
              <img src="@/assets/more_column&white&fff&32x32.png" width="25px" height="25px">
            </div>
          </div>
        </div>
        <div class="info-main">
          <div class="content-left">
            <cover-list :width="'100%'" :height="'100%'" :cover-img="data.coverImgUrl">
              <template v-slot:right-top>
                <img src="@/assets/play_icon&fff&32x32.png" width="16px" height="16px">
                <number :num="data.playCount"></number>
              </template>
            </cover-list>
          </div>
          <div class="content-right">
            <div class="playlist-title">{{ data.name }}</div>
            <div class="playlist-creator" v-if="data.creator">
              <span class="creator-avatar">
                <img :src="data.creator.avatarUrl" alt="avatarUrl" width="100%" height="100%">
              </span>
              <span class="creator-nickname">{{ data.creator.nickname }}</span>
              <img src="@/assets/right&fff&64x64.png" width="16px" height="16px">
            </div>
            <div class="playlist-description">
            <!-- <div class="playlist-description" @click="isShowCoverDescription = !isShowCoverDescription"> -->
              <span class="playlists-nickname">{{ data.description }}</span>
              <img src="@/assets/right&fff&64x64.png" width="16px" height="16px">
            </div>
          </div>
        </div>
        <div class="info-bottom">
          <div class="info-bottom__block">
            <div>
              <img src="@/assets/comment&fff&32x32.png" width="30px" height="30px">
            </div>
            <div>
              <number :num="data.commentCount"></number>
            </div>
          </div>
          <div class="info-bottom__block">
            <div>
              <img src="@/assets/share2&fff&32x32.png" width="30px" height="30px">
            </div>
            <div>
              <number :num="data.shareCount"></number>
            </div>
          </div>
          <div class="info-bottom__block">
            <div>
              <img src="@/assets/download&fff&32x32.png" width="30px" height="30px">
            </div>
            <div>下载</div>
          </div>
          <div class="info-bottom__block">
            <div>
              <img src="@/assets/select1&fff&32x32.png" width="30px" height="30px">
            </div>
            <div>多选</div>
          </div>
        </div>
      </div>
    </div>
    <div class="playlist-list">
      <div class="list-top" ref="playAll" :class="{ 'isFixed-playAll': isFixed }">
        <div class="list-top__left">
          <img src="@/assets/play2&black2c2c2c&32x32.png" width="22px" height="22px">
          <span @click="requestSongApi({ id:data.tracks[0].id, playList:[].concat(data.tracks) });">
            <span class="playAll-title">播放全部</span>
            <span class="playAll-num">(共{{ isReady ? data.tracks.length : 0 }}首)</span>
          </span>
        </div>
        <div class="list-top__right">
          <span class="plusIcon">+</span>
          <span>收藏(<number :num="data.subscribedCount"></number>)</span>
        </div>
      </div>
      <ul class="list-content" :class="{ 'isFixed-list': isFixed }">
        <li class="song-block" v-for="(item, index) in data.tracks" :key="item.id">
          <div v-if="item.id == currentSongId" class="song-index">
            <img src="@/assets/playing&d81e06&64x64.png" width="26px" height="26px">
          </div>
          <div v-else class="song-index">{{ index + 1 }}</div>
          <!-- 拷贝结果数组，防止修改播放列表时影响到结果数组 -->
          <div
            class="song-info"
            @click="requestSongApi({ id:item.id, playList:[].concat(data.tracks) });"
          >
            <div class="song-name" :class="{ playing: item.id == currentSongId }">{{ item.name }}</div>
            <div class="song-songer">
              <span>{{ filterSonger(item.ar, "未知歌手", "name", " / ", "id").res }}</span>
              <span v-if="item.al.name">&nbsp;-&nbsp;{{ item.al.name }}</span>
            </div>
          </div>
          <div class="action-more" @click="showActionSheet(item)">
            <img src="@/assets/more_column&grey&bfbfbf&32x32.png" width="27.5px" height="27.5px;">
          </div>
        </li>
      </ul>
    </div>
    <cover-description v-if="isShowCoverDescription"
      :tags="data.tags"
      :cover-img="data.coverImgUrl"
      :description="data.description"
      :title="data.name"
    ></cover-description>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import http from "@/utils/http";
import tools from "@/utils/tools";

import number from "@/components/number";
import BlurImg from "@/components/blurImg";
import CoverList from "@/components/cover-list";
import CoverDescription from "@/components/cover-description";

export default {
  name: "playlist-page",
  components: {
    "blur-img": BlurImg,
    "cover-list": CoverList,
    "cover-description": CoverDescription,
    number
  },
  data() {
    return {
      isReady: false,
      isFixed: false,
      isShowCoverDescription: false,
      data: {}
    };
  },
  computed: {
    ...mapGetters("player", {
      currentSongId: "getSongId"
    })
  },
  methods: {
    ...mapActions("player", ["requestSongApi"]),
    filterSonger: tools.filterSonger,
    goBack() {
      this.$router.goBack();
    },
    showActionSheet(item) {
      this.bus.$emit("showActionSheet-musicInfo", true, item);
    }
  },
  created() {
    let vm = this;
    
    http
      .fetchGet("playlist/detail", {
        id: vm.$route.params.id
      })
      .then(res => {
        vm.isReady = true;
        vm.data = res.data.playlist;
      });
    // 滚动固定
    window.onscroll = function() {
      vm.isFixed = Math.floor(vm.$refs.playAll.getBoundingClientRect().top) <= Math.floor(vm.$refs.headerBar.offsetHeight);
    };
  },
  destroyed() {
    window.onscroll = null;
  }
};
</script>
<style scoped>
.isFixed-list {
  height: calc(100vh - var(--barHeight) - var(--barHeight) - var(--bottomPlayerHeight));
  overflow-y: scroll;
  border-radius: 7vw 7vw 0 0;
  /* position: absolute !important;
  top: var(--barHeight); */
  padding-top: var(--barHeight);
}
.isFixed-playAll {
  position: absolute !important;
  top: 0 !important;
  z-index: 1;
}

#playlist-page {
  --remarkColor: #aaa;
  --barHeight: 10vw;
  --savePadding: 5%;

  width: 100%;
  max-width: var(--rootWidth);
  min-height: 100%;
  z-index: var(--subpageZindex);
  position: absolute;
  top: 0;
  overflow-x: hidden;
}
/* 上半部分-信息部分 start */
.playlist-info {
  height: 90vw;
  color: #fff;
  position: relative;
}
.info-content {
  height: 100%;
  position: absolute;
  top: 0;
}
  /* 信息部分 头部 */
.info-top {
  overflow: hidden;
  /* background: white; */
  height: var(--barHeight);
  position: fixed;
  z-index: 1;
  opacity: 1;
}
.back-content {
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--savePadding);
}
.back-content > div {
  width: auto;
}
.back-title {
  font-size: 3.5vw;
  font-weight: 600;
}
  /* 信息部分 主体 */
.info-main {
  margin-top: var(--barHeight);
  padding: 6vw var(--savePadding);
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.info-main > div {
  height: 40vw;
}
.content-left {
  width: 40vw;
}
.content-right {
  width: 45vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.playlist-title {
  height: auto;
  font-size: 5vw;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.playlist-creator,
.playlist-description {
  font-size: 3vw;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.playlist-creator > span,
.playlist-description > span {
  white-space: nowrap;
}
.creator-avatar {
  width: 8vw;
  overflow: hidden;
  border-radius: 100%;
  margin-right: 1vw;
}
.playlists-nickname {
  overflow: hidden;
  text-overflow: ellipsis;
}
  /* 信息部分 底部 */
.info-bottom {
  padding: 4vw var(--savePadding);
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.info-bottom__block {
  width: auto;
  padding: 0 3vw;
  font-size: 3vw;
}
.info-bottom__block > div {
  text-align: center;
}
/* 上半部分-信息部分 end */

/* 下半部分-列表部分 start */
.playlist-list {
  padding-bottom: calc(var(--bottomPlayerHeight) + 1px);
  position: relative;
  border-radius: 7vw 7vw 0 0;
}
  /* 播放全部bar start */
.list-top {
  transition: none;
  position: relative;
  height: var(--barHeight);
  border-radius: 7vw 7vw 0 0;
  background: #fff;
  overflow: hidden;
  padding: 0 3%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.list-top__left {
  display: flex;
  align-items: center;
}
.list-top__right {
  font-size: 3.5vw;
  background: #d81f06;
  color: #fff;
  width: 45%;
  height: 70%;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.5px;
}
.plusIcon {
  font-size: 7vw;
}
.playAll-title {
  margin: 0 5px 0 10px;
  color: #2c2c2c;
  font-size: 5vw;
  font-weight: 600;
}
.playAll-num {
  color: var(--remarkColor);
  font-size: 4vw;
}
  /* 播放全部bar end */
  /* 歌曲列表 start */
.list-content {
  list-style: none;
  background: #fff;
}
.song-block {
  height: 12vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  margin-left: 12%;
  cursor: pointer;
}
.song-index {
  width: 12%;
  font-size: 4vw;
  margin-left: -12%;
  text-align: center;
}
.song-info {
  flex-grow: 1;
  overflow: hidden;
}
.song-name {
  font-size: 4.5vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.song-songer {
  color: var(--remarkColor);
  font-size: 3.5vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.action-more {
  width: 20%;
  text-align: center;
}
  /* 歌曲列表 end */
/* 下半部分-列表部分 end */
</style>