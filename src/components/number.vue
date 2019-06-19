<template>
  <span v-if="parseInt(num).toString().length >= 5">{{ Math.round(Number(num) / 10000 * 10) / 10 }}万</span>
  <span v-else-if="parseInt(num).toString().length < 5">{{ num }}</span>
</template>
<script>
export default {
  props: {
    num: {
      type: [Number, String]
    }
  }
};
</script>
