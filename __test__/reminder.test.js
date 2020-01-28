import store from '../src/store'
import Reminder from '../src/models/reminder'

describe('Add a new reminder (max 30 chars) with city, day and time.', () => {
  it('creates a new reminder', async () => {
    const reminder = {
      text: 'Test1',
      city: 'Cali',
      datetime: '2020-01-15T19:49:45-05:00',
      color: '#AB149E',
      id: '25085a10-4168-11ea-89a8-1b076a13ec25'
    }
    await store.dispatch('entities/reminders/create', reminder)
    const storeReminder = await Reminder.find(reminder.id)
    expect(storeReminder.id).toBe(reminder.id)
  })
})
