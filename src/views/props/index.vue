<template>
  <div>
    <header>组件之间传值</header>
    <hr>
    <div>子组件</div>
    <Children></Children>
  </div>
</template>

<script>
import Children from './children';
export default {
  components: {
    Children
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
