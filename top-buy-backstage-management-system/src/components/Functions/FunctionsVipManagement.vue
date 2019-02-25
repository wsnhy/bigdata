<template>
        <div class="v-VipManagement-content">
            <h1 class="w-VipManagement-title">普通用户管理</h1>
            <table class="w-VipManagement-table">
                <!-- 标题 -->
                <!-- 加载进度 -->
                <div class="w-VipManagement-progress"></div>
                <tr>
                    <td>会员id</td>
                    <td>会员昵称</td>
                    <td>会员住址</td>
                    <td>手机号码</td>
                    <td>会员身份</td>
                    <td>会员邮箱</td>
                    <td>会员状态</td>
                    <td colspan="2">操作</td>
                </tr>
                <!-- 用户 -->
                <tr class="w-VipManagement-table-users" :key="index" v-for="(a,index) in vipData.list" v-if="a.rolerId == 3">
                    <td>{{a.userId}}</td>
                    <td>{{a.userName}}</td>
                    <td>{{a.userAddressProvince}} {{a.userAddressCity}} {{a.userAddressArea}} {{a.userAddressStreet}}</td>
                    <td>{{a.userPhone}}</td>
                    <td>{{a.rolerId ==3 ? "普通用户":"管理员"}}</td>
                    <td>{{a.userEmail}}</td>
                    <td>{{a.userStatus == 1 ? "正常" : "已冻结"}}</td>
                    <td><input type="button" value="冻结" @click="freezeUser(index)" class="w-VipManagement-updateBtn dw-btn btn-danger has-hover"></td>
                    <td><input type="button" value="解除冻结" @click="cancelUser(index)" class="w-VipManagement-cancelBtn dw-btn btn-danger has-hover"></td>
                </tr>
            </table>
        </div>
</template>

<script>
    import $ from "jquery"
    import dialog from "../../assets/js/dialog"
    export default {
        name: "FunctionsVipManagement",
        data(){
          return {
              vipData:{},
              myTimer:"",
              vipId:0
            }
        },
        methods:{
            // 初始化数据
            init(){
                this.axios.get('http://bt2.hll666.xyz:8083/user/getUsers', {
                    params: {
                        "rows": 100,
                        "roler": 1
                    }
                })
                .then((response)=> {
                  console.log(response)
                    if(response.data.code==0){
                        this.vipData = response.data.data
                        // 数据请求成功后关闭加载动画
                        clearInterval(this.myTimer);
                        $(".w-VipManagement-progress").css("display","none")
                    }else{
                        $('body').dialog({
                            type:'primary',
                            showBoxShadow:true,
                            buttons:[{name: '确定',className: 'defalut'}],
                            discription:'请求错误或登录超时，获取用户信息失败',
                            animateIn:'fadeInRight-hastrans',
                            animateOut:'fadeOutRight-hastrans'
                        })
                    }
                })
                .catch((error)=> {
                    console.log(error);
                });
            },
            // 冻结用户
            freezeUser(index){
                $('body').dialog({
                    width: 400,
                    type: 'danger',
                    title: '你确定要冻结该账户？',
                    discription: '被冻结期间将不能登录？',
                    buttonsSameWidth: true,
                    buttons: [
                        {name: '残忍冻结', className: 'defalut'},
                        {name: '不舍留下', className: 'reverse'}
                    ],
                    animateIn: 'rotateInUpLeft-hastrans',
                    animateOut: 'rotateOutUpLeft-hastrans'
                }, (ret)=> {
                    if (ret.index === 0) {
                        this.vipId = $($(".w-VipManagement-table-users")[index]).find("td").eq(0).html()
                        this.axios.put('http://bt2.hll666.xyz:8083/user/updateAdmin', {
                            "userId":this.vipId,
                            "userStatus":0
                        })
                        .then((response)=> {
                            if(response.data.code==0){
                                setTimeout(function () {
                                    $('body').dialog({
                                        type:'primary',
                                        showBoxShadow:true,
                                        buttons:[{name: '确定',className: 'defalut'}],
                                        discription:'冻结成功，此用户将不能登录',
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
                                        discription:'请求错误或登录超时，冻结失败',
                                        animateIn:'fadeInRight-hastrans',
                                        animateOut:'fadeOutRight-hastrans'
                                    })
                                },500)
                            }
                        })
                        .catch((error)=> {
                            console.log(error);
                        });
                    } else {
                        setTimeout(function () {
                            $('body').dialog({
                                type:'primary',
                                showBoxShadow:true,
                                buttons:[{name: '确定',className: 'defalut'}],
                                discription:'是不是手抖了？',
                                animateIn:'fadeInRight-hastrans',
                                animateOut:'fadeOutRight-hastrans'
                            })
                        },500)
                    }
                })
            },
            // 解除冻结用户
            cancelUser(index){
                $('body').dialog({
                    width: 400,
                    type: 'danger',
                    title: '你确定要解除该账户的冻结状态嘛？',
                    discription: '解除冻结的账户可以正常登录？',
                    buttonsSameWidth: true,
                    buttons: [
                        {name: '确定解除', className: 'defalut'},
                        {name: '不要解除', className: 'reverse'}
                    ],
                    animateIn: 'rotateInUpLeft-hastrans',
                    animateOut: 'rotateOutUpLeft-hastrans'
                }, (ret)=> {
                    if (ret.index === 0) {
                        this.vipId = $($(".w-VipManagement-table-users")[index]).find("td").eq(0).html()
                        this.axios.put('http://bt2.hll666.xyz:8083/user/updateAdmin', {
                            "userId":this.vipId,
                            "userStatus":1
                        })
                        .then((response)=> {
                          console.log(response)
                            if(response.data.code==0){
                                setTimeout(function () {
                                    $('body').dialog({
                                        type:'primary',
                                        showBoxShadow:true,
                                        buttons:[{name: '确定',className: 'defalut'}],
                                        discription:'解除冻结成功，此用户可以正常登录',
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
                                        discription:'请求错误或登录超时，解除冻结失败',
                                        animateIn:'fadeInRight-hastrans',
                                        animateOut:'fadeOutRight-hastrans'
                                    })
                                },500)
                            }
                        })
                        .catch((error)=> {
                            console.log(error);
                        });
                    } else {
                        setTimeout(function () {
                            $('body').dialog({
                                type:'primary',
                                showBoxShadow:true,
                                buttons:[{name: '确定',className: 'defalut'}],
                                discription:'是不是手抖了',
                                animateIn:'fadeInRight-hastrans',
                                animateOut:'fadeOutRight-hastrans'
                            })
                        },500)
                    }
                })
            }
        },
        created(){
          //  初始化数据
          this.init()
        },
        mounted(){
            // 表格加载进度条
            var left = 0;
            var TotalWidth = parseInt($(".w-VipManagement-table").css("width"))
            this.myTimer = setInterval(() => {
                left += 25;
                if (left >= TotalWidth) {
                    left = 0;
                }
                $(".w-VipManagement-progress").css("left", left)
            }, 16);
        }
    }
</script>

<style scoped>
    .v-VipManagement-content{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 30px;
    }
    /* 欢迎标题 */
    .w-VipManagement-title {
        width: 15%;
        color: #d1bebe;
        font-size: 30px;
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #d1bebe;
        margin-bottom: 50px;
    }

    /* 表格 */
    .w-VipManagement-table {
        width: 100%;
        background: #323437;
        border-collapse: collapse;
        border-spacing: 10px;
        table-layout: fixed;
        text-align: center;
        color: #fff;
        position: relative;
        overflow: hidden;
    }
    /* 加载进度 */
    .w-VipManagement-progress {
        width: 50%;
        height: 2px;
        top: 90px;
        left: 0;
        background: #2196f3;
        position: absolute;
    }

    /* 每一行的底边框 */
    .w-VipManagement-table tr {
        border-bottom: 1px solid #595959;
    }

    .w-VipManagement-table tr:nth-child(1) {
        width: 100%;
        /* border-top: 1px solid #595959; */
        border-bottom: 2px solid #577a95;
    }

    /* 每一列的高度 */
    .w-VipManagement-table tr td {
        height: 90px;
        margin: 10px auto;
        text-align: center;
        word-wrap: break-word;
    }

    /* 第一行的高度 */
    .w-VipManagement-table tr:nth-child(1) td {
        height: 70px;
    }

    /* 操作按钮 */
    .w-VipManagement-table tr td input {
        width: 70%;
        height: 50px;
        border-radius: 20px;
        cursor: pointer;
        border: 2px solid black;
    }

    /* 冻结按钮 */
    .w-VipManagement-updateBtn {
        background: #00b395;
        font-size: 18px;
    }
    /* 取消冻结按钮 */
    .w-VipManagement-cancelBtn {
        background: #00b395;
        font-size: 18px;
    }
</style>
