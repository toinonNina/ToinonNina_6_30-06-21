<template>
  <div id="app">
    <header id="header">
      <img class="logo" alt="Vue logo" src="../src/assets/Groupomania-Logo.png" />
    </header>
    <div id="conn-connected"></div>
    <router-view />
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      conn: "",
    };
  },
  created() {
    axios
      .get(this.$localhost + "api/")

      .then((response) => (this.conn = response.data))
      //.catch(error => console.log('Il semblerait que la base de données ne soit pas connectée, réessayez plus tard'))
      .catch((error) => {
        console.log(error);
        document.getElementById("conn-connected").innerHTML =
          "/!\\ Attention la database n'est pas connectée veuillez réessayer ultérieurement";
      });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#header {
  text-align: center;
}
#nav {
  padding: 0px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.logo {
  width: 60%;
  margin: 0;
  text-align: right;
}
.navigation {
  text-align: left;
}
.btn-primary {
  background-color: #1956c8 !important;
  font-weight: 600;
}
#conn-connected {
  text-align: center;
  font-size: 24px;
  color: red;
}
@media (min-width: 1024px) {
  .logo {
    width: 20%;
  }
}
</style>
