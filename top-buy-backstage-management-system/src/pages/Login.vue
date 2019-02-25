<template>
  <div class="z-login">
    <img class="z-login-logo" src="../../static/images/login/GoodsLogo.png">
    <h1 class="z-login-h1">欢迎使用淘买后台管理系统</h1>
    <nav class="menu">
      <div class="z-login-windowClose">
        <h2>欢迎登陆</h2>
        <span>×</span>
      </div>
      <form class="z-login-form">
            <span class="z-login-input z-login-input-kozakura">
                <input class="input__field input__field--kozakura" type="text" id="input-7"
                       v-model="userinfo.username"/>
                <label class="input__label input__label--kozakura" for="input-7">
                    <span class="input__label-content input__label-content--kozakura" data-content="用户名">用户名</span>
                </label>
                <svg class="graphic graphic--kozakura" width="300%" height="100%" viewBox="0 0 1200 60"
                     preserveAspectRatio="none">
                    <path
                      d="M1200,9c0,0-305.005,0-401.001,0C733,9,675.327,4.969,598,4.969C514.994,4.969,449.336,9,400.333,9C299.666,9,0,9,0,9v43c0,0,299.666,0,400.333,0c49.002,0,114.66,3.484,197.667,3.484c77.327,0,135-3.484,200.999-3.484C894.995,52,1200,52,1200,52V9z"></path>
                </svg>
            </span>
        <span class="z-login-input z-login-input-kozakura">
                <input class="input__field input__field--kozakura" type="password" id="input-8"
                       v-model="userinfo.password"/>
                <label class="input__label input__label--kozakura" for="input-8">
                    <span class="input__label-content input__label-content--kozakura" data-content="密码">密码</span>
                </label>
                <svg class="graphic graphic--kozakura" width="300%" height="100%" viewBox="0 0 1200 60"
                     preserveAspectRatio="none">
                    <path
                      d="M1200,9c0,0-305.005,0-401.001,0C733,9,675.327,4.969,598,4.969C514.994,4.969,449.336,9,400.333,9C299.666,9,0,9,0,9v43c0,0,299.666,0,400.333,0c49.002,0,114.66,3.484,197.667,3.484c77.327,0,135-3.484,200.999-3.484C894.995,52,1200,52,1200,52V9z"></path>
                </svg>
            </span>
      </form>
      <div class="z-login-login">
        <button class="btn btn--swap" id="logining">点击登录<span>登录</span></button>
      </div>
      <span id="loginInfo"></span>
    </nav>
  </div>
</template>

<script>
  import qs from "qs"

  export default {
    name: "Login",
    data() {
      return {
        userinfo: {
          username: "",
          password: ""
        }
      }
    },
    mounted() {
      //登陆
      $("#logining").click(() => {
        this.axios.post('http://bt2.hll666.xyz:8083/login/checkAdmin', qs.stringify({
          "username": this.userinfo.username,
          "password": this.userinfo.password
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        })
          .then((response) => {
            console.log(response.data);
            if (response.data.code === 0) {
              $("#loginInfo").css({
                color: "green"
              });
              $("#loginInfo").html("登录成功！")
              setTimeout(() => {
                console.info(this.userinfo.username);
                this.$router.push({
                  path: '/Index',
                  query: {
                    userInfo: this.userinfo.username
                  }
                });
              }, 300)
            } else {
              $("#loginInfo").css({
                color: "red"
              });
              $("#loginInfo").html(response.data.msg)
            }
          })
          .catch((error) => {
            console.log(error);
          });

        // console.info(this.userinfo);
      });
      $(function () {
        loginBtn();
      });

      function loginBtn() {
        $(".z-login-h1").click(function () {
          document.getElementsByTagName('nav')[0].className = 'menu menu_active'
        });
        $(".z-login-windowClose").click(function () {
          document.getElementsByTagName('nav')[0].className = 'menu'
        });
      }

      (function (window) {

        'use strict';

        // class helper functions from bonzo https://github.com/ded/bonzo

        function classReg(className) {
          return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
        }

        // classList support for class management
        // altho to be fair, the api sucks because it won't accept multiple classes at once
        var hasClass, addClass, removeClass;

        if ('classList' in document.documentElement) {
          hasClass = function (elem, c) {
            return elem.classList.contains(c);
          };
          addClass = function (elem, c) {
            elem.classList.add(c);
          };
          removeClass = function (elem, c) {
            elem.classList.remove(c);
          };
        } else {
          hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
          };
          addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
              elem.className = elem.className + ' ' + c;
            }
          };
          removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
          };
        }

        function toggleClass(elem, c) {
          var fn = hasClass(elem, c) ? removeClass : addClass;
          fn(elem, c);
        }

        var classie = {
          // full names
          hasClass: hasClass,
          addClass: addClass,
          removeClass: removeClass,
          toggleClass: toggleClass,
          // short names
          has: hasClass,
          add: addClass,
          remove: removeClass,
          toggle: toggleClass
        };

        // transport
        if (typeof define === 'function' && define.amd) {
          // AMD
          define(classie);
        } else {
          // browser global
          window.classie = classie;
        }

      })(window);
      (function () {
        if (!String.prototype.trim) {
          (function () {
            // Make sure we trim BOM and NBSP
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function () {
              return this.replace(rtrim, '');
            };
          })();
        }

        [].slice.call(document.querySelectorAll('input.input__field')).forEach(function (inputEl) {
          // in case the input is already filled..
          if (inputEl.value.trim() !== '') {
            classie.add(inputEl.parentNode, 'input--filled');
          }

          // events:
          inputEl.addEventListener('focus', onInputFocus);
          inputEl.addEventListener('blur', onInputBlur);
        });

        function onInputFocus(ev) {
          classie.add(ev.target.parentNode, 'input--filled');
        }

        function onInputBlur(ev) {
          if (ev.target.value.trim() === '') {
            classie.remove(ev.target.parentNode, 'input--filled');
          }
        }
      })();
    }
  }
</script>

<style scoped>
  /* cyrillic-ext */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/L0x5DF4xlVMF-BfR8bXMIjhGq3-OXg.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }

  /* cyrillic */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/L0x5DF4xlVMF-BfR8bXMIjhPq3-OXg.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }

  /* greek-ext */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/L0x5DF4xlVMF-BfR8bXMIjhHq3-OXg.woff2) format('woff2');
    unicode-range: U+1F00-1FFF;
  }

  /* greek */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/L0x5DF4xlVMF-BfR8bXMIjhIq3-OXg.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }

  /* vietnamese */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/L0x5DF4xlVMF-BfR8bXMIjhEq3-OXg.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }

  /* latin-ext */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/L0x5DF4xlVMF-BfR8bXMIjhFq3-OXg.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }

  /* latin */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/L0x5DF4xlVMF-BfR8bXMIjhLq38.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  /* vietnamese */
  @font-face {
    font-family: 'Space Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Space Mono'), local('SpaceMono-Regular'), url(https://fonts.gstatic.com/s/spacemono/v3/i7dPIFZifjKcF5UAWdDRYE58RWq7.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }

  /* latin-ext */
  @font-face {
    font-family: 'Space Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Space Mono'), local('SpaceMono-Regular'), url(https://fonts.gstatic.com/s/spacemono/v3/i7dPIFZifjKcF5UAWdDRYE98RWq7.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }

  /* latin */
  @font-face {
    font-family: 'Space Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Space Mono'), local('SpaceMono-Regular'), url(https://fonts.gstatic.com/s/spacemono/v3/i7dPIFZifjKcF5UAWdDRYEF8RQ.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  .z-login {
    width: 100%;
    height: 100%;
    background: #0F2027; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .z-login-logo {
    width: 100px;
    height: 100px;
    margin-bottom: 30px;
  }

  .z-login-h1 {
    font-family: "Roboto Mono", monospace;
    font-size: 30px;
    color: #cfd8dc;
    cursor: pointer;
    transition: all 0.3s;
  }

  .z-login-h1:hover {
    border-bottom: 3px dotted #cfd8dc;
    padding-bottom: 10px;
    top: calc(50vh - 50px);
  }

  .z-login-form {
    display: table;
  }

  nav {
    display: table;
    font-family: "Space Mono", monospace;
    background: #1d1f20;
    padding: 25px 35px;
    width: 400px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    border-radius: 16px;
    box-shadow: 0 0 60px -15px black;
    transform: scale(0) rotate(360deg);
    transition: all 0.75s;
    font-size: 18px;
  }

  nav.menu_active {
    transform: scale(1) rotate(0deg);
  }

  .z-login-windowClose {
    font-family: "Roboto Mono", monospace;
    font-size: 20px;
    color: #cfd8dc;
    overflow: hidden;
    cursor: pointer;
  }

  .z-login-windowClose h2 {
    font-size: 14px;
    line-height: 14px;
    float: left;
  }

  .z-login-windowClose span {
    float: right;
    line-height: 14px;
  }

  .z-login-input {
    position: relative;
    z-index: 1;
    display: block;
    margin: 16px;
    max-width: 350px;
    vertical-align: top;
    overflow: hidden;
  }

  .input__field {
    position: relative;
    display: block;
    float: right;
    padding: 12px;
    width: 100%;
    border: none;
    border-radius: 0;
    background: #f0f0f0;
    color: #aaa;
    -webkit-appearance: none;
  }

  .input__field:focus {
    outline: none;
  }

  .input__label {
    display: inline-block;
    float: right;
    width: 40%;
    color: #696969;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    line-height: 14px;
  }

  .input__label-content {
    position: relative;
    display: block;
    width: 100%;
  }

  .graphic {
    position: absolute;
    top: 0;
    left: 0;
    fill: none;
  }

  /* Kozakura */
  .input--kozakura {
    overflow: hidden;
    padding-bottom: 20px;
  }

  .input__field--kozakura {
    padding: 10px 8px;
    margin-top: 20px;
    width: 100%;
    background: transparent;
    color: #2F3238;
    font-size: 20px;
    opacity: 0;
    text-indent: 20px;
  }

  .input__label--kozakura {
    width: 100%;
    text-align: left;
    position: absolute;
    top: -3px;
    pointer-events: none;
    overflow: hidden;
    padding: 0 0.25em;
    -webkit-transform: translate3d(16px, 30px, 0);
    transform: translate3d(16px, 30px, 0);
    -webkit-transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
  }

  .input__label-content--kozakura {
    color: #A4A5A6;
    padding: 10px 0 10px;
    -webkit-transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
  }

  .input__label-content--kozakura::after {
    content: attr(data-content);
    position: absolute;
    font-weight: 800;
    top: 100%;
    left: 0;
    height: 100%;
    width: 100%;
    color: #aaa;
    padding: 0.25em 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 14px;
  }

  .graphic--kozakura {
    fill: #494E57;
    pointer-events: none;
    top: 10px;
    bottom: 0px;
    height: 60px;
    z-index: -1;
    -webkit-transition: -webkit-transform 0.7s, fill 0.7s;
    transition: transform 0.7s, fill 0.7s;
    -webkit-transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1);
    transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1);
  }

  .input__field--kozakura:focus,
  .input--filled .input__field--kozakura {
    -webkit-transition: opacity 0s 0.35s;
    transition: opacity 0s 0.35s;
    opacity: 1;
  }

  .input__field--kozakura:focus + .input__label--kozakura,
  .input--filled .input__label--kozakura {
    -webkit-transition-delay: 0.15s;
    transition-delay: 0.15s;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .input__field--kozakura:focus + .input__label--kozakura .input__label-content--kozakura,
  .input--filled .input__label-content--kozakura {
    -webkit-transition-delay: 0.15s;
    transition-delay: 0.15s;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  .input__field--kozakura:focus ~ .graphic--kozakura,
  .input--filled .graphic--kozakura {
    fill: #aaa;
    -webkit-transform: translate3d(-66.6%, 0, 0);
    transform: translate3d(-66.6%, 0, 0);
  }

  .z-login-login {
    display: table;
    position: absolute;
    top: 0;
    right: 30px;
    bottom: 0;
    margin: auto 0;
    transform: translateY(10px)
  }

  .btn {
    border-radius: 10px;
    overflow: hidden;
    padding: 30px 10px;
    font-size: 16px;
    cursor: pointer;
    position: relative;
    border: 2px solid #aaa;
    outline: none;
    color: #aaa;
    background-color: transparent;
    font-family: 'Merriweather', serif;
    white-space: nowrap;
  }

  .btn--swap span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 30px 10px;
    font-size: 16px;
    box-sizing: border-box;
    opacity: 0;
    color: black;
    transition: 0.3s ease;
  }

  .btn--swap::before {
    content: "";
    left: 0;
    top: 0;
    position: absolute;
    width: 0;
    height: 100%;
    background-color: #aaa;
    transition: 0.5s ease;
  }

  .btn--swap:hover:before {
    width: 100%;
  }

  .btn--swap:hover span {
    opacity: 1;
  }

  #loginInfo {
    margin-left: 30px;
    color: #ccc;
  }
</style>
