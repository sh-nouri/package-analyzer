<template>
  <div>
    <search :placeHolder="'Enter Package Name'" @search="getPackageData"/>

    <div v-if="searching">Searching...</div>

    <div v-if="results.length" class="results row">
      <div class="col-lg-3">
        <sticky/>
      </div>
      <div class="col-lg-9">
        <div class="row bests__cards">
          <b-card class="col-lg-4 mr-3 mt-4" v-for="result in results" :title="result.package.name" :sub-title="date(result.package.date)">
            <b-card-text class="bests__description">{{ result.package.description }}</b-card-text>
            <b-card-text v-if="result.package.author"><p>Author: <small>{{ result.package.author.name }}</small></p></b-card-text>

            <div v-dragscroll.x>
              <b-card-text class="bests__badges pb-2">
                <b-badge class="py-2 px-2 mr-2" v-for="keyword in result.package.keywords" href="#" variant="primary">{{keyword}}</b-badge>
              </b-card-text>
            </div>
            <b-link :href="result.package.links.npm" target="_blank" class="card-link link">NPM</b-link>
            <b-link :href="result.package.links.repository" target="_blank" class="card-link link">GITHUB</b-link>
            <router-link :to="`/analyze?name=${result.package.name}`" class="card-link link">Analyze</router-link>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "~/components/common/search";
import Sticky from "~/components/stickys/filters";
import { dragscroll } from 'vue-dragscroll';

export default {
  components: {
    Search,
    Sticky
  },
  directives: {
    dragscroll
  },
  data() {
    return {
      results: [],
      searching: false
    }
  },
  methods: {
    date(date){
      let today = new Date();
      let update= new Date(date)
      let last = (today - update)/(1000 * 60 * 60 * 24)
      return `last upadtae is ${last}days ago`
    },
    async getPackageData(name) {
      this.searching = true
      const { results } = await this.$axios.$get('/api/package/search?name=' + name)
      this.results = results
      this.searching = false
    }
  }
};
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
