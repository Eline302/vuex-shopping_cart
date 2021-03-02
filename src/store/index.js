import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/productsStore'
import cart from './modules/cartStore'

Vue.use(Vuex)
// 使用插件来统一存储（注册一个函数让它可以在所有的mutation结束之后执行数据存储，这样就不需要在每个mutation中数据改变时存储数据）
const myPlugin = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, paylod }
    // 判断是否为cart模块的mutation
    if (mutation.type.startsWith('cart/')) {
      // 本地存储的数据是以字符串的形式
      window.localStorage.setItem('cart-products', JSON.stringify(state.cart.cartProducts))
    }
  })
}
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products,
    cart
  },
  // 注册插件
  plugins: [myPlugin]
})
