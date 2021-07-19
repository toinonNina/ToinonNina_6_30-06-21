<template>
  <div class="mx-auto">

    <div :id="art.id" v-for="(art,idx) in arts" :key="idx">

      <div class="card card-product mx-auto">

        <div class="card-body product-body">
          <h2 class="card-title name">{{ art.title }}</h2>
          <div class="dropdown-divider separation"></div>
          <p class="card-text price">{{ art.content}}</p>
          <div>
            <img class="card-img-top product-img" width="300" height="250" :src="art.image" v-if="art.image != 0" />
            <img class="card-img-top product-img" width="300" height="250" :src="art.image" v-else-if="imgoff" />
          </div>
          <div class="dropdown-divider separation"></div>
          <ul class="navbar-nav mt-2 mt-lg-0 flex-row">
            <li class="nav-item active userinfo">
              <span class="">{{art.username}}</span>
            </li>
            <li class="nav-item">
              <span class="">{{ datePost(art.dateCreate)}} </span>
            </li>
          </ul>
          <router-link class="btn btn-primary name mt-5 text-center d-block " :to="`/post/${art.id}`">commentaires</router-link>
        </div>
      </div>

      <div class="dropdown-divider separation"></div>
    </div>
  </div>

</template>
<script>
import axios from "axios";

export default {
  name: "AllPost",
  data() {
    return {
      arts: [],
      imgoff: 0,
      userId: "",
      isAdmin: 0,
    };
  },
  mounted() {
    this.getAllPost();
  },
  methods: {
    getAllPost() {
      const token = localStorage.getItem("token");
      this.userId = localStorage.getItem("user");
      this.isAdmin = localStorage.getItem("isAdmin");
      axios
        .get("http://localhost:3000/api/post/", {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          console.log(res);
          this.arts = res.data;
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
  object-fit: cover;
}
.userinfo {
  margin-right: 15px;
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
    object-fit: cover;
    border-radius: 20px 20px 0 0;
  }
}
</style>



