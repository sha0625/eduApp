<template class="c">
    <div>
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
        <v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight" >        
            <div class="content" >
            
            </div>
        </v-touch>
    </div>
    
</template>
<script>
export default {
    data() {
        return{
            list: [
                {
                    problems:"（ ）是决定当代中国命运的关键一招，也是决定实现“两个一百年”奋斗目标、实现中华民族伟大复兴的关键一招。?",
                    options1: "A、 技术创新",
                    options2: "B、 改革开放",
                    options3: "C、 发展农业",
                    options4: "D、 发展服务业",
                }
            ],
            checked: true,
            radio: '0',
        }
    },
    methods:{
        // onSwipeLeft: function () {//左滑动
        //     console.log("左滑动")
        //     //写入向左滑触发事件
        //     //例如跳转页面
        // },
        
        // onSwipeRight: function () {//右滑动
        //     console.log("右滑动")
        
        // },
        
    },
}
</script>
<style lang="less" scoped>
.content{
    width: 200px;
    height: 200px;
    background: red;
}
.c{
    background-color :white;
}
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
</style>