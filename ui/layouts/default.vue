<template>
  <div>
    <div class="fixed-top">
        <LayoutHeader />
    </div>
    <main>
        <LayoutTabs />
        <div class="container">
            <Nuxt/>
        </div>
    </main>
    <LayoutFooter />
  </div>
</template>

<script>
import LayoutHeader from "~/components/layout/header";
import LayoutTabs from "~/components/layout/tabs";
import LayoutFooter from "~/components/layout/footer";

export default {
  components: {
    LayoutHeader,
    LayoutTabs,
    LayoutFooter
  }
};
</script>

<style lang="scss" scoped>
@import "assets/style/vars";

main {
    margin-top: 100px;
    min-height: 90vh;
}
</style>
