<template>
    <div>{{ res }}</div>
</template>

<script>
    export default {
      data() {
        return {
          res: '...'
        }
      },
      async mounted() {
        this.res = await this.$axios.$get('/api/test')
      }
    }
</script>