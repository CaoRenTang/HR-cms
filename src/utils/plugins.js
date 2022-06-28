/**
 * vue插件维护echarts
 */
// 1. 导入所有依赖
// import * as echarts from 'echarts'
// 2. 按需引入=》只导入绘制雷达图需要的依赖
import * as echarts from 'echarts/core'
import {TooltipComponent, LegendComponent} from 'echarts/components'
import {RadarChart} from 'echarts/charts'
import {CanvasRenderer} from 'echarts/renderers'

echarts.use([TooltipComponent, LegendComponent, RadarChart, CanvasRenderer])

export default {
  install(Vue) {
    // 挂载echarts=>全局可复用
    Vue.prototype.echarts = echarts
  }
}
