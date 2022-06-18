<template>
  <el-dialog
    title="新增部门"
    :visible="showDialog"
    @close="close"
  >
    <el-form label-width="120px">
      <el-form-item label="部门名称">
        <el-input style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select style="width:80%" placeholder="请选择" value="" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" size="small">确定</el-button>
      <el-button size="small">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'AddDept',
  props: {
    // 父组件传递给子组件的变量，控制显示隐藏
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      // 修改父组件变量的值，子传父
      this.$emit('close-dialog', this.showDialog)
    }
  }
}
</script>

<style scoped>

</style>
