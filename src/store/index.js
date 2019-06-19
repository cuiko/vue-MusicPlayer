import Vue from "vue";
import Vuex from "vuex";

import player from "./modules/player";
import other from "./modules/other";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    player,
    other
  }
});
