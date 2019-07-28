<template>
  <div id="search">
    <div class="search">
      <div class="search-input">
        <img src="@/assets/search&8a8a8a&128x128.png" alt="search" width="30px" height="30px" icon="search">
        <input
          type="text"
          placeholder="搜索 歌曲/专辑/歌手"
          @focus="focus"
          v-model="inputValue"
          @keyup.enter="keywordsCheck(inputValue)"
        >
        <img src="@/assets/close2&bfbfbf&128x128.png" alt="close" width="26px" height="26px" icon="close" v-if="isShowClose" @click="emptyInputValue">
      </div>
      <div
        class="cancel"
        :style="isCancel ? { width: '55px' } : { width: '0px' }"
        @click="cancel"
      >取消</div>
    </div>
    <transition name="drop-fade">
      <div class="hotkey" v-if="isShowHotkey">
        <div class="history">
          <div class="history-title" v-if="historyList.length">
            <span>搜索历史</span>
            <img src="@/assets/bin&8a8a8a&32x32.png" @click="emptyHistory" width="22px" height="22px" alt="bin">
          </div>
          <div class="history-item" v-for="(value, index) in historyList" :key="index" @click="toSearchResPage(value)">{{ value }}</div>
        </div>
        <div
          class="hotkey-item"
          v-for="(key, index) in hotkey"
          :key="index"
          @click="keywordsCheck(key.first);"
        >
          <span>{{ index + 1 }}.&nbsp;{{ key.first }}&nbsp;</span>
          <img v-if="key.iconType == 1" src="@/assets/hot&d81e06&16x16.png">
          <img v-else-if="key.iconType == 2" src="@/assets/new&d81e06&16x16.png">
        </div>
      </div>
    </transition>
    <transition name="drop-fade">
      <search-list v-if="isShowSearch" :keywords="searchKey"></search-list>
    </transition>
  </div>
</template>

<script>
import http from "@/utils/http";
import storage from "@/utils/storage";

import SearchList from "@/components/switchTab-searchRes/searchList";

export default {
  components: {
    "search-list": SearchList
  },
  data() {
    return {
      isShowClose: false,
      isCancel: false,
      isShowHotkey: false,
      isShowSearch: false,
      inputValue: "",
      hotkey: [],
      storageName: "searchHistory",
      historyList: []
    };
  },
  methods: {
    cancel() {
      this.$parent.$emit("showList", true);

      this.inputValue = "";
      this.isShowClose = false;
      this.isCancel = false;
      this.isShowHotkey = false;
      this.isShowSearch = false;
    },
    showSearch() {
      this.$parent.$emit("showList", false);

      this.isShowClose = false;
      this.isCancel = true;
      this.isShowHotkey = false;
      this.isShowSearch = true;
    },
    emptyHistory() {
      this.historyList = [];
    },
    emptyInputValue() {
      this.inputValue = "";
    },
    focus() {
      if (this.isShowHotkey) {
        return false;
      }
      http.fetchGet("/search/hot").then(res => {
        this.hotkey = res.data.result.hots;
      });

      this.$parent.$emit("showList", false);

      this.isShowClose = true;
      this.isCancel = true;
      this.isShowHotkey = true;
      this.isShowSearch = false;
    },
    toSearchResPage(keywords) {
      this.searchKey = keywords;
      this.showSearch();
    },
    add2HistoryList(keywords) {
      let arr = this.historyList;
      arr.push(keywords);
      this.historyList = Array.from(new Set(arr));
    },
    keywordsCheck(keywords) {
      if(/[^\s]/.test(keywords)) {
        this.toSearchResPage(keywords);
        this.add2HistoryList(keywords);
      } else {
        this.bus.$emit("showToast", true, "搜索内容错误");
      }
    }
  },
  created() {
    this.historyList = storage.fetch(this.storageName);
  },
  updated() {
    storage.save(this.storageName, this.historyList);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 动画 */
.drop-fade-enter,
.drop-fade-leave-to {
  opacity: 0;
}
.drop-fade-enter-active,
.drop-fade-leave-active {
  transition: all 0.3s;
}

#search {
  width: var(--rootWidth);
}
.search {
  width: 100%;
  height: 60px;
  background: #fff;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
}
.search-input {
  width: 100%;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #eee;
  border-radius: 5px;
}
.search-input img {
  margin: 0 5px;
}
.search-input input {
  background: #eee;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 18px;
  text-align: left;
}
.cancel {
  width: 55px;
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  margin: 10px auto;
  transition: width 0.3s;
  cursor: pointer;
}
.hotkey {
  width: var(--rootWidth);
  background: #fff;
  padding: 5px;
  position: absolute;
}
.hotkey-item {
  display: flex;
  align-items: center;
  font-size: 4vw;
  margin: 10px 0;
  cursor: pointer;
}
.history {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.history-title {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.history-title > * {
  padding: 0 5px;
  cursor: pointer;
}
.history-item {
  width: auto;
  font-size: 3vw;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 20px;
  background: #efefef;
  cursor: pointer;
}
</style>
