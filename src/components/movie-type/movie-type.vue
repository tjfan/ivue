<template>
    <div class="movie-type">
        <h1>{{title}}</h1>
    </div>
</template>

<script>
import { getMovie } from '@/api/movie-show';
export default {
    name: 'movie-type',
    data() {
        return {
            title: ''
        }
    },
    created() {
        this.title = this.$route.query.type;
    }
}
</script>

<style lang="less" scoped>
.movie-type {
    h1 {
        margin-top: 32px;
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
}
</style>
