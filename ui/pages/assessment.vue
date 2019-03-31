<template>
  <div v-if="!packages">
    <b-form-file ref="fileinput" class="mt-5" @input="readFile" />
  </div>
  <b-row v-else>
    <b-col v-for="pkg of packages" :key="pkg.name" md="4">
      <b-card class="m-2">
        <p>{{ pkg.name }}</p>
        <b-progress v-model="pkg.progress" />
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import uniq from 'lodash/uniq'

export default {
  data() {
    return {
      file: null,
      packages: null,
      searching: false
    }
  },
  methods: {
    readTextFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => resolve(e.target.result)
        reader.onerror = reject
        reader.readAsText(file)
      })
    },
    async readFile(file) {
      const text = await this.readTextFile(file)
      const json = JSON.parse(text)
      const dependencies = Object.keys(json.dependencies || {})
      const devDependencies = Object.keys(json.devDependencies || {})
      const packages = uniq([...dependencies, ...devDependencies])
      this.startSearch(packages)
    },
    async startSearch(packages) {
      const _packages = {}
      for (const name of packages) {
        _packages[name] = {
          name,
          progress: 0
        }
      }
      this.packages = _packages

      for (const name in _packages) {
        this.fetch(name)
      }
      this.searching = true
    },
    async fetch(name) {
      const result = await this.$axios.$get('/api/package/crawl?name=' + name)
      result.name = name
      this.packages[name] = result
      if (result.progress !== 100) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.fetch(name)
      }
    }
  }
}
</script>

<style lang="scss">
    @import "~assets/style/vars";

    .custom-file-label {
        box-sizing: border-box;
        width: 25%;
        margin: auto;
        border: dashed lightgray;
        height: 100px;
        text-align: center;
        padding: 12% 0;

        &:before {
            display: inline-block;
            font: normal normal normal 14px/1 FontAwesome;
            content: "\f16b";
            color: rgba($product-hover-color, 0.5);
            font-size: 15em;
            position: absolute;
            top: 85px;
            left: 18%;
            z-index: -1;
        }

        &:after {
            display: none;
        }
    }
</style>
