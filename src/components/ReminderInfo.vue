<template>
  <div class="modal-card reminder-info" style="width: auto">
    <header class="modal-card-head text-center" :style="{ 'background-color': reminder.color }">
      <p class="modal-card-title">{{ reminder.text }}</p>
    </header>
    <section class="modal-card-body">
      <div>
        <h4 class="weather-title">Weather</h4>
        <p class="weather-content">
          <span>{{ reminder.city }}:</span>
          <img v-if="this.weather.icon" :src="this.weather.icon" />
          <span>{{ this.weather.text }}
          </span>
        </p>
      </div>
      <b-field label="DateTime">
        <b-datetimepicker
          :value="new Date(reminder.datetime)"
          icon="calendar-today"
          inline
          disabled
        />
      </b-field>
    </section>
    <footer class="modal-card-foot" :style="{ 'background-color': reminder.color }">
      <button class="button is-info" type="button" @click="handleEdit">Edit</button>
      <button class="button is-danger" type="button" @click="deleteReminder">Delete</button>
    </footer>
  </div>
</template>

<script>
import { getWeatherByCityAndDate } from '@/services/weather'
export default {
  data () {
    return {
      weather: {
        text: 'loading...',
        icon: null
      }
    }
  },
  computed: {
    reminder () {
      return this.$store.getters['entities/reminders/selected']
    }
  },
  methods: {
    handleEdit () {
      this.$store.commit('SHOW_EDIT_MODAL')
    },
    deleteReminder () {
      const { id } = this.reminder
      this.$buefy.dialog.confirm({
        title: 'Deleting reminder',
        message: 'Are you sure you want to <b>delete</b> your reminder? This action cannot be undone.',
        confirmText: 'Delete reminder',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch('entities/reminders/handleDelete', id)
          this.$store.commit('CLOSE_MODALS')
        }
      })
    }
  },
  async beforeMount () {
    try {
      const weather = await getWeatherByCityAndDate(this.reminder.city, this.reminder.date)
      this.weather = weather
    } catch (err) {
      this.weather.text = err
    }
  }
}
</script>

<style lang="stylus">
.reminder-info
  .modal-card-title
    text-align center
    color whitesmoke !important
  .weather-title
    font-weight bold
  .weather-content
    display flex
    justify-content space-between
    align-items center
</style>
