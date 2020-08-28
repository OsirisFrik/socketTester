<template>
  <div>
    <section class="section">
      <div class="columns">
        <div class="column is-two-fifths">
          <b-input
            v-model="tab.host"
            placeholder="WS URL" />
        </div>
        <div class="column">
          <b-button
            type="is-success"
            @click="connect">
            Connect
          </b-button>
          <b-button
            type="is-danger"
            :disabled="socket === null"
            @click="disconnect">
            Disconnect
          </b-button>
        </div>
        <div class="column">
          
        </div>
      </div>
    </section>
    <b-tabs
      v-if="typeof tab.id !== 'undefined'"
      v-model="activeTab">
      <b-tab-item label="Option">
        <tab-options />
      </b-tab-item>
      <b-tab-item label="Events">
        <tab-events
          :events="tab.events"
          :socket="socket" />
      </b-tab-item>
      <b-tab-item label="Emits">
        <tab-emits
          :emits="tab.emits"
          @emit-event="emitEvent" />
      </b-tab-item>
    </b-tabs>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import TabOptions from '../components/tab/Options'
import TabEmits from '../components/tab/Emits'
import TabEvents from '../components/tab/Events'

import SockectConnection from '../utils/socket'
import { getTabById, saveTabById } from '../utils/store'

export default {
  name: 'TabView',
  components: {
    TabOptions,
    TabEvents,
    TabEmits
  },
  data () {
    return {
      activeTab: 1,
      socket: null,
      tab: {},
      saving: null
    }
  },
  beforeMount () {
    if (process.env.NODE_ENV === 'development') window[`$tab_${this.$route.params.id}`] = this

    let tab = getTabById(this.$route.params.id)

    if (!tab) this.$router.replace('/')
    this.tab = tab
  },
  watch: {
    tab: {
      deep: true,
      handler (newValue, oldValue) {
        console.log(newValue, oldValue)
        if (!oldValue.id) return

        if (this.saving) clearInterval(this.saving)

        this.saving = setTimeout(this.saveTab, 1000)
      }
    }
  },
  methods: {
    ...mapMutations({
      toast: 'TOAST'
    }),
    connect () {
      if (this.socket) return

      let tab = this.tab
      let socket = new SockectConnection(tab.host).socket

      this.socket = socket
    },
    disconnect () {
      if (!this.socket) return

      this.socket.disconnect()
      this.socket = null
    },
    emitEvent (event) {
      if (!this.socket) {
        this.toast({
          message: 'Socket client not connected',
          type: 'is-warning'
        })

        return
      }

      this.socket.emit(event.name, event.value)
    },
    saveTab () {
      try {
        saveTabById(this.tab)
      } catch (err) {
        this.toast({
          message: err.message,
          type: 'is-danger'
        })
      }
    }
  }
}
</script>