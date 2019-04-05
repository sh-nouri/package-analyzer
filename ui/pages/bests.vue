<template>
  <div>
    <search v-model="name" :place-holder="'Enter Package Name'" />
    <div class="results row">
      <div class="col-lg-3">
        <Filters v-model="filters" />
      </div>
      <div class="col-lg-9">
        <div v-if="searching" class="row">
          <div class="m-5">
            Searching...
          </div>
        </div>
        <div v-else class="row bests__cards">
          <b-card v-for="result in results" :key="result.package.name" class="col-lg-4 mr-3 mt-4" :title="result.package.name" :sub-title="date(result.package.date)">
            <b-card-text class="bests__description">
              {{ result.package.description }}
            </b-card-text>
            <b-card-text v-if="result.package.author">
              <p>Author: <small>{{ result.package.author.name }}</small></p>
            </b-card-text>
            <div>
              <b-card-text v-dragscroll class="bests__badges pb-2">
                <b-badge v-for="keyword in result.package.keywords" :key="keyword" class="py-2 px-2 mr-2" variant="primary">
                  {{ keyword }}
                </b-badge>
              </b-card-text>
            </div>
            <b-link :href="result.package.links.npm" target="_blank" class="card-link link">
              NPM
            </b-link>
            <b-link :href="result.package.links.repository" target="_blank" class="card-link link">
              GITHUB
            </b-link>
            <router-link :to="`/analyze?name=${result.package.name}`" class="card-link link">
              Analyze
            </router-link>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '~/components/common/search'
import Filters from '~/components/stickys/filters'
import dragscroll from 'vue-dragscroll/src/directive'

export default {
  components: {
    Search,
    Filters
  },
  directives: {
    dragscroll
  },
  data() {
    return {
      results: [],
      searching: false,
      name: this.$route.query.name || '',
      filters: this.$route.query.filters
        ? JSON.parse(decodeURIComponent(this.$route.query.filters)) : {}
    }
  },
  watch: {
    name: 'doSearch',
    filters: 'doSearch'
  },
  mounted() {
    this.doSearch()
  },
  methods: {
    date(date) {
      const today = new Date()
      const update = new Date(date)
      const last = Math.round((today - update) / (1000 * 60 * 60 * 24))
      return `last upadtae ${last} day${last > 1 ? 's' : ''} ago`
    },
    async doSearch() {
      this.$router.replace(`?name=${this.name}&filters=${JSON.stringify(this.filters)}`)
      this.searching = true

      const q = [...this.filters.frameworks, this.name].join('+')

      const { results } = await this.$axios.$get('/api/package/search?name=' + q)
      this.results = results
      this.searching = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "assets/style/vars";

  .bests {
    &__description{
      max-height: 50px;
      white-space: pre-line;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__badges{
      white-space: nowrap;
      overflow: hidden;
    }
    &__cards{
      @media (min-width: 992px){
        .col-lg-4 {
          flex: 0 0 33.333333%;
          max-width: 31.8%;
          transition: all 0.8s;
          &:hover{
            background-color: rgba($product-color, 0.05);
            border-color: rgba($product-active-color,0.3);
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
