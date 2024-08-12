export const state = () => ({
    batches: [],
    batchCount: 0,
})

export const mutations = {
    setBatches(state, data) {
        state.batches = data.results
        state.batchCount = data.total
    },
}

export const actions = {
    async get_batches({ commit }, data) {
        const batches = await this.$axios.get('batches/get-trainer-batches/?page=' + data);
        commit('setBatches', batches.data)
    },
}