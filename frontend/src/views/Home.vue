<template>
  <div class="Home">
    <Nav />
    <CreatePost />
    <AllPost />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src

import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import CreatePost from "@/components/CreatePost.vue";
import AllPost from "@/components/AllPost.vue";
export default {
  name: "Home",
  components: {
    Nav,
    CreatePost,
    AllPost,
    Footer,
  },
};
</script>
