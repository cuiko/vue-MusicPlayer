<template>
  <div id="swiper" :style="styleObj">
    <ul class="swiper" :style="{ transform: `translateX(${currentPosition}${unit})` }">
      <li v-for="(item, index) in content" :key="index" class="swiper-item">
        <img :src="item.imageUrl" lazy="loaded">
        <div
          class="type"
          :style="{ backgroundColor: item.titleColor == 'red' ? '#fc5245' : '#43a5f0' }"
        >{{ item.typeTitle }}</div>
      </li>
    </ul>
    <template v-if="showQuickBtn">
      <span class="prev-btn" @click="prev"></span>
      <span class="next-btn" @click="next"></span>
    </template>
    <dots class="dots" :length="imgsLength" :currentIndex="currentIndex"></dots>
  </div>
</template>
<script>
import dots from "@/components/dots";

export default {
  components: {
    dots
  },
  props: {
    width: {
      type: [Number, String],
      default: 100
    },
    unit: {
      type: String,
      default: "%"
    },
    showQuickBtn: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: "35vh"
    },
    isLoop: {
      type: Boolean,
      default: true
    },
    isAutoPlay: {
      type: Boolean,
      default: true
    },
    time: {
      type: [Number, String],
      default: 4000
    },
    contents: {
      type: [Array, Object],
      required: true
    }
  },
  computed: {
    content() {
      return this.contents;
    },
    imgsLength() {
      return Object.keys(this.content).length;
    }
  },
  data() {
    return {
      currentIndex: 0,
      currentPosition: 0,
      timer: null,
      styleObj: {
        width: this.width + this.unit,
        height: this.height
      }
    };
  },
  methods: {
    next() {
      this.jump(
        (this.currentIndex =
          this.currentIndex++ >= this.imgsLength - 1 ? 0 : this.currentIndex)
      );
    },
    prev() {
      this.jump(
        (this.currentIndex = this.currentIndex-- <= 0 ? this.imgsLength - 1 : this.currentIndex)
      );
    },
    jump(changedIndex) {
      this.currentPosition = changedIndex * 100 * -1;
    }
  },
  mounted() {
    let vm = this;

    if (vm.isAutoPlay) {
      vm.timer = setInterval(function() {
        if (vm.isLoop && vm.currentIndex === vm.imgsLength - 1) {
          vm.jump((vm.currentIndex = 0));
        } else if (vm.currentIndex === vm.imgsLength - 1) {
          clearInterval(vm.timer);
          return false;
        } else {
          vm.next();
        }
      }, vm.time);
    }
    vm.$on("jump", index => {
      vm.jump((vm.currentIndex = index));
    });
  },
  destroyed() {
    let vm = this;
    
    clearInterval(vm.timer);
  }
};
</script>
<style scoped>
#swiper {
  --radiusWidth: 10px;

  position: relative;
  overflow: hidden;
  margin: 10px auto 5px;
  border-radius: var(--radiusWidth);
}
.swiper {
  width: 100%;
  height: 100%;
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  transition: all 0.4s ease-out;
}
.swiper-item {
  flex-shrink: 0;
  position: relative;
  width: 100%;
  height: 100%;
}
.swiper-item > img {
  width: 100%;
  height: 100%;
}
.prev-btn,
.next-btn {
  position: absolute;
  width:  8vw;
  height: 8vw;
  border-radius: 100%;
  background-color: rgba(250, 250, 250, 0.3);
  background-size: cover;
  background-repeat: no-repeat;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.prev-btn {
  background-image: url("../assets/left&fff&64x64.png");
  left: 2%;
}
.next-btn {
  background-image: url("../assets/right&fff&64x64.png");
  right: 2%;
}
.dots {
  position: absolute;
  bottom: 5%;
}
.type {
  width: auto;
  position: absolute;
  bottom: 0;
  right: 0;
  color: #fff;
  padding: 2px 10px;
  font-size: 12px;
  border-top-left-radius: var(--radiusWidth);
}
</style>
