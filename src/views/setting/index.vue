<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="padding: 10px 0">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table
              :data="roleList"
            >
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                layout="prev,pager,next"
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleListAPI } from '@/api/setting'
export default {
  name: 'Setting',
  data() {
    return {
      roleList: [], // 保存角色信息
      page: {
        // 放置页码及相关数据
        page: 1, // 当前页码数
        pagesize: 10, // 每一页显示的数量
        total: 0 // 记录总数
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const { total, rows } = await getRoleListAPI(this.page)
      // console.log(total, rows)
      this.page.total = total
      // 将数据保存到定义的数组中
      this.roleList = rows
    },
    // 页码逻辑
    changePage(newPage) {
      this.page.page = newPage // 将当前页码赋值给当前的最新页码
      this.getRoleList()
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
