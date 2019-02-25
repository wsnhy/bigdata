<template>
    <div class="w-Campaign-content">
        <!--<img src="../../assets/images/system/Campaign/timg.gif" alt="" id="w-Campaign-logo">-->
        <div class="box">
            <div class="w-activity-time">
                <h1>{{CampaignData.activity.title}}</h1>
                <h1>
                    {{CampaignData.activity.time}}
                    <span id="activity-time"></span>
                </h1>
            </div>
            <div class="w-activity-type" :key="index" v-for="(a,index) in CampaignData.activityType">
                <h6>{{a.title}}</h6>
                <div class="w-activity-content">
                    <img :src="a.pic" alt="">
                    <div class="w-activity-introduce">
                        <h5>{{a.activityIntroduce.title}}</h5>
                        <p :key="index" v-for="(b,index) in a.activityIntroduce.content">{{b}}</p>
                        <h5>{{a.activityIntroduce.activitytTime.title}}</h5>
                        <p>{{a.activityIntroduce.activitytTime.times}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery"
    import CampaignData from "../../../static/data/Campaign"
    export default {
        name: "FunctionsCampaign",
        data(){
            return {
                CampaignData:{}
            }
        },
        methods:{
            init(){
                this.CampaignData = CampaignData
            }
        },
        created(){
          this.init()
        },
        mounted(){
            // 活动logo跳转所有活动
            // $("#w-Campaign-logo").click(()=>{
            //     $("#w-Campaign-logo").css("display","none")
            //     $(".box").css("display","block");
            // })

            // 活动开放倒计时
            // var date = new Date();
            // var afterDate = new Date();
            // afterDate.setDate((afterDate.getDate()+10));
            // var times = afterDate - date.getTime();
            // console.log("现在的时间："+date);
            // console.log("十天后的时间："+afterDate);
            // console.log("时间差："+times);
            var endTime = new Date("2019-2-1 00:00:00");
            setInterval(function(){
                var startTime = new Date();
                var t = endTime.getTime() - startTime.getTime();//毫秒
                t = t / 1000; 							//秒
                var s = parseInt(t % 60);				//获取秒
                var m = parseInt(t / 60) %60;			//获取分
                var h = parseInt(t / 3600) %24;			//获取时
                var days = parseInt(t / 3600 / 24);		//获取天数
                $("#activity-time").html(days+"天"+h+"小时"+m+"分钟"+s+"秒")
            },1000)
        }
    }
</script>

<style scoped>
    .w-Campaign-content{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 30px;
        color: #d1cdca;
    }
    #w-Campaign-logo{
        width: 800px;
        height: 500px;
        position: fixed;
        left: 13%;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
    .w-activity-time h1{
        float: left;
        margin-right: 100px;
        margin-bottom: 50px;
        font-size: 30px;
    }
    .w-activity-type{
        clear: both;
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        padding-bottom: 50px;
    }
    .w-activity-type h6{
        font-size: 20px;
        margin-bottom: 10px;
        margin-left: 10px;
    }
    .w-activity-content{
        width: 100%;
        height: 300px;
    }
    .w-activity-content img{
        float: left;
        height: 300px;
        width: 30%;
    }
    .w-activity-content .w-activity-introduce{
        float: left;
        width: 70%;
        height: 300px;
        background: #323437;
        box-sizing: border-box;
        padding: 20px;
    }
    .w-activity-introduce h5{
        font-size: 22px;
        margin-bottom: 10px;
    }
    .w-activity-introduce h5:nth-of-type(2){
        margin-top: 30px;
    }
    .w-activity-introduce p{
        margin-left: 40px;
        font-size: 18px;
        line-height: 30px;
    }
    .box{
        /*display: none;*/
    }
</style>
