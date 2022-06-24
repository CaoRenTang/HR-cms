<template>
  <div class="box">
    <el-card :body-style="{ padding: '20px' }" shadow="always">
      <div slot="header">
        <el-row align="middle" justify="space-between" type="flex">
          <span>权限管理</span>
          <el-button type="primary" @click="addPerm(1,'0')">添加权限</el-button>
        </el-row>
      </div>
      <!-- card body -->
      <el-table :data="list" border row-key="id">
        <el-table-column label="名称" prop="name"/>
        <el-table-column label="标识" prop="code"/>
        <el-table-column label="描述" prop="description"/>
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button
              v-if="row.type === 1"
              type="text"
              @click="addPerm(2,row.id)"
            >添加
            </el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--添加权限弹层-->
    <el-dialog :visible.sync="showDialog" title="弹层标题" @close="showDialog = false">
      <!-- 表单内容 -->
      <el-form :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="权限名称">
          <el-input v-model="formData.name"/>
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="formData.code"/>
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description"/>
        </el-form-item>
        <el-form-item label="权限启用">
          <el-switch
            v-model="formData.enVisible"
            active-text="启用"
            active-value="1"
            inactive-text="不启用"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div style="text-align: right;">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {getPermissionListAPI} from '@/api/permisson'
// 导入转换树形数据的方法
import {listToTreeData} from '@/utils'

export default {
  data() {
    return {
      showDialog: false, // 控制添加弹层的显示隐藏
      list: [], // 保存列表数据
      // 表单数据对象
      formData: {
        enVisible: '0', // 开启
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型
        pid: '' // 添加到哪个节点下
      },
      // 校验规则
      rules: {
        name: [{required: true, message: '权限点名称不能为空', trigger: 'blur'}],
        code: [{required: true, message: '权限点标识不能为空', trigger: 'blur'}]
      }
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    // 获取权限列表
    async getPermissionList() {
      const res = await getPermissionListAPI()
      console.log(res)
      this.list = listToTreeData(res)
    },
    // 添加权限点击事件
    addPerm(type, pid) {
      // 1.显示弹层
      this.showDialog = true
      // 储存新增权限的type和pid值
      this.formData.type = type
      this.formData.pid = pid
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
