<template>
  <div>
    <form @keypress.enter="loginUser()" class="px-4 py-3 signin">
      <div class="form-group">
        <label for="exampleDropdownFormEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="email@example.com"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          required
        />
      </div>
      <div class="error-message">{{ errorMessage }}</div>
      <button type="submit" class="btn btn-primary" @click="loginUser()">
        Sign in
      </button>
    </form>
    <div class="dropdown-divider"></div>
    <p class="dropdown-item">Vous n'êtes pas inscrit? Rejoignez nous !</p>
    <button type="submit" class="btn btn-primary">INSCRIPTION</button>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      errorMessage: undefined,
    };
  },
  methods: {
    loginUser() {
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const user = {
        email: email,
        password: password,
      };

      fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => {
          if (res.status == 200) {
            res.json().then((data) => {
              // Stock les données de user dans le localstorage
              localStorage.setItem("token", data.token);
              localStorage.setItem("user", JSON.stringify(data.userId));
              window.location.href = `http://localhost:8080/#/home`;
            });
          } else {
            res.json().then((data) => {
              this.errorMessage = data.message;
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.signin {
  width: 50%;
  margin: 30px auto auto auto;
}
</style>