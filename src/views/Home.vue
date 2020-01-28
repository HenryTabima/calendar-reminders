<template>
  <div class="home">
    <calendar-controls @monthChange="handleMonthChange" @addReminderClick="handleAddReminderClick()"/>
    <Calendar :monthDate="month"/>
    <b-modal
      :active="isCreateFormActive"
      scroll="keep"
      trap-focus
      has-modal-card
      @close="handleClose"
    >
      <reminder-form />
    </b-modal>
    <b-modal
      :active="isEditFormActive"
      scroll="keep"
      trap-focus
      has-modal-card
      @close="handleClose"
    >
      <reminder-form :edit="true" />
    </b-modal>
    <b-modal
      :active="isReminderInfoActive"
      scroll="keep"
      trap-focus
      has-modal-card
      @close="handleClose"
    >
      <reminder-info />
    </b-modal>
  </div>
</template>

<script>
import CalendarControls from '@/components/CalendarControls.vue'
import Calendar from '@/components/Calendar.vue'
import ReminderForm from '@/components/ReminderForm.vue'
import ReminderInfo from '@/components/ReminderInfo.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    CalendarControls,
    Calendar,
    ReminderForm,
    ReminderInfo
  },
  async beforeMount () {
    await this.$store.dispatch('entities/reminders/fetchAll')
  },
  data () {
    return {
      month: new Date()
    }
  },
  computed: mapState(['isCreateFormActive', 'isEditFormActive', 'isReminderInfoActive']),
  methods: {
    handleMonthChange (date) {
      this.month = date
    },
    handleAddReminderClick () {
      this.$store.commit('SHOW_CREATE_MODAL')
    },
    handleClose () {
      this.$store.commit('CLOSE_MODALS')
    }
  }
}
</script>

<style lang="stylus">
.home
  margin-top 10px
</style>
