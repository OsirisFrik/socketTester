<template>
  <b-modal
    v-model="_show"
    has-modal-card
    trap-focus>
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="title">
          Confirm
        </slot>
      </header>
      <section class="modal-card-body">
        <slot />
      </section>
      <footer class="modal-card-foot">
        <slot name="buttons">
          <div class="is-pulled-right">
            <b-button
              type="is-danger"
              icon-pack="remix"
              icon-left="ri-close-line"
              @click="$emit('cancel')">
              Cancel
            </b-button>
            <b-button
              class="is-pulled-right"
              type="is-warning"
              icon-pack="remix"
              icon-left="ri-check-line"
              @click="$emit('confirm')">
              Confirm
            </b-button>
          </div>
        </slot>
      </footer>
    </div>
  </b-modal>
</template>
<script>
export default {
  name: 'ModalConfirm',
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    _show: {
      get () {
        return this.show
      },
      updated (val) {
        this.$emit('update:show', val)
      },
      set (val) {
        this.$emit('update:show', val)
      }
    }
  }
}
</script>