<template>
  <div class="calendar-cell">
    <div :class="{'out-of-month': outOfMonth, 'cell-day': true}">{{ date.format('DD') }}</div>
    <perfect-scrollbar v-if="!outOfMonth" class="reminders-wrapper">
      <reminder v-for="reminder in reminders" :key="reminder.id" :data="reminder" />
    </perfect-scrollbar>
  </div>
</template>

<script>
import * as moment from 'moment'
import Reminder from './Reminder.vue'
export default {
  components: { Reminder },
  props: ['date', 'month'],
  data () {
    return {
      outOfMonth: moment(this.month).format('MMMM') !== this.date.format('MMMM'),
      reminders: [
        {
          id: 1,
          text: 'Hello world',
          datetime: moment(),
          city: 'San Francisco',
          color: '#6A041D'
        },
        {
          id: 2,
          text: 'Hello world',
          datetime: moment(),
          city: 'San Francisco',
          color: '#5F9FB9'
        },
        {
          id: 3,
          text: 'Hello world',
          datetime: moment(),
          city: 'San Francisco',
          color: '#F25F5C'
        },
        {
          id: 4,
          text: 'Hello world',
          datetime: moment(),
          city: 'San Francisco',
          color: '#FFE066'
        },
        {
          id: 5,
          text: 'Hello world',
          datetime: moment(),
          city: 'San Francisco',
          color: '#70C1B3'
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
.calendar-cell
  display flex
  flex-direction column
  border: 1px solid #969696
  width 13vw
  height 9vw
  padding 0 5px 5px
  .cell-day
    font-weight bold
  .out-of-month
    color lightgray !important
  .reminders-wrapper
    flex 1
  &:first-child, &:last-child
    background-color #F2F2F2
    .cell-day
      color #3C6FA2
</style>
