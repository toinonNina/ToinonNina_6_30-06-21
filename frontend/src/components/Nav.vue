<template>
  <div class="navigation">
    <nav class="navbar navbar-expand-md navbar-light d-flex justify-content-between">

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <img src="../assets/icon.png" />
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 nav-menu">
          <li class="nav-item active">
            <a class="nav-link" href="">Profil</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">Deconnexion</a>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/Home">Fil d'actualités</router-link>
          </li>

        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "Nav",
};
</script>
<style scoped>
img {
  width: 10%;
}
@media (min-width: 768px) {
  img {
    width: 5%;
  }
}
</style>
