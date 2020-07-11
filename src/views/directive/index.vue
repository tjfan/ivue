<template>
  <div>
    <header>这是directive</header>
    <input type='text' v-focus v-model="msg"/>
  </div>
</template>

<script>
import directives from './index';
export default {
  mixins: [directives],
  data() {
    return {
      msg: '输入的内容'
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
