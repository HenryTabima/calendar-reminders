<template>
  <div class="calendar">
    <calendar-controls @monthChange="handleMonthChange" />
    <header class="calendar-title">{{ monthName }}</header>
    <div class="grid-container">
      <div class="calendar-header">
        <div v-for="dayOfWeek in weekDays" :key="dayOfWeek">{{ dayOfWeek }}</div>
      </div>
      <div v-for="week in calendar" :key="week[0].week()" class="calendar-week">
        <calendar-cell
          v-for="day in week"
          :key="`${monthName}-${day.format('DD-MM')}`"
          :date="day"
          :month="monthDate"
          :reminders="$store.getters['entities/reminders/filterDay'](day)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment'
import CalendarControls from './CalendarControls.vue'
import CalendarCell from './CalendarCell.vue'

export default {
  components: {
    CalendarControls,
    CalendarCell
  },
  data () {
    return {
      monthDate: new Date(),
      weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
  },
  computed: {
    monthName () {
      return moment(this.monthDate).format('MMMM').toUpperCase()
    },
    calendar () {
      // TODO Bug detected for november of 2019
      let startWeek = moment(this.monthDate).startOf('month').week()
      let endWeek = moment(this.monthDate).endOf('month').week()
      // managin edge case for December where the last week is also the number 1
      endWeek = endWeek !== 1 ? endWeek : startWeek + 4
      let calendar = []
      for (let week = startWeek; week <= endWeek; week++) {
        calendar.push(Array(7).fill(null).map((_, dayIndex) =>
          moment().week(week).startOf('week').clone().add(dayIndex, 'day')
        ))
      }
      return calendar
    }
  },
  methods: {
    handleMonthChange (date) {
      this.monthDate = date
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
