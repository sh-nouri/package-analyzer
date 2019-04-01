<template>
    <div class="sticky sticky-top mt-4">
        <b-card
                tag="article"
                style="max-width: 20rem;"
                class="mb-2 text-center"
        >
            <b-card-text class="text-left">
                <small class="font-italic font-weight-bold">packagi score:</small>
                <b-progress class="sticky__main-progress" :value="value" show-progress></b-progress>
                <hr>
                <ul class="pl-0">
                    <li>star:
                        <b-progress :max="max" class="mb-3">
                            <b-progress-bar variant="danger" :value="values[0]"></b-progress-bar>
                            <b-progress-bar variant="warning" :value="values[1]"></b-progress-bar>
                            <b-progress-bar variant="success" :value="values[2]"></b-progress-bar>
                        </b-progress>
                    </li>
                    <li>issues:
                        <b-progress :max="max" class="mb-3">
                            <b-progress-bar variant="danger" :value="values[0]"></b-progress-bar>
                            <b-progress-bar variant="warning" :value="values[1]"></b-progress-bar>
                            <b-progress-bar variant="success" :value="values[2]"></b-progress-bar>
                        </b-progress>
                    </li>
                    <li>downloads:
                        <b-progress :max="max" class="mb-3">
                            <b-progress-bar variant="danger" :value="values[0]"></b-progress-bar>
                            <b-progress-bar variant="warning" :value="values[1]"></b-progress-bar>
                            <b-progress-bar variant="success" :value="values[2]"></b-progress-bar>
                        </b-progress>
                    </li>
                    <li>update:
                        <b-progress :max="max" class="mb-3">
                            <b-progress-bar variant="danger" :value="values[0]"></b-progress-bar>
                            <b-progress-bar variant="warning" :value="values[1]"></b-progress-bar>
                            <b-progress-bar variant="success" :value="values[2]"></b-progress-bar>
                        </b-progress>
                    </li>
                </ul>
            </b-card-text>

            <b-button class="sticky__button mx-auto" href="#" variant="primary">
                <img class="sticky__button--image" src="~/assets/images/tree.png" alt="">
                See Dependency Tree
            </b-button>
        </b-card>
    </div>
</template>

<script>
  export default {
    name: "sticky",
    data() {
      return {
        max: 100,
        value: 20,
        values: [33, 33, 34]
      }
    }
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