const seedData = {
  message: null,
  type: null,
  position: 'is-bottom',
  duration: 5000
}

const state = {
  data: {}
}

const mutations = {
  TOAST (state, payload) {
    for (const key in seedData) {
      if (typeof payload[key] === 'undefined') payload[key] = seedData[key]
    }

    state.data = payload
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions
}
