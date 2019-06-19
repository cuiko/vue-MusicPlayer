/* eslint-disable no-unused-vars */
import tools from "@/utils/tools";
export default {
  DEFAULT_coverImg: require("@/assets/logo.png"),
  DEFAULT_name: "vue music",
  play_model: {
    单曲循环: {
      icon_white: require("@/assets/cycle_single&white&fff&64x64.png"),
      icon_black: require("@/assets/cycle_single&black&000&64x64.png"),
      res(index, length) {
        return index;
      }
    },
    列表循环: {
      icon_white: require("@/assets/cycle_list&white&fff&64x64.png"),
      icon_black: require("@/assets/cycle_list&black&000&64x64.png"),
      res(index, length) {
        return index + 1 >= length ? 0 : index + 1;
      }
    },
    随机播放: {
      icon_white: require("@/assets/random&white&fff&64x64.png"),
      icon_black: require("@/assets/random&black&000&64x64.png"),
      res(index, length) {
        let res = null;
        do {
          res = tools.random(0, length);
        } while (res == index);
        return res;
      }
    }
  }
};
