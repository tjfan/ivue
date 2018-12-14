<template>
  <div class="header-wp">
    <ul class="header">
      <li>{{msg}}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    // name: 'Headee'
    data () {
      return {
        msg: '这是头部内容'
      }
    }
  };
</script>

<style scoped lang="less">
  @import "../../common/less/variable.less";

</style>
