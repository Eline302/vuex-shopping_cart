const state = {
  // 记录所有购物车的数据，在本地存储(字符串形式)中获取，全局刷新后购物车数据不清空，直接从本地获取
  cartProducts: JSON.parse(window.localStorage.getItem('cart-products')) || []
}
const getters = {
  // 商品总数
  totalCount (state) {
    return state && state.cartProducts.reduce((sum, item) => { return sum + item.count }, 0)
  },
  // 商品总价
  totalPrice (state) {
    return state && state.cartProducts.reduce((sum, item) => { return sum + item.totalPrice }, 0).toFixed(2)
  },
  // 购物车中选择商品总数
  checkedCount (state) {
    return state && state.cartProducts.reduce((sum, item) => {
      if (item.isChecked) {
        sum += item.count
      }
      return sum
    }, 0)
  },
  // 购物车中选择商品总价格
  checkedPrice (state) {
    return state && state.cartProducts.reduce((sum, item) => {
      if (item.isChecked) {
        sum += item.totalPrice
      }
      return sum
    }, 0).toFixed(2)
  }
}
const mutations = {
  // 加入购物车
  addToCart (state, product) {
    // 1. cartProducts 中没有该商品，把该商品(product)添加到数组，并增加 count=1，isChecked=true，totalPrice
    // 2. cartProducts 有该商品，让商品的数量(count)加1，选中，计算小计
    // 判断cartProducts中是否有该商品
    const prod = state.cartProducts.find(item => item.id === product.id)
    // console.log(prod)
    if (prod) {
    // 有商品
      prod.count++
      prod.isChecked = true
      prod.totalPrice = prod.count * prod.price
    } else {
    // 没有商品
      state.cartProducts.push({
        ...product,
        count: 1,
        isChecked: true,
        totalPrice: product.price
      })
    }
    // console.log(state.cartProducts)
  },
  // 删除
  deleteFromCart (state, prodId) {
    // 获取删除商品在数组中的index
    const index = state && state.cartProducts.findIndex(item => item.id === prodId)
    // 删除对应商品的数据
    index !== -1 && state.cartProducts.splice(index, 1)
  },
  // 更新所有商品的选中状态（点击全选）
  updateAllProductChecked (state, checked) {
    state.cartProducts.map(prod => {
      prod.isChecked = checked
    })
  },
  // 更新某个商品的选中状态（点击单个商品）
  updateProductChecked (state, { prodId, checked }) {
    const prod = state.cartProducts.find(prod => prod.id === prodId)
    prod && (prod.isChecked = checked)
  },
  // 计数器
  updateProduct (state, { prodId, count }) {
    const prod = state.cartProducts.find(prod => prod.id === prodId)
    if (prod) {
      prod.count = count
      prod.totalPrice = count * prod.price
    }
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
