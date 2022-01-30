<template>
    <div>
      <b-row class="justify-content-center">
        <h3>Posts</h3>
        <b-col md="6" offset-md="2">
            <b-card
              v-bind:title="post.title"
              v-bind:img-src="getPhoto(post.photo.url)"
              img-alt="Image"
              img-top
              img-height="200"
              img-width="200"
              tag="post"
              style="max-width: 30rem;"
              class="mb-2"
            >
              <b-card-text>
                <p> <small> By: {{ post.user.user_name }} <b>{{ getDate(post.created_at) }}</b> </small></p>
                {{post.content}}
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
                  <h5 class="text-start">Comments</h5>

                  <b-list-group>
                    <b-list-group-item v-for="comment in comments" :key="comment.id">
                      <div class="d-flex w-100 justify-content-between">
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
              valid-feedback="Thank you!"
              :invalid-feedback="invalidComment"
              :state="state"
              >
              <b-form-textarea id="input-1" v-model="comment" :state="state" trim></b-form-textarea>
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

export default {
  name: 'Detail',
  data () {
    return {
      user: null,
      postId: null,
      comments: [],
      comment: '',
      commentPostId: '',
      commentPostTitle: '',
      likes: 0,
      post: {}
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
    this.user = window.localStorage.getItem('user')
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
      })
  },
  methods: {
    getDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },

    getPhoto (photo) {
      if (!photo) {
        return ''
      }
      return `http://localhost/${photo}`
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
        })
    },

    like (postId) {
      const config = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      }

      axios
        .get(`http://localhost/api/v1/like/post/${this.postId}`, config)
        .then(response => {
          this.likes = response.data.data.likes.length
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
</style>
