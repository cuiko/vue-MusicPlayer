<template>
  <div id="songs">
    <div class="songs-item" v-for="item in searchData" :key="item.id">
      <!-- 拷贝结果数组，防止修改播放列表时影响到结果数组 -->
      <div
        class="songs-left"
        @click="requestSongApi({ id:item.id, playList:[].concat(searchData) })"
      >
        <span v-if="item.id == currentSongId" class="isPlaying">
          <img src="@/assets/playing&d81e06&64x64.png" width="26px" height="26px">
        </span>
        <div class="songs-content">
          <div class="songs-name">
            <span :class="{ playing: item.id == currentSongId }">{{ item.name }}</span>
            <span
              :class="{ playing: item.id == currentSongId }"
              style="color: var(--remarkColor);"
              v-if="item.alias.length"
            >&nbsp;({{ item.alias[0] }})</span>
          </div>
          <div class="songs-remark">
            <span>{{ filterSonger(item.artists, "未知歌手", "name", " / ", "id").res }}</span>
            <span>&nbsp;-&nbsp;{{ item.album.name }}</span>
          </div>
        </div>
      </div>
      <div class="songs-right" @click="showActionSheet(item)">
        <img src="@/assets/more_column&grey&bfbfbf&32x32.png" width="27.5px" height="27.5px;">
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/utils/http";
import tools from "@/utils/tools";

import { mapGetters, mapActions } from "vuex";

export default {
  props: ["data", "keywords"],
  data() {
    return {
      searchData: []
    };
  },
  computed: {
    ...mapGetters("player", {
      currentSongId: "getSongId"
    })
  },
  watch: {
    keywords(val) {
      this.search(val);
    },
    data(val) {
      this.searchData = val;
    },
    searchData(val) {
      this.searchData = val;
    }
  },
  methods: {
    ...mapActions("player", ["requestSongApi"]),
    search(keywords) {
      http
        .fetchGet("/search", {
          keywords: keywords,
          type: 1
        })
        .then(res => {
          this.searchData = res.data.result.songs;
        });
    },
    showActionSheet(item) {
      this.bus.$emit("showActionSheet-musicInfo", true, item);
    },
    filterSonger: tools.filterSonger
  },
  created() {
    let vm = this;
    
    if (vm.data) {
      vm.searchData = vm.data;
    } else if (vm.keywords) {
      vm.search(vm.keywords);
    }
  }
};
</script>
<style scoped>
#songs {
  --remarkColor: #8a8a8a;

  width: 90%;
  min-height: 100vh;
  margin: 0 auto;
}
.songs-item {
  height: 16vw;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}
.songs-left {
  flex: 0 0 auto;
  max-width: 80%;
  height: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}
.songs-content {
}
.isPlaying {
  margin-right: 3vw;
}
.songs-name {
  font-size: 4.5vw;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.songs-remark {
  font-size: 3.5vw;
  color: var(--remarkColor);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.songs-right {
  width: auto;
  margin: 0 10px;
}
</style>