<template>
  <div id="app">
    <img class="logo" alt="Vue logo" src="../src/assets/Groupomania-Logo.png" />
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
  width: 50%;
  margin: 0;
  text-align: right;
}
.navigation {
  text-align: left;
}
@media (min-width: 1024px) {
  .logo {
    width: 20%;
  }
}
</style>
