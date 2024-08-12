<template>
    <div class="mt-1 mx-1">
    <div class="flex justify-center item-center min-h-screen bg-gray-800 antialiased">  
    <div class="container sm:mt-40 mt-24 my-auto max-w-md border-2 border-gray-200 p-3 bg-gray-900">
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
    <div class="text-center m-6">
        <h1 class="text-3xl font-semibold text-blue-400">Add Meeting ID</h1>
    </div>
    <br>
      <validation-observer ref="form" v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(meetingSubmit)" class="flex flex-wrap"> 
            <div class="align-center">
                <ValidationProvider rules="required" v-slot="{ errors }">
                    <label for="email" class="block mb-2 text-sm text-white dark:text-white md:ml-12">Meeting ID</label>
                    <textarea id="" cols="30" rows="5" v-model="form.meeting_id" class="mt-1 block w-full shadow-sm sm:text-sm rounded-md leading-5 pl-6 pt-2  text-black md:ml-12" placeholder="Enter meeting id"></textarea>
                    <span class="text-blue-400 md:ml-12">{{ errors[0] }}</span>
                </ValidationProvider>
            </div>
            <br> 
            <br>
            <div class=" md:ml-12 sm:mt-18">
            <button
            type="submit"
                class="
                    py-2
                    px-4
                    pb-4
                    text-center
                    bg-blue-400
                    rounded
                    w-full
                    font-extrabold
                    text-black text-md
                "
                >Submit</button>
            </div>              
      </form>
      </validation-observer> 
    </div>
    </div>
    </div>
</template>
<script>
export default {
  middleware: ["authenticated","is_student"],
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
            await this.$store.dispatch("title", "QSAAS Student");   
            },
     methods:{
            valContact(number, obj)
              {
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
            async meetingSubmit(){
                try{
                let cs = this.form.username
                let cs1 = this.form.password
                let data1 = {
                  "username":cs,
                  "password":cs1
                }
                  await this.$store.dispatch("student/getMeetingID", this.form);
                    if (this.$store.state.student.meeting_id.data.message=="Successfully added Meeting ID")
                    {
                    await this.$store.dispatch("alerts/alert", {
                        text: "Successfully added meeting ID",
                        type: "success",
                    });
                    this.$router.push({ path: "/student" });
                    this.$store.dispatch("auth/resetmsg");
                    }
                    if (this.$store.state.student.meeting_id.data.message=="Already exists")
                    {
                    await this.$store.dispatch("alerts/alert", {
                        text: "Meeting ID already exists",
                        type: "error",
                    });
                      this.$store.dispatch("auth/resetmsg");
                    }
                    if (this.$store.state.student.meeting_id.data.message=="It's not a valid meeting id or Batch closed, Please contact admin")
                    {
                    await this.$store.dispatch("alerts/alert", {
                        text: "Not a Valid meeting ID",
                        type: "error",
                    });
                    this.$router.push({ path: "/student/corporate_meeting" });
                    this.$store.dispatch("auth/resetmsg");
                    }
              }
                catch(err){
                    await this.$store.dispatch("alerts/alert", {
                      text: "Something went wrong",
                      type: "error",
                    });
                    this.$router.push({ path: "/student/corporate_meeting" });
                  }
            },  
              async onForgot(){
                 this.showForgot = true;
              }, 
              async closeForgot(){
                this.showForgot = false
              },
              async closebutton(){
               this.$router.push({ path: "/student" });
            },
        },
          async mounted(){
              localStorage.setItem("users", JSON.stringify(this.$route.params.username));
              var users = localStorage.getItem("users")
              this.form.username = this.$route.params.username
          }

        
}
</script>
