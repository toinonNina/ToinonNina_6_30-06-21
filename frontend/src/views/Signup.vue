<template>
  <main id="app">
    <h1>Bienvenue sur le réseau Social Groupomania</h1>
    <form class="px-4 py-3 signin">
      <div class="form-group">
        <label for="username">Votre nom et prénom</label>
        <input type="text" class="form-control" id="username" placeholder="Gladys Castagné" required />
      </div>
      <div class="form-group">
        <label for="email">Adresse Email</label>
        <input type="email" class="form-control" id="email" placeholder="email@example.com" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" class="form-control" id="password" placeholder="Password" required />
      </div>
      <div class="error-message">{{ errorMessage }}</div>
      <button type="submit" class="btn btn-primary signup" @click="createUser()">
        S'incrire
      </button>
    </form>
    <div class="dropdown-divider separation"></div>
    <p class="dropdown-item encouragement">
      Vous n'êtes pas inscrit? Rejoignez nous !
    </p>
    <router-link class="btn btn-primary" to="/">Se connecter</router-link>

    <Footer />
  </main>
</template>
<script>
import Footer from "@/components/Footer.vue";

export default {
  name: "Signup",
  components: {
    Footer,
  },
  data() {
    return {
      errorMessage: undefined,
    };
  },
  methods: {
    /**
     * Permet de poster les donnees saisie par utilisateur
     */
    createUser() {
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const username = document.querySelector("#username").value;
      let user = JSON.stringify({
        email: email,
        password: password,
        username: username,
      });
      // Verifie que utilisateur a bien remplie tout les champs
      if (user.email == "" || user.password == "" || user.username == "") {
        user = {
          userVerification: false,
        };
      } // Permet d'envoyer les information pour la creation d'un profil

      fetch("http://localhost:3000/api/auth/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => {
          if (res.status == 201) {
            window.location.href = "http://localhost:8080/#/";
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
</style>