<template>
  <div id="search-list">
    <switch-tab ref="tab" :class="{ 'isFixed-tab': isFixed }" :tabList="tabs"></switch-tab>
    <keep-alive>
      <component ref="res" :class="{ 'isFixed-res': isFixed }" :is="currentTabComponent" :keywords="keywords"></component>
    </keep-alive>
  </div>
</template>
<script>
import SwitchTab from "./switchTab";
import TabAlbums from "./tab-albums";
import TabArtists from "./tab-artists";
import TabSuggest from "./tab-suggest";
import TabSongs from "./tab-songs";
import TabMvs from "./tab-mvs";
import TabPalyLists from "./tab-playlists";

import http from "@/utils/http";

export default {
  components: {
    "switch-tab": SwitchTab,
    "tab-albums": TabAlbums,
    "tab-artists": TabArtists,
    "tab-suggest": TabSuggest,
    "tab-songs": TabSongs,
    "tab-mvs": TabMvs,
    "tab-playlists": TabPalyLists
  },
  props: ["keywords"],
  data() {
    return {
      currentTab: "suggest",
      tabs: [
        {
          title: "综合",
          name: "suggest"
        },
        {
          title: "单曲",
          name: "songs"
        },
        {
          title: "视频",
          name: "mvs"
        },
        {
          title: "歌手",
          name: "artists"
        },
        {
          title: "专辑",
          name: "albums"
        },
        {
          title: "歌单",
          name: "playlists"
        }
      ],
      isFixed: false
    };
  },
  computed: {
    currentTabComponent() {
      return "tab-" + this.currentTab.toLowerCase();
    }
  },
  created() {
    let vm = this;
    
    vm.$on("switchTab", name => {
      vm.currentTab = name;
    });
    // 滚动固定
    window.onscroll = function() {
      vm.isFixed = vm.$refs.res.$el.getBoundingClientRect().top <= vm.$refs.tab.$el.offsetHeight;
    };
  },
  destroyed() {
    window.onscroll = null;
  }
};
</script>
<style scoped>
.isFixed-tab {
  position: fixed !important;
  top: 0 !important;
}
.isFixed-res {
  margin-top: 8vw !important;
}

#search-list {
  width: var(--rootWidth);
  position: absolute;
  background: #ffffff;
  padding-bottom: var(--bottomPlayerHeight);
}
#search-list > div {
  transition: none;
}
</style>