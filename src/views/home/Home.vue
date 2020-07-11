<template>
  <el-container>
    <el-header>
      <!-- 首页头组件 -->
      <home-header></home-header>
    </el-header>
    <el-container>
      <el-aside :width="isToggle ? '64px' : '200px'">
        <home-aside @toggle="toggle"></home-aside>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeHeader from './homeComponents/HomeHeader'
import HomeAside from './homeComponents/HomeAside'
export default {
  data() {
    return {
      isToggle: false
    }
  },
  components: {
    HomeHeader,
    HomeAside
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.replace('/login')
    },
    toggle() {
      this.isToggle = !this.isToggle
    }
  }
}
</script>
<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  padding-left: 0;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
</style>
