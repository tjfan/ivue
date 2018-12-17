<template>
  <div class="star-wrapper">
    <span class="rating-stars" v-if="rating.average || rating.value">
      <span
        class="rating-star"
        v-for="(item, index) in getStarClass"
        :key="index"
        :class="item"
        ref="star"
        :style="{'width': `${width}px`, 'height': `${height}px`}"
      ></span>
    </span>
    <span 
      class="grade-num" 
      v-if="rating.average && isGrade" 
      :style="{'color': fontColor, 'font-size': fontSize}">
      {{rating.average ? rating.average : rating.value | putGrade}}
    </span>
    <span class="grade" v-if="isGrade && !rating.average">暂无评分</span>
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
    width: {
      type: [Number, String],
      default: 10
    },
    height: {
      type: [Number, String],
      default: 10
    },
    fontColor: {
      type: String,
      default: '#aaa'
    },
    fontSize: {
      type: String,
      default: '12px'
    },
    isGrade: {
      type: Boolean,
      default: true
    }
  },
  updated() {},
  mounted() {},
  methods: {},
  computed: {
    getStarClass() {
      let starLength = [];
      let stars = this.rating.value ? `${this.rating.value + ''}`.split('') : this.rating.stars.split('');
      stars.map((item, index) => {
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
          for (let i = 0, len = 5 - starLength.length; i < len; i++) {
            starLength.push('rating-star-gray');
          }
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
  .rating-stars {
    .rating-star {
      display: inline-block;
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
