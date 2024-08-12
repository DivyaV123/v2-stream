<template>
  <div>
    <div class="flex flex-row justify-center items-center border bg-base-300">
      <div class="w-full">
        <div class="px-1">
          <span v-if="user.role === 'student'">
            <span v-if="user.muted">
              <div data-tip="Un-mute user" class="tooltip tooltip-right">
                <button
                  @click="unmuteUser(user.userID)"
                  class="btn btn-error btn-xs"
                >
                  <font-awesome-icon icon="microphone" />
                </button>
              </div>
            </span>
            <span v-if="!user.muted"
              ><div data-tip="Mute user" class="tooltip tooltip-right">
                <button
                  @click="muteUser(user.userID)"
                  class="btn btn-success btn-xs"
                >
                  <font-awesome-icon icon="microphone" />
                </button>
              </div>
            </span>
          </span>
          <span
            @click="onClick"
            :class="user.connected ? 'text-gray-200' : 'text-error'"
            class="btn btn-xs btn-ghost text-xs"
          >
            {{ user.name }}
          </span>
        </div>
        <span @click="onClick" class="text-gray-300 text-xs italic"
          ><div v-if="user.hasNewMessages" class="badge badge-xs badge-accent">
            new
          </div>
          {{ trimText() }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    selected: Boolean,
  },
  methods: {
    onClick() {
      this.$emit("select");
    },
    muteUser(userID) {
      this.$emit("muteUser", userID);
    },
    unmuteUser(userID) {
      this.$emit("unmuteUser", userID);
    },
    trimText() {
      if (this.user.messages.length > 0) {
        let message = this.user.messages[this.user.messages.length - 1];
        let newText = message.content;
        if (newText && newText.length > 150) {
          newText = newText.substring(0, 150) + "...";
        }
        return newText;
      }
    },
  },
  computed: {
    status() {
      return this.user.connected ? "online" : "offline";
    },
  },
};
</script>

<style scoped>
.selected {
  background-color: #dcdcdc;
}
.user {
  padding: 10px;
}
.description {
  display: inline-block;
}
.status {
  color: #92959e;
}
.new-messages {
  color: white;
  background-color: red;
  width: 20px;
  border-radius: 5px;
  text-align: center;
  float: right;
  margin-top: 10px;
}
</style>