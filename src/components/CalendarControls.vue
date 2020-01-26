<template>
  <div class="controls-container">
    <b-field label="Select a Month">
      <b-datepicker
        type="month"
        v-model="monthDate"
        placeholder="Click to select..."
        icon="calendar-today"
        @input="handleChange"
      />
      </b-field>
    <b-button>Add Reminder</b-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      monthDate: new Date()
    }
  },
  methods: {
    handleChange () {
      this.$emit('monthChange', this.monthDate)
    }
  }
}
</script>

<style lang="stylus">
.controls-container
  width 100%
  display flex
  justify-content space-between
  align-items center
</style>
