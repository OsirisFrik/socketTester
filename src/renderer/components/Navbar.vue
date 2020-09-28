<template>
  <b-navbar
    type="is-dark"
    :mobile-burger="false">
    <template slot="start">
      <b-navbar-item
        tag="router-link"
        v-for="tab in tabs"
        :key="tab.id"
        :active="$route.params.id && $route.params.id === tab.id"
        :to="`/tab/${tab.id}`">
        {{ tab.name }}
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item
        @click="addTab">
        <b-icon
          pack="remix"
          icon="ri-add-box-line" />
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        to="/settings">
        <b-icon
          pack="remix"
          icon="ri-settings-3-line" />
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
  data () {
    return {
      tab: null
    }
  },
  methods: {
    addTab () {
      this.$store.dispatch('addTab')
    }
  }
}
</script>