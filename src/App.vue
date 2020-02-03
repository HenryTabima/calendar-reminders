<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view/>
    </div>
    <b-loading :is-full-page="true" :active="$store.state.isLoading" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  },
  metaInfo: {
    link: [{
      rel: 'stylesheet',
      href: 'https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css'
    }]
  }
}
</script>
