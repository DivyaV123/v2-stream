<template>
    <div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
   	<div class="absolute bg-white opacity-80 inset-0 z-0"></div>
    <div class="hello max-w-6xl h-screen z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-700 modal-card-body">
    <div class="hello max-w-6xl h-21 z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg">
    <div class="p-3  mt-2 text-center space-x-4 ">
            <div v-if="cancelot==true" class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
                  <div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
                  <div class=" max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900 modal-card-body">
                  <div class="hello max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg ">
                  <p class="text-white">Are you sure you want to Exit?</p>
                          <div class="flex justify-end pt-2">
                            <button
                              @click="cancelot = false"
                              class="
                                px-6
                                py-3
                                bg-transparent
                                p-3
                                rounded-full
                                text-red-500
                                hover:bg-gray-100
                                hover:text-red-500
                                mr-2
                              "
                            >
                              Cancel
                            </button>
                            <button
                              @click="closebutton3()"
                              class="
                                px-6
                                py-3
                                bg-red-600
                                rounded-full
                                text-black-500
                                font-medium
                                tracking-wide
                                hover:bg-red-500
                              "
                            >
                            Exit
                            </button>
                      </div>
                      </div>
                      </div>
              </div> 
              <validation-observer ref="observer" v-slot="{ handleSubmit }">
              <form @submit.stop.prevent="handleSubmit(Otherssubmit)">
              <div class="flex justify-right items-right pb-3">
                  <div
                    class="modal-close cursor-pointer z-50"
                    v-on:click="cancelot=true"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </div>
              </div>
              <div class="modal-card pb-4" style="width: auto">
                <ul class="w-full steps">
                  <li data-content="✓" class="step step-success text-white">Personal details</li> 
                  <li data-content="✓" class="step step-accent text-white">Educational details</li> 
                  <li data-content="✕" class="step step-info text-white">Other details</li> 
                </ul>
              </div>
              <section class="px-1 py-1 pt-4">
                  <div class="grid md:grid-cols-4 sm:grid-cols-1 gap-4 m-5">
                         <div class="border border-info  px-2  flex flex-wrap pt-3">
                          <div>
                            <label for="country" class="block text-sm font-extrabold pb-1 text-white">Ready to relocate?</label>
                          </div>
                          <ValidationProvider rules="required" v-slot="{ errors }" slim> 
                          <div>
                              <label class="cursor-pointer label" for="yes">
                                <span class="label-text font-extrabold">Yes</span> 
                                <input type="radio"
                                      id="yes"
                                      name="relocate"
                                      :value="true"
                                      :native-value="true"
                                      v-model="form.relocate" class="pl-4 radio radio-info radio-sm">
                              </label>
                              <label class="cursor-pointer label" for="no">
                                <span class="label-text font-extrabold">No</span> 
                                <input type="radio"
                                      id="no"
                                      name="relocate"
                                      :value="false"
                                      :native-value="false"
                                      v-model="form.relocate" class="pl-4 radio radio-info radio-sm">
                              </label> 
                          </div> 
                          <span class="text-warning">{{ errors[0] }}</span>
                          </ValidationProvider> 
                        </div>
                        <div  v-if ="form.relocate==true" > 
                    <div class="border border-info pt-3 pr-4 pl-4 pb-6">
                      <label for="country" class="block text-sm font-extrabold text-blue-5000 text-white">Location</label>
                      <ValidationProvider
                          rules="required" v-slot="{ errors }"
                      > 
                        <span
                        class="
                            z-10
                            h-full
                            leading-snug
                            font-normal
                            text-center
                            absolute
                            bg-transparent
                            rounded
                            text-base
                            pr-2
                            py-2
                        "
                        >
                        </span>
                        <v-select
                            class="border border-info text-sm text-white"
                            label="name"
                            v-model="location"
                            :options="$store.state.student.city"
                            :reduce="name => name.id"
                            placeholder="Select location"
                            multiple
                        ></v-select>
                        <span class="text-warning">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div v-if="otherLocation">
                    <div >
                      <div class="form-control pt-2 pb-10 border border-info " > 
                        <label for="country" class="block text-sm font-extrabold pb-1 pr-20 text-white">Other Location</label> 
                        <input type="text" name="email" id="email" v-model="form.olocation" placeholder="Enter location" :maxlength="30" class="input input-sm bg-bg-transparent  text-white input-bordered bg-gray-700 placeholder-white ">
                      </div>
                    </div>
                  </div> 
                           <div class="border border-info  px-2  flex flex-wrap pt-3">
                            <div>
                                <label for="country" class="block text-sm font-extrabold pb-1 text-white">Do you have passport?</label>
                            </div>
                            <ValidationProvider rules="required" v-slot="{ errors }" slim> 
                            <div>
                                <label class="cursor-pointer label" for="yes">
                                  <span class="label-text font-extrabold">Yes</span> 
                                  <input type="radio"
                                        id="yes"
                                        name="passport"
                                        :value="true"
                                        :native-value="true"
                                        v-model="form.passport" class="pl-4 radio radio-info radio-sm">
                                </label>
                                <label class="cursor-pointer label" for="no">
                                  <span class="label-text font-extrabold">No</span> 
                                  <input type="radio"
                                        id="no"
                                        name="passport"
                                        :value="false"
                                        :native-value="false"
                                        v-model="form.passport" class="pl-4 radio radio-info radio-sm">
                                </label> 
                              </div> 
                              <span class="text-warning">{{ errors[0] }}</span>
                            </ValidationProvider> 
                          </div>
                          <div v-if="$store.state.student.fresh_exp.student!=2" class="border border-info  px-2  flex flex-wrap pt-3">
                                  <div>
                                        <label for="country" class="block text-sm font-extrabold pb-1 text-white">Do you have pancard?</label>
                                  </div>
                                <ValidationProvider rules="required" v-slot="{ errors }" slim> 
                                  <div>
                                    <label class="cursor-pointer label" for="yes">
                                      <span class="label-text font-extrabold">Yes</span> 
                                      <input type="radio"
                                            id="yes"
                                            name="pan_card"
                                            :value="true"
                                            :native-value="true"
                                            v-model="form.pan_card" class="pl-4 radio radio-info radio-sm">
                                    </label>
                                    <label class="cursor-pointer label" for="no">
                                      <span class="label-text font-extrabold">No</span> 
                                      <input type="radio"
                                            id="no"
                                            name="pan_card"
                                            :value="false"
                                            :native-value="false"
                                            v-model="form.pan_card" class="pl-4 radio radio-info radio-sm">
                                    </label> 
                                  </div> 
                                  <span class="text-warning">{{ errors[0] }}</span>
                                  </ValidationProvider> 
                          </div>  

                          <div v-if="$store.state.student.fresh_exp.student!=2" class="border border-info  px-2  flex flex-wrap pt-3">
                                <div>
                                      <label for="country" class="block text-sm font-extrabold pb-1 text-white">Do you have aadharcard?</label>
                                </div>
                                <ValidationProvider rules="required" v-slot="{ errors }" slim> 
                                  <div>
                                    <label class="cursor-pointer label" for="yes">
                                      <span class="label-text font-extrabold">Yes</span> 
                                      <input type="radio"
                                            id="yes"
                                            name="aadhar"
                                            :value="true"
                                            :native-value="true"
                                            v-model="form.aadhar" class="pl-4 radio radio-info radio-sm">
                                    </label>
                                    <label class="cursor-pointer label" for="no">
                                      <span class="label-text font-extrabold">No</span> 
                                      <input type="radio"
                                            id="no"
                                            name="aadhar"
                                            :value="false"
                                            :native-value="false"
                                            v-model="form.aadhar" class="pl-4 radio radio-info radio-sm">
                                    </label> 
                                  </div> 
                                  <span class="text-warning">{{ errors[0] }}</span>
                                </ValidationProvider> 
                            </div>
                           <div class="border border-info pb-4 pl-4 pr-4">
                                  <label for="country" class="block text-sm font-extrabold pb-1 pr-20 text-white">Address</label>
                            <ValidationProvider rules="required" v-slot="{ errors }"> 
                                <div class="mt-1 relative rounded-md shadow-sm ">
                                  <textarea id="" cols="30" rows="5" v-model="form.address" :maxlength="150" class="mt-1 
                                                                                                   block 
                                                                                                   w-full 
                                                                                                   shadow-sm 
                                                                                                   sm:text-sm rounded-md leading-5 pl-6 pt-2  text-black" placeholder="Enter address" ></textarea>
                                  </div>               
                                <span class="text-warning">{{ errors[0] }}</span>
                            </ValidationProvider> 
                          </div>
                          <div class="border border-info pt-2 pl-4 pr-4 pb-2">
                            <label for="country" class="block text-sm font-extrabold pb-1 pr-20 text-white">Streat/Area</label>
                                <ValidationProvider rules="required" v-slot="{ errors }"> 
                                    <div class="form-control pt-2">
                                        <input type="text" placeholder="Enter here" v-model="form.street" :maxlength="100" class="input input-sm 
                                                                                                                bg-gray-700  
                                                                                                                text-white 
                                                                                                                input-bordered 
                                                                                                                placeholder-white">
                                    </div>               
                                    <span class="text-warning">{{ errors[0] }}</span>
                                </ValidationProvider> 
                          </div>
                          <div class="border border-info pt-2 pl-4 pr-4">
                            <label for="country" class="block text-sm font-extrabold pb-1 pr-20 text-white">City</label>
                                <ValidationProvider rules="required" v-slot="{ errors }">
                                    <div class="form-control pt-2 pb-4">
                                        <input type="text" name="email" id="email" v-model="form.city" :maxlength="50" placeholder="Enter City" class="input input-sm 
                                                                                                                                       bg-bg-transparent  
                                                                                                                                       text-white 
                                                                                                                                       input-bordered 
                                                                                                                                       bg-gray-700 
                                                                                                                                       placeholder-white 
                                                                                                                                       border border-info">
                                    </div>               
                                    <span class="text-warning mb-10">{{ errors[0] }}</span>
                                </ValidationProvider>  
                            </div>
                            <div class="border border-info pt-3 pr-4 pl-4 pb-6">
                                <label for="country" class="block text-sm font-extrabold text-blue-5000 text-white">State</label>
                                    <ValidationProvider
                                        rules="required" v-slot="{ errors }"
                                    > 
                                        <span
                                        class="
                                            z-10
                                            h-full
                                            leading-snug
                                            font-normal
                                            text-center
                                            absolute
                                            bg-transparent
                                            rounded
                                            text-base
                                            pr-2
                                            py-2
                                        "
                                        >
                                        </span>
                                        <v-select
                                            class="border border-info text-sm text-white"
                                            label="name"
                                            v-model="form.state_id"
                                            :options="$store.state.student.states"
                                            :reduce="name => name.id"
                                            placeholder="Select State"
                                        ></v-select>
                                        <span class="text-warning">{{ errors[0] }}</span>
                                    </ValidationProvider> 
                                </div> 
                                <div  class="border border-info pt-3 pr-4 pl-4 pb-6">
                                <label for="country" class="block text-sm font-extrabold text-blue-5000 text-white">Certificate</label>
                                        <span
                                        class="
                                            z-10
                                            h-full
                                            leading-snug
                                            font-normal
                                            text-center
                                            absolute
                                            bg-transparent
                                            rounded
                                            text-base
                                            pr-2
                                            py-2
                                        "
                                        >
                                        </span>
                                        <v-select
                                            class="border border-info text-sm text-white"
                                            label="name"
                                            v-model="form.certificate"
                                            :options="$store.state.student.certificate"
                                            :reduce="name => name.id"
                                            placeholder="Select certificate"
                                            multiple
                                        ></v-select>
                                </div>
                                  <div>
                                    <div v-for="reason in form.certificate" :key="reason" :value="reason.id"  >
                                              <div v-if="reason==12" class="form-control pt-2 pb-10 border border-info " > 
                                                <label for="country" class="block text-sm font-extrabold pb-1 pr-20 text-white">Other Certificate</label> 
                                                  <input type="text" name="email" id="email" v-model="form.ocertificate" :maxlength="50" placeholder="Enter Certificate" class="input input-sm bg-bg-transparent  text-white input-bordered bg-gray-700 placeholder-white ">
                                              </div>               
                                      </div>
                                  </div>
                               </div>
            </section>          
             <br>
                 <div class="mt-4 ml-12 mr-6">
                    <div class="px-4 py-3 text-right sm:px-6 ml-10 mr-5">
                      <button type="submit" class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-extrabold rounded-md text-black bg-info hover:bg-info">
                        Submit
                      </button>
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

import vSelect from "vue-select";

export default {
  middleware: ["authenticated","is_student"],
  components: { "v-select": vSelect},
  data() {
       return{
         form:{
             
            },
            cancelot : false,
            showother : false,
            dipinfoo:{
              other_stream:false,
              other_college:false
            },
            degreeeinfo:{
              other_stream:false,
              other_college:false
            },
            mastersinfo:{
              other_stream:false,
              other_college:false   
            },
            images:null,
            astate:null,
            bstate:null,
            students:[],
            mobileErrors: "",
            mobileErrors1:"",
            mobileErrors2:"",
            inputOptions: {
            autocomplete: "off",
            required: true,
            placeholder: "Enter a phone number",
            styleClasses:
                "py-2 placeholder-gray-500 text-gray-800 relative bg-white rounded text-sm border border-red-500 outline-none focus:outline-none focus:ring w-full",
            },
            student:{},
            radio:"",
            years: [...Array(30)].map((a, b) => new Date().getFullYear() - b),
            otherLocation : false,
            location : []
       }
  },
  async fetch() {
    this.form.name = this.$store.state.auth.firstname
    await this.$store.dispatch("title", "QSAAS Student Profile");
    await this.$store.dispatch('student/getFreshExp')  
    await this.$store.dispatch('student/getCity')
    await this.$store.dispatch('student/getCertificate')
    await this.$store.dispatch('student/getStates')
    await this.$store.dispatch('student/getHighestdegree')
    await this.$store.dispatch('student/getDegree')  
    await this.$store.dispatch('student/getStream')
    await this.$store.dispatch('student/getCollege')   
  },
  
  methods:{
 
      async closebutton3(){
          location.reload();
        },
      async Otherssubmit(){
          if(this.form.certificate){
          var datas = this.form.certificate
            var names =  datas.indexOf(12);
            if(names==-1){
              this.form.ocertificate=null
            }
          } 
          if(this.form.relocate==false){
            this.form.location=null
            this.location = []
          }
          // if(this.form.location){
          //   var datass = this.form.location
          //   var namess =  datass.indexOf(10);
          //   if(namess==-1){
          //     this.form.olocation=null
          //   }
          // }
          if (this.location){
            this.form.location = this.location
          }
          try{
          await this.$store.dispatch('student/getOthersInfo', this.form);
          if (this.$store.state.student.others_info){

            await this.$store.dispatch("alerts/alert", {
                      text: "Successfully added Others Information",
                      type: "success",
                    });
            this.$store.dispatch("student/resetmsg");
            location.reload();
            this.$router.push({ path: "/student/profile" });
          }
          if (this.$store.state.student.others_info.status==200)
          {
              const userData = JSON.parse(localStorage.getItem("user"));
              userData.profile.profile = 1
              localStorage.setItem("user", JSON.stringify(userData));
              const userDatass = JSON.parse(localStorage.getItem("user"));
            }
          if (this.$store.state.student.error)
          {
                  await this.$store.dispatch("alerts/alert", {
                      text: this.$store.state.student.errorMsg,
                      type: "error",
                });
                this.$store.dispatch("student/resetmsg");
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
  watch:{
    location : function (val, val1){
      if (val.includes(10)){
        this.otherLocation = true
      }
      else{
        this.otherLocation = false
        this.form.olocation = null
      }
    },
  }

}
</script>



<style >
.hello{
  width:100%
}
.modal-card-body{
 overflow-y: auto;
}
.v-select .vs__selected{
  background-color:white !important; 

}
/* .vs__open-indicator,
.vs__clear {
  fill: hsla(var(--bc) / var(--tw-text-opacity, 1));
} */
textarea { resize: none; }

</style>