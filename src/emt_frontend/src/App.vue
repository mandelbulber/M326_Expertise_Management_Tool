<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <div class="buffer"></div>
        <router-link class="navbar-brand" to="/">
          <img src="./assets/logo.png" width="30" height="30" class="d-inline-block align-text-top">
          EMT | Expertise Management Tool
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
            </li>
            <li v-if="showAdminBoard" class="nav-item">
              <router-link class="nav-link" to="/admin">Admin Board</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
            <li v-if="!currentUser" class="nav-item">
              <router-link class="nav-link" to="/register">Sign Up</router-link>
            </li>
            <li v-if="!currentUser" class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li v-if="currentUser" class="nav-item">
              <router-link class="nav-link" to="/profile">{{ currentUser.email }}</router-link>
            </li>
            <li v-if="currentUser" class="nav-item navbarbtn">
              <a class="nav-link" @click.prevent="logOut">Logout</a>
            </li>
            <div class="buffer"></div>
          </ul>
        </div>
      </div>
    </nav>
    <article>
      <router-view />
    </article>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import BootstrapVue3 from 'bootstrap-vue-3'

export default {
  components: {
    BootstrapVue3
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_ADMIN");
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.navbarbtn {
  cursor: pointer;
}

.buffer {
  min-width: 10vw;
}

article {
  margin-left: 10vw;
  margin-right: 10vw;
}
</style>
