<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <div>
      <svg-icon icon-class="language" style="color: #fff; font-size: 20px"/>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="'zh' === $i18n.locale" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="'en' === $i18n.locale" command="en">
        en
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import Cookie from 'js-cookie'

export default {
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang // 设置给本地的i18n插件
      // 持久化存储当前切换的语言
      Cookie.set('hr-language', lang)
      const expires = new Date(Date.now() + 2 * 60 * 60 * 1000) // 2小时后过期
      Cookie.set('name', 123, {expires})
      this.$message.success('切换多语言成功')
    }
  }
}

</script>
