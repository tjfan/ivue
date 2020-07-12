<template>
  <div>
    <header>组件之间传值</header>
    <hr>
    <div>子组件</div>
    <Children 
      class="children1"
      :foo="foo"
      :boo="boo"
      :coo="coo"
      :doo="doo"
      title="组件传值"
    ></Children>
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
      foo: 'javascript',
      boo: 'html',
      coo: 'css',
      doo: 'vue'
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
