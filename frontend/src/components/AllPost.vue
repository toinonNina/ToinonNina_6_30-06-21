<template>
  <div class="mx-auto">
    <div class="card card-product mx-auto">

      <div class="card-body product-body">
        <h2 class="card-title name">${title}</h2>
        <div class="dropdown-divider separation"></div>
        <p class="card-text price">${content} </p>
        <img class="card-img-top product-img" src="../assets/Groupomania-Logo.png" alt="${myProduct.name}" />
        <div class="dropdown-divider separation"></div>
        <ul class="navbar-nav mt-2 mt-lg-0 flex-row">
          <li class="nav-item active userinfo">
            <span class="">username</span>
          </li>
          <li class="nav-item">
            <span class="">date creation </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AllPost",
};
</script>
<style scoped>
.card-product {
  margin-top: 140px;
  display: flex;
  border-radius: 20px 20px;
  width: 71%;
}
.product-img {
  width: 70%;

  object-fit: cover;
  border-radius: 20px 20px 0 0;
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



