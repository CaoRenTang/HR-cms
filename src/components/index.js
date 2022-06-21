// 使用vue插件注册一个全局组件
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'

export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}

