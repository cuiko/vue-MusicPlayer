# music-player
#### 基于vue的web app

## 功能
##### 页面级：歌曲搜索，结果显示，歌单列表
##### 功能级：歌曲控制（包括：进度条控制，歌曲切换，歌曲播放暂停），歌单控制（包括：播放列表内歌曲的删除，添加）
##### 歌曲，歌单都用vuex控制

## 已知bug
##### 1、移动端在可滚动内容中的元素使用fixed定位导致滚动时，fixed定位的元素不会跟着一起移动，而是滚动结束后才归位，已修复，已更改为absolute
##### 2、移动端歌单顶部返回bar背景透明，原因未知，已修复
##### 3、部分手机有些地方字体过小，已修复

## 未实现
##### 1、歌词显示
##### 2、滑屏切换

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
