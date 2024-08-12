<template>
  <div>
    <div class="text-center uppercase font-serif text-3xl text-success">
      Welcome to Qspiders - Batch Timing Form
    </div>
    <div class="md:mx-48">
      <div class="container border border-gray-700 rounded-md m-2 bg-base-200 p-2">
        <validation-observer ref="observer" v-slot="{ handleSubmit }">
          <form
            @submit.stop.prevent="handleSubmit(addForm)"
            class="bg-base-200 p-4"
          >
            <div class="text-center">
              <div class="md:grid md:grid-cols-3 gap-4">
                <div class="">
                  <ValidationProvider rules="required|alpha_spaces" v-slot="{ errors }" slim>
                    <div class="form-control text-center input-error">
                      <label class="label text-center">
                        <span class="label-text ">Name</span>
                      </label> 
                      <input placeholder="Your Name" class="input" :class="errors[0] ? 'border-error' : 'border-base-300'" type="text" v-model="form.name">
                    </div>
                  </ValidationProvider>
                </div>
                <div class="">
                  <ValidationProvider rules="required|digits:10" v-slot="{ errors }" slim>
                    <div class="form-control text-center input-error">
                      <label class="label text-center mb-0">
                        <span class="label-text ">Whatsapp Number</span>
                      </label> 
                      <input placeholder="Your Whatsapp Number" class="input" :class="errors[0] ? 'border-error' : 'border-base-300'" type='tel' v-model="form.whatsapp">
                    </div>
                  </ValidationProvider>
                </div>
                <div class="">
                  <div class="grid grid-rows-2 grid-flow-col-1 gap-4 input-group-lg">
                    <div class="row-span-1">
                      <ValidationProvider rules="required" v-slot="{ errors }" slim>
                        <div class="form-control text-center input-error">
                          <!-- <label class="label text-center" for="html">
                            <span class="label-text text-xs ">Contact Number</span>
                          </label>  -->
                          <input placeholder="Your Contact Number" id="html" class="input md:input-sm" :class="errors[0] ? 'border-error' : 'border-base-300'" type='tel' v-model="form.contact" disabled>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-span-1">
                      <ValidationProvider rules="required" v-slot="{ errors }" slim>
                        <div class="form-control text-center input-error">
                          <!-- <label class="label text-center">
                            <span class="label-text ">Email Address</span>
                          </label>  -->
                          <input placeholder="Your Email ID" class="input md:input-sm" :class="errors[0] ? 'border-error' : 'border-base-300'" type="email" v-model="form.email" disabled>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>
                <div class="">
                  <ValidationProvider rules="required" v-slot="{ errors }" slim>
                    <label class="label text-center">
                      <span class="label-text ">Course</span>
                    </label>
                    <v-select
                      class="border border-gray-800 bg-base-100 text-gray-500 rounded-md w-full hover:border hover:border-gray-600"
                      :class="errors[0] ? 'border-error' : 'border-base-300'"
                      v-model="course" 
                      :options="courses"
                      :reduce="name => name.id"
                      label="name"
                      placeholder="Select Courses"
                      multiple
                    ></v-select>
                  </ValidationProvider>
                </div>
                <div class="" v-if="isOtherCourse">
                  <ValidationProvider rules="required" v-slot="{ errors }" slim>
                    <div class="form-control text-center input-error">
                      <label class="label text-center">
                        <span class="label-text ">Other Course</span>
                      </label> 
                      <input placeholder="Enter Course" class="input" :class="errors[0] ? 'border-error' : 'border-base-300'" type="text" v-model="form.ocourse">
                    </div>
                  </ValidationProvider>
                </div>
                <div class="">
                  <ValidationProvider rules="required" v-slot="{ errors }" slim>
                    <label class="label text-center">
                      <span class="label-text ">Category</span>
                    </label>
                    <v-select
                      class="border border-gray-800 bg-base-100 text-gray-500 rounded-md w-full hover:border hover:border-gray-600"
                      :class="errors[0] ? 'border-error' : 'border-base-300'"
                      v-model="category"
                      :options="categories"
                      :reduce="name => name.id" 
                      label="name"
                      placeholder="Select Categories"
                      multiple
                    ></v-select>
                  </ValidationProvider>
                </div>
                <div class="" v-if="isOtherCategory">
                  <ValidationProvider rules="required" v-slot="{ errors }" slim >
                    <div class="form-control text-center input-error">
                      <label class="label text-center">
                        <span class="label-text ">Other Category</span>
                      </label> 
                      {{errors[0]}}
                      <input placeholder="Enter Category" class="input" :class="errors[0] ? 'border-error' : 'border-base-300'" type="text" v-model="form.ocategory">
                    </div>
                  </ValidationProvider>
                </div>
                <div class="">
                  <ValidationProvider rules="required" v-slot="{ errors }" slim>
                    <label class="label text-center">
                      <span class="label-text text-center">For 2020/2021/2022 only- Graduation</span>
                    </label>
                    <v-select
                      class="border border-gray-800 bg-base-100 text-gray-500 rounded-md w-full hover:border hover:border-gray-600"
                      :class="errors[0] ? 'border-error' : 'border-base-300'"
                      v-model="graduation"
                      :options="graduations"
                      :reduce="name => name.id"
                      label="name"
                      placeholder="Select Graduation"
                      multiple
                    ></v-select>
                  </ValidationProvider>
                </div>
                <div class="" v-if="isOtherGraduation">
                  <ValidationProvider rules="required" v-slot="{ errors }" slim >
                    <div class="form-control text-center input-error">
                      <label class="label text-center">
                        <span class="label-text ">Other Graduation</span>
                      </label> 
                      <input placeholder="Enter Graduation" class="input" :class="errors[0] ? 'border-error' : 'border-base-300'" type="text" v-model="form.ograduation">
                    </div>
                  </ValidationProvider>
                </div>
              </div>
              <div class="md:grid md:grid-cols-4 gap-4 mt-10">
                <div class="">
                  <ValidationProvider rules="required" v-slot="{ errors }" slim>
                    <label class="label text-center">
                      <span class="label-text ">Stream</span>
                    </label>
                    <v-select
                      class="border border-gray-800 bg-base-100 text-gray-500 rounded-md w-full hover:border hover:border-gray-600"
                      :class="errors[0] ? 'border-error' : 'border-base-300'"
                      v-model="form.stream_id" 
                      :options="streams"
                      :reduce="name => name.id"
                      label="name"
                      placeholder="Select Stream"
                    ></v-select>
                  </ValidationProvider>
                </div>
                <div class="" v-if="form.stream_id == 140">
                  <ValidationProvider rules="required" v-slot="{ errors }" slim>
                    <div class="form-control text-center input-error">
                      <label class="label text-center">
                        <span class="label-text ">Other Stream</span>
                      </label> 
                      <input placeholder="Enter Stream" class="input" :class="errors[0] ? 'border-error' : 'border-base-300'" type="text" v-model="form.ostream">
                    </div>
                  </ValidationProvider>
                </div>
                <div class="">
                  <ValidationProvider rules="required" v-slot="{ errors }" slim>
                    <label class="label text-center">
                      <span class="label-text ">Session</span>
                    </label>
                    <v-select
                      class="border border-gray-800 bg-base-100 text-gray-500 rounded-md w-full hover:border hover:border-gray-600"
                      :class="errors[0] ? 'border-error' : 'border-base-300'"
                      v-model="form.session_id"
                      :options="sessions"
                      :reduce="name => name.id" 
                      label="name"
                      placeholder="Select Session"
                    ></v-select>
                  </ValidationProvider>
                </div>
                <div class="">
                  <ValidationProvider rules="required" v-slot="{ errors }" slim>
                    <label class="label text-center">
                      <span class="label-text ">Time of Class</span>
                    </label>
                    <v-select
                      class="border border-gray-800 bg-base-100 text-gray-500 rounded-md w-full hover:border hover:border-gray-600"
                      :class="errors[0] ? 'border-error' : 'border-base-300'"
                      v-model="time_slot" 
                      :options="timeclasses"
                      :reduce="name => name.id"
                      label="name"
                      placeholder="Select Time Slot"
                      multiple
                    ></v-select>
                  </ValidationProvider>
                </div>
                <div class="" v-if="isOtherTime">
                  <ValidationProvider rules="required" v-slot="{ errors }" slim>
                    <div class="form-control text-center input-error">
                      <label class="label text-center">
                        <span class="label-text ">Other Time-Slot</span>
                      </label> 
                      <input placeholder="Enter Time" class="input" :class="errors[0] ? 'border-error' : 'border-base-300'" type="text" v-model="form.otime">
                    </div>
                  </ValidationProvider>
                </div>
                <div class="">
                  <ValidationProvider rules="required" v-slot="{ errors }" slim>
                    <div>
                      <label class="label text-center">
                        <span class="label-text ">Mode of Class</span>
                      </label>
                      <v-select
                        class="border border-gray-800 bg-base-100 text-gray-500 rounded-md w-full hover:border hover:border-gray-600"
                        :class="errors[0] ? 'border-error' : 'border-base-300'"
                        v-model="form.interested_in_id"
                        :options="modeclasses"
                        :reduce="name => name.id" 
                        label="name"
                        placeholder="Select Mode of Class"
                      ></v-select>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="" v-if="form.interested_in_id == 2">
                  <ValidationProvider rules="required" v-slot="{ errors }" slim>
                    <div>
                      <label class="label text-center">
                        <span class="label-text ">Location</span>
                      </label>
                      <v-select
                        class="border border-gray-800 bg-base-100 text-gray-500 rounded-md w-full hover:border hover:border-gray-600"
                        :class="errors[0] ? 'border-error' : 'border-base-300'"
                        v-model="form.location" 
                        :options="cities"
                        :reduce="name => name.id"
                        label="name"
                        placeholder="Select Location"
                        multiple
                      ></v-select>
                    </div>
                  </ValidationProvider>
                </div>
              </div>
            </div>
            <div class="text-center mt-6">
              <button class="btn btn-outline btn-success btn-wide btn-sm uppercase">Submit</button>
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
  head() {
    return {
      title: "Batch Allocation Form | Online Student",
    };
  },
  data(){
    return{
      form:{
        batch_id:""
      },
      courses : [],
      course : [],
      categories : [],
      category : [],
      graduations : [],
      graduation : [],
      streams : [],
      sessions : [],
      timeclasses : [],
      time_slot : [],
      modeclasses : [],
      cities : [],
      isOtherCourse : false,
      isOtherCategory : false,
      isOtherGraduation : false,
      isOtherTime : false
    }
  },
  async fetch(){
    this.form.batch_id = JSON.parse(localStorage.getItem("batchcode"))
    let student = JSON.parse(localStorage.getItem('userdetail'))
    this.form.contact = student.username[0].number[0].number
    this.form.email = student.username[0].email[0].email
    let courses = await this.$axios.get('student/enquiry-courses/?per_page=200');
    this.courses = courses.data.results
    let categories = await this.$axios.get('student/categories/?per_page=200');
    this.categories = categories.data.results
    let graduation = await this.$axios.get('commons/degree/?per_page=200&types__name=Form');
    this.graduations = graduation.data.results
    let streams = await this.$axios.get('commons/stream/?per_page=200&types__name=Form');
    this.streams = streams.data.results
    let sessions = await this.$axios.get('commons/session/?per_page=200');
    this.sessions = sessions.data.results
    let timeclasses = await this.$axios.get('student/time-of-class/?per_page=200');
    this.timeclasses = timeclasses.data.results
    let modeclasses = await this.$axios.get('student/mode-of-interest/?per_page=200');
    this.modeclasses = modeclasses.data.results
    let cities = await this.$axios.get('student/location/?per_page=200');
    this.cities = cities.data.results
  },
  methods : {
    async addForm(){
      if (this.course){
        this.form.course = this.course
      }
      if (this.category){
        this.form.category = this.category
      }
      if (this.graduation){
        this.form.graduation = this.graduation
      }
      if (this.time_slot){
        this.form.time_slot = this.time_slot
      }
      if (this.form.stream_id != 140){
        this.form.ostream = null
      }
      if(this.form.batch_id){
        this.form.batch_id = this.form.batch_id
      }
      else{
        this.form.batch_id = ""
      }
      let data = await this.$axios.post('student/student-form/', this.form);
      if (data.status == 200){
        await this.$store.dispatch("alerts/alert", {
          text: data.data.message,
          type: "success",
        });
        this.$store.dispatch("student/resetmsg");
        localStorage.removeItem("batchcode");
        this.$router.push({ path: "/student" });
      }
      else{
        await this.$store.dispatch("alerts/alert", {
          text: data.data.message,
          type: "error",
        });
        this.$store.dispatch("student/resetmsg");
      }
    }
  },
  watch: {
    course : function (val, val1){
      if (val.includes(9)){
        this.isOtherCourse = true
      }
      else{
        this.isOtherCourse = false
        this.form.ocourse = null
      }
    },
    category : function (val, val1){
      if (val.includes(6)){
        this.isOtherCategory = true
      }
      else{
        this.isOtherCategory = false
        this.form.ocategory = null
      }
    },
    graduation : function (val, val1){
      if (val.includes(22)){
        this.isOtherGraduation = true
      }
      else{
        this.isOtherGraduation = false
        this.form.ograduation = null
      }
    },
    time_slot : function (val, val1){
      if (val.includes(4)){
        this.isOtherTime = true
      }
      else{
        this.isOtherTime = false  
        this.form.otime = null
      }
    }
  },

}
</script>

<style>

</style>