<template>
  <div>
    <section class="section">
      <div class="columns">
        <div class="column is-two-fifths">
          <b-field
            label="WS URL"
            label-position="on-border">
            <b-input
              v-model="tab.host"
              placeholder="WS URL" />
          </b-field>
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
          <b-button
            class="is-pulled-right"
            icon-pack="remix"
            icon-left="ri-edit-box-line"
            @click="modalEdit = true">
            Edit
          </b-button>
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
    <modal-form
      :show.sync="modalEdit"
      :name.sync="tab.name"
      @submit="modalSave">
      <template slot="title">
        Edit tab &nbsp;<b>{{ tab.name }}</b>
      </template>
      <div class="columns">
        <div class="column">
          <b-field
            label="Name"
            label-position="on-border">
            <b-input v-model="tab.name" />
          </b-field>
        </div>
      </div>
    </modal-form>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

// Utils
import SockectConnection from '../utils/socket'

// Components
import TabOptions from '../components/tab/Options'
import TabEmits from '../components/tab/Emits'
import TabEvents from '../components/tab/Events'
import ModalForm from '../components/modals/Form'

import { tabsCtrl } from '../utils/store'

export default {
  name: 'TabView',
  components: {
    TabOptions,
    TabEvents,
    TabEmits,
    ModalForm
  },
  data () {
    return {
      activeTab: 1,
      socket: null,
      saving: null,
      modalEdit: false,
      tab: {}
    }
  },
  async beforeMount () {
    if (process.env.NODE_ENV === 'development') {
      window[`$tab_${this.$route.params.id}`] = this
    }

    let tab = await tabsCtrl.getTabById(this.$route.params.id)
    if (!tab.id) this.$router.replace('/')
    else this.tab = tab
  },
  watch: {
    tab: {
      deep: true,
      handler (newValue, oldValue) {
        if (!oldValue.id) return

        if (this.saving) clearInterval(this.saving)

        this.saving = setTimeout(this.saveTab, 5000)
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
    async saveTab () {
      this.$store.dispatch('saveTab', this.tab)
    },
    modalSave () {
      if (this.saving) {
        clearInterval(this.saving)
        this.saving = null
      }

      this.saveTab()
      this.modalEdit = false
    }
  }
}
</script>