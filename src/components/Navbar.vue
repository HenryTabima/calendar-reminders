<template>
  <b-navbar type="is-light">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }" class="brand-item">
        Calendar Reminders
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Home
      </b-navbar-item>
      <b-navbar-item href="https://henrytabima.com/" target="_blank">
        About
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<style lang="stylus">
.brand-item
  font-size 1.2rem
  font-weight bold
  font-family "Helvetica Neue", Helvetica, Arial, sans
</style>
