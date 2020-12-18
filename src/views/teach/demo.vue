<template>
  <div class="back" @touchstart.prevent="touchStart" @touchmove.prevent="touchMove" @touchend="touchEnd" ref="back">
    <div class="back-l" ref="left">
      <ul v-for="(item,index) in list" v-bind:key="index">
            <li class="exercises">
                <p class="wp"><span class="wp_title"> {{item.problems}} </span></p>
                <van-radio-group v-model="radio" class="options">
                    <van-radio name="0" style="display:none"></van-radio>
                    <van-radio name="1" class="tl_option">{{item.options1}}</van-radio>
                    <van-radio name="2" class="tl_option">{{item.options2}}</van-radio>
                    <van-radio name="3" class="tl_option">{{item.options3}}</van-radio>
                    <van-radio name="4" class="tl_option">{{item.options4}}</van-radio>
                </van-radio-group>
            </li>
        </ul>
    </div>
    <div class="back-r" ref="right">
        <ul v-for="(item,index) in list2" v-bind:key="index">
            <li class="exercises">
                <p class="wp"><span class="wp_title"> {{item.problems}} </span></p>
                <van-radio-group v-model="radio" class="options">
                    <van-radio name="0" style="display:none"></van-radio>
                    <van-radio name="1" class="tl_option">{{item.options1}}</van-radio>
                    <van-radio name="2" class="tl_option">{{item.options2}}</van-radio>
                    <van-radio name="3" class="tl_option">{{item.options3}}</van-radio>
                    <van-radio name="4" class="tl_option">{{item.options4}}</van-radio>
                </van-radio-group>
            </li>
        </ul>
    </div> 
  </div>
</template>
 
<script>
export default {
  data() {
    return {
        list: [
                {
                    problems:"（ ）是决定当代中国命运的关键一招，也是决定实现“两个一百年”奋斗目标、实现中华民族伟大复兴的关键一招。?",
                    options1: "A、 技术创新",
                    options2: "B、 改革开放",
                    options3: "C、 发展农业",
                    options4: "D、 发展服务业",
                }
                
            ],
        list2: [
            {
                problems:"有权决定全国或者个别省、市、自治区、直辖市进入紧急状态的国家机关是( )?",
                options1: "A、 国务院",
                options2: "B、 中央军事委员会",
                options3: "C、 全国人大常委会",
                options4: "D、 国家主席",
            }
        ],
        currentPlay: 'red',
        percent: 0,
        radio: '0',
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    //  滑动开始点
    touchStart(e) {
      const touch = e.touches[0]
      // 滑动开始点的X、Y轴
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    //   console.log("...."+this.touch.startX)
    //   console.log("...."+this.touch.startY)

    },
    // 滑动过程
    touchMove(e) {
      console.log("move");
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      const left = this.currentPlay == 'red' ?  0 : -window.innerWidth
      var offsetWidth = Math.min(0, Math.max(-window.innerWidth,left+deltaX))
      this.percent = Math.abs(offsetWidth/window.innerWidth)
      this.$refs.back.style["transform"] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.back.style["transitionDuration"] = 10 
    },
    // 滑动后
    touchEnd() {
      console.log("end");
      console.log(this.percent);
      let offsetWidth
      let percent
      if(this.currentPlay === 'red'){
        if(this.percent > 0.1) {
          this.currentPlay = 'yellow'
          offsetWidth = -window.innerWidth
        } else {
          offsetWidth = 0
        }
      } else {
        if(this.percent < 0.9) {
          this.currentPlay = 'red'
          offsetWidth = 0
        } else {
          offsetWidth = -window.innerWidth
        }
      }
      this.$refs.back.style["transform"]  = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.back.style["transitionDuration"] = 10
    }
  }
}
</script>
 
<style scoped lang="less" >
.exercises{
    .wp{
        margin: 0 5px 5px 5px;
        .wp_title{
            margin-left: 5px;
        }
    }
    .options{
        margin-left: 21px;
        margin-top: 10px;
        .tl_option{
            margin-top: 20px;
        }
    }
}
.back{
  position: fixed;
  width: 100%;
  height: 100px;
  white-space: nowrap;
  .back-l{
    position: relative;
    vertical-align: top;
    display: inline-block;
    width: 100%;
    height: 100%;
    background-color: red;
    }
    .back-r{
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 100%;
        background-color: yellow;
    }
 }
</style>