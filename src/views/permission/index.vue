<template>
  <div class="box">
    <el-card :body-style="{ padding: '20px' }" shadow="always">
      <div slot="header">
        <el-row align="middle" justify="space-between" type="flex">
          <span>权限管理</span>
          <el-button type="primary">添加权限</el-button>
        </el-row>
      </div>
      <!-- card body -->
      <el-table :data="list" border row-key="id">
        <el-table-column label="名称" prop="name"/>
        <el-table-column label="标识" prop="code"/>
        <el-table-column label="描述" prop="description"/>
        <el-table-column label="操作">
          <template>
            <el-button type="text">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {getPermissionListAPI} from '@/api/permisson'
// 导入转换树形数据的方法
import {listToTreeData} from '@/utils'

export default {
  data() {
    return {
      list: [] // 保存列表数据
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const res = await getPermissionListAPI()
      console.log(res)
      this.list = listToTreeData(res)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
