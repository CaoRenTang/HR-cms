<template>
  <!-- 分配权限的弹层 -->
  <el-dialog
    :visible="showAssignDialog"
    title="分配权限(一级为路由页面查看权限-二级为按钮操作权限)"
    @close="closeAssignDialog"
  >
    <!-- 权限点数据展示 -->
    <el-tree
      :check-strictly="true"
      :data="permList"
      :default-expand-all="true"
      :props="{ label: 'name' }"
      :show-checkbox="true"
      node-key="id"
    />
    <template #footer>
      <el-button @click="closeAssignDialog">取消</el-button>
      <el-button type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import {getPermissionListAPI} from '@/api/permisson'
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
      permList: []
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
    // 获取权限列表
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
