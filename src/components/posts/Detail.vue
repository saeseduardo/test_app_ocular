<template>
    <div>
    <navBar></navBar>
      <b-row class="justify-content-center">
        <h3>Post</h3>
        <b-col md="6" offset-md="2">
          <b-row class="mb-2">
            <b-col lg="4">
              <b-button v-bind:name="post.id" variant="outline-primary" class="btn btn-outline " size="sm" v-on:click="previus(post)">
                <b-icon-arrow-left></b-icon-arrow-left>
              </b-button>
            </b-col>
            <b-col lg="4">
              <b-button v-bind:name="post.id" variant="outline-primary" class="btn btn-outline" size="sm" v-on:click="nextPost(post)">
                <b-icon-arrow-right></b-icon-arrow-right>
              </b-button>
            </b-col>
          </b-row>
          <b-card
            v-bind:title="post.title"
            v-bind:img-src="getPhoto(post.photo)"
            img-alt="Image"
            img-top
            img-height="200"
            img-width="200"
            tag="post"
            style="max-width: 30rem;"
            class="mb-2 shadow-sm p-3 mb-5 bg-white rounded"
          >
            <b-card-text>
              <p> <small> By: {{ post.user.user_name }} <b>{{ getDate(post.created_at) }}</b> </small></p>
              <p class="text-justify">{{post.content}}</p>
              <div class="mt-4">

                <b-button v-bind:name="post.id" variant="success" class="text-white" size="sm" v-on:click="showModal(post)">Comment</b-button>

                <b-button  variant="primary" class="text-white" size="sm" v-on:click="like(post.id)">
                  <b-icon-hand-thumbs-up></b-icon-hand-thumbs-up>
                  ({{ likes }})
                </b-button>
                <!-- <b-button  variant="danger" class="text-white" size="sm" v-on:click="like(post.id)">
                  <b-icon-hand-thumbs-down></b-icon-hand-thumbs-down>
                  ({{ likes }})
                </b-button> -->
              </div>
              <div class="mt-4 border-top">
                <h5 class="text-justify">Comments</h5>

                <b-list-group>
                  <b-list-group-item v-for="comment in comments" :key="comment.id" class="shadow-sm p-3 mb-1 bg-white rounded">
                    <div class="d-flex w-100 justify-content-start">
                      <h5 class="mb-1">@{{ comment.user.user_name }}</h5>
                      <small class="text-muted">{{ diffDaysOfComment(comment.created_at) }}</small>
                    </div>
                    <p class="mb-1 text-start">{{ comment.comment }}</p>
                  </b-list-group-item>
                  </b-list-group>
              </div>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>

      <b-modal ref="comment-modal" hide-footer title="Added comment">
        <div class="d-block text-center">
          {{commentPostTitle}}
        </div>
        <b-form >
            <b-form-group
              id="fieldset-1"
              label="Comment"
              label-for="input-1"
              valid-feedback=""
              :invalid-feedback="invalidComment"
              :state="state"
              >
              <b-form-textarea id="input-1" v-model="comment" :state="state" trim></b-form-textarea>
              <ul v-if="errors.comment !== undefined" class="text-start">
                <li v-for="(error, index) in errors.comment" :key="index" class="text-danger"><small> {{ error }} </small></li>
              </ul>
              </b-form-group>
          </b-form>
        <b-button class="mt-3" variant="outline-danger" @click="hideModal">Close Me</b-button>
        <b-button class="mt-3" variant="outline-primary" @click="addComment">Comment</b-button>
      </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import NavBar from '@/components/NavBar'

export default {
  name: 'Detail',
  components: {
    NavBar
  },
  data () {
    return {
      user: null,
      postId: null,
      comments: [],
      comment: '',
      commentPostId: '',
      commentPostTitle: '',
      likes: 0,
      roleId: null,
      post: {},
      errors: {}
    }
  },

  computed: {
    state () {
      return this.comment.length >= 4
    },

    invalidComment () {
      if (this.comment.length > 0) {
        return 'Enter at least 4 characters.'
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

    this.postId = this.$route.params.post

    axios
      .get(`http://localhost/api/v1/post/${this.postId}`, config)
      .then(response => {
        this.post = response.data.data
        this.comments = response.data.data.comments
        this.likes = response.data.data.likes.length
      })
  },
  methods: {
    getDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },

    getPhoto (photo) {
      if (photo) {
        const url = photo.url
        return `http://localhost/${url}`
      }
      return ''
    },

    addComment () {
      const config = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      }

      const data = {
        comment: this.comment
      }
      axios
        .post(`http://localhost/api/v1/comment/post/${this.commentPostId}`, data, config)
        .then(response => {
          this.comments = response.data.data.comments
          this.$refs['comment-modal'].hide()
          this.comment = ''
        }).catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors
          }
        })
    },

    like (postId) {
      const config = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      }
      this.$swal({
        position: 'top-end',
        icon: 'success',
        title: 'I like it',
        showConfirmButton: false,
        timer: 1500
      })
      axios
        .get(`http://localhost/api/v1/like/post/${this.postId}`, config)
        .then(response => {
          if (response.data.data) {
            this.likes = response.data.data.likes.length
          }
        })
    },

    showModal (post) {
      this.commentPostId = post.id
      this.commentPostTitle = post.title
      this.$refs['comment-modal'].show()
    },

    hideModal () {
      this.$refs['comment-modal'].hide()
    },

    diffDaysOfComment (dateComment) {
      var fecha1 = moment()
      var fecha2 = moment(dateComment)
      let diffDate = fecha2.diff(fecha1, 'days')

      if (diffDate === 0) {
        return 'Hoy'
      }

      return diffDate + 'days ago'
    },
    nextPost () {
      const config = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      }

      this.postId = parseInt(this.postId) + 1

      axios
        .get(`http://localhost/api/v1/post/${this.postId}`, config)
        .then(response => {
          this.post = response.data.data
          this.comments = response.data.data.comments
          this.likes = response.data.data.likes.length
        })
    },
    previus () {
      const config = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      }

      this.postId = parseInt(this.postId) - 1
      axios
        .get(`http://localhost/api/v1/post/${this.postId}`, config)
        .then(response => {
          this.post = response.data.data
          this.comments = response.data.data.comments
          this.likes = response.data.data.likes.length
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.text-justify {
  text-align: justify;
}
</style>
