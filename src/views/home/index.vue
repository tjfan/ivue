<template>
  <div>
    这里是首页
    <children v-model="msg" @change="change"></children>
    <button @click="toggleVisible">{{visible ? '隐藏visible' : '显示visible'}}</button>
    <sync :visible.sync="visible"></sync>
  </div>
</template>

<script>
import Children from './children';
import Sync from './sync';
export default {
  components: {
    Children,
    Sync
  },
  data() {
    return {
      msg: '子组件的内容',
      visible: false
    }
  },
  methods: {
    change(e) {
      this.msg = e;
    },
    toggleVisible() {
      this.visible = !this.visible;
    }
  }
}
</script>

<style lang="less" scoped>

</style>
