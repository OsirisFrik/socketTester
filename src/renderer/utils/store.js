import Store from 'electron-store'
import uid from 'uid'

// eslint-disable-next-line no-unused-vars
import { JSONSchema } from 'json-schema-typed'

/**
 * @type { JSONSchema }
 */
const emitSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: () => uid()
    },
    name: {
      type: 'string'
    },
    valueType: {
      type: 'string',
      default: 'object'
    },
    value: {
      type: ['string', 'array', 'boolean', 'object', 'null', 'number'],
      default: () => {}
    }
  }
}

/**
 * @type { JSONSchema }
 */
const eventSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string',
      default: null
    },
    responseType: {
      type: 'string',
      default: 'object'
    },
    active: {
      type: 'boolean',
      default: false
    }
  }
}

/**
 * @type { JSONSchema }
 */
const optionsSchema = {
  type: 'object',
  properties: {
    name: {
      type: ['string', 'null'],
      default: null
    },
    value: {
      type: ['string', 'null'],
      default: null
    },
    active: {
      type: 'boolean',
      default: false
    }
  }
}

/**
 *  @type { JSONSchema } tabSchema
 */
const tabSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: () => uid()
    },
    name: {
      type: 'string',
      default: 'untitle'
    },
    host: {
      type: ['string', 'null'],
      default: null
    },
    path: {
      type: 'object',
      properties: {
        value: {
          type: ['string', 'null'],
          default: null
        },
        active: {
          type: 'boolean',
          default: false
        }
      }
    },
    options: {
      type: 'object',
      properties: {
        heders: {
          type: 'array',
          items: optionsSchema
        },
        querys: {
          type: 'array',
          items: optionsSchema
        }
      }
    },
    events: {
      type: 'array',
      items: eventSchema
    },
    emits: {
      type: 'array',
      items: emitSchema
    }
  }
}

/**
 * @type { JSONSchema } tabs
 */
const tabsSchema = {
  type: 'array',
  items: tabSchema,
  default: [{
    id: uid(),
    name: 'untitle',
    host: 'http://localhost:3000',
    path: {
      value: null,
      active: false
    },
    options: {
      headers: [],
      querys: []
    },
    events: [],
    emits: [{
      id: uid(),
      name: 'ping',
      valueType: 'string',
      value: 'ping'
    }]
  }]
}

const store = new Store({ schema: { tabs: tabsSchema } })

function getTabById (id) {
  let tabs = store.get('tabs')
  let tab = tabs.find(tab => tab.id === id)

  return tab
}

function saveTabById (tab) {
  let tabs = store.get('tabs')
  let tabIndex = tabs.findIndex(_tab => _tab.id === tab.id)

  if (tabIndex === -1) throw new Error('tab don\'t exits')

  tabs[tabIndex] = tab

  store.set('tabs', tabs)
}

export default store

export {
  getTabById,
  saveTabById
}
