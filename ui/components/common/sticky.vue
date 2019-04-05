<template>
  <div class="sticky sticky-top pt-4">
    <b-card
      tag="article"
      style="max-width: 20rem;"
      class="mb-2 text-center"
    >
      <b-card-text class="text-left">
        <slot name="card-content" />
      </b-card-text>

      <slot name="card-action" />
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Sticky'
}
</script>

<style lang="scss">
    @import "~assets/style/vars";
    .sticky{
        &__main-progress{
            .progress-bar{
                background-color: $product-color;
            }
        }
        &__button{
            &--image{
                width: 20px;
            }
        }
    }
</style>
