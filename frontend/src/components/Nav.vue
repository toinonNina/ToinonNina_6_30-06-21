<template>
  <div class="navigation">
    <nav class="navbar mr-auto navbar-expand-lg navbar-light bg-light">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse flex-row-reverse"
        id="navbarTogglerDemo01"
      >
        <ul class="navbar-nav mt-2 mt-lg-0">
          <li class="nav-item active">
            <a class="nav-link" href="#"
              >Profil<span class="sr-only">(current)</span></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
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
</style>
