<template>
  <div>
    <el-menu background-color="#333744"
             text-color="#fff"
             :default-active="itemIndex"
             unique-opened
             :collapse="isCollapse"
             router
             :collapse-transition="false">

      <div class="toggle-button"
           @click="toggleClick">|||</div>

      <el-submenu :index="item.id + ''"
                  v-for="item in menulist"
                  :key="item.id">

        <template slot="title">
          <i :class="iconList[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>

        <el-menu-item-group v-for="muneitem in item.children"
                            :key="muneitem.id">
          <el-menu-item :index="'/'+  muneitem.path"
                        @click="itemClick('/'+  muneitem.path)">{{muneitem.authName}}</el-menu-item>
        </el-menu-item-group>

      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { menusRequest } from 'network/homeReq'

export default {
  data() {
    return {
      menulist: [],
      itemIndex: '',
      iconList: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false
    }
  },
  created() {
    this.getMenus()
    this.itemIndex = window.sessionStorage.getItem('itemClick')
  },
  methods: {
    getMenus() {
      menusRequest().then(res => {
        const data = res.data

        if (data.meta.status !== 200) return this.$message('获取菜单列表失败')

        this.menulist = data.data
      })
    },
    itemClick(path) {
      window.sessionStorage.setItem('itemClick', path)
      this.itemIndex = path
    },
    // 监听侧栏折叠
    toggleClick() {
      this.isCollapse = !this.isCollapse
      this.$emit('toggle')
    }
  }
}
</script>

<style scoped>
.el-menu {
  border-right: none;
}
.el-submenu span {
  margin-left: 10px;
}
.toggle-button {
  line-height: 24px;
  background-color: #4a5064;
  text-align: center;
  letter-spacing: 0.2em;
  color: #fff;
  font-size: 12px;
  vertical-align: middle;
  cursor: pointer;
}
</style>
