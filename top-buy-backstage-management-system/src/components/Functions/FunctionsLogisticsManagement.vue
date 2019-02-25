<template>
    <div class="w-LogisticsManagement-content-box">
        <div class="w-LogisticsManagement-box">
            <h1 class="w-LogisticsManagement-title">{{LogisticsManagementData.title}}</h1>
            <div class="w-LogisticsManagement-content">
                <!-- 数量统计 -->
                <div class="w-LogisticsManagement-QuantityStatistics">
                    <div class="w-LogisticsManagement-QuantityStatistics-type" :key="index" v-for="(a,index) in LogisticsManagementData.QuantityStatisticsType">
                        <h1>{{a.tit}}</h1>
                        <div class="w-QuantityStatistics">
                            <p>{{a.QuantityStatisticsCont}}</p>
                            <img :src="a.QuantityStatisticsPic" alt="">
                        </div>
                        <div class="w-LogisticsManagement-QuantityStatistics-person">
                            <p :key="index" v-for="(b,index) in a.QuantityStatisticsPerson">{{b}}</p>
                        </div>
                        <div class="w-LogisticsManagement-QuantityStatistics-line"></div>
                    </div>
                </div>
                <!-- 空白区域 -->
                <div class="w-LogisticsManagement-blank"></div>
                <!-- 排行榜 -->
                <div class="w-LogisticsManagement-Billboard-box">
                    <div class="w-LogisticsManagement-Billboard">
                        <h1>{{LogisticsManagementData.Billboard.title}}</h1>
                        <h6>{{LogisticsManagementData.Billboard.more}}</h6>
                    </div>
                    <div class="w-LogisticsManagement-ranking">
                        <div class="w-LogisticsManagement-ranking-left">
                            <p>{{LogisticsManagementData.ranking.content1}}</p>
                            <h1>
                                {{LogisticsManagementData.ranking.num1}}
                                <img :src="LogisticsManagementData.ranking.pic1" alt="">
                            </h1>
                            <p>{{LogisticsManagementData.ranking.content2}}</p>
                            <h1>
                                {{LogisticsManagementData.ranking.num2}}
                                <img :src="LogisticsManagementData.ranking.pic2" alt="">
                            </h1>
                        </div>
                        <div class="w-LogisticsManagement-ranking-right">
                            <div class="w-ranking-centre" :key="index" v-for="(c,index) in LogisticsManagementData.rankingCentre">
                                <div class="w-ranking-serialNumber">{{c.serialNumber}}</div>
                                <div class="w-ranking-content">
                                    <div class="w-ranking-name">
                                        <p>{{c.rankingName.content}}</p>
                                        <p>{{c.rankingName.num}}</p>
                                    </div>
                                    <div class="w-ranking-progress">
                                        <div class="w-progress"></div>
                                    </div>
                                </div>
                                <img :src="c.pic" alt="">
                                <p>{{c.goodNum}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 中转消息 -->
                <div class="w-LogisticsManagement-information">
                    <div class="w-LogisticsManagement-Billboard">
                        <h1>{{LogisticsManagementData.Billboard2.title}}</h1>
                        <h6>{{LogisticsManagementData.Billboard2.more}}</h6>
                    </div>
                    <div class="w-information">
                        <ul>
                            <li :key="index" v-for="(d,index) in LogisticsManagementData.Billboard2.information">
                                <a href="">
                                    {{d.content}}
                                    <span>{{d.time}}</span>
                                </a>
                            </li>
                        </ul>
                        <img :src="LogisticsManagementData.Billboard2.pic" alt="">
                    </div>
                </div>
                <div class="w-charts">
                    <div class="w-charts-box" :key="index" v-for="(d,index) in LogisticsManagementData.chartsBox">
                        <h1>{{d.title}}</h1>
                        <div class="w-charts-day">
                            <p :key="index" v-for="(e,index) in d.chartsDay">{{e}}</p>
                        </div>
                        <h5>
                            {{d.content}}
                            <span>{{d.contentNum}}</span>
                        </h5>
                        <div class="w-chartsDataBox" :id="d.chartsId"></div>
                        <div class="w-charts-data">
                            <div class="w-charts-data-left">
                                <h6>{{d.chartsDataLeft.content}}</h6>
                                <p>{{d.chartsDataLeft.num}}</p>
                            </div>
                            <div class="w-charts-data-right">
                                <h6>{{d.chartsDataRight.content}}</h6>
                                <p>{{d.chartsDataRight.num}}</p>
                            </div>
                        </div>
                        <input type="button" value="查看详情" class="w-charts-look">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery"
    import "echarts";
    import LogisticsManagement from "../../../static/data/LogisticsManagement"
    export default {
        name: "FunctionsLogisticsManagement",
        data(){
            return {
                LogisticsManagementData:{}
            }
        },
        methods:{
            init(){
                this.LogisticsManagementData = LogisticsManagement
            }
        },
        created(){
            this.init()
        },
        mounted(){
            // 中心进度条效果
            var centre = $(".w-ranking-centre .w-progress")
            var TotalWidth = parseInt($(".w-ranking-centre .w-ranking-progress").css("width"))
            var wid1 = TotalWidth * 0.85;
            var wid2 = TotalWidth * 0.62;
            var wid3 = TotalWidth * 0.35;

            $(centre[0]).animate({
                "width":wid1
            },"slow","linear")
            $(centre[1]).animate({
                "width": wid2
            }, "slow", "linear")
            $(centre[2]).animate({
                "width": wid3
            }, "slow", "linear")


            // 点赞效果
            $(".w-ranking-centre img").each(function(){
                var good = false;
                $(this).click(function(){
                    var num = parseInt($(this).next().html());
                    good = !good;
                    if(good){
                        $(this).attr("src", "../../../static/images/system/LogisticsManagement/good2.png");
                        num++;
                        $(this).next().html(num);
                    }else{
                        $(this).attr("src", "../../../static/images/system/LogisticsManagement/good1.png");
                        num--;
                        $(this).next().html(num);
                    }
                })
            })

            // 图表一
            var dom = document.getElementById("w-vehicle");
            var myChart3 = this.$echarts.init(dom);

            let option1 = {
                backgroundColor: '#323437',
                title: {
                    text: '',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 16,
                        color: '#F1F1F3'
                    },
                    left: '6%'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                },
                legend: {
                    icon: 'rect',
                    itemWidth: 14,
                    itemHeight: 5,
                    itemGap: 13,
                    data: [''],
                    right: '4%',
                    textStyle: {
                        fontSize: 12,
                        color: '#292f39'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    data: this.LogisticsManagementData.echartsData.charts1.data1
                }],
                yAxis: [{
                    type: 'value',
                    name: '',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    axisLabel: {
                        show: false,
                        margin: 10,
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                }],
                series: [{
                    name: '移动',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: 'rgba(16,97,204, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(17,235,210, 0.1)'
                            }], false),
                            shadowColor: 'rgba(60, 247, 226, 0.5)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {

                            color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: 'rgba(16,97,204,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(17,235,210,1)'
                            }])
                        },
                        emphasis: {
                            color: 'rgb(0,196,132)',
                            borderColor: 'rgba(0,196,132,0.2)',
                            extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                            borderWidth: 10
                        }
                    },
                    data: this.LogisticsManagementData.echartsData.charts1.data2
                }]
            };

            if (option1 && typeof option1 === "object") {
                myChart3.setOption(option1, true);
            }

            window.addEventListener("resize", function () {
                myChart3.resize();
            })

            // 图表二
            var dom = document.getElementById("w-cargo");
            var myChart5 = this.$echarts.init(dom);

            let option2 = {
                backgroundColor: '#323437',
                grid: {
                    left: '0%',
                    right: '0%',
                    top: "2%",
                    bottom: '5%',
                    containLabel: true
                },
                xAxis: {
                    data: this.LogisticsManagementData.echartsData.charts2.data1,
                    axisLine: {
                        show:false,
                        lineStyle: {
                            color: '#0177d4'
                        }
                    },
                    axisLabel: {
                        color: '#d1bebe',
                        fontSize: 14
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    name: "",
                    nameTextStyle: {
                        color: '#d1bebe',
                        fontSize: 16
                    },
                    axisLine: {
                        show:false,
                        lineStyle: {
                            color: '#d1bebe'
                        }
                    },
                    axisLabel: {
                        show:false,
                        color: '#d1bebe',
                        fontSize: 16
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: '#d1bebe'
                        }
                    },
                    interval: 100,
                    max: 800

                },
                series: [{
                    type: 'bar',
                    barWidth: 30,
                    itemStyle: {
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#00b0ff'
                            }, {
                                offset: 0.8,
                                color: '#7052f4'
                            }], false)
                        }
                    },
                    data: this.LogisticsManagementData.echartsData.charts2.data2
                }]
            };

            if (option2 && typeof option2 === "object") {
                myChart5.setOption(option2, true);
            }

            window.addEventListener("resize", function () {
                myChart5.resize();
            })

            // 图表三
            var dom = document.getElementById("w-ticket");
            var myChart4 = this.$echarts.init(dom);

            /*---------------------数据----------------------------*/
            var echartData = [{
                value: 15, //时间
                name: '交卷时间'
            }, {
                value: 5,
                name: '未交卷时间'
            }];

            //蓝色
            var innerColor = '#2bff8f'; //内层颜色
            var outColor = "#50e0ff"; //外层边框色粗
            var textColor = '#50e0ff'; //文字颜色
            var startColor = 'rgba(73,223,240,0.1)'; //中间饼图渐变开始颜色
            var endColor = 'rgba(73,223,240,0.8)'; //中间饼图渐变结束颜色

            /*---------------------缩放----------------------------*/
            var scale = 1;
            /*---------------------颜色配置----------------------------*/
            var color = [{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: startColor // 0% 处的颜色
                }, {
                    offset: 1,
                    color: endColor // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
            }, 'none'];
            /*---------------------富文本----------------------------*/
            var rich = {
                time: {
                    color: innerColor,
                    fontSize: 30 * scale,
                    padding: [0, 0],
                    fontWeight: 'bold'
                },
                unit: {
                    color: innerColor,
                    fontSize: 30 * scale,
                    padding: [0, 0, 0, 0],
                    verticalAlign: 'bottom',
                }
            }


            let option3 = {
                backgroundColor: '#323437',
                title: [{
                    text: '整体分析',
                    x: '50%',
                    y: '90%',
                    textAlign: 'center',
                    textStyle: {
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: 24 * scale,
                        fontWeight: 'bold'
                    },
                }],
                legend: {
                    show: false,
                    itemGap: 12,
                    data: ['通过', '未通过']
                },
                series: [
                    //内圈圆环
                    {
                        name: 'Line 0',
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        center: ['50%', '50%'],
                        radius: ['50%', '51.5%'],
                        itemStyle: {
                            normal: {
                                color: innerColor
                            }
                        },
                        data: [{
                            value: 10,
                            name: '',
                        }],
                        label: {
                            normal: {
                                formatter: function (params) {
                                    var time = echartData[0].value;
                                    return '{time|' + time + '}{unit|min}';
                                },
                                position: 'center',
                                textStyle: {
                                    fontSize: 38 * scale,
                                    fontWeight: 'bold',
                                    color: textColor
                                },
                                rich: rich
                            }
                        }
                    },
                    //中间圆环
                    {
                        name: 'Line 1',
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        center: ['50%', '50%'],
                        radius: ['75%', '65%'],
                        color: color,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                },
                            }
                        },
                        data: echartData,
                    },
                    //外层圆环
                    {
                        name: 'Line 2',
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        center: ['50%', '50%'],
                        radius: ['75%', '75%'],
                        itemStyle: {
                            normal: {
                                borderWidth: 2 * scale,
                                borderColor: outColor,
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                },
                            }
                        },
                        data: [{
                            value: 10,
                            name: '',

                        }]
                    }
                ],
            };

            if (option3 && typeof option3 === "object") {
                myChart4.setOption(option3, true);
            }

            window.addEventListener("resize", function () {
                myChart4.resize();
            })
        }
    }
</script>

<style scoped>
    .w-LogisticsManagement-content-box{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 30px;
    }

    /* 物流盒子 */
    .w-LogisticsManagement-box {
        width: 100%;
        overflow: hidden;
    }

    /* 标题 */
    .w-LogisticsManagement-title {
        width: 22%;
        color: #d1bebe;
        font-size: 30px;
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #d1bebe;
        margin-bottom: 50px;
    }

    /* 物流内容 */
    .w-LogisticsManagement-content{
        width: 100%;
        box-sizing: border-box;
        background: #383a3c;
        padding-bottom: 50px;
    }

    /* 数量统计 */
    .w-LogisticsManagement-QuantityStatistics{
        width: 100%;
        height: 250px;
        display: flex;
        color: #d1cdca;
        background: #323437;
    }

    /* 统计类型 */
    .w-LogisticsManagement-QuantityStatistics-type{
        flex: 1;
        text-align: center;
        padding-top: 30px;
        position: relative;
    }
    .w-LogisticsManagement-QuantityStatistics-type h1{
        font-size: 25px;
        color: #a58464;
    }

    /* 统计内容 */
    .w-QuantityStatistics{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 0 30px 30px;
    }
    .w-QuantityStatistics P{
        font-size: 50px;
        margin-right: 10px;
    }
    .w-QuantityStatistics img{
        width: 50px;
        height: 50px;
    }

    /* 统计人数 */
    .w-LogisticsManagement-QuantityStatistics-person{
        display: flex;
        padding: 0 35px;
        justify-content: space-between;
    }

    /* 边框线 */
    .w-LogisticsManagement-QuantityStatistics-line{
        width: 3px;
        height: 80px;
        background: #595958;
        position: absolute;
        right: 0;
        top:35%;
    }
    .w-LogisticsManagement-QuantityStatistics .w-LogisticsManagement-QuantityStatistics-type:last-of-type .w-LogisticsManagement-QuantityStatistics-line{
        width: 0;
        height: 0;
        background: transparent;
    }
    /* 最后一个盒子的字体居中 */
    .w-LogisticsManagement-QuantityStatistics-type:nth-of-type(4) .w-LogisticsManagement-QuantityStatistics-person{
        justify-content: center;
    }

    /* 空白区域 */
    .w-LogisticsManagement-blank {
        width: 100%;
        height: 30px;
        background: #383a3c;
    }

    /* 排行榜 */
    .w-LogisticsManagement-Billboard-box{
        width: 60%;
        height: 320px;
        border: 1px solid black;
        float: left;
        margin-right: 30px;
        margin-left: 23px;
        background: #323437;
        color: #d1cdca;
    }
    /* 头部标题 */
    .w-LogisticsManagement-Billboard{
        overflow: hidden;
        box-sizing: border-box;
        padding: 15px 20px 0 20px;
        margin-bottom: 25px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    /* 标题 */
    .w-LogisticsManagement-Billboard h1{
        font-size: 30px;
    }
    /* 更多 */
    .w-LogisticsManagement-Billboard h6{
        width: 62px;
        height: 35px;
        border-radius: 8px;
        background: #2f76ff;
        text-align: center;
        line-height: 35px;
    }
    /* 排名 */
    .w-LogisticsManagement-ranking{
        width: 100%;
        height: 240px;
    }
    /* 左边区域 */
    .w-LogisticsManagement-ranking-left{
        width: 38%;
        height: 100%;
        float: left;
        box-sizing: border-box;
        padding-left: 20px;
        padding-top: 20px;
    }
    .w-LogisticsManagement-ranking-left p {
        color: #9e9da2;
        margin-bottom: 5px;
        font-size: 20px;
    }
    .w-LogisticsManagement-ranking-left p:nth-of-type(2){
        margin-top: 40px;
    }
    .w-LogisticsManagement-ranking-left h1{
        display: flex;
        align-items: center;
    }
    /* 上升图片 */
    .w-LogisticsManagement-ranking-left h1 img {
        width: 30px;
        height: 30px;
        margin-top: 5px;
        margin-left: 15px;
    }
    /* 右边区域 */
    .w-LogisticsManagement-ranking-right {
        width: 62%;
        height: 100%;
        float: left;
        display: flex;
        flex-direction: column
    }
    /* 中心 */
    .w-ranking-centre{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    /* 序号 */
    .w-ranking-serialNumber{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #f60;
        text-align: center;
        line-height: 30px;
        margin-right: 25px;
    }
    /* 地区内容 */
    .w-ranking-content{
        width: 240px;
        margin-right: 20px;
    }
    /* 地区名称 */
    .w-ranking-name{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    /* 地区精度条 */
    .w-ranking-progress{
        width: 100%;
        height: 8px;
        background: #f5f5f5;
        position: relative;
        margin-top: 12px;
    }
    /* 地区具体精度 */
    .w-progress{
        width: 0%;
        height: 100%;
        position: absolute;
        background: salmon;
    }
    /* 第二个地区的进度 */
    .w-ranking-centre:nth-child(2) .w-ranking-progress .w-progress {
        width: 0%;
    }
    /* 第三个地区的进度 */
    .w-ranking-centre:nth-child(3) .w-ranking-progress .w-progress {
        width: 0%;
    }
    /* 点赞图片 */
    .w-ranking-centre img{
        width: 30px;
        height: 30px;
        margin-right: 10px;
        cursor: pointer;
    }

    /* 消息提醒 */
    .w-LogisticsManagement-information {
        width: 35%;
        height: 320px;
        border: 1px solid black;
        float: left;
        background: #323437;
        color: #d1cdca;
        margin-bottom: 30px;
    }
    /* 消息 */
    .w-information{
        width: 100%;
        height: 240px;
    }
    /* 左边的消息 */
    .w-information ul{
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding-left: 20px;
        padding-top: 20px;
        float: left;
    }
    .w-information ul li{
        flex: 1;
    }
    .w-information ul li a{
        color: #d1cdca;
        font-size: 18px;
    }
    .w-information ul li a span{
        margin-left: 100px;
        font-size: 14px;
    }
    /* 右边的图片 */
    .w-information img{
        float: right;
        width: 220px;
        height: 220px;
        margin-top: 20px;
    }

    /* 图表 */
    .w-charts{
        clear: both;
        height: 650px;
        margin:0 22px;
        display: flex
    }
    .w-charts-box{
        flex: 1;
        margin-right: 30px;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 30px 30px 0;
        background: #323437;
        border: 1px solid black;
        color: #d1cdca;
    }
    .w-charts .w-charts-box:last-child{
        margin-right: 0;
    }
    .w-charts-day{
        width: 90px;
        height: 40px;
        border-radius: 14px;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    .w-charts-box h1{
        float: left;
        margin-bottom: 30px;
    }
    .w-charts-day{
        float: right;
    }
    .w-charts-day p{
        width: 50%;
        height: 100%;
        text-align: center;
        line-height: 40px;
    }
    .w-charts-day p:nth-child(1){
        background: #525457;
    }
    .w-charts-day p:nth-child(2) {
        background: #353637;
    }
    .w-charts-box h5 {
        clear: both;
        font-size: 20px;
    }
    .w-chartsDataBox {
        width: 100%;
        height: 300px;
        background: #9aa9d0;
        margin-top: 20px;
    }
    .w-charts-data{
        width: 100%;
        height: 100px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .w-charts-data-left{
        float: left;
        margin-left: 20px;
    }
    .w-charts-data-right {
        float: right;
        margin-right: 20px;
    }

    .w-charts-data-left h6,
    .w-charts-data-right h6 {
        font-size: 20px;
        color: #aeaeb6;
        margin-bottom: 20px;
    }
    .w-charts-data-left p,
    .w-charts-data-right p {
        font-size: 20px;
        margin-bottom: 20px;
        text-align: center;
    }

    .w-charts-look{
        width: 240px;
        height: 50px;
        background: #2ebbe4;
        border: none;
        font-size: 20px;
        border-radius: 23px;
        margin-left: 90px;
        color: #33363a;
    }
</style>