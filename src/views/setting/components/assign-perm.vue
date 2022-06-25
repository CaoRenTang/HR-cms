<template>
  <!-- 分配权限的弹层 -->
  <el-dialog
    :visible="showAssignDialog"
    title="分配权限(一级为路由页面查看权限-二级为按钮操作权限)"
    @close="closeAssignDialog"
  >
    <!-- 权限点数据展示 -->
    <el-tree
      ref="tree"
      :check-strictly="true"
      :data="permList"
      :props="{ label: 'name' }"
      :show-checkbox="true"
      default-expand-all
      node-key="id"
    />
    <template #footer>
      <el-button @click="closeAssignDialog">取消</el-button>
      <el-button type="primary" @click="assignPerm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import {getPermissionListAPI} from '@/api/permisson'
import {getRoleDetailAPI, assignPermAPI} from '@/api/setting'
import {listToTreeData} from '@/utils'

export default {
  props: {
    showAssignDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 分配给角色权限点的数据
      permList: [],
      // 存储角色ID
      roleId: ''
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    // 子组件传值
    closeAssignDialog() {
      this.$emit('update:showAssignDialog', false)
    },
    // 给角色分配权限
    async assignPerm() {
      await assignPermAPI({
        id: this.roleId,
        permIds: this.$refs.tree.getCheckedKeys()
      })
      // 提示分配成功
      this.$message.success('给角色分配权限成功！')
      // 关闭弹层
      this.closeAssignDialog()
    },
    // 获取角色之前分配的权限管理=》回显
    async getRoleDetail(id) {
      const {permIds} = await getRoleDetailAPI(id)
      // 调用数据回显方法
      console.log('角色之前分配的权限点', permIds)
      // 储存角色id
      this.roleId = id
      // 回显之前选择的权限点
      this.$refs.tree.setCheckedKeys(permIds)
    },
    // 获取权限点列表数据
    async getPermissionList() {
      const res = await getPermissionListAPI()
      // console.log(res)
      this.permList = listToTreeData(res)
      // console.log('树形数据：', this.permList)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
