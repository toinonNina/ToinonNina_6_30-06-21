<template>
  <div class="Profil">
    <h1>Bienvenue sur le réseau Social de Groupomania</h1>
    <Nav />
    <div class="mx-auto">

      <div v-for="(user,idx) in users" :key="idx">

        <div class="card card-product mx-auto">

          <div class="card-body product-body">
            <h2 class="card-title name">{{user.username}}</h2>

            <div class="dropdown-divider separation"></div>
            <p class="card-text price">Email: {{user.email}}</p>

            <div class="dropdown-divider separation"></div>
            <div class="mt-5">
              <div class="form-group">
                <label for="username">Votre nom et prénom</label>
                <input type="text" class="form-control" id="username" placeholder="Gladys Castagné" required />
              </div>
              <div class="form-group">
                <label for="email">Adresse Email</label>
                <input type="email" class="form-control" id="email" placeholder="email@example.com" required />

              </div>

              <div class="form-group">
                <label for="password">Changer mon Mot de passe</label>
                <input type="password" class="form-control" id="password" placeholder="Password" required />
              </div>
            </div>
            <button class="btn btn-primary" v-if="userId == user.id || admin == 1" @click="updateUser()">modifier son compte</button>
            <button class="btn btn-primary" v-if="userId == user.id || admin == 1" @click="deleteuser()">Supprimer son compte</button>

          </div>

        </div>

        <div class="dropdown-divider separation"></div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "user",
  components: {
    Nav,

    Footer,
  },
  data() {
    return {
      users: [],
      userId: "",
      isAdmin: 0,
    };
  },
  mounted() {
    this.getOneUser();
    this.userId = localStorage.getItem("user");
    this.admin = localStorage.getItem("isAdmin");
  },
  methods: {
    getOneUser() {
      const token = localStorage.getItem("token");

      const iduser = this.$route.params.id;

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        this.$router.push("/");
      }

      axios
        .get("http://localhost:3000/api/auth/user/" + iduser, {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          this.users = res.data;
        })
        .catch((error) => {
          console.log("Le post n'a pas pu être récupéré /" + error);
        });
    },
    deleteuser() {
      const token = localStorage.getItem("token");
      const idUser = this.$route.params.id;
      console.log(idUser);
      axios
        .delete("http://localhost:3000/api/auth/delete/" + idUser, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          if (res) {
            console.log("utilisateur supprimer");
            localStorage.clear();
            this.$router.push("../Signup");
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
h1 {
  text-align: center;
  font-size: 18px;
}

.card-product {
  display: flex;
  border-radius: 20px 20px;
  width: 50%;
}
.name {
  color: blue;
}
.userinfo {
  margin-right: 15px;
}
h1 {
  text-align: center;
  font-size: 18px;
}
@media (min-width: 320px) and (max-width: 1000px) {
  .card-product {
    margin: 90px auto auto auto;
    flex-direction: column;
    border-radius: 20px 20px;
    width: 80%;
  }
}
</style>