<template>
  <section>
    <section>
      <div class="columns">
        <div class="column">
          <b-button>Add</b-button>
        </div>
      </div>
    </section>
    <section>
      <div
        class="columns"
        v-for="emit in emits"
        :key="emit.id">
        <div class="column">
          <div class="columns">
            <div class="column">
              <b-field
                label="Name"
                label-position="on-border">
                <b-input v-model="emit.name" />
              </b-field>
            </div>
            <div class="column">
              <b-field
                label="Value Type"
                label-position="on-border">
                <b-select
                  v-model="emit.valueType"
                  placeholder="Value Type">
                  <option
                    v-for="type in valueTypes"
                    :key="`type-${type}`"
                    :value="type">
                    {{ type }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-one-fifth">
              <b-button
                @click="$emit('emit-event', emit)">
                Send
              </b-button>
            </div>
          </div>
        </div>
        <div class="column">
          <b-field
            v-if="emit.valueType === 'string'"
            label="Value"
            label-position="on-border">
            <b-input
              v-model="emit.value"
              palceholder="Value" />
          </b-field>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
export default {
  name: 'TabEmits',
  props: {
    emits: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      valueType: '',
      valueTypes: ['string', 'array', 'boolean', 'object', 'null', 'number']
    }
  }
}
</script>