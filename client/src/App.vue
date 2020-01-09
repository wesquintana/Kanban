<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row bg-primary">
        <div class="col-6">
          <router-link to="/" class="text-white">
            <h1>Home</h1>
          </router-link>
        </div>
        <div class="col-6">
          <button
            class="btn btn-light mt-2"
            v-if="user.hasOwnProperty('name')"
            @click="logout"
          >Logout</button>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>