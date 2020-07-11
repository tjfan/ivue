<template>
  <div class="children">
    <div>这是子组件-----{{message}}</div>
    <button @click="change">点击改变子组件内容</button>
  </div>
</template>

<script>
export default {
  name: 'Children',
  props: {
    message: String
  },
  model: {
    prop: 'message',
    event: 'change'
  },
  data() {
    return {

    }
  },
  methods: {
    change() {
      this.$emit('change', '子组件消息改变了');
    }
  }
}
</script>

<style lang="less" scoped>
.children {
  margin: 30px;
  font-size: 20px;
  color: #f60;
}
</style>
