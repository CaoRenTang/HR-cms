<template>
  <div class="employees-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="个人详情">
            <div class="app-container">
              <!-- 个人信息 -->
              <el-form
                ref="detailFrom"
                :model="formData"
                :rules="rules"
                label-width="100px"
              >
                <!-- 用户名 -->
                <el-row class="inline-info">
                  <el-col :span="12">
                    <el-form-item label="用户名" prop="username">
                      <el-input v-model="formData.username"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 手机号 -->
                <el-row class="inline-info">
                  <el-col :span="12">
                    <el-form-item label="手机号">
                      <el-input v-model="formData.mobile" disabled/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 入职时间 -->
                <el-row class="inline-info">
                  <el-col :span="12">
                    <el-form-item label="入职时间">
                      <el-date-picker
                        v-model="formData.timeOfEntry"
                        class="inputW"
                        type="date"
                        value-format="yyyy-MM-dd"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 员工照片 -->
                <el-row class="inline-info">
                  <el-col :span="12">
                    <el-form-item label="员工头像">
                      <!-- 放置上传图片 -->
                      <!--<el-image :src="require('@/assets/common/head.jpg')" />-->
                      <UploadImg
                        :staff-photo="formData.staffPhoto"
                        @change-photo="changePhoto"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 保存个人信息 -->
                <el-row class="inline-info" justify="center" type="flex">
                  <el-col :span="12">
                    <el-button type="primary" @click="updateData">保存更新</el-button>
                    <el-button @click="$router.back()">返回</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import {getUserDetailByIdAPI} from '@/api/user'
import {saveUserDetailByIdAPI} from '@/api/employees'

export default {
  name: 'Detail',
  data() {
    return {
      // 表单数据对象
      formData: {
        username: '',
        timeOfEntry: '',
        // 头像
        staffPhoto: ''
      },
      // 校验规则
      rules: {
        username: [{required: true, message: '用户名必填！', trigger: 'change'}]
      }
    }
  },
  created() {
    // console.log('路由对象id:', this.$route.params.id)
    this.getDetail()
  },
  methods: {
    // 修改头像地址
    changePhoto(newUrl) {
      console.log('云图片地址：', newUrl)
      this.formData.staffPhoto = newUrl
    },
    // 获取员工详情
    async getDetail() {
      const res = await getUserDetailByIdAPI(this.$route.params.id)
      // console.log(res)
      // 添加头像回显问题
      if (!res.staffPhoto) {
        res.staffPhoto = ''
      }
      this.formData = res
    },
    updateData() {
      // 兜底校验
      this.$refs.detailFrom.validate(async (isOK) => {
        if (isOK) {
          // 校验通过
          await saveUserDetailByIdAPI(this.formData)
          // 提示修改成功
          this.$message.success('修改成功')
          // 更新vuex当前登录人信息(如实现当前修改用户名和登录账号一致使用)
          // await this.$store.dispatch('/user/getUserInfoAction')
          // 返回到员工管理页面
          this.$router.push('/employees')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
