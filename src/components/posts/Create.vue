<template>
  <div >
    <b-container fluid>
        <b-row class="my-1 justify-content-center">
        <h1>Create Post</h1>
        <b-col md="4">
          <b-form @submit.prevent="store">
            <b-form-group
              id="fieldset-1"
              label="Title"
              label-for="input-1"
              valid-feedback="Thank you!"
              :invalid-feedback="invalidTitle"
              :state="state"
              >
              <b-form-input id="input-1" v-model="title" :state="state" trim></b-form-input>
              </b-form-group>
              <br>
              <b-form-group
              id="fieldset-2"
              label="Content"
              label-for="input-2"
              valid-feedback="Thank you!"
              :invalid-feedback="invalidContent"
              :state="state"
              >
              <b-form-textarea id="input-2" v-model="content" :state="stateContent" type="text" trim></b-form-textarea>
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
              </b-form-group><br>

              <b-form-file
                v-model="photo"
                :state="Boolean(photo)"
              ></b-form-file><br>
              <b-button variant="success" type="submit">Save</b-button>
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
  name: 'Create',
  data () {
    return {
      title: '',
      content: '',
      category: '',
      error: '',
      photo: '',
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
          this.$router.push('posts')
        })
        .catch(error => console.log(error.response))
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
