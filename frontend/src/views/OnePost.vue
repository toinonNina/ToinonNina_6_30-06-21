<template>
  <div class="Home">
    <h1>Bienvenue sur le réseau Social de Groupomania</h1>
    <Nav />
    <div class="mx-auto">

      <div v-for="(art,idx) in arts" :key="idx">

        <div class="card card-product mx-auto">

          <div class="card-body product-body">
            <h2 class="card-title name">{{ art.title }}</h2>
            <div class="dropdown-divider separation"></div>
            <p class="card-text price">{{ art.content}}</p>
            <div>
              <img class="card-img-top product-img" width="300" height="450" :src="art.image" v-if="art.image != 0" />
              <img class="card-img-top product-img" width="300" height="450" :src="art.image" v-else-if="imgoff" />
            </div>
            <div class="dropdown-divider separation"></div>
            <ul class="navbar-nav mt-2 mt-lg-0 flex-row">
              <li class="nav-item active userinfo">
                <span class="">Crée par {{ art.username}}</span>
              </li>
              <li class="nav-item">
                <span class="">Le {{ datePost(art.dateCreate)}} </span>
              </li>
            </ul>
            <router-link class="btn btn-primary mt-5" :to="`/update/${art.id}`" v-if="userId == art.user_id || admin == 1">Modifier votre post</router-link>

          </div>
          <div class="container mb-5">
            <div class="row d-flex justify-content-center">
              <div class="col-md-10">
                <div class="headings d-flex justify-content-between align-items-center mb-3">
                  <label for="contentcomm"></label>
                  <input type="text" class="form-control textarea " rows="2" id="contentcomm" v-model="comment" placeholder="votre commentaire..." required>
                  <button type="submit" class="btn btn-primary signup ml-2" @click="PostComm()">commenter</button>
                </div>
                <div class="card p-3 idcomm" :id="comm.id" v-for="(comm,indx) in comms" :key="indx">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="user d-flex flex-row align-items-center"><span><small class="font-weight-bold nametitle ">{{comm.username}} a répondu </small></span> </div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center px-3 contentcommentaire ">
                    <div class="user d-flex flex-row align-items-center"><span> <small class="font-weight-bold">{{comm.content}}</small></span> </div>
                  </div>
                  <div class="action d-flex justify-content-between mt-2 align-items-center">
                    <button class="reply px-4 smallsize" v-if="userId == comm.user_id || admin == 1 " @click="deletecomm()"> Supprimer</button>
                    <div class="icons align-items-center" v-if="userId == comm.user_id || admin == 1 "> <i class="fas fa-globe "></i> <i class="fa fa-check-circle-o check-icon"></i> </div>
                  </div>
                </div>
              </div>
            </div>
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
  name: "OnePost",
  components: {
    Nav,
    Footer,
  },
  data() {
    return {
      comment: "",
      arts: [],
      comms: [],
      imgoff: 0,
      userId: "",
      isAdmin: 0,
    };
  },
  mounted() {
    this.getOnePost();
    this.getAllcomms();
    this.userId = localStorage.getItem("user");
    this.admin = localStorage.getItem("isAdmin");
  },
  methods: {
    getOnePost() {
      const token = localStorage.getItem("token");
      this.userId = localStorage.getItem("user");
      this.isAdmin = localStorage.getItem("isAdmin");

      const idPost = this.$route.params.id;

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        this.$router.push("/");
      }

      axios
        .get("http://localhost:3000/api/post/" + idPost, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.arts = res.data;
        })
        .catch((error) => {
          console.log("Le post n'a pas pu être récupéré /" + error);
        });
    },

    PostComm() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user");
      const idPost = this.$route.params.id;
      console.log(this.comment);
      const formcomm = {
        user_id: userId,
        content: this.comment,
        post_id: idPost,
      };

      console.log(formcomm);
      axios
        .post("http://localhost:3000/api/comm/create", formcomm, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          if (res) {
            console.log(res);
            location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getAllcomms() {
      const token = localStorage.getItem("token");
      const idPost = this.$route.params.id;
      console.log(idPost);
      axios
        .get("http://localhost:3000/api/comm/" + idPost, {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.comms = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletecomm() {
      const token = localStorage.getItem("token");
      const div1 = document.querySelector(".idcomm");
      const comment_id = div1.getAttribute("id");
      console.log(comment_id);
      axios
        .delete("http://localhost:3000/api/comm/delete/" + comment_id, {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          if (res) {
            console.log(res);
            location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    datePost(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-Fr", options);
    },
  },
};
</script>
<style scoped>
.card-product {
  display: flex;
  border-radius: 20px 20px;
  width: 50%;
}
.product-img {
  object-fit: contain;
}
.userinfo {
  margin-right: 15px;
}
h1 {
  text-align: center;
  font-size: 18px;
}
.nametitle {
  font-size: 16px;
  color: #1956c8;
}
.smallsize {
  font-size: 14px;
  border: none !important;
  background-color: #fff !important;
}
.contentcommentaire {
  font-size: 18px;
}

@media (min-width: 320px) and (max-width: 1000px) {
  .card-product {
    margin: 90px auto auto auto;
    flex-direction: column;
    border-radius: 20px 20px;
    width: 80%;
  }
  .product-img {
    width: 100%;
    object-fit: contain;
    border-radius: 20px 20px 0 0;
  }
}
</style>