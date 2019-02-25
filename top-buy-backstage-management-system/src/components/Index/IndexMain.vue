<template>
  <div class="z-index-main">
    <!-- main-header -->
    <div class="z-index-main-header">
      <a href="javascript:;" class="z-index-quanping">
        <i class="iconfont icon-quanping"></i>
      </a>
      <a href="javascript:;" class="z-index-seek">
        <i class="iconfont icon-sousuo"></i>
      </a>
      <a href="javascript:;" class="z-index-shezhi" @click="tongzhi=false;shezhi=!shezhi">
        <i class="iconfont icon-shezhi"></i><i class="iconfont icon-icon-arrow-down"></i>
      </a>
      <a href="javascript:;" class="z-index-email"
         @click="shezhi=false;tongzhi=false;IndexChatRoomBtn=!IndexChatRoomBtn;">
        <i class="iconfont icon-email"></i>
      </a>
      <a href="javascript:;" class="z-index-tongzhi" @click="shezhi=false;tongzhi=!tongzhi">
        <i class="iconfont icon-tongzhi"></i><i class="iconfont icon-icon-arrow-down"></i>
      </a>

      <!--通知-->
      <transition name="slide-fade">
        <div class="z-index-inform" v-if="tongzhi">
          <img src="../../../static/images/system/index/boxTop.png" alt="">
          <div class="z-index-inform-tit">
            <h1>消息</h1>
            <a href="#">清除全部</a>
            <a href="#">标记已读</a>
          </div>
          <ul class="z-index-inform-con">
            <li v-for="(c,i) in data.mag" :key="i">
              <img src="../../../static/images/system/index/lv1.png" alt="">
              <div>
                <h1>{{c.name}}</h1>
                <h1>{{c.message}}</h1>
              </div>
              <span>{{c.time}}</span>
            </li>
          </ul>
          <a class="z-index-inform-bottom">
            查看全部
          </a>
        </div>
      </transition>
      <!--设置-->
      <transition name="slide-fade">
        <div class="z-index-setting" v-if="shezhi">
          <img class="z-index-setting-top" src="../../../static/images/system/index/boxTop2.png" alt="">
          <div class="z-index-setting-tit">
            <div><img :src="data.loginInfo.pic" alt=""></div>
            <h1>{{name}}</h1>
            <a href="javascript:;" @click="logout"></a>
          </div>
          <ul class="z-index-setting-tit-con">
            <li><i class="iconfont icon-shezhi"></i><span>设置</span></li>
            <li><i class="iconfont icon-huiyuan"></i><span>朋友</span></li>
            <li><i class="iconfont icon-email"></i><span>信息</span></li>
            <li><i class="iconfont icon-authority"></i><span>锁屏</span></li>
          </ul>
        </div>
      </transition>
    </div>
    <!-- main-content -->
    <div class="z-index-main-content">
      <transition :name="transitionName">
        <router-view :data="data"></router-view>
      </transition>
    </div>
    <!--消息通知-->
    <div class="z-index-mag">
      <h1><i class="iconfont icon-shezhi"></i>系统消息</h1>
      <h2>欢迎使用TopBuy(淘买)后台管理系统</h2>
    </div>
    <transition name="IndexChatRoom">
      <index-chat-room
        v-on:chatRoomVal="chatValBtn($event)"
        :val="IndexChatRoomBtn"
        v-if="IndexChatRoomBtn"
        :chatRoom="data.chatRoom"
      ></index-chat-room>
    </transition>
  </div>
</template>

<script>
  import $ from "jquery"
  import dialog from "../../assets/js/dialog"
  import IndexChatRoom from "./IndexChatRoom";

  export default {
    components: {IndexChatRoom},
    props: ["data"],
    name: "IndexMain",
    data() {
      return {
        tongzhi: false,
        shezhi: false,
        IndexChatRoomBtn: false,
        transitionName: '',
        name: ""
      }
    },
    watch: {//使用watch 监听$router的变化
      $route(to, from) {
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if (to.meta.index > from.meta.index) {
          //设置动画名称
          this.transitionName = 'slide-left';
        } else {
          this.transitionName = 'slide-right';
        }
      }
    },
    methods: {
      chatValBtn(msg) {
        this.IndexChatRoomBtn = msg;
      },
      logout() {
        $('body').dialog({
          width: 400,
          type: 'danger',
          title: '您确定要退出登录嘛？？',
          discription: '退出后将不能再进行管理？',
          buttonsSameWidth: true,
          buttons: [
            {name: '确定退出', className: 'defalut'},
            {name: '不舍留下', className: 'reverse'}
          ],
          animateIn: 'rotateInUpLeft-hastrans',
          animateOut: 'rotateOutUpLeft-hastrans'
        }, (ret) => {
          if (ret.index === 0) {
            this.axios.get('http://bt2.hll666.xyz:8083/login/adminLoginOut')
              .then((response) => {
                if(response.data.code == 0){
                  this.$router.push({
                    path:"/"
                  })
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
      }
    },
    mounted() {
      this.name = this.$route.query.userInfo;
      // console.info(this.name);

      // 全屏功能
      function fullScreen() {
        $(".z-index-quanping").click(function () {
          $(".z-index-quanping i").toggleClass("icon-quanping1");
        });
        $(".z-index-quanping").click(toggleFullScreen);
      };

      // 全屏动画
      function toggleFullScreen() {
        if (!document.fullscreenElement && // alternative standard method
          !document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
          }
        } else {
          if (document.cancelFullScreen) {
            document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
        }
      }

      // 消息
      function msgIn() {
        $(".z-index-mag").css({
          "transform": "translateX(0)"
        });
        $(".z-index-mag").click(function () {
          $(".z-index-mag").css({
            "transform": "translateX(150%)"
          });
        });
        setTimeout(function () {
          $(".z-index-mag").css({
            "transform": "translateX(150%)"
          });
        }, 10000)
      }

      // 搜索
      function seekClick() {
        $(".z-index-seek").click(function () {
          setTimeout(function () {
            $('body').dialog({
              type:'primary',
              showBoxShadow:true,
              buttons:[{name: '确定',className: 'defalut'}],
              discription:'抱歉，暂未开启此功能',
              animateIn:'fadeInRight-hastrans',
              animateOut:'fadeOutRight-hastrans'
            })
          },500)
        });
      }

      // 加载完成执行
      $(function () {
        fullScreen();
        msgIn();
        seekClick();
      })
    }
  }
</script>

<style scoped>
  .z-index-main-content {
    position: relative;
  }

  /* main */
  .z-index-main {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    box-sizing: border-box;
    padding-top: 20px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  /* 设置滚动条的样式 */
  .z-index-main::-webkit-scrollbar {
    width: 5px;
  }

  /* 滚动槽 */
  .z-index-main::-webkit-scrollbar-track {
    /* -webkit-box-shadow: inset 0 0 6px  rgba(40, 42, 44, 1);
    border-radius: 10px; */
  }

  /* 滚动条滑块 */
  .z-index-main::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(29, 211, 211, 1);
    /* -webkit-box-shadow: inset 0 0 6px rgba(29, 211, 211, 1); */
  }

  .z-index-main::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(29, 211, 211, 1);
  }

  .z-index-main-header {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding-left: 26px;
    padding-right: 40px;
    font-size: 16px;
    /*overflow: hidden;*/
    margin-bottom: 30px;
    position: relative;
  }

  .z-index-main-header:after {
    content: "";
    display: block;
    height: 0;
    overflow: hidden;
    clear: both;
    visibility: hidden;
  }

  .z-index-main-header a {
    transition: all .5s;
  }

  .z-index-main-header a:hover {
    color: #999;
  }

  /* 全屏按钮 */
  .z-index-quanping {
    float: left;
    color: #fff;
    font-weight: bold;
    margin-right: 30px;
  }

  /* 安排按钮 */
  .z-index-anpan {
    float: left;
    color: #fff;
    margin-right: 30px;
  }

  .z-index-anpan i {
    margin-left: 10px;
  }

  /* 搜索按钮 */
  .z-index-seek {
    float: left;
    color: #fff;
  }

  /* 设置按钮 */
  .z-index-shezhi {
    float: right;
    color: #fff;
    margin-left: 30px;
  }

  .z-index-email {
    float: right;
    color: #fff;
    margin-left: 30px;
  }

  .z-index-tongzhi {
    float: right;
    color: #fff;
    margin-left: 30px;
  }

  /*消息*/
  .z-index-mag {
    width: 300px;
    height: 100px;
    box-sizing: border-box;
    padding: 20px;
    background: #333333;
    position: fixed;
    bottom: 30px;
    right: 40px;
    /*border: 1px solid #ccc;*/
    box-shadow: -2px -2px 100px #000;
    cursor: pointer;
    z-index: 10;
    transform: translateX(150%);
    transition: all 1s;
  }

  .z-index-mag h1 {
    font-size: 18px;
    line-height: 18px;
    color: #ccc;
    margin-bottom: 20px;
  }

  .z-index-mag i {
    font-size: 18px;
    line-height: 18px;
    margin-right: 4px;
  }

  .z-index-mag h2 {
    font-size: 14px;
    line-height: 14px;
    color: #ccc;
  }

  /*通知*/
  .z-index-inform {
    width: 300px;
    height: 410px;
    background: #323437;
    border: #2d2f31 1px solid;
    position: absolute;
    top: 40px;
    right: 140px;
    z-index: 9990;
    box-shadow: -2px -2px 100px #000;
    border-radius: 10px;
    /*display: none;*/
  }

  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }

  .z-index-inform > img {
    display: block;
    position: absolute;
    top: -9px;
    right: 23px;
  }

  .z-index-inform-tit {
    width: 100%;
    box-sizing: border-box;
    height: 53px;
    border-bottom: 1px solid #2d2f31;
    line-height: 53px;
    color: #ccc;
    padding: 0 10px 0 22px;
  }

  .z-index-inform-tit h1 {
    font-size: 14px;
    float: left;
  }

  .z-index-inform-tit a {
    font-size: 12px;
    float: right;
    color: #ccc;
    margin: 0 10px;
    text-decoration: underline;
  }

  .z-index-inform-con {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    padding: 20px 0;
  }

  .z-index-inform-con li {
    width: 100%;
    height: 70px;
    line-height: 70px;
    padding: 0 20px;
    box-sizing: border-box;

  }

  .z-index-inform-con li:hover {
    background: #2d404a;
    cursor: pointer;
  }

  .z-index-inform-con li img {
    height: 40px;
    margin-top: 15px;
    float: left;
  }

  .z-index-inform-con li div {
    float: left;
    overflow: hidden;
    padding-top: 15px;
    padding-left: 20px;
  }

  .z-index-inform-con li div h1 {
    font-size: 14px;
    line-height: 22px;
    color: #ccc;
  }

  .z-index-inform-con li span {
    color: #ccc;
    font-size: 12px;
    float: right;
  }

  .z-index-inform-bottom {
    width: 100%;
    height: 53px;
    box-sizing: border-box;
    border-top: 1px solid #2d2f31;
    display: block;
    position: absolute;
    bottom: 0;
    line-height: 52px;
    text-align: center;
    color: #ccc;
    cursor: pointer;
    text-decoration: underline;
    font-size: 14px;
  }


  /*设置*/
  .z-index-setting {
    width: 290px;
    height: 254px;
    background: #323437;
    border: #2d2f31 1px solid;
    position: absolute;
    top: 40px;
    right: 30px;
    z-index: 9990;
    box-shadow: -2px -2px 100px #000;
    border-radius: 10px;
  }

  .z-index-setting-tit {
    width: 100%;
    height: 70px;
    background: #46484c;
    border-radius: 10px 10px 0 0;
    line-height: 70px;
    box-sizing: border-box;
  }

  .z-index-setting-tit > div {
    padding-top: 10px;
    padding-left: 15px;
    float: left;
  }

  .z-index-setting-tit img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .z-index-setting-tit h1 {
    font-size: 18px;
    color: #ccc;
    padding-left: 20px;
    position: relative;
    float: left;
  }

  .z-index-setting-tit a {
    display: block;
    width: 14px;
    height: 16px;
    background: url("../../../static/images/system/index/back.png") no-repeat center;
    float: right;
    margin-top: 28px;
    margin-right: 20px;
  }

  .z-index-setting-top {
    position: absolute;
    top: -9px;
    right: 20px;
  }

  .z-index-setting-tit-con {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding-top: 20px;
  }

  .z-index-setting-tit-con li {
    width: 100%;
    height: 36px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 36px;
    padding-left: 20px;
    font-size: 16px;
    color: #ccc;
    cursor: pointer;
  }

  .z-index-setting-tit-con li span {
    margin-left: 20px;
  }

  .z-index-setting-tit-con li:hover {
    background: #2d404a;
  }

  .IndexChatRoom-enter-active, .IndexChatRoom-leave-active {
    transition: all .5s;
  }

  .IndexChatRoom-enter, .IndexChatRoom-leave-to {
    transform: translateX(120%);
  }

  .IndexMain-enter-active, .IndexMain-leave-active {
    transition: all .1s;
  }

  .IndexMain-enter, .IndexMain-leave-to {
    transform: translateX(120%);
    opacity: 0;
  }

  /*.IndexMain-enter-active, .IndexMain-leave-active {*/
  /*transition: all .3s*/
  /*}*/

  /*.IndexMain-enter, .IndexMain-leave-active {*/
  /*opacity: 0;*/
  /*}*/

  /*.IndexMain-enter {*/
  /*transform: translateX(100%);*/
  /*}*/

  /*.IndexMain-leave-active {*/
  /*transform: translateX(-100%);*/
  /*}*/
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 200ms;
    position: absolute;
  }

  .slide-right-enter {
    opacity: 0;
    transform: translate(100%);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translate(-100%);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate(-100%);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translate(100%);
  }
</style>
