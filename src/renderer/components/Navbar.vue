<template>
  <b-navbar
    type="is-dark"
    :mobile-burger="false">
    <template slot="start">
      <b-navbar-item
        v-for="tab in tabs"
        :key="tab.id"
        @click="goToTab(tab.id)">
        {{ tab.name }}
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
export default {
  name: 'NavBar',
  props: {
    tabs: {
      type: Array,
      required: true
    }
  },
  methods: {
    goToTab (id) {
      this.$router.push(`/tab/${id}`)
    }
  }
}
</script>