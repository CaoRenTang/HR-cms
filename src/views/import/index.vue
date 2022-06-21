<template>
  <div class="app-container">
    <el-card :body-style="{ padding: '20px' }" shadow="always">
      <div slot="header">
        <span>批量导入员工</span>
      </div>
      <!-- card body -->
      <UploadExcel/>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>

