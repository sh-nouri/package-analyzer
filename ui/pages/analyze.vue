<template>
  <div>
    <search :value="name" :placeHolder="'Enter Package Name'" @search="changeSearch"/>
    <hr>
    <div v-if="name">
      <h1>{{ name }}</h1>
      <br>
      <b-progress v-model="progress"></b-progress>

      <!--<Tree :value="tree" />-->
    </div>
  </div>
</template>

<script>
import Search from "~/components/common/search";
import Tree from '~/components/common/tree'

export default {
  components: {
    Search,
    Tree
  },
  data() {
    return {
      progress: 0,
      tree: {}
    }
  },
  computed: {
    name() {
      return this.$route.query.name
    }
  },
  mounted() {
    if (this.name){
      this.fetch()
    }
  },
  methods: {
    async fetch() {
      const { progress } = await this.$axios.$get('/api/package/crawl?name=' + this.name)
      this.progress = progress

      // this.tree = await await this.$axios.$get('/api/package/tree?name=' + this.name)

      if (progress !== 100) {
        this._timeOut = setTimeout(() => this.fetch(), 1000)
      }
      if (progress === 100) {
        await this.$axios.$get('/api/package/analyze?name=' + this.name)
      }
    },
    changeSearch(name) {
      this.$router.push('/analyze?name=' + name)
      window.reload()
    }
  },
  beforeDestroy() {
    if (this._timeOut) {
      clearTimeout(this._timeOut)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
