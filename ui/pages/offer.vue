<template>
  <div>
    <search :placeHolder="'packagi a name'" @search="getPackageData"/>
  </div>
</template>

<script>
import Search from "~/components/common/search";

export default {
  name: "offer-component",
  components: {
    Search
  },
  methods: {
    getPackageData() {
      console.log("called");
    }
  }
};
</script>

<style scoped>
</style>
