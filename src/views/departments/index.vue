<template>
  <div class="boxs">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <el-row>
          <el-col :span="20">
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>负责人</el-col>
              <!-- 下拉菜单 element -->
              <el-col>
                <el-dropdown>
                  <span> 操作<i class="el-icon-arrow-down" /> </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      页面内容
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
</style>
