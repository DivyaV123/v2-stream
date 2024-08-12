export const state = () => ({
  orders: [],
  error: false,
  errorMsg: null,
  update:null,
  payment : [],
  cpayment : [],
  mycourse : [],
  counts: 0,
  my_payment:[],
  upbatches:[]
})

export const mutations = {
  set_orders (state,content) {
      state.orders = content
  },
  setErrors(state, msg) {
      state.error = true
      state.errorMsg = msg
  },
  removeErrors(state) {
      state.error = false
      state.errorMsg = null
      state.update = null
  },
  setUpdate(state, update) {
      state.update = update.data
  },
  set_payment (state,content) {
      state.payment = content
  },
  set_cpayment (state,content) {
      state.cpayment = content
  },
  set_mycourse (state,data) {
      state.mycourse = data
      state.counts = data.total
  },
  set_my_payment (state,data) {
    state.my_payment = data
    state.counts = data.total
},
set_upbatches (state,data) {
  state.upbatches = data
  state.counts = data.total
},
}

export const actions = {
  async getOrders({ commit }, data) {
        try{
          let order = await this.$axios.post(`payment/razor-payment/?course=${data}`)
          commit('setUpdate', order)
        }
        catch(err){
          console.log(err)
        }
  },
  resetmsg({ commit }) {
        commit('removeErrors')
        return Promise.resolve()
  },
  async getPaymentDetails({ commit }, data) {
        try {
          let payment = await this.$axios.post('payment/paymenthandler/', data)
          commit('set_payment', payment)
        }
        catch (err) {
          console.log(err)
        }
  },
  async getCPayment({ commit }, data) {
        let payment = await this.$axios.get('payment/pay-course-fees/')
        commit('set_cpayment', payment.data.results)
  },
  async getMyCourse({ commit }, data) {
        let course = await this.$axios.get('student/student-batches/?page=' + data)
        commit('set_mycourse', course.data)
  },
  async getMyPayment({ commit }, data) {
    let payment = await this.$axios.get('payment/payment-list/?page=' + data)
    commit('set_my_payment', payment.data)
},
async getupbatches({ commit }, data) {
  let payment = await this.$axios.post('batches/get-upcoming-batches/')
  console.log("payment data",payment)
  commit('set_upbatches', payment.data)
}
}