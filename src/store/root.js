export default {
  state: {
    isCreateFormActive: false,
    isEditFormActive: false
  },
  mutations: {
    SHOW_CREATE_MODAL (state) {
      state.isCreateFormActive = true
      state.isEditFormActive = false
    },
    SHOW_EDIT_MODAL (state) {
      state.isCreateFormActive = false
      state.isEditFormActive = true
    },
    CLOSE_MODALS (state) {
      state.isCreateFormActive = false
      state.isEditFormActive = false
    }
  }
}
