<template>
  <div id="playlists">
    <div class="playlists-item" v-for="item in searchData" :key="item.id" @click="goPlaylist(item.id)">
      <div class="playlists-left">
        <cover-list :width="'15vw'" :height="'15vw'" :cover-img="item.coverImgUrl"></cover-list>
      </div>
      <div class="playlists-right">
        <div class="playlists-name">{{ item.name }}</div>
        <div class="playlists-remark">
          <span class="playlists-length">{{ item.trackCount }}首歌&nbsp;</span>
          <span class="playlists-creator" v-if="item.creator">by&nbsp;{{ item.creator.nickname }}</span>
          <span class="playlists-times">
            &nbsp;播放
            <number :num="item.playCount">次</number>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CoverList from "@/components/cover-list";
import number from "@/components/number";

import http from "@/utils/http";

export default {
  components: {
    "cover-list": CoverList,
    number
  },
  props: ["data", "keywords"],
  data() {
    return {
      searchData: []
    };
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
    search(keywords) {
      http
        .fetchGet("/search", {
          keywords: keywords,
          type: 1000
        })
        .then(res => {
          this.searchData = res.data.result.playlists;
        });
    },
    goPlaylist(id) {
      this.$router.push({
        name: "/playlist",
        params: {
          id
        }
      });
    }
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
#playlists {
  width: 90%;
  min-height: 100vh;
  margin: 0 auto;
}
.playlists-item {
  height: 18vw;
  margin: 5px 0;
  display: flex;
  align-items: center;
}
.playlists-left {
  flex: 0 0 auto;
  width: auto;
}
.playlists-right {
  max-width: 80%;
  margin-left: 10px;
}
.playlists-name {
  font-size: 5vw;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.playlists-remark {
  font-size: 3vw;
  color: #8a8a8a;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.playlists-remark > span {
  white-space: nowrap;
}
.playlists-creator {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>