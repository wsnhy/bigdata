<template>
    <div class="w-productList-content">
        <h1 class="w-productList-title">商品管理</h1>
        <div class="w-productList-shop">
            <!--新增商品-->
            <div class="w-productList-addShop">
                <input type="button" id="w-productList-addBtn" @click="addShopAlert" value="新增">
                <div class="w-productList-search-box">
                    <span class="w-productList-search-span"></span>
                    <input type="text" placeholder="输入关键字搜索" @focus="SearchFocus" @blur="SearchBlur" v-model="searchData" id="w-productList-search">
                    <img src="../../assets/images/system/SortManagement/search.png" alt="" @click="search">
                </div>
                <!-- 新增商品弹框 -->
                <div class="w-productList-addAlert1">
                    <div class="w-productList-addAlert-top">
                        新增商品
                        <input type="button" class="w-productList-close" @click="closeAddAlert1" value="×" />
                    </div>
                    <div class="w-productList-addAlert-content">
                        <!-- 新增的每一列内容 -->
                        <!-- 商品图片 -->
                        <form id="imgFileForm" enctype="multipart/form-data" method="post">
                            <label>
                                <input style="position:absolute;opacity:0;" type="file" name="file" id="w-productList-file-img"
                                       accept="image/gif,image/jpeg,image/x-png" multiple="multiple" />
                                <img style="width: 160px;height: 90px;margin: 0 auto" src="../../assets/images/system/SortManagement/上传图片.png">
                            </label>
                            <div id="ImgFileBtn" @click="upload">图片上传</div>
                        </form>
                        <!-- 商品名称 -->
                        <div class="w-productList-shop-box">
                            <span class="w-productList-shop-span">请输入商品名称</span>
                            <input type="text" placeholder="请输入商品名称 * " v-model="goodsName" class="w-productList-shop-title">
                        </div>
                        <!-- 商品价格 -->
                        <div class="w-productList-shop-box">
                            <span class="w-productList-shop-span">请输入商品价格</span>
                            <input type="text" placeholder="请输入商品价格 * " v-model="goodsPrice" class="w-productList-shop-title">
                        </div>
                        <!-- 商品数量 -->
                        <div class="w-productList-shop-box">
                            <span class="w-productList-shop-span">请输入商品数量</span>
                            <input type="text" placeholder="请输入商品数量 * " v-model="goodsNum" class="w-productList-shop-title">
                        </div>
                        <!-- 商品种类 -->
                        <div class="w-productList-shop-box">
                            <span class="w-productList-shop-span">请选择商品类型</span>
                            <select value="" v-model="selectKind" @change="getKind1" class="kindSelect kindSelect1">
                                <option class="selectOption" :value="k.goodsType" :key="index" v-for="(k,index) in kind1.list">{{k.goodsType}}</option>
                            </select>
                            <select value="" v-model="selectKind2" @change="getKind2" class="kindSelect kindSelect2" >
                                <option :value="k2.goodsType" :key="index" v-for="(k2,index) in kind2.list">{{k2.goodsType}}</option>
                            </select>
                            <select value="" v-model="selectKind3" @change="getKind3" class="kindSelect kindSelect3">
                                <option :value="k3.goodsType" :key="index" v-for="(k3,index) in kind3.list">{{k3.goodsType}}</option>
                            </select>
                        </div>
                        <!-- 商品重量 -->
                        <div class="w-productList-shop-box">
                            <span class="w-productList-shop-span">请输入商品重量</span>
                            <input type="text" placeholder="请输入商品重量 * " v-model="goodsWeight" class="w-productList-shop-title">
                        </div>
                        <!-- 商品折扣 -->
                        <div class="w-productList-shop-box">
                            <span class="w-productList-shop-span">请输入商品折扣</span>
                            <input type="text" placeholder="请输入商品折扣 * " v-model="goodsDiscount" class="w-productList-shop-title">
                        </div>
                        <input type="button" class="w-productList-shop-next" @click="addAlert1Next" value="下一步">
                    </div>
                </div>
                <div class="w-productList-addAlert2">
                    <div class="w-productList-addAlert-top">
                        新增商品
                        <input type="button" class="w-productList-close" @click="closeAddAlert2" value="×" />
                    </div>
                    <div class="w-productList-addAlert-content">
                        <!-- 新增的每一列内容 -->
                        <!-- 商品详情名称 -->
                        <div class="w-productList-shop-box">
                            <span class="w-productList-shop-span">请输入主体名称</span>
                            <input type="text" placeholder="请输入主体名称 * " v-model="nature1" class="w-productList-shop-title">
                        </div>
                        <!-- 商品详情名称 -->
                        <div class="w-productList-shop-box">
                            <span class="w-productList-shop-span">请输入主体名称</span>
                            <input type="text" placeholder="请输入主体名称 * " v-model="nature2" class="w-productList-shop-title">
                        </div>
                        <!-- 商品详情名称 -->
                        <div class="w-productList-shop-box">
                            <span class="w-productList-shop-span">请输入主体名称</span>
                            <input type="text" placeholder="请输入主体名称 * " v-model="nature3" class="w-productList-shop-title">
                        </div>
                        <input type="button" class="w-productList-shop-per" @click="addAlert2Pre"value="上一步">
                        <input type="button" class="w-productList-shop-next" @click="addAlert2Next" value="下一步">
                    </div>
                </div>
                <div class="w-productList-addAlert3">
                    <div class="w-productList-addAlert-top">
                        新增商品
                        <input type="button" class="w-productList-close" @click="closeAddAlert3" value="×" />
                    </div>
                    <div class="w-productList-addAlert-content">
                        <!-- 新增的每一列内容 -->
                        <!-- 商品详情名称 -->
                        <div class="w-productList-shop-box">
                            <span class="w-productList-shop-span">请输入基本名称（例如：“rom”）</span>
                            <input type="text" placeholder="请输入基本名称（例如：“rom”） * " v-model="map1Title" class="w-productList-shop-title">
                        </div>
                        <!-- 商品详情内容 -->
                        <div class="w-productList-shop-box">
                            <span class="w-productList-shop-span">请输入基本内容（例如：“64GB”）</span>
                            <input type="text" placeholder="请输入基本内容（例如：“64GB”） * " v-model="map1Content" class="w-productList-shop-title">
                        </div>
                        <!-- 商品详情名称 -->
                        <div class="w-productList-shop-box">
                            <span class="w-productList-shop-span">请输入基本名称（例如：“rom”）</span>
                            <input type="text" placeholder="请输入基本名称（例如：“rom”） * " v-model="map2Title" class="w-productList-shop-title">
                        </div>
                        <!-- 商品详情内容 -->
                        <div class="w-productList-shop-box">
                            <span class="w-productList-shop-span">请输入基本内容（例如：“64GB”）</span>
                            <input type="text" placeholder="请输入基本内容（例如：“64GB”） * " v-model="map2Content" class="w-productList-shop-title">
                        </div>
                        <!-- 商品详情名称 -->
                        <div class="w-productList-shop-box">
                            <span class="w-productList-shop-span">请输入基本名称（例如：“rom”）</span>
                            <input type="text" placeholder="请输入基本名称（例如：“rom”） * " v-model="map3Title" class="w-productList-shop-title">
                        </div>
                        <!-- 商品详情内容 -->
                        <div class="w-productList-shop-box">
                            <span class="w-productList-shop-span">请输入基本内容（例如：“64GB”）</span>
                            <input type="text" placeholder="请输入基本内容（例如：“64GB”） * " v-model="map3Content" class="w-productList-shop-title">
                        </div>
                        <input type="button" class="w-productList-shop-per" @click="addAlert3Pre" value="上一步">
                        <input type="button" class="w-productList-shop-append" @click="addAlert3Submit" value="确认添加">
                    </div>
                </div>
            </div>
            <!--商品列表-->
            <table class="w-productList-table">
                <!-- 标题 -->
                <!-- 加载进度 -->
                <div class="w-productList-progress"></div>
                <tr>
                    <td>商品id</td>
                    <td>商品展示（图片）</td>
                    <td>商品名称</td>
                    <td>商品价格</td>
                    <td>商品销量</td>
                    <td>评论量</td>
                    <td>商品更新</td>
                    <td>商品下架</td>
                </tr>
                <!-- 商品 -->
                <tr class="w-productList-table-shops" :key="index" v-for="(a,index) in shopListData.list">
                    <td>{{a.goodsId}}</td>
                    <td><img :src="a.img" alt=""></td>
                    <td>{{a.goodsName}}</td>
                    <td>¥ {{a.goodsPrice}}</td>
                    <td>{{a.goodsSold}}</td>
                    <td>{{a.goodsComments}}</td>
                    <td><input type="button" @click="updateShop(index)" value="编辑" class="w-productList-updateBtn"></td>
                    <td><input type="button" value="下架" @click="delShop(index)" class="w-productList-deleteBtn dw-btn btn-danger has-hover"></td>
                </tr>
            </table>
            <div class="w-table-pages">
                <!--<h1 class="PreviousPage">上一页</h1>-->
                <p :key="index" v-for="(b,index) in pages" @click="Gopage(index)">{{b}}</p>
                <!--<h1 class="NextPage">下一页</h1>-->
            </div>
            <!-- 编辑商品信息弹框 -->
            <div class="w-productList-compileAlert-box" :key="index" v-for="(a,index) in shopListData.list">
                <div class="w-productList-compileAlert1">
                    <div class="w-productList-compileAlert-top">
                        更新商品信息{{index}}
                        <input type="button" class="w-productList-compile-close" @click="closeAlert1(index)" value="×" />
                    </div>
                    <div class="w-productList-compileAlert-content">
                        <!-- 新增的每一列内容 -->
                        <!-- 展示图片 -->
                        <form class="updateForm" enctype="multipart/form-data" method="post">
                            <label>
                                <input style="position:absolute;opacity:0;" type="file" name="file" class="w-productList-file-img"
                                       accept="image/gif,image/jpeg,image/x-png" multiple="multiple" />
                                <img style="width: 160px;height: 90px;margin: 0 auto" :src="a.img">
                            </label>
                            <div class="updateImgBtn" @click="UpdateUpload(index)">图片上传</div>
                        </form>
                        <!-- 商品id -->
                        <div class="w-productList-shop-compile-box">
                            <span class="w-productList-shop-compile-span">商品id　(不可修改)</span>
                            <input type="text" placeholder="商品id (非填项)" disabled :value="a.goodsId" class="w-productList-shop-compile-title">
                        </div>
                        <!-- 商品名称 -->
                        <div class="w-productList-shop-compile-box">
                            <span class="w-productList-shop-compile-span"></span>
                            <input type="text" placeholder="请输入商品名称 * " :value="a.goodsName" class="w-productList-shop-compile-title">
                        </div>
                        <!-- 商品价格 -->
                        <div class="w-productList-shop-compile-box">
                            <span class="w-productList-shop-compile-span"></span>
                            <input type="text" placeholder="请输入商品价格 * " :value="a.goodsPrice" class="w-productList-shop-compile-title">
                        </div>
                        <!-- 商品数量 -->
                        <div class="w-productList-shop-compile-box">
                            <span class="w-productList-shop-compile-span"></span>
                            <input type="text" placeholder="请输入商品数量 * " :value="a.goodsNum" class="w-productList-shop-compile-title">
                        </div>
                        <!-- 商品重量 -->
                        <div class="w-productList-shop-compile-box">
                            <span class="w-productList-shop-compile-span"></span>
                            <input type="text" placeholder="请输入商品重量 * " :value="a.goodsWeight" class="w-productList-shop-compile-title">
                        </div>
                        <input type="button" class="w-productList-shop-compile-update" @click="AlertSubmit(index)" value="确认修改">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery"
    import jqueryForm from  "../../assets/js/jquery.form"
    import qs from 'qs'
    import dialog from "../../assets/js/dialog"
    export default {
        name: "FunctionsProductList",
        data() {
            return {
                shopListData:{},
                pages:[],
                pageNum:0,
                searchData:"",
                myTimer:"",
                Idparams:[],
                ProductId:0,
                kind1:"",
                kind2:"",
                kind3:"",
                goodsName:"",
                goodsPrice:"",
                goodsNum:"",
                selectKind:"",
                selectKind2:"",
                selectKind3:"",
                selectKindId:"",
                goodsWeight:"",
                goodsDiscount:"",
                img:[],
                imgs:{},
                natures:[],
                nature1:"",
                natures1:{},
                map1:{},
                nature2:"",
                natures2:{},
                map2:{},
                nature3:"",
                natures3:{},
                map3:{},
                map1Title:"",
                map1Content:"",
                map2Title:"",
                map2Content:"",
                map3Title:"",
                map3Content:""
            }
        },
        methods:{
            // 初始化数据
            init(){
                // 获取商品列表
                this.axios.get('http://bt2.hll666.xyz:8083/solr/adminQuery', {
                    params: {
                        "page": 1,
                        "rows": 5
                    }
                })
                .then((response)=> {
                    this.shopListData = response.data.data
                    // 根据总数计算页数
                    this.pages = []
                    let page = Math.ceil((response.data.data.total)/5)
                    for(let i=1;i<=page;i++){
                        this.pages.push(i)
                    }
                    // 数据请求成功后关闭加载动画
                    clearInterval(this.myTimer);
                    $(".w-productList-progress").css("display","none")
                })
                .catch((error)=> {
                    console.log(error);
                });
                // 全局更新
                this.axios.get('http://bt2.hll666.xyz:8083/solr/add')
                .then((response)=> {
                   // console.log(response)
                })
                .catch((error)=> {
                    console.log(error);
                });
                // 查询商品种类
                this.axios.get("http://bt2.hll666.xyz:8083/Kind")
                .then((response)=>{
                    this.kind1 = response.data.data
                })
                .catch((error)=>{
                    console.log(error)
                })
            },
            // 点击对应页码，显示对应数据
            Gopage(pageNum){
                pageNum = pageNum+1;
                // 获取下一页的商品列表
                this.axios.get('http://bt2.hll666.xyz:8083/solr/adminQuery', {
                    params: {
                      "query": this.searchData,
                      "page": pageNum,
                      "rows": 5
                    }
                })
                .then((response) => {
                    this.shopListData = response.data.data
                })
                .catch((error) => {
                    console.log(error);
                });
                $(".w-table-pages p").css("color","#d1cdca")
                $($(".w-table-pages p")[pageNum-1]).css("color","#f60")
            },
            // 站内搜索
            search(){
                this.axios.get('http://bt2.hll666.xyz:8083/solr/adminQuery', {
                    params: {
                        "query": this.searchData,
                        "page":1,
                        "rows" : 5
                    }
                })
                .then((response)=> {
                    this.shopListData = response.data.data
                    // 页数
                    this.pages = []
                    let page = Math.ceil((response.data.data.total)/5)
                    for(let i=1;i<=page;i++){
                      this.pages.push(i)
                    }
                })
                .catch((error)=> {
                    console.log(error);
                });
            },
            // 商品下架
            delShop(index){
                $('body').dialog({
                    width: 400,
                    type: 'danger',
                    title: '你真的考虑清楚要删除我了嘛？',
                    discription: '你真的舍得嘛？',
                    buttonsSameWidth: true,
                    buttons: [
                        {name: '残忍删除', className: 'defalut'},
                        {name: '不舍留下', className: 'reverse'}
                    ],
                    animateIn: 'rotateInUpLeft-hastrans',
                    animateOut: 'rotateOutUpLeft-hastrans'
                }, (ret)=> {
                    if (ret.index === 0) {
                        // 获取当前点击的删除按钮的父元素下的第一个td的值（id值）
                        this.ProductId = parseInt($($(".w-productList-table-shops")[index]).find("td").eq(0).html())
                        this.axios.delete('http://bt2.hll666.xyz:8083/Goods/delete?goodsId=' + this.ProductId)
                        .then((response)=> {
                            if(response.data.code==0){
                                setTimeout(function () {
                                    $('body').dialog({
                                        type:'primary',
                                        showBoxShadow:true,
                                        buttons:[{name: '确定',className: 'defalut'}],
                                        discription:'下架成功',
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
                                        discription:'请求错误或登录超时，下架失败',
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
                                discription:'想啥呢？还想删我？',
                                animateIn:'fadeInRight-hastrans',
                                animateOut:'fadeOutRight-hastrans'
                            })
                        },500)
                    }
                })
            },
            // 搜索 聚焦
            SearchFocus(){
                $(".w-productList-search-box").children(".w-productList-search-span").html("输入关键字搜索");
                $("#w-productList-search").attr("placeholder", "")
                $("#w-productList-search").css({
                    "border-bottom": "2px solid #2196f3",
                    "color": "#2196f3"
                })
                $(".w-productList-search-box").children("img").attr("src", "../../../static/images/system/SortManagement/search2.png");
            },
            // 搜索 失焦
            SearchBlur(){
                var value = $(".w-productList-search-box").children(".w-productList-search-span").html();
                $(".w-productList-search-box").children(".w-productList-search-span").html("");
                $("#w-productList-search").attr("placeholder", value)
                $("#w-productList-search").css({
                    "border-bottom": "2px solid #c7c7c7",
                    "color": "#c7c7c7"
                })
                $(".w-productList-search-box").children("img").attr("src", "../../../static/images/system/SortManagement/search.png");
            },
            // 点击 新增按钮 弹出新增商品弹框1
            addShopAlert(){
                $(".w-productList-addAlert1").animate({
                    "z-index": 999,
                    "opacity": 1
                }, "slow", "swing")
            },
            // 新增商品弹框1 点击下一步 弹出新增商品弹框2
            addAlert1Next(){
                $(".w-productList-addAlert1").animate({
                    "z-index": 1,
                    "opacity": 0
                }, "slow", "swing")
                $(".w-productList-addAlert2").animate({
                    "z-index": 999,
                    "opacity": 1
                }, "slow", "swing")
            },
            // 关闭新增商品弹框1
            closeAddAlert1(){
                $(".w-productList-addAlert1").animate({
                    "z-index": 1,
                    "opacity": 0
                }, "slow", "swing")
            },
            // 新增商品弹框2 点击上一步 弹出新增商品弹框1
            addAlert2Pre(){
                $(".w-productList-addAlert2").animate({
                    "z-index": 1,
                    "opacity": 0
                }, "slow", "swing")
                $(".w-productList-addAlert1").animate({
                    "z-index": 999,
                    "opacity": 1
                }, "slow", "swing")
            },
            // 新增商品弹框2 点击下一步 弹出新增商品弹框3
            addAlert2Next(){
                $(".w-productList-addAlert2").animate({
                    "z-index": 1,
                    "opacity": 0
                }, "slow", "swing")
                $(".w-productList-addAlert3").animate({
                    "z-index": 999,
                    "opacity": 1
                }, "slow", "swing")
            },
            // 关闭新增商品弹框2
            closeAddAlert2(){
                $(".w-productList-addAlert2").animate({
                    "z-index": 1,
                    "opacity": 0
                }, "slow", "swing")
            },
            // 新增商品弹框3 点击上一步 弹出新增商品弹框2
            addAlert3Pre(){
                $(".w-productList-addAlert3").animate({
                    "z-index": 1,
                    "opacity": 0
                }, "slow", "swing")
                $(".w-productList-addAlert2").animate({
                    "z-index": 999,
                    "opacity": 1
                }, "slow", "swing")
            },
            // 关闭新增商品弹框3
            closeAddAlert3(){
                $(".w-productList-addAlert3").animate({
                    "z-index": 1,
                    "opacity": 0
                }, "slow", "swing")
            },
            // 获取种类1
            getKind1(){
                $(".kindSelect2").val("")
                $(".kindSelect3").val("")
                let select = this.selectKind
                let data = this.kind1.list
                for(let i=0;i< data.length;i++){
                    if(data[i].goodsType == select){
                        this.selectKindId = data[i].id
                    }
                }
                this.axios.get("http://bt2.hll666.xyz:8083/Kind",{
                    params:{
                        "kindId":this.selectKindId
                    }
                }).then((response)=>{
                    this.kind2 = response.data.data
                }).catch((error)=>{
                    console.log(error)
                })
            },
            // 获取种类2
            getKind2(){
                $(".kindSelect3").val("")
                let select = this.selectKind2
                let data = this.kind2.list
                for(let i=0;i< data.length;i++){
                    if(data[i].goodsType == select){
                        this.selectKindId = data[i].id
                    }
                }
                this.axios.get("http://bt2.hll666.xyz:8083/Kind",{
                    params:{
                        "kindId":this.selectKindId
                    }
                }).then((response)=>{
                    this.kind3 = response.data.data
                }).catch((error)=>{
                    console.log(error)
                })
            },
            // 获取种类3
            getKind3(){
                let select = this.selectKind3
                let data = this.kind3.list
                for(let i=0;i< data.length;i++){
                    if(data[i].goodsType == select){
                        this.selectKindId = data[i].id
                    }
                }
            },
            // 新增商品弹框3 点击确认添加
            addAlert3Submit(){
                let selectData = this.kind1.list
                if($(".kindSelect3").val()){
                    for(let i=0;i< selectData.length;i++){
                        if(selectData[i].goodsType == $(".kindSelect3").val()){
                            this.selectKindId = selectData[i].id
                        }
                    }
                }else if($(".kindSelect2").val()){
                    for(let i=0;i< selectData.length;i++){
                        if(selectData[i].goodsType == $(".kindSelect2").val()){
                            this.selectKindId = selectData[i].id
                        }
                    }
                }else if($(".kindSelect1").val()){
                    for(let i=0;i< selectData.length;i++){
                        if(selectData[i].goodsType == $(".kindSelect1").val()){
                            this.selectKindId = selectData[i].id
                        }
                    }
                }else{
                    setTimeout(function () {
                        $('body').dialog({
                            type:'primary',
                            showBoxShadow:true,
                            buttons:[{name: '确定',className: 'defalut'}],
                            discription:'您还没有选择类型呢，如果没有您喜欢的类型，请先新增类型',
                            animateIn:'fadeInRight-hastrans',
                            animateOut:'fadeOutRight-hastrans'
                        })
                    },500)
                }
                this.map1[this.map1Title] = this.map1Content
                this.map2[this.map2Title] = this.map2Content
                this.map3[this.map3Title] = this.map3Content
                this.axios.post('http://bt2.hll666.xyz:8083/addGoods/addGoodsing', {
                    "goodsName": this.goodsName,
                    "goodsPrice": this.goodsPrice,
                    "goodsNum": this.goodsNum,
                    "goodsKind": this.selectKindId,
                    "goodsWeight": this.goodsWeight,
                    "goodsDiscount": this.goodsDiscount,
                    "img": this.img,
                    "natures": [
                        {
                            "nature": this.nature1,
                            "naturev": [
                                {
                                    "map":this.map1
                                }
                            ]
                        },
                        {
                            "nature": this.nature2,
                            "naturev": [
                                {
                                    "map":this.map2
                                }
                            ]
                        },
                        {
                            "nature": this.nature3,
                            "naturev": [
                                {
                                    "map":this.map3
                                }
                            ]
                        }
                    ]
                })
                .then((response) => {
                    if(response.data.code == 0){
                        setTimeout(function () {
                            $('body').dialog({
                                type:'primary',
                                showBoxShadow:true,
                                buttons:[{name: '确定',className: 'defalut'}],
                                discription:'新增商品成功',
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
                                discription:'请求错误或登录超时，新增商品失败',
                                animateIn:'fadeInRight-hastrans',
                                animateOut:'fadeOutRight-hastrans'
                            })
                        },500)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            // 新增商品中的图片异步上传
            upload(){
                let that = this;
                if($('#w-productList-file-img').val() === ""){
                    alert('你没有选中文件!');
                    return ;
                }
                var options = {
                    type: "post",
                    url : "http://bt2.hll666.xyz:8083/img/uploadImage",
                    dataType: "text",
                    success : function(data) {
                        //返回data为json字符串，转化为json对象
                        var obj = eval('('+ data +')');
                        //判断状态
                        if (obj.code === 0) {//状态为成功
                            //obj.data为返回图片外链
                            // $("#ff").append('<img width="400" src="'+obj.data+'"/>');
                            console.log(obj.data)
                            that.imgs.imgUrl = obj.data
                            that.img.push(that.imgs)
                            console.log(that.img)
                        }else{//上传失败 obj.msg为失败信息
                            alert(obj.msg);
                        }
                    }
                };
                //jquery-form用插件异步提交
                $('#imgFileForm').ajaxSubmit(options);
            },
            // 点击 编辑按钮 弹出对应的编辑商品弹框1
            updateShop(index){
                $($(".w-productList-compileAlert1")[index]).animate({
                    "z-index": 999,
                    "opacity": 1
                }, "slow", "swing")
            },
            // 编辑商品弹框1 点击关闭
            closeAlert1(index){
                $($(".w-productList-compileAlert1")[index]).animate({
                    "z-index": 1,
                    "opacity": 0
                }, "slow", "swing")
            },
            // 点击确认修改
            AlertSubmit(index){
                let goodsId = $($(".w-productList-compileAlert-content")[index]).find(".w-productList-shop-compile-title").eq(0).val()
                let goodsName = $($(".w-productList-compileAlert-content")[index]).find(".w-productList-shop-compile-title").eq(1).val()
                let goodsPrice = $($(".w-productList-compileAlert-content")[index]).find(".w-productList-shop-compile-title").eq(2).val()
                let goodsNum = $($(".w-productList-compileAlert-content")[index]).find(".w-productList-shop-compile-title").eq(3).val()
                let goodsWeight = $($(".w-productList-compileAlert-content")[index]).find(".w-productList-shop-compile-title").eq(4).val()
                this.axios.put('http://bt2.hll666.xyz:8083/Goods/update', {
                    "goodsId": goodsId,
                    "goodsName": goodsName,
                    "goodsPrice": goodsPrice,
                    "goodsNum": goodsNum,
                    "goodsKind": 1,
                    "goodsWeight": goodsWeight
                })
                .then((response)=> {
                    if(response.data.code==0){
                        setTimeout(()=> {
                            $('body').dialog({
                                type:'primary',
                                showBoxShadow:true,
                                buttons:[{name: '确定',className: 'defalut'}],
                                discription:'商品信息修改成功',
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
                                discription:'请求错误或登录超时，商品信息修改失败',
                                animateIn:'fadeInRight-hastrans',
                                animateOut:'fadeOutRight-hastrans'
                            })
                        },1000)
                    }
                })
                .catch((error)=> {
                    console.log(error);
                });
            },
            // 更新商品中的图片异步上传
            UpdateUpload(index){
                if($($('.w-productList-file-img')[index]).val() === ""){
                    alert('你没有选中文件!');
                    return ;
                }
                var options = {
                    type: "post",
                    url : "http://bt2.hll666.xyz:8083/img/uploadImage",
                    dataType: "text",
                    success : function(data) {
                        //返回data为json字符串，转化为json对象
                        var obj = eval('('+ data +')');
                        //判断状态
                        if (obj.code === 0) {//状态为成功
                            //obj.data为返回图片外链
                            // $("#ff").append('<img width="400" src="'+obj.data+'"/>');
                            console.log(obj.data)
                        }else{//上传失败 obj.msg为失败信息
                            alert(obj.msg);
                        }
                    }
                };
                //jquery-form用插件异步提交
                $($('.updateForm')[index]).ajaxSubmit(options);
            }
        },
        created(){
            //  初始化数据
            this.init()
        },
        mounted() {
            // 表格加载进度条
            var left = 0;
            var TotalWidth = parseInt($(".w-productList-shop").css("width"))
            var width = parseInt($(".w-productList-progress").css("width"))
            this.myTimer = setInterval(() => {
                left += 25;
                if (left >= TotalWidth) {
                    left = 0;
                }
                $(".w-productList-progress").css("left", left)
            }, 16);
        },
        updated(){
            // 测试新增商品弹框的上传文件按钮
            $(".w-productList-addAlert1 #w-productList-file-img").change(function() {
                var reader = new FileReader();
                // 获取file文本框的files值
                reader.readAsDataURL($(this)[0].files[0]); //发起异步请求
                console.log($(this))
                // 当异步请求加载时，调用以下函数
                reader.onload = function () {
                    //读取完成后，数据保存在对象的result属性中（baes64编码）
                    // 把路径的编码值赋值给显示图片
                    $(".w-productList-addAlert-content img").attr("src", this.result)
                }
            })

            // 测试新增商品弹框的聚焦和失焦
            // 聚焦
            // $(".w-productList-shop-title").each((i)=> {
            //     $($(".w-productList-shop-title")[i]).focus(()=> {
            //         var value = $($(".w-productList-shop-title")[i]).attr("placeholder");
            //         console.log(value)
            //         console.log($($(".w-productList-shop-title")[i]).parents(".w-productList-shop-box").children(".w-productList-shop-span"))
            //         $($(".w-productList-shop-title")[i]).parents(".w-productList-shop-box").children(".w-productList-shop-span").html(value);
            //         $($(".w-productList-shop-title")[i]).attr("placeholder", "")
            //         $($(".w-productList-shop-title")[i]).css({
            //             "border-bottom": "2px solid #f44336",
            //             "color": "#f44336"
            //         })
            //     })
            // })
            // 失焦
            // $(".w-productList-shop-title").each((i)=> {
            //     $($(".w-productList-shop-title")[i]).blur(()=> {
            //         var value = $($(".w-productList-shop-title")[i]).parents(".w-productList-shop-box").children(".w-productList-shop-span").html();
            //         $($(".w-productList-shop-title")[i]).parents(".w-productList-shop-box").children(".w-productList-shop-span").html("");
            //         $($(".w-productList-shop-title")[i]).attr("placeholder", value)
            //         $($(".w-productList-shop-title")[i]).css({
            //             "border-bottom": "2px solid #f44336",
            //             "color": "#f44336"
            //         })
            //     })
            // })

            // 测试编辑商品信息的上传文件按钮
            $(".w-productList-file-img").each(function (i) {
                let that = $(this)
                $(this).change(function() {
                    var reader = new FileReader();
                    // 获取file文本框的files值
                    reader.readAsDataURL($(this)[0].files[0]); //发起异步请求
                    // 当异步请求加载时，调用以下函数
                    reader.onload = function () {
                        //读取完成后，数据保存在对象的result属性中（baes64编码）
                        // console.log(this.result)
                        // 把路径的编码值赋值给显示图片
                        // 获取当前点击的file框所在的父元素中的img标签
                        $($(".w-productList-compileAlert1")[i]).find(".w-productList-compileAlert-content .updateForm img").attr("src", this.result)
                    }
                })
            })

            // 测试编辑商品信息弹框的聚焦和失焦
            // 聚焦
            $(".w-productList-shop-compile-title").each((i)=>{
                $($(".w-productList-shop-compile-title")[i]).focus(()=> {
                    var value = $($(".w-productList-shop-compile-title")[i]).attr("placeholder");
                    $($(".w-productList-shop-compile-title")[i]).parents(".w-productList-shop-compile-box").children(".w-productList-shop-compile-span").html(value);
                    $($(".w-productList-shop-compile-title")[i]).attr("placeholder", "")
                    $($(".w-productList-shop-compile-title")[i]).css({
                        "border-bottom": "2px solid #f44336",
                        "color": "#f44336"
                    })
                })
            })
            // 失焦
            $(".w-productList-shop-compile-title").each((i)=>{
                $($(".w-productList-shop-compile-title")[i]).blur(()=> {
                    var value = $($(".w-productList-shop-compile-title")[i]).parents(".w-productList-shop-compile-box").children(".w-productList-shop-compile-span").html();
                    $($(".w-productList-shop-compile-title")[i]).parents(".w-productList-shop-compile-box").children(".w-productList-shop-compile-span").html("");
                    $($(".w-productList-shop-compile-title")[i]).attr("placeholder", value)
                    $($(".w-productList-shop-compile-title")[i]).css({
                        "border-bottom": "2px solid #f44336",
                        "color": "#f44336"
                    })
                })
            })
        }
    }
</script>

<style scoped>
    .w-productList-content{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 30px;
    }
    /* 欢迎标题 */
    .w-productList-title {
        width: 12%;
        color: #d1bebe;
        font-size: 30px;
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #d1bebe;
        margin-bottom: 50px;
    }
    /* 商品 */
    .w-productList-shop {
        width: 100%;
        background: #323437;
        position: relative;
        overflow: hidden;
    }
    /* 添加商品 */
    .w-productList-addShop{
        height: 80px;
        background: #323437;
        border-bottom: 1px solid #5a6065;
    }
    /* 关键字搜索-盒子 */
    .w-productList-search-box{
        float: right;
        width: 650px;
        height: 50px;
        margin: 15px 20px 0 0;
        position: relative;
    }
    /* 关键字搜索-失焦显示span */
    .w-productList-search-span{
        display: block;
        width: 100%;
        height: 20px;
        color:#2196f3;
        font-size: 14px;
        box-sizing: border-box;
        padding-left: 15px;
    }
    /* 关键字搜索 */
    #w-productList-search{
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
    .w-productList-search-box img{
        position: absolute;
        width: 25px;
        height: 25px;
        right: 10px;
        bottom: 5px;
        cursor: pointer;
    }
    /* 搜索框默认值 */
    #w-productList-search::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: #c7c7c7;
    }
    /* 添加商品按钮 */
    #w-productList-addBtn {
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
    /* 添加商品弹框 */
    .w-productList-addAlert1{
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
    .w-productList-addAlert2{
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
    .w-productList-addAlert3{
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

    /* 弹出框头部 */
    .w-productList-addAlert-top{
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
    /* 弹出框关闭按钮 */
    .w-productList-close{
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
    /* 弹出框内容 */
    .w-productList-addAlert-content{
        width: 100%;
        flex: 1;
        box-sizing: border-box;
        padding-top: 20px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    /* 确认添加按钮 */
    .w-productList-shop-append{
        display: block;
        width: 30%;
        height: 50px;
        font-size: 20px;
        border: none;
        border-radius: 10px;
        background: rgba(29, 211, 211, 1);
        margin: 30px 50px;
        cursor: pointer;
        float: left;
    }
    .w-productList-shop-next{
        display: block;
        width: 30%;
        height: 50px;
        font-size: 20px;
        border: none;
        border-radius: 10px;
        background: rgba(29, 211, 211, 1);
        margin: 30px 50px;
        cursor: pointer;
        float: left;
    }
    .w-productList-addAlert1 .w-productList-shop-next{
        margin: 30px 200px;
    }
    .w-productList-shop-per{
        display: block;
        width: 30%;
        height: 50px;
        font-size: 20px;
        border: none;
        border-radius: 10px;
        background: rgba(29, 211, 211, 1);
        margin: 30px 50px;
        cursor: pointer;
        float: left;
    }

    /* 滚动条效果 */
    /* 设置滚动条的样式 */
    .w-productList-addAlert-content::-webkit-scrollbar {
        width: 5px;
    }

    /* 滚动槽 */
    .w-productList-addAlert-content::-webkit-scrollbar-track {
        /* -webkit-box-shadow: inset 0 0 6px  rgba(40, 42, 44, 1);
        border-radius: 10px; */
    }

    /* 滚动条滑块 */
    .w-productList-addAlert-content::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(29, 211, 211, 1);
        /* -webkit-box-shadow: inset 0 0 6px rgba(29, 211, 211, 1); */
    }

    .w-productList-addAlert-content::-webkit-scrollbar-thumb:window-inactive {
        background: rgba(29, 211, 211, 1);
    }

    /* 弹出框-游戏盒子 */
    .w-productList-shop-box {
        width: 85%;
        height: 50px;
        margin: 0 auto;
        position: relative;
        margin-bottom: 20px;
    }
    .w-productList-shop-box:nth-of-type(1){
        margin-top: 30px;
    }
    /* 弹出框-游戏-失焦显示span */
    .w-productList-shop-span {
        display: block;
        width: 100%;
        height: 20px;
        color: #f44336;
        font-size: 14px;
        box-sizing: border-box;
        padding-left: 15px;
    }

    /* 弹出框-游戏 */
    .w-productList-shop-title {
        width: 100%;
        height: 30px;
        background: #2b2c2f;
        border: none;
        border-bottom: 2px solid #f44336;
        color: #f44336;
        font-size: 18px;
        text-indent: 15px;
    }

    /* 搜索图标 */
    .w-productList-search-box img {
        position: absolute;
        width: 25px;
        height: 25px;
        right: 10px;
        bottom: 5px;
        cursor: pointer;
    }

    /* 搜索框默认值 */
    .w-productList-shop-title::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: #f44336;
    }

    /* 搜索框 */

    /* 加载进度 */
    .w-productList-progress {
        width: 50%;
        height: 2px;
        top: 151px;
        left: 0;
        background: #2196f3;
        position: absolute;
    }
    /* 表格 */
    .w-productList-table{
        width: 100%;
        border-collapse: collapse;
        border-spacing: 10px;
        table-layout: fixed;
        text-align: center;
        color: #fff;
    }
    /* 每一行的底边框 */
    .w-productList-table tr{
        border-bottom: 1px solid #595959;
    }
    .w-productList-table tr:nth-of-type(1){
        border-bottom: 2px solid #595959;
    }
    /* 第一行的高度 */
    .w-productList-table tr:nth-of-type(1) td{
        height: 70px;
    }
    .w-productList-table tr td{
        text-align: center;
    }
    /* 每一列的图片的大小 */
    .w-productList-table tr td img{
        width: 70%;
        height: 100px;
        margin: 10px auto;
    }
    /* 操作按钮 */
    .w-productList-table tr td input{
        width: 70%;
        height: 50px;
        border-radius: 20px;
        cursor: pointer;
        border: 2px solid black;
    }
    /* 更新信息按钮 */
    .w-productList-updateBtn {
        background: #97cca4;
        font-size: 18px;
    }
    /* 删除按钮 */
    .w-productList-deleteBtn {
        background: #ea3232;
        font-size: 18px;
    }

    /* 编辑商品信息弹框 */
    .w-productList-compileAlert1 {
        width: 30%;
        height: 600px;
        position: fixed;
        left: 40%;
        top: 22%;
        background: #2b2c2f;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        opacity: 0;
    }

    /* 弹出框头部 */
    .w-productList-compileAlert-top {
        width: 100%;
        height: 50px;
        background: rgba(29, 211, 211, 1);
        line-height: 45px;
        color: #fff;
        font-size: 20px;
        box-sizing: border-box;
        padding-left: 15px;
        position: relative;
        overflow: hidden;
    }

    /* 弹出框关闭按钮 */
    .w-productList-compile-close {
        height: 50px;
        width: 50px;
        background: rgba(29, 211, 211, 1);
        border: none;
        color: #fff;
        font-size: 40px;
        position: absolute;
        right: 2%;
        cursor: pointer;
    }

    /* 弹出框内容 */
    .w-productList-compileAlert-content {
        width: 100%;
        flex: 1;
        box-sizing: border-box;
        padding-top: 20px;
        overflow-x: hidden;
        overflow-y: auto;
    }

    /* 确认修改按钮 */
    .w-productList-shop-compile-update {
        display: block;
        width: 30%;
        height: 50px;
        font-size: 20px;
        border: none;
        border-radius: 10px;
        background: rgba(29, 211, 211, 1);
        margin: 30px 200px;
        cursor: pointer;
        float: left;
    }

    /* 滚动条效果 */
    /* 设置滚动条的样式 */
    .w-productList-compileAlert-content::-webkit-scrollbar {
        width: 5px;
    }

    /* 滚动槽 */
    .w-productList-compileAlert-content::-webkit-scrollbar-track {
        /* -webkit-box-shadow: inset 0 0 6px  rgba(40, 42, 44, 1);
        border-radius: 10px; */
    }

    /* 滚动条滑块 */
    .w-productList-compileAlert-content::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(29, 211, 211, 1);
        /* -webkit-box-shadow: inset 0 0 6px rgba(29, 211, 211, 1); */
    }

    .w-productList-compileAlert-content::-webkit-scrollbar-thumb:window-inactive {
        background: rgba(29, 211, 211, 1);
    }

    /* 弹出框-游戏盒子 */
    .w-productList-shop-compile-box {
        width: 85%;
        height: 50px;
        margin: 0 auto;
        position: relative;
        margin-bottom: 20px;
    }

    .w-productList-shop-compile-box:nth-of-type(1) {
        margin-top: 30px;
    }

    /* 弹出框-游戏-失焦显示span */
    .w-productList-shop-compile-span {
        display: block;
        width: 100%;
        height: 20px;
        color: #f44336;
        font-size: 14px;
        box-sizing: border-box;
        padding-left: 15px;
    }
    /* 搜索框默认值 */
    .w-productList-shop-compile-title::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: #f44336;
    }
    /* 弹出框-游戏 */
    .w-productList-shop-compile-title {
        width: 100%;
        height: 30px;
        background: #2b2c2f;
        border: none;
        border-bottom: 2px solid #f44336;
        color: #f44336;
        font-size: 18px;
        text-indent: 15px;
    }

    /* 表格页数 */
    .w-table-pages{
        width: 100%;
        height: 50px;
        margin-top: 20px;
        box-sizing: border-box;
        padding-left: 75%;
    }
    .w-table-pages h1{
        float: left;
        font-size: 20px;
        margin-right: 30px;
        color: #d1cdca;
        cursor: pointer;
    }
    .w-table-pages p{
        float: left;
        font-size: 20px;
        margin-right: 50px;
        color: #d1cdca;
        cursor: pointer;
    }
    .w-table-pages p:first-of-type{
        color: #f60;
    }

    /* 图片异步上传按钮 */
    #ImgFileBtn{
        position: relative;
        left: 37%;
        margin-top: 30px;
        font-size: 18px;
        color: #fff;
        padding: 20px;
        width: 100px;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        text-align: center;
        cursor: pointer;
        text-transform: uppercase;
        background-color: #2ecc71;
        border-radius: 30px;
    }
    #ImgFileBtn:after {
        content: "";
        background: #fff;
        position: absolute;
        width: 100px;
        height: 100px;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        opacity: 0;
        margin: auto;
        border-radius: 50%;
        transform: scale(1);
        transition: all 0.75s ease-in-out;
    }

    #ImgFileBtn:active:after {
        transform: scale(0);
        opacity: 1;
        transition: 0s;
    }

    /* 更新信息中的图片异步上传按钮 */
    .updateImgBtn{
        position: relative;
        left: 37%;
        margin-top: 30px;
        font-size: 18px;
        color: #fff;
        padding: 20px;
        width: 100px;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        text-align: center;
        cursor: pointer;
        text-transform: uppercase;
        background-color: #2ecc71;
        border-radius: 30px;
    }
    .updateImgBtn:after {
        content: "";
        background: #fff;
        position: absolute;
        width: 100px;
        height: 100px;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        opacity: 0;
        margin: auto;
        border-radius: 50%;
        transform: scale(1);
        transition: all 0.75s ease-in-out;
    }

    .updateImgBtn:active:after {
        transform: scale(0);
        opacity: 1;
        transition: 0s;
    }

    /* 种类选择 */
    .kindSelect{
        width: 100px;
        height: 30px;
        margin-right: 40px;
        margin-left: 10px;
        background: #323437;
        border: 2px solid #f44336;
        outline: none;
        font-size: 18px;
        color: #d1cdca;
    }

</style>
