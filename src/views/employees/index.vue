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
          <!--
              1. 通过 Table 的default-sort属性设置默认的排序列和排序顺序
              2. 排序方式：ascending 升序（从小到大）   descending 降序（从大到小）
              3.sortable 用来开启前端自排序，传一个布尔值，默认值false
          -->
          <el-table
            :data="list"
            :default-sort="{prop: 'timeOfEntry', order: 'descending'}"
            border
          >
            >
            <el-table-column label="序号" type="index"/>
            <el-table-column label="姓名" prop="username"/>
            <el-table-column label="工号" prop="workNumber" sortable/>
            <el-table-column label="聘用形式" prop="formOfEmployment">
              <template #default="{row}">
                {{ formatEmploy(row.formOfEmployment) }}
              </template>
            </el-table-column>
            <el-table-column label="部门" prop="departmentName"/>
            <el-table-column label="入职时间" prop="timeOfEntry" sortable>
              <template #default="{row}">
                {{ formatDate(row.timeOfEntry) }}
              </template>
            </el-table-column>
            <el-table-column label="账户状态">
              <el-switch v-model="qy"/>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="280">
              <template #default="{row}">
                <el-button size="small" type="text">查看</el-button>
                <el-button size="small" type="text">分配角色</el-button>
                <el-button size="small" type="text" @click="delEmployFn(row)">删除</el-button>
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
              :current-page="params.page"
              :page-size="params.size"
              :page-sizes="[10, 2]"
              :total="total"
              background
              layout="prev, pager, next,sizes"
              @current-change="changePage"
              @size-change="sizeChange"
            />
          </el-row>
        </div>
      </el-card>
      <!--      :showDialog向子组件中传递变量，控制显示隐藏-->
      <add-employee
        :show-dialog="showDialog"
        @close-dialog="closeDialog"
      />

    </div>
  </div>
</template>

<script>
import {getEmployeeListAPI, delEmployeeAPI} from '@/api/employees'
import addEmployee from './components/add-employee'
// 导入数据字典
import Types from '@/api/constant/employees'
// 导入时间格式化插件
import dayjs from 'dayjs'

export default {
  components: {
    addEmployee
  },
  data() {
    return {
      // 储存数据字典
      Types: Types,
      list: [], // 保存后台获取的员工信息
      params: {
        page: 1, // 当前页
        size: 2 // 每页条数
      },
      total: 0, // 总数
      showDialog: false, // 控制弹层的显示隐藏
      qy: false // 开关组件的开启关闭状态 false为关闭
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    // 格式化聘用形式
    formatEmploy(type) {
      // console.log('数据字典', this.Types.hireType)
      const hire_type = this.Types.hireType
      // map={1:'正式',2:'非正式'}
      const map = {}
      hire_type.forEach(item => {
        map[item.id] = item.value
      })
      return map[type]
    },
    // 格式化入职时间
    formatDate(value) {
      return dayjs(value).format('YYYY年MM月DD日')
    },
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
    // 新增员工点击按钮
    addEmployeeFn() {
      this.showDialog = true
    },
    // 关闭弹层自定义事件
    closeDialog() {
      this.showDialog = false
    },
    // 删除员工的点击事件->传入id
    async delEmployFn(row) {
      // 删除前提示
      this.$confirm(`你确认要删除员工${row.username}', '温馨提示`).then(async () => {
        // 调用删除接口
        await delEmployeeAPI(row.id)
        // 提示删除成功
        this.$message.success('删除成功')
        // 重新获取列表数据
        await this.getEmployeeList()
      }).catch(error => {
        console.log(error)
      })
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
