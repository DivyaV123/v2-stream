export const state = () => ({
  userName: null,
  userId: null,
  user: null,
  error: false,
  groups: [],
  errorMsg: null,
  student: null,
})

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
  setStudent(state, data) {
    state.student = data
  },
  setUserId(state, data) {
    state.userId = data
  },
  setUserToken(state, data) {
    state.userToken = data
  },
  setGroups(state, data) {
    state.groups = data
  },
  removeUser(state) {
    state.user = null,
      state.student = null,
      state.userId = null,
      state.groups = []
  },
  setErrors(state, msg) {
    state.error = true
    state.errorMsg = msg
  },
  removeErrors(state) {
    state.error = false
    state.errorMsg = null
  },

}

export const actions = {
  async login({ commit }, data) {
    try {
      const loginResponse = await this.$axios.post('users/login/', data);
      if (loginResponse.status === 200) {
        commit('setUser', loginResponse.data)
        localStorage.setItem("user", JSON.stringify(loginResponse.data));
      }
      else {
        commit('setErrors', "Username and password not matching")
      }

    } catch (err) {
      console.log(err)
      commit('setErrors', "Username and password not matching")
    }

  },

  async slogin({ commit }, data) {
        try {
          var loginResponse = null;
          if (data.meeting_id){
              loginResponse = await this.$axios.post(`users/student-login/?meeting_id=${data.meeting_id}`, data.form);
            }
          else{
            loginResponse = await this.$axios.post(`users/student-login/`, data);
          }
          if (loginResponse.status === 200) {
            console.log("student response",loginResponse.data)
            commit('setUser', loginResponse.data)
            localStorage.setItem("user", JSON.stringify(loginResponse.data));
          }
          else {
            commit('setErrors', "Username and password not matching")
          }
        } 
        catch (err) {
          console.log(err)
          commit('setErrors', "Username and password not matching")
        }
  },

  resetmsg({ commit }) {
    commit('removeErrors')
    return Promise.resolve()
  },
  async logout({ commit }) {
    // await this.$axios.post('users/logout/');
    localStorage.removeItem("sessionID");
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userdata");
    localStorage.removeItem("userdetail");
    commit('removeUser')
    return Promise.resolve()
  },

  restorelogin({ commit }) {
    try {
      var user = JSON.parse(localStorage.getItem("user"))

      if (!state.user) {
        var user = JSON.parse(localStorage.getItem("user"))
        commit('setUser', user)
      }
    }
    catch (err) {
      localStorage.removeItem("sessionID");
      localStorage.removeItem("user");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userdata");
      localStorage.removeItem("userdetail");
      this.$axios.post('users/logout/');
    }

  }
}