<template>
  <div class="employees-container">
    <div class="app-container">
      <el-card :body-style="{ padding: '20px' }" shadow="always">
        <div slot="header">
          <PageTools>
            <!-- 插入到left插槽位置 -->
            <template #left>
              <span>员工总人数:{{ total }} - 全局变量{{ num }}</span>
            </template>
            <!-- 插入到right插槽位置 -->
            <template #right>
              <el-button size="small" type="warning" @click="$router.push('/import')">导入excel</el-button>
              <el-button
                :loading="downloadLoading"
                size="small"
                type="danger"
                @click="exportData"
              >导出excel
              </el-button>
              <el-button
                v-if="checkPoints('p-em-add')"
                size="small"
                type="primary"
                @click="addEmployeeFn"
              >新增员工
              </el-button>
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
            <el-table-column label="头像" prop="staffPhoto">
              <template #default="{row}">
                <el-image :src="row.staffPhoto" class="staff" @click="clickShowCodeDialog(row.staffPhoto)"/>
              </template>
            </el-table-column>
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
                <el-button size="small" type="text" @click="$router.push(`/employees/detail/${row.id}`)">查看
                </el-button>
                <el-button size="small" type="text" @click="distribute(row.id)">分配角色</el-button>
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
              :page-sizes="[2,5,10]"
              :total="total"
              background
              layout="prev, pager, next,sizes"
              @current-change="changePage"
              @size-change="sizeChange"
            />
          </el-row>
        </div>
      </el-card>
      <!--  新增员工弹层    :showDialog向子组件中传递变量，控制显示隐藏-->
      <add-employee
        :show-dialog="showDialog"
        @close-dialog="closeDialog"
      />
      <!-- 分享展示, 预览的二维码的弹层 -->
      <el-dialog
        :visible="showCodeDialog"
        title="头像二维码"
        width="250px"
        @close="showCodeDialog = false"
      >
        <!-- 二维码 -->
        <el-row justify="center" type="flex">
          <canvas ref="cv"/>
        </el-row>
      </el-dialog>
      <!--      员工分配角色-->
      <AssignRole
        ref="roles"
        :show-role-dialog.sync="showRoleDialog"
      />
    </div>
  </div>
</template>

<script>
import {getEmployeeListAPI, delEmployeeAPI} from '@/api/employees'
import addEmployee from './components/add-employee'
import AssignRole from './components/assign-role'
// 导入数据字典
import Types from '@/api/constant/employees'
// 导入时间格式化插件
import dayjs from 'dayjs'
// 导入导出实现的函数方法
import {transformTdata} from '@/utils'
import QrCode from 'qrcode'

export default {
  components: {
    addEmployee,
    AssignRole
  },
  data() {
    return {
      // 控制分配弹层显示隐藏
      showRoleDialog: false,
      // 导出loading效果
      downloadLoading: false,
      // 储存数据字典
      Types: Types,
      list: [], // 保存后台获取的员工信息
      params: {
        page: 1, // 当前页
        size: 2 // 每页条数
      },
      total: 0, // 总数
      showDialog: false, // 控制弹层的显示隐藏
      showCodeDialog: false, // 二维码显示隐藏
      qy: false // 开关组件的开启关闭状态 false为关闭
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    // 图片二维码点击事件
    clickShowCodeDialog(newUrl) {
      this.showCodeDialog = true
      this.$nextTick(() => {
        QrCode.toCanvas(this.$refs.cv, newUrl)
      })
    },
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
        // 解决删除最后一页面显示无数据bug
        if (this.list.length === 1) {
          if (this.params.page > 1) {
            this.params.page--
          }
        }
        // 重新获取列表数据
        await this.getEmployeeList()
      }).catch(error => {
        console.log(error)
      })
    },
    // 导出员工信息（下载到本地）
    exportData() {
      this.downloadLoading = true
      // import('@/utils/Export2Excel') 异步懒加载模块
      // 因为：excel导出代码量比较大而且功能使用频率不高，
      // 所以采用懒加载方式，点击使用的时候采取加载这个模块
      import('@/utils/Export2Excel').then(excel => {
        // 1.准备导出数据的map对象：包含要导出员工信息的表头（中文属性名）和员工信息的表头（英文属性名）
        const map = {
          '手机号': 'mobile',
          '姓名': 'username',
          '入职日期': 'timeOfEntry',
          '聘用形式': 'formOfEmployment',
          '工号': 'workNumber',
          '转正日期': 'correctionTime',
          '部门': 'departmentName'
        }
        // 2.核心：准备excel表头和数据,Object.keys()可以获取对象的key值
        const tHeader = Object.keys(map)
        // 3.说明❓：二维数据
        const data = transformTdata(this.list, Object.values(map))
        console.log('转换后的二维数组', data)
        // 4.使用excel.export_json_to_excel 方法实现导出
        excel.export_json_to_excel({
          header: tHeader, // excel文件表头
          data, // 导出excel数据
          filename: `员工信息-${Math.random()}`, // 下载保存到本地电脑excel文件名
          autoWidth: true, // 单元格自适应
          bookType: 'xlsx' // 导出文件格式
        })
        this.downloadLoading = false
      })
    },
    // 分配权限点击事件
    distribute(id) {
      this.showRoleDialog = true
      // 调用子组件中的方法
      this.$refs.roles.getRolesById(id)
    }

  }
}
</script>

<style lang="scss" scoped>
.staff {
  width: 70px;
  height: 70px;
  border-radius: 100%;
}
</style>
