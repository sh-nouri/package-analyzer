<template>
  <div>
    <search :value="name" :place-holder="'Enter Package Name'" @search="changeSearch" />
    <hr>
    <div v-if="name">
      <h1>{{ name }}</h1>
      <br>

      <div v-if="analyzeResult">
        <h2>Analyze Result</h2>
        <!-- <pre>{{ JSON.stringify(analyzeResult, null, 2) }}</pre> -->
        <Tree :value="analyzeResult.tree" height="1000px" />
      </div>
      <div v-else>
        <p>Crawling...</p>
        <b-progress v-model="progress" />
      </div>
    </div>
  </div>
</template>

<script>
import Search from '~/components/common/search'
import Tree from '~/components/common/tree'

export default {
  components: {
    Search,
    Tree
  },
  data() {
    return {
      progress: 0,
      analyzeResult: null
    }
  },
  computed: {
    name() {
      return this.$route.query.name
    }
  },
  mounted() {
    if (this.name) {
      this.fetch()
    }
  },
  beforeDestroy() {
    if (this._timeOut) {
      clearTimeout(this._timeOut)
    }
  },
  methods: {
    async fetch() {
      console.log('Fetch...')
      const { progress } = await this.$axios.$get('/api/package/crawl?name=' + this.name)
      this.progress = progress

      console.log(progress)

      if (progress !== 100) {
        this._timeOut = setTimeout(() => this.fetch(), 1000)
      } else {
        this.analyzeResult = await this.$axios.$get('/api/package/analyze?name=' + this.name)
      }
    },
    changeSearch(name) {
      this.$router.push('/analyze?name=' + name)
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
