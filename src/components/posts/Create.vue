<template>
  <div >
    <navBar></navBar>
    <b-container fluid>
        <b-row class="my-1 justify-content-center">
        <b-col md="4" v-if="roleId == 1">
          <b-card
            title="Create Post"
            tag="register"
            style="max-width: 30rem;"
            class="mb-2 shadow-sm p-3 mb-5 bg-white rounded"
          >
            <b-card-text>
            <b-form @submit.prevent="store">
              <b-form-group
                id="fieldset-1"
                label="Title"
                label-for="input-1"
                valid-feedback=""
                :invalid-feedback="invalidTitle"
                :state="state"
                >
                <b-form-input id="input-1" v-model="title" :state="state" trim></b-form-input>
                <ul v-if="errors.title !== undefined" class="text-start">
                  <li v-for="(error, index) in errors.title" :key="index" class="text-danger"><small> {{ error }} </small></li>
                </ul>
                </b-form-group>
                <br>
                <b-form-group
                id="fieldset-2"
                label="Content"
                label-for="input-2"
                valid-feedback=""
                :invalid-feedback="invalidContent"
                :state="state"
                >
                <b-form-textarea id="input-2" v-model="content" :state="stateContent" type="text" trim></b-form-textarea>
                <ul v-if="errors.content !== undefined" class="text-start">
                  <li v-for="(error, index) in errors.content" :key="index" class="text-danger"><small> {{ error }} </small></li>
                </ul>
                </b-form-group>
                <br>
                <b-form-group
                id="fieldset-3"
                label="Category"
                label-for="input-3"
                valid-feedback="Thank you!"
                :invalid-feedback="invalidCategory"
                :state="state"
                >
                <b-form-select id="input-3" v-model="category" :options="options" :state="stateCategory" type="text" trim></b-form-select>
                <ul v-if="errors.category !== undefined" class="text-start">
                  <li v-for="(error, index) in errors.category" :key="index" class="text-danger"><small> {{ error }} </small></li>
                </ul>
                </b-form-group><br>

                <b-form-file
                  v-model="photo"
                  :state="photo"
                ></b-form-file>
                <ul v-if="errors.photo !== undefined" class="text-start">
                  <li v-for="(error, index) in errors.photo" :key="index" class="text-danger"><small> {{ error }} </small></li>
                </ul>
                <br>
                <b-button variant="success" type="submit">Save</b-button>
            </b-form>
            </b-card-text>
          </b-card>
        </b-col>
         <b-col md="4" v-if="roleId != 1">
          <b-alert show variant="danger" >You do not have sufficient permissions to create a post</b-alert>
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
  name: 'Create',
  components: {
    NavBar
  },
  data () {
    return {
      title: '',
      content: '',
      category: '',
      errors: {},
      photo: '',
      roleId: null,
      selected: null,
      options: [
        { value: null, text: 'Please select an option' }
      ],
      user: {}
    }
  },
  computed: {
    state () {
      return this.title.length >= 4
    },
    stateContent () {
      return this.content.length >= 8
    },
    stateCategory () {
      return this.category.length >= 8
    },
    invalidTitle () {
      if (this.title.length > 0) {
        return 'Enter at least 4 characters.'
      }
    },
    invalidContent () {
      if (this.content.length > 0) {
        return 'Enter at least 4 characters.'
      }
    },
    invalidCategory () {
      if (this.category.length > 0) {
        return 'Enter at least 8 characters.'
      }
    }
  },
  mounted () {
    this.roleId = window.localStorage.getItem('user_role_id')
    const config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    }

    axios.get(ENDPOINT_PATH + 'category', config)
      .then(response => {
        if (response.data) {
          this.error = response.data.data.error
        }
        const data = response.data.data
        data.map(item => {
          this.options.push({
            value: item.id,
            text: item.name
          })
        })
      })
  },
  methods: {
    async store () {
      const config = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      }

      const formData = new FormData()

      formData.append('title', this.title)
      formData.append('content', this.content)
      formData.append('category', this.category)
      formData.append('photo', this.photo)

      axios.post(ENDPOINT_PATH + 'post', formData, config)
        .then(response => {
          this.$swal('Created', 'Your post has been successfully created', 'info')
          this.$router.push('posts')
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
