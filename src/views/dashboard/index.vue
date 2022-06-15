<template>
  <div class="dashboard-container">
    <!--    <div class="dashboard-text">name: {{ name }}</div>-->
    <div class="title">标题Scss样式</div>
    <div class="box">
      <p>我是段落文字</p>
    </div>
    <ul class="menu">
      <li><a href="">首页</a></li>
      <li><a href="">我的</a></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
$red: #e70404;
$border: 1px solid #0750ee;
.title {
  color: $red;
  border: $border
}

.box {
  p {
    font-size: 14px;
    color: $red
  }
}

.menu {
  li {
    font-size: 12px;

    a {
      color: blue;

      &:hover {
        color: #000
      }
    }
  }
}

.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
