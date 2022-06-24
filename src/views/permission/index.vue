<template>
  <div class="box">
    <el-card :body-style="{ padding: '20px' }" shadow="always">
      <div slot="header">
        <el-row align="middle" justify="space-between" type="flex">
          <span>权限管理</span>
          <el-button type="primary" @click="addPerm(1,'0')">添加权限</el-button>
        </el-row>
      </div>
      <!-- card body -->
      <el-table :data="list" border row-key="id">
        <el-table-column label="名称" prop="name"/>
        <el-table-column label="标识" prop="code"/>
        <el-table-column label="描述" prop="description"/>
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button
              v-if="row.type === 1"
              type="text"
              @click="addPerm(2,row.id)"
            >添加
            </el-button>
            <el-button type="text" @click="editPermission(row)">编辑</el-button>
            <el-button type="text" @click="delFn(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--添加权限弹层-->
    <el-dialog
      :title="formData.id ? '编辑权限' : '新增权限'"
      :visible.sync="showDialog"
      @close="close"
    >
      <!-- 表单内容 -->
      <el-form
        ref="fm"
        :model="formData"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="权限名称">
          <el-input v-model="formData.name"/>
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="formData.code"/>
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description"/>
        </el-form-item>
        <el-form-item label="权限启用">
          <el-switch
            v-model="formData.enVisible"
            active-text="启用"
            active-value="1"
            inactive-text="不启用"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div style="text-align: right;">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPermissionListAPI,
  addPermissionAPI,
  delPermissionAPI,
  getPermissionDetailAPI,
  updatePermissionAPI
} from '@/api/permisson'
// 导入转换树形数据的方法
import {listToTreeData} from '@/utils'

export default {
  data() {
    return {
      showDialog: false, // 控制添加弹层的显示隐藏
      list: [], // 保存列表数据
      // 表单数据对象
      formData: {
        enVisible: '0', // 开启
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型
        pid: '' // 添加到哪个节点下
      },
      // 校验规则
      rules: {
        name: [{required: true, message: '权限点名称不能为空', trigger: 'blur'}],
        code: [{required: true, message: '权限点标识不能为空', trigger: 'blur'}]
      }
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    // 获取权限列表
    async getPermissionList() {
      const res = await getPermissionListAPI()
      // console.log(res)
      this.list = listToTreeData(res)
    },
    // 添加权限点击事件
    addPerm(type, pid) {
      // 1.显示弹层
      this.showDialog = true
      // 储存新增权限的type和pid值
      this.formData.type = type
      this.formData.pid = pid
    },
    // --------------------------新增||编辑权限点击事件--------------------
    async submit() {
      // 编辑更新数据，有id为编辑，没有id为新增
      if (this.formData.id) {
        // 调用编辑接口
        await updatePermissionAPI(this.formData)
        // 提示
        this.$message.success('修改权限信息成功')
      } else {
        // 新增
        await this.$refs.fm.validate(async (isOk) => {
          if (isOk) {
            // 校验通过，调用新增接口
            await addPermissionAPI(this.formData)
            // 消息提示，新增成功
            this.$message.success(this.formData.type === 1 ? '页面权限新增成功！' : '按钮权限新增成功！')
          }
        })
      }
      // 关闭弹层
      this.showDialog = false
      // 重新刷新列表
      this.getPermissionList()
    },
    // 添加成功关闭弹层重置表单
    close() {
      // 重置表单
      console.log(this.$refs.fm)
      this.$refs.fm.resetFields()
      this.formData = {
        enVisible: '0', // 开启
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型
        pid: '' // 添加到哪个节点下
      }
    },
    // --------------------删除权限点---------------------
    delFn(row) {
      this.$confirm(`此操作将删除${row.name}, 是否继续?`, '提示', {
        type: 'warning'
      }).then(async () => {
        // 判断当前要删除的权限下是否有子权限，有子权限不能删除
        if (row.children && row.children.length > 0) {
          return this.$message.error('当前权限下，有按钮权限，不能直接删除！')
        }
        // 没有子权限，调用删除接口
        await delPermissionAPI(row.id)
        this.$message.success('删除成功')
        this.getPermissionList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // ---------------------编辑权限---------------------
    async editPermission(row) {
      // 点击编辑打开弹层
      this.showDialog = true
      // 调用后台接口
      const data = await getPermissionDetailAPI(row.id)
      this.formData = data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
