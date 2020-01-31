import { Model } from '@vuex-orm/core'

class Reminder extends Model {
  static get entity () {
    return 'reminders'
  }

  static fields () {
    return {
      id: this.attr(null),
      text: this.attr(''),
      datetime: this.attr(''),
      city: this.attr(''),
      color: this.attr('')
    }
  }
}

export default Reminder
