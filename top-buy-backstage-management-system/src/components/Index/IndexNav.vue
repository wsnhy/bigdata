<template>
  <div class="z-index-nav">
    <div class="z-index-nav-header">
      <div class="z-index-nav-header-img">
        <img src="../../../static/images/system/index/logo.png"/>
      </div>
      <a href="javascript:;" id="menu"><i class="iconfont icon-icons_menu"></i><span>×</span></a>
    </div>
    <div class="z-index-nav-main">
      <h1 class="z-index-nav-main-title">导航</h1>
      <div class="z-index-nav-main-c" v-for="(c,i) in data" :key="i" :data="c">
        <h1 class="z-index-nav-main-list-title"><i class="iconfont" :class="c.ico"></i><span>{{c.navName}}</span><i
          class="iconfont icon-icon-arrow-down"
          id="z-index-jiantou"></i></h1>
        <ul class="z-index-nav-main-list">
          <router-link exact-active-class="act" :to="s.url" tag="li" v-for="(s,i) in c.menu" :key="i" :data="s"><i
            class="iconfont icon-dian"></i><span :id="s.id">{{s.name}}</span>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from "jquery"
  import dialog from "../../assets/js/dialog"
  export default {
    props: ["data"],
    name: "IndexNav",
    data() {
      return {}
    },
    mounted() {
      function clickLi() {
        let clickLiK = false;
        $(".z-index-nav-main-list-title").each(function () {
          $(this).click(function () {
            if ($(this).next(".z-index-nav-main-list").css("display") === "none") {
              $(".z-index-nav-main-list-title").each(function () {
                if ($(this).next(".z-index-nav-main-list").css("display") === "block") {
                  $(this).next(".z-index-nav-main-list").stop(false).slideToggle(300);
                  $(this).css({
                    "border-left": "3px solid #1e1f21"
                  });
                  $(this).next(".z-index-nav-main-list").css({
                    "border-left": "3px solid #1e1f21"
                  });
                  $(this).children("#z-index-jiantou").css({
                    "transform": "rotate(0deg)"
                  });
                  clickLiK = !clickLiK;
                }
              });
              $(this).next(".z-index-nav-main-list").stop(false).slideToggle(300);
              if (!clickLiK) {
                $(this).css({
                  "border-left": "3px solid #1dd3d3"
                });
                $(this).next(".z-index-nav-main-list").css({
                  "border-left": "3px solid #1dd3d3"
                });
                $(this).children("#z-index-jiantou").css({
                  "transform": "rotate(180deg)"
                });
                clickLiK = !clickLiK;
              } else {
                $(this).css({
                  "border-left": "3px solid #1e1f21"
                });
                $(this).next(".z-index-nav-main-list").css({
                  "border-left": "3px solid #1e1f21"
                });
                $(this).children("#z-index-jiantou").css({
                  "transform": "rotate(0deg)"
                });
                clickLiK = !clickLiK;
              }
            } else {
              $(this).next(".z-index-nav-main-list").stop(false).slideToggle(300);
              $(this).css({
                "border-left": "3px solid #1e1f21"
              });
              $(this).next(".z-index-nav-main-list").css({
                "border-left": "3px solid #1e1f21"
              });
              $(this).children("#z-index-jiantou").css({
                "transform": "rotate(0deg)"
              });
              clickLiK = !clickLiK;
            }
          });
        });
      }

      // nav动画
      function menuBtn(data) {
        var navBtn = true;
        $("#menu").click(function () {
          if (navBtn) {
            // 整体nav
            $(".z-index-nav").css({
              "width": "120px"
            });
            // logo
            $(".z-index-nav-header-img").css({
              "width": "40px"
            });
            $(".z-index-nav-main-list li span").css({
              "display": "none"
            });
            $("#menu i").css({
              "display": "none"
            });
            $("#menu span").css({
              "display": "block"
            });
            navBtn = !navBtn;
          } else {
            // 整体nav
            $(".z-index-nav").css({
              "width": "264px"
            });
            // logo
            $(".z-index-nav-header-img").css({
              "width": "160px"
            });
            setTimeout(function () {
              $(".z-index-nav-main-list li span").css({
                "display": "inline"
              });
              $(".z-index-nav-main-list-title span").css({
                "display": "inline"
              });
            }, 100);
            $("#menu i").css({
              "display": "block"
            });
            $("#menu span").css({
              "display": "none"
            });
            navBtn = !navBtn;
          }
        });
        $(".z-index-nav").hover(function () {
          if (!navBtn) {
            // 整体nav
            $(".z-index-nav").css({
              "width": "264px"
            });
            // logo
            $(".z-index-nav-header-img").css({
              "width": "160px"
            });
            setTimeout(function () {
              $(".z-index-nav-main-list li span").css({
                "display": "inline"
              });
              $(".z-index-nav-main-list-title span").css({
                "display": "inline"
              });
            }, 100);
          }
        }, function () {
          if (!navBtn) {
            // 整体nav
            $(".z-index-nav").css({
              "width": "120px"
            });
            // logo
            $(".z-index-nav-header-img").css({
              "width": "40px"
            });
            $(".z-index-nav-main-list li span").css({
              "display": "none"
            });
            $(".z-index-nav-main-list-title span").css({
              "display": "none"
            });
          }
        });
      }

      $(function () {
        // 导航栏动画
        clickLi();
        //触发button的click事件
        $($(".z-index-nav-main-list-title")[0]).trigger("click");
        // nav动画
        menuBtn();
      })

      // 退出登录
      $("#logout").click(() => {
        this.axios.get('http://bt2.hll666.xyz:8083/login/adminLoginOut')
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error);
          });
      })
    }
  }
</script>

<style scoped>
  .act {
    color: #1dd3d3 !important;
  }


  /* nav */
  .z-index-nav {
    width: 264px;
    background: #323437;
    padding-top: 18px;
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
    position: relative;
    z-index: 999;
    transition: all .5s;
  }

  .z-index-nav-header {
    padding-left: 20px;
    overflow: hidden;
    margin-bottom: 45px;
  }

  .z-index-nav-header-img {
    float: left;
    overflow: hidden;
    /*width: 40px;*/
    transition: all .5s;
  }

  .z-index-nav-header img {
    height: 40px;
  }

  .z-index-nav-header i {
    font-size: 30px;
    color: #fff;
    float: right;
    margin-right: 20px;
    margin-top: 5px;
  }

  #menu i {
    /*display: none;*/
  }

  #menu span {
    font-size: 30px;
    line-height: 30px;
    color: #fff;
    float: right;
    margin-right: 20px;
    margin-top: 5px;
    display: none;

  }

  .z-index-nav-main {
    width: 100%;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    /* overflow-x: hidden;
    overflow-y: scroll; */
  }

  .z-index-nav-main-title {
    font-size: 16px;
    color: #fff;
    line-height: 16px;
    margin-bottom: 22px;
    padding-left: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .z-index-nav-main-list {
    width: 100%;
    height: auto;
  }

  .z-index-nav-main-list-title {
    width: 100%;
    height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-left: 3px solid #1e1f21;
    padding-left: 20px;
    color: #fff;
    line-height: 44px;
    font-size: 14px;
    background: #2e3033;
    cursor: pointer;
    margin-top: 5px;
  }

  .z-index-nav-main-list-title i {
    margin-right: 15px;
  }

  .z-index-nav-main-list-title i:last-child {
    margin-right: 20px;
    float: right;
    transition: all .5s;
  }

  .z-index-nav-main-list {
    box-sizing: border-box;
    border-left: 3px solid #1dd3d3;
    display: none;
  }


  .z-index-nav-main-list li {
    width: 100%;
    height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 20px;
    color: #fff;
    line-height: 44px;
    font-size: 14px;
    cursor: pointer;
    overflow: hidden;
  }

  .z-index-nav-main-list li:hover {
    color: #1dd3d3;
  }

  .z-index-nav-main-list li i {
    margin-right: 15px;
  }

</style>
