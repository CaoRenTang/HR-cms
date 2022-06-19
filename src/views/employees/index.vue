<template>
  <div class="employees-container">
    <div class="app-container">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <div slot="header">
          <PageTools>
            <!-- 插入到left插槽位置 -->
            <template #left>
              <span>总记录数：100条</span>
            </template>
            <!-- 插入到right插槽位置 -->
            <template #right>
              <el-button type="warning" size="small">导入excel</el-button>
              <el-button type="danger" size="small">导出excel</el-button>
              <el-button type="primary" size="small">新增员工</el-button>
            </template>
          </PageTools>
        </div>
        <div>
          <!-- table列表 -->
          <el-table
            border
            :data="list"
          >
            <el-table-column label="序号" type="index" />
            <el-table-column label="姓名" prop="username" />
            <el-table-column label="工号" prop="workNumber" />
            <el-table-column label="聘用形式" prop="formOfEmployment" />
            <el-table-column label="部门" prop="departmentName" />
            <el-table-column label="入职时间" prop="timeOfEntry" />
            <el-table-column label="账户状态" />
            <el-table-column label="操作" fixed="right" width="280">
              <template>
                <el-button type="text" size="small">查看</el-button>
                <el-button type="text" size="small">分配角色</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页组件 -->
          <el-row
            type="flex"
            justify="center"
            align="middle"
            style="height: 60px"
          >
            <el-pagination layout="prev, pager, next" />
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeListAPI } from '@/api/employees'
export default {
  components: {
  },
  data() {
    return {
      list: [], // 保存后台获取的员工信息
      params: {
        page: 1, // 当前页
        size: 10 // 每页条数
      },
      total: 0 // 总数
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      const { rows, total } = await getEmployeeListAPI(this.params)
      console.log(rows, total)
      // 将数据显示到定义的变量中
      this.list = rows
      this.total = total
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
