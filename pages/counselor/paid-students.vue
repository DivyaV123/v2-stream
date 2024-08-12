<template>
<section class="mr-4">
<div class="mt-1 mx-1">
<div class="flex flex-col">
<div  class="align-middle inline-block shadow sm:rounded-lg">
  <div class="text-center uppercase font-serif text-3xl text-success mb-2">
      Batch Allocation Paid Students List
    </div>
<div class="text-right mt-0 mr-2 ml-0 px-1 py-1 mb-1">
  <button @click="isSearch = !isSearch" class="btn btn-outline btn-sm btn-success ">Search</button>
</div>
    <div v-if="isSearch">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <form action="#" method="POST" @submit.stop.prevent="handleSubmit(searchParams)">
        <div class="p-5 card bg-base-200">
          <div class="grid md:grid-cols-6 sm:grid-cols-2 gap-5 mt-0 ml-2">
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Student Name</span>
              </label> 
              <input placeholder="Student Name Here" class="input input-bordered input-sm" type="text" v-model="selected_name">
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Contact Number</span>
              </label> 
              <input placeholder="Contact Number Here" class="input input-bordered input-sm" type="tel" v-model="selected_number">
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Email Address</span>
              </label>
              <input placeholder="Email Address Here" class="input input-bordered input-sm" type="text" v-model="selected_email">
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs">Courses</span>
              </label> 
              <select class="select select-bordered w-full max-w-xs text-white select-sm" v-model="selected_course" >
                <option disabled="" selected="">Choose Courses</option> 
                <option v-for="(number, i) in courses" :key="i" :value="number.id" >{{number.name}}</option> 
              </select>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs">Category</span>
              </label> 
              <select class="select select-bordered w-full max-w-xs text-white select-sm" v-model="selected_category" >
                <option disabled="" selected="">Choose Category</option> 
                <option v-for="(number, i) in category" :key="i" :value="number.id" >{{number.name}}</option> 
              </select>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs">Graduation</span>
              </label> 
              <select class="select select-bordered w-full max-w-xs text-white select-sm" v-model="selected_graduation" >
                <option disabled="" selected="">Choose Graduation</option> 
                <option v-for="(number, i) in graduation" :key="i" :value="number.id" >{{number.name}}</option> 
              </select>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs">Stream</span>
              </label> 
              <select class="select select-bordered w-full max-w-xs text-white select-sm" v-model="selected_stream" >
                <option disabled="" selected="">Choose Stream</option> 
                <option v-for="(number, i) in streams" :key="i" :value="number.id" >{{number.name}}</option> 
              </select>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs">Session</span>
              </label> 
              <select class="select select-bordered w-full max-w-xs text-white select-sm" v-model="selected_session" >
                <option disabled="" selected="">Choose Session</option> 
                <option v-for="(number, i) in session" :key="i" :value="number.id" >{{number.name}}</option> 
              </select>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs">Time Slot</span>
              </label> 
              <select class="select select-bordered w-full max-w-xs text-white select-sm" v-model="selected_time" >
                <option disabled="" selected="">Choose Time Slot</option> 
                <option v-for="(number, i) in time_class" :key="i" :value="number.id" >{{number.name}}</option> 
              </select>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs">Interested In</span>
              </label> 
              <select class="select select-bordered w-full max-w-xs text-white select-sm" v-model="selected_interested" >
                <option disabled="" selected="">Choose Mode of Interest</option> 
                <option v-for="(number, i) in modeclasses" :key="i" :value="number.id" >{{number.name}}</option> 
              </select>
            </div>
            <div class="form-control">
              <date-picker
                  append-to-body
                  :editable="false"
                  :default-value="new Date()"
                  v-model="date_selected"
                  placeholder="From Date"
              ></date-picker>
              <date-picker
              class="mt-2"
                  append-to-body
                  :editable="false"
                  :default-value="new Date()"
                  v-model="date_selected2"
                  placeholder="To Date"
              ></date-picker>
            </div>
            <div class="justify-self-right" >
              <button class="btn btn-outline btn-success btn-sm" @click="searchParams()">
                Search
              </button>
              <button class="btn btn-outline btn-goast btn-sm"  @click="clearSearchParams()">
                Clear
              </button>
            </div>
          </div>
        </div>
        </form>
      </validation-observer>
    </div>
</div>
</div>
<div
    v-if="$fetchState.pending"
    class="flex h-screen items-center justify-center"
  >
    <div
      class="
        w-40
        h-40
        border-t-4 border-b-4 border-yellow-750
        rounded-full
        animate-spin
        m-auto
      "
    ></div>
  </div>
  <div v-else>
  <table class="w-full table-auto mt-5 table-compact table-zebra">
  <thead>
    <tr>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-xs">Details</th>
      <!-- <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-xs">Whatsapp</th> -->
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-xs">Course - Other Course</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-xs">Category - Other Category</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-xs">Graduation - Other Graduation</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-xs">Stream - Other Stream</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-xs">Session</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-xs">Time Slot - Other Time Slot</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-xs">Interested In</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-xs">Location</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-xs">Batches</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-xs">Batches Attended</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-xs">Attended Date</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-xs">Registered Date</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-xs">Comment</th>

    </tr>
  </thead>
  <tbody class="bg-gray-900 border border-gray-100 text-center">
    <tr v-for="(bran, index) in batches" :key="index" class="border border-accent"> 
      <td class="border  
          border-gray-100
          font-semibold 
          text-blue-200
          text-sm">
        <span class="uppercase font-mono ml-1">{{ bran.name }}</span> <br>
        <span class="text-gray-300 ml-1">{{ bran.email }}</span> <br>
        <span class="text-green-300 ml-1">{{ bran.contact }}</span> <br>
        <span>WhatsApp :</span> <span class="text-green-300 ml-1">{{bran.whatsapp}}</span> <br>
        <span>Batch Form added on :</span> <span class="text-warning ml-1">{{bran.created}}</span>

      </td>
      <td class="  
          font-semibold 
          text-warning
          text-sm
          border  
          border-gray-100">  
        <div class="inline-flex" >
          {{bran.course}}
        </div>
        <br>
        <span v-if="bran.ocourse" class="text-center">
          <button class="btn btn-success btn-xs text-black">{{bran.ocourse}}</button> 
        </span>
      </td>
     <td class="
        font-semibold 
        text-info
        text-sm
        border  
          border-gray-100">
        <span class="inline-flex">
          {{bran.category}} 
        </span>
        <br>
        <span v-if="bran.ocategory" class="text-center">
          <button class="btn btn-success btn-xs text-black">{{bran.ocategory}}</button> 
        </span>  
      </td>
      <td class=" 
        font-semibold 
        text-warning
        text-sm
        border  
          border-gray-100">
        <span class="inline-flex">
            {{bran.graduation}} 
        </span>
        <br>
        <span v-if="bran.ograduation" class="text-center">
          <button class="btn btn-success btn-xs text-black">{{bran.ograduation}}</button> 
        </span> 
      </td>
      <td class="border  
          border-gray-100  
        font-semibold 
        text-info
        text-sm">
          <span class="inline-flex">
            {{bran.stream.name}} 
        </span>
        <br>
        <span v-if="bran.ostream" class="text-center">
          <button class="btn btn-success btn-xs text-black">{{bran.ostream}}</button> 
        </span> 
      </td>
      <td class="border  
          border-gray-100 
              font-semibold 
              text-warning 
              text-sm">
              {{bran.session.name}}
          <!-- <button class="btn btn-warning btn-xs text-black">{{bran.session.name}}</button>  -->
              
      </td>
      <td class="
        font-semibold 
        text-info
        text-sm
        border  
          border-gray-100">
         <span class="inline-flex">
            {{bran.time_slot}} 
        </span>
        <br>
        <span v-if="bran.otime" class="text-center">
          <button class="btn btn-success btn-xs text-black">{{bran.otime}}</button> 
        </span> 
      </td>
      <td class="border  
          border-gray-100 
              font-semibold 
              text-green-400 
              text-sm">
              {{bran.interested_in.name}}
      </td>
      <td class=" 
      border  
          border-gray-100
              font-semibold 
              text-warning 
              text-sm">
        <span class="inline-flex">
          {{bran.location}} 
        </span>
      </td>
      <td class=" 
      border  
          border-gray-100
              font-semibold 
              text-info 
              text-sm">
        <span class="inline-flex">
          {{bran.batches}} 
        </span>
      </td>
      <td class=" 
      border  
          border-gray-100
              font-semibold 
              text-info 
              text-sm">
        <span class="inline-flex">
          {{bran.classcount}} 
        </span>
      </td>
      <td class=" 
      border  
          border-gray-100
              font-semibold 
              text-info 
              text-sm">
        <span class="inline-flex">
          {{bran.career}} 
        </span>
      </td>
      <td class=" 
      border  
          border-gray-100
              font-semibold 
              text-info 
              text-sm">
        <span class="inline-flex">
          {{bran.registered}} 
        </span>
      </td>
     <td class="border  
          border-gray-100  
                   text-center 
                   font-semibold 
                   text-blue-400">
          <button class="inline-flex 
                         justify-center 
                         py-1 
                         px-15
                         border border-black  
                         shadow-sm 
                         text-xs 
                         btn-sm
                         font-extrabold 
                         rounded-md 
                         btn-error
                         text-white
                         " v-on:click="updatee=true,id1=bran.id">Add</button> <br>
          <button class="inline-flex 
          justify-center 
          py-1 
          px-15
          border border-black  
          shadow-sm 
          text-xs 
          btn-sm
          font-extrabold 
          rounded-md 
          btn-success
          text-white
          " @click="showHistory(bran.alldata)" v-if="bran.alldata.length > 0">History</button>
        </td>
  </tr>
  </tbody>  
   <div v-if="updatee==true" class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
            <div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
            <div class="flex justify-center max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900">
            <div class="max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg ">
                  <div class="flex justify-center pt-2">
                  <validation-observer ref="observer" v-slot="{ handleSubmit }">
                    <form @submit.stop.prevent="handleSubmit(confirmClose)">
                      <div class="border border-white pt-3 pr-4 pl-4 pb-6">
                          <label for="country" class="block text-sm font-extrabold text-blue-5000">Status</label>
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
                                      class="border border-white text-sm selected text-white selected"
                                      label="name"
                                      v-model="reason"
                                      :options="reasons"
                                      :reduce="name => name.id"
                                      placeholder="Select Status"
                                  ></v-select>
                              <span class="text-white">{{ errors[0] }}</span>
                              </ValidationProvider> 

                          </div>
                          <div class="border border-white pb-4 pl-4 pr-4">
                          <label for="country" class="block text-sm font-extrabold pb-1 pr-20 text-white">Comment</label>
                          <ValidationProvider rules="required" v-slot="{ errors }"> 
                                <div class="mt-1 relative rounded-md shadow-sm ">
                                <textarea id="" cols="30" rows="5" v-model="comment" class="mt-1 block w-full shadow-sm sm:text-sm rounded-md leading-5 pl-6 pt-2  text-black" placeholder="Enter comment" ></textarea>
                                </div>   
                                <span class="text-white">{{ errors[0] }}</span>
                          </ValidationProvider>             
                          </div>  
                                <br>
                            <button
                              @click="updatee = false"
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
                            type="submit"
                              class="
                                px-6
                                py-3
                                bg-red-600
                                rounded-full
                                text-black-500
                                font-medium
                                tracking-wide
                                hover:bg-red-500
                              ">
                            Update
                            </button>
                          </form>
                    </validation-observer>
                  </div>
            </div>
          </div>
        </div>
    
</table>
 <Pagination
          class="flex justify-center"
          :total="total"
          :page="page"
          @pageChange="onPageChange"
        />
  </div>
  <History v-if="isOpen" :comments=comments />
</div>
</section>
</template>

<script>
var dayjs = require("dayjs");
export default {
  head() {
      return {
          title: "Batch Allocation List | Corporate",
      };
  },
  middleware: ["authenticated","is_counselor"],
  name: 'HomePage',
  data(){
      return{
        comment:"",
        reason:null,
        unstar: false,
        updatee:false,
        id:null,
        id1:null,
        page: 1,
        search:{},
        params: "",
        total:0,
        isSearch:false,
        date:{
        date: null,
        },
        cancelpp:false,
        closebatch:false,
        isOpen : false,
        comments : [],
        courses : [],
        selected_name: "",
        selected_number : "",
        selected_email : "",
        selected_course : 0,
        category : [],
        graduation : [],
        streams :[],
        session : [],
        time_class : [],
        modeclasses : [],
        selected_category: "",
        selected_graduation : "",
        selected_stream : "",
        selected_session : "",
        selected_time: "",
        selected_interested : "",
        date_selected : null,
        date_selected2 : null,
        reasons : []
      }
  }, 
    async fetch(){
    let courses = await this.$axios.get('student/enquiry-courses/?per_page=200');
    this.courses = courses.data.results
    let categories = await this.$axios.get('student/categories/?per_page=200');
    this.category = categories.data.results
    let graduation = await this.$axios.get('commons/degree/?per_page=200&types__name=Form');
    this.graduation = graduation.data.results
    let streams = await this.$axios.get('commons/stream/?per_page=200&types__name=Form');
    this.streams = streams.data.results
    let sessions = await this.$axios.get('commons/session/?per_page=200');
    this.session = sessions.data.results
    let timeclasses = await this.$axios.get('student/time-of-class/?per_page=200');
    this.time_class = timeclasses.data.results
    let modeclasses = await this.$axios.get('student/mode-of-interest/?per_page=200');
    this.modeclasses = modeclasses.data.results
    let reasons = await this.$axios.get('student/form-reason/?per_page=200');
    this.reasons = reasons.data.results
    await this.$store.dispatch('student/getEnquiryForm',{"page":this.page,"params":this.params})
    await this.$store.dispatch('student/getFormReason')
    let date = dayjs(new Date()).format("YYYY-MM-DD")
    this.total = this.$store.state.student.enquiry_form_list.total
    if (this.date_selected == null & this.batch_selected == null)
    {
      this.date.date= dayjs(new Date()).format("YYYY-MM-DD")
      this.params = new URLSearchParams(this.date).toString();
    }
    else
    {
      this.searchParams()
    }     
  },
 computed: {
    batches() 
    {
      return this.$store.state.student.enquiry_form_list.results
    }, 
  },
   methods:{
        async confirmClose(){
          this.closebatch = false;
          await this.$store.dispatch('student/getUpdate',{"id":this.id1,"comment":this.comment, "status" : this.reason });
          await this.$store.dispatch("alerts/alert", {
              text: "Successfully Updated the student",
              type: "success",
            });
            this.$store.dispatch("auth/resetmsg");
            location.reload();
            // this.$fetch()
        },
        searchParams(){
          if(this.selected_name){
            this.search.name = this.selected_name
          }
          if(this.selected_email){
            this.search.email = this.selected_email
          }
          if(this.selected_number){
            this.search.number = this.selected_number
          }
          if(this.selected_course)
          {
            this.search.course = this.selected_course
          }
          if(this.selected_category)
          {
            this.search.category = this.selected_category
          }
          if(this.selected_graduation)
          {
            this.search.graduation = this.selected_graduation
          }
          if(this.selected_stream)
          {
            this.search.stream = this.selected_stream
          }
          if(this.selected_session)
          {
            this.search.session = this.selected_session
          }
          if(this.selected_time)
          {
            this.search.time_slot = this.selected_time
          }
          if(this.selected_interested)
          {
            this.search.interested_in = this.selected_interested
          }
          if (this.date_selected){
            this.search.created_after = dayjs(this.date_selected).format("YYYY-MM-DD")
          }
          if (this.date_selected2){ 
            this.search.created_before = dayjs(this.date_selected2).format("YYYY-MM-DD")
          }
          else{
            this.search.created_before = dayjs(new Date()).format("YYYY-MM-DD")
          }
          this.params = new URLSearchParams(this.search).toString();
          this.$fetch()
        },
        clearSearchParams(){
          this.search = {}
          this.params = ""
          this.selected_name=null
          this.selected_email = null
          this.selected_number=null
          this.selected_course = null
          this.selected_category=null
          this.selected_graduation = null
          this.selected_stream=null
          this.selected_session = null
          this.selected_time=null
          this.selected_interested = null
          this.date_selected=null
          this.date_selected2 = null
          
          this.$fetch()
        },
        onPageChange(page) {
          this.page = page;
          this.$fetch();
        },
        showHistory(comments){
          console.log("hererer")
          this.isOpen = true
          this.comments = comments
        }
  },
}
</script>
<style lang="postcss" scoped>
.badge {
  @apply inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700;
  &:hover {
    @apply bg-gray-300;
  }
}
.tooltip7 {
  @apply invisible absolute;
}
.has-tooltip7:hover .tooltip7 {
  @apply visible z-50;
}
.v-select .vs__selected{
  background-color:white !important; 
  color:black !important; 

}
</style>