<template>
  <div id="suggest">
    <div class="suggest-block" v-if="orders.includes('songs')">
      <div class="block-name">单曲 ></div>
      <songs :data="searchData.result.songs"></songs>
    </div>
    <div class="suggest-block" v-if="orders.includes('playlists')">
      <div class="block-name">歌单 ></div>
      <playlists :data="searchData.result.playlists"></playlists>
    </div>
    <div class="suggest-block" v-if="orders.includes('mvs')">
      <div class="block-name">视频 ></div>
      <mvs :data="searchData.result.mvs"></mvs>
    </div>
    <div class="suggest-block" v-if="orders.includes('artists')">
      <div class="block-name">歌手 ></div>
      <artists :data="searchData.result.artists"></artists>
    </div>
    <div class="suggest-block" v-if="orders.includes('albums')">
      <div class="block-name">专辑 ></div>
      <albums :data="searchData.result.albums"></albums>
    </div>
  </div>
</template>
<script>
import songs from "./tab-songs";
import albums from "./tab-albums";
import artists from "./tab-artists";
import playlists from "./tab-playlists";
import mvs from "./tab-mvs";

import http from "@/utils/http";

export default {
  components: {
    songs,
    albums,
    artists,
    playlists,
    mvs
  },
  data() {
    return {
      searchData: [],
      orders: []
    };
  },
  props: ["keywords"],
  watch: {
    keywords(val) {
      this.search(val);
    },
    searchData(val) {
      this.searchData = val;
    }
  },
  methods: {
    search(keywords) {
      http
        .fetchGet("/search/suggest", {
          keywords: keywords
        })
        .then(res => {
          this.searchData = res.data;
          this.orders = res.data.result.order;
        });
    }
  },
  created() {
    this.search(this.keywords);
  }
};
</script>
<style scoped>
#suggest {
  min-height: 100vh;
}
.suggest-block {
  margin-bottom: 20px;
}
.suggest-block > div {
  min-height: auto !important;
}
.block-name {
  width: 90%;
  margin: 0 auto;
  font-size: 4vw;
  font-weight: 600;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}
</style>