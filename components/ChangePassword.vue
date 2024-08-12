<template>
  <!--Body-->
  <div>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <form @submit.stop.prevent="handleSubmit(submit)">
        <div class="w-full">
          <div class="py-2">
            <span class="px-1 text-sm text-gray-100">Old Password</span>
                <div class="relative">
                  <ValidationProvider rules="required" v-slot="{ errors }" slim>
                  <input  autofocus placeholder="" :type="show ? 'password' : 'text'" class="text-md block px-3 py-2 rounded-lg w-full 
                bg-gray-900 border-2 border-gray-300 placeholder-gray-600 shadow-md
                focus:placeholder-gray-300
                focus:border-gray-300  
                focus:outline-none text-white" v-model="old_password" :class="errors[0] ? 'border-red-400' : 'border-gray-300'">
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                        <svg xmlns="http://www.w3.org/2000/svg" @click="show = !show" :class="{'block': !show, 'hidden':show }" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" :class="{'hidden': !show, 'block':show }" @click="show = !show" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                    </div> 
            </ValidationProvider>
                </div>
              </div>
        </div>
        <div class="w-full">
          <div class="py-2">
            <span class="px-1 text-sm text-gray-100">New Password</span>
                <div class="relative">
                  <ValidationProvider rules="required" v-slot="{ errors }" slim>
                  <input  autofocus placeholder="" :type="show1 ? 'password' : 'text'" class="text-md block px-3 py-2 rounded-lg w-full 
                bg-gray-900 border-2 border-gray-300 placeholder-gray-600 shadow-md
                focus:placeholder-gray-300
                focus:border-gray-300  
                focus:outline-none text-white" v-model="new_password" :class="errors[0] ? 'border-red-400' : 'border-gray-300'">
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                        <svg xmlns="http://www.w3.org/2000/svg" @click="show1 = !show1" :class="{'block': !show1, 'hidden':show1 }" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" :class="{'hidden': !show1, 'block':show1 }" @click="show1 = !show1" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                    </div> 
            </ValidationProvider>
                </div>
              </div>
        </div>
         <div class="w-full">
          <div class="py-2">
            <span class="px-1 text-sm text-gray-100">Confirm Password</span>
                <div class="relative">
                  <ValidationProvider rules="required" v-slot="{ errors }" slim>
                  <input  autofocus placeholder="" :type="show2 ? 'password' : 'text'" class="text-md block px-3 py-2 rounded-lg w-full 
                bg-gray-900 border-2 border-gray-300 placeholder-gray-600 shadow-md
                focus:placeholder-gray-300
                focus:border-gray-300  
                focus:outline-none text-white" v-model="confirmed_password" :class="errors[0] ? 'border-red-400' : 'border-gray-300'">
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                        <svg xmlns="http://www.w3.org/2000/svg" @click="show2 = !show2" :class="{'block': !show2, 'hidden':show2 }" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" :class="{'hidden': !show2, 'block':show2 }" @click="show2 = !show2" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                    </div> 
            </ValidationProvider>
                </div>
              </div>
        </div>
        <div class="flex justify-end pt-2">
          <button
            @click="$emit('hidepassword', 'close')"
            class="
              px-6
              py-3
              bg-transparent
              p-3
              rounded-lg
              text-indigo-500
              hover:bg-gray-100 hover:text-indigo-400
              mr-2
            "
          >
            Cancel
          </button>
          <button
            class="
              bg-gray-500
              hover:bg-gray-700
              text-white
              font-bold
              mt-1
              py-1
              px-2
              border border-gray-700
              rounded
            "
          >
            Change Password
          </button>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      old_password: null,
      new_password: null,
      confirmed_password: null,
      show:true,
      show1:true,
      show2:true,
    };
  },
  methods: {
    async submit() {
      try {
        const passwordChange = await this.$axios.post(
          "/users/user-change-password/",
          {
            old_password: this.old_password,
            new_password: this.new_password,
            confirmed_password: this.confirmed_password,
          }
        );
        if (!passwordChange.data.success) {
          await this.$store.dispatch("alerts/alert", {
            text: "Password Change failed, check passwords and try again.",
            type: "error",
          });
        } else {
          await this.$store.dispatch("alerts/alert", {
            text: "Successfully changed password, please login with new password ",
            type: "info",
          });
          this.$emit("hidepassword", "submit");
        }
      } catch (err) {
        await this.$store.dispatch("alerts/alert", {
          text: "Password Change failed, check passwords and try again.",
          type: "error",
        });
      }
    },
  },
};
</script>

<style>
</style>