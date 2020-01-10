<template>
  <div id="app">
    <div class="container-fluid ">
      <div class="row bg-info">
        <div class="col-4 header">
          <h1 class="title text-left">
            <router-link to="/" class="text-light">Nabnak</router-link>
          </h1>
        </div>
        <div class="col-4 offset-4 text-right">
          <button
            class="btn btn-light mt-2"
            v-if="user.hasOwnProperty('name')"
            @click="logout"
          >
            Logout
          </button>
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
.title {
  font-family: "Shrikhand", cursive;
}
i:hover {
  cursor: pointer;
}
.header {
  height: 7vh;
}
</style>
