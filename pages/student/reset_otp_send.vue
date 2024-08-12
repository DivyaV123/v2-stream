<template>
<div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
   	<div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
    <div class="max-4xl  z-30 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900 modal-card-body">
    <div class="hello max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg">
      <div class="flex justify-center items-center">
        <div class="bg-gray-900 rounded-lg">
           <div class="flex justify-right items-right pb-3">
              <div
                class="modal-close cursor-pointer z-50"
                @click="closebutton()"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          <div class="w-full  rounded-lg flex">
              <validation-observer ref="form" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(sendOTP)" class="flex flex-wrap"> 
            <div class="w-full  text-center">
            <p class="py-4 text-sm text-gray-300">Enter the number to which the OTP will be sent</p>
              <div class="w-full">
                <div class="h-28 py-3 rounded text-center">
                    <div class="flex">
                      <div class="flex-none w-32">
                        <!-- <v-select 
                              class="border border-white text-sm text-white selected text-left placeholder-text-xs"
                              label="code"
                              v-model="form.code"
                              :options="countryCodes"
                              :reduce="code => code.id"
                              placeholder="Search Country code"
                            >
                            </v-select> -->
                        <v-select
                          class="border border-info text-sm text-white"
                          label="code"
                          v-model="form.code"
                          :options="countryCodes"
                          :reduce="(code) => code.code"
                          placeholder="Search here"
                        ></v-select>
                        <!-- <select class="select-sm w-full max-w-xs rounded text-black bg-white p-0" v-model="form.code" >
                          <option v-for="(number, i) in countryCodes" :key="i" :value="number.code" >{{number.code}}</option> 
                        </select> -->
                      </div>
                      <div class="shrink w-52 h-max">
                        <ValidationProvider
                          rules="required|digits:10"
                          v-slot="{ errors }"
                          slim
                        >
                          <input
                            type="tel"
                            v-model="form.number"
                            placeholder="Enter number here"
                            :class="
                              errors[0] ? 'border-red-500' : 'border-gray-500'
                            "
                            class="
                              px-6
                              py-1
                              placeholder-gray-500
                              text-gray-800
                              relative
                              bg-white
                              rounded
                              text-sm
                              border
                              outline-none
                              focus:outline-none focus:ring
                              w-full
                              input-sm
                            "
                          />
                          <span class="text-error">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>
                </div>
            <div class="mb-12">
                <button
                type="submit"
                id="btn"
                class="
                  py-2
                  px-4
                  text-center
                  bg-accent
                  rounded-full
                  w-full
                  font-extrabold
                  text-white text-md
              "
              >Send OTP</button> 
              </div>
              </div>
            </div>
                </form>
              </validation-observer>
          </div>
          <div >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
    data() {
        return{
            form:{
              otp1:"",
              otp2:"",
              otp3:"",
              otp4:"",
              otp5:"",
              otp6:"",
            number:"",
            email:"",
            },
            countryCodes:[],
            maxLength:0,
            otp1:0,
            mobileErrors: "",
            show:true,
            counts : 0,
            timestamp:"",
            interval : "",
            submitcounts :0,
            countss: 0 ,
            countDown : 60,
            timeout: null,
            show_re:false,
            isOpen : false

        };     
    },

    async fetch(){
    let codes = await this.$axios.get("student/country-codes/");
    this.countryCodes = codes.data.results;
    this.form.code = this.countryCodes[0].code;
    },
 methods: {
    async submit() {
      this.$emit("cousubmit", "close");
      this.$router.push({ name: "user" });
    },
    async sendOTP() {
        if (this.form.number) {
        this.form.numbers = this.form.code + "" + this.form.number;
      }
      try {  
          console.log("this.form.numbers",this.form.numbers)
          console.log("this.form.number",this.form.number)
        const splits = this.form.numbers.replace(" ","")
                        const splits1 = splits.replace(" ","")
                        const splits2 = splits1.replace(" ","")   
        console.log("heree")   
        localStorage.setItem("userda", JSON.stringify({numbers:splits2}));             
        await this.$store.dispatch('student/getResetOTP',{"number":splits2});
        await this.$store.dispatch("alerts/alert", {
              text: "OTP sent Successfully",
              type: "success",
          });  
          this.$router.push({ path: "/student/reset_otp_verify" });
      }
      catch (err) {
        await this.$store.dispatch("alerts/alert", {
          text: err.response.data.message,
          type: "error",
        });
      }
    },
    async closebutton(){
          this.$router.push({ path: "/user" });
      },
 
             },
}
</script>
<style>
</style>