<template>
  <div >
    <navBar></navBar>
    <b-container fluid>
        <b-row class="justify-content-center">
        <b-col md="6" offset-md="2" class="mt-5">
          <b-card
            title="Login"
            tag="post"
            style="max-width: 30rem;"
            class="mb-2 shadow-sm p-3 mb-5 bg-white rounded"
          >
            <b-card-text>
              <b-form @submit.prevent="login">
              <b-form-group
                id="fieldset-1"
                label="User name"
                label-for="input-1"
                valid-feedback=""
                :invalid-feedback="invalidFeedback"
                :state="state"
                >
                <b-form-input id="input-1" v-model="username" :state="state" trim></b-form-input>
                <ul v-if="errors.username !== undefined" class="text-start">
                  <li v-for="(error, index) in errors.username" :key="index" class="text-danger"><small> {{ error }} </small></li>
                </ul>
                </b-form-group>

                <b-form-group
                id="fieldset-2"
                label="Password"
                label-for="input-2"
                valid-feedback=""
                :invalid-feedback="invalidFeedbackPassword"
                :state="state"
                >
                <b-form-input id="input-2" v-model="password" :state="statePassword" type="password" trim></b-form-input>
                <ul v-if="errors.password !== undefined" class="text-start">
                  <li v-for="(error, index) in errors.password" :key="index" class="text-danger"><small> {{ error }} </small></li>
                </ul>
                </b-form-group>
                <b-button variant="success" type="submit" class="mt-4">Login</b-button>
            </b-form>
            <b-alert show variant="danger" v-if="errorAccess">{{errorAccess}}</b-alert>
            </b-card-text>
            <small class="text-primary" v-on:click="register()">Register</small>
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
  name: 'Login',
  components: {
    NavBar
  },
  data () {
    return {
      username: '',
      password: '',
      errorAccess: '',
      errors: {},
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
      return ''
    },
    invalidFeedbackPassword () {
      if (this.password.length > 0) {
        return 'Enter at least 8 characters.'
      }
      return ''
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
          if (response.data.data.error) {
            this.errorAccess = 'invalid credentials'
            this.errors = {}
          }
          window.localStorage.setItem('user', response.data.data.user.user_name)
          window.localStorage.setItem('user_role_id', response.data.data.user.role.id)
          window.localStorage.setItem('user_role_name', response.data.data.user.role.name)
          window.localStorage.setItem('token', response.data.data.token)
          this.$router.push('/posts')
        }).catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors
          }
        })
    },
    register () {
      this.$router.push('/register')
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
