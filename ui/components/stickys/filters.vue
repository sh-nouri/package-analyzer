<template>
  <sticky>
    <div slot="card-content">
      <p class="font-weight-bold font-italic">
        Sort by
      </p>
      <b-form-radio-group v-model="sort" stacked class="filters__select" :options="sortOptions" :select-size="3" />
      <hr>
      <p class="font-weight-bold font-italic">
        Filter by framework
      </p>
      <b-form-group>
        <b-form-checkbox-group
          v-model="frameworks"
          :options="frameworksOptions"
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
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      sort: this.value.sort,
      frameworks: this.value.frameworks || []
    }
  },
  computed: {
    sortOptions() {
      return [{ value: 1, text: 'maintainance' },
        { value: 2, text: 'popularity' },
        { value: 3, text: 'quality' }
      ]
    },
    frameworksOptions() {
      return [{ value: 'vue', text: 'Vue' },
        { value: 'react', text: 'React' },
        { value: 'jQuery', text: 'jQuery' },
        { value: 'angular', text: 'Angularjs' },
        { value: 'javaScript', text: 'javaScript' }
      ]
    }
  },
  watch: {
    frameworks: 'onChange',
    sort: 'onChange'
  },
  mounted() {
    this.onChange()
  },
  methods: {
    onChange() {
      this.$emit('input', {
        frameworks: this.frameworks,
        sort: this.sort
      })
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
