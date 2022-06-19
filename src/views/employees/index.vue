<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools>
        <!-- 插入到left插槽位置 -->
        <template #left>
          <span>总记录数：100</span>
        </template>
        <!-- 插入到right插槽位置 -->
        <template #right>
          <el-button type="warning">导入excel</el-button>
          <el-button type="danger">导出excel</el-button>
          <el-button type="primary">新增员工</el-button>
        </template>
      </page-tools>
    </div>
  </div>
</template>

<script>
import PageTools from '@/components/PageTools'

export default {
  components: {
    PageTools
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>
