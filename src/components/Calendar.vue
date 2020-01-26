<template>
  <div class="calendar">
    <CalendarControls @monthChange="handleMonthChange" />
    <header class="calendar-title">{{ monthName }}</header>
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
import CalendarControls from './CalendarControls.vue'
export default {
  components: { CalendarControls },
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
      // managin edge case for december where the last week is the number 1
      endWeek = endWeek !== 1 ? endWeek : startWeek + 4
      console.log(startWeek, endWeek)
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
.calendar-cell
  display inline-block
  border: 1px solid #969696
  width 13vw
  height 9vw
  padding 0 4px
  font-weight bold
  &:first-child, &:last-child
    background-color #F2F2F2
    color #3C6FA2
</style>
