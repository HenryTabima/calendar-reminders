<template>
  <div class="home">
    <Calendar />
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'home',
  components: {
    Calendar
  }
}
</script>

<style lang="stylus">
.home
  margin-top 10px
</style>
