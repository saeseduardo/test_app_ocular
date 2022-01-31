<template>
  <div >
    <navBar></navBar>
    <b-container fluid>
        <b-row class="justify-content-center">
        <b-col md="6" offset-md="2" class="mt-5">
          <b-card
            title="Register"
            tag="register"
            style="max-width: 30rem;"
            class="mb-2 shadow-sm p-3 mb-5 bg-white rounded"
          >
            <b-card-text>
              <b-form @submit.prevent="register">
              <b-form-group
                id="fieldset-1"
                label="User name"
                label-for="input-1"
                valid-feedback=""
                :invalid-feedback="invalidFeedback"
                :state="state"
                >
                <b-form-input id="input-1" v-model="user_name" :state="state" trim></b-form-input>
                <ul v-if="errors.username !== undefined" class="text-start">
                  <li v-for="(error, index) in errors.username" :key="index" class="text-danger"><small> {{ error }} </small></li>
                </ul>
                </b-form-group>

                <b-form-group
                id="fieldset-2"
                label="Name"
                label-for="input-2"
                valid-feedback=""
                :invalid-feedback="invalidName"
                :state="state"
                >
                <b-form-input id="input-2" v-model="name" :state="stateName" trim></b-form-input>
                <ul v-if="errors.name !== undefined" class="text-start">
                  <li v-for="(error, index) in errors.name" :key="index" class="text-danger"><small> {{ error }} </small></li>
                </ul>
                </b-form-group>

                <b-form-group
                id="fieldset-3"
                label="User email"
                label-for="input-3"
                valid-feedback=""
                :invalid-feedback="invalidEmail"
                :state="state"
                >
                <b-form-input id="input-3" v-model="email" :state="stateEmail" trim></b-form-input>
                  <ul v-if="errors.email !== undefined" class="text-start">
                    <li v-for="(error, index) in errors.email" :key="index" class="text-danger"><small> {{ error }} </small></li>
                  </ul>
                </b-form-group>

                <b-form-group
                id="fieldset-4"
                label="Password"
                label-for="input-4"
                valid-feedback=""
                :invalid-feedback="invalidPassword"
                :state="state"
                >
                <b-form-input id="input-4" v-model="password" :state="statePassword" type="password" trim></b-form-input>
                <ul v-if="errors.password !== undefined" class="text-start">
                    <li v-for="(error, index) in errors.password" :key="index" class="text-danger"><small> {{ error }} </small></li>
                  </ul>
                </b-form-group>

                <b-form-group
                id="fieldset-5"
                label="Password"
                label-for="input-5"
                valid-feedback=""
                :invalid-feedback="invalidPasswordConfirmation"
                :state="state"
                >
                <b-form-input id="input-5" v-model="password_confirmation" :state="statePasswordConfirmation" type="password" trim></b-form-input>
                <ul v-if="errors.password_confirmation !== undefined" class="text-start">
                    <li v-for="(error, index) in errors.password_confirmation" :key="index" class="text-danger"><small> {{ error }} </small></li>
                  </ul>
                </b-form-group>
                <b-button variant="success" type="submit" class="mt-5">register</b-button>
            </b-form>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from '@/components/NavBar'

const ENDPOINT_PATH = 'http://localhost/api/v1/'

export default {
  name: 'ToRegister',
  components: {
    NavBar
  },
  data () {
    return {
      user_name: '',
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: {},
      disabled: false,
      user: {}
    }
  },
  computed: {
    state () {
      return this.user_name.length >= 4
    },
    statePassword () {
      return this.password.length >= 8
    },
    stateName () {
      return this.name.length >= 8
    },
    stateEmail () {
      return this.email.length >= 8
    },
    statePasswordConfirmation () {
      return this.password_confirmation.length >= 8
    },
    invalidFeedback () {
      if (this.user_name.length > 0) {
        return 'Enter at least 4 characters.'
      }
      return ''
    },
    invalidName () {
      if (this.name.length > 0) {
        return 'Enter at least 4 characters.'
      }
      return ''
    },
    invalidEmail () {
      if (this.email.length > 0) {
        return 'Enter at least 4 characters.'
      }
      return ''
    },
    invalidPassword () {
      if (this.password.length > 0) {
        return 'Enter at least 8 characters.'
      }
      return ''
    },
    invalidPasswordConfirmation () {
      if (this.password_confirmation.length > 0) {
        return 'Enter at least 4 characters.'
      }
      return ''
    }
  },
  mounted () {},
  methods: {
    async register () {
      const username = this.user_name
      const name = this.name
      const email = this.email
      const password = this.password
      // eslint-disable-next-line camelcase
      const password_confirmation = this.password_confirmation
      const user = { username, password, name, email, password_confirmation }
      axios.post(ENDPOINT_PATH + 'register', user)
        .then(response => {
          if (response.data) {
            this.error = response.data.data.error
          }
          window.localStorage.setItem('user', response.data.data.user.user_name)
          window.localStorage.setItem('user_role_id', response.data.data.user.role.id)
          window.localStorage.setItem('user_role_name', response.data.data.user.role.name)
          window.localStorage.setItem('token', response.data.data.token)
          window.location.href = '/#/posts'
        }).catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors
          }
        })
    }
  }
}
</script>
<style scoped>

.error {
    padding: 2px;
    background-color: lightpink;
    color:red;
}
</style>
