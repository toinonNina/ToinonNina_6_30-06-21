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
          <input type="texte" class="form-control textarea" id="content" placeholder="votre text..." required />
        </div>
        <div class="form-group">
          <label for="url" title="choisir une image" role="button"></label>
          <input type="file" accept=".png, .jpg, .jpeg" ref="file" id="image" />
        </div>
        <button type="submit" class="btn btn-primary signup" @click="Postform()">Publier</button>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: "CreatePost",
  methods: {
    Postform() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user");
      console.log(token);
      console.log(userId);
      const title = document.querySelector("#title").value;
      console.log(title);
      const content = document.querySelector("#content").value;
      console.log(content);
      const image = document.querySelector("#image").files[0];
      console.log(image);

      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("user_id", userId);

      fetch("http://localhost:3000/api/post/create", {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: "bearer " + token,
        },
        body: formData,
      })
        .then((res) => {
          if (res.status == 201) {
            window.location.href = "http://localhost:8080/#/";
          } else {
            res.json().then((data) => {
              console.log(data);
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
#post {
  text-align: left;
}
</style>