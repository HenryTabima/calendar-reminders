export default {
  state: {
    isCreateFormActive: false,
    isEditFormActive: false,
    isReminderInfoActive: false
  },
  mutations: {
    SHOW_CREATE_MODAL (state) {
      state.isCreateFormActive = true
      state.isEditFormActive = false
      state.isReminderInfoActive = false
    },
    SHOW_EDIT_MODAL (state) {
      state.isCreateFormActive = false
      state.isEditFormActive = true
      state.isReminderInfoActive = false
    },
    SHOW_INFO_MODAL (state) {
      state.isCreateFormActive = false
      state.isEditFormActive = false
      state.isReminderInfoActive = true
    },
    CLOSE_MODALS (state) {
      state.isCreateFormActive = false
      state.isEditFormActive = false
      state.isReminderInfoActive = false
    }
  }
}
