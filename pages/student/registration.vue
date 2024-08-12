<template>
    <div class="mt-1 mx-1">
        <div class="columns flex z-0 justify-center h-screen px-6 md:grid  md:gap-6 ">
        <div class="md:mt-0 md:col-span-1 max-w-md  pb-22">     
        <br>
        <validation-observer ref="form" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(RegisterSubmit)" class="flex flex-wrap"> 
          <div class="box column is-one-third full">
            <h2 class="mt-6 ml-12 mr-9 text-center text-3xl font-extrabold text-gray-900">
              Register to your account
            </h2>
            <div class="mt-6 ml-9 mr-6">
            <label for="country" class="block text-md font-extrabold text-black">Name</label>
            <div class="mt-2">
                <ValidationProvider rules="required|alpha_spaces" v-slot="{ errors }">
                  <div>
                  <div class="mt-1 relative rounded-md shadow-sm ">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span class="text-gray-500 sm:text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                    </div>
                  <input type="text" name="email" id="email" autocomplete="email" class="shadow-sm 
                                                                                       focus:ring-red-500 
                                                                                       focus:border-red-500 
                                                                                         mt-1 
                                                                                         block 
                                                                                         w-full 
                                                                                         sm:text-sm 
                                                                                         border border-gray-300 
                                                                                         rounded-md 
                                                                                         py-2 
                                                                                         pl-9 
                                                                                         placeholder-gray-500 
                                                                                         text-black" v-model="form.name" placeholder="Enter Name">
                  </div>               
                  </div>
                  <span class="text-red-600">{{ errors[0] }}</span>
                </ValidationProvider>
            </div>
            </div>
            <div class="mt-4 ml-9 mr-6">
                <label for="country" class="block text-md font-extrabold text-black">Contact Number</label>
            </div> 
            <div class="mt-2 ml-9 mr-6">  
            <div>
                <input
                      type="tel"
                      placeholder="Enter Contact Number Here"
                      v-model="number1"
                      class="
                        px-1
                        py-1
                        placeholder-gray-500
                        text-gray-800
                        relative
                        bg-white
                        rounded
                        text-sm
                        border
                        outline-none
                        focus:outline-none
                        focus:ring
                        w-full
                      "
                    />
                <div class="text-red-600">{{ mobileErrors }}</div>
          </div> 
          </div>
          <div class="mt-4 ml-9 mr-6">
          <label for="country" class="block text-md font-extrabold text-black">Email ID</label>
          <ValidationProvider rules="required" v-slot="{ errors }" slim>
              <span
                class="
                  z-10
                  h-full
                  leading-snug
                  font-normal
                  absolute
                  bg-transparent
                  rounded
                  text-base
                  items-center
                  justify-center
                  py-2
                "
              >           
            <div class="pl-3">
              <svg
                
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-800"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                />
                <path
                  d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                />
              </svg>
            </div>
              </span>
            <input
              type="email"
              placeholder="Enter Email here"
              v-model="email1"
              class="
    .            px-2
                py-2
                placeholder-gray-500
                text-gray-800
                relative
                bg-white
                rounded
                text-sm
                border
                outline-none
                focus:outline-none
                focus:ring
                w-full
                pl-10
              "
              disabled
            />
              <span class="text-red-600">{{ errors[0] }}</span>
            </ValidationProvider> 
        </div>
        <div class="mt-4 ml-9 mr-6">
        <label for="country" class="block text-md font-extrabold text-black">Password</label>
        <div class="mt-2" >
          <ValidationProvider name="confirm" rules="required|min:8" v-slot="{ errors }">
              <div>
                 <div class="relative">
                  <input placeholder="" :type="show ? 'password' : 'text'" name="password1" id="password1" autocomplete="password1" class="shadow-sm 
                                                                                                                                         focus:ring-indigo-500 
                                                                                                                                         focus:border-indigo-500 
                                                                                                                                           mt-1 
                                                                                                                                           block 
                                                                                                                                           w-full 
                                                                                                                                           sm:text-sm 
                                                                                                                                           border border-gray-300 
                                                                                                                                           rounded-md 
                                                                                                                                           py-2 
                                                                                                                                           pl-9 
                                                                                                                                           placeholder-gray-500 
                                                                                                                                           text-black" v-model="form.password">
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
          <span class="text-red-600">{{ errors[0] }}</span>
        </ValidationProvider>
        </div>
        </div>
        <div class="mt-4 ml-9 mr-6">
        <label for="country" class="block text-md font-extrabold text-black">Confirm Password</label>
        <div class="mt-2" >
        <ValidationProvider name="confirm" rules="required|min:8" v-slot="{ errors }">
            <div>
                  <div class="relative">
                  <input placeholder="" :type="show1 ? 'password' : 'text'" name="password2" id="password2" autocomplete="password2" class="shadow-sm 
                                                                                                                                          focus:ring-indigo-500 
                                                                                                                                          focus:border-indigo-500 
                                                                                                                                            mt-1 
                                                                                                                                            block 
                                                                                                                                            w-full 
                                                                                                                                            sm:text-sm 
                                                                                                                                            border border-gray-300 
                                                                                                                                            rounded-md 
                                                                                                                                            py-2 
                                                                                                                                            pl-9 
                                                                                                                                            placeholder-gray-500 
                                                                                                                                            text-black" v-model="form.confirm_password">
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                        <svg xmlns="http://www.w3.org/2000/svg" @click="show1 = !show1" :class="{'block': !show1, 'hidden':show1 }" class="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" :class="{'hidden': !show1, 'block':show1 }" @click="show1 = !show1" class="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                    </div> 
                </div>             
            </div>
            <span class="text-red-600">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        </div>
        <div class="mt-8 ml-9 mr-6">
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
            >Submit</button
          > 
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
    data() {
        return{
            form:{
                username:"",
            },
            email1:"",
            number1:"",
            show:true,
            show1:true,
            mobileErrors: "",
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
             var user = JSON.parse(localStorage.getItem("userdata"))
            if(user)
            {
              this.number1 = user.numbers
              this.email1 = user.email
            }
            else
            {
              this.$router.push("/user")
            }
            localStorage.removeItem("submitcount2");
            localStorage.removeItem("submitcount3");    
        },
        methods:{
              valContact(number, obj){
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
                  else if(obj.valid && obj.valid === false)
                  {
                      this.mobileErrors = "Invalid mobile number";
                  } 
                  else 
                  {
                      this.mobileErrors = "";
                  }
                  },
            async RegisterSubmit(){
              this.form.email = this.email1
              this.form.number = this.number1
               if (this.mobileErrors)
                  {
                    alert("Please add valid mobile number");
                  }
                  if(!this.mobileErrors){
                  try{
                    if(this.$route.query.meeting_id==null){
                      this.form.username = this.form.email
                      await this.$store.dispatch('student/getRegistration',{"form":this.form});
                      if (this.$store.state.student.register){
                      await this.$store.dispatch("alerts/alert", {
                            text: "Successfully Registered",
                            type: "success",
                          });
                          let cs = this.form.email
                          let cs1 = this.form.password
                          let data1 = {
                                "username":cs,
                                "password":cs1
                              }
                        await this.$store.dispatch("auth/slogin",data1);
                        this.$router.push({ path: "/student" });
                        this.$store.dispatch("student/resetmsg");
                        
                      }
                      if (this.$store.state.student.error){
                        await this.$store.dispatch("alerts/alert", {
                            text: this.$store.state.student.errorMsg,
                            type: "error",
                      });
                      this.$store.dispatch("student/resetmsg");
                      }
                    }
                    else{
                      await this.$store.dispatch('student/getRegistration',{"form":this.form,"meeting_id":this.$route.query.meeting_id});
                      if (this.$store.state.student.register){
                      await this.$store.dispatch("alerts/alert", {
                            text: "Successfully Registered",
                            type: "success",
                          });
                          let cs = this.form.email
                          let cs1 = this.form.password
                          let data1 = {
                                "username":cs,
                                "password":cs1
                              }
                        await this.$store.dispatch("auth/slogin",{"form":data1, "meeting_id":this.$route.query.meeting_id});
                        this.$router.push({ path: "/student" });
                        this.$store.dispatch("student/resetmsg");
                      }
                      if (this.$store.state.student.error){
                        await this.$store.dispatch("alerts/alert", {
                            text: this.$store.state.student.errorMsg,
                            type: "error",
                      });
                      this.$store.dispatch("student/resetmsg");
                      }
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
             mounted() {
              window.onpopstate = event => {
                  this.$router.push({ path: '/user'}); 
              };
          }     
       },
 
}
</script>

<style scoped>
.full{
width: 100vw;
height: 100vh;
background: linear-gradient(to top,white  25%, rgba(128, 128, 128, 0.116));
}
</style>
