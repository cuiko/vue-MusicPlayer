<template>
  <div id="albums">
    <div class="albums-item" v-for="item in searchData" :key="item.id">
      <div class="albums-left">
        <cover-list :width="'15vw'" :height="'15vw'" :cover-img="item.artist.picUrl"></cover-list>
      </div>
      <div class="albums-right">
        <div class="albums-name">{{ item.name }}</div>
        <div class="albums-remark">
          <span>{{ item.artist.name }}</span>
          <span>{{ formatTime(new Date(item.publishTime)) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CoverList from "@/components/cover-list";

import http from "@/utils/http";
import tools from "@/utils/tools";

export default {
  components: {
    "cover-list": CoverList
  },
  props: ["data", "keywords"],
  data() {
    return {
      searchData: []
    };
  },
  methods: {
    formatTime(time) {
      return tools.formatTime(time, "year");
    },
    search(keywords) {
      http
        .fetchGet("/search", {
          keywords: keywords,
          type: 10
        })
        .then(res => {
          this.searchData = res.data.result.albums;
        });
    }
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
#albums {
  width: 90%;
  min-height: 100vh;
  margin: 0 auto;
}
.albums-item {
  height: 18vw;
  margin: 5px 0;
  display: flex;
  align-items: center;
}
.albums-left {
  flex: 0 0 auto;
  width: auto;
}
.albums-right {
  margin-left: 10px;
  max-width: 80%;
}
.albums-name {
  font-size: 5vw;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.albums-remark {
  font-size: 3vw;
  color: #8a8a8a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>