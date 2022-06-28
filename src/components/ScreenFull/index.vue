<template>
  <!-- 放置一个图标 -->
  <div>
    <svg-icon
      :icon-class="isFull? 'exit-fullscreen': 'fullscreen'"
      class="fullscreen"
      @click="toggleScreen"
    />
  </div>
</template>

<script>
import sf from 'screenfull'

export default {
  name: 'ScreenFull',
  data() {
    return {
      isFull: false
    }
  },
  // 监听全屏状态
  created() {
    // isEnabled组件内置方法
    if (sf.isEnabled) {
      sf.on('change', () => {
        if (sf.isFullscreen) {
          this.isFull = true
        } else {
          this.isFull = false
        }
      })
    }
  },
  beforeDestroy() {
    sf.off('change')
  },
  methods: {
    toggleScreen() {
      // 判断是否可用
      if (!sf.isEnabled) {
        // 此时全屏不可用
        this.$message.warning('此时全屏组件不可用')
        return
      }
      // 如果可用 就可以全屏
      sf.toggle()
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
