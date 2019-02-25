<template>
  <!-- main-content -->
  <div class="w-SortManagement-content">
    <!-- 云标签 -->
    <div class="w-SortManagement-wrapper">
      <p><img src="../../../static/images/system/login/logo.png" alt="" style="display: inline-block;width: 200px;"></p>
      <div class="w-SortManagement-tagcloud w-SortManagement-fl">
        <a href="javascript:;">电子产品</a>
        <a href="javascript:;">服饰休闲</a>
        <a href="javascript:;">钟表珠宝</a>
        <a href="javascript:;">家用电器</a>
        <a href="javascript:;">食品生鲜</a>
        <a href="javascript:;">酒水饮料</a>
        <a href="javascript:;">母婴童装</a>
        <a href="javascript:;">玩具乐器</a>
        <a href="javascript:;">农资园艺</a>
        <a href="javascript:;">美妆护肤</a>
      </div>
      <div class="w-SortManagement-tagcloud w-SortManagement-fr">
        <a href="javascript:;">医学药品</a>
        <a href="javascript:;">运动户外</a>
        <a href="javascript:;">汽车生活</a>
        <a href="javascript:;">家居厨具</a>
        <a href="javascript:;">礼品鲜花</a>
        <a href="javascript:;">宠物生活</a>
        <a href="javascript:;">图书文娱</a>
        <a href="javascript:;">艺术邮币</a>
        <a href="javascript:;">箱包手袋</a>
        <a href="javascript:;">零食吃货</a>
      </div>
    </div>
    <div class="w-SortManagement-type">
      <div class="w-buttonBox">
        <input type="button" class="w-btns" :value="t" @click="btnContent(index)" :key="index" v-for="(t,index) in btn">
      </div>
      <div class="w-type-box">
        <div class="w-type-content">
          <div class="w-look-type w-look-type1">
            <span class="w-look-type1-span" @click="lookType1">请选择</span>
            <ul class="w-look-type1-ul">
              <li :key="index" v-for="(a,index) in type1Data.list" @click="lookChooseType1(index)">{{a.goodsType}}</li>
            </ul>
            <div class="add-type-box">
              <input type="text" class="add-type add-type1" placeholder="请输入新增类型名称" v-model="add1">
              <div class="add-type-btn add-type-btn1" @click="addType1">确认添加</div>
            </div>
            <div class="update-type-box">
              <input type="text" class="update-type update-type1" placeholder="请输入修改类型名称" v-model="update1">
              <div class="update-type-btn update-type-btn1" @click="updateType1">确认修改</div>
            </div>
            <div class="delete-type-box">
              <div class="delete-type-btn delete-type-btn1" @click="deleteType1">确认删除</div>
            </div>
          </div>
          <div class="w-look-type w-look-type2">
            <span class="w-look-type2-span" @click="lookType2">请选择</span>
            <ul class="w-look-type2-ul">
              <li :key="index" v-for="(b,index) in type2Data.list" @click="lookChooseType2(index)">{{b.goodsType}}</li>
            </ul>
            <div class="add-type-box">
              <input type="text" class="add-type add-type2" placeholder="请输入新增类型名称" v-model="add2">
              <div class="add-type-btn add-type-btn2" @click="addType2">确认添加</div>
            </div>
            <div class="update-type-box">
              <input type="text" class="update-type update-type2" placeholder="请输入修改类型名称" v-model="update2">
              <div class="update-type-btn update-type-btn2" @click="updateType2">确认修改</div>
            </div>
            <div class="delete-type-box">
              <div class="delete-type-btn delete-type-btn2" @click="deleteType2">确认删除</div>
            </div>
          </div>
          <div class="w-look-type w-look-type3">
            <span class="w-look-type3-span" @click="lookType3">请选择</span>
            <ul class="w-look-type3-ul">
              <li :key="index" v-for="(c,index) in type3Data.list" @click="lookChooseType3(index)">{{c.goodsType}}</li>
            </ul>
            <div class="add-type-box">
              <input type="text" class="add-type add-type3" placeholder="请输入新增类型名称" v-model="add3">
              <div class="add-type-btn add-type-btn3" @click="addType3">确认添加</div>
            </div>
            <div class="update-type-box">
              <input type="text" class="update-type update-type3" placeholder="请输入修改类型名称" v-model="update3">
              <div class="update-type-btn update-type-btn3" @click="updateType3">确认修改</div>
            </div>
            <div class="delete-type-box">
              <div class="delete-type-btn delete-type-btn3" @click="deleteType3">确认删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from "jquery"
  import qs from "qs"
  import tagclloud from "../../assets/js/tagcloud"
  import dialog from "../../assets/js/dialog"

  export default {
    name: "FunctionsClassify",
    data() {
      return {
        btn: ["查询类型", "新增类型", "修改类型", "删除类型"],
        type1Data: {},
        type2Data: {},
        type3Data: {},
        lookType1Select: "",
        lookType2Select: "",
        selectId: 0,
        add1: "",
        add2: "",
        add3: "",
        selectFId: "",
        update1: "",
        update2: "",
        update3: "",
      }
    },
    methods: {
      //  获取一级种类，初始化数据
      init() {
        this.axios.get("http://bt2.hll666.xyz:8083/Kind", {
          params: {
            "kindId": this.selectId
          }
        }).then((response) => {
          this.type1Data = response.data.data
        }).catch((error) => {
          console.log(error)
        })
      },
      // 点击操作按钮显示对应类型的内容
      btnContent(index) {
        $(".w-btns").css("background", "#04acb7")
        $($(".w-btns")[index]).css("background", "#6d41dd")
        if (index == 0) {
          // 初始化
          $(".w-type-content").css("display", "block")
          $(".w-look-type1").css("display", "block")
          $(".w-look-type1-span").html("请选择")
          $(".w-look-type1-ul").css("display", "none")
          $(".w-look-type2").css("display", "none")
          $(".w-look-type2-span").html("请选择")
          $(".w-look-type2-ul").css("display", "none")
          $(".w-look-type3").css("display", "none")
          $(".w-look-type3-span").html("请选择")
          $(".w-look-type3-ul").css("display", "none")
          $(".add-type-box").css("display", "none")
          $(".update-type-box").css("display", "none")
          $(".delete-type-box").css("display", "none")
        } else if (index == 1) {
          // 初始化
          $(".w-type-content").css("display", "block")
          $(".add-type-box").css("display", "block")
          $(".w-look-type1").css("display", "block")
          $(".w-look-type1-span").html("请选择")
          $(".w-look-type1-ul").css("display", "none")
          $(".w-look-type2").css("display", "none")
          $(".w-look-type2-span").html("请选择")
          $(".w-look-type2-ul").css("display", "none")
          $(".w-look-type3").css("display", "none")
          $(".w-look-type3-span").html("请选择")
          $(".w-look-type3-ul").css("display", "none")
          $(".update-type-box").css("display", "none")
          $(".delete-type-box").css("display", "none")
        } else if (index == 2) {
          // 初始化
          $(".w-type-content").css("display", "block")
          $(".update-type-box").css("display", "block")
          $(".w-look-type1").css("display", "block")
          $(".w-look-type1-span").html("请选择")
          $(".w-look-type1-ul").css("display", "none")
          $(".w-look-type2").css("display", "none")
          $(".w-look-type2-span").html("请选择")
          $(".w-look-type2-ul").css("display", "none")
          $(".w-look-type3").css("display", "none")
          $(".w-look-type3-span").html("请选择")
          $(".w-look-type3-ul").css("display", "none")
          $(".add-type-box").css("display", "none")
          $(".delete-type-box").css("display", "none")
        } else if (index == 3) {
          // 初始化
          $(".w-type-content").css("display", "block")
          $(".delete-type-box").css("display", "block")
          $(".w-look-type1").css("display", "block")
          $(".w-look-type1-span").html("请选择")
          $(".w-look-type1-ul").css("display", "none")
          $(".w-look-type2").css("display", "none")
          $(".w-look-type2-span").html("请选择")
          $(".w-look-type2-ul").css("display", "none")
          $(".w-look-type3").css("display", "none")
          $(".w-look-type3-span").html("请选择")
          $(".w-look-type3-ul").css("display", "none")
          $(".add-type-box").css("display", "none")
          $(".update-type-box").css("display", "none")
        }
      },
      // 查询种类1
      lookType1() {
        $(".w-look-type1-ul").css("display", "block")
        // 恢复初始状态
        $(".w-look-type2").css("display", "none")
        $(".w-look-type2-span").html("请选择")
        $(".w-look-type2-ul").css("display", "none")
        $(".w-look-type3").css("display", "none")
        $(".w-look-type3-span").html("请选择")
        $(".w-look-type3-ul").css("display", "none")
      },
      // 选择种类1
      lookChooseType1(index) {
        // 获取点击的li的值赋给span以显示
        this.lookType1Select = $($(".w-look-type1-ul").find("li")[index]).html();
        $(".w-look-type1-span").html(this.lookType1Select)
        $(".w-look-type1-ul").css("display", "none")
        // 显示二级种类的框
        $(".w-look-type2").css("display", "block")
        // 获取选择的种类的id以查询它的子种类
        this.selectId = this.type1Data.list[index].id
        this.selectFId = this.type1Data.list[index].fId
        this.axios.get("http://bt2.hll666.xyz:8083/Kind", {
          params: {
            "kindId": this.selectId
          }
        }).then((response) => {
          this.type2Data = response.data.data
        }).catch((error) => {
          console.log(error)
        })
      },
      // 查询种类2
      lookType2() {
        $(".w-look-type2-ul").css("display", "block")
        // 恢复初始状态
        $(".w-look-type3").css("display", "none")
        $(".w-look-type3-span").html("请选择")
        $(".w-look-type3-ul").css("display", "none")
      },
      // 选择种类2
      lookChooseType2(index) {
        // 获取点击的li的值赋给span以显示
        this.lookType2Select = $($(".w-look-type2-ul").find("li")[index]).html();
        $(".w-look-type2-span").html(this.lookType2Select)
        $(".w-look-type2-ul").css("display", "none")
        // 显示三级种类的框
        $(".w-look-type3").css("display", "block")
        // 获取选择的种类的id以查询它的子种类
        this.selectId = this.type2Data.list[index].id
        this.selectFId = this.type2Data.list[index].fId
        this.axios.get("http://bt2.hll666.xyz:8083/Kind", {
          params: {
            "kindId": this.selectId
          }
        }).then((response) => {
          this.type3Data = response.data.data
        }).catch((error) => {
          console.log(error)
        })
      },
      // 查询种类3
      lookType3() {
        $(".w-look-type3-ul").css("display", "block")
      },
      // 选择种类3
      lookChooseType3(index) {
        this.lookType3Select = $($(".w-look-type3-ul").find("li")[index]).html();
        $(".w-look-type3-span").html(this.lookType3Select)
        $(".w-look-type3-ul").css("display", "none")
        // 获取当前选择的商品的id及子类id
        this.selectId = this.type3Data.list[index].id
        this.selectFId = this.type3Data.list[index].fId
      },
      // 添加类型1
      addType1() {
        if ($(".add-type1").val() == "") {
          setTimeout(function () {
            $('body').dialog({
              type: 'primary',
              showBoxShadow: true,
              buttons: [{name: '确定', className: 'defalut'}],
              discription: '请输入要添加的类型',
              animateIn: 'fadeInRight-hastrans',
              animateOut: 'fadeOutRight-hastrans'
            })
          }, 500)
        } else {
          this.axios.post("http://bt2.hll666.xyz:8083/Kind", {
            "goodsType": this.add1,
            "fId": 0
          })
            .then((response) => {
              if (response.data.code == 0) {
                setTimeout(function () {
                  $('body').dialog({
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{name: '确定', className: 'defalut'}],
                    discription: '添加类型成功',
                    animateIn: 'fadeInRight-hastrans',
                    animateOut: 'fadeOutRight-hastrans'
                  })
                }, 500)
              } else {
                setTimeout(function () {
                  $('body').dialog({
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{name: '确定', className: 'defalut'}],
                    discription: '请求错误或登录超时，添加类型失败',
                    animateIn: 'fadeInRight-hastrans',
                    animateOut: 'fadeOutRight-hastrans'
                  })
                }, 500)
              }
            }).catch((error) => {
            console.log(error)
          })
        }
      },
      // 添加类型2
      addType2() {
        if ($(".add-type2").val() == "") {
          setTimeout(function () {
            $('body').dialog({
              type: 'primary',
              showBoxShadow: true,
              buttons: [{name: '确定', className: 'defalut'}],
              discription: '请输入要添加的类型',
              animateIn: 'fadeInRight-hastrans',
              animateOut: 'fadeOutRight-hastrans'
            })
          }, 500)
        } else {
          this.axios.post("http://bt2.hll666.xyz:8083/Kind", {
            "goodsType": this.add2,
            "fId": this.selectId
          })
            .then((response) => {
              if (response.data.code == 0) {
                setTimeout(function () {
                  $('body').dialog({
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{name: '确定', className: 'defalut'}],
                    discription: '添加类型成功',
                    animateIn: 'fadeInRight-hastrans',
                    animateOut: 'fadeOutRight-hastrans'
                  })
                }, 500)
              } else {
                setTimeout(function () {
                  $('body').dialog({
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{name: '确定', className: 'defalut'}],
                    discription: '请求错误或登录超时，添加类型失败',
                    animateIn: 'fadeInRight-hastrans',
                    animateOut: 'fadeOutRight-hastrans'
                  })
                }, 500)
              }
            }).catch((error) => {
            console.log(error)
          })
        }
      },
      // 添加类型3
      addType3() {
        if ($(".add-type3").val() == "") {
          setTimeout(function () {
            $('body').dialog({
              type: 'primary',
              showBoxShadow: true,
              buttons: [{name: '确定', className: 'defalut'}],
              discription: '请输入要添加的类型',
              animateIn: 'fadeInRight-hastrans',
              animateOut: 'fadeOutRight-hastrans'
            })
          }, 500)
        } else {
          console.log(this.add3)
          this.axios.post("http://bt2.hll666.xyz:8083/Kind", {
            "goodsType": this.add3,
            "fId": this.selectId
          })
            .then((response) => {
              if (response.data.code == 0) {
                setTimeout(function () {
                  $('body').dialog({
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{name: '确定', className: 'defalut'}],
                    discription: '添加类型成功',
                    animateIn: 'fadeInRight-hastrans',
                    animateOut: 'fadeOutRight-hastrans'
                  })
                }, 500)
              } else {
                setTimeout(function () {
                  $('body').dialog({
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{name: '确定', className: 'defalut'}],
                    discription: '请求错误或登录超时，添加类型失败',
                    animateIn: 'fadeInRight-hastrans',
                    animateOut: 'fadeOutRight-hastrans'
                  })
                }, 500)
              }
            }).catch((error) => {
            console.log(error)
          })
        }
      },
      // 修改类型1
      updateType1() {
        if ($(".w-look-type1-span").html() == "请选择") {
          setTimeout(function () {
            $('body').dialog({
              type: 'primary',
              showBoxShadow: true,
              buttons: [{name: '确定', className: 'defalut'}],
              discription: '请选择要修改的类型',
              animateIn: 'fadeInRight-hastrans',
              animateOut: 'fadeOutRight-hastrans'
            })
          }, 500)
        } else if ($(".update-type1").val() == "") {
          setTimeout(function () {
            $('body').dialog({
              type: 'primary',
              showBoxShadow: true,
              buttons: [{name: '确定', className: 'defalut'}],
              discription: '请输入要修改的值',
              animateIn: 'fadeInRight-hastrans',
              animateOut: 'fadeOutRight-hastrans'
            })
          }, 500)
        } else {
          console.log(this.update1)
          this.axios.put("http://bt2.hll666.xyz:8083/Kind", {
            "id": this.selectId,
            "goodsType": this.update1,
            "fId": this.selectFId
          })
            .then((response) => {
              console.log(response)
              if (response.data.code == 0) {
                setTimeout(function () {
                  $('body').dialog({
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{name: '确定', className: 'defalut'}],
                    discription: '修改类型成功',
                    animateIn: 'fadeInRight-hastrans',
                    animateOut: 'fadeOutRight-hastrans'
                  })
                }, 500)
              } else {
                setTimeout(function () {
                  $('body').dialog({
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{name: '确定', className: 'defalut'}],
                    discription: '请求错误或登录超时，修改类型失败',
                    animateIn: 'fadeInRight-hastrans',
                    animateOut: 'fadeOutRight-hastrans'
                  })
                }, 500)
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      },
      // 修改类型2
      updateType2() {
        if ($(".w-look-type2-span").html() == "请选择") {
          setTimeout(function () {
            $('body').dialog({
              type: 'primary',
              showBoxShadow: true,
              buttons: [{name: '确定', className: 'defalut'}],
              discription: '请选择要修改的类型',
              animateIn: 'fadeInRight-hastrans',
              animateOut: 'fadeOutRight-hastrans'
            })
          }, 500)
        } else if ($(".update-type2").val() == "") {
          setTimeout(function () {
            $('body').dialog({
              type: 'primary',
              showBoxShadow: true,
              buttons: [{name: '确定', className: 'defalut'}],
              discription: '请输入要修改的值',
              animateIn: 'fadeInRight-hastrans',
              animateOut: 'fadeOutRight-hastrans'
            })
          }, 500)
        } else {
          console.log(this.update2)
          this.axios.put("http://bt2.hll666.xyz:8083/Kind", {
            "id": this.selectId,
            "goodsType": this.update2,
            "fId": this.selectFId
          })
            .then((response) => {
              console.log(response)
              if (response.data.code == 0) {
                setTimeout(function () {
                  $('body').dialog({
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{name: '确定', className: 'defalut'}],
                    discription: '修改类型成功',
                    animateIn: 'fadeInRight-hastrans',
                    animateOut: 'fadeOutRight-hastrans'
                  })
                }, 500)
              } else {
                setTimeout(function () {
                  $('body').dialog({
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{name: '确定', className: 'defalut'}],
                    discription: '请求错误或登录超时，修改类型失败',
                    animateIn: 'fadeInRight-hastrans',
                    animateOut: 'fadeOutRight-hastrans'
                  })
                }, 500)
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      },
      // 修改类型3
      updateType3() {
        if ($(".w-look-type3-span").html() == "请选择") {
          setTimeout(function () {
            $('body').dialog({
              type: 'primary',
              showBoxShadow: true,
              buttons: [{name: '确定', className: 'defalut'}],
              discription: '请选择要修改的类型',
              animateIn: 'fadeInRight-hastrans',
              animateOut: 'fadeOutRight-hastrans'
            })
          }, 500)
        } else if ($(".update-type3").val() == "") {
          setTimeout(function () {
            $('body').dialog({
              type: 'primary',
              showBoxShadow: true,
              buttons: [{name: '确定', className: 'defalut'}],
              discription: '请输入要修改的值',
              animateIn: 'fadeInRight-hastrans',
              animateOut: 'fadeOutRight-hastrans'
            })
          }, 500)
        } else {
          console.log(this.update3)
          this.axios.put("http://bt2.hll666.xyz:8083/Kind", {
            "id": this.selectId,
            "goodsType": this.update3,
            "fId": this.selectFId
          })
            .then((response) => {
              console.log(response)
              if (response.data.code == 0) {
                setTimeout(function () {
                  $('body').dialog({
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{name: '确定', className: 'defalut'}],
                    discription: '修改类型成功',
                    animateIn: 'fadeInRight-hastrans',
                    animateOut: 'fadeOutRight-hastrans'
                  })
                }, 500)
              } else {
                setTimeout(function () {
                  $('body').dialog({
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{name: '确定', className: 'defalut'}],
                    discription: '请求错误或登录超时，修改类型失败',
                    animateIn: 'fadeInRight-hastrans',
                    animateOut: 'fadeOutRight-hastrans'
                  })
                }, 500)
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      },
      // 删除类型1
      deleteType1() {
        if ($(".w-look-type1-span").html() == "请选择") {
          setTimeout(function () {
            $('body').dialog({
              type: 'primary',
              showBoxShadow: true,
              buttons: [{name: '确定', className: 'defalut'}],
              discription: '请选择要删除的类型',
              animateIn: 'fadeInRight-hastrans',
              animateOut: 'fadeOutRight-hastrans'
            })
          }, 500)
        } else {
          $('body').dialog({
            width: 400,
            type: 'danger',
            title: '你真的考虑清楚要删除该类型嘛？',
            discription: '这样也会删除该类型的子类型？',
            buttonsSameWidth: true,
            buttons: [
              {name: '残忍删除', className: 'defalut'},
              {name: '不舍留下', className: 'reverse'}
            ],
            animateIn: 'rotateInUpLeft-hastrans',
            animateOut: 'rotateOutUpLeft-hastrans'
          }, (ret) => {
            if (ret.index === 0) {
              console.log(this.selectId)
              this.axios.delete('http://bt2.hll666.xyz:8083/Kind?kindId=' + this.selectId)
                .then((response) => {
                  console.log(response);
                  if (response.data.code == 0) {
                    setTimeout(function () {
                      $('body').dialog({
                        type: 'primary',
                        showBoxShadow: true,
                        buttons: [{name: '确定', className: 'defalut'}],
                        discription: '删除类型成功',
                        animateIn: 'fadeInRight-hastrans',
                        animateOut: 'fadeOutRight-hastrans'
                      })
                    }, 500)
                  } else {
                    setTimeout(function () {
                      $('body').dialog({
                        type: 'primary',
                        showBoxShadow: true,
                        buttons: [{name: '确定', className: 'defalut'}],
                        discription: '请求错误或登录超时，删除类型失败',
                        animateIn: 'fadeInRight-hastrans',
                        animateOut: 'fadeOutRight-hastrans'
                      })
                    }, 500)
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              setTimeout(function () {
                $('body').dialog({
                  type: 'primary',
                  showBoxShadow: true,
                  buttons: [{name: '确定', className: 'defalut'}],
                  discription: '看来还是不舍得删我嘛。',
                  animateIn: 'fadeInRight-hastrans',
                  animateOut: 'fadeOutRight-hastrans'
                })
              }, 500)
            }
          })
        }
      },
      // 删除类型2
      deleteType2() {
        if ($(".w-look-type2-span").html() == "请选择") {
          setTimeout(function () {
            $('body').dialog({
              type: 'primary',
              showBoxShadow: true,
              buttons: [{name: '确定', className: 'defalut'}],
              discription: '请选择要删除的类型',
              animateIn: 'fadeInRight-hastrans',
              animateOut: 'fadeOutRight-hastrans'
            })
          }, 500)
        } else {
          $('body').dialog({
            width: 400,
            type: 'danger',
            title: '你真的考虑清楚要删除该类型嘛？',
            discription: '这样也会删除该类型的子类型？',
            buttonsSameWidth: true,
            buttons: [
              {name: '残忍删除', className: 'defalut'},
              {name: '不舍留下', className: 'reverse'}
            ],
            animateIn: 'rotateInUpLeft-hastrans',
            animateOut: 'rotateOutUpLeft-hastrans'
          }, (ret) => {
            if (ret.index === 0) {
              console.log(this.selectId)
              this.axios.delete('http://bt2.hll666.xyz:8083/Kind?kindId=' + this.selectId)
                .then((response) => {
                  console.log(response);
                  if (response.data.code == 0) {
                    setTimeout(function () {
                      $('body').dialog({
                        type: 'primary',
                        showBoxShadow: true,
                        buttons: [{name: '确定', className: 'defalut'}],
                        discription: '删除类型成功',
                        animateIn: 'fadeInRight-hastrans',
                        animateOut: 'fadeOutRight-hastrans'
                      })
                    }, 500)
                  } else {
                    setTimeout(function () {
                      $('body').dialog({
                        type: 'primary',
                        showBoxShadow: true,
                        buttons: [{name: '确定', className: 'defalut'}],
                        discription: '请求错误或登录超时，删除类型失败',
                        animateIn: 'fadeInRight-hastrans',
                        animateOut: 'fadeOutRight-hastrans'
                      })
                    }, 500)
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              setTimeout(function () {
                $('body').dialog({
                  type: 'primary',
                  showBoxShadow: true,
                  buttons: [{name: '确定', className: 'defalut'}],
                  discription: '看来还是不舍得删我嘛。',
                  animateIn: 'fadeInRight-hastrans',
                  animateOut: 'fadeOutRight-hastrans'
                })
              }, 500)
            }
          })
        }
      },
      // 删除类型3
      deleteType3() {
        if ($(".w-look-type3-span").html() == "请选择") {
          setTimeout(function () {
            $('body').dialog({
              type: 'primary',
              showBoxShadow: true,
              buttons: [{name: '确定', className: 'defalut'}],
              discription: '请选择要删除的类型',
              animateIn: 'fadeInRight-hastrans',
              animateOut: 'fadeOutRight-hastrans'
            })
          }, 500)
        } else {
          $('body').dialog({
            width: 400,
            type: 'danger',
            title: '你真的考虑清楚要删除该类型嘛？',
            discription: '这样也会删除该类型的子类型？',
            buttonsSameWidth: true,
            buttons: [
              {name: '残忍删除', className: 'defalut'},
              {name: '不舍留下', className: 'reverse'}
            ],
            animateIn: 'rotateInUpLeft-hastrans',
            animateOut: 'rotateOutUpLeft-hastrans'
          }, (ret) => {
            if (ret.index === 0) {
              console.log(this.selectId)
              this.axios.delete('http://bt2.hll666.xyz:8083/Kind?kindId=' + this.selectId)
                .then((response) => {
                  console.log(response);
                  if (response.data.code == 0) {
                    setTimeout(function () {
                      $('body').dialog({
                        type: 'primary',
                        showBoxShadow: true,
                        buttons: [{name: '确定', className: 'defalut'}],
                        discription: '删除类型成功',
                        animateIn: 'fadeInRight-hastrans',
                        animateOut: 'fadeOutRight-hastrans'
                      })
                    }, 500)
                  } else {
                    setTimeout(function () {
                      $('body').dialog({
                        type: 'primary',
                        showBoxShadow: true,
                        buttons: [{name: '确定', className: 'defalut'}],
                        discription: '请求错误或登录超时，删除类型失败',
                        animateIn: 'fadeInRight-hastrans',
                        animateOut: 'fadeOutRight-hastrans'
                      })
                    }, 500)
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              setTimeout(function () {
                $('body').dialog({
                  type: 'primary',
                  showBoxShadow: true,
                  buttons: [{name: '确定', className: 'defalut'}],
                  discription: '看来还是不舍得删我嘛。',
                  animateIn: 'fadeInRight-hastrans',
                  animateOut: 'fadeOutRight-hastrans'
                })
              }, 500)
            }
          })
        }
      }
    },
    created() {
      //  初始化数据
      this.init()
    },
    mounted() {
      // 3D标签云
      tagcloud({
        selector: ".w-SortManagement-tagcloud", //元素选择器
        fontsize: 16,       //基本字体大小, 单位px
        radius: 100,         //滚动半径, 单位px
        mspeed: "normal",   //滚动最大速度, 取值: slow, normal(默认), fast
        ispeed: "normal",   //滚动初速度, 取值: slow, normal(默认), fast
        direction: 135,     //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
        keep: false          //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
      });
    }
  }
</script>

<style scoped>
  .w-SortManagement-content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 30px;
  }

  /* 分类管理 */
  .w-SortManagement-fl {
    float: left;
  }

  .w-SortManagement-fr {
    float: right;
  }

  .w-SortManagement-wrapper {
    width: 1200px;
    height: 300px;
    margin: 0 auto;
  }

  .w-SortManagement-wrapper p {
    padding-top: 120px;
    color: #999;
    font-size: 50px;
    text-align: center;
  }

  .w-SortManagement-tagcloud {
    position: relative;
    margin-top: -150px;
  }

  .w-SortManagement-tagcloud a {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    padding: 11px 30px;
    color: #333;
    font-size: 16px;
    border: 1px solid #e6e7e8;
    border-radius: 18px;
    background-color: #f2f4f8;
    text-decoration: none;
    white-space: nowrap;
    -o-box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, .34);
    -ms-box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, .34);
    -moz-box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, .34);
    -webkit-box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, .34);
    box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, .34);
    -ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=4,Direction=135, Color='#000000')";
    /*兼容ie7/8*/
    filter: progid:DXImageTransform.Microsoft.Shadow(color='#969696', Direction=125, Strength=9);
    /*strength是阴影大小，direction是阴影方位，单位为度，可以为负数，color是阴影颜色 （尽量使用数字）使用IE滤镜实现盒子阴影的盒子必须是行元素或以行元素显示（block或inline-block;）*/
  }

  .w-SortManagement-tagcloud a:hover {
    color: #3385cf;
  }

  /* 管理类型 */
  .w-SortManagement-type {
    width: 100%;
    height: 1000px;
    margin-top: 50px;
    background: #323437;
  }

  /* 增删改查功能操作tab选项卡 */
  .w-buttonBox {
    width: 100%;
    height: 93px;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 3px solid #414245;
  }

  .w-buttonBox input {
    width: 10%;
    height: 50px;
    border-radius: 15px;
    background: #04acb7;
    outline: none;
    border: none;
    color: #d1cdca;
    font-size: 20px;
    text-shadow: 3px 3px 3px black;
    font-weight: 900;
  }

  .w-type-content {
    width: 100%;
    height: 500px;
    display: none;
  }

  .w-look-type {
    width: 200px;
    height: 50px;
    float: left;
    color: #d1cdca;
    font-size: 20px;
    border: 5px solid #04acb7;
    text-align: center;
    line-height: 50px;
    margin: 50px 100px 0px 150px;
    cursor: pointer;
    display: none;
  }

  .w-type-content .w-look-type:nth-of-type(1) {
    display: block;
  }

  ul {
    border: 5px solid black;
    width: 200px;
    max-height: 400px;
    overflow-y: auto;
    margin-top: 10px;
    margin-left: -5px;
    display: none;
  }

  /* 滚动条效果 */
  ul::-webkit-scrollbar {
    width: 3px;
  }

  ul::-webkit-scrollbar-thumb,
  ul::-webkit-scrollbar-thumb:horizontal {
    border-radius: 6px;
    background: #04acb7;
  }

  ul::-webkit-scrollbar-button {
    display: none;
  }

  ul::-webkit-scrollbar-track,
  ul::-webkit-scrollbar-track-piece {
    background: -webkit-gradient(linear, left);
  }

  ul::-webkit-scrollbar-track-piece {
    background: #212224;
  }

  li:hover {
    background: #6d41dd;
  }

  /* 添加类型盒子 */
  .add-type-box {
    display: none;
  }

  /* 添加类型 */
  .add-type {
    clear: both;
    height: 40px;
    margin-top: 30px;
    background: #323437;
    color: #fff;
    border: 1px solid #f60;
    font-size: 18px;
    text-indent: 10px;
  }

  /* 确认添加按钮 */
  .add-type-btn {
    position: relative;
    left: 18%;
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
    background-color: #0bb39d;
    border-radius: 30px;
  }

  .add-type-btn:after {
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

  .add-type-btn:active:after {
    transform: scale(0);
    opacity: 1;
    transition: 0s;
  }

  /* 修改类型盒子 */
  .update-type-box {
    display: none;
  }

  /* 修改类型 */
  .update-type {
    clear: both;
    height: 40px;
    margin-top: 30px;
    background: #323437;
    color: #fff;
    border: 1px solid #f60;
    font-size: 18px;
    text-indent: 10px;
  }

  /* 确认修改按钮 */
  .update-type-btn {
    position: relative;
    left: 18%;
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
    background-color: #0bb39d;
    border-radius: 30px;
  }

  .update-type-btn:after {
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

  .update-type-btn:active:after {
    transform: scale(0);
    opacity: 1;
    transition: 0s;
  }

  /* 删除类型盒子 */
  .update-type-box {
    display: none;
  }

  /* 确认删除按钮 */
  .delete-type-btn {
    position: relative;
    left: 18%;
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
    background-color: #0bb39d;
    border-radius: 30px;
  }

  .delete-type-btn:after {
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

  .delete-type-btn:active:after {
    transform: scale(0);
    opacity: 1;
    transition: 0s;
  }
</style>
