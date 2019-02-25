<template>
  <div class="z-index-main-content">
    <!-- 统计 -->
    <div class="z-index-main-content-statistics">
      <div class="z-index-main-content-statistics-con" v-for="(c,i) in data.page1.market" :key="i" :data="c">
        <h1>{{c.tit}}</h1>
        <h2>
          <i class="iconfont icon-icon-arrow-top4"></i>
          <i class="iconfont icon-qian"></i>
          <span>{{c.money}}</span>
          <b>{{c.percentage}}%</b>
        </h2>
        <h3>
          <div class="donghuadiv" :style="{width:c.divWidth}"></div>
        </h3>
      </div>
    </div>
    <!-- 模块1 -->
    <div class="z-index-main-content-model1">
      <!-- 地图 -->
      <div class="z-index-main-content-model1-left" id="z-index-map">

      </div>
      <div class="z-index-main-content-model1-right">
        <div class="z-index-main-content-model1-right-top">
          <h1>收益</h1>
          <h2>
            <i class="iconfont icon-qian"></i>
            <span>{{data.earnings}}</span>
            <i class="iconfont icon-icon-arrow-top4"></i>
          </h2>
          <div class="z-index-main-content-model1-right-top-table" id="z-index-main-content-model1-right-top-table">

          </div>
        </div>
        <div class="z-index-main-content-model1-right-bottom">
          <div class="z-index-main-content-model1-right-bottom-con">
            <i class="iconfont icon-shandian"></i>
            <div class="z-index-main-content-model1-right-bottom-con-right">
              <h1>{{data.feedback}}</h1>
              <h2>用户反馈</h2>
            </div>
          </div>
          <div class="z-index-main-content-model1-right-bottom-con">
            <i class="iconfont icon-location"></i>
            <div class="z-index-main-content-model1-right-bottom-con-right">
              <h1>{{data.site}}</h1>
              <h2>用户分布地点</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 模块2 -->
    <div class="z-index-main-content-model2">
      <div class="z-index-main-content-model2-con" v-for="(c,i) in data.patternOfPayment" :key="i" :data="c">
        <div class="z-index-main-content-model2-con-top">
          <i class="iconfont" :class="c.ico" :id="c.id"></i>
          <div class="z-index-main-content-model2-con-top-r">
            <h1>{{c.num}}</h1>
            <h2><span>{{c.patternOfPaymentZhanbi}}</span>的用户选择{{c.patternOfPayment}}支付</h2>
          </div>
        </div>
        <div class="z-index-main-content-model2-con-con">
          <div class="z-index-main-content-model2-con-con-main">
            <h1>扫码支付: <span>{{c.saoma}}</span></h1>
            <h2><span></span></h2>
          </div>
          <div class="z-index-main-content-model2-con-con-main">
            <h1>转账支付: <span>{{c.zhuanzhang}}</span></h1>
            <h2><span></span></h2>
          </div>
        </div>
      </div>
    </div>
    <!-- 模块3 -->
    <div class="z-index-main-content-model3">
      <div class="z-index-main-content-model3-left">
        <div class="z-index-main-content-model3-tit">
          访客
          <a href="javascript:;"><i class="iconfont icon-icon-test"></i></a>
        </div>
        <div class="z-index-main-content-model3-con">
          <h1>今日活跃访客</h1>
          <img src="../../../static/images/system/index/fangke.png" class="z-index-main-content-model3-con-img"
               alt="加载失败..."/>
          <h2>{{data.visitor.quantity}}</h2>
          <h3>网站主动访问</h3>
          <h4><span></span></h4>
          <div class="z-index-main-content-model3-con-tongji">
            <div class="z-index-main-content-model3-con-tongji-con" v-for="(c,i) in data.visitor.type" :key="i">
              <h2>{{c.zhanbi}}%</h2>
              <h3>{{c.name}}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="z-index-main-content-model3-right">
        <div class="z-index-main-content-model3-tit">
          最近用户
          <a href="javascript:;"><i class="iconfont icon-icon-test"></i></a>
        </div>
        <div class="z-index-main-content-model3-tab">
          <table>
            <tr v-for="(c,i) in data.RecentlyTheUser" :key="i">
              <td class="z-index-main-content-model3-tab-tx" alt="加载失败...">
                <img :src="c.pic" alt="加载失败..."/>
              </td>
              <td class="z-index-main-content-model3-tab-xq">
                <h1>{{c.name}}</h1>
                <h2>{{c.introduce}}</h2>
              </td>
              <td class="z-index-main-content-model3-tab-online">
                <img :src="'../../../static/images/system/index/'+c.online+'.png'" alt="加载失败..."/>
                <h2>{{c.time}}</h2>
              </td>
              <td class="z-index-main-content-model3-tab-online">
                <a href="#" class="btn">接受</a>
                <a href="#" class="btn">拒绝</a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import "echarts";
  import 'echarts/map/js/china.js' // 引入中国地图数据
  export default {
    props: ["data"],
    name: "FunctionsIndex",
    mounted() {
      this.drawLine(this.data.dataL);
      this.mapDemo(this.data.dataMap);
      // 动画
      $(function () {
        $(".donghuadiv").each(function () {
          let width = $(this).css("width");
          $(this).css("width", 0);
          $(this).animate({
            "width": width
          }, 1000);
        })
      })
    },
    methods: {
      // map
      mapDemo(dataMap) {
        var dom = document.getElementById("z-index-map");
        var myChart = this.$echarts.init(dom);

        var geoCoordMap = {
          "海门": [121.15, 31.89],
          "鄂尔多斯": [109.781327, 39.608266],
          "招远": [120.38, 37.35],
          "舟山": [122.207216, 29.985295],
          "齐齐哈尔": [123.97, 47.33],
          "盐城": [120.13, 33.38],
          "赤峰": [118.87, 42.28],
          "青岛": [120.33, 36.07],
          "乳山": [121.52, 36.89],
          "金昌": [102.188043, 38.520089],
          "泉州": [118.58, 24.93],
          "莱西": [120.53, 36.86],
          "日照": [119.46, 35.42],
          "胶南": [119.97, 35.88],
          "南通": [121.05, 32.08],
          "拉萨": [91.11, 29.97],
          "云浮": [112.02, 22.93],
          "梅州": [116.1, 24.55],
          "文登": [122.05, 37.2],
          "上海": [121.48, 31.22],
          "攀枝花": [101.718637, 26.582347],
          "威海": [122.1, 37.5],
          "承德": [117.93, 40.97],
          "厦门": [118.1, 24.46],
          "汕尾": [115.375279, 22.786211],
          "潮州": [116.63, 23.68],
          "丹东": [124.37, 40.13],
          "太仓": [121.1, 31.45],
          "曲靖": [103.79, 25.51],
          "烟台": [121.39, 37.52],
          "福州": [119.3, 26.08],
          "瓦房店": [121.979603, 39.627114],
          "即墨": [120.45, 36.38],
          "抚顺": [123.97, 41.97],
          "玉溪": [102.52, 24.35],
          "张家口": [114.87, 40.82],
          "阳泉": [113.57, 37.85],
          "莱州": [119.942327, 37.177017],
          "湖州": [120.1, 30.86],
          "汕头": [116.69, 23.39],
          "昆山": [120.95, 31.39],
          "宁波": [121.56, 29.86],
          "湛江": [110.359377, 21.270708],
          "揭阳": [116.35, 23.55],
          "荣成": [122.41, 37.16],
          "连云港": [119.16, 34.59],
          "葫芦岛": [120.836932, 40.711052],
          "常熟": [120.74, 31.64],
          "东莞": [113.75, 23.04],
          "河源": [114.68, 23.73],
          "淮安": [119.15, 33.5],
          "泰州": [119.9, 32.49],
          "南宁": [108.33, 22.84],
          "营口": [122.18, 40.65],
          "惠州": [114.4, 23.09],
          "江阴": [120.26, 31.91],
          "蓬莱": [120.75, 37.8],
          "韶关": [113.62, 24.84],
          "嘉峪关": [98.289152, 39.77313],
          "广州": [113.23, 23.16],
          "延安": [109.47, 36.6],
          "太原": [112.53, 37.87],
          "清远": [113.01, 23.7],
          "中山": [113.38, 22.52],
          "昆明": [102.73, 25.04],
          "寿光": [118.73, 36.86],
          "盘锦": [122.070714, 41.119997],
          "长治": [113.08, 36.18],
          "深圳": [114.07, 22.62],
          "珠海": [113.52, 22.3],
          "宿迁": [118.3, 33.96],
          "咸阳": [108.72, 34.36],
          "铜川": [109.11, 35.09],
          "平度": [119.97, 36.77],
          "佛山": [113.11, 23.05],
          "海口": [110.35, 20.02],
          "江门": [113.06, 22.61],
          "章丘": [117.53, 36.72],
          "肇庆": [112.44, 23.05],
          "大连": [121.62, 38.92],
          "临汾": [111.5, 36.08],
          "吴江": [120.63, 31.16],
          "石嘴山": [106.39, 39.04],
          "沈阳": [123.38, 41.8],
          "苏州": [120.62, 31.32],
          "茂名": [110.88, 21.68],
          "嘉兴": [120.76, 30.77],
          "长春": [125.35, 43.88],
          "胶州": [120.03336, 36.264622],
          "银川": [106.27, 38.47],
          "张家港": [120.555821, 31.875428],
          "三门峡": [111.19, 34.76],
          "锦州": [121.15, 41.13],
          "南昌": [115.89, 28.68],
          "柳州": [109.4, 24.33],
          "三亚": [109.511909, 18.252847],
          "自贡": [104.778442, 29.33903],
          "吉林": [126.57, 43.87],
          "阳江": [111.95, 21.85],
          "泸州": [105.39, 28.91],
          "西宁": [101.74, 36.56],
          "宜宾": [104.56, 29.77],
          "呼和浩特": [111.65, 40.82],
          "成都": [104.06, 30.67],
          "大同": [113.3, 40.12],
          "镇江": [119.44, 32.2],
          "桂林": [110.28, 25.29],
          "张家界": [110.479191, 29.117096],
          "宜兴": [119.82, 31.36],
          "北海": [109.12, 21.49],
          "西安": [108.95, 34.27],
          "金坛": [119.56, 31.74],
          "东营": [118.49, 37.46],
          "牡丹江": [129.58, 44.6],
          "遵义": [106.9, 27.7],
          "绍兴": [120.58, 30.01],
          "扬州": [119.42, 32.39],
          "常州": [119.95, 31.79],
          "潍坊": [119.1, 36.62],
          "重庆": [106.54, 29.59],
          "台州": [121.420757, 28.656386],
          "南京": [118.78, 32.04],
          "滨州": [118.03, 37.36],
          "贵阳": [106.71, 26.57],
          "无锡": [120.29, 31.59],
          "本溪": [123.73, 41.3],
          "克拉玛依": [84.77, 45.59],
          "渭南": [109.5, 34.52],
          "马鞍山": [118.48, 31.56],
          "宝鸡": [107.15, 34.38],
          "焦作": [113.21, 35.24],
          "句容": [119.16, 31.95],
          "北京": [116.46, 39.92],
          "徐州": [117.2, 34.26],
          "衡水": [115.72, 37.72],
          "包头": [110, 40.58],
          "绵阳": [104.73, 31.48],
          "乌鲁木齐": [87.68, 43.77],
          "枣庄": [117.57, 34.86],
          "杭州": [120.19, 30.26],
          "淄博": [118.05, 36.78],
          "鞍山": [122.85, 41.12],
          "溧阳": [119.48, 31.43],
          "库尔勒": [86.06, 41.68],
          "安阳": [114.35, 36.1],
          "开封": [114.35, 34.79],
          "济南": [117, 36.65],
          "德阳": [104.37, 31.13],
          "温州": [120.65, 28.01],
          "九江": [115.97, 29.71],
          "邯郸": [114.47, 36.6],
          "临安": [119.72, 30.23],
          "兰州": [103.73, 36.03],
          "沧州": [116.83, 38.33],
          "临沂": [118.35, 35.05],
          "南充": [106.110698, 30.837793],
          "天津": [117.2, 39.13],
          "富阳": [119.95, 30.07],
          "泰安": [117.13, 36.18],
          "诸暨": [120.23, 29.71],
          "郑州": [113.65, 34.76],
          "哈尔滨": [126.63, 45.75],
          "聊城": [115.97, 36.45],
          "芜湖": [118.38, 31.33],
          "唐山": [118.02, 39.63],
          "平顶山": [113.29, 33.75],
          "邢台": [114.48, 37.05],
          "德州": [116.29, 37.45],
          "济宁": [116.59, 35.38],
          "荆州": [112.239741, 30.335165],
          "宜昌": [111.3, 30.7],
          "义乌": [120.06, 29.32],
          "丽水": [119.92, 28.45],
          "洛阳": [112.44, 34.7],
          "秦皇岛": [119.57, 39.95],
          "株洲": [113.16, 27.83],
          "石家庄": [114.48, 38.03],
          "莱芜": [117.67, 36.19],
          "常德": [111.69, 29.05],
          "保定": [115.48, 38.85],
          "湘潭": [112.91, 27.87],
          "金华": [119.64, 29.12],
          "岳阳": [113.09, 29.37],
          "长沙": [113, 28.21],
          "衢州": [118.88, 28.97],
          "廊坊": [116.7, 39.53],
          "菏泽": [115.480656, 35.23375],
          "合肥": [117.27, 31.86],
          "武汉": [114.31, 30.52],
          "大庆": [125.03, 46.58]
        };

        var data = dataMap;

        var convertData = function (data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;
        };

        var convertedData = [
          convertData(data),
          convertData(data.sort(function (a, b) {
            return b.value - a.value;
          }).slice(0, 6))
        ];


        let option = {
          backgroundColor: '#323437',
          animation: true,
          animationDuration: 1000,
          animationEasing: 'cubicInOut',
          animationDurationUpdate: 1000,
          animationEasingUpdate: 'cubicInOut',
          title: [{
            text: '全国主要城市 交易量',
            left: 'center',
            top: "10",
            textStyle: {
              color: '#fff'
            }
          },
            {
              id: 'statistic',
              right: 120,
              top: 40,
              width: 100,
              textStyle: {
                color: '#fff',
                fontSize: 16
              }
            }
          ],
          toolbox: {
            iconStyle: {
              normal: {
                borderColor: '#fff'
              },
              emphasis: {
                borderColor: '#b1e4ff'
              }
            },
            feature: {
              dataZoom: {},
              brush: {
                type: ['rect', 'polygon', 'clear']
              },
              saveAsImage: {
                show: true
              }
            }
          },
          brush: {
            outOfBrush: {
              color: '#abc'
            },
            brushStyle: {
              borderWidth: 2,
              color: 'rgba(0,0,0,0.2)',
              borderColor: 'rgba(0,0,0,0.5)',
            },
            seriesIndex: [0, 1],
            throttleType: 'debounce',
            throttleDelay: 300,
            geoIndex: 0
          },
          geo: {
            map: 'china',
            left: '10',
            right: '35%',
            center: [117.98561551896913, 31.205000490896193],
            zoom: 2.5,
            label: {
              emphasis: {
                show: false
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#323c48',
                borderColor: '#111'
              },
              emphasis: {
                areaColor: '#2a333d'
              }
            }
          },
          tooltip: {
            trigger: 'item'
          },
          grid: {
            right: 40,
            top: 100,
            bottom: 40,
            width: '30%'
          },
          xAxis: {
            type: 'value',
            scale: true,
            position: 'top',
            boundaryGap: false,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 2,
              textStyle: {
                color: '#aaa'
              }
            },
          },
          yAxis: {
            type: 'category',
            name: 'TOP 20',
            nameGap: 16,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#ddd'
              }
            },
            data: []
          },
          series: [{
            name: 'City',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertedData[0],
            symbolSize: function (val) {
              return Math.max(val[2] / 10, 8);
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#1dddc7'
              }
            }
          },
            {
              name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: convertedData[1],
              symbolSize: function (val) {
                return Math.max(val[2] / 10, 8);
              },
              showEffectOn: 'emphasis',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#158074',
                  shadowBlur: 10,
                  shadowColor: '#333'
                }
              },
              zlevel: 1
            },
            {
              id: 'bar',
              zlevel: 2,
              type: 'bar',
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: '#1dddc7'
                }
              },
              data: []
            }
          ]
        };


        myChart.on('brushselected', renderBrushed);

        // myChart.setOption(option);

        setTimeout(function () {
          myChart.dispatchAction({
            type: 'brush',
            areas: [{
              geoIndex: 0,
              brushType: 'polygon',
              coordRange: [
                [119.72, 34.85],
                [119.68, 34.85],
                [119.5, 34.84],
                [119.19, 34.77],
                [118.76, 34.63],
                [118.6, 34.6],
                [118.46, 34.6],
                [118.33, 34.57],
                [118.05, 34.56],
                [117.6, 34.56],
                [117.41, 34.56],
                [117.25, 34.56],
                [117.11, 34.56],
                [117.02, 34.56],
                [117, 34.56],
                [116.94, 34.56],
                [116.94, 34.55],
                [116.9, 34.5],
                [116.88, 34.44],
                [116.88, 34.37],
                [116.88, 34.33],
                [116.88, 34.24],
                [116.92, 34.15],
                [116.98, 34.09],
                [117.05, 34.06],
                [117.19, 33.96],
                [117.29, 33.9],
                [117.43, 33.8],
                [117.49, 33.75],
                [117.54, 33.68],
                [117.6, 33.65],
                [117.62, 33.61],
                [117.64, 33.59],
                [117.68, 33.58],
                [117.7, 33.52],
                [117.74, 33.5],
                [117.74, 33.46],
                [117.8, 33.44],
                [117.82, 33.41],
                [117.86, 33.37],
                [117.9, 33.3],
                [117.9, 33.28],
                [117.9, 33.27],
                [118.09, 32.97],
                [118.21, 32.7],
                [118.29, 32.56],
                [118.31, 32.5],
                [118.35, 32.46],
                [118.35, 32.42],
                [118.35, 32.36],
                [118.35, 32.34],
                [118.37, 32.24],
                [118.37, 32.14],
                [118.37, 32.09],
                [118.44, 32.05],
                [118.46, 32.01],
                [118.54, 31.98],
                [118.6, 31.93],
                [118.68, 31.86],
                [118.72, 31.8],
                [118.74, 31.78],
                [118.76, 31.74],
                [118.78, 31.7],
                [118.82, 31.64],
                [118.82, 31.62],
                [118.86, 31.58],
                [118.86, 31.55],
                [118.88, 31.54],
                [118.88, 31.52],
                [118.9, 31.51],
                [118.91, 31.48],
                [118.93, 31.43],
                [118.95, 31.4],
                [118.97, 31.39],
                [118.97, 31.37],
                [118.97, 31.34],
                [118.97, 31.27],
                [118.97, 31.21],
                [118.97, 31.17],
                [118.97, 31.12],
                [118.97, 31.02],
                [118.97, 30.93],
                [118.97, 30.87],
                [118.97, 30.85],
                [118.95, 30.8],
                [118.95, 30.77],
                [118.95, 30.76],
                [118.93, 30.7],
                [118.91, 30.63],
                [118.91, 30.61],
                [118.91, 30.6],
                [118.9, 30.6],
                [118.88, 30.54],
                [118.88, 30.51],
                [118.86, 30.51],
                [118.86, 30.46],
                [118.72, 30.18],
                [118.68, 30.1],
                [118.66, 30.07],
                [118.62, 29.91],
                [118.56, 29.73],
                [118.52, 29.63],
                [118.48, 29.51],
                [118.44, 29.42],
                [118.44, 29.32],
                [118.43, 29.19],
                [118.43, 29.14],
                [118.43, 29.08],
                [118.44, 29.05],
                [118.46, 29.05],
                [118.6, 28.95],
                [118.64, 28.94],
                [119.07, 28.51],
                [119.25, 28.41],
                [119.36, 28.28],
                [119.46, 28.19],
                [119.54, 28.13],
                [119.66, 28.03],
                [119.78, 28],
                [119.87, 27.94],
                [120.03, 27.86],
                [120.17, 27.79],
                [120.23, 27.76],
                [120.3, 27.72],
                [120.42, 27.66],
                [120.52, 27.64],
                [120.58, 27.63],
                [120.64, 27.63],
                [120.77, 27.63],
                [120.89, 27.61],
                [120.97, 27.6],
                [121.07, 27.59],
                [121.15, 27.59],
                [121.28, 27.59],
                [121.38, 27.61],
                [121.56, 27.73],
                [121.73, 27.89],
                [122.03, 28.2],
                [122.3, 28.5],
                [122.46, 28.72],
                [122.5, 28.77],
                [122.54, 28.82],
                [122.56, 28.82],
                [122.58, 28.85],
                [122.6, 28.86],
                [122.61, 28.91],
                [122.71, 29.02],
                [122.73, 29.08],
                [122.93, 29.44],
                [122.99, 29.54],
                [123.03, 29.66],
                [123.05, 29.73],
                [123.16, 29.92],
                [123.24, 30.02],
                [123.28, 30.13],
                [123.32, 30.29],
                [123.36, 30.36],
                [123.36, 30.55],
                [123.36, 30.74],
                [123.36, 31.05],
                [123.36, 31.14],
                [123.36, 31.26],
                [123.38, 31.42],
                [123.46, 31.74],
                [123.48, 31.83],
                [123.48, 31.95],
                [123.46, 32.09],
                [123.34, 32.25],
                [123.22, 32.39],
                [123.12, 32.46],
                [123.07, 32.48],
                [123.05, 32.49],
                [122.97, 32.53],
                [122.91, 32.59],
                [122.83, 32.81],
                [122.77, 32.87],
                [122.71, 32.9],
                [122.56, 32.97],
                [122.38, 33.05],
                [122.3, 33.12],
                [122.26, 33.15],
                [122.22, 33.21],
                [122.22, 33.3],
                [122.22, 33.39],
                [122.18, 33.44],
                [122.07, 33.56],
                [121.99, 33.69],
                [121.89, 33.78],
                [121.69, 34.02],
                [121.66, 34.05],
                [121.64, 34.08]
              ]
            }]
          });
        }, 0);


        function renderBrushed(params) {
          var mainSeries = params.batch[0].selected[0];

          var selectedItems = [];
          var categoryData = [];
          var barData = [];
          var maxBar = 30;
          var sum = 0;
          var count = 0;

          for (var i = 0; i < mainSeries.dataIndex.length; i++) {
            var rawIndex = mainSeries.dataIndex[i];
            var dataItem = convertedData[0][rawIndex];
            var pmValue = dataItem.value[2];

            sum += pmValue;
            count++;

            selectedItems.push(dataItem);
          }

          selectedItems.sort(function (a, b) {
            return a.value[2] - b.value[2];
          });

          for (var i = 0; i < Math.min(selectedItems.length, maxBar); i++) {
            categoryData.push(selectedItems[i].name);
            barData.push(selectedItems[i].value[2]);
          }

          this.setOption({
            yAxis: {
              data: categoryData
            },
            xAxis: {
              axisLabel: {
                show: !!count
              }
            },
            title: {
              id: 'statistic',
              text: count ? '平均: ' + (sum / count).toFixed(4) : ''
            },
            series: {
              id: 'bar',
              data: barData
            }
          });
        }

        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      },
      // table收益统计表
      drawLine(dataL) {
        // 基于准备好的dom，初始化echarts实例
        var dom = document.getElementById("z-index-main-content-model1-right-top-table");
        var myChart = this.$echarts.init(dom);
        let data = dataL;
        let xAxisMonth = [],
          barData = [],
          lineData = [];
        for (let i = 0; i < data.chart.length; i++) {
          xAxisMonth.push(data.chart[i].month);
          barData.push({
            "name": xAxisMonth[i],
            "value": data.chart[i].value
          });
          lineData.push({
            "name": xAxisMonth[i],
            "value": data.chart[i].ratio
          });
        }
        let option = {
          title: '',
          grid: {
            top: '10%',
            left: '15%',
            bottom: '0%',
            right: "5%",
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            formatter: function (params) {
              return params[0]["data"].name + "<br/>" + '订单量: ' + params[1]["data"].value + "<br/>" + '满意度: ' + params[0]["data"].value + '%'
            }
          },
          xAxis: [{
            type: 'category',
            show: false,
            data: ['3月', '4月', '5月', '6月', '7月', '8月'],
            axisLabel: {
              textStyle: {
                color: '#b6b5ab'
              }
            }
          },
            {
              type: 'category',
              position: "bottom",
              data: xAxisMonth,
              boundaryGap: true,
              // offset: 40,
              axisTick: {
                show: false
              },
              axisLine: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: '#b6b5ab'
                }
              }
            }

          ],
          yAxis: [{
            show: true,
            offset: 52,
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,0.2)"
              }
            },
            axisTick: {
              show: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              show: true,
              color: '#b6b5ab'
            }
          }, {
            show: false,
            type: "value",
            name: "合格率(%)",
            nameTextStyle: {
              color: '#ccc'
            },
            axisLabel: {
              color: '#ccc'
            },
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }],
          color: ['#e54035'],
          series: [{
            name: '订单数',
            type: 'pictorialBar',
            xAxisIndex: 1,
            barCategoryGap: '-80%',
            // barCategoryGap: '-5%',
            symbol: 'path://d="M150 50 L130 130 L170 130  Z"',
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = [
                    'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)',
                    'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)',
                    'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)'
                  ];
                  return colorList[params.dataIndex];
                }
              },
              emphasis: {
                opacity: 1
              }
            },
            data: barData,
          },
            {
              symbol: 'image://data:image/png;base64,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',
              symbolSize: 42,
              name: "满意度",
              type: "line",
              yAxisIndex: 1,
              data: lineData,
              itemStyle: {
                normal: {
                  borderWidth: 5,
                  color: {
                    colorStops: [{
                      offset: 0,
                      color: '#821eff'
                    },

                      {
                        offset: 1,
                        color: '#204fff'
                      }
                    ],
                  }
                }
              }
            }
          ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        })
      }

    },
  }
</script>

<style scoped>

  /* mian-content */
  .z-index-main-content {
    width: 100%;
    height: auto;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 30px;
  }

  .z-index-main-content-statistics {
    height: 168px;
    width: 100%;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 30px;
  }

  .z-index-main-content-statistics-con {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    background: #323437;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 32px 25px 0px 25px;
  }

  .z-index-main-content-statistics-con:nth-of-type(2) {
    margin: 0 30px;
  }

  .z-index-main-content-statistics-con h1 {
    font-size: 14px;
    color: #c9d0d5;
    line-height: 14px;
    margin-bottom: 30px;
  }

  .z-index-main-content-statistics-con h2 {
    font-size: 25px;
    color: #c9d0d5;
    line-height: 25px;
    margin-bottom: 20px;
  }

  .z-index-main-content-statistics-con h2 i {
    font-size: 25px;
  }

  .z-index-main-content-statistics-con h2 i:first-child {
    color: #32a49a;
  }

  .z-index-main-content-statistics-con h2 span {
    font-size: 25px;
  }

  .z-index-main-content-statistics-con h2 b {
    font-size: 18px;
    float: right;
    font-weight: normal;
  }

  .z-index-main-content-statistics-con h3 {
    height: 8px;
    width: 100%;
    background: #1a1a1c;
  }

  .z-index-main-content-statistics-con h3 div {
    height: 100%;
    width: 60%;
    background: -webkit-linear-gradient(225deg, #1de9b6 0%, #1dc4e9 100%);
    background: -moz-linear-gradient(225deg, #1de9b6 0%, #1dc4e9 100%);
    background: linear-gradient(-135deg, #1de9b6 0%, #1dc4e9 100%);
  }

  /* 模块1 */
  .z-index-main-content-model1 {
    width: 100%;
    height: 600px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
  }

  .z-index-main-content-model1-left {
    width: 66.1%;
    height: 100%;
    margin-right: 30px;
    background: #323437;
  }

  .z-index-main-content-model1-right {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 100%;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .z-index-main-content-model1-right-top {
    width: 100%;
    height: 300px;
    background: #323437;
    margin-bottom: 30px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-top: 22px;
    padding-left: 25px;
  }

  .z-index-main-content-model1-right-top h1 {
    font-size: 18px;
    line-height: 18px;
    color: #ccc;
    margin-bottom: 25px;
  }

  .z-index-main-content-model1-right-top h2 {
    font-size: 25px;
    line-height: 25px;
    color: #ccc;
    margin-bottom: 15px;
  }

  .z-index-main-content-model1-right-top h2 i {
    font-size: 25px;
  }

  .z-index-main-content-model1-right-top-table {
    width: 100%;
    height: 185px;
    padding-top: 8px;
  }

  .z-index-main-content-model1-right-bottom {
    width: 100%;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    background: #323437;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .z-index-main-content-model1-right-bottom-con {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 27px;
    padding-top: 36px;
  }

  .z-index-main-content-model1-right-bottom-con i {
    font-size: 60px;
    color: #1de9b6;
    float: left;
    margin-right: 20px;
  }

  .z-index-main-content-model1-right-bottom-con:first-child {
    border-bottom: 1px solid #212224;
  }

  .z-index-main-content-model1-right-bottom-con:last-child i {
    font-size: 50px;
    color: #14a9f5;
  }


  .z-index-main-content-model1-right-bottom-con-right h1 {
    font-size: 30px;
    color: #ccc;
    line-height: 30px;
    margin-bottom: 16px;
  }

  .z-index-main-content-model1-right-bottom-con-right h2 {
    font-size: 14px;
    color: #ccc;
    line-height: 14px;
  }

  /* 模块2 */
  .z-index-main-content-model2 {
    width: 100%;
    height: 213px;
    margin-top: 30px;
    display: flex;
  }

  .z-index-main-content-model2-con {
    background: #323437;
    flex: 1;
    box-sizing: border-box;
    padding-top: 36px;
    padding-left: 25px;
    padding-right: 25px;
  }

  .z-index-main-content-model2-con:nth-of-type(2) {
    margin: 0 30px;
  }

  .z-index-main-content-model2-con-top {
    width: 100%;
    height: auto;
    overflow: hidden;
    display: flex;
    padding-bottom: 10px;
    border-bottom: 1px solid #212224;
  }

  .z-index-main-content-model2-con-top i {
    font-size: 60px;
    transition: all .5s;
  }

  .z-index-main-content-model2-con-top i:hover {
    transform: scale(.8);
  }

  .z-index-main-content-model2-con-top-r {
    flex: 1;
  }

  .z-index-main-content-model2-con-top-r h1 {
    font-size: 25px;
    color: #ccc;
    line-height: 25px;
    margin-bottom: 16px;
    text-align: right;
  }

  .z-index-main-content-model2-con-top-r h2 {
    font-size: 18px;
    color: #999;
    line-height: 18px;
    margin-bottom: 16px;
    text-align: right;
  }

  .z-index-main-content-model2-con-top-r h2 span {
    color: #28e9b6;
  }

  .z-index-main-content-model2-con-con {
    width: 100%;
    height: auto;
    margin-top: 20px;
    display: flex;
  }

  .z-index-main-content-model2-con-con-main {
    flex: 1;
    box-sizing: border-box;
  }

  .z-index-main-content-model2-con-con-main:first-child {
    padding-right: 15px;
    border-right: 1px solid #282a2c;
  }

  .z-index-main-content-model2-con-con-main:last-child {
    border-left: 1px solid #282a2c;
    padding-left: 15px;
  }


  .z-index-main-content-model2-con-con-main h1 {
    font-size: 14px;
    color: #999;
    line-height: 14px;
    text-align: center;
    margin-bottom: 18px;
  }

  .z-index-main-content-model2-con-con-main h1 span {
    color: #ccc;
  }

  .z-index-main-content-model2-con-con-main h2 {
    width: 100%;
    height: 6px;
    background: #1a1a1c;
  }

  .z-index-main-content-model2-con-con-main h2 span {
    display: block;
    width: 30.6%;
    height: 100%;
    background: linear-gradient(-135deg, #1de9b6 0%, #1dc4e9 100%);
  }

  .z-index-main-content-model2-con-con-main:last-child h2 span {
    background: linear-gradient(-135deg, #899FD4 0%, #A389D4 100%);
  }

  #weixin {
    color: #86db49;
  }

  #qq {
    color: #f7a329;
  }

  #zhifubao {
    color: #01aaef;
  }

  /* 模块3 */
  .z-index-main-content-model3 {
    width: 100%;
    height: 475px;
    margin-top: 30px;
    display: flex;
  }

  .z-index-main-content-model3-left {
    flex: 1;
    margin-right: 30px;
    background: #323437;
  }

  .z-index-main-content-model3-right {
    width: 66.1%;
    background: #323437;
  }

  .z-index-main-content-model3-tit {
    height: 62px;
    width: 100%;
    border-bottom: 1px solid #2b2c2f;
    position: relative;
    box-sizing: border-box;
    padding-left: 21px;
    padding-right: 21px;
    line-height: 62px;
    color: #ccc;
  }

  .z-index-main-content-model3-tit a {
    color: #ccc;
  }

  .z-index-main-content-model3-tit i {
    float: right;
  }

  .z-index-main-content-model3-tit:after {
    content: "";
    display: block;
    width: 4px;
    height: 20px;
    background: #46484c;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto 0;
  }

  .z-index-main-content-model3-con {
    width: 100%;
    height: auto;
    padding: 32px 25px 0px;
    box-sizing: border-box;
  }

  .z-index-main-content-model3-con h1 {
    font-size: 18px;
    text-align: center;
    color: #ccc;
    line-height: 18px;
    margin-bottom: 18px;
  }

  .z-index-main-content-model3-con-img {
    margin: 0 auto 30px;
    height: 40px;
  }

  .z-index-main-content-model3-con h2 {
    text-align: center;
    font-size: 35px;
    color: #ccc;
    line-height: 35px;
    margin-bottom: 30px;
  }

  .z-index-main-content-model3-con h3 {
    text-align: center;
    font-size: 14px;
    color: #ccc;
    line-height: 14px;
    margin-bottom: 28px;
  }

  .z-index-main-content-model3-con h4 {
    width: 100%;
    height: 6px;
    background: #1a1a1c;
    margin-bottom: 40px;
  }

  .z-index-main-content-model3-con h4 span {
    display: block;
    width: 30.6%;
    height: 100%;
    background: linear-gradient(-135deg, #1de9b6 0%, #1dc4e9 100%);
  }

  .z-index-main-content-model3-con-tongji {
    width: 100%;
    height: 54px;
    display: flex;
  }

  .z-index-main-content-model3-con-tongji-con {
    flex: 1;
    box-sizing: border-box;
    padding-top: 4px;
  }

  .z-index-main-content-model3-con-tongji-con:nth-of-type(2) {
    border-left: 1px solid #282a2c;
    border-right: 1px solid #282a2c;
  }

  .z-index-main-content-model3-con-tongji-con h2 {
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 18px;
  }

  .z-index-main-content-model3-con-tongji-con h3 {
    font-size: 12px;
    line-height: 12px;
    margin: 0;
  }

  .z-index-main-content-model3-tab {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 30px 0;
  }

  .z-index-main-content-model3-tab table {
    width: 100%;
  }

  .z-index-main-content-model3-tab table tr {
    height: 72px;
  }

  .z-index-main-content-model3-tab table tr td {
    border-bottom: 1px solid #222;
  }

  .z-index-main-content-model3-tab table tr:last-of-type td {
    border-bottom: 0;
  }

  .z-index-main-content-model3-tab-tx {
    width: 100px;
  }

  .z-index-main-content-model3-tab-tx img {
    height: 50px;
  }

  .z-index-main-content-model3-tab-xq {
    width: 300px;
    color: #ccc;

  }

  .z-index-main-content-model3-tab-xq h1 {
    font-size: 18px;
  }

  .z-index-main-content-model3-tab-xq h2 {
    font-size: 14px;
  }

  .z-index-main-content-model3-tab-online {
    width: 150px;
  }

  .z-index-main-content-model3-tab-online img {
    width: 13px;
    height: 13px;
    float: left;
    margin: 3px 10px 0 0;
  }

  .z-index-main-content-model3-tab-online h2 {
    font-size: 14px;
    color: #919ea7;
  }

  .btn {
    display: inline-block;
    background: transparent;
    text-transform: uppercase;
    font-weight: normal;
    font-style: normal;
    font-size: 12px;
    letter-spacing: 0.3em;
    color: rgba(223, 190, 106, 0.7);
    border-radius: 0;
    padding: 7px 10px;
    -webkit-transition: all 0.7s ease-out;
    transition: all 0.7s ease-out;
    background: -webkit-linear-gradient(180deg, rgba(223, 190, 106, 0.8), rgba(146, 111, 52, 0.8), rgba(34, 34, 34, 0), rgba(34, 34, 34, 0));
    background: linear-gradient(270deg, rgba(223, 190, 106, 0.8), rgba(146, 111, 52, 0.8), rgba(34, 34, 34, 0), rgba(34, 34, 34, 0));
    background-position: 1% 50%;
    background-size: 300% 300%;
    text-decoration: none;
    margin: 0 5px;
    border: 1px solid rgba(223, 190, 106, 0.3);
  }

  .btn:hover {
    color: #fff;
    border: 1px solid rgba(223, 190, 106, 0);
    background-position: 99% 50%;
  }
</style>
