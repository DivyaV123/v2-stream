<template>
<div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
   	<div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
    <div class="max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900 modal-card-body">
    <div class="hello max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg">
      <div class="flex justify-center items-center">
        <div class="bg-gray-900 rounded-lg">
              <validation-observer ref="form" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(OtpSubmit)" class="flex flex-wrap"> 
            <div class="w-full  text-center">
              <h3 class="font-bold text-white text-3xl mt-0 pt-0">OTP Sent.</h3>
              <p class="py-4 text-sm text-gray-300">An OTP has been sent to {{form.number}}</p>
              <div class="w-full">
                <div class="h-56 py-3 rounded text-center">
                <h1 class="text-2xl font-bold text-accent">OTP Verification</h1>
                <div class="flex flex-col mt-4 text-blue-200"> <span>Enter the OTP you received at</span> <span class="font-bold">{{form.number}}</span> </div>
                <div id="otp" class="flex flex-row justify-center text-center px-2 mt-5"> 
                    <input :onchange="ValidatePassKey('first')" v-model="form.otp1" class="m-2 border h-10 w-10 text-center form-control rounded text-black" type="text" id="first" maxlength="1" />
                    <input :onchange="ValidatePassKey('second')" v-model="form.otp2" class="m-2 border h-10 w-10 text-center form-control rounded text-black" type="text" id="second" maxlength="1" /> 
                    <input :onchange="ValidatePassKey('third')" v-model="form.otp3" class="m-2 border h-10 w-10 text-center form-control rounded text-black" type="text" id="third" maxlength="1" /> 
                    <input :onchange="ValidatePassKey('four')" v-model="form.otp4" class="m-2 border h-10 w-10 text-center form-control rounded text-black" type="text" id="four" maxlength="1" />
                    <input :onchange="ValidatePassKey('five')" v-model="form.otp5" class="m-2 border h-10 w-10 text-center form-control rounded text-black" type="text" id="five" maxlength="1" /> 
                    <input :onchange="ValidatePassKey('six')" v-model="form.otp6" class="m-2 border h-10 w-10 text-center form-control rounded text-black" type="text" id="six" maxlength="1" /> 
                </div>
                <div class="flex justify-center text-center mt-5"> <a class="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><i class='bx bx-caret-right ml-1'></i></a> </div>
                </div>
            <div class="mb-4">
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
              >Submit</button> 
              </div>
              </div>
            </div>
                </form>
              </validation-observer>
              <div class="grid justify-items-center">
              <div v-if="isOpen== true" class="">
                <div class="mt-4">
                  <button  @click="delay">
                      <h2 class="text-right text-white hover:underline btn btn-sm ">Resend OTP?</h2>
                  </button>
                </div>
              </div>
              <div v-else>
                <div class="mt-4 ">
                  <button class="" >
                    <h2 class="text-white border border-white hover:underline btn btn-sm">Resend OTP in {{countDown}} seconds</h2>
                  </button>
                </div>
              </div>
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
    head() {
        return {
            title: "Online Student | Qspiders",
        };
        },
        async fetch() {
             var user = JSON.parse(localStorage.getItem("userda"))
            if(user)
            {
              this.form.number = user.numbers
            }
            else
            {
              this.$router.push("/user")
            }
            var countt = JSON.parse(localStorage.getItem("submit1"))
            if (countt)
            {
              this.counts = countt.countz
            }
             var counttt = JSON.parse(localStorage.getItem("submit2"))
            if (counttt)
            {
              this.countss = counttt.countzz
            }
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +' '+ time;
            this.timestamp = dateTime;
        },
     methods:{
            countDownTimer() {
                      if(this.countDown > 0) {
                        // console.log("heree 1st")
                          setTimeout(() => {
                              this.countDown -= 1
                              // console.log("countdown",this.countDown )
                              this.countDownTimer()
                          }, 1000)

                      }
                  },
            async ValidatePassKey(currentid) {
              let currentval = document.getElementById(currentid)
              if (currentval) {
                currentval.onkeyup = function(e) {
                  var target = e.srcElement || e.target;
                  var maxLength = parseInt(target.attributes["maxlength"].value, 10);
                  var myLength = target.value.length;
                  if (myLength >= maxLength) {
                    var next = target;
                    while (next = next.nextElementSibling) {
                      if (next == null)
                        break;
                      if (next.tagName.toLowerCase() === "input") {
                        next.focus();
                        break;
                      }
                    }
                  }
                  else if (myLength === 0) {
                    var previous = target;
                    while (previous = previous.previousElementSibling) {
                      if (previous == null)
                        break;
                      if (previous.tagName.toLowerCase() === "input") {
                        previous.focus();
                        break;
                      }
                    }
                  }
                }
              }
            },
            valContact(number, obj) 
            {
                if (obj.countryCallingCode && obj.countryCallingCode === "91")
                {
                    if (obj.nationalNumber && obj.nationalNumber.length != 10)
                    {
                    this.mobileErrors = "Invalid mobile number";
                    } else 
                    {
                    this.mobileErrors = "";
                    }
                }
                else if (obj.valid && obj.valid === false)
                {
                    this.mobileErrors = "Invalid mobile number";
                } else 
                {
                    this.mobileErrors = "";
                }
            },
            delay(){
                  this.countDown= 60
                  this.isOpen = false
                  this.timeout = setTimeout(() => {
                    this.isOpen = true
                  }, 60000)
                  this.onResend()
                  this.countDownTimer()
                },
            async OtpSubmit(){
                try{
                    if (this.form.otp6 && this.form.otp1)
                    {
                    var couunt = this.counts
                    couunt++;
                    this.counts = couunt
                    localStorage.setItem("submit1", JSON.stringify({countz:this.counts,number:this.form.number}));
                    }
                  const splits = this.form.number.replace(" ","")
                  const splits1 = splits.replace(" ","")
                  const splits2 = splits1.replace(" ","")
                  const otp = this.form.otp1+this.form.otp2+this.form.otp3+this.form.otp4+this.form.otp5+this.form.otp6
                  const data1 = {
                      "otp":otp,
                    }
                  await this.$store.dispatch("student/getResetOTPVerify", {"form":splits2,"data1":otp});
                  if (this.$store.state.student.reset_otp_verify)
                    {
                    await this.$store.dispatch("alerts/alert", {
                        text: "Verification done Successfully",
                        type: "success",
                    });
                    console.log("this.$store.state.student.reset_otp_verify",this.$store.state.student.reset_otp_verify)
                    this.$router.push({ path:"/student/reset_confirm"}); 
                    this.$store.dispatch("student/resetmsg");              
                    }
                  else
                    {
                    await this.$store.dispatch("alerts/alert", {
                        text: "OTP is wrong",
                        type: "error",
                    });
                    console.log("this.counts",this.counts)
                    if (this.counts==3)
                    {
                        this.$router.push({ path:"/student/corporate"});                 
                    }
                    this.$store.dispatch("student/resetmsg");
                    }
                }
              catch(error){
                console.log("herere")
                console.log("err",error)
                console.log("response", error.response)
                    await this.$store.dispatch("alerts/alert", {
                      text: "Something went wrong",
                      type: "error",
                    });
                  }
            }, 
            async cursor(){
            var container = document.getElementsByClassName("container")[0];
                  container.onkeyup = function(e) {
                      var target = e.srcElement || e.target;
                      var maxLength = parseInt(target.attributes["maxlength"].value, 10);
                      var myLength = target.value.length;
                      if (myLength >= maxLength) {
                          var next = target;
                          while (next = next.nextElementSibling) {
                              if (next == null)
                                  break;
                              if (next.tagName.toLowerCase() === "input") {
                                  next.focus();
                                  break;
                              }
                          }
                      }
                      else if (myLength === 0) {
                          var previous = target;
                          while (previous = previous.previousElementSibling) {
                              if (previous == null)
                                  break;
                              if (previous.tagName.toLowerCase() === "input") {
                                  previous.focus();
                                  break;
                              }
                          }
                      }
                  }
                  },  
            async onResend(){
            try{
                this.form.otp1="";
                this.form.otp2="";
                this.form.otp3="";
                this.form.otp4="";
                this.form.otp5="";
                this.form.otp6="";
                var count = this.countss;
                count ++;
                this.countss = count
                localStorage.setItem("submit2", JSON.stringify({countzz:this.countss,number:this.form.number}));
                const splits = this.form.number.replace(" ","")
                const splits1 = splits.replace(" ","")
                const splits2 = splits1.replace(" ","")
                  if(this.countss<=3){
                  await this.$store.dispatch('student/getResetOTP',{"number":splits2});
                    await this.$store.dispatch("alerts/alert", {
                        text: "OTP sent Successfully",
                        type: "success",
                    });
                  }
                    if (this.countss>=4)
                    {
                      this.$router.push({ path:"/student/resend_corporate"}); 
                    }
                    this.$store.dispatch("auth/resetmsg");
                    if (this.$store.state.student.error) 
                    {
                    await this.$store.dispatch("alerts/alert", {
                      text: this.$store.state.student.errorMsg,
                        type: "error",
                    });
                    if (this.countss>=4)
                    {
                      this.$router.push({ path:"/student/resend_corporate"}); 
                    }
                    this.$store.dispatch("auth/resetmsg");
                    }
                }
                catch(err){
                    await this.$store.dispatch("alerts/alert", {
                      text: "Something went wrong",
                      type: "error",
                    });
                  }
            },      
        },
         beforeDestroy () {
            clearTimeout(this.timeout)
            },
        mounted() {
            this.interval = setTimeout(() => {
                this.isOpen = true
                }, 60000)
                window.onpopstate = event => {
              this.$router.push({ path: '/user'}); 
          };
          this.countDownTimer()
          }, 
}
</script>