<template>
  <div class="h-video">
    <div class="border-b-2">
      <span class="text-gray-200 font-semibold text-sm text-center">
        <button @click="onClose" class="btn btn-circle btn-accent btn-xs mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-3 h-3 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg></button
        >Message Board - {{ chatUsers.length }}
      </span>
    </div>
    <div v-if="showUserPanel" class="overflow-y-auto">
      <!-- chat list -->
      <div class="flex h-video flex-col overflow-auto">
        <!-- search compt -->
        <div class="relative text-gray-600 focus-within:text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6 text-gray-500"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input
            placeholder="Search Users"
            v-model="searchChatUser"
            class="
              py-1
              pl-10
              mb-1
              block
              w-full
              rounded
              bg-gray-100
              outline-none
              focus:text-gray-700
            "
            type="search"
            name="search"
            required
          />
        </div>
        <!-- end search compt -->
        <!-- user list -->
        <UserPanel
          v-if="role === 'trainer'"
          :user="broadcaster"
          :selected="selectedUser === broadcaster"
          @select="onSelectUser(broadcaster)"
        />
        <UserPanel
          v-for="user in chatUsers"
          :key="user.userID"
          :user="user"
          :selected="selectedUser === user"
          @select="onSelectUser(user)"
          @muteUser="onMuteUser"
          @unmuteUser="onUnmuteUser"
        />

        <!-- end user list -->
      </div>
      <!-- end chat list -->
    </div>
    <div v-if="showMessagePanel">
      <MessagePanel
        v-if="selectedUser"
        :user="selectedUser"
        @input="onMessage"
        @goBack="onBack"
      />
    </div>
  </div>
</template>

<script>
var dayjs = require("dayjs");
// import this.chatSocket from "~/webrtc/chatsocket";
export default {
  props: { roomName: String, role: String, users: Array },
  data() {
    return {
      selectedUser: null,
      searchChatUser: "",
      chatSocket: null,
      socket: null,
      showUserPanel: true,
      showMessagePanel: false,
      broadcaster: {
        name: "Broadcast",
        userID: "all",
        role: "trainer",
        connected: true,
        messages: [],
        hasNewMessages: false,
      },
    };
  },
  async fetch() {},
  methods: {
    onClose() {
      this.$emit("closeChat");
    },
    onBack() {
      this.showMessagePanel = false;
      this.showUserPanel = true;
    },
    onMessage(content) {
      if (this.selectedUser) {
        if (this.selectedUser.name === "Broadcast") {
          for (var i = 0; i < this.users.length; i++) {
            this.users[i].messages.push({
              content,
              date: dayjs().format("MMM D, h:mm A"),
              from: this.$store.state.auth.user.id,
            });
          }
        }
        this.$emit("messageUser", {
          content,
          date: dayjs().format("MMM D, h:mm A"),
          to: this.selectedUser.userID,
        });
        this.selectedUser.messages.push({
          content,
          date: dayjs().format("MMM D, h:mm A"),
          from: this.$store.state.auth.user.id,
        });
      }
    },
    onSelectUser(user) {
      this.selectedUser = user;
      this.showUserPanel = false;
      this.showMessagePanel = true;
      // console.log('selectedUser', user)
      user.hasNewMessages = false;
      this.$emit("message", false);
    },
    onMuteUser(userID) {
      this.$emit("onMuteUser", userID);
    },
    onUnmuteUser(userID) {
      this.$emit("onUnmuteUser", userID);
    },
  },
  computed: {
    chatUsers() {
      let chatUsers = this.users;
      if (this.users.length === 1 && this.role === "student") {
        this.selectedUser = this.users[0];
        this.showUserPanel = false;
        this.showMessagePanel = true;
      }
      return chatUsers.filter((user) => {
        if (this.searchChatUser) {
          chatUsers = this.searchChatUser
            .toLowerCase()
            .split(" ")
            .every((v) => user.name.toLowerCase().includes(v));
          return chatUsers;
        }
        return chatUsers;
      });
    },
  },
};
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