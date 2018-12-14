<template>
  <div class="movie-wp">
    <movie-slider
      v-for="(item, index) in movie"
      :key="index"
      :title="item.title"
      :data="item.data"
      class="movie-list"></movie-slider>
      <div class="find-movie">

      </div>
      <div class="movie-type">
        <div class="title">{{movieType.title}}</div>
        <ul class="main">
          <li v-for="item in movieType.listType" :key="item.id">
            <span>{{item.name}}</span>
            <span class="more"></span>
          </li>
        </ul>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MovieSlider from '@/components/movie-slider/MovieSlider';
import { getMovie, getNewMovie, getFreeMovie } from '@/api/movie-show';
export default {
  name: 'movie',
  data () {
    return {
      movie: [
        {
          title: '影院热映',
          data: null

        },
        {
          title: '免费在线观影',
          data: null
        },
        {
          title: '新片速递',
          data: null
        },
      ],
      movieType: {
        title: '分类浏览',
        listType: [
          {
            name: '经典',
            id: 'jd'
          },
          {
            name: '冷门佳片',
            id: 'lmjp'
          },
          {
            name: '豆瓣高分',
            id: 'dbgf'
          },
          {
            name: '动作',
            id: 'dz'
          },
          {
            name: '喜剧',
            id: 'xj'
          },
          {
            name: '爱情',
            id: 'aq'
          },
          {
            name: '悬疑',
            id: 'xy'
          },
          {
            name: '恐怖',
            id: 'kb'
          },
          {
            name: '科幻',
            id: 'kh'
          },
          {
            name: '治愈',
            id: 'zy'
          },
          {
            name: '文艺',
            id: 'wy'
          },
          {
            name: '成长',
            id: 'cz'
          },
          {
            name: '动画',
            id: 'dh'
          },
          {
            name: '华语',
            id: 'hy'
          },
          {
            name: '欧美',
            id: 'om'
          },
          {
            name: '韩国',
            id: 'hg'
          },
          {
            name: '日本',
            id: 'rb'
          },
          {
            name: '',
            id: ''
          }
        ]
      }
    }
  },
  mounted () {
    this._getHotMovie();
    this._getNewMovie();
    this._getFreeMovie();
  },
  methods: {
    _getHotMovie() {
      getMovie(0, 8)
        .then(res => {
          this.movie[0].data = res.subjects;
        })
        .catch(err => {
          console.log(err);
        });
    },
    _getFreeMovie() {
      getFreeMovie(0, 8)
        .then(res => {
          this.movie[1].data = res.subjects;
        })
        .catch(err => {
          console.log(err);
        });
    },
    _getNewMovie() {
      getNewMovie(0, 8)
        .then(res => {
          this.movie[2].data = res.subjects;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    MovieSlider
  }
};
</script>

<style scoped lang="less">
@import "../../common/less/variable.less";
.movie-wp {
  padding: 20px 36px 0 36px;
  .movie-list {
    margin-bottom: 40px;
  }
  .movie-type {
    padding-bottom: 50px;
    padding-top: 40px;
    .title {
      color: #111;
      font-size: 18Px;
    }
    .main {
      margin-top: 30px;
      font-size: 14Px;
      color: #42bd56;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      border-bottom: 1Px solid #eee;
      li {
        width: 49%;
        height: 84px;
        line-height: 84px;
        border-top: 1Px solid #eee;
        border-right: 1Px solid #eee;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:nth-of-type(2n) {
          border-right: none;
          padding-left: 34px;
        }
        &:nth-of-type(2n+1) {
          padding-right: 34px;
        }
        .more {
          color: #ccc;
          font-weight: bold;
          display: inline-block;
          border-right: solid 1Px #ccc;
          border-bottom: solid 1Px #ccc;
          width: 16px;
          height: 16px;
          transform: rotate(-45deg);
        }
      }
    }
  }
}
</style>
