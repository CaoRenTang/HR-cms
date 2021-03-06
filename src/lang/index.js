import Vue from 'vue' // 引入Vue
import VueI18n from 'vue-i18n' // 引入国际化的插件包
import elementEN from 'element-ui/lib/locale/lang/en' // 引入饿了么的英文包
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 引入饿了么的中文包
// 引入自定义中文包
import customZH from './zh'
// 引入自定义英文包
import customEN from './en'
// 持久化存储当前切换的语言
import Cookie from 'js-cookie'

Vue.use(VueI18n) // 全局注册国际化包

// 创建国际化插件的实例
const i18n = new VueI18n({
  // 指定语言类型 zh表示中文  en表示英文
  locale: Cookie.get('hr-language') || 'zh',
  messages: {
    // 英文环境下的语言数据
    en: {
      ...elementEN,
      ...customEN // 将自定义英文包加入
    }, // 中文环境下的语言数据
    zh: {
      ...elementZH,
      ...customZH // 将自定义中文包加入
    }
  }
})
// 导出多语实例
export default i18n
