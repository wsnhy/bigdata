<template>
    <div class="w-OrderManagement-content">
        <div class="w-OrderManagement-box">
            <h1 class="w-OrderManagement-title">全部订单</h1>
            <table class="w-OrderManagement-table">
                <!-- 标题 -->
                <!-- 加载进度 -->
                <div class="w-OrderManagement-progress"></div>
                <tr>
                    <td>订单号</td>
                    <td>客户名称</td>
                    <td>联系方式</td>
                    <td>收货地址</td>
                    <td>下单时间</td>
                    <td>订单总价</td>
                    <td>处理状态</td>
                    <td>操作</td>
                </tr>
                <!-- 订单 -->
                <tr class="w-OrderManagement-table-order" :key="index" v-for="(a,index) in orderData.list">
                    <td>{{a.id}}</td>
                    <td>{{a.orderName}}</td>
                    <td>{{a.recivePhone}}</td>
                    <td>{{a.sendAddressProvince}} {{a.sendAddressCity}} {{a.sendAddressArea}} {{a.sendAddressStreet}}</td>
                    <td>{{a.orderTime}}</td>
                    <td>{{a.orderTotalPrice}}</td>
                    <td>
                        <img :src="ImgStatus(a.orderStatus)" />
                    </td>
                    <td><input type="button" value="修改订单" @click="amendOrderBtn(index)" class="w-OrderManagement-updateBtn"></td>
                </tr>
            </table>
            <!-- 修改订单弹框 -->
            <div class="w-OrderManagement-Alert" :key="index" v-for="(b,index) in orderData.list">
                <div class="w-OrderManagement-compileAlert-top">
                    更改订单 {{index}} 的状态
                    <input type="button" class="w-OrderManagement-compile-close" @click="closeAlert(index)" value="×" />
                </div>
                <div class="w-OrderManagement-compileAlert-content">
                    <!-- 商品id -->
                    <div class="w-OrderManagement-compile-box">
                        <span class="w-OrderManagement-span">订单id　(不可修改)</span>
                        <input type="text" :placeholder="b.id" :value="b.id" disabled class="w-OrderManagement-compile-title orderId">
                    </div>
                    <!-- 商品名称 -->
                    <div class="w-OrderManagement-compile-box">
                        <span class="w-OrderManagement-span"></span>
                        <input type="text"  placeholder="请输入订单的更改状态 * " class="w-OrderManagement-compile-title orderStatus">
                    </div>
                    <!-- 商品状态 -->
                    <div class="w-OrderManagement-compile-box">
                      <span class="w-OrderManagement-span">1-未发货　2-已发货　3-已收货　4-未付款　5-已退货</span>
                    </div>
                    <input type="button" class="w-OrderManagement-compile-amend" @click="amendOrder(index)" value="确认修改">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import qs from 'qs'
    import dialog from "../../assets/js/dialog"
    export default {
        name: "FunctionsOrderManagement",
        data(){
            return {
                orderData : {},
                status:"0",
                myTimer:""
            }
        },
        methods:{
            // 初始化数据
            init(){
                this.axios.get('http://bt2.hll666.xyz:8083/order/allUser')
                .then((response)=> {
                    if(response.data.code==0){
                        this.orderData = response.data.data
                        // 接收到数据后停止加载动画
                        clearInterval(this.myTimer);
                        $(".w-OrderManagement-progress").css("display","none")
                    }else{
                        $('body').dialog({
                            type:'primary',
                            showBoxShadow:true,
                            buttons:[{name: '确定',className: 'defalut'}],
                            discription:'请求错误或登录超时，获取订单信息失败',
                            animateIn:'fadeInRight-hastrans',
                            animateOut:'fadeOutRight-hastrans'
                        })
                    }
                })
                .catch((error)=> {
                    console.log(error);
                });
            },
            // 根据订单的状态码 显示对应状态的图片
            ImgStatus(index){
                switch(index){
                    case 1: return require("@/assets//images/system/orderManagement/1.png");break;
                    case 2: return require("@/assets//images/system/orderManagement/2.png");break;
                    case 3: return require("@/assets//images/system/orderManagement/3.png");break;
                    case 4: return require("@/assets//images/system/orderManagement/3.png");break;
                    case 5: return require("@/assets//images/system/orderManagement/3.png");break;
                    default:return require("@/assets//images/system/orderManagement/3.png")
                }
            },
            // 修改订单按钮弹框效果
            amendOrderBtn(index){
                $($(".w-OrderManagement-Alert")[index]).animate({
                    "z-index":999,
                    "opacity":1
                },"slowing","linear")
            },
            // 订单弹框的关闭按钮
            closeAlert(index){
                $($(".w-OrderManagement-compile-close")[index]).parents(".w-OrderManagement-Alert").animate({
                    "z-index":1,
                    "opacity":0
                },"slowing","linear")
            },
            // 确认修改订单
            amendOrder(index){
                // 获取文本框的id和状态值
                var id = $($(".w-OrderManagement-Alert")[index]).find(".orderId").val()
                var status = $($(".w-OrderManagement-Alert")[index]).find(".orderStatus").val()
                // 修改订单状态
                this.axios.get('http://bt2.hll666.xyz:8083/order/updateOrderStatusByAdmin', {
                    params: {
                        "id": id,
                        "orderStatus": status
                    }
                })
                .then((response)=> {
                    if(response.data.code==0){
                        setTimeout(function () {
                            $('body').dialog({
                                type:'primary',
                                showBoxShadow:true,
                                buttons:[{name: '确定',className: 'defalut'}],
                                discription:'订单状态修改成功',
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
                                discription:'请求错误或登录超时，订单状态修改失败',
                                animateIn:'fadeInRight-hastrans',
                                animateOut:'fadeOutRight-hastrans'
                            })
                        },1000)
                    }
                })
                .catch((error)=> {
                    console.log(error);
                });
            }
        },
        created(){
          // 初始化数据
          this.init()
        },
        mounted(){
            // 表格加载进度条
            var left = 0;
            var TotalWidth = parseInt($(".w-OrderManagement-table").css("width"))
            this.myTimer = setInterval(() => {
                left += 25;
                if (left >= TotalWidth) {
                    left = 0;
                }
                $(".w-OrderManagement-progress").css("left", left)
            }, 16);
        },
        updated(){
            // 测试修改订单状态弹框的聚焦和失焦
            // 聚焦
            $(".w-OrderManagement-compile-title").each((i)=> {
                $($(".w-OrderManagement-compile-title")[i]).focus(()=> {
                    var value = $($(".w-OrderManagement-compile-title")[i]).attr("placeholder");
                    $($(".w-OrderManagement-compile-title")[i]).parents(".w-OrderManagement-compile-box").children(".w-OrderManagement-span").html(value);
                    $($(".w-OrderManagement-compile-title")[i]).attr("placeholder", "")
                    $($(".w-OrderManagement-compile-title")[i]).css({
                        "border-bottom": "2px solid #f44336",
                        "color": "#f44336"
                    })
                })
            })
            // 失焦
            $(".w-OrderManagement-compile-title").each((i)=> {
                $($(".w-OrderManagement-compile-title")[i]).blur(()=> {
                    var value = $($(".w-OrderManagement-compile-title")[i]).parents(".w-OrderManagement-compile-box").children(".w-OrderManagement-span").html();
                    $($(".w-OrderManagement-compile-title")[i]).parents(".w-OrderManagement-compile-box").children(".w-OrderManagement-span").html("");
                    $($(".w-OrderManagement-compile-title")[i]).attr("placeholder", value)
                    $($(".w-OrderManagement-compile-title")[i]).css({
                        "border-bottom": "2px solid #f44336",
                        "color": "#f44336"
                    })
                })
            })
        }
    }
</script>

<style scoped>
    .w-OrderManagement-content{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 30px;
    }

    .w-OrderManagement-box{
        width: 100%;
    }

    /* 欢迎标题 */
    .w-OrderManagement-title {
        width: 12%;
        color: #d1bebe;
        font-size: 30px;
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #d1bebe;
        margin-bottom: 50px;
    }

    /* 表格 */
    .w-OrderManagement-table {
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
    .w-OrderManagement-progress {
        width: 50%;
        height: 2px;
        top: 90px;
        left: 0;
        background: #2196f3;
        position: absolute;
    }

    /* 每一行的底边框 */
    .w-OrderManagement-table tr {
        border-bottom: 1px solid #595959;
    }

    .w-OrderManagement-table tr:nth-child(1) {
        width: 100%;
        /* border-top: 1px solid #595959; */
        border-bottom: 2px solid #577a95;
    }

    /* 每一列的高度 */
    .w-OrderManagement-table tr td {
        height: 90px;
        margin: 10px auto;
        text-align: center;
    }
    .w-OrderManagement-table tr td img{
        width: 50px;
        height: 50px;
        margin: 0 auto;
    }

    /* 第一行的高度 */
    .w-OrderManagement-table tr:nth-child(1) td {
        height: 70px;
    }

    /* 操作按钮 */
    .w-OrderManagement-table tr td input {
        width: 70%;
        height: 50px;
        border-radius: 20px;
        cursor: pointer;
        border: 2px solid black;
    }

    /* 修改订单按钮 */
    .w-OrderManagement-updateBtn {
        background: #00b395;
        font-size: 18px;
    }


    /* 修改管理员弹框 */
    .w-OrderManagement-Alert{
        width: 25%;
        height: 500px;
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
    .w-OrderManagement-compileAlert-top{
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
    .w-OrderManagement-compile-close{
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
    .w-OrderManagement-compileAlert-content{
        width: 100%;
        flex: 1;
        box-sizing: border-box;
        padding-top: 20px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    /* 修改管理员确认修改按钮 */
    .w-OrderManagement-compile-amend{
        display: block;
        width: 50%;
        height: 50px;
        font-size: 20px;
        border: none;
        border-radius: 10px;
        background: rgba(29, 211, 211, 1);
        margin: 50px 120px;
        cursor: pointer;
        float: left;
    }
    /* 弹出框-修改管理员信息盒子 */
    .w-OrderManagement-compile-box {
        width: 85%;
        height: 50px;
        margin: 0 auto;
        position: relative;
        margin-bottom: 20px;
    }
    .w-OrderManagement-compile-box:nth-of-type(1){
        margin-top: 30px;
    }
    /* 弹出框-修改管理员-失焦显示span */
    .w-OrderManagement-span {
        display: block;
        width: 100%;
        height: 20px;
        color: #f44336;
        font-size: 14px;
        box-sizing: border-box;
        padding-left: 15px;
    }

    /* 弹出框-管理员 */
    .w-OrderManagement-compile-title {
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
    .w-OrderManagement-compile-title::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: #f44336;
    }
</style>
