<template>
  <div class="modal-card reminder-info" style="width: auto">
    <header class="modal-card-head text-center" :style="{ 'background-color': reminder.color }">
      <p class="modal-card-title">{{ reminder.text }}</p>
    </header>
    <section class="modal-card-body">
      <p>{{ reminder.city }}</p>
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
      <button class="button is-info" @click="handleEdit">Edit</button>
      <button class="button is-danger" @click="handleDelete">Delete</button>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    reminder () {
      return this.$store.getters['entities/reminders/selected']
    }
  },
  methods: {
    handleEdit () {},
    handleDelete () { console.log('handleDelete') }
  }
}
</script>

<style lang="stylus">
.reminder-info
  .modal-card-title
    text-align center
    color whitesmoke !important
</style>
