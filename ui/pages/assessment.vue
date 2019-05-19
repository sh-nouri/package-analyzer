<template>
  <div>
    <b-form-file class="mt-5" @input="uploadPackage" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null
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
    async uploadPackage(file) {
      this.error = null

      // Read file
      const text = await this.readTextFile(file)
      const json = JSON.parse(text)

      // Create virtual pkg
      const pkg = {
        name: `${json.name || 'pkg'}_${Math.round(Math.random() * 1000000)}`,
        dependencies: {
          ...(json.dependencies || {}),
          ...(json.devDependencies || {})
        }
      }

      // Upload pkg
      await this.$axios.$post('/api/package/upload', pkg)

      // Redirect to analyze
      this.$router.push('/analyze?name=' + pkg.name)
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
