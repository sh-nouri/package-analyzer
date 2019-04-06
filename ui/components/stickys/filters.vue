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
        <b-form-checkbox
          v-for="option in frameworksOptions"
          :key="option.value"
          v-model="framework"
          :value="option.value"
          switch
        >
          {{ option.text }}
        </b-form-checkbox>
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
      framework: this.value.framework
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
        { value: 'angular', text: 'Angular' },
        { value: 'express', text: 'Express' }
      ]
    }
  },
  watch: {
    framework: 'onChange',
    sort: 'onChange'
  },
  mounted() {
    this.onChange()
  },
  methods: {
    onChange() {
      this.$emit('input', {
        framework: this.framework,
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
