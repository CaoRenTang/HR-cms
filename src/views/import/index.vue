<template>
  <div class="app-container">
    <el-card :body-style="{ padding: '20px' }" shadow="always">
      <div slot="header">
        <span>批量导入员工</span>
      </div>
      <!-- card body -->
      <UploadExcel :before-upload="beforeUpload" :on-success="handleSuccess"/>
    </el-card>
  </div>
</template>

<script>
// 导入工具方法
import {transformKeys} from '@/utils'
// 导入上传员工后台接口方法
import {importEmployeesAPI} from '@/api/employees'

export default {
  methods: {
    beforeUpload(file) {
      // console.log('上传之前校验', file)
      // 必须返回true才会继续执行
      return true
    },
    // header表头，results读取到的员工信息
    async handleSuccess({header, results}) {
      // console.log('读取到的员工信息：', header, results)
      const maps = {
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const data = transformKeys(results, maps, ['timeOfEntry', 'correctionTime'])
      // console.log(data)
      // 调用后台上传文件API
      await importEmployeesAPI(data)
      // 跳转到员工页面
      this.$router.push('/employees')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

