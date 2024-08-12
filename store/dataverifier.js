export const state = () => ({
    branch: [],
    signup:[],
    profile:[]

})

export const mutations = {
    setBranches(state, data) {
        state.branch = data
    },
    setSignup(state, data) {
        state.signup = data
    },
}


export const actions = {
    async get_branches({ commit },data) {
        const branches = await this.$axios.get(`/data-verifier/batches-list/?page=${data.page}&${data.params}`);
        console.log("branches",branches)
        commit('setBranches', branches.data)
    },
    async get_setSignup({ commit },data) {
        const branches = await this.$axios.get(`/data-verifier/student-list/?page=${data.page}&${data.params}&type=${data.type}&id=${data.id}`);
        console.log("branches",branches)
        commit('setSignup', branches.data)
    },
    
}