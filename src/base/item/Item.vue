<template>
    <div class="item-wp" @click="goDetail">
        <div class="img">
            <img :src="data.images.large" alt="">
        </div>
        <div class="title">{{data.title}}</div>
        <div class="grade">
            <star :rating="data.rating"></star>
        </div>
    </div>
</template>

<script>
import Star from '@/base/star/Star';
export default {
    name: 'item',
    props: {
        data: {
            type: Object,
            defaul: function () {
                return {};
            }
        }
    },
    methods: {
        goDetail() {
            this.$router.push({
                path: `/movie/${this.data.id}`
            });
        }
    },
    components: {
        Star
    }
}
</script>

<style lang="less" scoped>
@import '../../common/less/mixin.less';
.item-wp {
    width: 200px;
    text-align: center;
    color: #111;
    .img {
        width: 200px;
        height: 284px;
        padding-top: 30px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .title {
        font-size: 13Px;
        line-height: 14Px;
        .no-wrap();
        margin-top: 20px;
    }
    .grade {
        margin-top: 10px;
    }
}
</style>

