<template>
<section class="mr-4">
<div class="mt-1 mx-1">
<div class="flex flex-col">
<div  class="align-middle inline-block shadow sm:rounded-lg">
<div class="text-right mt-0 mr-2 ml-0 px-1 py-1">
  <button @click="isOpen = !isOpen" class="text-xs bg-white py-1 px-2 rounded text-black align-middle cursor-default border border-black font-extrabold">Search</button>
</div>
    <div v-if="isOpen">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <form action="#" method="POST" @submit.stop.prevent="handleSubmit(searchParams)">
          <div class="grid md:grid-cols-8 sm:grid-cols-1 gap-5 mt-0 ml-2">
                <div>
                  <label class="text-sm text-gray-50">Batch Name</label>
                  <v-select
                    class="border border-white text-sm selected"
                    label="batchcode"
                    v-model="batch_selected"
                    :filterable="false"
                    :options="mascolleges"
                     :reduce="batchcode => batchcode.id"
                    placeholder="Search Batch code"
                    @search="
                        (search, loading) =>
                          searchStream(search, loading)
                      "
                ></v-select>
                </div>
                <div>
                  <label class="text-xs text-gray-50">Filter by month</label> <br>
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
                <div class="justify-self-right" >
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
    <tr class="leading-7">
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-bold text-sm">Batch code</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-bold text-sm">Track</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-bold text-sm">Trainer</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Total Students</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Attended Students</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Not Attended</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Promised to Pay</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Total class taken</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Not Paid</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Partial Paid</th>
      <!-- <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Total Paid</th> -->
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Fees not Updated</th>
      <!-- <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-sm">Close Batch</th> -->

    </tr>
  </thead>
  <tbody class="leading-4 hover:bg-gray-900">
    <tr v-for="(bran, index) in batches" :key=index :class="{ 'bg-gray-800': index % 2}"> 
      <td class="border  
               border-black  
                 text-center 
                 font-semibold 
               text-blue-400 
                 pt-2 
                 text-xs">{{bran.batchcode}}   
      </td>
      <td class="border  
               border-black  
                 text-center 
                 font-semibold 
               text-blue-400">
        	<button class="inline-flex 
                         justify-center 
                         py-1 
                         px-15 
                         border border-transparent 
                         shadow-sm 
                         text-xs 
                         font-extrabold 
                         rounded-md 
                         text-black 
                         bg-purple-400
                         " v-if="bran.track ==0">Attendance not taken</button>
          <button class="inline-flex 
                         justify-center 
                         py-1 
                         px-12 
                         border border-transparent 
                         shadow-sm 
                         text-xs 
                         font-extrabold 
                         rounded-md 
                         text-black 
                         bg-info
                         " v-if="bran.track ==1" v-on:click="cancelpp=true,id=bran.id">Track</button>
          <button class="inline-flex 
                         justify-center 
                         py-1 
                         px-10 
                         border border-transparent 
                         shadow-sm 
                         text-xs 
                         font-extrabold 
                         rounded-md 
                         text-black 
                         bg-accent
                         " v-if="bran.track ==2">Tracked</button>
      </td>
        <td class="border  
                 border-black  
                   text-center 
                   font-semibold 
                   text-info
                   pt-2 
                   text-xs">{{bran.trainer_name}}   
      </td>
     <td class="px-2 
                py-1 
                whitespace-nowrap 
                border border-black  
                font-semibold 
                has-tooltip7" >
          <NuxtLink class="hover:text-black-500" 
                    :to="bran.total > 0 ?`/branch-tracker/total?id=${bran.id}&date=${date.date}`:''" 
                    :target="bran.total > 0 ? '_blank' : ''"  >
            <div class="leading-5 text-indigo-200 uppercase text-center font-extrabold text-xs">
              <span v-if="bran.total>0" class='tooltip7 shadow-l bg-yellow-600 text-white mt-4 p-1 rounded-md text-xs'>click</span>
              {{bran.total}}
            </div>
           </NuxtLink>
    </td>
    <td class="px-2 
               py-1 
               whitespace-nowrap 
               border border-black  
               font-semibold 
               has-tooltip7" >
          <NuxtLink class="hover:text-black-500" 
                    :to="bran.attended > 0 ?`/branch-tracker/total-attended?id=${bran.id}&date=${date.date}`:''" 
                    :target="bran.attended > 0 ? '_blank' : ''"  >
          <div class="leading-5 text-indigo-200 uppercase text-center font-extrabold text-xs">
              <span  v-if="bran.attended>0" class='tooltip7 shadow-l bg-yellow-600 text-white mt-4 p-1 rounded-md text-sm'>click</span>
              {{bran.attended}}
          </div>
          </NuxtLink>
    </td>
    <td class="px-2 
               py-1 
               whitespace-nowrap 
               border border-black  
               font-semibold 
               has-tooltip7" >
            <NuxtLink class="hover:text-black-500" 
                      :to="bran.nattended > 0 ?`/branch-tracker/total-notattended?id=${bran.id}&date=${date.date}`:''"  
                      :target="bran.nattended > 0 ? '_blank' : ''"  >
            <div class="leading-5 text-indigo-200 uppercase text-center font-extrabold text-xs">
                <span v-if="bran.nattended>0" class='tooltip7 shadow-l bg-yellow-600 text-white mt-4 p-1 rounded-md text-sm'>click</span>
                {{bran.nattended}}
            </div>
            </NuxtLink>
    </td>
     <td class="px-2 
                py-1 
                whitespace-nowrap 
                border border-black  
                font-semibold 
                has-tooltip7" >
          <NuxtLink class="hover:text-black-500" 
                    :to="bran.promised > 0 ?`/branch-tracker/total-promised?id=${bran.id}&date=${date.date}`:''" 
                    :target="bran.promised > 0 ? '_blank' : ''"  >
          <div class="leading-5 text-indigo-200 uppercase text-center font-extrabold text-xs">
              <span v-if="bran.promised>0" class='tooltip7 shadow-l bg-yellow-600 text-white mt-4 p-1 rounded-md text-sm'>click</span>
              {{bran.promised}}
          </div>
          </NuxtLink>
    </td>
    <td class="border  border-black  
               text-center 
               font-semibold 
               text-blue-400 
               text-xs">{{bran.totalclass}}
    </td>
     <td class="px-2 
                 py-1 
                 whitespace-nowrap 
                 border border-black  
                 font-semibold 
                 has-tooltip7" >
            <NuxtLink class="hover:text-black-500" 
                      :to="`/branch-tracker/total-notpaid?id=${bran.id}&date=${date.date}`"  
                      target='_blank' >
            <div class="leading-5 text-indigo-200 uppercase text-center font-extrabold text-xs">
                <span class='tooltip7 shadow-l bg-yellow-600 text-white mt-4 p-1 rounded-md text-sm'>click</span>
                {{bran.notpaid}}
            </div>
            </NuxtLink>
      </td>
     <td class="px-2 
                py-1 
                whitespace-nowrap 
                border border-black  
                font-semibold 
                has-tooltip7" >
            <NuxtLink class="hover:text-black-500" 
                      :to="`/branch-tracker/total-partialpaid?id=${bran.id}&date=${date.date}`" 
                      target='_blank' >
            <div class="leading-5 text-indigo-200 uppercase text-center font-extrabold text-xs">
                <span class='tooltip7 shadow-l bg-yellow-600 text-white mt-4 p-1 rounded-md text-sm'>click</span>
                {{bran.partial}}
            </div>
            </NuxtLink>
    </td>
    <!-- <td class="px-2 
               py-1 
               whitespace-nowrap 
               border border-black  
               font-semibold 
               has-tooltip7" >
            <NuxtLink class="hover:text-black-500" 
                      :to="`/tracker/total-paid?id=${bran.id}&date=${date.date}`" 
                      target='_blank' >
            <div class="leading-5 text-indigo-200 uppercase text-center font-extrabold text-xs">
                <span class='tooltip7 shadow-l bg-yellow-600 text-white mt-4 p-1 rounded-md text-sm'>click</span>
                {{bran.paid}}
            </div>
            </NuxtLink>
    </td> -->
     <td class="px-2 
                py-1 
                whitespace-nowrap 
                border border-black  
                font-semibold 
                has-tooltip7" >
       <NuxtLink class="hover:text-black-500" 
                 :to="bran.notupdatedv1 > 0 ?`/branch-tracker/fee_notupdated?id=${bran.id}&date=${date.date}`:''"  
                 :target="bran.notupdatedv1 > 0 ? '_blank' : ''"  >
        <div class="leading-5 text-indigo-200 uppercase text-center font-extrabold text-xs">
          <span v-if="bran.notupdatedv1>0" class='tooltip7 shadow-l bg-yellow-600 text-white mt-4 p-1 rounded-md text-sm'>click</span>
            {{bran.notupdatedv1}}
        </div>
         </NuxtLink>
    </td>
    <!-- <td>
        <div class="mb-0 ml-6 mr-0 ">
        <button  class="
                border border-yellow-600
                btn btn-xs
                bg-yellow
                text-yellow-600  
                align-center          
            "
            v-on:click="closebatch=true,id1=bran.id">
        Close 
        </button>
      </div>
    </td> -->

  </tr>
  </tbody> 
   <div v-if="cancelpp==true" class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
            <div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
            <div class=" max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900 modal-card-body">
            <div class=" hello max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg "
              >
              <p class="text-white">Are you sure you want to Track?</p>
                  <div class="flex justify-end pt-2">
                    <button
                      @click="cancelpp = false"
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
                    Track
                    </button>
                  </div>
            </div>
            </div>
            </div>

        <div v-if="closebatch==true" class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
            <div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
            <div class=" max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900 modal-card-body">
                <div class="hello max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg"
              >
              <p class="text-white">Are you sure you want to close Batch?</p>
                  <div class="flex justify-end pt-2">
                    <button
                      @click="closebatch = false"
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
                      @click="confirmClose()"
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
                    Close
                    </button>
                  </div>
            </div>
          </div>
        </div>
    
</table>
 <Pagination
          class="flex justify-center"
          :total="this.$store.state.tracker.btrack_batch.total"
          :page="page"
          @pageChange="onPageChange"
        />
  </div>
</div>
</section>
</template>

<script>
import _ from "lodash";
var dayjs = require("dayjs");
export default {
  head() {
      return {
          title: "Batch List | Tracker",
      };
  },
  middleware: ["authenticated","is_branchtracker"],
  name: 'HomePage',
  data(){
      return{
        unstar: false,
        batch_selected:null,
        date_selected : null,
        id:null,
        id1:null,
        page: 1,
        search:{},
        params: "",
        isOpen:false,
        date:{
        date: null,
        },
        cancelpp:false,
        closebatch:false,
        mascolleges:[]
      }
  }, 
    async fetch(){
    await this.$store.dispatch('tracker/getTrackerBatch',{"page":this.page,"params":this.params,"id":this.$route.query.id})
    console.log("this.params",this.params)
    // await this.$store.dispatch('tracker/getBatchFilter')
    let date = dayjs(new Date()).format("YYYY-MM-DD")
    if (this.date_selected == null && this.batch_selected == null)
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
      return this.$store.state.tracker.btrack_batch.results
    }, 
  },
   methods:{
          searchStream(search, loading) {
                          if (search !== "") {
                          loading(true);
                          console.log(search)
                          this.getStream(search, loading, this);
                          }
                      },
            getStream: _.debounce(async function (batchcode, loading,vm) {
            try {
            const response = await vm.$axios.get(
                "/tracker/user-batch-list/?batchcode="+ batchcode
            );

                vm.mascolleges = response.data.results;
            

            loading(false);
            } catch (err) {
            vm.dipstreams = [];
            vm.degstreams = [];
            vm.masstreams = [];
            loading(false);
            }
        }, 500),
        async confirmSubmit(){
        this.cancelpp = false;
        await this.$store.dispatch('tracker/getTrack',this.id);
        await this.$store.dispatch("alerts/alert", {
            text: "Successfully Tracked the batch",
            type: "success",
          });
          this.$store.dispatch("auth/resetmsg");
          location.reload();
          },
        async confirmClose(){
          this.closebatch = false;
          await this.$store.dispatch('tracker/getClose',this.id1);
          await this.$store.dispatch("alerts/alert", {
              text: "Successfully Closed the batch",
              type: "success",
            });
            this.$store.dispatch("auth/resetmsg");
            location.reload();
        },
        searchParams(){
          if(this.batch_selected)
          {
            this.search.batch = this.batch_selected
          }
          if(this.date_selected)
          {
            this.search.date = dayjs(this.date_selected).format("YYYY-MM-DD")
            this.date.date = this.search.date
          }
          else
          {
            this.search.date = dayjs(new Date()).format("YYYY-MM-DD")
          }
          this.params = new URLSearchParams(this.search).toString();
          this.$fetch()
        },
        clearSearchParams(){
          this.search = {}
          this.params = ""
          this.batch_selected=null,
          this.date_selected = null,
          this.$fetch()
        },
        onPageChange(page) {
          this.page = page;
          this.$fetch();
        },
  },
}
</script>
<style lang="postcss" >
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