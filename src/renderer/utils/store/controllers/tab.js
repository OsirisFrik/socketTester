import uid from 'uid'
// eslint-disable-next-line no-unused-vars
import ElectronStore from 'electron-store'

/**
 * @typedef { Object } EmitSchema
 * @property { String } id
 * @property { String | null } [name=null]
 * @property { ( 'object' | 'string' | 'number' | 'boolean' ) } [valueType='object']
 * @property { String | Array | Boolean | Number | null } value
 */

/**
 * @typedef { Object } EventSchema
 * @property { String } id
 * @property { String | null } [name=null]
 * @property { Boolean } [active=false]
 */

/**
 * @typedef { Object } PathSchema
 * @property { String | null } [value=null]
 * @property { Boolean } [active=false]
 */

/**
 * @typedef { Object } OptionsSchema
 * @property { String } id
 * @property { String | null } [name=null]
 * @property { String | null } [value=null]
 * @property { Boolean } [active=false]
 */

/**
 * @typedef { Object } TabSchema
 * @property { String } id
 * @property { String | null } [name=null]
 * @property { String | null } [host=null]
 * @property { PathSchema } path
 * @property { { headers: OptionsSchema, querys: OptionsSchema } } options
 * @property { Array<EventSchema> } [events=[]]
 * @property { Array<EmitSchema> } [emits=[]]
 */

class TabCtrl {
  /**
   * @method constructor
   * @param { ElectronStore } store
   */
  constructor (store) {
    this.store = store
    /**
     * @type { Array<TabSchema> }
     */
    this.tabs = this.store.get('tabs')
  }

  /**
   * @method saveTabs
   * @param { Array<TabSchema> } tabs
   */

  async saveTabs (tabs) {
    this.store.set('tabs', tabs)

    return this.getTabs()
  }

  /**
   * @method getTabs
   * @returns { Promise<Array<TabSchema>> }
   */

  async getTabs () {
    return (this.tabs = this.store.get('tabs'))
  }

  /**
   * @method getTabById
   * @param { String } tabId
   * @returns { Promise<TabSchema> }
   */
  async getTabById (tabId) {
    return this.tabs.find(tab => tab.id === tabId)
  }

  /**
   * @method getTabIndex
   * @param { String } tabId
   * @returns { Number }
   */

  getTabIndex (tabId) {
    return this.tabs.findIndex(tab => tab.id === tabId)
  }

  /**
   * @method saveTab
   * @param { TabSchema } tab
   */
  async saveTab (tab) {
    let tabs = this.tabs
    let tabIndex = this.getTabIndex(tab.id)

    if (tabIndex < 0) tabs.push(tab)
    else tabs[tabIndex] = tab

    return this.saveTabs(tabs)
  }

  /**
   * @method addTab
   */

  async addTab () {
    let tab = {
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
    }

    return this.saveTab(tab)
  }

  async deleteTab (tabId) {
    let tabs = this.tabs
    let tabIndex = this.getTabIndex(tabId)

    if (tabIndex < 0) throw new Error('Tab not found')

    tabs.splice(tabIndex, 1)

    return this.saveTabs(tabs)
  }

  /**
   * @method addEmit
   * @param { String } tabId
   */

  async addEmit (tabId) {
    let tab = await this.getTabById(tabId)
    /**
     * @type { EmitSchema }
     */
    let emit = {
      id: uid(),
      name: null,
      value: {},
      valueType: 'object'
    }

    tab.emits.push(emit)

    return this.saveTab(tab)
  }

  /**
   * @method removeEmit
   * @param { String } tabId
   * @param { String } emitId
   */

  async removeEmit (tabId, emitId) {
    let tab = await this.getTabById(tabId)
    let emitIndex = tab.emits
      .findIndex(emit => emit.id === emitId)

    if (emitIndex < 0) throw new Error('Emit not found')

    tab.emits.splice(emitIndex, 1)

    return this.saveTab(tab)
  }

  /**
   * @method addEvent
   * @param { String } tabId
   */

  async addEvent (tabId) {
    let tab = await this.getTabById(tabId)
    /**
     * @type { EventSchema }
     */
    let event = {
      id: uid(),
      name: null,
      active: false
    }

    tab.events.push(event)

    return this.saveTab(tab)
  }

  /**
   * @method removeEvent
   * @param { String } tabId
   * @param { String } eventId
   */

  async removeEvent (tabId, eventId) {
    let tab = await this.getTabById(tabId)
    let eventIndex = tab.events
      .findIndex(event => event.id === eventId)

    if (eventIndex < 0) throw new Error('Event not found')

    tab.events.splice(eventIndex, 1)

    return this.saveTab(tab)
  }

  async clearTabs () {
    this.store.reset('tabs')

    return this.getTabs()
  }
}

export default TabCtrl
