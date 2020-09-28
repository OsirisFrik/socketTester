<template>
  <div id="app">
    <nav-bar :tabs="tabs" />
    <keep-alive>
      <router-view :key="$route.path" />
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// components
import NavBar from './components/Navbar'

export default {
  name: 'socket-tester',
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['tabs'])
  },
  mounted () {
    window.$app = this
  },
  created () {
    this.$store.watch(state => state.Toast.data, value => {
      this.$buefy.toast.open(value)
    })
  }
}
</script>
