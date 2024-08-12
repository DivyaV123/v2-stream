<template>
<section class="mr-4">
<div class="mt-1 mx-1">
<div class="flex flex-col">
<div class="align-middle inline-block shadow sm:rounded-lg">
<div class="container flex"  >
    <div class="w-full p-2 m-2 bg-gray-700 rounded flex justify-left ">
      <ol class="flex text-gray-800">
        <li class="font-bold text-teal-250">{{batches.branch_name}}</li>
        <li><span class="mx-2 font-bold text-white">|</span></li>
        <li class="font-bold text-teal-450">{{batches.course_name}}</li>
        <li><span class="mx-2 font-bold text-white">|</span></li>
        <li class="font-bold text-teal-250">{{batches.batchcode}}</li>
        <li><span class="mx-2 font-bold text-white">|</span></li>
        <li class="font-bold text-teal-450">{{batches.trainer_name}}</li>
        <li><span class="mx-2 font-bold text-white">|</span></li>
        <li class="font-bold text-teal-250">{{batches.class_timing_name}}</li>
      </ol>
    </div>
    <div class="m-3 flex justify-right">
      <button @click="isOpen = !isOpen" class="text-xs bg-white py-1 px-2 rounded text-black align-middle cursor-default border border-black font-extrabold">Search</button>
    </div>
  </div>
    <div v-if="isOpen">
       <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form action="#" method="POST" @submit.stop.prevent="handleSubmit(searchParams)">
          <div class="grid md:grid-cols-5 sm:grid-cols-1 gap-5 mt-0 ml-2">
                  <div>
                      <label class="text-sm text-gray-50">Student Name</label>
                      <div>
                        <input type="text" name="text" id="text" autocomplete="text" class="mt-1 pt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md  text-black placeholder-gray-500" v-model="search.student" placeholder="Enter Student Name" >
                      </div>
                    </div>
                    <div>
                      <label class="text-sm text-gray-50">Contact Number</label>
                      <div>
                        <input type="text" name="number" id="number" autocomplete="number" class="mt-1 pt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md  text-black placeholder-gray-500"  v-model="search.number" placeholder="Enter Student Number">
                      </div>
                    </div>
                    <!-- <div>
                      <label class="text-sm text-gray-50">Filter by month</label> <br>
                      <date-picker
                          append-to-body
                          :editable="false"
                          :default-value="new Date()"
                          v-model="date_selected"
                          placeholder="Select Date"
                      ></date-picker>
                    </div> -->
                    <div>
                      <label class="text-sm text-gray-50">Paid Date</label> <br>
                      <date-picker
                          append-to-body
                          :editable="false"
                          :default-value="new Date()"
                          v-model="date_selected1"
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
    <tr class="leading-8">
      <th class="border  border-black  bg-blue-200 text-black font-bold text-sm">Student Name</th>
      <th class="border  border-black  bg-blue-200 text-black font-bold text-sm">Mobile Number</th>
      <th class="border  border-black  bg-blue-200  text-black font-semibold text-sm">Paid amount</th>
      <th class="border  border-black  bg-blue-200 text-black font-semibold text-sm">Paid date</th>
      <!-- <th class="border  border-black  bg-blue-200 text-black font-semibold text-sm">Balance</th> -->
      <th class="border  border-black  bg-blue-200 text-black font-semibold text-sm">Target</th>
      <th class="border  border-black  bg-blue-200  text-black font-semibold text-sm">Branch</th>
      <th class="border  border-black  bg-blue-200  text-black font-semibold text-sm">Batch</th>
      <th class="border  border-black  bg-blue-200  text-black font-semibold text-sm">Course</th>
      <th class="border  border-black  bg-blue-200  text-black font-semibold text-sm">Batch Codes</th>
    </tr>
  </thead>
  <tbody class="leading-4">
    <tr v-for="(bran, index) in total" :key=index :class="{ 'bg-gray-600': index % 2}"> 
      <td class="border  
               border-black  
                 text-left 
                 font-semibold 
                 pt-2 
                 text-sm 
                 text-white">
                <span class="uppercase font-mono ml-1">{{ bran.firstname }}</span> <br>
                <span class="text-gray-400 ml-1">{{ bran.studentname }}</span>   
      </td>
      <td class="border  
               border-black  
                 text-center 
                 font-semibold 
                 text-green-200 
                 text-sm">{{ bran.contacts[0].number }}
      </td>
       <td class="border  border-black  
                  text-center 
                  font-semibold">
             <button  class="
                    btn btn-xs
                    inline-flex
                    text-xs
                    btn btn-glass
                    border border-success

                ">
            {{bran.amount}}
            </button>
        </td>
        <td class="border  
                 border-black  
                   text-center 
                   font-semibold">
             <button  class="
                    btn btn-xs
                    inline-flex
                    text-xs
                    btn btn-glass
                    border border-warning
                ">
            {{bran.date}}
            </button>
          </td>
         <!-- <td class="border  border-black  
                    text-center 
                    font-semibold">
             <button  class="
                    btn btn-xs
                    inline-flex
                    text-xs
                    btn btn-glass
                    border border-info

                ">
       {{bran.balance}}
       </button>
           </td> -->
         <td class="border  
                  border-black  
                    text-center 
                    font-semibold">
             <button  class="
                    btn btn-xs
                    inline-flex
                    text-xs
                    btn btn-glass
                    border border-error

                ">
       {{bran.target}}
       </button>
           </td>
          <td class="border  
                   border-black  
                     text-center 
                     font-semibold 
                     text-blue-200 
                     text-sm">{{bran.branch}}
           </td>
          <td class="border  
                   border-black  
                     text-center 
                     font-semibold 
                     text-blue-200 
                     text-sm">{{bran.batches}}
          </td>
          <td class="border  
                   border-black  
                     text-center 
                     font-semibold 
                     text-blue-200 
                     text-sm">{{bran.course}}
          </td>
          <td class="border  border-black  
                 text-left 
                 font-semibold 
                 pt-2 
                 text-sm
                 text-indigo-300
                 ">{{bran.batchcode}}   
      </td> 
    </tr>
   </tbody>  
         <div v-if="verify==true" class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
            <div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
            <div class="flex justify-center max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900">
            <div class="max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg ">
                  <div class="flex justify-center pt-2">
                  <validation-observer ref="observer" v-slot="{ handleSubmit }">
                    <form @submit.stop.prevent="handleSubmit(updateSubmit)">
                        <div class="border border-success  pr-4 pl-4 pt-4">
                        <label for="country" class="block text-sm font-extrabold text-blue-5000">Target</label>
                        <ValidationProvider rules="numeric" v-slot="{ errors }">
                                <div>
                                <div class="mt-1 relative rounded-md shadow-sm ">
                                <input class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md py-2 mr-20 placeholder-white bg-gray-700" type="number"  name="number" id="number" v-model="target" autocomplete="number"  min=0>
                                </div>               
                                </div>
                            <span class="text-warning">{{ errors[0] }}</span>
                        </ValidationProvider>
                        </div>
                        <br>
                         <div class="border border-success pr-4 pl-4 pt-4">
                            <label for="country" class="block text-sm font-extrabold text-blue-5000">Paid</label>
                            <ValidationProvider rules="numeric" v-slot="{ errors }">
                                    <div>
                                    <div class="mt-1 relative rounded-md shadow-sm ">
                                    <input class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md py-2 mr-20 placeholder-white bg-gray-700" type="number"  name="number" id="number" v-model="paid" autocomplete="number"  min=0>
                                    </div>               
                                    </div>
                                <span class="text-warning">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                            <br>
                        <button
                          @click="verify = false"
                          class="
                            px-6
                            py-3
                            bg-transparent
                            p-3
                            rounded-full
                            text-warning
                            hover:bg-gray-100
                            hover:warning
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
                            bg-warning
                            rounded-full
                            text-black
                            font-medium
                            tracking-wide
                            hover:bg-warning
                          ">
                        Add
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
          :total="this.$store.state.tracker.fee_notupdated.total"
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
      title: 'Fee not updated List | Tracker',
    }
  },
  middleware: ["authenticated","is_tracker"],
  name: 'HomePage',
  data(){
      return{
        unstar: false,
        batch_selected:null,
        date_selected : null,
        date_selected1:null,
        promised:null,
        id:null,
        bsid:null,
        bid:null,
        sid:null,
        id1:null,
        rid:null,
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
        verify:false,
        target:0.0,
        paid:0.0,
        see:false,
        batches : {}
      }
  }, 
    async fetch(){
    let batch = await this.$axios.get(`tracker/batch-minimal/?id=${this.$route.query.id}`)
    this.batches = batch.data.results[0]
    await this.$store.dispatch('tracker/getFeenotUpdated',{"page":this.page,"params":this.params,"id":this.$route.query.id,"bid":this.$route.query.bid})
    let date = dayjs(new Date()).format("YYYY-MM-DD")
    // if (this.date_selected == null)
    // {
    //   this.date.date= dayjs(new Date()).format("YYYY-MM-DD")
    //   this.params = new URLSearchParams(this.date).toString();
    // }
    // else
    // {
    //   this.searchParams()
    // }     
  },
 computed: {
    total() 
    {
      return this.$store.state.tracker.fee_notupdated.results
    },
    
  },
   methods:{
          maskNumber(numbers)
          {
            return numbers.replace(/\d(?=\d{4})/g, "*");
          },
          disabledDate(date)
          {
            return date < new Date();
          },
          async updateSubmit(){
            this.verify = false;
            var data2 = {}
            const splits1 = this.target.replace('"','')
            const splits2 = this.paid.replace('"','')
            data2 = {
              "rid":this.rid,
              "updated_v1":true,
              "target":this.target.replace('"',''),
              "paid":this.paid.replace('"','')
            }
            await this.$store.dispatch('collector/Add',data2);
            await this.$store.dispatch("alerts/alert", {
                text: "Successfully Added the student",
                type: "success",
              });
              this.$store.dispatch("auth/resetmsg");
            location.reload();
        },
        searchParams(){
          // if(this.date_selected)
          // {
          //   this.search.date = dayjs(this.date_selected).format("YYYY-MM-DD")
          //   this.date.date = this.search.date
          // }
          // else
          // {
          //   this.search.date = dayjs(new Date()).format("YYYY-MM-DD")
          // }
          if(this.date_selected1)
          {
          this.search.date__date = dayjs(this.date_selected1).format("YYYY-MM-DD")
          }
          this.params = new URLSearchParams(this.search).toString();
          this.$fetch()
        },
        clearSearchParams(){
          this.search = {}
          this.params = ""
          // this.date_selected = null,
          this.date_selected1 = null,
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
</style>