<template>
  <div class="reminder-item" :style="{ 'background-color': data.color }">
   <span class="reminder-datetime">{{ data.datetime.format('HH:mm') }}</span>
   <div class="reminder-tes">{{ data.text }}</div>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang="stylus">
.reminder-item
  color whitesmoke
  padding 0 5px
  border-radius 4px
  display flex
  align-items center
  .reminder-datetime
    font-size 0.6rem
    margin-right 5px
</style>
