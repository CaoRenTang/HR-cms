<template>
  <el-calendar v-model="currentDate">
    <template #dateCell="{ date, data }">
      <div class="date-content">
        <span class="text">{{ getDay(data.day) }}</span>
        <span v-if="isWeek(date)" class="rest">休</span>
      </div>
    </template>
  </el-calendar>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date()
    }
  },
  methods: {
    // 天
    getDay(value) {
      // time.split('-') =>['2022','06','27'] 去数组最后的一个元素，下标为2
      const day = value.split('-')[2] // 11, 02
      return day
    },
    // 是否周末
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-calendar-day {
  height: 50px;
}

.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}

// 休息时间
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}

.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}

// 当前日期
::v-deep .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
</style>
