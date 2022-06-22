<template>
  <div class="employees-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置"/>
          <el-tab-pane label="个人详情"/>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  created() {
    console.log('路由对象id:', this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
