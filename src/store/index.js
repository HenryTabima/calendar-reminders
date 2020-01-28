import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import Reminder from '@/models/reminder'
import reminder from './modules/reminder'
import root from './root'

Vue.use(Vuex)

const database = new VuexORM.Database()

database.register(Reminder, reminder)

export default new Vuex.Store({
  plugins: [VuexORM.install(database)],
  ...root
})
