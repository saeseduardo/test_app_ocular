<template>
  <div >
    <b-container fluid>
        <b-row class="my-1 justify-content-center">
        <h1>Login</h1>
        <b-col md="2">
          <b-form @submit.prevent="login">
            <b-form-group
              id="fieldset-1"
              label="User name"
              label-for="input-1"
              valid-feedback="Thank you!"
              :invalid-feedback="invalidFeedback"
              :state="state"
              >
              <b-form-input id="input-1" v-model="username" :state="state" trim></b-form-input>
              </b-form-group>

              <b-form-group
              id="fieldset-2"
              label="Password"
              label-for="input-2"
              valid-feedback="Thank you!"
              :invalid-feedback="invalidFeedbackPassword"
              :state="state"
              >
              <b-form-input id="input-2" v-model="password" :state="statePassword" type="password" trim></b-form-input>
              </b-form-group>
              <b-button variant="success" type="submit">Login</b-button>
          </b-form>
          <b-alert show variant="danger" v-if="error">{{error}}</b-alert>
        </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

const ENDPOINT_PATH = 'http://localhost/api/v1/'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      error: '',
      user: {}
    }
  },
  computed: {
    state () {
      return this.username.length >= 4
    },
    statePassword () {
      return this.password.length >= 8
    },
    invalidFeedback () {
      if (this.username.length > 0) {
        return 'Enter at least 4 characters.'
      }
      return 'Please enter something.'
    },
    invalidFeedbackPassword () {
      if (this.password.length > 0) {
        return 'Enter at least 8 characters.'
      }
      return 'Please enter something.'
    }
  },
  mounted () {},
  methods: {
    async login () {
      const username = this.username
      const password = this.password
      const user = { username, password }
      axios.post(ENDPOINT_PATH + 'login', user)
        .then(response => {
          if (response.data) {
            this.error = response.data.data.error
          }
          window.localStorage.setItem('user', response.data.data.user.user_name)
          window.localStorage.setItem('token', response.data.data.token)
          this.$router.push('/posts')
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
