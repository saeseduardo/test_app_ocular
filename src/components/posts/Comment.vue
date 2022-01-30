<template>
    <div>

    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'Comment',
  data () {
    return {
      user: null,
      postId: null,
      comment: '',
      post: {}
    }
  },
  mounted () {
  },
  methods: {
    getDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },

    getPhoto (photo) {
      return `http://localhost/${photo}`
    },

    comment () {},

    like () {}
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
