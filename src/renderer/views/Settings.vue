<template>
  <div>
    <card-collapse>
      <template slot="title">
        Danger zone
      </template>
      <template>
        <div class="columns">
          <div class="column">
            Clear all settings
          </div>
          <div class="column">
            <delete-button
              class="is-pulled-right"
              @click="confirmType = 'deleteSettings'; showConfirm = true" />
          </div>
        </div>
      </template>
    </card-collapse>
    <modal-confirm
      v-if="confirmType"
      :show.sync="showConfirm"
      @cancel="showConfirm = false"
      @confirm="onConfirm()">
        <template slot="title">
          {{ confirmMessages[confirmType].title }}
        </template>
      <template>
        <div class="columns">
          <div class="column">
            {{ confirmMessages[confirmType].body }}
          </div>
        </div>
      </template>
    </modal-confirm>
  </div>
</template>
<script>
// Components
import CardCollapse from '../components/cards/Collapse'
import ModalConfirm from '../components/modals/Confirm'

export default {
  name: 'Settings',
  components: {
    CardCollapse,
    ModalConfirm
  },
  data () {
    return {
      showConfirm: false,
      confirmType: null,
      confirmMessages: {
        deleteSettings: {
          title: 'Confirm delete all settings',
          body: 'Are you sure to delete all settings stored?'
        }
      }
    }
  },
  methods: {
    onConfirm () {
      let type = this.confirmType

      if (type === 'deleteSettings') {
        this.$store.dispatch('clearTabs')
      }

      this.showConfirm = false
      this.confirmType = null
    }
  }
}
</script>