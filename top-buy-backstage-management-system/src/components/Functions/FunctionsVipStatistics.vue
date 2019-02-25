<template>
    <div class="w-VipStatistics-content">
        <h1 class="w-VipStatistics-title">会员注册人数统计</h1>
        <div class="w-vip-count">
            <span>1</span>,
            <span>2</span>
            <span>3</span>
            <span>4</span>,
            <span>5</span>
            <span>6</span>
            <span>7</span>,
            <span>8</span>
            <span>9</span>
            <span>10</span>
        </div>
        <div id="w-VipStatistics-charsBox"></div>
    </div>
</template>

<script>
    import $ from "jquery"
    import "echarts";
    import VipStatistics from "../../../static/data/VipStatistics"
    export default {
        name: "FunctionsVipStatistics",
        data(){
            return {
                VipStatisticsEcharts:{}
            }
        },
        methods:{
            init(){
                this.VipStatisticsEcharts = VipStatistics
            }
        },
        created(){
            this.init()
        },
        mounted(){
            // 注册人数
            var num = 3141594325;
            setInterval(function(){
                var random = Math.round(Math.random()*40+10)	/*随机范围1-50*/
                num+= random;
                var str = num.toString();
                for(var i in str){
                    var positionY = "";
                    switch(str[i]){
                        case "0": positionY="0";break;
                        case "1": positionY="-45";break;
                        case "2": positionY="-90";break;
                        case "3": positionY="-135";break;
                        case "4": positionY="-180";break;
                        case "5": positionY="-225";break;
                        case "6": positionY="-270";break;
                        case "7": positionY="-315";break;
                        case "8": positionY="-360";break;
                        case "9": positionY="-405";break;
                    }
                    $($(".w-vip-count").find("span")[i]).animate({
                        "backgroundPositionY":positionY
                    },"slow","linear");
                }
            },3000);

            // 图表统计
            var dom = document.getElementById("w-VipStatistics-charsBox");
            var myChart = this.$echarts.init(dom);

            var xData = function () {
                var data = [];
                for (var i = 1; i < 13; i++) {
                    data.push(i + "月份");
                }
                return data;
            }();

            let option = {
                backgroundColor: "#2b2c2f",
                "tooltip": {
                    "trigger": "axis",
                    "axisPointer": {
                        "type": "shadow",
                        textStyle: {
                            color: "#fff"
                        }

                    },
                },
                "grid": {
                    "borderWidth": 0,
                    "top": 50,
                    "bottom": 95,
                    textStyle: {
                        color: "#fff"
                    }
                },
                "legend": {
                    x: '4%',
                    top: '11%',
                    textStyle: {
                        color: '#90979c',
                    }
                },
                "calculable": true,
                "xAxis": [{
                    "type": "category",
                    "axisLine": {
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    "splitLine": {
                        "show": false
                    },
                    "axisTick": {
                        "show": false
                    },
                    "splitArea": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0,

                    },
                    "data": xData,
                }],
                "yAxis": [{
                    "type": "value",
                    "splitLine": {
                        "show": false
                    },
                    "axisLine": {
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    "axisTick": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0,

                    },
                    "splitArea": {
                        "show": false
                    },

                }],
                "dataZoom": [{
                    "show": true,
                    "height": 30,
                    "xAxisIndex": [
                        0
                    ],
                    bottom: 30,
                    "start": 0,
                    "end": 100,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '110%',
                    handleStyle: {
                        color: "#d3dee5",

                    },
                    textStyle: {
                        color: "#fff"
                    },
                    borderColor: "#90979c"


                }, {
                    "type": "inside",
                    "show": true,
                    "height": 15,
                    "start": 1,
                    "end": 35
                }],
                "series": [{
                    "name": "",
                    "type": "bar",
                    "stack": "总量",
                    "barMaxWidth": 35,
                    "barGap": "10%",
                    "itemStyle": {
                        "normal": {
                            "color": "#2da8be",
                            "label": {
                                "show": true,
                                position:"top",
                                "textStyle": {
                                    "color": "#d1bebe",
                                },
                                formatter: function (p) {
                                    return p.value > 0 ? (p.value) : '';
                                }
                            }
                        }
                    },
                    "data": this.VipStatisticsEcharts.echartsData1,
                },
                    {
                        "name": "",
                        "type": "line",
                        "stack": "总量",
                        symbolSize: 10,
                        symbol: 'circle',
                        "itemStyle": {
                            "normal": {
                                "color": "rgba(252,230,48,1)",
                                "barBorderRadius": 0,
                                "label": {
                                    "show": true,
                                    "position": "top",
                                    formatter: function (p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        "data": this.VipStatisticsEcharts.echartsData2
                    },
                ]
            }

            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }

            window.addEventListener("resize", function () {
                myChart.resize();
            })
        }
    }
</script>

<style scoped>
    .w-VipStatistics-content{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 30px;
    }
    .w-VipStatistics-title {
        width: 17%;
        color: #d1bebe;
        font-size: 30px;
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #d1bebe;
        margin-bottom: 50px;
        margin-right: 300px;
        float: left;
    }
    #w-VipStatistics-charsBox{
        clear: both;
        width: 100%;
        height: 740px;
    }

    /* 注册人数 */
    .w-vip-count {
        float: left;
        margin-top: 15px;
        color:#d1cdca;
        font-size: 20px;
    }
    .w-vip-count span{
        font-size: 25px;
        color: rgba(0,0,0,0);
        text-align: center;
        display: inline-block;
        width: 37px;
        height: 37px;
        background: url(../../../static/images/system/VipStatistics/vipCount3.png);
    }
    .w-vip-count span:nth-child(1),.w-vip-count span:nth-child(4),.w-vip-count span:nth-child(7){
        margin-right: 15px;
    }
    .w-vip-count span:nth-child(1){
        background-position: 0px -135px;
    }
    .w-vip-count span:nth-child(2){
        background-position: 0px -45px;
    }
    .w-vip-count span:nth-child(3){
        background-position: 0px -180px;
    }
    .w-vip-count span:nth-child(4){
        background-position: 0px -45px;
    }
    .w-vip-count span:nth-child(5){
        background-position: 0px -225px;
    }
    .w-vip-count span:nth-child(6){
        background-position: 0px -405px;
    }
    .w-vip-count span:nth-child(7){
        background-position: 0px -180px;
    }
    .w-vip-count span:nth-child(8){
        background-position: 0px -135px;
    }
    .w-vip-count span:nth-child(9){
        background-position: 0px -90px;
    }
    .w-vip-count span:nth-child(10) {
        background-position: 0px -225px;
    }
</style>