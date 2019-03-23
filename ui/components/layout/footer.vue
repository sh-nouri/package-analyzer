<template>
  <div class="bg-light position-absolute footer pt-3">
    <ul class="footer__links d-inline-block">
      <li>
        <a href>👩‍💻 About Me</a>
      </li>
      <li>
        <a href>🙏 Thanks To</a>
      </li>
      <li>
        <a href>🤝 Supporters</a>
      </li>
    </ul>
    <small class="d-block text-center">copy right</small>
  </div>
</template>

<style lang="scss" scoped>
@import "assets/style/vars";

.footer {
  &__links {
    line-height: 2.5em;
    li {
      color: $product-color;
      &:hover {
        color: $product-hover-color;
      }
    }
  }
  color: $product-color;
  right: 0;
  left: 0;
}
</style>
