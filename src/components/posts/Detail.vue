<template>
    <div>
      <b-row class="justify-content-center">
        <h3>Posts</h3>
        <b-col md="6" offset-md="3">
            <b-card
              v-bind:title="post.title"
              v-bind:img-src="post.photo"
              img-alt="Image"
              img-top
              tag="post"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>
                <p> <small> By: {{ post.user.user_name }} <b>{{ getDate(post.created_at) }}</b> </small></p>
                {{post.content}}
              </b-card-text>
            </b-card>
        </b-col>
      </b-row>
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
      post: {}
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
      })
  },
  methods: {
    getDate (date) {
      return moment(date).format('YYYY-MM-DD')
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
