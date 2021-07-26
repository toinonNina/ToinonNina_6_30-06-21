<template>
  <main id="Post">
    <div>
      <form class="px-4 py-3 Post" id="formpost" encType="multipart/form-data">
        <div class="form-group">
          <label for="title">Titre</label>
          <input type="text" class="form-control" id="title" v-model="title" placeholder="votre titre" required /><br>
          <span class="error" v-if="(!$v.title.required && $v.title.$dirty)">Veuillez ajouter un titre</span>
        </div>
        <div class="form-group">
          <label for="content">Texte</label>
          <textarea class="form-control textarea " rows="3" id="content" placeholder="votre text...ou ajouter une image "></textarea>
        </div>
        <div class="form-group">
          <label class="sr-only" for="image" title="image" role="button">image</label>
          <input type="file" accept=".png, .jpg, .jpeg" v-on:change="onSelect" ref="file" id="image" />
        </div>
        <span id="notfound" class="error"> </span>
        <button type="submit" class="btn btn-danger signup" @click="Postform()">Publier</button>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";
export default {
  name: "CreatePost",
  data() {
    return {
      title: "",
      file: "",
    };
  },
  validations: {
    title: {
      required,
    },
  },
  methods: {
    onSelect() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },

    Postform() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user");
        const title = document.querySelector("#title").value;
        const content = document.querySelector("#content").value;

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
          .post(this.$localhost + "api/post/create", formData, {
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
            document.getElementById("notfound").innerHTML =
              "Une erreur est survenue, veuillez réessayer ultérieurement";
          });
      }
    },
  },
};
</script>
<style scoped>
#post {
  text-align: left;
}
.error {
  color: red;
}
</style>