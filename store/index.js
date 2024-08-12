export const state = () => ({
  counter: 0,
  title: "QSAAS",
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  setTitle(state, title) {
    state.title = title
  }
}

export const actions = {
  async title({ commit }, data) {
    commit('setTitle', data)
  }
}