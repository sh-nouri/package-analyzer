<template>
  <div>
    <search :place-holder="'packagi a name'" @search="getPackageData" />
  </div>
</template>

<script>
import Search from '~/components/common/search'

export default {
  components: {
    Search
  },
  methods: {
    getPackageData() {
      console.log('called')
    }
  }
}
</script>

<style scoped>
</style>
