<template>
  <div>
    <search :place-holder="'Enter Package Name'" @search="getPackageData" />

    <div v-if="searching">
      Searching...
    </div>

    <div class="results">
      <div v-for="result in results" :key="result.package.name" class="results__item">
        Name: <router-link :to="`/analyze?name=${result.package.name}`">
          {{ result.package.name }}
        </router-link> <br>
        Latest: {{ result.package.version }}
      </div>
    </div>
  </div>
</template>

<script>
import Search from '~/components/common/search'

export default {
  components: {
    Search
  },
  data() {
    return {
      results: [],
      searching: false
    }
  },
  methods: {
    async getPackageData(name) {
      this.searching = true
      const { results } = await this.$axios.$get('/api/package/search?name=' + name)
      this.results = results
      this.searching = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "assets/style/vars";

  .results__item {
    min-height: 50px;
    border: 1px solid black;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
      a:hover {
        color: $product-color;
      }
  }
</style>
