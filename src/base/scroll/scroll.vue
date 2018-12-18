<template>
  <div ref="wrapper">
    <slot></slot>
    
    <slot 
      name="pulldown-wrapper"
      >
      <div class="pulldown-wrapper" ref="pullingdown" v-if="pullDownRefresh">
          <canvas width="50" height="80" ref="canvas" v-show="!pullDownloading && !refreshTxt"></canvas>
          <img src="./loading.gif" alt="" width="20" height="20" v-show="pullDownloading && !refreshTxt">
          <div v-show="refreshTxt && !pullDownloading">加载完成</div>
      </div>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
  let initRadius = 18;
  let minHeadRadius = 12;
  let smRadius = 5;

  let maxdistance = 40;
  let distance = 0;

  let initArrowRadius = 10;
  let minArrowRadius = 6;
  let arrowWidth = 3;

  let centerX = 25;
  let centerY = 25;
  let headerCenter = {
      x: centerX,
      y: centerY
  }
  import BScroll from 'better-scroll';
import { setTimeout } from 'timers';
  export default {
    props: {
      probeType: { // 派发滚动事件方式
        type: Number,
        default: 1
      },
      click: { // 是否支持点击
        type: Boolean,
        default: true
      },
      data: {
        default: null
      },
      scrollX: { // 设置滚动方向为x轴
        type: Boolean,
        default: false
      },
      listenScroll: { // 监听滚动
        type: Boolean,
        default: false
      },
      beforeScroll: { // 滚动开始派发
        type: Boolean,
        default: false
      },
      eventPassthrough: { // 忽略滚动的方向
        type: String,
        default: ''
      },
      // 是否开启上拉加载功能
      pullUpLoad: {
        type: null,
        default: false
      },
      // 是否开启下拉刷新
      pullDownRefresh: {
        type: null,
        default: false
      },
      refreshTxt: {
        type: Boolean,
        default: false
      },
      // 正在加载
      pullDownloading: {
        type: Boolean,
        default: false
      }
    },
    updated() {
      if (this.refreshTxt) {
        setTimeout(() => {
          this.scroll.finishPullDown();
        },300);
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
      });
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return;
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.scrollX,
          eventPassthrough: this.eventPassthrough,
          pullDownRefresh: this.pullDownRefresh
        });
        // 是否需要监听滚动事件
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos);

            if (this.pullDownRefresh) {
              let top = Math.min(pos.y - 45, 10);
              this.$refs.pullingdown.style.top = `${top}px`;
              distance= Math.max(0, Math.min((pos.y - 45), maxdistance));
              this.draw();
            }

          });
        }
        
        if (this.pullDownRefresh) {
          this.scroll.on('pullingDown', () => {
            this.$emit('onPullingDown');
          });
        }

        // 在触发滚动之前派发事件，这里主要用于用户体验优化
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll');
          });
        }
      },
      enable() {
        this.scroll && this.scroll.enable();
      },
      disable() {
        this.scroll && this.scroll.disable();
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
      },
      draw() {
        let canvas = this.$refs.canvas;
        canvas.style.width = 50;
        canvas.style.height = 80;
        let ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, 50, 80);

        this.drawBubble(ctx);

        this.drawArrow(ctx);
      },
      drawBubble(ctx) {
        ctx.save();
        ctx.beginPath();

        let rate = distance / maxdistance;
        let maxRa = initRadius - (initRadius  - minHeadRadius) * rate;
        headerCenter.y = centerY - (initRadius - minHeadRadius) * rate;
        // 绘制路径
        ctx.arc(headerCenter.x, headerCenter.y, maxRa, 0, Math.PI, true);

        // 小圆半径
        let smRa = initRadius - (initRadius - smRadius) * rate;
        // 小圆中心点
        let smCenter = {
            x: centerX,
            y: headerCenter.y + distance
        }

        let smCenterL = {
            x: smCenter.x - smRa,
            y: smCenter.y
        }

        let controlL = {
            x: smCenterL.x,
            y: smCenter.y - distance/2
        }

        ctx.quadraticCurveTo(controlL.x, controlL.y, smCenterL.x, smCenterL.y);
        ctx.arc(smCenter.x, smCenter.y, smRa, Math.PI, 0, true);

        let controlR = {
            x: smCenter.x + smRa,
            y: smCenter.y - distance/2
        }

        let maxR = {
            x: headerCenter.x + maxRa,
            y: headerCenter.y
        }
        ctx.quadraticCurveTo(controlR.x, controlR.y, maxR.x, maxR.y);

        // 绘制样式
        ctx.fillStyle = 'rgb(170, 170, 170)';
        ctx.fill();

        ctx.strokeStyle = 'rgb(153, 153, 153)';
        ctx.closePath();
        ctx.restore();
      },
      drawArrow(ctx) {
        ctx.save();
        ctx.beginPath();

        let rate = distance / maxdistance;
        let arrowRadius = initArrowRadius - (initArrowRadius - minArrowRadius) * rate;

        // 画内圆
        ctx.arc(headerCenter.x, headerCenter.y, arrowRadius - (arrowWidth - rate), -Math.PI/2, 0, true);
        // 外圆
        ctx.arc(headerCenter.x, headerCenter.y, arrowRadius, 0, Math.PI*3/2, false);

        ctx.lineTo(headerCenter.x, headerCenter.y - arrowRadius - arrowWidth/2);
        ctx.lineTo(headerCenter.x + 2 * arrowWidth - rate * 2, headerCenter.y - arrowRadius + arrowWidth/2);
        ctx.lineTo(headerCenter.x, headerCenter.y - arrowRadius + arrowWidth*3/2);

        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fill();
        ctx.strokeStyle = 'rgb(170, 170, 170)';
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }
    },
    watch: {
      data() {
        this.$nextTick(() => {
          this.refresh();
        });
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
.pulldown-wrapper {
    width: 100%;
    /* line-height: 80px; */
    // background-color: gold;
    position: absolute;
    // top: -140px;
    left: 0px;
    text-align: center;
    &>div {
      // display: none;
      margin-top: 40px; 
    }
    &>img {
      display: none;
      margin-top: 40px;
      width: 40px;
      height: 40px;
      display: inline-block;
    }
    #canvas {
        /* background: #f40; */
        margin: 0 auto;
    }
}
</style>
