export const state = () => ({
    branches:[],
    batch:[],
    not_updated:[],
    updated:[],
    verified:[],
    not_verified:[],
    verify:[],
    batch_notupdated:[],
    batch_updated:[],
    batch_verified:[],
    batch_notverified:[]

})

export const mutations = {
    set_branches (state,content) {
        state.branches = content
    },
    set_batch (state,content) {
        state.batch = content
    },
    set_not_updated(state,content) {
        state.not_updated = content
    },
    set_updated(state,content) {
        state.updated = content
    },
    set_verified(state,content) {
        state.verified = content
    },
    set_not_verified(state,content) {
        state.not_verified = content
    },
    set_verify(state,content) {
        state.verify = content
    },
    set_batch_notupdated(state,content) {
        state.batch_notupdated = content
    },
    set_batch_updated(state,content) {
        state.batch_updated = content
    },
    set_batch_verified(state,content) {
        state.batch_verified = content
    },
    set_batch_notverified(state,content) {
        state.batch_notverified = content
    },
}

export const actions = {

    async getBranch({ commit }, data) {
        const branch = await this.$axios.get(`/verifier/branch-list/?page=${data.page}&${data.params}`);
        commit("set_branches", branch.data);
        },

    async getNotUpdated({ commit }, data) {
        const branch = await this.$axios.get(`/verifier/not-updated-students/?page=${data.page}&bid=${data.bid}&${data.params}`);
        commit("set_not_updated", branch.data);
        },  
        
    async getUpdated({ commit }, data) {
        const branch = await this.$axios.get(`/verifier/updated-students/?page=${data.page}&bid=${data.bid}&${data.params}`);
        commit("set_updated", branch.data);
        },   
        
    async getVerified({ commit }, data) {
        const branch = await this.$axios.get(`/verifier/verified-students/?page=${data.page}&bid=${data.bid}&${data.params}`);
        commit("set_verified", branch.data);
        },  
        
    async getNotverified({ commit }, data) {
        const branch = await this.$axios.get(`/verifier/not-verified-students/?page=${data.page}&bid=${data.bid}&${data.params}`);
        commit("set_not_verified", branch.data);
        }, 

    async Verify({ commit } ,data){
        const submit = await this.$axios.post(`verifier/verify-payment/`,data
        )
    }, 
    
    async getBatch({ commit }, data) {
        const branch = await this.$axios.get(`/verifier/batch-list/?page=${data.page}&${data.params}&id=${data.id}`);
        commit("set_batch", branch.data);
        },
    
    async getBatchNotUpdated({ commit }, data) {
        const branch = await this.$axios.get(`/verifier/batch-not-updated-students/?page=${data.page}&id=${data.id}&${data.params}`);
        commit("set_batch_notupdated", branch.data);
        },

    async getBatchUpdated({ commit }, data) {
        const branch = await this.$axios.get(`/verifier/batch-updated-students/?page=${data.page}&id=${data.id}&${data.params}`);
        commit("set_batch_updated", branch.data);
        },  
        
    async getBatchVerified({ commit }, data) {
        const branch = await this.$axios.get(`/verifier/batch-verified-students/?page=${data.page}&id=${data.id}&${data.params}`);
        commit("set_batch_verified", branch.data);
        }, 

    async getBatchNotVerified({ commit }, data) {
        const branch = await this.$axios.get(`/verifier/batch-not-verified-students/?page=${data.page}&id=${data.id}&${data.params}`);
        commit("set_batch_notverified", branch.data);
        },     
               

    }