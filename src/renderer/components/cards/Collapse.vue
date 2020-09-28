<template>
  <b-collapse
    class="card"
    :animation="animation"
    :aria-id="ariaId">
    <div
      slot="trigger"
      slot-scope="props"
      class="card-header"
      role="button"
      :aria-controls="ariaId">
      <p class="card-header-title">
        <slot name="title" />
      </p>
      <a class="card-header-icon">
        <b-icon
          pack="remis"
          :icon="props.open ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'" />
      </a>
    </div>
    <div class="card-content">
      <div class="content">
        <slot />
      </div>
    </div>
  </b-collapse>
</template>
<script>
import uid from 'uid'

export default {
  name: 'CardCollapse',
  props: {
    ariaId: {
      type: String,
      default: () => uid()
    },
    animation: {
      type: String,
      default: 'slide'
    }
  }
}
</script>