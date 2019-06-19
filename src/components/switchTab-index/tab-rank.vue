<template>
  <div id="tab-rank">
    <div class="rank-block" v-for="item in rankList" :key="item.id" @click="goDetail(item.id)">
      <cover-list :width="'100px'" :height="'100px'" :cover-img="item.coverImgUrl">
        <template v-slot:left-bottom>{{ item.updateFrequency }}</template>
      </cover-list>
      <ul class="rank-content">
        <li v-for="(_item, index) in item.tracks" :key="index">
          <span class="rank-content__index">{{ index + 1 }}.</span>
          <span class="rank-content__musicName">{{ _item.first }}&nbsp;-&nbsp;</span>
          <span class="rank-content__songer">{{ _item.second }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CoverList from "@/components/cover-list";

import http from "@/utils/http";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      rankList: []
    };
  },
  created() {
    let vm = this;
    
    http.fetchGet("/toplist/detail").then(res => {
      // setTimeout(() => {
      vm.rankList = res.data.list.filter(item => {
        return item.tracks.length;
      });
      // }, 10);
    });
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        name: "/rank",
        params: {
          id
        }
      });
    }
  },
  components: {
    "cover-list": CoverList
  }
};
</script>
<style scoped>
#tab-rank {
  margin: 10px 0 calc(var(--bottomPlayerHeight) + 10px);
}
.rank-block {
  --margin: 5px;

  width: calc(100% - 2 * var(--margin));
  display: flex;
  margin: var(--margin);
  background: #fff;
  border-radius: 5px;
  box-shadow: 3px 3px 10px -10px #000;
}
.rank-content {
  padding: var(--margin);
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-around;
}
.rank-content > li {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
}
.rank-content > li > span {
  padding: 0 1px;
  width: 100%;
  cursor: pointer;
}
.rank-content__musicName {
  color: #000;
}
.rank-content__songer {
  color: #aaa;
}
</style>
