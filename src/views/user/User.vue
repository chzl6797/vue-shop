<template>
  <div>
    <!-- Breadcrumb 面包屑组件 -->
    <breadcrumb :itemList="['首页', '用户管理','用户列表']"></breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容"
                    v-model="requsetBody.query"
                    clearable>
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="getUserInfo(requsetBody)">搜索</el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"
                     @click="addUserDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户信息表格 -->
      <el-table :data="tableData"
                stripe
                border
                style="width: 100%">
        <el-table-column type="index"></el-table-column>

        <el-table-column prop="username"
                         label="姓名">
        </el-table-column>

        <el-table-column prop="email"
                         label="邮箱">
        </el-table-column>

        <el-table-column prop="mobile"
                         label="电话">
        </el-table-column>

        <el-table-column prop="role_name"
                         label="角色">
        </el-table-column>

        <el-table-column prop="mg_state"
                         label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"
                       active-color="#409EFF"
                       inactive-color="#dcdfe6"
                       @change="switchChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column width="180px"
                         label="操作">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="mini"
                       icon="el-icon-edit"
                       @click="editUserClick(scope.row.id)"></el-button>
            <el-button type="danger"
                       size="mini"
                       icon="el-icon-delete"
                       @click="deleteUser(scope.row.id)"></el-button>
            <el-tooltip effect="dark"
                        content="分配角色"
                        placement="top"
                        :enterable="false">
              <el-button type="warning"
                         size="mini"
                         icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :page-sizes="[2, 3, 10, 20]"
                     :page-size="100"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加用户功能对话框  -->
    <el-dialog title="添加用户"
               :visible.sync="addUserDialogVisible"
               width="50%"
               @close="closeUserForm">

      <el-form :model="addUserForm"
               :rules="addUserFormRules"
               ref="addUserFormRef"
               label-width="70px"
               class="demo-ruleForm">
        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机"
                      prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addUserClick">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户信息 -->
    <el-dialog title="修改用户"
               :visible.sync="editUserDialogVisible"
               width="50%">

      <el-form :model="editUserForm"
               :rules="editUserFormRules"
               ref="editUserFormRef"
               label-width="70px"
               class="demo-ruleForm">
        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="editUserForm.username"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机"
                      prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editUserDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editUserInfoClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from 'components/content/Breadcrumb'
import { getUserList, setUserState, addUser, findUserById, editUserInfo, deleteUserInfo } from 'network/homeReq'
export default {
  data() {
    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }

    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }

    return {
      tableData: [],
      requsetBody: {
        // 搜索关键字
        query: '',
        // 搜索的页码
        pagenum: 1,
        // 搜索的个数
        pagesize: 2
      },
      // 用户信息总数
      total: 0,
      // 添加用户对话框显示与隐藏
      addUserDialogVisible: false,
      // 修改用户对话框显示与隐藏
      editUserDialogVisible: false,
      // 添加用户信息表单
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 修改用户信息
      editUserForm: {},
      // 添加用户信息规则
      addUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '用户名的长度在6~15个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 修改用户信息规则
      editUserFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    Breadcrumb
  },
  created() {
    /* 请求用户列表数据 */
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      getUserList(this.requsetBody).then(res => {
        const data = res.data
        // 用户列表数据获取失败
        if (data.meta.status !== 200) {
          return this.$message.error({
            duration: 1000,
            message: '获取用户列表数据失败'
          })
        }
        // 用户列表数据获取成功
        this.total = data.data.total
        this.tableData = data.data.users
      })
    },
    // 监听pagesize改变事件
    handleSizeChange(newSize) {
      this.requsetBody.pagesize = newSize
      this.getUserInfo(this.requsetBody)
    },
    // 监听当前页数改变事件
    handleCurrentChange(currentPage) {
      this.requsetBody.pagenum = currentPage
      this.getUserInfo(this.requsetBody)
    },
    // 监听状态按钮该表
    switchChange(config) {
      setUserState({
        id: config.id,
        type: config.mg_state
      }).then(res => {
        if (res.status !== 200) {
          config.mg_state = !config.mg_state
          return this.$message.error('更新用户状态失败！')
        }
        this.$message.success('更新用户状态成功！')
      })
    },
    // 监听添加用户按钮
    addUserClick() {
      this.$refs.addUserFormRef.validate(async (valid) => {
        if (!valid) return
        const res = await addUser(this.addUserForm)
        if (res.status !== 200) {
          return this.$message.error('添加用户失败！')
        }
        this.addUserDialogVisible = false
        this.$message.success('添加用户成功！')
      })
    },
    // 关闭对话框监听
    closeUserForm() {
      this.$refs.addUserFormRef.resetFields()
    },
    // 监听修改按钮
    async editUserClick(id) {
      const { data: res } = await findUserById(id)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户信息失败')
      }
      this.editUserDialogVisible = true
      this.editUserForm = res.data
    },
    // 修改用户信息
    editUserInfoClick() {
      this.$refs.editUserFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await editUserInfo(this.editUserForm.id, {
          email: this.editUserForm.email,
          mobile: this.editUserForm.mobile
        })
        if (res.meta.status !== 200) {
          this.$message.error('修改用户信息失败')
        }
        this.$message.success('修改成功')
        this.getUserInfo()
        this.editUserDialogVisible = false
      })
    },
    async deleteUser(id) {
      const ifSure = confirm('确认删除吗？')
      if (ifSure) {
        const { data: res } = await deleteUserInfo(id)
        if (res.meta.status !== 200) return this.$message.error('删除失败')
        this.getUserInfo()
        this.$message.success('删除成功')
      }
    }
  }
}
</script>

<style scoped>
.el-table {
  margin: 15px 0;
}
</style>
