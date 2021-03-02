/**
 * 商品数据模块
 * 1.state中定义属性，记录所有商品数据
 * 2.在mutations中添加方法，用于修改商品数据
 * 3.在actions中新增方法，异步向接口请求商品数据
 *
 */
import axios from 'axios'
const state = {
  // 记录所有商品
  products: []

}
const getters = {}
const mutations = {
  // 修改商品数据状态
  setProducts (state, data) {
    state.products = data
  }
}
const actions = {
  async getProducts ({ commit }, params) {
    const { data } = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/products'
    })
    commit('setProducts', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
