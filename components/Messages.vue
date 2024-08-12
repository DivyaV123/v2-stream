<template>
  <div class="w-full overflow-y-auto h-almost">
    <table class="table-fixed w-full table-compact border-white">
      <thead>
        <tr>
          <th class="border w-1/4 text-left">Name</th>
          <th class="border w-1/2 text-left">Message</th>
          <th class="border w-1/4 text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(message, index) in user.messages" :key="index">
          <td class="border break-all">
            {{
              message.from == $store.state.auth.user.id
                ? $store.state.auth.user.name
                : user.username
            }}
          </td>
          <td class="border">{{ message.content }}</td>
          <td class="border">{{ formatDate(message.date) }}</td>
        </tr>
      </tbody>
    </table>
    <div class="absolute bottom-0">
      <form @submit.prevent="onSubmit" class="w-full pb-2">
        <div class="relative flex w-full">
          <input
            type="text"
            v-model="input"
            placeholder="Message"
            class="
              w-full
              focus:outline-none focus:placeholder-gray-400
              text-gray-600
              placeholder-gray-600
              bg-gray-200
              pl-4
              py-3
              pb-2
            "
          />
          <div class="items-center">
            <button
              @click="onSubmit"
              type="button"
              class="
                inline-flex
                items-center
                justify-center
                rounded-full
                h-12
                w-12
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
</template>

<script>
var dayjs = require("dayjs");
export default {
  props: {
    user: Object,
  },
  data() {
    return {
      input: "",
    };
  },
  async fetch() {
    console.log("user", this.user);
  },
  methods: {
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
    formatDate(date) {
      return dayjs(date).format("HH:mm");
    },
  },
  computed: {
    isValid() {
      return this.input.length > 0;
    },
  },
};
</script>

<style>
</style>