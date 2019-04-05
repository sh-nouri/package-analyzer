<template>
  <div class="search mt-5">
    <b-form inline @submit.prevent="search">
      <label class="sr-only">{{ placeHolder }}</label>
      <b-input-group prepend="📦" class=" mb-sm-0 w-75">
        <b-input v-model="searchInput" :placeholder="placeHolder" />
      </b-input-group>
      <b-button variant="primary" class="w-25" @click="search">
        Packagi
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    placeHolder: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchInput: ''
    }
  },
  methods: {
    search() {
      this.$emit('search', this.searchInput)
    }
  }
}
</script>

<style lang="scss" scoped>
    .search{
        .form-control{
            border-radius: 0;
        }
        .btn-primary{
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }

</style>
