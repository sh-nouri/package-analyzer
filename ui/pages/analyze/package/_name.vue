<template>
  <div>
    <search :placeHolder="'Enter Package Name'" @search="getPackageData"/>
  </div>
</template>

<script>
import Search from "~/components/common/search";
export default {
  name: "analyze-component",
  components: {
    Search
  },
  methods: {
    async getPackageData() {
      console.log("called");
      await this.$axios.get("/test").then(res => {
        console.log("hey");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
