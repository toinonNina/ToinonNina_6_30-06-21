<template>
  <main id="app">
    <h1>Bienvenue sur le réseau Social Groupomania</h1>
    <form class="px-4 py-3 signin">
      <div class="form-group">
        <label for="email">Adresse Email</label>
        <input type="email" class="form-control" id="email" placeholder="email@example.com" required />

      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" class="form-control" id="password" placeholder="Password" required />
      </div>
      <div class="error-message">{{ errorMessage }}</div>
      <button type="submit" class="btn btn-primary signup" @click="loginUser()">
        Se connecter
      </button>
    </form>
    <div class="dropdown-divider separation"></div>
    <p class="dropdown-item encouragement">
      Vous n'êtes pas inscrit? Rejoignez nous !
    </p>
    <router-link class="btn btn-primary" to="/Signup">S'INSCRIRE</router-link>

    <Footer />
  </main>
</template>
<script>
import Footer from "@/components/Footer.vue";
export default {
  name: "Login",
  components: {
    Footer,
  },
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
              window.location.href = "http://localhost:8080/#/Home";
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
#app {
  text-align: center;
}
.signin {
  width: 50%;
  margin: 70px auto auto auto;
}
.signup {
  margin-bottom: 40px;
}
.separation {
  margin-bottom: 50px;
  padding-bottom: 3em;
}
.encouragement {
  padding: 0 !important;
}
@media (max-width: 1024px) {
  .signin {
    width: 100%;
    margin: 0;
  }
}
@media (max-width: 1024px) {
  h1 {
    font-size: 20px !important;
  }
}
</style>