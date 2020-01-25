<template>
  <div class="calendar">
    <div class="grid-container">
      <div class="calendar-header">
        <div v-for="dayOfWeek in weekDays" :key="dayOfWeek">{{ dayOfWeek }}</div>
      </div>
      <div v-for="week in calendar" :key="week[0].week()" class="calendar-week">
        <div v-for="day in week" :key="day.format('DD-MM')" class="calendar-cell">
          {{ day.format('DD') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment'
export default {
  data () {
    const weekOfTheMonth = moment().endOf('month').week()
    return {
      calendar: Array(weekOfTheMonth).fill(null).map((_, weekIndex) =>
        Array(7).fill(null).map((_, dayIndex) =>
          moment().week(weekIndex + 1).startOf('week').clone().add(dayIndex, 'day')
        )
      ),
      weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
  }
}
</script>

<style lang="stylus">
.calendar
  display flex
  justify-content center
.calendar-header>div
  display inline-block
  width 13vw
  text-align center
  background-color #2F74B5
  color whitesmoke
  font-weight bold
  padding 3px
.calendar-cell
  display inline-block
  border: 1px solid rgba(0, 0, 0, 0.4)
  width 13vw
  height 9vw
  padding 0 4px
  font-weight bold
  &:first-child, &:last-child
    background-color #F2F2F2
    color #2F74B5
</style>
