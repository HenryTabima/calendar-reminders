import Reminder from '@/models/reminder'
import reminderService from '@/services/reminder'
import * as moment from 'moment'
import uuid from 'uuid/v1'

const reminderModule = {
  state: {
    selectedID: null
  },
  actions: {
    async fetchAll ({ commit }) {
      commit('START_LOADING', null, { root: true })
      const reminders = await reminderService.getAll()
      if (reminders.length > 0) {
        Reminder.insert({ data: reminders })
      }
      commit('STOP_LOADING', null, { root: true })
    },
    async handleCreate ({ commit }, reminder) {
      commit('START_LOADING', null, { root: true })
      reminder.datetime = moment(reminder.datetime).format()
      reminder.color = reminder.color.hex
      reminder.id = uuid()
      await reminderService.create(reminder)
      await Reminder.insert({ data: reminder })
      commit('STOP_LOADING', null, { root: true })
    },
    async handleEdit ({ commit }, reminder) {
      commit('START_LOADING', null, { root: true })
      reminder.datetime = moment(reminder.datetime).format()
      reminder.color = reminder.color.hex
      delete reminder.$id
      await reminderService.update(reminder)
      await Reminder.update({
        where: reminder.id,
        data: reminder
      })
      commit('STOP_LOADING', null, { root: true })
    },
    async handleDelete ({ commit }, id) {
      commit('START_LOADING', null, { root: true })
      await reminderService.delete(id)
      await Reminder.delete(id)
      commit('SELECT_REMINDER', null)
      commit('STOP_LOADING', null, { root: true })
    },
    async handleDeleteByDate ({ commit }, reminders) {
      commit('START_LOADING', null, { root: true })
      const deletedReminders = reminders.map(({ id }) => reminderService.delete(id))
      await Promise.all(deletedReminders)
      await Promise.all(
        reminders.map(({ id }) => Reminder.delete(id))
      )
      commit('STOP_LOADING', null, { root: true })
    }
  },
  mutations: {
    SELECT_REMINDER (state, id) {
      state.selectedID = id
    }
  },
  getters: {
    filterDay () {
      return day =>
        Reminder.query().where(reminder => {
          const reminderDay = moment(reminder.datetime).format('YYYY-MM-DD')
          const cellDay = day.format('YYYY-MM-DD')
          return reminderDay === cellDay
        }).orderBy('datetime')
          .get()
    },
    selected (state) {
      return Reminder.find(state.selectedID)
    }
  }
}

export default reminderModule
