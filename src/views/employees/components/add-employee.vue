<template>
  <el-dialog
    :visible="showDialog"
    title="新增员工"
    @close="closeDialog"
  >
    <!-- 表单 -->
    <el-form
      ref="addForm"
      :model="formData"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入姓名" style="width:60%"/>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入手机号" style="width:60%"/>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" placeholder="请选择入职时间" style="width:60%"/>
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" placeholder="请选择" style="width:60%" value="">
          <el-option
            v-for="item in EmployeeEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" placeholder="请输入工号" style="width:60%"/>
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" placeholder="请选择部门" style="width:60%"/>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" placeholder="请选择转正时间" style="width:60%"/>
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
// 引入聘用形式数据字典
import EmployeeEnum from '@/api/constant/employees'

export default {
  name: 'AddEmployees',
  // 父组件传值
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 保存数据字典
      EmployeeEnum,
      // 表单数据对象
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 员工工号
        departmentName: '', // 员工部门名字
        timeOfEntry: '', // 员工入职日期
        correctionTime: '' // 员工转正日期
      },
      // 校验表单
      rules: {
        username: [
          {required: true, message: '用户姓名不能为空', trigger: ['blur', 'change']},
          {min: 1, max: 4, message: '用户姓名为1-4位', trigger: ['blur', 'change']}
        ],
        mobile: [
          {required: true, message: '手机号不能为空', trigger: ['blur', 'change']},
          {pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: ['blur', 'change']}
        ],
        formOfEmployment: [
          {required: true, message: '聘用形式不能为空', trigger: ['blur', 'change']}
        ],
        workNumber: [
          {required: true, message: '工号不能为空', trigger: ['blur', 'change']}
        ],
        departmentName: [
          {required: true, message: '部门不能为空', trigger: ['blur', 'change']}
        ],
        timeOfEntry: [
          {required: true, message: '请选择入职时间', trigger: ['blur', 'change']}
        ]
      }
    }
  },
  methods: {
    // 子传父将弹层的关闭回调回传到父组件中
    closeDialog() {
      this.$emit('close-dialog')
    }
  }
}
</script>

<style scoped>
</style>
