<template>
  <div id="mvs">
    <div class="mvs-item" v-for="item in searchData" :key="item.id">
      <div class="mvs-left">
        <cover-list :width="'100%'" :height="'90%'" :cover-img="item.cover">
          <template v-slot:right-top>
            <img src="@/assets/play_icon&fff&32x32.png" width="16px" height="16px">
            <number :num="item.playCount"></number>
          </template>
        </cover-list>
      </div>
      <div class="mvs-right">
        <span class="mvs-name">{{ item.name }}</span>
        <span class="mvs-remark">{{ formatSeconds(item.duration) }} by {{ item.artistName }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import CoverList from "@/components/cover-list";
import number from "@/components/number";

import http from "@/utils/http";
import tools from "@/utils/tools";

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
    formatSeconds(time) {
      return tools.formatSeconds(time / 1000);
    },
    search(keywords) {
      http
        .fetchGet("/search", {
          keywords: keywords,
          type: 1004
        })
        .then(res => {
          this.searchData = res.data.result.mvs;
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
#mvs {
  width: 90%;
  min-height: 100vh;
  margin: 0 auto;
  overflow: hidden;
}
.mvs-item {
  height: 30vw;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}
.mvs-left {
  width: 45%;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.mvs-right {
  flex-grow: 1;
  height: 100%;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.mvs-right > div {
  margin: 5px 0;
}
.mvs-name {
  height: auto;
  font-size: 5vw;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.mvs-remark {
  color: #8a8a8a;
  font-size: 3vw;
}
</style>