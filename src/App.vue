<template>
  <div id="app">
    <tab></tab>
    <main>
      <keep-alive exclude="movieDetail,search,celebrity,movie-type">
        <router-view @hasLoad="hasLoad"></router-view>
      </keep-alive>
    </main>
    <!-- <loading v-if="!loadingFlag"></loading> -->
  </div>
</template>

<script type="text/ecmascript-6">
  // import Loading from 'base/loading/loading.vue';
  import Tab from '@/components/tab/Tab';
  export default {
    data() {
      return {
        loadingFlag: false
      };
    },
    methods: {
      hasLoad() {
        this.loadingFlag = true;
      }
    },
    components: {
      Tab
      // Loading
    }
  };
</script>

<style scoped lang='less'>
#app {
  height: 100%;
}
main {
  padding-top: 94px;
  height: 100%;
}
</style>
