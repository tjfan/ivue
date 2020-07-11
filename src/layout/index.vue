<template>
  <div class='layout'>
    <div class='slider'>
      <router-link 
        v-for='item in routes' 
        :to='item.path' 
        :key='item.name' 
        class='item'
        tag='div'>{{item.name}}</router-link>
    </div>
    <div class='main'>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import routes from '@/router/rootRouter';
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    routes() {
      return routes.filter(item => {
        return !item.hiddden;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  height: 100vh;
}
.slider {
  width: 200px;
  border-right: 1px solid #000;
  .item {
    margin-bottom: 10px;
    color: #000;
    cursor: pointer;
    &.router-link-active {
      color: skyblue;
    }
  }
}
.main {
  padding: 20px;
  box-sizing: border-box;
  flex: 1;
}
</style>
