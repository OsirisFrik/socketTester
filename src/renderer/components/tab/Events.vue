<template>
  <section>
    <section>
      <div class="columns">
        <div class="column">
          <b-button
            @click="addEvent">
            Add
          </b-button>
        </div>
      </div>
    </section>
    <section>
      <div
        class="columns"
        v-for="event in events"
        :key="event.id">
        <div class="column">
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
          </div>
        </div>
        <div class="column">
          <codemirror
            :value="_results"
            :options="codeMirrorOpts" />
        </div>
      </div>
    </section>
  </section>
</template>
<script>
import uid from 'uid'

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
    _results: {
      get () {
        return JSON.stringify(this.results)
      },
      set (val) {
        this.results = JSON.parse(val)
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
      let event = {
        id: uid(),
        name: null,
        active: false,
        responseType: 'string'
      }

      this.events.push(event)
    }
  }
}
</script>