import Vue from "vue";
import Router from "vue-router";

import RankPage from "@/views/rank-page.vue";
import PlaylistPage from "@/views/playlist-page.vue";
import HomePage from "@/views/home-page.vue";

Router.prototype.goBack = function() {
  this.isBack = true;
  this.go(-1);
};

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "/",
      component: HomePage
    },
    {
      path: "/rank/:id",
      name: "/rank",
      component: RankPage
    },
    {
      path: "/playlist/:id",
      name: "/playlist",
      component: PlaylistPage
    }
  ]
});
