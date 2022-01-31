<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#/home">Ocular</b-navbar-brand>

      <b-navbar-toggle v-if="user" target="nav-collapse"></b-navbar-toggle>

      <b-collapse v-if="user" id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#/posts">Posts</b-nav-item>
          <b-nav-item v-if="roleId == 1" href="#/post">Create Post</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em v-if="user">{{ user }} ({{ role }})</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" v-on:click.prevent="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>

export default {
  name: 'NavBar',
  data () {
    return {
      user: null,
      role: null,
      roleId: null
    }
  },
  created () {
    this.$forceUpdate()
    this.user = window.localStorage.getItem('user')
    this.role = window.localStorage.getItem('user_role_name')
    this.roleId = window.localStorage.getItem('user_role_id')
  },
  methods: {
    signOut () {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('user_role_id')
      window.localStorage.removeItem('user_role_name')
      this.$router.push('/')
    }
  }
}
</script>
