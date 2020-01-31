<template>
  <div class="calendar">
    <header class="calendar-title">{{ monthName }}</header>
    <div class="grid-container">
      <div class="calendar-header">
        <div v-for="dayOfWeek in weekDays" :key="dayOfWeek">{{ dayOfWeek }}</div>
      </div>
      <div v-for="week in calendar" :key="week[0].week()" class="calendar-week">
        <calendar-cell
          v-for="day in week"
          :key="`${monthName}-${day.format('DD-MM-YYYY')}`"
          :date="day"
          :month="monthDate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment'
import CalendarCell from './CalendarCell.vue'

export default {
  components: {
    CalendarCell
  },
  props: ['monthDate'],
  data () {
    return {
      weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
  },
  computed: {
    monthName () {
      return moment(this.monthDate).format('MMMM').toUpperCase()
    },
    calendar () {
      let startWeek = moment(this.monthDate).startOf('month').week()
      let endWeek = moment(this.monthDate).endOf('month').week()
      // managin edge case for December where the last week is also the number 1
      endWeek = endWeek !== 1 ? endWeek : startWeek + 4
      let calendar = []
      for (let week = startWeek; week <= endWeek; week++) {
        calendar.push(Array(7).fill(null).map((_, dayIndex) =>
          moment(this.monthDate).week(week).startOf('week').clone().add(dayIndex, 'day')
        ))
      }
      return calendar
    }
  }
}
</script>

<style lang="stylus">
.grid-container
  display flex
  flex-direction column
  align-items center
  padding-bottom 30px
.calendar-title
  text-align center
  font-size 2rem
  margin-top -2.5rem
  margin-bottom 0.5rem
  font-weight bold
  color #2F74B5
.calendar-header>div
  display inline-block
  width 13vw
  text-align center
  background-color #2F74B5
  color whitesmoke
  font-weight bold
  padding 3px
.calendar-week
  display flex
</style>
