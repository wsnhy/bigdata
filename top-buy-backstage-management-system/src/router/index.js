import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// 首页框架
import Index from "../pages/Index";
// 首页
import FunctionsIndex from "../components/Functions/FunctionsIndex";
// 分类管理
import FunctionsClassify from "../components/Functions/FunctionsClassify";
// 品牌管理
import FunctionsBrand from "../components/Functions/FunctionsBrand"
// 商品列表
import FunctionsProductList from "../components/Functions/FunctionsProductList"
// 规格参数
import FunctionsSpecification from "../components/Functions/FunctionsSpecification"
// 会员统计
import FunctionsVipStatistics from "../components/Functions/FunctionsVipStatistics"
// 会员管理
import FunctionsVipManagement from "../components/Functions/FunctionsVipManagement"
// 交易统计
import FunctionsTradeStatistics from "../components/Functions/FunctionsTradeStatistics"
// 订单管理
import FunctionsOrderManagement from "../components/Functions/FunctionsOrderManagement"
// 物流管理
import FunctionsLogisticsManagement from "../components/Functions/FunctionsLogisticsManagement"
// 促销管理
import FunctionsCampaign from "../components/Functions/FunctionsCampaign"
// 退货管理
import FunctionsReturnManagement from "../components/Functions/FunctionsReturnManagement"
// 角色管理
import FunctionsRoleManagement from "../components/Functions/FunctionsRoleManagement"
// 登录
import Login from "../pages/Login"
// 密码修改
import FunctionsAmendPass from "../components/Functions/FunctionsAmendPass"
Vue.use(Router);

export default new Router({
  linkExactActiveClass: "act",
  mode: "history",
  routes: [
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '',
          name: 'Total',
          component: FunctionsIndex
        },
        {
          path: 'Classify',
          name: 'Classify',
          component: FunctionsClassify
        },
        {
          path: 'Brand',
          name: 'Brand',
          component: FunctionsBrand
        },
        {
          path: 'ProductList',
          name: 'ProductList',
          component: FunctionsProductList
        },
        {
          path: 'Specification',
          name: 'Specification',
          component: FunctionsSpecification
        },
        {
          path: 'VipStatistics',
          name: 'VipStatistics',
          component: FunctionsVipStatistics
        },
        {
          path: 'VipManagement',
          name: 'VipManagement',
          component: FunctionsVipManagement
        },
        {
          path: 'TradeStatistics',
          name: 'TradeStatistics',
          component: FunctionsTradeStatistics
        },
        {
          path: 'OrderManagement',
          name: 'OrderManagement',
          component: FunctionsOrderManagement
        },
        {
          path: 'LogisticsManagement',
          name: 'LogisticsManagement',
          component: FunctionsLogisticsManagement
        },
        {
          path: 'Campaign',
          name: 'Campaign',
          component: FunctionsCampaign
        },
        {
          path: 'ReturnManagement',
          name: 'ReturnManagement',
          component: FunctionsReturnManagement
        },
        {
          path: 'RoleManagement',
          name: 'RoleManagement',
          component: FunctionsRoleManagement
        },
        {
          path: 'AmendPass',
          name: 'AmendPass',
          component: FunctionsAmendPass
        }
      ]
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
