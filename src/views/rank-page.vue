<template>
  <div id="rank-page">
    <div id="header-bar">
      <div class="back-btn" @click="goBack">
        <img src="@/assets/left&fff&64x64.png" width="25px" height="25px">
        <div class="back-text">排行榜</div>
      </div>
    </div>
    <div class="cover" :style="{ background: listColor }">
      <img :src="data.coverImgUrl" lazy="loaded">
    </div>
    <div class="header-content">
      <div class="header-blank"></div>
      <div class="header-title" :style="{ background: gradientColor }">
        <h1>{{ data.name }}</h1>
        <p>
          <number :num="data.subscribedCount"></number>
        </p>
      </div>
    </div>
    <ul class="musicList" ref="list" :style="{ background: listColor }">
      <template v-if="isReady">
        <li
          class="music-block"
          v-for="(item, index) in data.tracks"
          :key="item.id"
          :style="{ background: listColor }"
        >
          <div v-if="item.id == currentSongId" class="music-index">
            <img src="@/assets/playing&d81e06&64x64.png" width="26px" height="26px">
          </div>
          <div v-else class="music-index">{{ index + 1 }}</div>
          <!-- 拷贝结果数组，防止修改播放列表时影响到结果数组 -->
          <div
            class="music-info"
            @click="requestSongApi({ id:item.id, playList:[].concat(data.tracks) });"
          >
            <div class="music-name" :class="{ playing: item.id == currentSongId }">{{ item.name }}</div>
            <div class="music-songer">
              <span>{{ filterSonger(item.ar, "未知歌手", "name", " / ", "id").res }}</span>
              <span v-if="item.al.name">&nbsp;-&nbsp;{{ item.al.name }}</span>
            </div>
          </div>
          <div class="action-more" @click="showActionSheet(item)">
            <img src="@/assets/more_row&black&2c2c2c&32x32.png" width="25px" height="25px">
          </div>
        </li>
      </template>
      <!-- 默认 -->
      <template v-else>
        <li class="def-block" v-for="index in defNum" :key="index">
          <div class="def-left">{{ index }}</div>
          <div class="def-right">
            <div>
              <span class="def-p" style="width: 50%"></span>
            </div>
            <div>
              <span class="def-p" style="width: 30%"></span>
            </div>
            <div>
              <span class="def-p" style="width: 20%"></span>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import http from "@/utils/http";
import tools from "@/utils/tools";

import number from "@/components/number";

export default {
  name: "rank-page",
  components: {
    number
  },
  data() {
    return {
      r: 112,
      g: 86,
      b: 59,
      isReady: false,
      data: {},
      defNum: 8
    };
  },
  computed: {
    ...mapGetters("player", {
      currentSongId: "getSongId"
    }),
    gradientColor() {
      return (
        "-webkit-linear-gradient(top, rgba(0, 0, 0, 0), rgb(" +
        this.r +
        "," +
        this.g +
        "," +
        this.b +
        "))"
      );
    },
    listColor() {
      return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    }
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
  mounted() {
    let vm = this;
    
    http
      .fetchGet("playlist/detail", {
        id: vm.$route.params.id
      })
      .then(res => {
        vm.isReady = true;
        vm.data = res.data.playlist;
      });
    // 滚动隐藏
    window.onscroll = function() {
      if (document.getElementById("header-bar")) {
        document
          .getElementById("header-bar")
          .setAttribute(
            "style",
            `background: rgba(${vm.r}, ${vm.g}, ${vm.b}, ${
              vm.$refs.list.getBoundingClientRect().top > 0
                ? window.scrollY / vm.$refs.list.offsetTop
                : 1
            })`
          );
      }
    };
  },
  destroyed() {
    window.onscroll = null;
  }
};
</script>
<style scoped>
#rank-page {
  --remarkColor: #aaa;

  width: 100%;
  max-width: var(--rootWidth);
  min-height: 100%;
  z-index: var(--subpageZindex);
  overflow-x: hidden;
  position: absolute;
  top: 0;
  color: #fff;
  background: #fff;
}
#header-bar {
  position: fixed;
  top: 0;
  height: 10vw;
  display: flex;
  align-items: center;
  z-index: var(--subpageZindex);
}
.back-btn {
  width: auto;
  margin-left: 1vw;
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
}
.back-text {
  font-size: 3.5vw;
}
.cover {
  position: absolute;
}
.cover,
.cover img {
  width: 100%;
  height: 100vw;
  max-width: var(--rootWidth);
  max-height: var(--rootWidth);
}
.header-content {
  width: 100%;
  height: 100vw;
  max-width: var(--rootWidth);
  max-height: var(--rootWidth);
  position: relative;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--remarkColor);
}
.header-blank {
  flex-grow: 1;
}
.header-title {
  padding: 10px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.header-title h1 {
  font-size: 7vw;
  font-weight: bold;
}
.header-title p {
  font-size: 5vw;
}
/* list */
.musicList {
  list-style: none;
  position: relative;
  border-top: 1px solid var(--remarkColor);
  padding-bottom: calc(var(--bottomPlayerHeight) + 1px);
}
.music-block {
  height: 12vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  margin-left: 12%;
  cursor: pointer;
  border-bottom: 1px solid var(--remarkColor);
}
.music-index {
  width: 12%;
  margin-left: -12%;
  font-size: 3vw;
  text-align: center;
}
.music-info {
  flex-grow: 1;
  overflow: hidden;
}
.music-name {
  font-size: 4vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.music-songer {
  color: var(--remarkColor);
  font-size: 3vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.action-more {
  width: 40px;
  height: 25px;
  text-align: center;
}
.def-block {
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
}
.def-p {
  background: #999;
  height: 10px;
  margin: 5px 0;
  float: left;
}
.def-left {
  width: 50px;
  text-align: center;
}
.def-right {
  flex-grow: 1;
  height: 60px;
  border-bottom: 1px solid var(--remarkColor);
}
.def-right > div {
  overflow: hidden;
}
</style>
