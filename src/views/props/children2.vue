<template>
  <div>
    这是children2
  </div>
</template>

<script>
export default {
  props: {
    boo: String
  },
  created() {
    console.log(this.$attrs);
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
