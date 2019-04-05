<template>
  <div>
    <search :value="name" :place-holder="'Enter Package Name'" @search="changeSearch" />
    <div v-if="name">
      <div v-if="analyzeResult" class="row">
        <div class="col col-md-3">
          <sticky :data="analyzeResult.tree.analyze" />
        </div>
        <div class="col col-md-9 mt-4">
          <h2>{{ name }}</h2>
          <div class="analyze__messages">
            <ul :class="[collapsed? 'analyze__messages__collapsed' : 'analyze__messages__uncollapsed']">
              <li
                v-for="message in analyzeResult.tree.messages"
                :key="message.message"
                class="analyze__texts"
                :class="{'analyze__messages--positive': message.type ==='positive', 'analyze__messages--negative': message.type ==='error', 'analyze__messages--warn': message.type ==='warn' }"
              >
                <p class="d-inline-block font-weight-bold">
                  In Level {{ analyzeResult.tree.depth +1 }}:
                </p>
                <p class="d-inline-block ml-2 mb-0">
                  {{ message.message }}
                </p>
                <hr>
              </li>
            </ul>
            <hr class="mb-0">
            <button class="analyze__extender btn" @click="collapsed = !collapsed">
              <i :class="{'analyze__rotate': collapsed}" class="fa fa-angle-down" aria-hidden="true" />
            </button>
          </div>
          <b-modal id="tree-modal" size="xl">
            <tree :value="analyzeResult.tree" height="1000px" />
          </b-modal>
        </div>
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
import Sticky from '~/components/stickys/data'

export default {
  components: {
    Search,
    Tree,
    Sticky
  },
  data() {
    return {
      progress: 0,
      analyzeResult: false,
      collapsed: false
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/style/vars";
  .analyze{
    &__texts{
      &:last-child{
        hr{
          display: none;
        }
      }
    }
    &__rotate{
      transform: rotate(-180deg);
    }
    &__extender{
      bottom: -20px;
      left: 50%;
      position: absolute;
      background: #ffff;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
    }
    &__messages{
      position: relative;
      &__collapsed{
        height: 100%;
      }
      &__uncollapsed{
        height: 200px;
        overflow: hidden;
      }
      &--positive{
        &:before{
          color: $success;
          display: inline-block;
          font: normal normal normal 14px/1 FontAwesome;
          content: "\f00c";
        }
      }
      &--negative{
        &:before{
          color: $error;
          display: inline-block;
          font: normal normal normal 14px/1 FontAwesome;
          content: "\f00d";
        }
      }
      &--warn{
        &:before{
          color: $warn;
          display: inline-block;
          font: normal normal normal 14px/1 FontAwesome;
          content: "\f12a";
        }
      }

    }
  }
</style>
