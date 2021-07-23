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
      <button type="submit" class="btn btn-danger signup" @click="createUser()">
        S'incrire
      </button>
    </form>
    <div class="dropdown-divider separation"></div>
    <p class="dropdown-item encouragement">
      Vous n'êtes pas inscrit? Rejoignez nous !
    </p>
    <router-link class="btn btn-danger" to="/">Se connecter</router-link>

    <Footer />
  </main>
</template>
<script>
import Footer from "@/components/Footer.vue";
import axios from "axios";

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
      let users = {
        email: email,
        password: password,
        username: username,
      };
      // Verifie que utilisateur a bien remplie tout les champs
      if (users.email == "" || users.password == "" || users.username == "") {
        users = {
          userVerification: false,
        };
      } // Permet d'envoyer les information pour la creation d'un profil
      axios
        .post(this.$localhost + "api/auth/signup", users)
        .then((res) => {
          if (res) {
            this.$router.push("/");
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