/* 出入库列表 表头信息 */
const state = {
  inventoryinfo: ''
}

const mutations = {
  set_inventoryinfo (state, inventoryinfo) {
    state.inventoryinfo = inventoryinfo
  }
}

export default {
  state,
  mutations
}
