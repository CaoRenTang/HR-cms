<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <div class="app-breadcrumb">
      {{ $t('navbar.title') }}
      <span class="breadBtn">体验版</span>
    </div>

    <div class="right-menu">
      <!-- 控制全屏 -->
      <ScreenFull class="ricon"/>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-imgError="defImg" :src="avatar" class="user-avatar">
          <span class="name">{{ name }}</span>
          <i class="el-icon-caret-bottom" style="color:#fff"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a href="https://gitee.com" target="_blank">
            <el-dropdown-item>
              项目地址
            </el-dropdown-item>
          </a>
          <!--点击退出登录-->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
// 映射vuex的数据
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
// 导入默认头像图片
import defImg from '@/assets/common/bigUserHeader.png'

export default {
  components: {
    Hamburger
  },
  data() {
    return {
      defImg
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // 点击事件->弹出确认框，确认后退出系统清空token
    async logout() {
      // 退出提示框
      this.$confirm('确认退出登录吗？', '提示').then(() => {
        // 确认,调用vuex中定义的退出登录的方法
        this.$store.dispatch('user/logoutAction')
        // 跳转到登录页面
        this.$router.push('/login')
      }).catch(() => {
        // 取消
        console.log(222)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
//全屏显示按钮样式
.ricon {
  display: inline-block;
  vertical-align: middle;
  margin-right: 20px;
}

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  background: #fff -webkit-linear-gradient(left, #5b8cff, #3d6df8);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 15px;
          vertical-align: middle;
        }

        .name {
          color: #fff;
          vertical-align: middle;
          margin-left: 5px;
        }

        .user-dropdown {
          color: #fff;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}

.app-breadcrumb {
  display: inline-block;
  font-size: 18px;
  line-height: 50px;
  margin-left: 10px;
  color: #ffffff;
  cursor: text;

  .breadBtn {
    background: #84a9fe;
    font-size: 14px;
    padding: 0 10px;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    margin-left: 15px;
  }
}
</style>
