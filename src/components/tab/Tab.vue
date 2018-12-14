<template>
  <div class="tab">
    <div class="logo">
      <a href="/"></a>
    </div>
    <ul>
      <router-link tag="li" class="tab-item" to="/movie">
        <span class="tab-link">电影</span>
      </router-link>
      <router-link tag="li" class="tab-item" to="/book">
        <span class="tab-link">图书</span>
      </router-link>
      <router-link tag="li" class="tab-item" to="/broadcast">
        <span class="tab-link">广播</span>
      </router-link>
      <router-link tag="li" class="tab-item" to="/group">
        <span class="tab-link">小组</span>
      </router-link>
      <router-link tag="li" class="tab-item" to="/search">
        <span class="tab-link"></span>
      </router-link>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'tab',
    data() {
      return {}
    }
  };
</script>

<style scoped lang="less">
  @import "../../common/less/variable.less";
  @import "../../common/less/mixin.less";
  .tab {
    height: 94px;
    border-bottom: 1Px solid #f3f3f3;
    position: fixed;
    top: 0px;
    z-index: 100;
    padding: 0 36px;
    width: 100%;
    box-sizing: border-box;
    line-height: 94px;
    background-color: #fff;
    &::after {
      .clearfixer;
    }
    .logo {
      .fl;
      box-sizing: border-box;
      height: 100%;
      position: relative;
      a {
        margin: 0;
        padding: 0;
        font-size: 0;
        background: url(../../common/image/tab-logo.png) no-repeat;
        background-size: cover;
        height: 44px;
        width: 92px;
        position: absolute;
        top: 50%;
        transform: translate3d(0, -50%, 0);
      }
    }
    ul {
      .fr;
      display: flex;
      height: 100%;
      li {
        margin-right: 38px;
        font-size: 15Px;
        vertical-align: middle;
        &:nth-of-type(1) {
          color: #2384E8;
        }
        &:nth-of-type(2) {
          color: #9F7860;
        }
        &:nth-of-type(3) {
          color: #E4A813;
        }
        &:nth-of-type(4) {
          color: #2AB8CC;
        }
        &:nth-last-of-type(1) {
          margin-right: 0px;
          padding-top: 10px;
          box-sizing: border-box;
          span {
            display: inline-block;
            font-size: 0;
            background: url(../../common/image/search-btn.png) no-repeat;
            background-size: cover;
            width: 50px;
            height: 36px;
          }
        }
      }
    }
  }
</style>
