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
        physics: {
          minVelocity: 10,
          maxVelocity: 100
        },
        nodes: {
          shape: 'dot',
          size: 25,
          shapeProperties: {
            interpolation: false
          }
        },
        layout: {
          randomSeed: 2
        },
        interaction: {
          navigationButtons: true,
          hover: true,
          dragNodes: false
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
    flattenNodes(node, nodes, edges, parent) {
      nodes.push({
        id: node.id,
        label: node.name,
        group: parent ? parent.id : 'root'
      })
      for (const child of node.childNodes || []) {
        edges.push({
          from: node.id,
          to: child.id
        })
        this.flattenNodes(child, nodes, edges, node)
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
