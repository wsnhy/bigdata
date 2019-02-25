<template>
    <div class="w-RoleManagement-content">
        <h1 class="w-Administrator-title">管理员管理</h1>
        <div class="RoleManagement-box">
            <div class="w-RoleManagement-addUser">
                <input type="button" id="w-RoleManagement-addBtn" @click="addAlert" value="新增">
                <div class="w-RoleManagement-search-box">
                    <span class="w-RoleManagement-search-span"></span>
                    <input type="text" placeholder="输入关键字搜索" @focus="SearchFocus" @blur="SearchBlur" id="w-RoleManagement-search">
                    <img src="../../assets/images/system/SortManagement/search.png" @click="searchUser" alt="">
                </div>
                <!--新增管理员弹框-->
                <div class="w-RoleManagement-addAlert">
                    <div class="w-RoleManagement-addAlert-top">
                        新增普通管理员
                        <input type="button" class="w-RoleManagement-close" @click="closeAddAlert" value="×" />
                    </div>
                    <div class="w-RoleManagement-addAlert-content">
                        <!-- 新增的每一列内容 -->
                        <!-- 管理员id -->
                        <div class="w-RoleManagement-user-box">
                            <span class="w-RoleManagement-user-span"></span>
                            <input type="text" placeholder="用户id (非填项)" v-model="AdministratorId" disabled  class="w-RoleManagement-user-title">
                        </div>
                        <!-- 用户名 -->
                        <div class="w-RoleManagement-user-box">
                            <span class="w-RoleManagement-user-span"></span>
                            <input type="text" placeholder="请输入用户名称 * " v-model="AdministratorName" class="w-RoleManagement-user-title">
                        </div>
                        <!-- 密码 -->
                        <div class="w-RoleManagement-user-box">
                            <span class="w-RoleManagement-user-span"></span>
                            <input type="text" placeholder="请输入用户密码 * " v-model="AdministratorPass" class="w-RoleManagement-user-title">
                        </div>
                        <!-- 状态 -->
                        <div class="w-RoleManagement-user-box">
                            <span class="w-RoleManagement-user-span"></span>
                            <input type="text" placeholder="请输入用户状态 * " v-model="AdministratorStatus" class="w-RoleManagement-user-title">
                        </div>
                      <!-- 状态 -->
                      <div class="w-RoleManagement-amend-user-box">
                        <span class="w-RoleManagement-amend-user-span">0-冻结　　　1-正常</span>
                      </div>
                        <input type="button" id="w-RoleManagement-append" @click="addAdministrator" value="添加">
                    </div>
                </div>
            </div>
            <table class="w-RoleManagement-table">
                <!-- 标题 -->
                <!-- 加载进度 -->
                <div class="w-RoleManagement-progress"></div>
                <tr>
                    <td>管理员id</td>
                    <td>管理员昵称</td>
                    <td>会员住址</td>
                    <td>手机号码</td>
                    <td>会员身份</td>
                    <td>会员邮箱</td>
                    <td>会员状态</td>
                    <td>信息修改</td>
                </tr>
                <!-- 管理员 -->
                <tr class="w-RoleManagement-table-users" :key="index" v-for="(a,index) in vipData.list" v-if="a.rolerId != 3">
                    <td>{{a.userId}}</td>
                    <td>{{a.userName}}</td>
                    <td>{{a.userAddressProvince}} {{a.userAddressCity}} {{a.userAddressArea}} {{a.userAddressStreet}}</td>
                    <td>{{a.userPhone}}</td>
                    <td>{{a.rolerId ==2 ? "管理员":"普通用户"}}</td>
                    <td>{{a.userEmail}}</td>
                    <td>{{a.userStatus == 1 ? "正常" : "已冻结"}}</td>
                    <td><input type="button" value="编辑" @click="updateAdministrator(index)" class="w-RoleManagement-updateBtn"></td>
                </tr>
            </table>
            <!-- 编辑用户弹框 -->
            <div class="w-RoleManagement-amendAlert" :key="index" v-for="(b,index) in vipData.list">
                <div class="w-RoleManagement-amendAlert-top">
                    修改普通管理员信息 {{index}}
                    <input type="button" class="w-RoleManagement-amend-close" @click="closeUpdateAlert(index)" value="×" />
                </div>
                <div class="w-RoleManagement-amendAlert-content">
                    <!-- 修改的每一列内容 -->
                    <!-- 管理员id -->
                    <div class="w-RoleManagement-amend-user-box">
                        <span class="w-RoleManagement-amend-user-span">用户id　(不可修改)</span>
                        <input type="text" placeholder="用户id (非填项)" v-model="b.userId" disabled  class="w-RoleManagement-amend-user-title">
                    </div>
                    <!-- 用户名 -->
                    <div class="w-RoleManagement-amend-user-box">
                        <span class="w-RoleManagement-amend-user-span"></span>
                        <input type="text" placeholder="请输入用户名称 * " v-model="b.userName" class="w-RoleManagement-amend-user-title">
                    </div>
                    <!-- 密码 -->
                    <div class="w-RoleManagement-amend-user-box">
                        <span class="w-RoleManagement-amend-user-span"></span>
                        <input type="text" placeholder="请输入用户密码 * "  v-model="b.userPass" class="w-RoleManagement-amend-user-title">
                    </div>
                    <!-- 状态 -->
                    <div class="w-RoleManagement-amend-user-box">
                        <span class="w-RoleManagement-amend-user-span"></span>
                        <input type="text" placeholder="请输入用户状态 * " v-model="b.userStatus" class="w-RoleManagement-amend-user-title">
                    </div>
                    <!-- 状态 -->
                    <div class="w-RoleManagement-amend-user-box">
                      <span class="w-RoleManagement-amend-user-span">0-冻结　　　1-正常</span>
                    </div>
                    <input type="button" class="w-RoleManagement-amend" @click="amend(index)" value="确认修改">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery"
    import qs from "qs"
    import dialog from "../../assets/js/dialog"
    export default {
        name: "FunctionsRoleManagement",
        data(){
            return {
                AdministratorId:"",
                AdministratorName:"",
                AdministratorPass:"",
                AdministratorStatus:"",
                myTimer:"",
                "vipData":{},
            }
        },
        methods:{
            // 初始化数据
            init(){
                this.axios.get('http://bt2.hll666.xyz:8083/user/getUsers', {
                    params: {
                        "rows": 100,
                        "roler":0

                    }
                })
                .then((response)=> {
                    this.vipData = response.data.data
                    // 数据请求成功后关闭加载动画
                    clearInterval(this.myTimer);
                    $(".w-RoleManagement-progress").css("display","none")
                })
                .catch((error)=> {
                    console.log(error);
                })
            },
            // 新增普通管理员(点击 添加按钮 调用此方法)
            addAdministrator(){
                this.axios.post('http://bt2.hll666.xyz:8083/user/addAdmin',{
                    "userId": this.AdministratorId,
                    "userName": this.AdministratorName,
                    "userPass": this.AdministratorPass,
                    "userStatus": this.AdministratorStatus
                })
                .then(function (response) {
                    if(response.data.code==0){
                        setTimeout(function () {
                            $('body').dialog({
                                type:'primary',
                                showBoxShadow:true,
                                buttons:[{name: '确定',className: 'defalut'}],
                                discription:'添加成功',
                                animateIn:'fadeInRight-hastrans',
                                animateOut:'fadeOutRight-hastrans'
                            })
                        },1000)
                    }else{
                        setTimeout(function () {
                            $('body').dialog({
                                type:'primary',
                                showBoxShadow:true,
                                buttons:[{name: '确定',className: 'defalut'}],
                                discription:'请求错误或登录超时，添加失败',
                                animateIn:'fadeInRight-hastrans',
                                animateOut:'fadeOutRight-hastrans'
                            })
                        },1000)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            // 点击 新增按钮 跳出弹框动画
            addAlert(){
                $(".w-RoleManagement-addAlert").animate({
                    "z-index":999,
                    "opacity":1
                },"slow","swing")
            },
            // 点击 新增用户 的关闭按钮
            closeAddAlert(){
                $(".w-RoleManagement-close").parents(".w-RoleManagement-addAlert").animate({
                    "z-index":1,
                    "opacity":0
                },"slow","swing")
            },
            // 点击 搜索 图标
            searchUser(){
                alert("暂不支持此功能")
            },
            // 点击 编辑 弹出对应的编辑弹框
            updateAdministrator(index){
                $($(".w-RoleManagement-amendAlert")[index]).animate({
                    "z-index":999,
                    "opacity":1
                },"slowing","linear")
            },
            // 点击 X 关闭对应的弹框
            closeUpdateAlert(index){
                $($(".w-RoleManagement-amendAlert")[index]).animate({
                    "z-index":1,
                    "opacity":0
                },"slowing","linear")
            },
            // 点击 确认修改
            amend(index){
                let userId = $($(".w-RoleManagement-amendAlert")[index]).find(".w-RoleManagement-amend-user-title").eq(0).val()
                let userName = $($(".w-RoleManagement-amendAlert")[index]).find(".w-RoleManagement-amend-user-title").eq(1).val()
                let userPass = $($(".w-RoleManagement-amendAlert")[index]).find(".w-RoleManagement-amend-user-title").eq(2).val()
                let userStatus = $($(".w-RoleManagement-amendAlert")[index]).find(".w-RoleManagement-amend-user-title").eq(3).val()
                this.axios.put('http://bt2.hll666.xyz:8083/user/updateAdmin', {
                    "userId":userId,
                    "userName":userName,
                    "userPass":userPass,
                    "userStatus":userStatus
                })
                .then((response)=> {
                    if(response.data.code==0){
                        setTimeout(()=> {
                            $('body').dialog({
                                type:'primary',
                                showBoxShadow:true,
                                buttons:[{name: '确定',className: 'defalut'}],
                                discription:'管理员信息修改成功',
                                animateIn:'fadeInRight-hastrans',
                                animateOut:'fadeOutRight-hastrans'
                            })
                        },500)
                    }else{
                        setTimeout(function () {
                            $('body').dialog({
                                type:'primary',
                                showBoxShadow:true,
                                buttons:[{name: '确定',className: 'defalut'}],
                                discription:'请求错误或登录超时，管理员信息修改失败',
                                animateIn:'fadeInRight-hastrans',
                                animateOut:'fadeOutRight-hastrans'
                            })
                        },500)
                    }
                })
                .catch((error)=> {
                    console.log(error);
                });
            },
            // 搜索 聚焦
            SearchFocus(){
                $(".w-RoleManagement-search-box").children(".w-RoleManagement-search-span").html("输入关键字搜索");
                $("#w-RoleManagement-search").attr("placeholder", "")
                $("#w-RoleManagement-search").css({
                    "border-bottom": "2px solid #2196f3",
                    "color": "#2196f3"
                })
                $(".w-RoleManagement-search-box").children("img").attr("src", "../../../static/images/system/SortManagement/search2.png");
            },
            // 搜索 失焦
            SearchBlur(){
                var value = $(".w-RoleManagement-search-box").children(".w-RoleManagement-search-span").html();
                $(".w-RoleManagement-search-box").children(".w-RoleManagement-search-span").html("");
                $("#w-RoleManagement-search").attr("placeholder", value)
                $("#w-RoleManagement-search").css({
                    "border-bottom": "2px solid #c7c7c7",
                    "color": "#c7c7c7"
                })
                $(".w-RoleManagement-search-box").children("img").attr("src", "../../../static/images/system/SortManagement/search.png");
            }
        },
        created(){
          this.init()
        },
        mounted() {
            // 表格加载进度条
            var left = 0;
            var TotalWidth = parseInt($(".RoleManagement-box").css("width"))
            this.myTimer = setInterval(() => {
                left += 25;
                if (left >= TotalWidth) {
                    left = 0;
                }
                $(".w-RoleManagement-progress").css("left", left)
            }, 16);
        },
        updated() {
            // 测试新增管理员弹框的聚焦和失焦
            // 聚焦
            $(".w-RoleManagement-user-title").focus(function () {
                var value = $(this).attr("placeholder");
                $(this).parents(".w-RoleManagement-user-box").children(".w-RoleManagement-user-span").html(value);
                $(this).attr("placeholder", "")
                $(this).css({
                    "border-bottom": "2px solid #f44336",
                    "color": "#f44336"
                })
            })
            // 失焦
            $(".w-RoleManagement-user-title").blur(function () {
                var value = $(this).parents(".w-RoleManagement-user-box").children(".w-RoleManagement-user-span").html();
                $(this).parents(".w-RoleManagement-user-box").children(".w-RoleManagement-user-span").html("");
                $(this).attr("placeholder", value)
                $(this).css({
                    "border-bottom": "2px solid #f44336",
                    "color": "#f44336"
                })
            })

            // 测试修改管理员弹框的聚焦和失焦
            // 聚焦
            $(".w-RoleManagement-amend-user-title").focus(function () {
                var value = $(this).attr("placeholder");
                $(this).parents(".w-RoleManagement-amend-user-box").children(".w-RoleManagement-amend-user-span").html(value);
                $(this).attr("placeholder", "")
                $(this).css({
                    "border-bottom": "2px solid #f44336",
                    "color": "#f44336"
                })
            })
            // 失焦
            $(".w-RoleManagement-amend-user-title").blur(function () {
                var value = $(this).parents(".w-RoleManagement-amend-user-box").children(".w-RoleManagement-amend-user-span").html();
                $(this).parents(".w-RoleManagement-amend-user-box").children(".w-RoleManagement-amend-user-span").html("");
                $(this).attr("placeholder", value)
                $(this).css({
                    "border-bottom": "2px solid #f44336",
                    "color": "#f44336"
                })
            })
        }
    }
</script>

<style scoped>
    .w-RoleManagement-content{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 30px;
    }
    /* 欢迎标题 */
    .w-Administrator-title {
        width: 15%;
        color: #d1bebe;
        font-size: 30px;
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #d1bebe;
        margin-bottom: 50px;
    }
    .RoleManagement-box{
        width: 100%;
        background: #323437;
        overflow: hidden;
    }
    /* 添加用户 */
    .w-RoleManagement-addUser{
        height: 80px;
        background: #323437;
        border-bottom: 1px solid #5a6065;
    }
    /* 关键字搜索-盒子 */
    .w-RoleManagement-search-box{
        float: right;
        width: 650px;
        height: 50px;
        margin: 15px 20px 0 0;
        position: relative;
    }
    /* 关键字搜索-失焦显示span */
    .w-RoleManagement-search-span{
        display: block;
        width: 100%;
        height: 20px;
        color:#2196f3;
        font-size: 14px;
        box-sizing: border-box;
        padding-left: 15px;
    }
    /* 关键字搜索 */
    #w-RoleManagement-search{
        width: 100%;
        height: 30px;
        background: #323437;
        border: none;
        border-bottom:2px solid #c7c7c7;
        color: #c7c7c7;
        font-size: 18px;
        text-indent: 15px;
    }
    /* 搜索图标 */
    .w-RoleManagement-search-box img{
        position: absolute;
        width: 25px;
        height: 25px;
        right: 10px;
        bottom: 5px;
        cursor: pointer;
    }
    /* 搜索框默认值 */
    #w-RoleManagement-search::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: #c7c7c7;
    }
    /* 添加管理员按钮 */
    #w-RoleManagement-addBtn {
        width: 100px;
        height: 45px;
        border: none;
        border-radius: 10px;
        background: rgba(29, 211, 211, 1);
        box-shadow: 2px 2px 1px #014378;
        margin-left: 20px;
        margin-top: 17px;
        cursor: pointer;
        font-size: 20px;
    }
    /* 添加管理员弹框 */
    .w-RoleManagement-addAlert{
        width: 30%;
        height: 600px;
        position: fixed;
        left: 40%;
        top: 22%;
        background: #2b2c2f;
        /* display: none; */
        overflow: hidden;
        display: flex;
        flex-direction: column;
        opacity: 0;
    }
    /* 添加管理员弹出框头部 */
    .w-RoleManagement-addAlert-top{
        width: 100%;
        height: 50px;
        background:rgba(29, 211, 211, 1);
        line-height: 45px;
        color: #fff;
        font-size: 20px;
        box-sizing: border-box;
        padding-left: 15px;
        position: relative;
        overflow: hidden;
    }
    /* 添加管理员弹出框关闭按钮 */
    .w-RoleManagement-close{
        height: 50px;
        width: 50px;
        background: rgba(29, 211, 211, 1);
        border: none;
        color:#fff;
        font-size: 40px;
        position: absolute;
        right: 2%;
        cursor: pointer;
    }
    /* 添加管理员弹出框内容 */
    .w-RoleManagement-addAlert-content{
        width: 100%;
        flex: 1;
        box-sizing: border-box;
        padding-top: 20px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    /* 添加管理员确认添加按钮 */
    #w-RoleManagement-append{
        display: block;
        width: 50%;
        height: 50px;
        font-size: 20px;
        border: none;
        border-radius: 10px;
        background: rgba(29, 211, 211, 1);
        margin: 50px 150px;
        cursor: pointer;
        float: left;
    }
    /* 弹出框-管理员信息盒子 */
    .w-RoleManagement-user-box {
        width: 85%;
        height: 50px;
        margin: 0 auto;
        position: relative;
        margin-bottom: 20px;
    }
    .w-RoleManagement-user-box:nth-of-type(1){
        margin-top: 30px;
    }
    /* 弹出框-管理员-失焦显示span */
    .w-RoleManagement-user-span {
        display: block;
        width: 100%;
        height: 20px;
        color: #f44336;
        font-size: 14px;
        box-sizing: border-box;
        padding-left: 15px;
    }

    /* 弹出框-管理员 */
    .w-RoleManagement-user-title {
        width: 100%;
        height: 30px;
        background: #2b2c2f;
        border: none;
        border-bottom: 2px solid #f44336;
        color: #f44336;
        font-size: 18px;
        text-indent: 15px;
    }
    /* 默认值 */
    .w-RoleManagement-user-title::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: #f44336;
    }

    /* 加载进度 */
    .w-RoleManagement-progress {
        width: 50%;
        height: 2px;
        top: 70px;
        left: 0;
        background: #2196f3;
        position: absolute;
    }
    /* 表格 */
    .w-RoleManagement-table{
        width: 100%;
        border-collapse: collapse;
        border-spacing: 10px;
        table-layout: fixed;
        text-align: center;
        color: #fff;
        position: relative;
    }
    /* 每一行的底边框 */
    .w-RoleManagement-table tr{
        border-bottom: 1px solid #595959;
    }
    .w-RoleManagement-table tr:nth-of-type(1){
        border-bottom: 2px solid #595959;
    }
    .w-RoleManagement-table tr td{
        text-align: center;
        height: 100px;
    }
    /* 第一行的高度 */
    .w-RoleManagement-table tr:nth-of-type(1) td{
        height: 70px;
    }
    /* 操作按钮 */
    .w-RoleManagement-table tr td input{
        width: 50%;
        height: 50px;
        border-radius: 20px;
        cursor: pointer;
        border: 2px solid black;
        background: #ba6424;
    }


    /* 修改管理员信息按钮 */
    #w-RoleManagement-addBtn {
        width: 100px;
        height: 45px;
        border: none;
        border-radius: 10px;
        background: rgba(29, 211, 211, 1);
        box-shadow: 2px 2px 1px #014378;
        margin-left: 20px;
        margin-top: 17px;
        cursor: pointer;
        font-size: 20px;
    }
    /* 修改管理员弹框 */
    .w-RoleManagement-amendAlert{
        width: 30%;
        height: 600px;
        position: fixed;
        left: 40%;
        top: 22%;
        background: #2b2c2f;
        /* display: none; */
        overflow: hidden;
        display: flex;
        flex-direction: column;
        opacity: 0;
    }
    /* 修改管理员弹出框头部 */
    .w-RoleManagement-amendAlert-top{
        width: 100%;
        height: 50px;
        background:rgba(29, 211, 211, 1);
        line-height: 45px;
        color: #fff;
        font-size: 20px;
        box-sizing: border-box;
        padding-left: 15px;
        position: relative;
        overflow: hidden;
    }
    /* 修改管理员弹出框关闭按钮 */
    .w-RoleManagement-amend-close{
        height: 50px;
        width: 50px;
        background: rgba(29, 211, 211, 1);
        border: none;
        color:#fff;
        font-size: 40px;
        position: absolute;
        right: 2%;
        cursor: pointer;
    }
    /* 修改管理员弹出框内容 */
    .w-RoleManagement-amendAlert-content{
        width: 100%;
        flex: 1;
        box-sizing: border-box;
        padding-top: 20px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    /* 修改管理员确认修改按钮 */
    .w-RoleManagement-amend{
        display: block;
        width: 50%;
        height: 50px;
        font-size: 20px;
        border: none;
        border-radius: 10px;
        background: rgba(29, 211, 211, 1);
        margin: 50px 150px;
        cursor: pointer;
        float: left;
    }
    /* 弹出框-修改管理员信息盒子 */
    .w-RoleManagement-amend-user-box {
        width: 85%;
        height: 50px;
        margin: 0 auto;
        position: relative;
        margin-bottom: 20px;
    }
    .w-RoleManagement-amend-user-box:nth-of-type(1){
        margin-top: 30px;
    }
    /* 弹出框-修改管理员-失焦显示span */
    .w-RoleManagement-amend-user-span {
        display: block;
        width: 100%;
        height: 20px;
        color: #f44336;
        font-size: 14px;
        box-sizing: border-box;
        padding-left: 15px;
    }

    /* 弹出框-管理员 */
    .w-RoleManagement-amend-user-title {
        width: 100%;
        height: 30px;
        background: #2b2c2f;
        border: none;
        border-bottom: 2px solid #f44336;
        color: #f44336;
        font-size: 18px;
        text-indent: 15px;
    }
    /* 默认值 */
    .w-RoleManagement-amend-user-title::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: #f44336;
    }
</style>
