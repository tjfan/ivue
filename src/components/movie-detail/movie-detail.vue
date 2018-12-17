<template>
  <div class="movie-detail-wrapper">
    <h1 class="movie-name">{{data.title}}</h1>
    <section class="subject-info">
      <div class="left">
        <p class="rating">
          <star 
            :rating="data.rating" 
            :width="13" 
            :height="13"
            :fontColor="starColor"
            :fontSize="starFontSize"
            class="star"></star>
            <span class="evaluate">{{data.ratings_count}}人评价</span>
        </p>
        <p class="meta">{{getMeta}}</p>
      </div>
      <div class="right" v-if="data.images">
        <img  v-lazy="replaceUrl(data.images.large)" alt="">
      </div>
    </section>
    <section class="subject-mark">
      <div class="mark-item">
        <span v-for="(item, index) in subjectMark" :key="index">{{item}}</span>
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

    <section class="celebrities-wp">
      <h2>影人</h2>
      <slider :data="data" class="celebrities">
          <div class="swiper-slide" v-if="data.directors">
            <div class="img">
              <img v-lazy="replaceUrl(data.directors[0].avatars.large)" alt="">
            </div>
            <span>{{data.directors[0].name}}</span>
            <span>导演</span>
          </div>
          <div 
            v-for="item in data.casts"
            :key="item.id" class="swiper-slide">
            <div class="img">
              <img v-lazy="replaceUrl(item.avatars.large)" alt="">
            </div>
            <span>{{item.name}}</span>
            <span>演员</span>
          </div>
      </slider>
    </section>

    <!-- 短评 -->
    <section>
      <h2>{{data.title}}的短评({{data.comments_count}})</h2>
      <div class="bd" id="comment-list">
        <ul class="list comment-list">
          <li v-for="item in data.popular_comments" :key="item.id">
            <div class="desc">
              <div class="img">
                <img :src="item.author.avatar" alt="">
              </div>
              <div class="user-info">
                <strong>{{item.author.name}}</strong>
                <star 
                  :rating="item.rating" 
                  :width="13" 
                  :height="13" 
                  :isGrade="false"
                  class="stars"></star>
                <div class="date">{{item.created_at}}</div>
              </div>
            </div>
            <p class="content">{{item.content}}</p>
            <div class="btn-info"></div>
          </li>
          <li class="go-comment-list">查看全部短评</li>
        </ul>
      </div>
    </section>

    <!-- 影评 -->
    <section class="reviews">
      <h2>{{data.title}}的影评({{data.reviews_count}})</h2>
      <div class="bd">
        <ul class="list">
          <li v-for="item in data.popular_reviews" :key="item.id">
            <h3>{{item.title}}</h3>
            <div class="username">
              <span>{{item.author.name}}</span>
              <star 
                :rating="item.rating" 
                :width="13" 
                :height="13" 
                :isGrade="false"
                class="stars"></star>
            </div>
            <div class="abstract">
              {{item.summary}}
            </div>
          </li>
          <li class="go-review-list">查看全部影评</li>
        </ul>
      </div>
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
      data: {},
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
          if (!id) return;
          this.data = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    replaceUrl(srcUrl) {
      if (srcUrl !== undefined) { // 图片防盗链处理
        return ('https://images.weserv.nl/?url=' + srcUrl.replace(/http\w{0,1}:\/\//, ''));
      }
    }
  },
  computed: {
    getMeta() {
      let meta = '';
      let data = this.data;
      if (!data.genres) {
        return;
      }
      let city = data.pubdates.find(item => item.includes('中国大陆'));
      meta = data.durations[0] + ' / ' + data.genres.join(' / ') + ' / ' + data.directors[0].name + '（导演） / ';
      data.casts.forEach((item, index) => {
        meta += data.casts.length === index + 1 ? item.name : item.name + ' / ';
      });
      return city ? meta + ' / ' + city + '上映' : meta;
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
        font-size: 14Px;
        color: #494949;
        line-height: 44px;
      }
    }
    h2 {
      color: #aaa;
      margin: 0 0 30px;
      font-size: 15Px;
    }
    .list li {
      position: relative;
      padding: 30px 36px 30px 0;
      word-wrap: break-word;
      overflow: hidden;
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
            font-size: 14Px;
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
    .celebrities-wp {
        &::after {
            .clearfixer
        }
      .celebrities {
        .swiper-slide {
          .fl();
          width: 200px;
          text-align: center;
          margin-right: 15px;
          &:nth-last-of-type(1) {
              margin-right: 0px;
          }
          .img {
            width: 200px;
            height: 284px;
            img {
              height: 100%;
              width: 100%;
            }
          }
          span {
              display: -webkit-box;
              overflow: hidden;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              font-size: 14Px;
              line-height: 1.5;
              white-space: normal;
              text-align: center;
              color: #494949;
              margin-top: 16px;
              &:nth-of-type(2) {
                color: #aaa;
              }
          }
        }
      }
    }
    #comment-list {
      li {
        .desc {
          font-size: 0;
          line-height: normal;
          margin: 0 0 22px;
          color: #494949;
          position: relative;
          img {
            width: 72px;
            border-radius: 50%;
            vertical-align: text-top;
            margin-right: 20px;
            float: left;
          }
          strong {
            font-size: 15Px;
            display: inline-block;
            vertical-align: text-top;
            margin-right: 12px;
          }
          .stars {
            display: inline-block;
            vertical-align: text-top;
            margin-top: 8px;
          }
          .date {
            margin-top: 12px;
            font-size: 12Px;
            color: #aaa;
          }
        }
        .content {
            padding: 0 0 0 80px;
            line-height: 44px;
            color: #494949;
            white-space: pre-wrap;
        }
      }
    }

    // 影评
    .reviews {
      h3 {
        color: #494949;
        font-weight: 500;
        font-size: 17Px;
        line-height: 1.41;
        margin-bottom: 12px;
      }
      .list {
        .username {
          .stars {
            display: inline-block;
            vertical-align: middle;
          }
        }
        .abstract {
          line-height: 1.5;
          font-size: 12Px;
          color: #aaaaaa;
          margin-top: 10px;
        }
      }
    }

    .go-review-list, .go-comment-list {
            text-align: center;
            padding-bottom: 28px;
            margin-top: -30px;
            line-height: 36px;
            font-size: 15Px;
            color: #42bd56;
          }
  }
</style>
