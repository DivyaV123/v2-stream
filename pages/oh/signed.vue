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
          <div class="text-right mt-0 mr-2 ml-0 px-1 py-1">
            <button @click="isOpen = !isOpen" class="text-xs bg-white py-1 px-2 rounded text-black align-middle cursor-default border border-black font-extrabold">
              Search
            </button>
          </div>
          <div v-if="isOpen">
            <validation-observer ref="observer" v-slot="{ handleSubmit }">
              <form action="#" method="POST" @submit.stop.prevent="handleSubmit(searchParams)">
                <div class="grid md:grid-cols-5 sm:grid-cols-1 gap-5 mt-0 ml-2">
                  <div>
                    <label class="text-sm text-gray-50">Student Name</label>
                    <div>
                      <input type="text" name="text" id="text" autocomplete="text" class="mt-1 pt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md  text-black placeholder-gray-500" v-model="search.student" placeholder="Enter Student Name">
                    </div>
                  </div>
                  <div>
                    <label class="text-sm text-gray-50">Contact Number</label>
                    <div>
                      <input type="text" name="number" id="number" autocomplete="number" class="mt-1 pt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md  text-black placeholder-gray-500"  v-model="search.number" placeholder="Enter Student Number" >
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
            <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Today's date</th>
            <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Today's date-1</th>
            <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Today's date-2</th>
            <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Today's date-3</th>
            <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Total class attended</th>
            <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Target</th>
            <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Balance</th>
            <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Paid</th>
            <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Allow-block</th>
            <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Fee status</th>
          </tr>
        </thead>
          <tbody class="leading-4">
            <tr v-for="(bran, index) in total" :key=index :class="{ 'bg-gray-800': index % 2}"> 
              <td class="border  border-black  text-left font-semibold pt-2 text-sm">
                <span class="uppercase font-mono ml-1">{{ bran.firstname }}</span> <br>
                <span class="text-gray-400 ml-1">{{ bran.studentname }}</span> 
              </td>
              <td class="border  border-black  text-center font-semibold text-accent text-sm">
                {{ bran.contacts[0].number }}
              </td>
              <td class="border  border-black  text-center font-semibold">
                <button  class="
                        btn btn-xs
                        inline-flex
                        text-xs
                        btn btn-glass
                        border border-info
                    ">
                  {{bran.attend0}}
                </button>
              </td>
              <td class="border  border-black  text-center font-semibold">
                <button  class="
                      btn btn-xs
                      inline-flex
                      text-xs
                      btn btn-glass
                      border border-info
                    ">
                  {{bran.attend1}}
                </button>
              </td>
              <td class="border  border-black  text-center font-semibold">
                <button  class="
                        btn btn-xs
                        inline-flex
                        text-xs
                        btn btn-glass
                        border border-info
                    ">
                  {{bran.attend2}}
                </button>
              </td>
              <td class="border  border-black  text-center font-semibold">
                <button  class="
                    btn btn-xs
                    inline-flex
                    text-xs
                    btn btn-glass
                    border border-info
                ">
                  {{bran.attend3}}
                </button>
              </td>  
              <td class="border  border-black  text-center font-semibold">
                <button  class="
                    btn btn-xs
                    inline-flex
                    text-xs
                    btn btn-glass
                    border border-accent
                    ">
                  {{bran.totalclass}}
                </button>
              </td>
              <td class="border  border-black  text-center font-semibold text-indigo-200 text-sm">
                {{bran.target}}
              </td>
              <td class="border  border-black  text-center font-semibold text-indigo-200 text-sm">
                {{bran.balance}}
              </td>
              <td class="border  border-black  text-center font-semibold text-indigo-200 text-sm">
                {{bran.paid}}
              </td>
              <td class="border  border-black  text-center font-semibold text-blue-400 pb-2">
                <button class="inline-flex justify-center py-1 px-15 border border-black shadow-sm text-xs font-extrabold rounded-md text-black bg-info btn-sm" v-if="bran.blocked ==true">
                  Blocked
                </button><br>
                <button class="inline-flex justify-center py-1 px-15 border border-transparent shadow-sm text-xs font-extrabold text-black bg-white " v-if="bran.blocked ==true">
                  {{bran.blockedinstance}}
                </button>
                <button class="inline-flex justify-center py-1 px-12 border border-black  shadow-sm text-xs font-extrabold rounded-md text-black  bg-accent " v-if="bran.blocked ==false" >
                  Attending
                </button>
              </td>
              <td>
                <div v-if="bran.promiseddate!=null" class="mb-0 ml-6 mr-0 text-center">
                  <button  class="
                          border border-yellow-600
                          btn btn-xs
                          bg-yellow
                          text-yellow-600  
                          align-center          
                    
                      "
                  >
                    Promised to Pay on-{{bran.promiseddate}}
                  </button>
                </div>
                <div v-if="bran.promiseddate==null" class="mb-0 ml-6 mr-0 text-center">
                  <button  class="
                      border border-white
                      btn btn-xs
                      bg-yellow
                      text-white 
                      align-center           
                  "
                  >
                    Promise date not given
                  </button>
                </div>
              </td>
            </tr>
          </tbody>   
        <div v-if="pro_date==true" class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
          <div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
          <div class="flex justify-center max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900">
            <div
              class="
                max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg 
              "
            >
              <div class="flex justify-center pt-2">
                <validation-observer ref="observer" v-slot="{ handleSubmit }">
                  <form @submit.stop.prevent="handleSubmit(confirmCloseDat)">
                    <div
                        class="border border-white pt-3 text-left pb-4 pl-4"
                    >
                      <label for="country" class="block text-sm font-extrabold pb-1 pr-20">Promise date</label>
                      <div>
                        <date-picker
                          append-to-body
                          class="bg-white"
                          :editable="false"
                          :default-value="new Date()"
                          v-model="promised"
                          :disabledDate="disabledDate"
                          placeholder="Promise Date"
                        ></date-picker>
                      </div>
                    </div>
                    <div class="border border-white pb-4 pl-4 pr-4">
                      <label for="country" class="block text-sm font-extrabold pb-1 pr-20 text-white">Comment</label>
                        <div class="mt-1 relative rounded-md shadow-sm ">
                          <textarea id="" cols="30" rows="5" v-model="comment" class="mt-1 block w-full shadow-sm sm:text-sm rounded-md leading-5 pl-6 pt-2  text-black" placeholder="Enter comment" ></textarea>
                        </div>
                    </div>
                    <div class="border border-white pt-3 pr-4 pl-4 pb-6">
                      <label for="country" class="block text-sm font-extrabold text-blue-5000">Reason</label>
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
                          class="border border-white text-sm selected"
                          label="name"
                          v-model="reason"
                          :options="$store.state.tracker.pay_reason"
                          :reduce="name => name.id"
                          placeholder="Select reason"
                      ></v-select>
                    </div> 
                    <br>
                    <button
                      @click="unblock = false"
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
                      "
                      >
                      Add
                    </button>
                  </form>
                </validation-observer>
              </div>
            </div>
          </div>
        </div>
        <div v-if="unblock==true" class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
          <div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
          <div class="flex justify-center max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900">
            <div
              class="
                max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg 
              "
            >
              <div class="flex justify-center pt-2">
                <validation-observer ref="observer" v-slot="{ handleSubmit }">
                  <form @submit.stop.prevent="handleSubmit(confirmClose)">
                    <div class="border border-white pb-4 pl-4 pr-4">
                      <label for="country" class="block text-sm font-extrabold pb-1 pr-20 text-white">Comment</label>
                        <div class="mt-1 relative rounded-md shadow-sm ">
                          <textarea id="" cols="30" rows="5" v-model="comment" class="mt-1 block w-full shadow-sm sm:text-sm rounded-md leading-5 pl-6 pt-2  text-black" placeholder="Enter comment" ></textarea>
                        </div> 
                    </div>
                    <div class="border border-white pt-3 pr-4 pl-4 pb-6">
                      <label for="country" class="block text-sm font-extrabold text-blue-5000">Reason</label>
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
                        class="border border-white text-sm selected"
                        label="name"
                        v-model="reason"
                        :options="$store.state.tracker.reason"
                        :reduce="name => name.id"
                        placeholder="Select reason"
                      ></v-select>
                    </div> 
                    <br>
                    <button
                      @click="unblock = false"
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
                      @click="confirmClose()">
                      Block
                    </button>
                  </form>
                </validation-observer>
              </div>
            </div>
          </div>
        </div>
        <div v-if="blockk==true" class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
          <div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
          <div class=" max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900 modal-card-body">
            <div
              class="
                hello max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg 
              "
            >
              <p class="text-white">Are you sure you want to Unblock?</p>
              <div class="flex justify-end pt-2">
                <button
                  @click="blockk = false"
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
                  @click="confirmSubmit()"
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
                  Unblock
                </button>
              </div>
            </div>
          </div>
        </div>
      </table>
    <Pagination
      class="flex justify-center"
      :total="this.$store.state.oh.signed.total"
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
      title: 'Signed up student List | OH',
    }
  },
  middleware: ["authenticated","is_oh"],
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
    }
  }, 
    async fetch(){
   
    let date = dayjs(new Date()).format("YYYY-MM-DD")
    if (this.date_selected == null&&this.$route.query.date){
      this.date.date= this.$route.query.date
      this.date_selected = this.$route.query.date
      this.params = new URLSearchParams(this.date).toString();
    }
     await this.$store.dispatch('oh/getSigned',{"page":this.page,"params":this.params,"id":this.$route.query.id,"bid":this.$route.query.bid})
    // else{
    //   this.searchParams()
    // }
  },
  computed: {
    total() {
      return this.$store.state.oh.signed.results
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