<template>
  <sticky>
    <div slot="card-content">
      <p class="font-weight-bold font-italic">
        Sort By:
      </p>
      <b-form-select v-model="sort" class="filters__select" :options="sortOptions" :select-size="3" />
      <hr>
      <p class="font-weight-bold font-italic">
        Filter By FrameWork:
      </p>
      <b-form-group>
        <b-form-checkbox-group
          v-model="filter"
          :options="filterOptions"
          switches
          stacked
        />
      </b-form-group>
    </div>
  </sticky>
</template>

<script>
import Sticky from '~/components/common/sticky'
export default {
  name: 'Filters',
  components: {
    Sticky
  },
  data() {
    return {
      sort: null,
      filter: ''
    }
  },
  computed: {
    sortOptions() {
      return [{ value: 1, text: 'maintainance' },
        { value: 2, text: 'popularity' },
        { value: 3, text: 'quality' }
      ]
    },
    filterOptions() {
      return [{ value: 'vue', text: 'Vue' },
        { value: 'react', text: 'React' },
        { value: 'jQuery', text: 'jQuery' },
        { value: 'angular', text: 'Angularjs' },
        { value: 'javaScript', text: 'javaScript' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
    .filters{
        &__select{
            overflow: hidden;
        }
    }

</style>
