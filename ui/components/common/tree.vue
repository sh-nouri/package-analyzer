<template>
    <div>
        {{ tree }}
        <TreeV :data="tree" node-text="name" layoutType="circular" />
    </div>
</template>

<script>
  import 'd3-transition'
  import { tree as TreeV } from 'vued3tree'

  export default {
    components: {
      TreeV
    },
    data() {
      return {
        tree: {
          name: "father",
          children:[{
            name: "son1",
            children:[ {name: "grandson"}, {name: "grandson2"}]
          },{
            name: "son2",
            children:[ {name: "grandson3"}, {name: "grandson4"}]
          }]
        }
      }
    },
    props: {
      value: {
        type: Object
      }
    }
  }
</script>