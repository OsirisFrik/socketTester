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
      type: ['string', 'null']
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
 * @type { JSONSchema }
 */
const optionsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
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
      type: ['string', 'null'],
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
    host: null,
    path: {
      value: null,
      active: false
    },
    options: {
      headers: [],
      querys: []
    },
    events: [],
    emits: []
  }]
}

export default tabsSchema
