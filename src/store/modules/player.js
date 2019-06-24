/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import http from "@/utils/http";
import tools from "@/utils/tools";
import def from "@/config/def";

const state = {
  // audio标签id
  audioElementId: "songAudio",
  // 播放模式
  playModels: Object.keys(def.play_model),
  currentPlayModel: "列表循环",
  // 播放状态
  playing: false,
  // 歌曲信息
  song: {
    id: null,
    url: null,
    coverImg: def.DEFAULT_coverImg,
    songName: def.DEFAULT_name,
    songer: [],
    duration: "00:00",
    duration_raw: 0
  },
  // 上一首id
  prevId: null,
  // 播放列表
  playList: [],
  playListIds: [],
  // 暂停延时时间 （毫秒）
  pauseDelay: 300,
  // 当前播放时间
  currentTime: 0,
  // 拖动时的时间
  changingTime: 0,
  // 拖动时时间的百分比 拖动距离 / 进度条宽度
  changingTime_per: null,
  // 进度条计时器
  timer: null,
  // 是否触摸进度条
  isTouch: false,
  // 进度条id
  progressBarId: "progressBar-main"
};

const getters = {
  // 获取播放状态
  isPlay: state => state.playing,
  // 获取播放器元素
  getAudioElement: state => document.getElementById(state.audioElementId),
  // 获取元素id名称 用于设置播放器id
  getAudioElementId: state => state.audioElementId,
  // 获取上一首歌曲id
  getSongPrevId: state => state.prevId,
  // 获取当前可用的播放模式 [列表循环, 单曲循环, 随机播放]
  getPlayModels: state => state.playModels,
  // 获取当前播放模式
  getCurrentPlayModel: state => state.currentPlayModel,
  // 获取暂停时，延时暂停的时间
  getPauseDelay: state => state.pauseDelay,
  // 获取歌曲信息 ——start——
  getSongUrl: state => state.song.url,
  getSongCover: state => state.song.coverImg,
  getSongName: state => state.song.songName,
  getSongSonger: state => state.song.songer,
  getSongId: state => state.song.id,
  // 在请求数据时，已格式化
  getDuration: state => state.song.duration,
  // 在请求数据时，已除以1000
  getDuration_raw: state => state.song.duration_raw,
  // 歌曲信息 ——end——
  // 获取播放列表
  getPlayList: state => state.playList,
  // 播放列表的id列表
  getPlayListIds: state => state.playListIds,
  // 进度条相关 ——start——
  // 当前播放时间
  getCurrentTime: state => state.currentTime,
  // 当前播放时间进过格式化 毫秒转 00:00
  getCurrentTime_format: state => tools.formatMinute(state.currentTime),
  // 当前时间 / 当前歌曲时长的比值 用于已播放的元素宽度改变
  getCurrentTime_per: state => (state.currentTime / (state.song.duration_raw || 1)).toFixed(3),
  // 是否触摸进度条
  isTouch: state => state.isTouch,
  // 获取拖动改变的时间
  getChangingTime: state => state.changingTime,
  // 获取拖动改变的时间格式化
  getChangingTime_format: state => tools.formatMinute(state.changingTime),
  // 获取拖动改变的时间的百分比
  getChangingTime_per: state => state.changingTime_per,
  // 获取进度条id
  getProgressBarId: state => state.progressBarId
  // 进度条 ——end——
};

const mutations = {
  // 改变当前时间
  updateCurrentTime(state, newTime) {
    state.currentTime = newTime;
  },
  // 改变触摸状态
  updateTouchState(state, boolean) {
    state.isTouch = boolean;
  },
  // 改变播放状态
  updatePlayState(state, boolean) {
    state.playing = boolean;
  },
  // 改变播放模式
  changePlayModel(state) {
    let { currentPlayModel, playModels } = state,
      newIndex = playModels.indexOf(currentPlayModel) + 1;
    state.currentPlayModel =
      playModels[newIndex > playModels.length - 1 ? 0 : newIndex];
  },
  // 切换歌曲时，重置歌曲信息
  resetSongData(state, isDef = false) {
    state.song = {
      id: null,
      url: null,
      coverImg: def.DEFAULT_coverImg,
      songName: isDef ? def.DEFAULT_name : "加载中",
      songer: [],
      duration_raw: 0,
      duration: "00:00"
    };
  },
  // 清除进度条计时器
  cleanTimer(state) {
    clearInterval(state.timer);
    state.timer = null;
  },
  // 切换歌曲时，重置进度条数据
  resetProgressBarData(state) {
    state.isTouch = false;
    state.changingTime_per = null;
    state.changingTime = 0;
    state.currentTime = 0;
  },
  // 改变歌曲信息
  updateSongData(state, newObj) {
    Object.assign(state.song, newObj);
  },
  // 设置当前播放列表的ids
  setPlayListIds(state, data) {
    let ids = [];
    data.forEach(item => {
      ids.push(item.id);
    });
    state.playListIds = ids;
  },
  // 设置播放列表
  setPlayList(state, data) {
    state.playList = data;
  },
  // 删除当前播放列表和ids的某项
  delOneInPlayList(state, index) {
    state.playList.splice(index, 1);
    state.playListIds.splice(index, 1);
  },
  // 当前播放列表和ids插入某项
  insertOneInPlayList(state, { index, item }) {
    state.playList.splice(index + 1, 0, item);
    state.playListIds.splice(index + 1, 0, item.id);
  },
  // 当前播放列表和ids后添加某项
  addOneInPlayList(state, item) {
    state.playList.push(item);
    state.playListIds.push(item.id);
  },
  // 更新上一首id
  updateSongPrevId(state, id) {
    state.prevId = id;
  },
  // 设定进度条计时器id
  setTimer(state, newTimer) {
    state.timer = newTimer;
  },
  // 更新当前进度条改变时间的百分比
  updateChangingTime_per(state, newTime) {
    state.changingTime_per = newTime;
  },
  // 更新当前进度条改变时间
  updateChangingTime(state, newTime) {
    state.changingTime = newTime;
  },
  // 清空播放列表
  emptyPlayList(state) {
    state.playList = [];
    state.playListIds = [];
  }
};

const actions = {
  // 请求歌曲详情api
  requestSongApi(context, { id, playList }) {
    let { getters, commit, dispatch } = context;

    if (
      getters.getSongPrevId == id &&
      getters.getPlayList.length != 1 &&
      getters.getCurrentPlayModel != "单曲循环"
    ) {
      console.log("该歌曲正在播放");
      return false;
    }
    // 播放列表存在则更新播放列表
    if (playList) {
      commit("setPlayList", playList);
      commit("setPlayListIds", playList);
    }

    // 重置数据 显示加载中
    commit("resetSongData");
    // 清除计时器
    commit("cleanTimer");
    // 重置进度条信息
    commit("resetProgressBarData");
    // 保存上一首的音乐id
    commit("updateSongPrevId", id);
    // 请求歌曲详情
    http
      .fetchGet("/song/detail", {
        ids: id
      })
      .then(res => {
        commit("updateSongData", {
          coverImg: res.data.songs[0].al.picUrl,
          songName: res.data.songs[0].name,
          songer: res.data.songs[0].ar,
          id: id,
          duration: tools.formatMinute(res.data.songs[0].dt / 1000),
          duration_raw: res.data.songs[0].dt / 1000
        });
      });
    // 请求音乐url
    http
      .fetchGet("/song/url", {
        id: id
      })
      .then(
        res => {
          commit("updateSongData", {
            url: res.data.data[0].url
          });
          dispatch("play");
        },
        err => {
          dispatch("next");
        }
      );
  },
  // 下一首
  next(context) {
    let { getters, commit, dispatch } = context;

    let prevId = getters.getSongPrevId,
      playList = getters.getPlayList,
      ids = getters.getPlayListIds,
      currentPlayModel = getters.getCurrentPlayModel;

    // 检测prevId 防止单曲循环模式下，播放列表有歌曲时的无限请求
    if (!playList.length || !prevId) {
      console.log("播放列表为空");
      return false;
    }

    // 根据不同模式，传入新歌曲id
    dispatch("requestSongApi", {
      id:
        ids[
          def.play_model[currentPlayModel].res(ids.indexOf(prevId), ids.length)
        ]
    });
  },
  // 上一首
  prev(context) {
    let { getters, dispatch } = context;

    let prevId = getters.getSongPrevId,
      playList = getters.getPlayList,
      ids = getters.getPlayListIds;

    if (!playList.length || !prevId) {
      console.log("播放列表为空");
      return false;
    }

    let index = ids.indexOf(prevId);
    dispatch("requestSongApi", { id: ids[index == 0 ? 0 : index - 1] });
  },
  // 开始播放
  play(context) {
    let { getters, commit, dispatch } = context;

    let audioElement = getters.getAudioElement;

    // 改变播放状态
    commit("updatePlayState", true);
    setTimeout(() => {
      // audio元素开始播放
      audioElement.play();
      // 进度条计时器调用
      dispatch("progressBarTimer");
    }, 0);
  },
  // 暂停播放
  pause(context) {
    let { getters, commit } = context;

    let audioElement = getters.getAudioElement,
      pauseDelay = getters.getPauseDelay;

    // 改变播放状态
    commit("updatePlayState", false);
    // 清除进度条计时器
    commit("cleanTimer");
    // 延迟暂停
    setTimeout(() => {
      audioElement.pause();
    }, pauseDelay);
  },
  // 判断是播放还是暂停
  playOrPause(context) {
    let { getters, dispatch } = context;
    // 点击播放/暂停时 根据isPlay 调用相应的事件
    getters.isPlay ? dispatch("pause") : dispatch("play");
  },
  // 进度条计时器
  progressBarTimer(context) {
    let { getters, commit, dispatch } = context;

    if (!getters.getSongPrevId) {
      console.log("无可播放的歌曲");
      // 改变播放状态
      commit("updatePlayState", false);
      return false;
    }
    commit(
      "setTimer",
      setInterval(() => {
        // 每秒+1 更新当前进度条时间
        commit("updateCurrentTime", getters.getCurrentTime + 1);
        // 当前时间进度条时间大于歌曲时间,进入下一曲
        if (getters.getCurrentTime >= getters.getDuration_raw) {
          dispatch("next").then(_ => {
            if (typeof _ === "boolean" && !_) {
              console.log("恢复默认状态");
              dispatch("reset2__DEFAULT__");
            }
          });
        }
      }, 1000)
    );
  },
  // 开始触摸进度条
  touch_start(context, e) {
    // 改变touch状态:启动
    context.commit("updateTouchState", true);
    context.dispatch("touch_move", e);
  },
  // 触摸移动时
  touch_move(context, e) {
    let { getters, commit } = context;

    let progressBar_element = document.getElementById(getters.getProgressBarId),
      // 进度条元素的left为可移动的最小值
      min = progressBar_element.getBoundingClientRect().left,
      // 进度条元素的left + 进度条的width为可移动的最大值(e事件不能获取到相对于父元素的坐标信息，故使用了pageX)
      max =
        progressBar_element.getBoundingClientRect().left +
        progressBar_element.getBoundingClientRect().width,
      res = 0;

    if (e.changedTouches[0].pageX <= min) {
      res = 0;
    } else if (e.changedTouches[0].pageX >= max) {
      res = 1;
    } else if (getters.getDuration_raw != 0) {
      res = (
        (e.changedTouches[0].pageX - min) /
        progressBar_element.getBoundingClientRect().width
      ).toFixed(3);
    }

    // res为进度条的宽度百分比
    commit("updateChangingTime_per", res);
    // 实时更新左侧进度条拖动时间
    commit(
      "updateChangingTime",
      getters.getChangingTime_per * getters.getDuration_raw
    );
  },
  // 触摸结束
  touch_end(context) {
    let { getters, commit, dispatch } = context;

    // 拖动结束，改变touch状态
    commit("updateTouchState", false);
    // 通过改变的百分比 * 歌曲duration 得到改变后的秒数
    commit(
      "updateCurrentTime",
      getters.getChangingTime_per * getters.getDuration_raw
    );
    // 清除当前进度条改变时间
    commit("updateChangingTime", getters.getCurrentTime);
    // 将改变后的秒数 应用到audio元素
    dispatch("setSongDuration", getters.getCurrentTime);
  },
  // 设置音乐当前时间
  setSongDuration(context, time) {
    context.getters.getAudioElement.currentTime = time;
  },
  removeSongFromPlayList(context, id) {
    let { getters, commit, dispatch } = context;

    let prevId = getters.getSongPrevId,
      index = getters.getPlayListIds.indexOf(id);

    if (index != -1) {
      commit("delOneInPlayList", index);
      if (id == prevId) {
        dispatch("next");
      }
    }
  },
  reset2__DEFAULT__(context) {
    let { getters, commit } = context;

    // 清除计时器
    commit("cleanTimer");
    // 重置进度条
    commit("resetProgressBarData");
    // 重置播放信息，显示默认标题
    commit("resetSongData", true);
    // 修改播放状态
    commit("updatePlayState", false);
    // 清除上一首歌曲id
    commit("updateSongPrevId", null);
    // 重新加载audio元素
    getters.getAudioElement.load();
  },
  // 添加到下一首
  add2NextSong(context, song) {
    let { getters, commit } = context;

    let playListIds = getters.getPlayListIds,
      newSongIndex = playListIds.indexOf(song.id),
      prevId = getters.getSongPrevId,
      currentSongIndex = playListIds.indexOf(prevId);

    // 判断播放列表是否有数据，没有直接添加
    if (playListIds.length > 0) {
      // 判断添加的歌曲的id是否与当前播放的歌曲冲突，一样则无操作
      if (song.id != prevId) {
        // 判断添加的歌曲是否已经存在于播放列表，存在则先删除再在当前播放的歌曲的index + 1的位置插入
        if (newSongIndex != -1) {
          commit("delOneInPlayList", newSongIndex);
        }
        commit("insertOneInPlayList", { index: currentSongIndex, item: song });
      }
    } else {
      commit("addOneInPlayList", song);
    }
  },
  // 添加到播放列表
  add2PlayList(context, song) {
    let { getters, commit } = context;

    let newSongIndex = getters.getPlayListIds.indexOf(song.id);

    // 判断添加的歌曲是否已经存在于播放列表，存在则无操作，不存在则添加到播放列表的末尾
    if (newSongIndex == -1) {
      commit("addOneInPlayList", song);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
