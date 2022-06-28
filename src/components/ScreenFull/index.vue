<template>
  <!-- 放置一个图标 -->
  <div>
    <svg-icon class="fullscreen" icon-class="fullscreen" @click="toggleScreen"/>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'ScreenFull',
  methods: {
    toggleScreen() {
      // 判断是否可用
      if (!screenfull.isEnabled) {
        // 此时全屏不可用
        this.$message.warning('此时全屏组件不可用')
        return
      }
      //   如果可用 就可以全屏
      screenfull.toggle()
    }
  }
}
</script>

<style lang="scss" scoped>
.fullscreen {
  width: 20px;
  height: 20px;
  color: #fff;
  cursor: pointer;
}
</style>
