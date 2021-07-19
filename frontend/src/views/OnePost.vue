<template>
  <div class="Home">
    <h1>Bienvenue sur le réseau Social de Groupomania</h1>
    <Nav />

    <OnePost />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src

import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import OnePost from "@/components/OnePost.vue";

export default {
  name: "Home",
  components: {
    Nav,
    OnePost,
    Footer,
  },
};
</script>
<style scoped>
h1 {
  text-align: center;
  font-size: 18px;
}
</style>