<template>
  <el-button type="warning"
             @click="logout">退出登录</el-button>
</template>
<script>
export default {
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.replace('/login')
    }
  }
}
</script>
<style scoped>
</style>
