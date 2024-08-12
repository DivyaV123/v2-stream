<template>
    <div class="mt-1 mx-1">
        <div class="columns flex z-0 justify-center h-screen px-6 md:grid  md:gap-6 ">
        <div class="mt-5 md:mt-0 md:col-span-2 ml-9 mr-9 max-w-sm w-full">     
        <br>
        <validation-observer ref="form" v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(LoginSubmit)" class="flex flex-wrap"> 
              <div class="box column is-one-third ">
                <h2 class="
                    mt-6 
                    text-center 
                    text-xl 
                    font-extrabold
                    text-white">
                  Login using this email id 
                <span class="text-accent">
                  {{form.username}}
                </span>
              </h2>
              <div class="mt-1" >
                <div class="mt-2" >
                <ValidationProvider name="confirm" rules="required" v-slot="{ errors }">
                      <div class="py-2">
                        <span class="
                              px-1 
                              text-sm 
                              text-gray-100">Password</span>
                          <div class="relative">
                            <input placeholder="" 
                            :type="show ? 'password' : 'text'" 
                            class="text-md 
                            block 
                            px-3 
                            py-2 
                            rounded-lg
                            w-full 
                            bg-white border-2 
                            border-gray-300
                            placeholder-gray-600 
                            shadow-md
                            focus:placeholder-gray-500
                            focus:bg-white 
                            focus:border-gray-600  
                            focus:outline-none 
                            text-black"
                            v-model="form.password">
                            <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                <svg xmlns="http://www.w3.org/2000/svg" @click="show = !show" :class="{'block': !show, 'hidden':show }" class="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" :class="{'hidden': !show, 'block':show }" @click="show = !show" class="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                                  <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                </svg>
                            </div> 
                          </div>
                      </div>
                      <span class="text-white">{{ errors[0] }}</span>
                </ValidationProvider>
                </div>
              </div>
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
                >Submit</button> 
            </div>
            </div>
          </form>
        </validation-observer> 
        <div class="mt-4 ml-24">
        <button @click="onForgot()">
            <h2 class="
                text-center 
                text-black
                btn bg-white
                btn-sm
                text-xs
                m-2 
                hover:bg-white
                border border-black"
                >Forgot Password?</h2>
        </button>
        </div>
         </div> 
        </div>
        <PasswordForgot :username="form.username" v-if="showForgot" @cousubmit="closeForgot"  />
  </div>
</template>
<script>
export default {
    data() {
        return{
            form:{
                username:"",
                email:"",
            },
            showForgot : false,
            mobileErrors: "",
            show:true,
            inputOptions: {
                  autocomplete: "off",
                  required: true,
                  placeholder: "Enter a phone number",
                  styleClasses:
                      "py-2 placeholder-gray-500 text-gray-800 relative bg-white rounded text-sm border border-red-500 outline-none focus:outline-none focus:ring w-full",
            },
        };     
    },
    head() {
        return {
            title: "Online Student | Qspiders",
        };
        },
        async fetch() {
            var user = JSON.parse(localStorage.getItem("userEmail"))
            if(user){
              this.form.username = user.username.username
            }
            else{
              this.$router.push("/user")
            }          
        },
     methods:{
         valContact(number, obj) {
            if (obj.countryCallingCode && obj.countryCallingCode === "91")
             {
                if (obj.nationalNumber && obj.nationalNumber.length != 10) 
                {
                this.mobileErrors = "Invalid mobile number";
                }
                else 
                {
                this.mobileErrors = "";
                }
            }
            else if (obj.valid && obj.valid === false) 
            {
              this.mobileErrors = "Invalid mobile number";
            } 
            else 
            {
              this.mobileErrors = "";
            }
            },
        async LoginSubmit(){
            try{
            let cs = this.form.username
            let cs1 = this.form.password
            let data1 = {
              "username":cs,
              "password":cs1
              }
                if(this.$route.query.meeting_id==null)
                {
                  await this.$store.dispatch("auth/slogin", data1);
                  if (this.$store.state.auth.user) 
                  {
                    await this.$store.dispatch("alerts/alert", {
                        text: "Logged in as " + data1['username'],
                        type: "success",
                    });
                    var user = JSON.parse(localStorage.getItem("submitcount2"))
                    console.log("countsss",user)
                    var user1 = localStorage.removeItem("submitcount2");
                    console.log("countsss",user1)
                    var user2 = JSON.parse(localStorage.getItem("submitcount3"))
                    console.log("countsss",user2)
                    var user3 = localStorage.removeItem("submitcount3");
                    console.log("countsss",user3)
                    this.$store.dispatch("auth/resetmsg");
                    this.$router.push({ path: "/student" });
                  }
                  if (this.$store.state.auth.error) 
                  {
                    await this.$store.dispatch("alerts/alert", {
                        text: "Login failed, please check username and password",
                        type: "error",
                    });
                    this.$store.dispatch("auth/resetmsg");
                  }
                    
                }
                else{
                    await this.$store.dispatch("auth/slogin", {"form":data1, "meeting_id":this.$route.query.meeting_id});
                    if (this.$store.state.auth.user) 
                    {
                        await this.$store.dispatch("alerts/alert", {
                        text: "Logged in as " + data1['username'],
                        type: "success",
                        });
                        var user = JSON.parse(localStorage.getItem("submitcount2"))
                        console.log("countsss",user)
                        var user1 = localStorage.removeItem("submitcount2");
                        console.log("countsss",user1)
                        var user2 = JSON.parse(localStorage.getItem("submitcount3"))
                        console.log("countsss",user2)
                        var user3 = localStorage.removeItem("submitcount3");
                        console.log("countsss",user3)
                        this.$store.dispatch("auth/resetmsg");
                        this.$router.push({ path: "/student" });
                    }
                    if (this.$store.state.auth.error) 
                    {
                        await this.$store.dispatch("alerts/alert", {
                        text: "Login failed, please check username and password",
                        type: "error",
                        });
                        this.$store.dispatch("auth/resetmsg");
                    }
                    
                }
          }
          catch(err){
              await this.$store.dispatch("alerts/alert", {
                text: "Something went wrong",
                type: "error",
              });
            }
        },  
        async onForgot(){
            this.showForgot = true;
        }, 
        async closeForgot(){
          this.showForgot = false
            },
        },       
}
</script>
