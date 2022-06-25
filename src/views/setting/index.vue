<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="padding: 10px 0">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog=true"
              >新增角色
              </el-button>
            </el-row>
            <!-- 表格 -->
            <el-table
              :data="roleList"
            >
              <el-table-column label="序号" type="index" width="120" />
              <el-table-column label="角色名称" prop="name" width="240" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template #default="{row}">
                  <el-button size="small" type="success" @click="openAssign(row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editFn(row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row align="middle" justify="center" style="height: 60px" type="flex">
              <!-- 分页组件 -->
              <el-pagination
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                layout="prev,pager,next"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!--        新增弹层-->
      <el-dialog
        :title="roleForm.id ? '编辑角色' :'新增角色'"
        :visible.sync="showDialog"
        @close="closeDialog"
      >
        <el-form
          ref="roleForm"
          :model="roleForm"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>
        <!-- 底部 -->
        <el-row slot="footer" justify="center" type="flex">
          <el-col :span="6">
            <el-button size="small" @click="showDialog=false">取消</el-button>
            <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>
      <!--      角色分配弹出层-->
      <AssignPerm
        ref="aperm"
        :show-assign-dialog.sync="showAssignDialog"
      />
    </div>
  </div>
</template>

<script>
import {addRoleAPI, deleteRoleAPI, getRoleDetailAPI, getRoleListAPI, updateRoleAPI} from '@/api/setting'
import AssignPerm from './components/assign-perm'

export default {
  name: 'Setting',
  components: {
    AssignPerm
  },
  data() {
    return {
      showAssignDialog: false, // 控制弹层显隐
      roleList: [], // 保存角色信息
      page: {
        // 放置页码及相关数据
        page: 1, // 当前页码数
        pagesize: 10, // 每一页显示的数量
        total: 0 // 记录总数
      },
      showDialog: false, // 默认隐藏弹层
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      }

    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 分配权限点击事件,出现弹层
    openAssign(id) {
      this.showAssignDialog = true
      // 调用子组件中的方法，数据回显
      this.$refs.aperm.getRoleDetail(id)
    },
    // 获取角色列表
    async getRoleList() {
      const {total, rows} = await getRoleListAPI(this.page)
      // console.log(total, rows)
      this.page.total = total
      // 将数据保存到定义的数组中
      this.roleList = rows
    },
    // 页码逻辑
    changePage(newPage) {
      this.page.page = newPage // 将当前页码赋值给当前的最新页码
      this.getRoleList()
    },
    // 点击事件，弹层点击确定提交
    btnOK() {
      // 兜底校验->通过之后调用后台接口数据->提示添加成功->关闭弹层->刷新列表数据
      this.$refs.roleForm.validate(async(isOK) => {
        if (isOK) {
          if (this.roleForm.id) {
            // 有ID为编辑,调用接口接口更新表单数据
            await updateRoleAPI(this.roleForm)
            // 修改成功提示
            this.$message.success('修改角色信息成功')
          } else {
            // 没有ID为添加
            await addRoleAPI(this.roleForm)
            this.$message.success('添加成功')
          }
          // 关闭弹层
          this.showDialog = false
          // 刷新列表数据
          this.getRoleList()
        }
      })
    },
    // 关闭弹层执行
    closeDialog() {
      // 重置表单
      this.$refs.roleForm.resetFields()
      // 手动清空数据(编辑时使用)
      this.roleForm = {
        name: '',
        description: ''
      }
    },
    // 点击事件->删除
    deleteRole(row) {
      // console.log(row)
      this.$confirm(`此操作将删除角色:${row.name}, 是否继续?`, '提示', { type: 'warning' }).then(() => {
        // 调用删除接口
        deleteRoleAPI(row.id).then(res => {
          this.getRoleList()
          this.$message.success('删除角色成功')
          // 解决删除最后一页面显示无数据bug
          if (this.roleList.length === 1) {
            if (this.page.page > 1) {
              this.page.page--
            }
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 点击事件->编辑
    async editFn(row) {
      console.log('要编辑的数据:', row)
      // 点击编辑，让弹出层显示
      this.showDialog = true
      // 调用编辑角色的接口方法
      const res = await getRoleDetailAPI(row.id)
      // console.log(res)
      // 将数据回显
      this.roleForm = res
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
