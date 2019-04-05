<template>
    <div class="analyze">
        <search :placeholder="'package name'"/>
    </div>
</template>

<script>
    import search from '~/components/common/search';
    export default {
    name: "test",
    components:{
      search,
      sticky
    },
    data() {
      return{
        collapsed: false
      };
    }
  }
</script>

<style lang="scss" scoped>


</style>