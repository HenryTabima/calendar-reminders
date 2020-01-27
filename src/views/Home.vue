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
  },
  async beforeMount () {
    await this.$store.dispatch('entities/reminders/fetchAll')
  }
}
</script>

<style lang="stylus">
.home
  margin-top 10px
</style>
