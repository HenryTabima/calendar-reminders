<template>
  <div class="reminder-item" :style="{ 'background-color': data.color }">
   <span class="reminder-datetime">{{ getTime(data.datetime) }}</span>
   <div class="reminder-tes">{{ data.text }}</div>
  </div>
</template>

<script>
import * as moment from 'moment'
export default {
  props: ['data'],
  methods: {
    getTime (datetime) {
      return moment(datetime).format('HH:MM')
    }
  }
}
</script>

<style lang="stylus">
.reminder-item
  color whitesmoke
  padding 0 5px
  border-radius 7px
  display flex
  align-items center
  margin-bottom 1px
  .reminder-datetime
    font-size 0.6rem
    margin-right 5px
</style>
