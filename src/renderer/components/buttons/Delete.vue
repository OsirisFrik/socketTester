<template>
  <b-button
    v-bind="$props"
    icon-pack="remix"
    icon-left="ri-delete-bin-line"
    type="is-danger"
    @click="$emit('click')">
    <slot>
      <span v-if="!onlyIcon">
        Delete
      </span>
    </slot>
  </b-button>
</template>
<script>
export default {
  name: 'DeleteButton',
  props: {
    onlyIcon: {
      type: Boolean,
      default: false
    }
  }
}
</script>