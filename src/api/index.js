/* 为了方便多人协同开发以及避免接口位置混乱，接口写在对应的模块下！！！ */
/* eslint-disable */
import website from './modules/website'
import dict from './modules/dict'
import news from './modules/news'
import account from './modules/account'
import demand from './modules/demand'
import profile_downloadFile from './modules/profile/downloadFile'
import profile_chart from './modules/profile/chart'
import profile_car from './modules/profile/car'
import profile_approache from './modules/profile/approache'
import profile_user from './modules/profile/user'
import profile_order from './modules/profile/order'
import profile_price from './modules/profile/price'
import profile_bill from './modules/profile/bill'
import profile_inventoryinfo from './modules/profile/inventoryinfo'

export default {
  website,
  dict,
  news,
  demand,
  account,
  profile_downloadFile,
  profile_chart,
  profile_car,
  profile_approache,
  profile_user,
  profile_order,
  profile_price,
  profile_bill,
  profile_inventoryinfo
}
