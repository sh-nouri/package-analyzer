<template>
  <div class="tabs">
    <div class="nav nav-tabs">
      <router-link v-for="tab in tabs" :key="tab.link" class="nav-item nav-link" active-class="active" :to="tab.link">
        <p class="d-inline text-dark">
          <span v-html="tab.icon" />
          {{ tab.title }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    tabs() {
      return [
        {
          link: '/bests',
          title: 'Find Bests',
          icon: '&#x2728;'
        },
        {
          link: '/analyze',
          title: 'Analyze Package',
          icon: '&#128230;'
        },
        {
          link: '/assessment',
          title: 'Evaluate Your Packages',
          icon: '&#128640;'
        },
        {
          link: '/about',
          title: 'About us',
          icon: ''
        }
      ]
    }
  }
}
</script>
