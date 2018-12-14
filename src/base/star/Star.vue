<template>
  <div class="star-wrapper">
    <span class="rating-stars" v-if="rating.average">
      <span
        class="rating-star"
        v-for="(item, index) in getStarClass"
        :key="index"
        :class="item"
        ref="star"
      ></span>
    </span>
    <span class="grade-num" v-if="rating.average" :style="{'color': fontColor, 'font-size': fontSize}">{{rating.average | putGrade}}</span>
    <span class="grade" v-else>暂无评分</span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'star',
  props: {
    rating: {
      type: Object,
      default: function () {
        return {};
      }
    },
    width: 0,
    height: 0,
    fontColor: {
      type: String,
      default: '#aaa'
    },
    fontSize: {
      type: String,
      default: '12px'
    }
  },
  updated() {
    this.$nextTick(() => {
      this.setStar();
    });
  },
  methods: {
    setStar() {
      if (!this.width || !this.height) {
        return;
      }
      let stars = this.$refs.star;
      for (let i = 0; i < stars.length; i++) {
        stars[i].style.width = `${this.width}px`;
        stars[i].style.height = `${this.height}px`
      }
    }
  },
  computed: {
    getStarClass() {
      let starLength = [];
      let stars = this.rating.stars.split('');
      stars.forEach((item, index) => {
        if (index === 0) {
          for (let i = 0; i < item; i++) {
            starLength.push('rating-star-full');
          }
        }
        if (index === 1 && +item > 0) {
          starLength.push('rating-star-half');
        }
      });
      if (starLength.length < 5) {
        starLength.push('rating-star-gray');
      }
      return starLength;
    }
  },
  filters: {
    putGrade(val) {
      val = val + '';
      return val.split('.').length > 1 ? val : val[0] + '.0';
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "../../common/less/mixin.less";
@import "../../common/less/variable.less";
.star-wrapper {
  .grade {
    font-size: 12Px;
    color: #aaa;
  }
  // .grade-num {
  //   display: inline-block;
  //   // margin-bottom: 8px;
  //   // vertical-align: middle;
  // }
  .rating-stars {
    .rating-star {
      display: inline-block;
      width: 10Px;
      height: 10Px;
      background-size: cover;
      margin-right: 4px;
      &.rating-star-full {
        .bg-image('./star36_on');
      }
      &.rating-star-half {
        .bg-image('./star36_half');
      }
      &.rating-star-gray {
        .bg-image('./star36_off');
      }
    }
  }
}
</style>
