export const state = () => ({
    trainers: [],
    students: [],
    allUsers: [],
    messages: [],
    websocket: null
})

export const mutations = {
    setTrainers(state, data) {
        this._vm.$set(state.trainers, data.room, data.authors)
    },
    setStudents(state, data) {
        this._vm.$set(state.students, data.room, data.users)
    },
    setWebsocket(state, socket) {
        state.websocket = socket
    },
    setMessages(state, message) {
        this._vm.$set(state.messages, message.room, message)
    },
    setAllUsers(state, data) {
        this._vm.$set(state.allUsers, data.room, [...data.authors, ...data.users])
        this._vm.$set(state.trainers, data.room, data.authors)
        this._vm.$set(state.students, data.room, data.users)

    },
}


export const actions = {
    async userConnect({ commit }, data) {
        try {
            const websocket = new WebSocket(`wss://qsaas.qspiders.com/ws/classroom-signalling/${data.room}/`)
            commit('setWebsocket', websocket)
            websocket.onmessage = function (event) {
                var signal = JSON.parse(event.data)
                if (signal.msg_type == "signal_users") {
                    commit('setAllUsers', { authors: signal.message.author, users: signal.message.users, room: signal.room })
                }
                else if (signal.msg_type == "message") {
                    commit('setMessages', signal.message)
                }
                // commit('setTrainers', { authors: signal.message.author, room: signal.room })
                // commit('setStudents', { users: signal.message.users, room: signal.room })
            }

        }
        catch (e) {
            console.log(e)
        }
        // commit('setTrainers', batches.data)
    },

    async serverProcess({ commit, state }, data) {
        try {
            const websocket = state.websocket;
            websocket.send(JSON.stringify({
                'message': data
            }));
            websocket.onmessage = function (event) {

                var signal = JSON.parse(event.data)

                if (signal.msg_type == "signal_users") {
                    commit('setAllUsers', { authors: signal.message.author, users: signal.message.users, room: signal.room })
                }
                else if (signal.msg_type == "message") {
                    commit('setMessages', signal.message)
                }
            }

        }
        catch (e) {
            console.log(e)
        }
        // commit('setTrainers', batches.data)
    },

}

export const getters = {
    // ...
    getTrainersByRoom: (state) => (roomId) => {
        return state.trainers[roomId]
    },
    getStudentsByRoom: state => (roomId) => {
        return state.students[roomId]
    },
    getUsersByRoom: state => (roomId) => {
        return state.allUsers[roomId]
    },
    getMessagesByRoom: state => (roomId) => {
        return state.messages[roomId]
    }
}