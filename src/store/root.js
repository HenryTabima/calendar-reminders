export default {
  state: {
    isCreateFormActive: false,
    isEditFormActive: false,
    isReminderInfoActive: false,
    selectedDate: new Date(),
    isLoading: false
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
    },
    SET_SELECTED_DATE (state, newDate) {
      state.selectedDate = newDate
    },
    START_LOADING (state) {
      state.isLoading = true
    },
    STOP_LOADING (state) {
      state.isLoading = false
    }
  }
}
