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
    async create (store, reminder) {
      reminder.datetime = moment(reminder.datetime).format()
      reminder.color = reminder.color.hex
      reminder.id = uuid()
      await reminderService.create(reminder)
      Reminder.insert({ data: reminder })
    }
  },
  mutations: {
    SELECT (state, id) {
      state.selectedID = id
    }
  },
  getters: {
    filterDay () {
      return day =>
        Reminder.query().where(reminder => {
          const reminderDay = moment(reminder.datetime).format('MM-DD')
          const cellDay = day.format('MM-DD')
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
