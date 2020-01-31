import Reminder from '@/models/reminder'
import reminderService from '@/services/reminder'
import * as moment from 'moment'
import uuid from 'uuid/v1'

const reminderModule = {
  state: {
    selectedID: null
  },
  actions: {
    async fetchAll () {
      const reminders = await reminderService.getAll()
      if (reminders.length > 0) {
        Reminder.insert({ data: reminders })
      }
    },
    async handleCreate (store, reminder) {
      reminder.datetime = moment(reminder.datetime).format()
      reminder.color = reminder.color.hex
      reminder.id = uuid()
      await reminderService.create(reminder)
      await Reminder.insert({ data: reminder })
    },
    async handleEdit (store, reminder) {
      reminder.datetime = moment(reminder.datetime).format()
      reminder.color = reminder.color.hex
      delete reminder.$id
      await reminderService.update(reminder)
      await Reminder.update({
        where: reminder.id,
        data: reminder
      })
    },
    async handleDelete ({ commit }, id) {
      await reminderService.delete(id)
      await Reminder.delete(id)
      commit('SELECT_REMINDER', null)
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
