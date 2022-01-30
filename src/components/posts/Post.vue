<template>
    <div>
      <b-row class="justify-content-center">
        <h3>Posts</h3>
        <b-col></b-col >
        <b-col v-for="post in posts" :key="post.id">
            <b-card
              v-bind:name="post.id"
              v-bind:title="post.title"
              v-bind:img-src="post.photo"
              img-alt="Image"
              img-top
              tag="post"
              style="max-width: 20rem;"
              class="mb-2 text-center"
            >
              <b-card-text>
                {{`${post.content.slice(0,50)}...`}}
              </b-card-text>

              <b-button variant="primary" class="text-white" @click="detail(post.id)">See more</b-button>
            </b-card>
        </b-col>
        <b-col></b-col >
      </b-row>
      <b-row class="justify-content-center">
        <b-col></b-col >
        <b-col>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>

          <p class="mt-3">Current Page: {{ currentPage }}</p>
        </b-col>
        <b-col></b-col >
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
      posts: null,
      currentPage: 1,
      perPage: 1
    }
  },
  mounted () {
    const config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    }
    axios
      .get('http://localhost/api/v1/posts', config)
      .then(response => {
        this.posts = response.data.data.data
        // this.perPage = response.data.per_page
      })
  },
  computed: {
    rows () {
      return this.posts.length
    }
  },
  methods: {
    detail (post) {
      console.log(post)
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
