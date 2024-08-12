export const state = () => ({
    branches:[],
    batches:[],
    batch_filter:[],
    track:[],
    close:[],
    total:[],
    total_attended:[],
    total_notattended:[],
    total_promised:[],
    total_notpaid:[],
    total_partialpaid:[],
    total_paid:[],
    block:[],
    reason:[],
    unblock:[],
    pro_date:[],
    pay_reason:[],
    fee_notupdated:[],
    btrack_branch:[],
    btrack_batch:[],
    students : []
 
})

export const mutations = {
    set_branches (state,content) {
        state.branches = content
    },
    set_trackerbranches (state,content) {
        state.btrack_branch = content
    },
    set_trackerbatches (state,content) {
        state.btrack_batch = content
    },
    set_batches (state,content) {
        state.batches = content
    },
    set_batch_filter (state,content) {
        state.batch_filter = content
    },
    set_track(state,content) {
        state.track = content
    },
    set_close(state,content) {
        state.close = content
    },
    set_total(state,content) {
        state.total = content
    },
    set_total_attended(state,content) {
        state.total_attended = content
    },
    set_total_notattended(state,content) {
        state.total_notattended = content
    },
    set_total_promised(state,content) {
        state.total_promised = content
    },
    set_total_notpaid(state,content) {
        state.total_notpaid = content
    },
    set_total_partialpaid(state,content) {
        state.total_partialpaid = content
    },
    set_total_paid(state,content) {
        state.total_paid = content
    },
    set_block(state,content) {
        state.block = content
    },
    set_reason(state,content) {
        state.reason = content
    },
    set_unblock(state,content) {
        state.unblock = content
    },
    set_pro_date(state,content) {
        state.pro_date = content
    },
    set_pay_reason(state,content) {
        state.pay_reason = content
    },
    set_fee_notupdated(state,content) {
        state.fee_notupdated = content
    },
    set_students(state,content) {
        state.students = content
    },
}

export const actions = {

async getTrackerBranch({ commit }, data) {
    const branch = await this.$axios.get(`/tracker/fee-branch-list/?page=${data.page}&${data.params}`);
    commit("set_trackerbranches", branch.data);
    },

async getTrackerBatch({ commit }, data) {
    const branch = await this.$axios.get(`/tracker/fee-batch-list/?page=${data.page}&id=${data.id}&${data.params}`);
    console.log("branch",branch)
    commit("set_trackerbatches", branch.data);
    },    

async getBranch({ commit }, data) {
    const branch = await this.$axios.get(`/tracker/branch-list/?page=${data.page}&${data.params}`);
    commit("set_branches", branch.data);
    },

async getBatch({ commit }, data) {
    const branch = await this.$axios.get(`/tracker/batch-list/?page=${data.page}&id=${data.id}&${data.params}`);
    commit("set_batches", branch.data);
    },

async getBatchFilter({ commit }, data) {
    const branch = await this.$axios.get(`/tracker/user-batch-list/?per_page=200`);
    commit("set_batch_filter", branch.data.results);
    }, 

async getTrack({ commit } ,id){
    const submit = await this.$axios.post(`tracker/track-batch/?id=${id}`,
    )    
},

async getClose({ commit } ,id){
    let star = {
        "id":id,
        "status":"2"
    }
    const submit = await this.$axios.post(`tracker/close-batch/`,star
    )
},

async getTotal({ commit }, data) {
    const branch = await this.$axios.get(`tracker/total-students/?page=${data.page}&id=${data.id}&${data.params}`); 
    commit("set_total", branch.data);
    }, 

async getTotalAttended({ commit }, data) {
    const branch = await this.$axios.get(`tracker/attended-students/?page=${data.page}&id=${data.id}&${data.params}`); 
    commit("set_total_attended", branch.data);
    }, 

async getTotalNotAttended({ commit }, data) {
    const branch = await this.$axios.get(`tracker/not-attended-students/?page=${data.page}&id=${data.id}&${data.params}`); 
    commit("set_total_notattended", branch.data);
    },  
    
async getTotalPromised({ commit }, data) {
    const branch = await this.$axios.get(`tracker/promised-students/?page=${data.page}&id=${data.id}&${data.params}`); 
    commit("set_total_promised", branch.data);
    },    
    
async getTotalNotPaid({ commit }, data) {
    const branch = await this.$axios.get(`tracker/not-paid-students/?page=${data.page}&id=${data.id}&${data.params}`); 
    commit("set_total_notpaid", branch.data);
    },   
    
async getTotalPartialPaid({ commit }, data) {
    const branch = await this.$axios.get(`tracker/partial-paid-students/?page=${data.page}&id=${data.id}&${data.params}`); 
    commit("set_total_partialpaid", branch.data);
    },   

async getTotalPaid({ commit }, data) {
    const branch = await this.$axios.get(`tracker/paid-students/?page=${data.page}&id=${data.id}&${data.params}`); 
    commit("set_total_paid", branch.data);
    },     
        

async Block({ commit } ,data){
    const submit = await this.$axios.post(`tracker/block-student/`,data
    )
},  

async getBlockreason({ commit }, data) {
    const branch = await this.$axios.get(`/attendance/block-reasons/`);
    commit("set_reason", branch.data.results);
    },  
   
async UnBlock({ commit } ,data){
    const submit = await this.$axios.post(`tracker/unblock-student/`,data
    )
},   

async ProDate({ commit } ,data){
    const submit = await this.$axios.post(`tracker/add-promise-date/`,data
    )
}, 

async getPayreason({ commit }, data) {
    const branch = await this.$axios.get(`/tracker/payment-reason/`);
    commit("set_pay_reason", branch.data.results);
    },


async getFeenotUpdated({ commit }, data) {
    const branch = await this.$axios.get(`tracker/not-updated-students/?page=${data.page}&id=${data.id}&${data.params}`); 
    commit("set_fee_notupdated", branch.data);
    },  

async getStudents({ commit }, data) {
    console.log("dataa in js", data)
    const branch = await this.$axios.get(`/tracker/global-search/?`+data.params);
    console.log("student data in js", branch.data.results)
    commit("set_students", branch.data.results);
    },

}