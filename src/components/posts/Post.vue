<template>
    <div>
        <h3>Posts</h3>
        <div class='ui centered card' v-for="post in posts" :key="post.id">
            <div class='content' >
                <div class='header'>
                    {{ post.title }}
                </div>
                <div class='meta'>
                    {{ post.content }}
                </div>
                <div class='extra content'>
                    <span class='right floated edit icon'>
                    <i class='edit icon'></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Posts',
  data () {
    return {
      posts: null
    }
  },
  mounted () {
    axios
      .get('http://localhost/api/v1/posts')
      .then(response => (this.post = response))
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
