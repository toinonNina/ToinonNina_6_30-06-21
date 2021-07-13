<template>
  <div>
    <form class="px-4 py-3 signin">
      <div class="form-group">
        <label for="exampleDropdownFormEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleDropdownFormEmail1"
          placeholder="email@example.com"
        />
      </div>
      <div class="form-group">
        <label for="exampleDropdownFormPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleDropdownFormPassword1"
          placeholder="Password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
    <div class="dropdown-divider"></div>
    <p class="dropdown-item">Vous n'êtes pas inscrit? Rejoignez nous !</p>
    <button type="submit" class="btn btn-primary">INSCRIPTION</button>
  </div>
</template>
<script>
export default {
  name: "Login",
};
</script>
<style scoped>
.signin {
  width: 50%;
  margin: 30px auto auto auto;
}
</style>