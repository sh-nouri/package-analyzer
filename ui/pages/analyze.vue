<template>
  <div>
    <search v-model="name" :value="name" :place-holder="'Enter Package Name'" />
    <div v-if="name">
      <div class="mt-4">
        <h1>{{ name }}</h1>
      </div>
      <hr>
      <div v-if="analyzeResult" class="row">
        <div class="col col-md-3">
          <DataSticky :data="analyzeResult.analyze" />
        </div>
        <div class="col col-md-9 mt-4">
          <div class="analyze__messages">
            <ul>
              <li
                v-for="message in displayMessages"
                :key="message.message"
                class="analyze__texts"
                :class="['analyze__messages--' + message.type]"
              >
                <span>
                  <small class="text-muted"> {{ message.path.join(' » ') }}</small>
                </span>
                <p>
                  <b-badge>{{ message.scope }}</b-badge>
                  <b-badge>{{ message.id }}</b-badge>
                  {{ message.message }}
                </p>
                <hr>
              </li>
            </ul>
            <hr class="mb-0">
            <button class="analyze__extender btn" @click="maxMessageDepth++">
              <i class="fa fa-angle-down" aria-hidden="true" />
            </button>
          </div>
          <b-modal id="tree-modal" size="xl" lazy>
            <tree :value="analyzeResult.tree" height="1000px" />
          </b-modal>
        </div>
      </div>
      <div v-else-if="crawlResult">
        <p>Crawling dependency tree...</p>
        <b-progress v-model="crawlResult.progress" />
        <br>
        <b-row>
          <b-col style="column-count: 3;">
            <ul>
              <li v-for="(status, item) in crawlResult.status" :key="item">
                {{ statusIcon[status] }} {{ item }}
              </li>
            </ul>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '~/components/common/search'
import Tree from '~/components/common/tree'
import DataSticky from '~/components/stickys/data'

export default {
  components: {
    Search,
    Tree,
    DataSticky
  },
  data() {
    return {
      // Crawl
      crawlResult: false,

      // Analyze
      analyzeResult: false,

      // General
      maxMessageDepth: 1,
      name: this.$route.query.name || ''
    }
  },
  computed: {
    statusIcon: () => ({
      queue: '✋',
      crawling: '🔍',
      done: '✓',
      error: '❌'
    }),
    displayMessages() {
      return this.analyzeResult.messages
        .filter(m => m.depth < this.maxMessageDepth)
    }
  },
  watch: {
    name: 'doAnalyze'
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
      this.crawlResult = await this.$axios.$get('/api/package/crawl?name=' + this.name)

      if (this.crawlResult.progress !== 100) {
        this._timeOut = setTimeout(() => this.fetch(), 1000)
      } else {
        this.analyzeResult = await this.$axios.$get('/api/package/analyze?name=' + this.name)
      }
    },
    doAnalyze() {
      this.$router.push('?name=' + this.name)
      this.analyzeResult = false
      this.crawlResult = false
      this.fetch()
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
      &--positive{
        &:before{
          color: $success;
          display: inline-block;
          font: normal normal normal 14px/1 FontAwesome;
          content: "\f00c";
        }
      }
      &--error{
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
