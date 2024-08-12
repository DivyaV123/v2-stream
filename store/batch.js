export const state = () => ({
    trainers: [],
    subjects: [],
    courses: [],
    branches: [],
    trackers: [],
    hrs: [],
    classtimings: [],
    batches: [],
    batchCount: 0,
})


export const mutations = {
    setBranches(state, data) {
        state.branches = data.results
    },
    setCourses(state, data) {
        state.courses = data.results
    },
    setSubjects(state, data) {
        state.subjects = data.results
    },
    setTrainers(state, data) {
        state.trainers = data.results
    },
    setTrackers(state, data) {
        state.trackers = data.results
    },
    setHrs(state, data) {
        state.hrs = data.results
    },
    setClasstiming(state, data) {
        state.classtimings = data.results
    },
    setBatches(state, data) {
        state.batches = data.results
        state.batchCount = data.total
    },
}

export const actions = {
    async get_branches({ commit }) {
        const branches = await this.$axios.get('branch/branch-minimal/?per_page=200');
        commit('setBranches', branches.data)
    },
    async get_subjects({ commit }) {
        const subjects = await this.$axios.get('courses/get-subjects/?per_page=200');
        commit('setSubjects', subjects.data)
    },
    async get_courses({ commit }) {
        const courses = await this.$axios.get('courses/get-courses/?per_page=200');
        commit('setCourses', courses.data)
    },
    async get_trainers({ commit }) {
        const trainers = await this.$axios.get('batches/get-users/?groups__name=trainer&per_page=800');
        commit('setTrainers', trainers.data)
    },
    async get_trackers({ commit }) {
        const trackers = await this.$axios.get('batches/get-users/?groups__name=tracker&per_page=200');
        commit('setTrackers', trackers.data)
    },
    async get_hrs({ commit }) {
        const hrs = await this.$axios.get('batches/get-users/?groups__name=hr&per_page=200');
        commit('setHrs', hrs.data)
    },
    async get_classtimings({ commit }) {
        const classtimings = await this.$axios.get('commons/class-timing/?per_page=200');
        commit('setClasstiming', classtimings.data)
    },
    async get_batches({ commit }, data) {
        const batches = await this.$axios.get('batches/get-batches/?page=' + data.page+'&'+data.params);
        commit('setBatches', batches.data)
    },
}