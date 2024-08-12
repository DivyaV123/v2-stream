<template>
    <div class="mt-1 mx-1">
        <div class="columns flex z-0 justify-center h-screen px-6 md:grid  md:gap-6 ">
        <div class="mt-5 md:mt-0 md:col-span-2 ml-9 mr-9 max-w-sm w-full">     
        <br>
        <validation-observer ref="form" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(sendotp)" class="flex flex-wrap"> 
          <div class="box column is-one-third ">
          <h2 class="mt-6 text-center text-xl font-extrabold text-white">
              OTP number is 
              <span class="text-accent">
                {{form.number}}
              </span>
          </h2>
        <br>
        <div class="mt-4">
         <button
          type="submit"
            class="
             py-2
                px-4
                text-center
                bg-accent
                rounded-full
                w-full
                font-extrabold
                text-black text-md
            "
            >Send OTP</button> 
        </div>
        </div>
      </form>
      </validation-observer> 
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
        return{
            form:{
                number:"",
                email:"",
            },
            store:[],

            show:true,
        };     
    },
    head() {
        return {
            title: "QSAAS | Student",
            };
          },
        async fetch() {
            var user = JSON.parse(localStorage.getItem("userdata"))
            if(user)
            {
              this.form.number = user.numbers
            }
            else
            {
              this.$router.push("/user")
            }
        },
     methods:{
            async sendotp(){
                var submitcount3 = JSON.parse(localStorage.getItem("submitcount3"))
                var submitcount2 = JSON.parse(localStorage.getItem("submitcount2"))
                console.log("submitcount2",submitcount2)
                console.log("submitcount3",submitcount3)
                  if(submitcount3!=null){
                      if(submitcount3.countzz==4&&submitcount3.number==this.form.number){
                        this.$router.push({ path:"/student/resend_corporate"});
                      }
                      else{
                        try{
                        const splits = this.form.number.replace(" ","")
                        const splits1 = splits.replace(" ","")
                        const splits2 = splits1.replace(" ","")
                        await this.$store.dispatch('student/getOTPCount',{"form":splits2});
                        await this.$store.dispatch('student/getOTP',{"form":splits2});
                            await this.$store.dispatch("alerts/alert", {
                                text: "OTP sent Successfully",
                                type: "success",
                            });
                            this.$router.push({ path: "otp_verify",query:this.$route.query});
                            this.$store.dispatch("auth/resetmsg");
                    
                            if (this.$store.state.student.error) {
                            await this.$store.dispatch("alerts/alert", {
                              text: this.$store.state.student.errorMsg,
                                type: "error",
                            });
                            this.$store.dispatch("auth/resetmsg");
                            }
                          }
                        catch(err){
                            await this.$store.dispatch("alerts/alert", {
                              text: "Something went wrong",
                              type: "error",
                            });
                          }
                  }

                    }
                    else if(submitcount2!=null){
                      console.log("inside")
                      console.log("number in send otp page",this.form.number)
                      if(submitcount2.countz==3&&submitcount2.number==this.form.number){
                        this.$router.push({ path:"/student/resend_corporate"});
                      }
                      else{
                         try{
                          const splits = this.form.number.replace(" ","")
                          const splits1 = splits.replace(" ","")
                          const splits2 = splits1.replace(" ","")
                          await this.$store.dispatch('student/getOTPCount',{"form":splits2});
                          await this.$store.dispatch('student/getOTP',{"form":splits2});
                              await this.$store.dispatch("alerts/alert", {
                                  text: "OTP sent Successfully",
                                  type: "success",
                              });
                              this.$router.push({ path: "otp_verify",query:this.$route.query});
                              this.$store.dispatch("auth/resetmsg");
                      
                              if (this.$store.state.student.error) {
                              await this.$store.dispatch("alerts/alert", {
                                text: this.$store.state.student.errorMsg,
                                  type: "error",
                              });
                              this.$store.dispatch("auth/resetmsg");
                              }
                            }
                          catch(err){
                              await this.$store.dispatch("alerts/alert", {
                                text: "Something went wrong",
                                type: "error",
                              });
                            }
                      }
                    }
                      else{
                         try{
                          const splits = this.form.number.replace(" ","")
                          const splits1 = splits.replace(" ","")
                          const splits2 = splits1.replace(" ","")
                          await this.$store.dispatch('student/getOTPCount',{"form":splits2});
                          await this.$store.dispatch('student/getOTP',{"form":splits2});
                              await this.$store.dispatch("alerts/alert", {
                                  text: "OTP sent Successfully",
                                  type: "success",
                              });
                              this.$router.push({ path: "otp_verify",query:this.$route.query});
                              this.$store.dispatch("auth/resetmsg");
                      
                              if (this.$store.state.student.error) {
                              await this.$store.dispatch("alerts/alert", {
                                text: this.$store.state.student.errorMsg,
                                  type: "error",
                              });
                              this.$store.dispatch("auth/resetmsg");
                              }
                            }
                          catch(err){
                              await this.$store.dispatch("alerts/alert", {
                                text: "Something went wrong",
                                type: "error",
                              });
                            }
                      }
                         
                    
            }, 
        },      
}
</script>
