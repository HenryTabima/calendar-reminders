<template>
  <form @submit.prevent="handleFormAction">
    <div class="modal-card show-overflow" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ action }} Reminder</p>
      </header>
      <section class="modal-card-body show-overflow">
        <div class="form-layout">
          <div class="form-layout-item">
            <b-field label="Text">
              <b-input
                type="text"
                v-model="form.text"
                placeholder="Remind this..."
                required
                maxlength="30"
              >
              </b-input>
            </b-field>
            <b-field label="DateTime (Read Only)">
              <b-input
                type="text"
                :value="form.datetime"
                placeholder="DateTime"
                disabled
              >
              </b-input>
            </b-field>
            <b-field label="City">
              <b-input
                type="text"
                v-model="form.city"
                placeholder="City"
                required
              >
              </b-input>
            </b-field>
            <b-field label="Color">
              <b-input
                type="text"
                :value="form.color.hex"
                placeholder="DateTime"
                disabled
              >
              </b-input>
            </b-field>
            <compact-picker
              v-model="form.color"
            />
          </div>
          <div class="form-layout-item">
            <b-field label="DateTime">
              <b-datetimepicker
                v-model="form.datetime"
                icon="calendar-today"
                inline
              />
            </b-field>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Close
        </button>
        <button class="button is-success" type="submit">{{ action }}</button>
      </footer>
    </div>
  </form>
</template>

<script>
import { Compact } from 'vue-color'
import { required, maxLength } from 'vuelidate/lib/validators'
export default {
  components: { 'compact-picker': Compact },
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      action: this.edit ? 'Edit' : 'Create',
      form: {
        text: '',
        city: '',
        datetime: new Date(),
        color: { hex: '#000' }
      }
    }
  },
  validations: {
    form: {
      text: {
        required,
        maxLength: maxLength(30)
      },
      city: { required },
      datetime: { required },
      color: { required }
    }
  },
  methods: {
    handleFormAction () {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.$store.dispatch('entities/reminders/create', this.form)
        this.$store.commit('CLOSE_MODALS')
      } else {
        // TODO better handling for invalid forms
        console.log('invalid form')
      }
    }
  }
}
</script>

<style lang="stylus">
.form-layout
  display flex
  align-items center
  // text-align center
.form-layout-item:nth-child(1)
  margin-right 20px
</style>
