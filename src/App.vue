<template>
  <div id="app">
    <tab></tab>
    <main ref="main">
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
        loadingFlag: false,
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
    },
    watch: {
      '$route'(to, from) {
        if (to.path.includes('movie-type')) {
          this.$refs.main.style.height = '100%';
          this.$refs.main.style.overflow = 'hidden';
          this.$refs.main.style.boxSizing = 'border-box';
        } else {
          this.$refs.main.style.height = 'auto';
          this.$refs.main.style.overflow = 'none';
          this.$refs.main.style.boxSizing = 'none';
        }
      }
    }
  };
</script>

<style scoped lang='less'>
#app {
  height: 100%;
}
main {
  padding-top: 94px;
  height: auto;
}
</style>
