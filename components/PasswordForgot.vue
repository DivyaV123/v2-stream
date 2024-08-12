
<template>
    <div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
   	<div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
    <div class=" max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white modal-card-body">
    <div class="hello max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg ">
        <div class="p-3  mt-2 text-center space-x-4 ">
               <div
                class="modal-close cursor-pointer z-50"
                @click="$emit('cousubmit', 'close')"
              >
                <svg
                  class="fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                  />
                </svg>
              </div>
        <div class="p-3  pt-8 mt-2 text-center space-x-4">
                <section class=" px-1 py-1 pt-4">
                        <div class="flex justify-between items-center pb-8">
                        <p class="text-2xl text-gray-700 font-bold space-x-44 ">
                          Forgot Password ? 
                        </p>
                      </div>          
                      <div>
                        <div class="mt-1 relative rounded-md shadow-sm border border-black">
                          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span class="text-gray-500 sm:text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                            </span>
                          </div>
                          <input type="text" name="email" id="email" v-model="form.email" class="focus:ring-indigo-500 
                                                                                                 focus:border-indigo-500 
                                                                                                 block 
                                                                                                 w-full 
                                                                                                 pl-9 
                                                                                                 sm:text-sm 
                                                                                                 rounded-md 
                                                                                                 p-3 
                                                                                                 text-black" placeholder="Enter Email address" />
                        </div>   
                      </div>
                      <div class="flex justify-center pt-10">
                            <button
                              @click="$emit('cousubmit', 'close')"
                              class="
                                px-6
                                py-3
                                bg-black
                                p-3
                                border border-white
                                rounded-lg
                                text-white
                                mr-2
                              "
                            >
                              Cancel
                            </button>
                            <button
                              class="
                                bg-success
                                text-white
                                font-bold
                                py-1
                                px-2
                                border border-gray-700
                                rounded
                              "
                              @click="sendForgot()"
                            >
                              Password Reset by Email
                              <ConfirmEmail v-if="showMail" />
                              
                            </button>
                            &nbsp; &nbsp; 
                             <button
                              class="
                                bg-accent
                                text-black
                                font-bold
                                py-1
                                px-2
                                border border-gray-700
                                rounded
                              "
                              @click="sendOTP()"
                            >
                              Password Reset by OTP
                              
                            </button>
                          </div>  
                </section>       
        </div>
        </div>
      </div>
    </div>
    </div>
</template>
<script>


export default {
  props: {
   username: ""
 },
  data() {
       return{
         form:{
            },
            showotp : false,
            showMail : false,
            email:""
       }
  },
  async fetch() {
    this.form.email = this.username

  },
 methods: {

    async sendForgot() {
       this.showMail = true
      try {     
        const forgot = await this.$axios.post(
            "api/password_reset/",
            this.form
          );
          if (forgot.status == 200){
            
        }        
      }
      catch (error) {
        await this.$store.dispatch("alerts/alert", {
          text: error.response.data.email[0],
          type: "error",
        });
      }
    },
    async sendOTP() {
       this.showotp = true
          this.$router.push({ path: "/student/reset_otp_send" });
  }
  }
}
</script>
<style scoped>
.hello{
  width:100%
}
.modal-card-body{
 overflow-y: auto;
}
</style>