<template>
  <div class="flex justify-center min-h-screen bg-gray-800 antialiased">  
  <div class="container sm:mt-40 mt-24 my-auto max-w-md border-2 border-gray-200 p-3 bg-gray-900">
  <div class="text-center m-6">
    <h1 class="text-3xl font-semibold text-accent">Reset Password</h1>
  </div>
  <div class="m-6">
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <form class="mb-4" @submit.stop.prevent="handleSubmit(submit)">
        <div class="mb-6 ">
              <div>
                    <ValidationProvider rules="required|min:8|password:@confirm" v-slot="{ errors }">
                      <label for="email" class="block mb-2 text-sm text-white dark:text-white">New Password</label>
                      <input
                        class="w-full 
                               px-3 
                               py-2 
                               placeholder-gray-600 
                               border border-gray-300 
                               rounded-md 
                               focus:outline-none 
                               focus:ring 
                               focus:ring-indigo-100 
                               focus:border-accent  
                               text-black 
                               dark:placeholder-gray-500 
                               dark:border-gray-600 
                               dark:focus:ring-gray-900 
                               dark:focus:border-gray-500"
                        type="password"
                        v-model="new_password"
                        placeholder="New Password"
                      />
                      <span class="text-error">{{ errors[0] }}</span>
                    </ValidationProvider>
              </div>
              <div>
                    <ValidationProvider name="confirm" rules="required" v-slot="{ errors }">
                      <label for="email" class="block mb-2 text-sm text-white dark:text-white pt-4">Confirm Password</label>
                      <input
                        class="w-full 
                               px-3 
                               py-2 
                               placeholder-gray-600 
                               border border-gray-300 
                               rounded-md 
                               focus:outline-none 
                               focus:ring 
                               focus:ring-indigo-100 
                               focus:border-accent  
                               text-black 
                               dark:placeholder-gray-500 
                               dark:border-gray-600 
                               dark:focus:ring-gray-900 
                               dark:focus:border-gray-500"
                        type="password"
                        v-model="confirmed_password"
                        placeholder="Confirm Password"
                      />
                      <span class="text-error">{{ errors[0] }}</span>
                    </ValidationProvider>
              </div> 
        </div>
        <div class="mb-6">
          <button type="submit" class="w-full 
                                       px-3 
                                       py-3 
                                       text-black 
                                       bg-accent 
                                       rounded-md 
                                       hover:bg-accent 
                                       focus:outline-none 
                                       duration-100 
                                       ease-in-out">Save</button>
        </div>
      </form>
      </validation-observer>
      <div v-if="showpop==true" class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
          <div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
          <div class=" max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900 modal-card-body">
          <div class="hello max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg">
            <p class="text-white">Your session has been expired</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
        title: "Online Student | Qspiders",
    };
  },
  data() {
    return {
      new_password: null,
      confirmed_password: null,
      form : {},
      showpop:false
    };
  },
  async fetch(){
        var user = JSON.parse(localStorage.getItem("userda"))
            if(user)
            {
              this.form.number = user.numbers
            }
            else
            {
              this.$router.push("/user")
            }
    
  },
  methods: {
    async submit() {
      try{
        let form = {
          "password":this.new_password,
          "re-type":this.confirmed_password,
          "number":this.form.number
        }
        const forgot = await this.$store.dispatch("student/getResetOTPConfirm", {"form":form});
          if (this.$store.state.student.reset_confirm){
          await this.$store.dispatch("alerts/alert", {
            text: "Successfully changed password, please login with new password ",
            type: "info",
          });
          this.$router.push({ name: "user" });
          }
         }
         catch (err){
          await this.$store.dispatch("alerts/alert", {
            text: "something went wrong",
            type: "error",
          });
      }
    },
  },
        
}
</script>

<style>

</style>