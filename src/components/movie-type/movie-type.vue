<template>
    <scroll 
        class="wrapper"
        ref="scroll"
        :listenScroll="listenScroll"
        :pullDownRefresh="pullDownRefresh"
        @onPullingDown="pullingDown">
        <div class="content">
            <h1>{{title}}</h1>
            <ul>
                <li v-for="item in moviedata.subjects" :key="item.id">
                    <item :data="item"></item>
                </li>
            </ul>
        </div>
    </scroll>
</template>

<script>
import { getMovie } from '@/api/movie-show';
import { tagSearch } from '@/api/movie-search';
import Scroll from '@/base/scroll/scroll';
import Item from '@/base/item/Item';
import { setTimeout } from 'timers';
export default {
    name: 'movie-type',
    data() {
        return {
            title: '',
            moviedata: [],
            count: 18,
            pullDownRefresh: {
                threshold: 90,
                stop: 40
            },
            listenScroll: true
        }
    },
    created() {
        this.title = this.$route.query.type;
    },
    mounted() {
        this.$nextTick(() => {
            this._getMovie();
        });
    },
    methods: {
        _getMovie() {
            if (this.title === '影院热映') {
                getMovie(0, this.count)
                    .then(result => {
                        this.moviedata = result;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else if (this.title === '免费在线观影') {

            } else if (this.title === '新片速递') {

            } else {
                tagSearch(this.title, 0, this.count)
                    .then(result => {
                        this.moviedata = result;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        async pullingDown() {
            await getMovie(0, this.count)
                .then(res => {
                    this.moviedata = res;
                })
                .catch(err => {
                    console.log(err);
                });
            this.$refs.scroll._afterPullDown();
        }
    },
    destroyed() {
        this.listenScroll = false;
    },
    components: {
        Scroll,
        Item
    }
}
</script>

<style lang="less" scoped>
.wrapper{
    height: 100%;
    position: relative;
}
h1 {
    padding-top: 32px;
    font-size: 24Px;
    font-weight: normal;
    box-sizing: border-box;
    max-width: 1320px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 12px;
    padding-left: 4%;
    color: #494949;
}
.content {
    position: relative;
    z-index: 10;
    background: #fff;
    ul {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 2% 0 2%;
        justify-content: space-around;
        li {
            box-sizing: border-box;
            margin-bottom: 40px;
            overflow: hidden;
        }
    }
}
</style>
