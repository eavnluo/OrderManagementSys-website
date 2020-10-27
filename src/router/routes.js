// 建议使用name跳转，首字母大写
import HomeContent from '@/views/homeContent'
import News from '@/views/news/newsList'
import Demand from '@/views/demand'
import ProFile from '@/views/profile/index'
import Chart from '@/views/profile/modules/chart/index'
import EditPwd from '@/views/profile/profile-editPwd'
import ApproachesDetail from '@/views/profile/modules/approache/approacheDetail'
import UserCenterClient from '@/views/profile/modules/user/userCenterClient'
import UserCenterSupplier from '@/views/profile/modules/user/userCenterSupplier'
import CarManage from '@/views/profile/modules/car/carManage'
import OrderList from '@/views/profile/modules/order/orderList'
import OrderInfoClient from '@/views/profile/modules/order/orderInfoClient'
import OrderInfoSupplier from '@/views/profile/modules/order/orderInfoSupplier'
import OrderAdd from '@/views/profile/modules/order/orderAdd'
import OrderBaseContacts from '@/views/profile/modules/order/baseContacts'
import PriceList from '@/views/profile/modules/price/priceList'
import PriceAdd from '@/views/profile/modules/price/priceAdd'
import PriceInfo from '@/views/profile/modules/price/priceInfo'
import BillGroupMonth from '@/views/profile/modules/bill/billGroupMonth'
import BillInfo from '@/views/profile/modules/bill/billInfo'
import BillList from '@/views/profile/modules/bill/billList'
import BillNoClient from '@/views/profile/modules/bill/billNoClient'
import BillNoSupplier from '@/views/profile/modules/bill/billNoSupplier'
import Inventoryinfo from '@/views/profile/modules/inventory/Inventoryinfo'
import InventoryinfoRecord from '@/views/profile/modules/inventory/InventoryinfoRecord'
import Login from '@/views/common/login'
import Reginster from '@/views/common/register'
import ForgetPwd from '@/views/common/forgetPwd'
import NoPermission from '@/views/common/401'
import NoData from '@/views/common/403'
import NotFound from '@/views/common/404'

const routes = [
  {
    path: '/',
    name: 'HomeContent',
    component: HomeContent
  },
  {
    path: '/news/:newsCategory',
    name: 'News',
    component: News
  },
  {
    path: '/demand',
    name: 'Demand',
    component: Demand
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProFile,
    // meta中requireAuth，role为必填值，否则影响权限的校验
    meta: {
      title: '', // 个人中心标题: Boolean
      requireAuth: true, // 需要权限：Boolean
      role: ['client', 'supplier'] // 角色列表： 0 （client客户） 1 （supplier供应商）
    },
    // 子路由规范：name: 路由名 + _0 或 _1  0：客户  1：供应商
    children: [
      {
        path: '/profile/chart',
        name: 'Chart',
        component: Chart,
        meta: {
          title: '平台数据',
          requireAuth: true,
          role: ['client', 'supplier']
        }
      },
      {
        path: '/profile/approachesDetail/:title/:type',
        name: 'ApproachesDetail',
        component: ApproachesDetail,
        meta: {
          requireAuth: true,
          role: ['client', 'supplier']
        }
      },
      {
        path: '/profile/userCenter/0',
        name: 'UserCenter_0',
        component: UserCenterClient,
        meta: {
          title: '用户档案',
          requireAuth: true,
          role: ['client']
        }
      },
      {
        path: '/profile/userCenter/1',
        name: 'UserCenter_1',
        component: UserCenterSupplier,
        meta: {
          title: '供应商档案',
          requireAuth: true,
          role: ['supplier']
        }
      },
      {
        path: '/profile/userCenter/EditPwd/:type',
        name: 'EditPwd',
        component: EditPwd,
        meta: {
          title: '修改密码',
          requireAuth: true,
          role: ['client', 'supplier']
        }
      },
      {
        path: '/profile/CarManage',
        name: 'CarManage',
        component: CarManage,
        meta: {
          title: '车辆管理',
          requireAuth: true,
          role: ['supplier']
        }
      },
      {
        path: '/profile/order/orderList/:type',
        name: 'OrderList',
        component: OrderList,
        meta: {
          title: '订单列表',
          requireAuth: true,
          role: ['client', 'supplier']
        }
      },
      {
        path: '/profile/order/orderInfo/:orderItem',
        name: 'OrderInfo_0',
        component: OrderInfoClient,
        meta: {
          title: '订单内容',
          requireAuth: true,
          role: ['client']
        }
      },
      {
        path: '/profile/order/orderInfo/:orderItem/:storageSupplyStatus/:carSupplyStatus',
        name: 'OrderInfo_1',
        component: OrderInfoSupplier,
        meta: {
          title: '订单内容',
          requireAuth: true,
          role: ['supplier']
        }
      },
      {
        path: '/profile/order/orderAdd',
        name: 'OrderAdd',
        component: OrderAdd,
        meta: {
          title: '订单添加',
          requireAuth: true,
          role: ['client']
        }
      },
      {
        path: '/profile/order/orderBaseContacts',
        name: 'OrderBaseContacts',
        component: OrderBaseContacts,
        meta: {
          title: '联系人管理',
          requireAuth: true,
          role: ['client']
        }
      },
      {
        path: '/profile/price/priceList',
        name: 'PriceList',
        component: PriceList,
        meta: {
          title: '报价管理',
          requireAuth: true,
          role: ['client', 'supplier']
        }
      },
      {
        path: '/profile/price/priceAdd',
        name: 'PriceAdd',
        component: PriceAdd,
        meta: {
          title: '新增报价',
          requireAuth: true,
          role: ['supplier']
        }
      },
      {
        path: '/profile/price/priceInfo/:id',
        name: 'PriceInfo',
        component: PriceInfo,
        meta: {
          title: '报价内容',
          requireAuth: true,
          role: ['client', 'supplier']
        }
      },
      {
        path: '/profile/bill/billGroupMonth',
        name: 'BillGroupMonth',
        component: BillGroupMonth,
        meta: {
          title: '结算中心',
          requireAuth: true,
          role: ['client', 'supplier']
        }
      },
      {
        path: '/profile/bill/billInfo/:yearMonth',
        name: 'BillInfo',
        component: BillInfo,
        meta: {
          title: '订单费用',
          requireAuth: true,
          role: ['client', 'supplier']
        }
      },
      {
        path: '/profile/bill/billList/:yearMonth/:orderNo',
        name: 'BillList',
        component: BillList,
        meta: {
          title: '账单费用',
          requireAuth: true,
          role: ['client', 'supplier']
        }
      },
      {
        path: '/profile/bill/BillNo/0/:orderItem/:billNo/:id',
        name: 'BillNo_0',
        component: BillNoClient,
        meta: {
          title: '账单内容',
          requireAuth: true,
          role: ['client']
        }
      },
      {
        path: '/profile/bill/BillNoSupplier/1/:orderItem/:billNo/:id',
        name: 'BillNo_1',
        component: BillNoSupplier,
        meta: {
          title: '账单内容',
          requireAuth: true,
          role: ['supplier']
        }
      },
      {
        path: '/profile/inventory/inventoryinfo',
        name: 'Inventoryinfo',
        component: Inventoryinfo,
        meta: {
          title: '库存管理',
          requireAuth: true,
          role: ['client', 'supplier']
        }
      },
      {
        path: '/profile/inventory/inventoryinfoRecord/:id/:ownerCode/:storeCode',
        name: 'InventoryinfoRecord',
        component: InventoryinfoRecord,
        meta: {
          title: '出入库记录',
          requireAuth: true,
          role: ['client', 'supplier']
        }
      },
      {
        path: '/profile/401',
        name: 'NoPermission',
        component: NoPermission
      },
      {
        path: '/profile/403',
        name: 'NoData',
        component: NoData
      },
      {
        path: '/profile/*', // 匹配所有/profile错误路径
        redirect: '/profile/403'
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Reginster
  },
  {
    path: '/forgetPwd',
    name: 'ForgetPwd',
    component: ForgetPwd
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export default routes
