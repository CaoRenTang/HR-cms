// 使用vue插件注册一个全局组件
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import UploadImg from './UploadImg'

export default {
  install(Vue) {
    Vue.component('UploadImg', UploadImg)
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}

