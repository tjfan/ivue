<template>
    <div class="swiper-container" ref="swiper">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper';
export default {
    name: 'slider',
    props: {
        data: {
            default: null
        },
        autoplay: {
            type: [Number, Boolean],
            default: false
        },
        direction: {
            type: String,
            default: 'horizontal' // vertical
        },
    },
    data () {
        return {}
    },
    mounted () {
        this.$nextTick(() => {
            this._initSwiper();
        });
    },
    methods: {
        _initSwiper() {
            if (!this.$refs.swiper) {
                return;
            }
            this.swiper = new Swiper(this.$refs.swiper, {
                autoplay: this.autoplay,
                direction: this.direction,
                slidesPerView: 'auto',
                observer: true
                // observeParents: true
            });
        },
    },
    watch: {
        data() {
            this.$nextTick(() => {
                this.swiper.update();
            });
        }
    }
}
</script>

<style lang="less" scoped>

</style>

