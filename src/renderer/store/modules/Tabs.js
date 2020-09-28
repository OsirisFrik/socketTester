import { tabsCtrl } from '../../utils/store'

const state = {
  tabs: tabsCtrl.tabs
}

const mutations = {
  UPDATE_STORE: (state, tabs) => {
    state.tabs = tabs
  }
}

const actions = {
  saveTab: async ({ commit }, tab) => {
    try {
      let tabs = await tabsCtrl.saveTab(tab)

      commit('UPDATE_STORE', tabs)
      commit('TOAST', {
        message: 'Tab saved',
        type: 'is-success'
      })
    } catch (err) {
      commit('TOAST', {
        message: 'Error on save tab',
        type: 'is-danger'
      })

      throw err
    }
  },
  addTab: async ({ commit }) => {
    try {
      let tabs = await tabsCtrl.addTab()

      commit('UPDATE_STORE', tabs)
      commit('TOAST', {
        message: 'Tab added',
        type: 'is-success'
      })
    } catch (err) {
      commit('TOAST', {
        message: 'Error on add tab',
        type: 'is-danger'
      })

      throw err
    }
  },
  clearTabs: async ({ commit }) => {
    try {
      commit('UPDATE_STORE', await tabsCtrl.clearTabs())
      commit('TOAST', {
        message: 'Settings success clear',
        type: 'is-success'
      })
    } catch (err) {
      commit('TOAST', {
        message: 'Error on reset settings',
        type: 'is-danger'
      })

      throw err
    }
  },
  addEvent: async ({ commit }, tabId) => {
    try {
      let tabs = await tabsCtrl.addEvent(tabId)
      commit('UPDATE_STORE', tabs)
      commit('TOAST', {
        message: 'Settings success clear',
        type: 'is-success'
      })
    } catch (err) {
      commit('TOAST', {
        message: 'Error on add event',
        type: 'is-danger'
      })

      throw err
    }
  }
}

export default {
  state,
  mutations,
  actions
}
