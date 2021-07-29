<template>
  <div class="footernav">
    <footer>
      <ul>
        <li>Confidentialité et sécurité</li>
        <li>Conditions générales</li>
        <li class="copyright">@2021 copyright: Groupomania</li>
      </ul>
    </footer>
  </div>
</template>
<script>
export default {
  name: "Footer",
};
</script>
<style scoped>
.footernav {
  margin-top: 75px;
  background: #c30000;
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.copyright {
  font-size: 14px;
}
ul {
  display: flex;
  justify-content: space-around;
  list-style: none;
  font-size: 14px;
  padding-left: 0px;
  text-align: center;
}
li {
  margin: auto 10px auto 10px;
  color: white;
}
</style>
