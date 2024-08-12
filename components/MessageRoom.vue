<template>
  <div class="">
    <Messages v-if="selectedUser" :user="selectedUser" @input="onMessage" />
  </div>
</template>

<script>
var dayjs = require('dayjs')
import socket1 from '~/webrtc/chatsocket'
export default {
  data() {
    return {
      selectedUser: {
        userID: 'all',
        username: 'Broadcast',
        connected: true,
        messages: [],
      },
      users: [],
      userRole: null,
      broadCast: {},
      searchChatUser: '',
    }
  },
  async fetch() {
    for (var i = 0; i < this.$store.state.auth.user.groups.length; i++) {
      if (this.$store.state.auth.user.groups[i].name === 'trainer') {
        this.userRole = 'trainer'
        this.users.push({
          userID: 'all',
          username: 'Broadcast',
          connected: true,
          messages: [],
        })
      }
      if (this.$store.state.auth.user.groups[i].name === 'student') {
        this.userRole = 'student'
      }
    }
    this.socketResponses()
  },
  methods: {
    onMessage(content) {
      if (this.selectedUser) {
        socket1.emit('private message', {
          content,
          date: dayjs().format('MMM D, h:mm A'),
          to: this.selectedUser.userID,
        })
        this.selectedUser.messages.push({
          content,
          date: dayjs().format('MMM D, h:mm A'),
          fromSelf: true,
        })
      }
    },
    onSelectUser(user) {
      this.selectedUser = user
      user.hasNewMessages = false
      this.$emit('message', false)
    },
    socketResponses() {
      socket1.on('connect', () => {
        this.users.forEach((user) => {
          if (user.self) {
            user.connected = true
          }
        })
      })
      socket1.on('disconnect', () => {
        this.users.forEach((user) => {
          if (user.self) {
            user.connected = false
          }
        })
      })
      const initReactiveProperties = (user) => {
        user.hasNewMessages = false
      }
      socket1.on('users', (users) => {
        users.forEach((user) => {
          // user.messages.forEach((message) => {
          //   message.fromSelf = message.from === socket1.userID
          // })
          for (let i = 0; i < this.users.length; i++) {
            const existingUser = this.users[i]
            if (existingUser.userID === user.userID) {
              existingUser.connected = user.connected
              existingUser.messages = user.messages
              return
            }
          }
          user.self = user.userID === socket1.userID
          initReactiveProperties(user)
          this.users.push(user)
        })
        // put the current user first, and sort by username
        // this.users.sort((a, b) => {
        //   if (a.self) return -1
        //   if (b.self) return 1
        //   if (a.username < b.username) return -1
        //   return a.username > b.username ? 1 : 0
        // })
      })
      socket1.on('user connected', (user) => {
        for (let i = 0; i < this.users.length; i++) {
          const existingUser = this.users[i]
          if (existingUser.userID === user.userID) {
            existingUser.connected = true
            return
          }
        }
        initReactiveProperties(user)

        if (this.userRole === 'trainer') {
          this.users.push(user)
        }
        if (this.userRole === 'student' && user.role !== 'student') {
          this.users.push(user)
        }
      })
      socket1.on('user disconnected', (id) => {
        for (let i = 0; i < this.users.length; i++) {
          const user = this.users[i]
          if (user.userID === id) {
            user.connected = false
            this.users.splice(i, 1)
            break
          }
        }
      })
      socket1.on('private message', ({ content, date, from, to }) => {
        for (let i = 0; i < this.users.length; i++) {
          if (this.userRole === 'trainer') {
            if (this.users[i].userID === 'all') {
              const buser = this.users[i]
              buser.messages.push({
                content,
                date,
                fromSelf,
              })
              buser.hasNewMessages = true
              this.$emit('message', true)
            }
          }
          const user = this.users[i]
          const fromSelf = socket1.userID === from
          if (user.userID === (fromSelf ? to : from)) {
            user.messages.push({
              content,
              date,
              fromSelf,
            })
            if (user !== this.selectedUser) {
              user.hasNewMessages = true
              this.$emit('message', true)
            }
            break
          }
        }
      })
    },
  },
  computed: {
    chatUsers() {
      let chatUsers = this.users
      return chatUsers.filter((user) => {
        if (this.searchChatUser) {
          chatUsers = this.searchChatUser
            .toLowerCase()
            .split(' ')
            .every((v) => user.username.toLowerCase().includes(v))
          return chatUsers
        }
        return chatUsers
      })
    },
  },
}
</script>

<style scoped>
.left-panel {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 260px;
  overflow-x: hidden;
  background-color: #3f0e40;
  color: white;
}
.right-panel {
  margin-left: 260px;
}
</style>