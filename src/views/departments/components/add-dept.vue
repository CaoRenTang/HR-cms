<template>
  <el-dialog
    title="新增部门"
    :visible="showDialog"
    @close="close"
  >
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择">
          <el-option
            v-for="item in messages"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" size="small" @click.native="addDept">确定</el-button>
      <el-button size="small">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getEmployeeSimpleAPI } from '@/api/employees'
import { addDepartmentsAPI, getDepartDetailAPI } from '@/api/departments'
export default {
  name: 'AddDept',
  props: {
    // 父组件传递给子组件的变量，控制显示隐藏
    showDialog: {
      type: Boolean,
      default: false
    },
    parentNode: {
      type: Object,
      default() {
        return {}
      }
    },
    allList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    // 自定义函数校验
    const validateCode = (rule, value, callback) => {
      if (this.allList.some(item => item.code === value)) {
        callback(new Error('当前code码重复'))
      } else {
        callback()
      }
    }
    return {
      // 部门负责人列表数据
      messages: [],
      // 表单数据->和后台参数名一致
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      // 校验规则
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: ['blur', 'change'] },
          { validator: validateCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: ['blur', 'change'] }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  // 生命周期函数
  created() {
    // 调用获取部门负责人方法
    this.getPrincipal()
  },
  methods: {
    // 子传父新增
    close() {
      // 修改父组件变量的值，子传父
      this.$emit('close-dialog', this.showDialog)
      // 说明：手动清除表单数据为后期编辑作准备
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
      // 清空form表单内容
      this.$refs.deptForm.resetFields()
    },
    // 调用获取部门负责人接口
    async getPrincipal() {
      const data = await getEmployeeSimpleAPI()
      // console.log(data)
      this.messages = data
    },
    // 新增部门
    addDept() {
    // 兜底检验
      this.$refs.deptForm.validate(async(isOK) => {
        if (isOK) {
          // 校验通过，掉接口
          const data = { ...this.formData, pid: this.parentNode?.id || '' }
          await addDepartmentsAPI(data)
          // 提示添加成功
          this.$message.success('添加成功')
          // 关闭弹层
          this.$emit('close-dialog')
          // 重新获取部门数据
          this.$emit('get-department')
        }
      })
    },
    // 编辑部门数据回显
    async hGetDepartDetail(id) {
      // 调用后台接口数据方法
      const data = await getDepartDetailAPI(id)
      // console.log(data)
      // 将数据显示到表单页面中（数据回显）
      this.formData = data
    }

  }
}
</script>

<style scoped>

</style>
