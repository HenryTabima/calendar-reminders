import Reminder from '@/models/reminder'
import reminderService from '@/services/reminder'
import * as moment from 'moment'
import uuid from 'uuid/v1'

const reminderModule = {
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
  getters: {
    filterDay () {
      return day =>
        Reminder.query().where(reminder => {
          const reminderDay = moment(reminder.datetime).format('MM-DD')
          const cellDay = day.format('MM-DD')
          return reminderDay === cellDay
        }).orderBy('datetime')
          .get()
    }
  }
}

export default reminderModule
