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
                :value="form.datetime.toString()"
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
import uuid from 'uuid/v1'
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
        id: uuid(),
        text: '',
        city: '',
        datetime: new Date(),
        color: { hex: '#000' }
      }
    }
  },
  computed: {
    selectedReminder () {
      return this.$store.getters['entities/reminders/selected']
    }
  },
  beforeMount () {
    if (this.edit) {
      this.form = {
        ...this.selectedReminder,
        datetime: new Date(this.selectedReminder.datetime),
        color: { hex: this.selectedReminder.color }
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
        if (this.edit) {
          this.handleEdit()
        } else {
          this.handleCreate()
        }
      } else {
        // TODO better handling for invalid forms
        console.log('invalid form')
      }
      this.$store.commit('CLOSE_MODALS')
    },
    handleCreate () {
      this.$store.dispatch('entities/reminders/create', this.form)
    },
    handleEdit () {
      this.$store.dispatch('entities/reminders/edit', this.form)
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
