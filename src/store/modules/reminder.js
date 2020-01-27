import Reminder from '@/models/reminder'
import reminderService from '@/services/reminder'
import * as moment from 'moment'

const reminderModule = {
  actions: {
    async fetchAll () {
      const reminders = await reminderService.getAll()
      if (reminders.length > 0) {
        Reminder.insert({ data: reminders })
      }
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
