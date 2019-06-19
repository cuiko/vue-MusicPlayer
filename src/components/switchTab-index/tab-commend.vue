<template>
  <div id="tab-commend">
    <swiper :width="95" :height="'50vw'" :contents="bannerContent"></swiper>
    <div class="playlist">
      <div class="playlist-block" v-for="item in playlist" :key="item.id" @click="goPlaylist(item.id)">
        <cover-list
          :width="'30vw'" :height="'30vw'" :cover-img="item.picUrl"
        >
          {{item.playCount}}
          <template v-slot:right-top>
            <img src="@/assets/play_icon&fff&32x32.png" width="16px" height="16px">
            <number :num="item.playCount"></number>
          </template>
        </cover-list>
        <p class="playlist-block__title">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/utils/http";

import swiper from "@/components/swiper";
import CoverList from "@/components/cover-list";
import number from "@/components/number";

export default {
  props: [],
  components: {
    swiper,
    number,
    "cover-list": CoverList
  },
  methods: {
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
    
    http.fetchGet("/banner").then(res => {
      vm.bannerContent = res.data.banners;
    });
    http.fetchGet("/personalized").then(res => {
      vm.playlist = res.data.result;
    });
  },
  data() {
    return {
      playlist: [],
      bannerContent: {}
    };
  }
};
</script>
<style scoped>
.playlist {
  padding: 5px;
  margin-bottom: var(--bottomPlayerHeight);
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  overflow: hidden;
}
.playlist-block {
  width: 30%;
  float: left;
  margin: 5px 0;
}
.playlist-block__title {
  font-size: 3vw;
  padding: 2px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  cursor: pointer;
}
</style>
