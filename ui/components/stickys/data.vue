<template>
  <sticky>
    <div slot="card-content">
      <small class="font-italic font-weight-bold">packagi score:</small>
      <b-progress class="sticky__main-progress" :value="data.score" show-progress />
      <hr>
      <ul class="pl-0">
        <li v-for="measurement in data.measurements" :key="measurement.name">
          {{ measurement.name }}:
          <b-progress :value="measurement.score" :variant="range(measurement.score)" />
        </li>
      </ul>
    </div>
    <div slot="card-action">
      <b-button v-b-modal.tree-modal class="sticky__button mx-auto" variant="primary">
        <img class="sticky__button--image" src="~/assets/images/tree.png" alt="">
        See Dependency Tree
      </b-button>
    </div>
  </sticky>
</template>

<script>
import Sticky from '~/components/common/sticky'
export default {
  name: 'Data',
  components: {
    Sticky
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      max: 100,
      value: 20,
      values: [33, 33, 34]
    }
  },
  methods: {
    range(value) {
      if (value < 30) {
        return 'danger'
      }
      if (value < 60 && value >= 30) {
        return 'warning'
      }
      if (value >= 60) {
        return 'success'
      }
    }
  }
}
</script>

<style scoped>

</style>
