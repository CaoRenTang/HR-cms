<template>
  <el-dialog
    :visible="showRoleDialog"
    class="assign-role"
    title="分配角色"
    @close="close"
  >
    <!-- 复选框 -->
    <el-checkbox-group v-model="roleIds">
      <!-- 多选的选项 -->
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <el-button size="small" type="primary">确定</el-button>
      <el-button size="small" @click="close">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import {getRoleListAPI} from '@/api/setting'

export default {
  // 父组件传递的，控制显隐
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleIds: [], // 保存选中角色Id
      list: [] // 保存角色选项列表
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 子组件传递变量，关闭弹层
    close() {
      this.$emit('update:showRoleDialog', false)
    },
    // 获取角色列表
    async getRoleList() {
      const res = await getRoleListAPI({page: 1, pagesize: 100})
      // 将获取的数据保存到定义的数组变量中
      this.list = res.rows
      // console.log(this.list)
    }
  }
}
</script>
