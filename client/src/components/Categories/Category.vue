<template>
  <div>
    <CategoryHeader />
    <ProductList />
  </div>
</template>

<script>
import CategoryHeader from './CategoryHeader.vue';
import ProductList from '../Products/ProductList';
export default {
  components: {
    CategoryHeader,
    ProductList
  }
};
</script>   

<style lang='scss'>
</style>