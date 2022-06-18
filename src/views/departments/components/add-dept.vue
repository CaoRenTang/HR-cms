<template>
  <el-dialog
    title="新增部门"
    :visible="showDialog"
    width="30%"
    @close="close"
  />
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
