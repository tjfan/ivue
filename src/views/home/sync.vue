<template>
  <div class="sync" v-show="visible">
    <div>这里这个是sync</div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
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
