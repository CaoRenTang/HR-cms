<template>
  <div class="employees-container">
    <div class="app-container">
      <el-card :body-style="{ padding: '20px' }" shadow="always">
        <div slot="header">
          <PageTools>
            <!-- 插入到left插槽位置 -->
            <template #left>
              <span>员工总人数:{{ total }}</span>
            </template>
            <!-- 插入到right插槽位置 -->
            <template #right>
              <el-button size="small" type="warning">导入excel</el-button>
              <el-button size="small" type="danger">导出excel</el-button>
              <el-button size="small" type="primary" @click="addEmployeeFn">新增员工</el-button>
            </template>
          </PageTools>
        </div>
        <div>
          <!-- table列表 -->
          <el-table
            :data="list"
            border
          >
            <el-table-column label="序号" type="index"/>
            <el-table-column label="姓名" prop="username"/>
            <el-table-column label="工号" prop="workNumber"/>
            <el-table-column label="聘用形式" prop="formOfEmployment"/>
            <el-table-column label="部门" prop="departmentName"/>
            <el-table-column label="入职时间" prop="timeOfEntry"/>
            <el-table-column label="账户状态">
              <el-switch v-model="qy"/>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="280">
              <template>
                <el-button size="small" type="text">查看</el-button>
                <el-button size="small" type="text">分配角色</el-button>
                <el-button size="small" type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页组件 -->
          <el-row
            align="middle"
            justify="center"
            style="height: 60px"
            type="flex"
          >
            <!--分页-->
            <el-pagination
              :total="total"
              :current-page="params.page"
              :page-size="params.size"
              :page-sizes="[10, 2]"
              layout="prev, pager, next"
              @current-change="changePage"
              @size-change="sizeChange"
            />
          </el-row>
        </div>
      </el-card>
      <add-employee
        :show-dialog="showDialog"
        @close-dialog="closeDialog"
      />

    </div>
  </div>
</template>

<script>
import {getEmployeeListAPI} from '@/api/employees'
import addEmployee from './components/add-employee'

export default {
  components: {
    addEmployee
  },
  data() {
    return {
      list: [], // 保存后台获取的员工信息
      params: {
        page: 1, // 当前页
        size: 10 // 每页条数
      },
      total: 0, // 总数
      showDialog: false // 控制弹层的显示隐藏
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    // 获取员工信息列表数据
    async getEmployeeList() {
      const {rows, total} = await getEmployeeListAPI(this.params)
      // console.log(rows, total)
      // 将数据显示到定义的变量中
      this.list = rows
      this.total = total
    },
    // 页码切换
    changePage(newPage) {
      this.params.page = newPage
      this.getEmployeeList()
    },
    // 每一页显示条数切换
    sizeChange(newSize) {
      this.params.size = newSize
      this.getEmployeeList()
    },
    // 转换时间的函数方法
    // formatDate(value, str = 'YYYY-MM-DD') {
    //   return dayjs(value).format(str)
    // },
    // 新增员工点击按钮
    addEmployeeFn() {
      this.showDialog = true
    },
    // 关闭弹层自定义事件
    closeDialog() {
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
