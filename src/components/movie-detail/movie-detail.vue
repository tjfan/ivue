<template>
  <div class="movie-detail-wrapper">
    <h1 class="movie-name">{{data.title}}</h1>
    <section class="subject-info">
      <div class="left">
        <p class="rating">
          <star 
            :rating="data.rating" 
            :width="starWidth" 
            :height="starHeight"
            :fontColor="starColor"
            :fontSize="starFontSize"
            class="star"></star>
            <span class="evaluate">{{data.ratings_count}}人评价</span>
        </p>
        <p class="meta">{{getMeta}}</p>
      </div>
      <div class="right">
        <img :src="data.images.large" alt="">
      </div>
    </section>
    <section class="subject-mark">
      <div class="mark-item">
        <span v-for="item in subjectMark">{{item}}</span>
      </div>
    </section>

    <section class="channel_tags">
      <h2>所属频道</h2>
      <ul>
        <li v-for="(item, index) in data.tags" :key="index">
          {{item}}
          <span></span>
        </li>
      </ul>
    </section>

    <section class="subject-intro">
      <h2>{{data.title}}的剧情简介</h2>
      <p>{{data.summary}}</p>
    </section>

    <section class="subject-intro">
      <h2>影人</h2>
      <slider>
        <div class="swiper-slide"></div>
      </slider>
    </section>

  </div>
</template>

<script type="text/ecmascript-6">
import { getMovieDetail } from '@/api/movie-detail';
import Slider from '@/base/slider/Slider';
import Star from '@/base/star/Star'
export default {
  name: 'movieDetail', // 创建name属性用于keep-alive组件定位本组件防止缓存
  data() {
    return {
      data: {
        images: {},
        tags: []
      },
      starWidth: 13,
      starHeight: 13,
      starColor: '#111',
      starFontSize: '15px',
      subjectMark: [
        '相看',
        '看过'
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getMovieDetailInfo();
    });
  },
  methods: {
    getMovieDetailInfo() {
      let id = this.$route.params.movieId;
      getMovieDetail(id)
        .then((res) => {
          this.data = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    getMeta() {
      let meta = '';
      let data = this.data
      if (!data.genres) {
        return;
      }
      meta = data.durations[0] + ' / ' + data.genres.join(' / ') + ' / ' + data.directors[0].name + '（导演） / ';
      data.casts.forEach((item, index) => {
        meta += data.casts.length === index + 1 ? item.name : item.name + ' / ';
      });
      return meta;
    }
  },
  components: {
    Star,
    Slider
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "../../common/less/variable.less";
  @import "../../common/less/mixin.less";
  .movie-detail-wrapper {
    margin: 0 36px;
    section {
      margin-bottom: 60px;
      p {
        font-size: 15Px;
        color: #494949;
        line-height: 44px;
      }
    }
    h2 {
      color: #aaa;
      margin: 0 0 30px;
      font-size: 15Px;
    }
    .movie-name {
      margin: 60px 0 10px;
      font-size: 24Px;
      line-height: 64px;
      word-break: break-all;
      color: #111;
    }
    .subject-info {
      position: relative;
      &::after {
        .clearfixer;
      }
      .left {
        padding-bottom: 60px;
        width: 478px;
        .fl;
        .meta {
          color: #494949;
          margin-top: 30px;
          padding-right: 48px;
          font-size: 14Px;
          line-height: 1.6;
        }
        .rating {
          display: flex;
          .evaluate {
            color: #aaa;
            font-size: 15Px;
            margin-left: 20px;
          }
        }
      }
      .right {
        .fr;
        width: 200px;
        height: 300px;
        img {
          width: 200px;
        }
      }
    }
    .subject-mark {
      .mark-item {
        display: flex;
        justify-content: space-between;
        span {
          border: 1Px solid #ffb712;
          font-size: 15Px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          width: 50%;
          border-radius: 4Px;
          color: #ffb712;
          &:nth-of-type(1) {
            margin-right: 20px;
          }
        }
      }
    }
    .channel_tags {
      li {
        background-color: #effaf0;
        border: 1Px solid #42bd56;
        display: inline-block;
        margin-right:20px;
        font-size: 14Px;
        padding: 10px 20px;
        border-radius: 30px;
        margin-bottom: 20px;
        color: #42bd56;
        span {
          color: #ccc;
          font-weight: bold;
          display: inline-block;
          border-right: solid 2Px #42bd56;
          border-bottom: solid 2Px #42bd56;
          width: 6Px;
          height: 6Px;
          transform: rotate(-45deg);
          margin-bottom: 1Px;
        }
      }
    }
  }
</style>
