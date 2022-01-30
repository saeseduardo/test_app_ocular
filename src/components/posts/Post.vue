<template>
    <div>
      <b-row class="justify-content-center">
        <h3>Posts</h3>
        <b-col v-for="post in posts" :key="post.id">
            <b-card
              v-bind:name="post.id"
              v-bind:title="post.title"
              v-bind:img-src="getPhoto(post.photo.url)"
              img-alt="Image"
              img-top
              tag="post"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>
                {{`${post.content.slice(0,50)}...`}}
              </b-card-text>

              <b-button v-bind:name="post.id" variant="primary" class="text-white" size="sm" v-on:click="detail(post.id)">See more</b-button>
              <b-button v-bind:name="post.id" variant="warning" class="text-white" size="sm" v-on:click="edit(post.id)">Edit</b-button>
              <b-button v-bind:name="post.id" variant="danger" class="text-white" size="sm" v-on:click="destroid(post.id)">Delete</b-button>
            </b-card>
        </b-col>
      </b-row>
      <b-row class="justify-content-center">
        <b-col md="6" offset-md="3">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          >
          </b-pagination>
          <p class="text-left">Current Page: {{ currentPage }}</p>
        </b-col>
      </b-row>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Posts',
  data () {
    return {
      user: null,
      posts: [],
      currentPage: 1,
      perPage: 1
    }
  },
  mounted () {
    this.user = window.localStorage.getItem('user')
    const config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    }
    axios
      .get('http://localhost/api/v1/posts', config)
      .then(response => {
        this.posts = response.data.data.data
      })
  },
  computed: {
    rows () {
      return this.posts.length
    }
  },
  methods: {
    detail (post) {
      this.$router.push(`/post/${post}`)
    },
    edit (post) {
      this.$router.push(`/post/${post}/edit`)
    },
    destroid (post) {

    },
    getPhoto (photo) {
      return `http://localhost/${photo}`
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
