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
        },
        nodes: {
          shape: 'dot',
          size: 25,
          shapeProperties: {
            interpolation: false
          }
        },
        edges: {
          color: {
            inherit: true
          },
          width: 0.15
        },
        layout: {
          improvedLayout: false
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
      const mass = Math.max(1, 4 - node.depth) * 0.5

      nodes.push({
        id: node.id,
        label: node.name + '-' + mass,
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
