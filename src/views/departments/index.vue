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
      <!-- 树形组件-->
      页面内容
      <el-tree
        :data="treeData"
        :props="defaultProps"
        :default-expand-all="true"
      >
        <template #default="{ data }">
          <el-row
            style="width: 100%;"
          >
            <el-col :span="20">
              <span>{{ data.name }}</span>
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <!-- 两个内容 -->
                <el-col>{{ data.manager }}</el-col>
                <el-col>
                  <!-- 下拉菜单 element -->
                  <el-dropdown>
                    <span> 操作<i class="el-icon-arrow-down" /> </span>
                    <!-- 下拉菜单 -->
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑部门</el-dropdown-item>
                      <el-dropdown-item>删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import { getDepartmentsAPI } from '@/api/departments'
export default {
  name: 'Departments',
  data() {
    return {
      treeData: [], // 保存后台获取的树形控件数据
      company: { name: '' },
      // 后端返回的字段名不一致时使用
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  mounted() {
    this.hGetDepartments()
  },
  methods: {
    // 获取树形数据
    async hGetDepartments() {
      const res = await getDepartmentsAPI()
      // console.log(res)
      this.treeData = res.depts
      console.log(this.treeData)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tree-node__content {
  margin: 3px 0;
  font-size: 14px;
}
</style>
