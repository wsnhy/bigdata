<template>
  <div class="main">
    <index-nav :data="index.menu"></index-nav>
    <index-main :data="index"></index-main>
  </div>
</template>

<script>
  import IndexNav from "../components/Index/IndexNav";
  import indexData from "../../static/data/index"
  import IndexMain from "../components/Index/IndexMain";

  export default {
    name: "Index",
    components: {IndexMain, IndexNav},
    data() {
      return {
        index: {}
      }
    },
    methods: {
      initData() {
        this.index = indexData.index;
        this.axios.get('http://bt2.hll666.xyz:8083/user/getUsers')
          .then((response) => {
            if (response.data.code === 999) {
              setTimeout(() => {
                $('body').dialog({
                  type: 'primary',
                  showBoxShadow: true,
                  buttons: [{name: '确定', className: 'defalut'}],
                  discription: '您还未登录，请先登录后进行管理',
                  animateIn: 'fadeInRight-hastrans',
                  animateOut: 'fadeOutRight-hastrans'
                }, (ret) => {
                  if (ret) {
                    this.$router.push({
                      path: "/"
                    });
                  }
                })
              }, 16)
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    created() {
      this.initData();
    }
  }
</script>

<style scoped>
  .main {
    width: 100%;
    height: 100%;
    background: #212224;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
  }
</style>
