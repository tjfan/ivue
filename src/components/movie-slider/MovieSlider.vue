<template>
    <div class="movie-slider-wp">
        <header>
            <h1>{{title}}</h1>
            <span>更多</span>
        </header>
        <div class="content">
            <slider class="list-item-wp" :data="data">
                <item 
                    class="list-item swiper-slide"
                    v-for="item in data"
                    :data="item"
                    :key="item.id"></item>
            </slider>
        </div>
    </div>
</template>

<script>
import Slider from '@/base/slider/Slider';
import Item from '@/base/item/Item';
export default {
    name: 'movie-slider',
    props: {
        title: {
            type: String,
            default: '影院热映',
            require: true
        },
        data: {
            type: Array,
            default: null
        }
    },
    methods: {},
    components: {
        Slider,
        Item
    }
}
</script>

<style lang="less" scoped>
@import '../../common/less/mixin.less';
header {
    display: flex;
    justify-content: space-between;
    h1 {
        color: #111;
        font-size: 18Px;
    }
    span {
        color: #42bd56;
        font-size: 14Px;
    }
}
.content {
    &::after {
        .clearfixer;
    }
    .list-item {
        .fl;
        margin-right: 15px;
        &:nth-last-of-type(1) {
            margin-right: 0px;
        }
    }
}
</style>

