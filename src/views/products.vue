<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><a href="#/">首页</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="#/">商品列表</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="products"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="商品">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <!-- 使用作用域插槽获取插槽数据scope（Object），scope.row表示当前这行绑定的数据-->
        <template v-slot="scope">
          <el-button @click="addToCart(scope.row)">加入购物车</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'ProductList',
  data () {
    return {
      // products: [
      //   { id: 1, title: 'iPad Pro', price: 500.01 },
      //   { id: 2, title: 'H&M T-Shirt White', price: 10.99 },
      //   { id: 3, title: 'Charli XCX - Sucker CD', price: 19.99 }
      // ]
    }
  },
  created () {
    this.getProducts()
  },
  computed: {
    // 命名空间，映射的状态属性
    ...mapState('products', ['products'])
  },
  methods: {
    ...mapMutations('cart', ['addToCart']),
    ...mapActions('products', ['getProducts'])
  }
}
</script>

<style></style>
