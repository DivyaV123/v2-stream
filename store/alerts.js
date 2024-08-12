export const state = () => ({
  message: {
    text: null,
    type: 'success'
  }
})

export const mutations = {
  setAlert(state, data) {
    state.message.text = data.text
    state.message.type = data.type
  },
  removeAlert(state) {
    state.message.text = null
    state.message.type = 'success'
  }
}

export const actions = {
  async alert({ commit }, data) {
    commit('setAlert', data)
    setTimeout(() => {
      commit('removeAlert')
    }, 4000);
  },
  async removealert({ commit }) {
    commit('removeAlert')
  }
}