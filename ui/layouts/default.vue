<template>
  <div>
    <div>
        <LayoutHeader />
    </div>
    <main class="my-5">
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
    min-height: 90vh;
}
</style>
