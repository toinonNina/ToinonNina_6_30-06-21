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
          <li class="nav-item">
            <span class="">modifier </span>
          </li>
          <li class="nav-item">
            <span class="">supprimer </span>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>