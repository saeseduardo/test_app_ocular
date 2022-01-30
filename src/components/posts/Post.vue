<template>
    <div>
      <b-row class="justify-content-center">
        <h1>Posts</h1>
        <h2 v-if="!posts.length">No records</h2>
        <b-col v-for="post in posts" :key="post.id">
            <b-card
              v-bind:title="post.title"
              v-bind:img-src="getPhoto(post.photo)"
              v-bind:img-alt="post.title"
              img-top
              img-height="200"
              img-width="200"
              border-variant="shadow"
              tag="post"
              style="max-width: 20rem;"
              class="mb-2 shadow-sm p-3 mb-5 bg-white rounded"
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
          <nav>
            <ul class="pagination" v-if="posts.length">
                <li class="page-item" v-show="pagination.prev_page_url">
                    <a href="#" class="page-link" @click.prevent="getPreviousPage">
                        <span>
                          <span aria-hidden="true">«</span>
                        </span>
                    </a>
                </li>
                <li class="page-item" :class="{ 'active': like.active }" v-for="(like, index) in pagination.links" :key="index">
                    <a href="#" class="page-link" @click.prevent="getPage(like)">
                        <span >
                            {{ like.label }}
                        </span>
                    </a>
                </li>
                <li class="page-item" v-show="pagination.next_page_url">
                    <a href="#" class="page-link" @click.prevent="getNextPage">
                        <span>
                          <span aria-hidden="true">»</span>
                        </span>
                    </a>
                </li>
            </ul>
          </nav>
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
      pagination: []
    }
  },
  mounted () {
    this.allPost()
  },
  computed: {
    rows () {
      return this.posts.length
    }
  },
  methods: {
    allPost () {
      const config = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      }

      axios
        .get('http://localhost/api/v1/posts', config)
        .then(response => {
          this.posts = response.data.data.data
          this.pagination = response.data.data
        })
    },
    detail (post) {
      this.$router.push(`/post/${post}`)
    },
    edit (post) {
      this.$router.push(`/post/${post}/edit`)
    },
    destroid (post) {
      const config = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      }

      axios
        .delete(`http://localhost/api/v1/post/delete/${post}`, config)
        .then(response => {
          this.posts = response.data.data.data
          this.pagination = response.data.data
        })
    },
    getPhoto (photo) {
      if (photo) {
        const url = photo.url
        return `http://localhost/${url}`
      }
      return ''
    },
    getPreviousPage () {
      const config = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      }

      axios
        .get(this.pagination.prev_page_url, config)
        .then(response => {
          this.posts = response.data.data.data
          this.pagination = response.data.data
        })
    },
    getPage (page) {
      const config = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      }
      axios
        .get(page.url, config)
        .then(response => {
          this.$set(this.$data, 'posts', response.data.data.data)
          this.$set(this.$data, 'pagination', response.data.data)
        })
    },
    getNextPage () {
      const config = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      }

      axios
        .get(this.pagination.next_page_url, config)
        .then(response => {
          this.posts = response.data.data.data
          this.pagination = response.data.data
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
.shadow {
  -webkit-box-shadow: -1px 1px 16px 10px rgba(217,208,217,1);
  -moz-box-shadow: -1px 1px 16px 10px rgba(217,208,217,1);
  box-shadow: -1px 1px 16px 10px rgba(217,208,217,1);
}
</style>
