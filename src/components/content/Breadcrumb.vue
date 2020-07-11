<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/users' }">{{itemList[0]}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{itemList[1]}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{itemList[2]}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    itemList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>
