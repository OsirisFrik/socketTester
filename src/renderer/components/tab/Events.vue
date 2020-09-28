<template>
  <section>
    <div
      class="columns">
      <div class="column">
        <div class="column">
          <b-button
            @click="addEvent">
            Add
          </b-button>
        </div>
        <div
          class="column"
          v-for="event in _events"
          :key="event.id">
          <div class="columns">
            <div class="column">
              <b-field
                label="Event Name"
                label-position="on-border">
                <b-input v-model="event.name" />
              </b-field>
            </div>
            <div class="column">
              <b-field
                label="Value Type"
                label-position="on-border">
                <b-select
                  v-model="event.responseType"
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
            <div class="column">
              <b-field
                label="Actvie"
                label-position="on-border">
                  <b-switch
                    v-model="event.active" />
              </b-field>
            </div>
            <div class="column">
              <delete-button only-icon />
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'TabEvents',
  props: {
    events: {
      type: Array,
      default: () => []
    },
    socket: {
      default: () => null
    }
  },
  data () {
    return {
      showing: null,
      results: {},
      valueTypes: ['string', 'array', 'boolean', 'object', 'null', 'number'],
      codeMirrorOpts: {
        readOnly: true,
        mode: {
          name: 'javascript',
          json: true
        },
        theme: 'monokai'
      }
    }
  },
  computed: {
    tabId () {
      return this.$route.params.id
    },
    _events: {
      get () {
        return this.events
      },
      updated (val) {
        this.$emit('update:events', val)
      },
      set (val) {
        this.$emit('update:events', val)
      }
    }
  },
  watch: {
    socket (newVal, oldVal) {
      if (newVal) this.subscriveEvents()
    }
  },
  methods: {
    subscriveEvents () {
      let events = this.events

      for (let i = 0; i < events.length; i++) {
        const event = events[i]

        if (event.active) {
          this.socket.on(event.name, (value) => {
            console.group(`event ${event.name}`)
            console.log(value)
            console.groupEnd()
            if (typeof this.results[event.id] !== 'undefined') {
              this.results[event.id].push(value)
            } else {
              this.results[event.id] = [value]
            }
          })
        }
      }
    },
    addEvent () {
      this.$store.dispatch('addEvent', this.tabId)
    }
  }
}
</script>