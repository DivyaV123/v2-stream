<template>
<section class="mr-4">
<div class="mt-1 mx-1">
<div class="container flex"  >
  <div class="w-52  rounded flex justify-center ">
    <ol class="flex justify-center ">
        <li class="font-bold text-success">Total: {{totall}}</li>
    </ol>
  </div>
  </div>
<div class="flex flex-col">
<div class="align-middle inline-block shadow overflow-x-auto sm:rounded-lg modal-card-body">
<div class="text-right mt-0 mr-2 ml-0 px-1 py-1">
  <button @click="isOpen = !isOpen" class="text-xs bg-white py-1 px-2 rounded text-black align-middle cursor-default border border-black font-extrabold">Search</button>
</div>
<div v-if="isOpen">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <form action="#" method="POST" @submit.stop.prevent="handleSubmit(searchParams)">
        <div class="grid md:grid-cols-8 sm:grid-cols-1 gap-5 mt-0 ml-2">
          <div>
            <label class="text-sm text-gray-50">Student Name</label>
            <div>
                <input type="text" name="text" id="text" autocomplete="text" class="mt-1 pt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md  text-black placeholder-gray-500" v-model="search.student" placeholder="Enter Student Name" >
            </div>
            </div>
        <div>
            <label class="text-sm text-gray-50">Contact Number</label>
            <div>
            <input type="text" name="number" id="number" autocomplete="number" class="mt-1 pt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md  text-black placeholder-gray-500"  v-model="search.number"  placeholder="Enter Student Number" >
            </div>
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
  <table class="border-collapse border border-white border-3 border-opacity-50  w-full table-auto m-3 mr-36">
  <thead>
    <tr class="leading-6">
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >Student Name</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >Batch Code</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >Total Class Attended</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >Target</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >Target Paid</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >Balance</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >Subject Target</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >Subject Paid</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >Subject Balance</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >Mobile Number</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >nid</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >bid</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >sid</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >All Comments</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >All Trainers</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >Class count</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >Student joined but trainer not joined</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >Razorpay paid amount</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >Drupal ID</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 text-sm" >Email ID</th>
    </tr>

  </thead>
  <template v-if="batches && batches.length >0">
  <tbody class="leading-4 hover:bg-gray-700 " >
    <tr v-for="(bran, index) in batches" :key=index :class="{ 'bg-gray-800': index % 2}"> 
      <td class="px-2 
                py-1 
                whitespace-nowrap 
                border border-info 
                font-semibold 
                has-tooltip7
                text-center" >
            <NuxtLink class="hover:text-black-500" 
                    :to="`/tpayment/student_detail?id=${bran.nid}`" >
            <div class="leading-5 text-white uppercase text-center font-extrabold text-xs">
              {{bran.name}}
            </div>
           </NuxtLink>
      </td>
      <td class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs
                 ">v2-{{bran.batchcode}}
      </td>
      <td class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">{{bran.attended}}
      </td>
      <td v-if="bran.v1payment[0].target" class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">{{bran.v1payment[0].target}}
      </td>
      <td v-else class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">{{bran.v1payment}}
      </td>
      <td v-if="bran.v1payment[0].paid" class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-success
                 text-xs">{{bran.v1payment[0].paid}}
      </td>
      <td v-else class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-success
                 text-xs">{{bran.v1payment}}
      </td>
        <td v-if="bran.v1payment[0].balance" class="border 
                border-info 
                    text-center 
                    font-semibold 
                    text-warning
                    text-xs">{{bran.v1payment[0].balance}}
        </td>
        <td v-else class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-warning
                 text-xs">{{bran.v1payment}}
      </td>
      <td v-if="bran.subjectpayment[0].target" class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">{{bran.subjectpayment[0].target}}
      </td>
      <td v-else class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">{{bran.subjectpayment}}
      </td>
      <td v-if="bran.subjectpayment[0].paid" class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-success
                 text-xs">{{bran.subjectpayment[0].paid}}
      </td>
      <td v-else class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-success
                 text-xs">{{bran.subjectpayment}}
      </td>
        <td v-if="bran.subjectpayment[0].balance"  class="border 
                border-info 
                    text-center 
                    font-semibold 
                    text-warning
                    text-xs">{{bran.subjectpayment[0].balance}}
        </td>
        <td v-else class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-warning
                 text-xs">{{bran.subjectpayment}}
      </td>
       <td v-if="bran.numbers[0]" class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">
                  <div v-for="(num,index1) in bran.numbers" :key="index1+'A'" >
                      {{num.number}}
                  </div>
      </td>
      <td v-else class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">{{"not given"}}
      </td>
      <td class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">v2-{{bran.nid}}
      </td>
        <td class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">v2-{{bran.bid}}
      </td>
      <td class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">v2-{{bran.sid}}
      </td>
      <td class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">student block comments={{bran.comments.student_block_comments}}<br><br>
                          student allocation form={{bran.comments.student_allocation_form}}<br><br>
                          payment promised={{bran.comments.payment_promised}}
      </td>
      <td class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">{{bran.bid}}
      </td>
      <td class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">{{bran.trainers}}
      </td>
      <td class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">{{bran.not_joined}}
      </td>
      <td v-if="bran.razorpay[0].razorpay[0].amount" class="
                 text-center 
                 font-semibold 
                 text-error
                 text-xs">
                 <div v-for="(brans,index1) in bran.razorpay[0].razorpay" :key="index1+'C'" >
                     Paid Date:{{brans.date}}
                     Amount:{{brans.amount}}
                 </div>
      </td>
       <td v-else  class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-error
                 text-xs">{{bran.razorpay[0].razorpay}}
      </td> 
      
      <td v-if="bran.drupalnid" class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">{{bran.drupalnid}}
      </td>
      <td v-else class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">{{"User not found"}}
      </td>
      <td v-if="bran.emails[0]" class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">
                  <div v-for="(ema,index1) in bran.emails" :key="index1+'A'" >
                      {{ema.email}}
                  </div>
      </td>
      <td v-else class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">{{"not given"}}
      </td>
    </tr>
   </tbody>  
   </template>
        <template v-else>
          <tbody>
            <tr>
              <td colspan="6" class="text-warning text-center">No Data</td>
            </tr>
          </tbody>
        </template>
</table>
</div>
</div>
</section>
</template>

<script>
var dayjs = require("dayjs");
export default {
   head () {
    return {
      title: 'Branch List | Data Verifier',
    }
  },
  middleware: ["authenticated","is_tpayment"],
  name: 'HomePage',
  data(){
      return{
        unstar: false,
        batch_selected:null,
        date_selected : null,
        id:null,
        page: 1,
        search:{},
        params: "",
        isOpen:false,
        date:{
        date: null,
        },
        search:{},
        params: "",
        total:null,
        tottal:null,
      }
  }, 
    async fetch(){
    await this.$store.dispatch("title", "Student List");
    this.tottal = this.$store.state.tpayment.student.total  
    await this.$store.dispatch('tpayment/getStudent',{"params":this.params,"id":this.$route.query.id,"total":this.tottal})
    await this.$store.dispatch('tracker/getBatchFilter')
    let date = dayjs(new Date()).format("YYYY-MM-DD")
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
    batches() {
      return this.$store.state.tpayment.student.results
    },
    totall(){
      return this.$store.state.tpayment.student.total
    }
  },
   methods:{

    searchParams(){
      // if(this.batch_selected)
      //     {
      //       this.search.id = this.batch_selected.id
      //     }
          this.params = new URLSearchParams(this.search).toString();
          console.log(this.params)
          this.$fetch()
    },
    clearSearchParams(){
        this.search = {}
        this.params = ""
        this.batch_selected=null,
        this.date_selected = null,
        location.reload()
    }, 
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
.modal-card-body{
 overflow-y: auto;
 -ms-overflow-style: none;
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