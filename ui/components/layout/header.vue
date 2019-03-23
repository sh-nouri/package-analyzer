<template>
  <div class="header bg-white w-100">
    <img class="header__logo" src="~/assets/images/logo.png" alt="logo">
    <ul class="float-right header__medias ml-auto mr-4 mb-0">
      <li class="d-inline ml-2">
        <a href>
          <i class="fa fa-twitter-square" aria-hidden="true"/>
        </a>
      </li>
      <li class="d-inline ml-2">
        <a href>
          <i class="fa fa-linkedin-square" aria-hidden="true"/>
        </a>
      </li>
      <li class="d-inline ml-2">
        <a href>
          <i class="fa fa-github" aria-hidden="true"/>
        </a>
      </li>
      <li class="d-inline ml-2">
        <a href>
          <i class="fa fa-envelope" aria-hidden="true"/>
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "assets/style/vars";

.header {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  height: 70px;
  max-height: 70px;

  display: flex;
  align-items: center;

  &__logo {
    height: 90%;
    width: auto;
  }

  &__medias {
    color: $product-color;
    a {
      &:hover {
        color: $product-hover-color;
      }
    }
  }
}
</style>
