<template>
  <div id="updatePost">
    <Nav />
    <div>
      <h2>Modifier votre Post</h2>
      <form class="px-4 py-3 Post" id="formpost" encType="multipart/form-data">
        <div class="form-group">
          <label for="title">Titre</label>
          <input type="text" class="form-control" id="title" placeholder="votre titre" required />
        </div>
        <div class="form-group">
          <label for="content">Texte</label>
          <textarea class="form-control textarea " rows="3" id="content" placeholder="votre text..." required></textarea>
        </div>
        <div class="form-group">
          <label for="url" title="choisir une image" role="button"></label>
          <input type="file" accept=".png, .jpg, .jpeg" v-on:change="onSelect" ref="file" id="image" />
        </div>
        <button type="submit" class="btn btn-primary signup" @click="updateForm()">Publier</button><button type="submit" class="btn btn-primary signup ml-5" @click="deleteForm()">Supprimer</button>
      </form>
      <Footer />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Update",
  components: {
    Nav,
    Footer,
  },
  data() {
    return {
      file: "",
    };
  },
  methods: {
    onSelect() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    updateForm() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user");
      console.log(token);
      console.log(userId);
      const title = document.querySelector("#title").value;
      console.log(title);
      const content = document.querySelector("#content").value;
      console.log(content);
      const idPost = this.$route.params.id;

      const formData = new FormData();
      formData.append("image", this.file);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("user_id", userId);

      axios
        .post("http://localhost:3000/api/post/update/" + idPost, formData, {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          if (res) {
            this.$router.push("../Home");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteForm() {
      const token = localStorage.getItem("token");
      const idPost = this.$route.params.id;
      axios
        .delete("http://localhost:3000/api/post/delete/" + idPost, {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          if (res) {
            this.$router.push("../Home");
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
#updatePost {
  text-align: left;
}
h2 {
  padding: 20px;
  font-size: 18px;
}
</style>
