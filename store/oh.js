export const state = () => ({
    branches:[],
    batch:[],
    total:[],
    paid:[],
    not_paid:[],
    partial:[],
    signed:[],
    profile:[],
    data_verify:[],
    not_updated:[],
    updated:[],
    verified:[],
    not_verified:[]
})

export const mutations = {
    set_branches (state,content) {
        state.branches = content
    },
    set_batch (state,content) {
        state.batch = content
    },
    set_total (state,content) {
        state.total = content
    },
    set_paid (state,content) {
        state.paid = content
    },
    set_not_paid (state,content) {
        state.not_paid = content
    },
    set_partial (state,content) {
        state.partial = content
    },
    set_signed (state,content) {
        state.signed = content
    },
    set_profile (state,content) {
        state.profile = content
    },
    set_data_verify (state,content) {
        state.data_verify = content
    },
    set_not_updated (state,content) {
        state.not_updated = content
    },
    set_updated (state,content) {
        state.updated = content
    },
    set_verified (state,content) {
        state.verified = content
    },
    set_not_verified (state,content) {
        state.not_verified = content
    },
}

export const actions = {

    async getBranch({ commit }, data) {
        const branch = await this.$axios.get(`/oh/branch-list/?page=${data.page}&${data.params}`);
        commit("set_branches", branch.data);
        },

    async getBatch({ commit }, data) {
        const batch = await this.$axios.get(`/oh/batch-list/?page=${data.page}&${data.params}&id=${data.id}`);
        commit("set_batch", batch.data);
        },   
        
    async getTotal({ commit }, data) {
        if(data.id){
        const batch = await this.$axios.get(`/oh/total-students-list/?page=${data.page}&${data.params}&id=${data.id}`);
        commit("set_total", batch.data);
        }
        else if(data.bid){
        const batch = await this.$axios.get(`/oh/total-students-list/?page=${data.page}&${data.params}&bid=${data.bid}`);
        commit("set_total", batch.data);
        }
        },   
        
    async getPaid({ commit }, data) {
        if(data.id){
        const batch = await this.$axios.get(`/oh/paid-students-list/?page=${data.page}&${data.params}&id=${data.id}`);
        commit("set_paid", batch.data);
        }
        else if(data.bid){
        const batch = await this.$axios.get(`/oh/paid-students-list/?page=${data.page}&${data.params}&bid=${data.bid}`);
        commit("set_paid", batch.data);
        }
        },  
        
    async getNotPaid({ commit }, data) {
        if(data.id){
        const batch = await this.$axios.get(`/oh/unpaid-students-list/?page=${data.page}&${data.params}&id=${data.id}`);
        commit("set_not_paid", batch.data);
        }
        else if(data.bid){
            const batch = await this.$axios.get(`/oh/unpaid-students-list/?page=${data.page}&${data.params}&bid=${data.bid}`);
            commit("set_not_paid", batch.data); 
        }
        },   
        
    async getPartial({ commit }, data) {
        if(data.id){
        const batch = await this.$axios.get(`/oh/partial-students-list/?page=${data.page}&${data.params}&id=${data.id}`);
        commit("set_partial", batch.data);
        }
        else if(data.bid){
            const batch = await this.$axios.get(`/oh/partial-students-list/?page=${data.page}&${data.params}&bid=${data.bid}`);
            commit("set_partial", batch.data);  
        }
        },   
        
    async getSigned({ commit }, data) {
        if(data.id){
        const batch = await this.$axios.get(`/oh/registered-students-list/?page=${data.page}&${data.params}&id=${data.id}`);
        commit("set_signed", batch.data);
        }
        else if(data.bid){
        const batch = await this.$axios.get(`/oh/registered-students-list/?page=${data.page}&${data.params}&bid=${data.bid}`);
        commit("set_signed", batch.data);
        }
        },  
        
    async getProfile({ commit }, data) {
        if(data.id){
        const batch = await this.$axios.get(`/oh/profile-students-list/?page=${data.page}&${data.params}&id=${data.id}`);
        commit("set_profile", batch.data);
        }
        else if(data.bid){
        const batch = await this.$axios.get(`/oh/profile-students-list/?page=${data.page}&${data.params}&bid=${data.bid}`);
        commit("set_profile", batch.data);
        }
        },  

    async getDataVerify({ commit }, data) {
        if(data.id){
        const batch = await this.$axios.get(`/oh/data-verified-students-list/?page=${data.page}&${data.params}&id=${data.id}`);
        commit("set_data_verify", batch.data);
        }
        else if(data.bid){
        const batch = await this.$axios.get(`/oh/data-verified-students-list/?page=${data.page}&${data.params}&bid=${data.bid}`);
        commit("set_data_verify", batch.data);
        }
        },      
    
    async getNotUpdated({ commit }, data) {
        if(data.id){
        const batch = await this.$axios.get(`/oh/not-updated-students-list/?page=${data.page}&${data.params}&id=${data.id}`);
        commit("set_not_updated", batch.data);
        }
        else if(data.bid){
        const batch = await this.$axios.get(`/oh/not-updated-students-list/?page=${data.page}&${data.params}&bid=${data.bid}`);
        commit("set_not_updated", batch.data);
        }
        },  
        
    async getUpdated({ commit }, data) {
        if(data.id){
        const batch = await this.$axios.get(`/oh/updated-students-list/?page=${data.page}&${data.params}&id=${data.id}`);
        commit("set_updated", batch.data);
        }
        else if(data.bid){
        const batch = await this.$axios.get(`/oh/updated-students-list/?page=${data.page}&${data.params}&bid=${data.bid}`);
        commit("set_updated", batch.data);
        }
        },  

    async getVerified({ commit }, data) {
        if(data.id){
        const batch = await this.$axios.get(`/oh/verified-students-list/?page=${data.page}&${data.params}&id=${data.id}`);
        commit("set_verified", batch.data);
        }
        else if(data.bid){
        const batch = await this.$axios.get(`/oh/verified-students-list/?page=${data.page}&${data.params}&bid=${data.bid}`);
        commit("set_verified", batch.data);
        }
        },     
    
    async getNotVerified({ commit }, data) {
        if(data.id){
        const batch = await this.$axios.get(`/oh/not-verified-students-list/?page=${data.page}&${data.params}&id=${data.id}`);
        commit("set_not_verified", batch.data);
        }
        else if(data.bid){
        const batch = await this.$axios.get(`/oh/not-verified-students-list/?page=${data.page}&${data.params}&bid=${data.bid}`);
        commit("set_not_verified", batch.data);
        }
        }, 
        
    }