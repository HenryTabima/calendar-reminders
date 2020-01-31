<template>
  <div class="calendar-cell" @click="handleCellClick" :style="{ cursor: this.outOfMonth ? 'auto' : 'pointer' }">
    <header class="cell-header">
      <div :class="{'out-of-month': outOfMonth, 'cell-day': true}">{{ date.format('DD') }}</div>
      <div class="cell-actions" v-if="!outOfMonth">
        <div class="action-item" @click.stop="handleDeleteAll">
          <b-icon icon="delete" size="is-small" />
        </div>
      </div>
    </header>
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
      outOfMonth: moment(this.month).format('MMMM') !== this.date.format('MMMM')
    }
  },
  computed: {
    reminders () {
      return this.$store.getters['entities/reminders/filterDay'](this.date)
    }
  },
  methods: {
    handleCellClick () {
      if (this.outOfMonth) return
      this.$store.commit('SET_SELECTED_DATE', new Date(this.date.format()))
      this.$store.commit('SHOW_CREATE_MODAL')
    },
    handleDeleteAll (event) {
      this.$buefy.dialog.confirm({
        title: 'Deleting reminders',
        message: 'Are you sure you want to <b>delete</b> your reminders? This action cannot be undone.',
        confirmText: 'Delete reminders',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.$store.dispatch('entities/reminders/handleDeleteByDate', this.reminders)
      })
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
  .cell-header
    display flex
    justify-content space-between
    .cell-actions
      display flex
      .action-item
        cursor pointer
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
