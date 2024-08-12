<template>
  <div>
    <div class="justify-between flex flex-col h-video">
      <div class="flex items-center border-b border-gray-300 pl-2 py-1">
        <button class="btn btn-xs text-right btn-info" @click="goBack">
          &larr;
        </button>
        <span class="block ml-2 font-bold text-gray-300"
          ><StatusIcon :connected="user.connected" /> {{ user.name }}</span
        >
      </div>
      <div id="messages" class="flex flex-col-reverse overflow-y-auto">
        <div class="flex-col-reverse">
          <div
            class="chat-message p-2"
            v-for="(message, index) in user.messages"
            :key="index"
          >
            <div
              class="flex items-end"
              :class="
                message.from == $store.state.auth.user.id ? 'justify-end' : ''
              "
            >
              <div
                :class="
                  message.from == $store.state.auth.user.id
                    ? 'items-end '
                    : 'items-start'
                "
                class="flex space-y-2 text-xs max-w-xs mx-2"
              >
                <div>
                  <span
                    :class="
                      message.from == $store.state.auth.user.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    "
                    class="px-4 py-2 rounded-lg inline-block rounded-bl-none"
                  >
                    <span class="text-xs break-all">
                      {{ message.content }}</span
                    >
                    <span class="text-2xs italic mx-auto"
                      >{{ message.date }}
                    </span></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="border-t-2 border-gray-200 px-4 pt-2">
        <form @submit.prevent="onSubmit">
          <div class="relative flex">
            <input
              v-model="input"
              type="text"
              placeholder="Send Message"
              class="
                w-full
                focus:outline-none focus:placeholder-gray-400
                text-gray-600
                placeholder-gray-600
                pl-4
                bg-gray-200
                rounded-full
                py-1
              "
            />
            <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <button
                :disabled="!isValid"
                type="submit"
                class="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  h-8
                  w-8
                  transition
                  duration-500
                  ease-in-out
                  text-white
                  bg-blue-500
                  hover:bg-blue-400
                  focus:outline-none
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-6 w-6 transform rotate-90"
                >
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
var dayjs = require("dayjs");
export default {
  name: "MessagePanel",
  props: {
    user: Object,
  },
  data() {
    return {
      input: "",
    };
  },
  async fetch() {
    // console.log("user", this.user);
  },
  methods: {
    dateFormat(date) {
      return dayjs(date).format("hh:mm a");
    },
    goBack() {
      this.$emit("goBack");
    },
    onSubmit() {
      if (this.input.length > 0) {
        this.$emit("input", this.input);
        this.input = "";
      }
    },
    displaySender(message, index) {
      return (
        index === 0 ||
        this.user.messages[index - 1].fromSelf !==
          this.user.messages[index].fromSelf
      );
    },
  },
  computed: {
    isValid() {
      return this.input.length > 0;
    },
  },
};
</script>

<style scoped>
.scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}
</style>