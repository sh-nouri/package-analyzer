<template>
  <div>
    {{ value }}
  </div>
</template>

<script>
import { DataSet, Network } from 'vis/dist/vis.js'
import 'vis/dist/vis.css'

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    data() {
      const nodes = []
      const edges = []
      this.flattenNodes(this.value, nodes, edges)
      return {
        nodes: new DataSet(nodes),
        edges: new DataSet(edges)
      }
    },
    options() {
      return {
        ...this.$attrs,
        physics: false,
        nodes: {
          shape: 'dot',
          // size: 100,
          font: {
            size: 50
          }
        },
        edges: {
          color: {
            inherit: true
          },
          width: 0.15
        },
        layout: {
          hierarchical: {
            enabled: true,
            sortMethod: 'directed',
            levelSeparation: 700,
            nodeSpacing: 300
          }
        }
      }
    }
  },
  watch: {
    data: 'updateData',
    options: 'updateOptions'
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    if (this.network) {
      this.network.destroy()
    }
  },
  methods: {
    flattenNodes(node, nodes, edges) {
      nodes.push({
        id: node.id,
        label: node.name,
        group: node.depth
      })
      for (const child of node.childNodes || []) {
        edges.push({
          from: node.id,
          to: child.id
        })
        this.flattenNodes(child, nodes, edges)
      }
    },
    init() {
      this.network = new Network(this.$el, this.data, this.options)
    },
    updateData() {
      if (this.network) {
        this.network.setData(this.data)
      }
    },
    updateOptions() {
      if (this.network) {
        this.network.setOptions(this.data)
      }
    }
  }
}
</script>
