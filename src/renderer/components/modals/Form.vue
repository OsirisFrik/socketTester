<template>
  <b-modal
    v-model="_show"
    v-bind="$props"
    trap-focus
    has-modal-card>
    <form @submit.capture.prevent="$emit('submit')">
      <div class="modal-card">
        <header class="modal-card-head">
          <slot name="title">
            Edit
          </slot>
        </header>
        <section class="modal-card-body">
          <slot />
        </section>
        <footer class="modal-card-foot">
          <slot name="buttons">
            <div class="is-pulled-right">
              <b-button
                icon-pack="remix"
                icon-left="ri-delete-bin-line"
                type="is-danger">
                Delete
              </b-button>
              <b-button
                native-type="submit"
                type="is-success"
                icon-pack="remix"
                icon-left="ri-save-line">
                Save
              </b-button>
            </div>
          </slot>
        </footer>
      </div>
    </form>
  </b-modal>
</template>
<script>
export default {
  name: 'ModalForm',
  props: {
    show: {
      type: Boolean,
      required: true
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
  },
  methods: {
  }
}
</script>