<template>
  <div class="py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="
          absolute
          inset-0
          bg-gradient-to-r
          from-yellow-300
          to-yellow-600
          shadow-lg
          transform
          -skew-y-6
          sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl
        "
      ></div>
      <div
        class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
      >
        <div class="max-w-md mx-auto">
          <div>
            <h1 class="text-2xl font-semibold text-gray-600">
              Welcome to QSpiders Online
            </h1>
          </div>
          <validation-observer ref="observer" v-slot="{ handleSubmit }">
            <form @submit.stop.prevent="handleSubmit(userLogin)" class="">
              <div class="divide-y divide-gray-200">
                <div
                  class="
                    py-8
                    text-base
                    leading-6
                    space-y-4
                    text-gray-700
                    sm:text-lg sm:leading-7
                  "
                >
                  <div class="relative">
                    <ValidationProvider
                      rules="required|email"
                      v-slot="{ errors }"
                      slim
                    >
                      <input
                        autocomplete="off"
                        autofocus
                        v-model="login.username"
                        id="email"
                        name="email"
                        type="text"
                        class="
                          peer
                          placeholder-transparent
                          h-10
                          w-full
                          text-gray-900
                          focus:outline-none focus:borer-rose-600
                        "
                        :class="
                          errors[0]
                            ? 'border-b-2 border-red-600'
                            : 'border-b-2 border-gray-300'
                        "
                        placeholder="Email address"
                      />
                    </ValidationProvider>
                    <label
                      for="email"
                      class="
                        absolute
                        left-0
                        -top-3.5
                        text-gray-600 text-sm
                        peer-placeholder-shown:text-base
                        peer-placeholder-shown:text-gray-440
                        peer-placeholder-shown:top-2
                        transition-all
                        peer-focus:-top-3.5
                        peer-focus:text-gray-600
                        peer-focus:text-sm
                      "
                      >Email Address</label
                    >
                  </div>
                  <div class="relative">
                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors }"
                      slim
                    >
                      <input
                        autocomplete="off"
                        id="password"
                        name="password"
                        type="password"
                        class="
                          peer
                          placeholder-transparent
                          h-10
                          w-full
                          text-gray-900
                          focus:outline-none focus:borer-rose-600
                        "
                        :class="
                          errors[0]
                            ? 'border-b-2 border-red-600'
                            : 'border-b-2 border-gray-300'
                        "
                        v-model="login.password"
                        placeholder="Password"
                      />
                    </ValidationProvider>
                    <label
                      for="password"
                      class="
                        absolute
                        left-0
                        -top-3.5
                        text-gray-600 text-sm
                        peer-placeholder-shown:text-base
                        peer-placeholder-shown:text-gray-440
                        peer-placeholder-shown:top-2
                        transition-all
                        peer-focus:-top-3.5
                        peer-focus:text-gray-600
                        peer-focus:text-sm
                      "
                      >Password</label
                    >
                  </div>
                  <div class="relative">
                    <button class="btn">Login</button>
                  </div>
                </div>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
    };
  },
  head() {
    return {
      title: "Login | Counselor",
    };
  },
  async fetch() {
    await this.$store.dispatch("title", "Login to QSAAS Counselor");
  },
  methods: {
    async userLogin() {
      await this.$store.dispatch("auth/login", this.login);
      console.log("login",this.login)
      if (this.$store.state.auth.user) {
        await this.$store.dispatch("alerts/alert", {
          text: "Logged in as " + this.login.username,
          type: "success",
        });
        this.$store.dispatch("auth/resetmsg");
        this.$router.push({ name: "index" });
      }
      if (this.$store.state.auth.error) {
        await this.$store.dispatch("alerts/alert", {
          text: "Logged failed, please check username and password",
          type: "error",
        });
        this.$store.dispatch("auth/resetmsg");
      }
    },
  },
};
</script>

<style>
</style>