<template>
    <div>
        <b-tabs>
            <b-tab active>
                <template slot="title">
                    <p class="d-inline text-dark">&#x2728; Find Bests</p>
                </template>
                <offer/>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <p class="d-inline text-dark">&#128230; Analyze Package</p>
                </template>
                <analyze/>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <p class="d-inline text-dark">&#128640; Evaluate Your Packages</p>
                </template>
                <assessment/>
            </b-tab>
            <!--<b-tab>-->
                <!--<template slot="title">-->
                    <!--<p class="d-inline text-dark">&#127894; Bests Chart</p>-->
                <!--</template>-->
                <!--<bests/>-->
            <!--</b-tab>-->
            <b-tab>
                <template slot="title">
                    <b-spinner type="grow" small /><p class="d-inline text-dark ml-1">About us</p>
                </template>
                <aboutus/>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
    import Offer from '~/pages/tabs/offer-component.vue'
    import Assessment from '~/pages/tabs/Assessment-component.vue'
    import Aboutus from '~/pages/tabs/aboutus-component.vue'
    import Bests from '~/pages/tabs/bests-component.vue'
    import Analyze from '~/pages/tabs/analyze-component.vue'

    export default {
      components:{
        Offer,
        Assessment,
        Bests,
        Aboutus,
        Analyze
      },
      data() {
        return {
          res: '...',
        }
      },
      // async mounted() {
      //   this.res = await this.$axios.$get('/api/test')
      // }
    }
</script>
<style>

</style>