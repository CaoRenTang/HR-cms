<template>
  <div class="boxs">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <el-row>
          <el-col :span="20">
            <span>{{ company }}</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>负责人</el-col>
              <!-- 下拉菜单 element -->
              <el-col>
                <el-dropdown>
                  <span> 操作<i class="el-icon-arrow-down" /> </span>
                  <el-dropdown-menu slot="dropdown">
                    <!--  addDialog函数需要传递null，否则将传递事件对象                  -->
                    <el-dropdown-item @click.native="addDialog(null)">添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <!-- 树形组件-->
      <!-- props修改后台返回的字段名不一致时使用，不叫label和children     -->
      <el-tree
        :data="treeData"
        :props="defaultProps"
        :default-expand-all="true"
      >
        <!-- #default默认插槽名，作用域插槽，拿到当前树形节点的数据，解构赋值-->
        <template #default="{ data }">
          <el-row
            style="width: 100%;"
          >
            <el-col :span="20">
              <span>{{ data.name }}</span>
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <!-- 两个内容 -->
                <el-col>{{ data.manager }}</el-col>
                <el-col>
                  <!-- 下拉菜单 element -->
                  <el-dropdown>
                    <span> 操作<i class="el-icon-arrow-down" /> </span>
                    <!-- 下拉菜单 -->
                    <el-dropdown-menu slot="dropdown">
                      <!--添加一级部门下的子孙部门-->
                      <el-dropdown-item @click.native="addDialog(data,1)">添加子部门</el-dropdown-item>
                      <el-dropdown-item @click.native="addDialog(data,2)">编辑部门</el-dropdown-item>
                      <!--.native事件穿透-->
                      <el-dropdown-item @click.native="delPart(data)">删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-tree>
      <!--      新增部门弹层组件-->
      <!--      ref用来调取子组件的方法-->
      <add-dept
        ref="addDepart"
        :show-dialog="showDialog"
        :parent-node="parentNode"
        :all-list="allList"
        :title="title"
        @get-department="hGetDepartments"
        @close-dialog="closeDialog"
      />
    </el-card>
  </div>
</template>

<script>
// 导入接口
import { getDepartmentsAPI, delDepartmentsAPI } from '@/api/departments'
// 导入转换树形数据的方法
import { listToTreeData } from '@/utils/index.js'
// 引入新增组件
import AddDept from './components/add-dept'
export default {
  name: 'Departments',
  // 注册组件
  components: {
    AddDept
  },
  data() {
    return {
      title: '', // 新增编辑头部
      parentNode: null, // 保存顶级部门
      allList: [], // 没有转换的树形解构
      treeData: [], // 保存后台获取的树形控件数据
      company: '', // 定义变量，保存后台返回的公司名称
      // 后端返回的字段名不一致时修改
      defaultProps: {
        children: 'children',
        // 后端返回的组织架构名字为name
        label: 'name'
      },
      // 控制新增窗口的显示隐藏
      showDialog: false
    }
  },
  created() {
    // 调用获取列表数据方法
    this.hGetDepartments()
  },
  methods: {
    // 获取组织架构部门树形数据
    async hGetDepartments() {
      const res = await getDepartmentsAPI()
      // console.log(res)
      this.treeData = res.depts
      this.company = res.companyName
      // console.log(this.treeData)
      this.allList = res.depts
      // console.table(this.allList)
      // 转换树形数据
      this.treeData = listToTreeData(res.depts)
    },
    // 点击事件->删除部门数据
    delPart(data) {
      console.log(data)
      // 提示用户删除信息
      this.$confirm(`确认要删除:${data.name}`, '温馨提示').then(async() => {
        // 确定
        // 判断如果有子部门不能删除
        if (data.children && data.children.length > 0) {
          return this.$message.error('当前部门下有子部门，不能删除')
        }
        // 调用删除接口,删除操作成功
        await delDepartmentsAPI(data.id)
        // 删除成功提示
        this.$message.success('删除部门成功')
        // 刷新列表数据
        await this.hGetDepartments()
      }).catch(error => {
        // 取消
        console.log(error)
      })
    },
    // 点击事件-> 新增部门
    // type标识 1为新增，2为编辑
    addDialog(parentNode, type) {
      // 新增
      this.showDialog = true
      this.title = '新增部门'
      this.parentNode = parentNode

      if (type === 2) {
        // 编辑
        this.title = '编辑部门'
        this.$refs.addDepart.hGetDepartDetail(parentNode.id)
      }
    },
    // 关闭子组件的弹出框
    closeDialog() {
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tree-node__content {
  margin: 3px 0;
  font-size: 14px;
}
</style>
