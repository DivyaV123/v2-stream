<template>
  <section class="mr-4">
    <div class="mt-1 mx-1">
      <div class="flex flex-col">
        <div
          class="
          align-middle
          inline-block
          shadow
          sm:rounded-lg
          "
        >
        <div class="container flex">
        <div class="w-full p-2 m-2 bg-gray-700 rounded flex justify-left ">
            <ol class="flex text-gray-800">
              <li class="font-bold text-info">{{batches.branch_name}}</li>
              <li><span class="mx-2 font-bold text-white">|</span></li>
              <li class="font-bold text-blue-200">{{batches.course_name}}</li>
              <li><span class="mx-2 font-bold text-white">|</span></li>
              <li class="font-bold text-info">{{batches.batchcode}}</li>
              <li><span class="mx-2 font-bold text-white">|</span></li>
              <li class="font-bold text-blue-200">{{batches.trainer_name}}</li>
              <li><span class="mx-2 font-bold text-white">|</span></li>
              <li class="font-bold text-info">{{batches.class_timing_name}}</li>
            </ol>
          </div>
          <div class="text-right mt-0 mr-2 ml-0 px-1 py-1">
            <button @click="isOpen = !isOpen" class="text-xs bg-white py-1 px-2 rounded text-black align-middle cursor-default border border-black font-extrabold">
              Search
            </button>
          </div>
        </div>
          <div v-if="isOpen">
            <validation-observer ref="observer" v-slot="{ handleSubmit }">
              <form action="#" method="POST" @submit.stop.prevent="handleSubmit(searchParams)">
                <div class="grid md:grid-cols-5 sm:grid-cols-1 gap-5 mt-0 ml-2">
                  <div>
                    <label class="text-sm text-gray-50">Student Name</label>
                    <div>
                      <input type="text" name="text" id="text" autocomplete="text" class="mt-1 pt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md  text-black" v-model="search.firstname" >
                    </div>
                  </div>
                  <div>
                    <label class="text-sm text-gray-50">Contact Number</label>
                    <div>
                      <input type="text" name="number" id="number" autocomplete="number" class="mt-1 pt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md  text-black "  v-model="search.number" >
                    </div>
                  </div>
                  <div>
                    <label class="text-sm text-gray-50">Filter by month</label> <br>
                    <date-picker
                      append-to-body
                      :editable="false"
                      :default-value="new Date()"
                      v-model="date_selected"
                      placeholder="Select Date"
                    ></date-picker>
                  </div>
                </div>
                <div class="grid justify-items-stretch ml-96">
                  <div class="justify-self-end" >
                  <button class="text-xs font-extrabold bg-gray-900 py-1 px-2 rounded text-accent align-middle cursor-default border border-black" @click="searchParams()">
                    Submit
                  </button>
                  <button class="text-xs font-extrabold bg-accent py-1 px-2 rounded text-black align-middle cursor-default border border-blue-900"  @click="clearSearchParams()">
                    Clear
                  </button>
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
        <table class="border-collapse border border-black border-3 border-opacity-50  w-full table-auto m-3 mr-36">
          <thead>
            <tr class="leading-2">
              <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-bold text-sm">Student Name</th>
              <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-bold text-sm">Mobile Number</th>
              <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Added in Q-enquiry</th>
              <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Today's date</th>
              <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Today's date-1</th>
              <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Today's date-2</th>
              <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Today's date-3</th>
              <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Total class attended-3</th>
              <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Target</th>
              <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Balance</th>
              <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Paid</th>
            </tr>
          </thead>
            <tbody class="leading-4">
              <tr v-for="(bran, index) in total" :key=index :class="{ 'bg-gray-800': index % 2}"> 
                <td class="border  border-accent  text-left font-semibold pt-2 text-sm">
                  {{bran.name}}   
                </td>
                <td class="border  border-info  text-center font-semibold text-white text-sm">
                  {{ bran.mobile[0].number}}
                </td>
                <td class="border  border-accent  text-center font-semibold text-accent text-sm">
                  <div v-if="bran.added_v1==true">
                  <span
                      class="
                      px-2
                      inline-flex
                      leading-6
                      font-semibold
                      rounded-md
                      bg-white
                      border border-black
                      text-black
                      "
                      >{{"Yes"}}</span>
                  </div>
                  <div v-else>
                  <span
                      class="
                      px-2
                      inline-flex
                      leading-6
                      font-semibold
                      border border-white
                      rounded-md
                      bg-black
                      text-white
                      "
                      >{{"No"}}</span>
                  </div>
                </td>
                <td class="border  border-info  text-center font-semibold">
                  <button  class="
                          btn btn-xs
                          inline-flex
                          text-xs
                          btn btn-info
                          border border-black
                      ">
                    {{bran.att0_day}}
                  </button>
                </td>
                <td class="border  border-accent  text-center font-semibold">
                  <button  class="
                        btn btn-xs
                        inline-flex
                        text-xs
                        btn btn-info
                        border border-black
                      ">
                    {{bran.att1_day}}
                  </button>
                </td>
                <td class="border  border-info  text-center font-semibold">
                  <button  class="
                          btn btn-xs
                          inline-flex
                          text-xs
                          btn btn-info
                          border border-black
                      ">
                    {{bran.att2_day}}
                  </button>
                </td> 
                <td class="border  border-accent  text-center font-semibold">
                  <button  class="
                          btn btn-xs
                          inline-flex
                          text-xs
                          btn btn-info
                          border border-black
                      ">
                    {{bran.att3_day}}
                  </button>
                </td> 
                <td class="border  border-info  text-center font-semibold">
                  <button  class="
                      btn btn-xs
                      inline-flex
                      text-xs
                      btn btn-glass
                      border border-white
                      ">
                    {{bran.total_attended}}
                  </button>
                </td>
                <td class="border  border-accent  text-center font-semibold text-indigo-200 text-sm">
                  {{bran.target}}
                </td>
                <td class="border  border-info  text-center font-semibold text-indigo-200 text-sm">
                  {{bran.balance}}
                </td>
                <td class="border  border-accent  text-center font-semibold text-indigo-200 text-sm">
                  {{bran.paid}}
                </td>
              </tr>
            </tbody>  
        </table>
      <Pagination
        class="flex justify-center"
        :total="this.$store.state.dataverifier.signup.total"
        :page="page"
        @pageChange="onPageChange"
      />
      </div>
    </div>
  </section>
</template>

<script>
var dayjs = require("dayjs");
export default {
  head () {
    return {
      title: 'Signed up student List | Data Verifier',
    }
  },
  middleware: ["authenticated","is_dataverifier"],
  name: 'HomePage',
  data(){
    return{
      unstar: false,
      batch_selected:null,
      date_selected : null,
      promised:null,
      id:null,
      bsid:null,
      bid:null,
      sid:null,
      id1:null,
      pro_date:false,
      page: 1,
      search:{},
      comment:"",
      reason:null,
      params: "",
      isOpen:false,
      date:{
      date: null,
      },
      cancelpp:false,
      unblock:false,
      blockk:false,
      batches : {},
    }
  }, 
    async fetch(){
    let batch = await this.$axios.get(`tracker/batch-minimal/?id=${this.$route.query.id}`)
    this.batches = batch.data.results[0]
    let date = dayjs(new Date()).format("YYYY-MM-DD")
    if (this.date_selected == null){
      this.date.date= dayjs(new Date()).format("YYYY-MM-DD")
      this.date_selected = dayjs(new Date()).format("YYYY-MM-DD")
      this.params = new URLSearchParams(this.date).toString();
    }
    console.log("type",this.$route.query.type)
     await this.$store.dispatch('dataverifier/get_setSignup',{"page":this.page,"params":this.params,"id":this.$route.query.id,"type":this.$route.query.type})
    // else{
    //   this.searchParams()
    // }
  },
  computed: {
    total() {
      return this.$store.state.dataverifier.signup.results
    },
  },
  methods:{
    maskNumber(numbers){
      return numbers.replace(/\d(?=\d{4})/g, "*");
    },
    disabledDate(date) {
      return date < new Date();
    },
    async confirmCloseDat(){
      this.blockk = false;
      this.promised = dayjs(this.promised).format("YYYY-MM-DD")
      var data3 = {}
      data3 = {
        "student_id":this.sid,
        "comment":this.comment,
        "reason_id":this.reason, 
        "promised":this.promised, 
      }
      await this.$store.dispatch('tracker/ProDate',data3);
      await this.$store.dispatch("alerts/alert", {
        text: "Successfully added Promise date",
        type: "success",
      });
      this.$store.dispatch("auth/resetmsg");
      location.reload();

    },
    async confirmSubmit(){
      this.blockk = false;
      var data2 = {}
      data2 = {
        "sid":this.sid,
        "bid":this.bid,
      }
      await this.$store.dispatch('tracker/UnBlock',data2);
      await this.$store.dispatch("alerts/alert", {
        text: "Successfully Unblocked the batch",
        type: "success",
      });
      this.$store.dispatch("auth/resetmsg");
      location.reload();
    },
    async confirmClose(){
      this.unblock = false;
      var data1 = {}
      data1 = {
        "comment":this.comment,
        "rid":this.reason,
        "sid":this.sid,
        "bid":this.bid,
        "bsid":this.bsid
      }
      await this.$store.dispatch('tracker/Block',data1);
      await this.$store.dispatch("alerts/alert", {
        text: "Successfully Blocked the student",
        type: "success",
      });
      this.$store.dispatch("auth/resetmsg");
      location.reload();
    },
    searchParams(){
      if(this.date_selected){
        this.search.date = dayjs(this.date_selected).format("YYYY-MM-DD")
        this.date.date = this.search.date
      }
      else{
        this.search.date = dayjs(new Date()).format("YYYY-MM-DD")
      }
      this.params = new URLSearchParams(this.search).toString();
      this.$fetch()
    },
    clearSearchParams(){
      this.search = {}
      this.params = ""
      this.date_selected = null,
      this.$fetch()
    },
     onPageChange(page) {
      this.page = page;
      this.$fetch();
    }
  }
}
</script>


<style lang="postcss" scoped>
.badge {
  @apply inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700;
  &:hover {
    @apply bg-gray-300;
  }
}
</style>