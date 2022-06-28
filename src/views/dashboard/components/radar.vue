<template>
  <div ref="myDiv" class="radar-echart"/>
</template>

<script>
export default {
  name: 'Radar',
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = this.echarts.init(this.$refs.myDiv)
    // 绘制图表
    myChart.setOption({
      // 标题
      // title: {
      //   text: '基础雷达图'
      // },
      tooltip: {},
      // 图例
      legend: {
        data: ['张三', '李四']
      },
      // 配置项
      radar: {
        // shape: 'circle',
        axisName: {
          // textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
          // }
        },
        // 展示数据的维度
        indicator: [
          {name: '工作效率', max: 100},
          {name: '考勤', max: 100},
          {name: '积极性', max: 100},
          {name: '帮助同事', max: 100},
          {name: '自主学习', max: 100},
          {name: '正确率', max: 100}
        ]
      },
      // 图表数据配置项
      series: [{
        type: 'radar',
        // areaStyle: {normal: {}},
        // 雷达图数据
        data: [
          {
            value: [10, 1, 100, 5, 100, 0],
            name: '张三'
          },
          {
            value: [50, 50, 50, 50, 50, 10],
            name: '李四'
          }
        ]
      }]
    })
  }
}
</script>

<style scoped>
.radar-echart {
  width: 100%;
  height: 500px;
}
</style>
