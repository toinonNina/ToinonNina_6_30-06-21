<template>
  <main id="Post">
    <div>
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
        <button type="submit" class="btn btn-primary signup" @click="Postform()">Publier</button>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name: "CreatePost",
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

    Postform() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user");
      console.log(token);
      console.log(userId);
      const title = document.querySelector("#title").value;
      console.log(title);
      const content = document.querySelector("#content").value;
      console.log(content);

      const formData = new FormData();
      formData.append("image", this.file);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("user_id", userId);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        this.$router.push("/");
      }

      axios
        .post("http://localhost:3000/api/post/create", formData, {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          if (res) {
            window.location.reload();
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
#post {
  text-align: left;
}
</style>