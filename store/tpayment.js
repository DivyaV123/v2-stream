export const state = () => ({
    batches:[],
    student:[],
    detail:[]
})

export const mutations = {
    set_batches (state,content) {
        state.batches = content
    },
    set_student (state,content) {
        state.student = content
    },
    set_detail(state,content) {
        state.detail = content
    },
}

export const actions = {

    async getBatch({ commit }, data) {
        console.log(data.total)
        const branch = await this.$axios.get(`/trainer-payment/batches/?${data.params}&per_page=${data.total}`);
        commit("set_batches", branch.data);
        },

    async getStudent({ commit }, data) {
        console.log("data.total",data)
        const student = await this.$axios.get(`/trainer-payment/students-list/?bid=${data.id}&${data.params}&per_page=${data.total}`);
        commit("set_student", student.data);
        },   
        
    async getDetail({ commit }, data) {
        const student = await this.$axios.get(`/trainer-payment/student-detail/?nid=${data.id}&${data.params}`);
        commit("set_detail", student.data);
        },     
    }