<template>
  <div id="artists">
    <div class="artists-item" v-for="item in searchData" :key="item.id">
      <div class="artists-left">
        <img :src="item.picUrl || def_coverImg" width="100%" height="100%" lazy="loaded">
      </div>
      <div class="artists-right">
        <div class="artists-content">
          <span class="artists-name">{{ item.name }}</span>
          <span class="artists-alias" v-if="item.alias.length">({{ item.alias[0] }})</span>
        </div>
        <div class="artists-isUser" v-if="item.accountId">
          <img src="@/assets/user&d81e06&32x32.png" width="30%" height="30%">
          <span>&nbsp;已入驻</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/utils/http";
import def from "@/config/def";

export default {
  props: ["data", "keywords"],
  data() {
    return {
      searchData: [],
      def_coverImg: def.DEFAULT_coverImg
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
          type: 100
        })
        .then(res => {
          this.searchData = res.data.result.artists;
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
#artists {
  width: 90%;
  min-height: 100vh;
  margin: 0 auto;
}
.artists-item {
  height: 16vw;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
  margin: 10px 0;
}
.artists-left {
  flex: 0 0 auto;
  width:  10vw;
  height: 10vw;
  border-radius: 10vw;
  overflow: hidden;
}
.artists-right {
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
}
.artists-content {
  font-size: 5vw;
  width: auto;
}
.artists-name {
  font-weight: 400;
}
.artists-alias {
  color: #8a8a8a;
}
.artists-isUser {
  width:  20vw;
  display: flex;
  align-items: center;
  color: #ccc;
  font-size: 2.6vw;
}
</style>