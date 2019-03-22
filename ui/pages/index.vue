<template>
    <div>
        <b-tabs>
            <b-tab active>
                <template slot="title">
                    <b-spinner type="grow" small /> I'm <i>Custom</i> <strong>Title</strong>
                </template>
                <p class="p-3">Tab Contents 1</p>
            </b-tab>

            <b-tab>
                <template slot="title">
                    <b-spinner type="border" small /> Tab 2
                </template>
                <p class="p-3">Tab Contents 2</p>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          res: '...'
        }
      },
      // async mounted() {
      //   this.res = await this.$axios.$get('/api/test')
      // }
    }
</script>