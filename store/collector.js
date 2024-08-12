export const state = () => ({
    branch: [],
    batch:[],
    notupdated:[],
    updated:[],
    add:[],
    updated_branch:[],
    not_updatedbranch:[]
})


export const mutations = {
    setBranches(state, data) {
        state.branch = data
    },
    setBatches(state, data) {
        state.batch = data
    },
    setNotupdated(state, data) {
        state.notupdated = data
    },
    setUpdated(state, data) {
        state.updated = data
    },
    setAdd(state, data) {
        state.add = data
    },
    setupdated_branch(state, data) {
        state.updated_branch = data
    },
    setnotupdated_branch(state, data) {
        state.not_updatedbranch = data
    },
}

export const actions = {
    async get_branches({ commit },data) {
        console.log("params",data.params)
        const branches = await this.$axios.get(`/collector/branch-list/?page=${data.page}&${data.params}`);
        commit('setBranches', branches.data)
    },
    async get_batches({ commit },data) {
        const batches = await this.$axios.get(`/collector/batch-list/?page=${data.page}&id=${data.id}&${data.params}`);
        commit('setBatches', batches.data)
    },
    async get_notupdated({ commit },data) {
        const notupdated = await this.$axios.get(`/collector/not-updated-students/?page=${data.page}&id=${data.id}&${data.params}`);
        commit('setNotupdated', notupdated.data)
    },
    async get_updated({ commit },data) {
        const updated = await this.$axios.get(`/collector/updated-students/?page=${data.page}&id=${data.id}&${data.params}`);
        commit('setUpdated', updated.data)
    },
    async Add({ commit } ,data){
        const submit = await this.$axios.post(`collector/update-razorpay/`,data
        )
    },
    async get_updated_branch({ commit },data) {
        console.log('params',data.params)
        const updated = await this.$axios.get(`/collector/branch-updated-students/?page=${data.page}&bid=${data.bid}&${data.params}`);
        commit('setupdated_branch', updated.data)
    },
    async get_notupdated_branch({ commit },data) {
        const updated = await this.$axios.get(`/collector/branch-not-updated-students/?page=${data.page}&bid=${data.bid}&${data.params}`);
        commit('setnotupdated_branch', updated.data)
    },

}