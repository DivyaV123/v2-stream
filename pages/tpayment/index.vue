<template>
<section class="mr-4">
<div class="mt-1 mx-1">
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
              <label class="text-sm text-gray-50">Batch Name</label>
              <div>
                <input type="text" name="text" id="text" autocomplete="text" class="mt-1 pt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md  text-black placeholder-gray-500" v-model="search.name" placeholder="Search Batch name" >
              </div>
            </div>
          <div>
              <label class="text-sm text-gray-50">Trainer Name</label>
              <div>
                <input type="text" name="text" id="text" autocomplete="text" class="mt-1 pt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md  text-black placeholder-gray-500" v-model="search.trainer" placeholder="Search Trainer name" >
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
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 " >nid</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 " >Batch Code</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 " >Trainer Name</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 " >Dropout</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 " >Subject</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 " >Branch</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 " >Total Classes</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 " >Batch status</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 " >Batch start date</th>
    </tr>

  </thead>
  <template v-if="batches && batches.length >0">
  <tbody class="leading-4 hover:bg-gray-700 " >
    <tr v-for="(bran, index) in batches" :key=index :class="{ 'bg-gray-800': index % 2}"> 
      <td class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">v2-{{bran.id}}
      </td>
      <td class="px-2 
                py-1 
                whitespace-nowrap 
                border border-info 
                font-semibold 
                has-tooltip7
                text-center" >
            <NuxtLink class="hover:text-black-500" 
                    :to="`/tpayment/student?id=${bran.id}`" >
            <div class="leading-5 text-white uppercase text-center font-extrabold text-xs">
              v2-{{bran.batchcode}}
            </div>
           </NuxtLink>
      </td>
     <td class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">{{bran.trainer}}
      </td>
       <td class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-error
                 ">{{bran.dropout}}
      </td>
       <td class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">{{bran.subject}}
      </td>
       <td class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">{{bran.branch}}
      </td>
      <td class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-warning">{{bran.classes}}
      </td>
      <td class="px-2 
                 py-1 
                 text-center 
                 whitespace-nowrap 
                 border border-info  
                 font-semibold">
                 <div v-if="bran.status==1">
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
                    >{{"Open"}}</span>
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
                    >{{"Closed"}}</span>
                 </div>
      </td>
      <td class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white
                 text-xs">{{bran.start_date}}
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
        tottal:null,
      }
  }, 
    async fetch(){
    await this.$store.dispatch("title", "Batch List");  
    this.tottal = this.$store.state.tpayment.batches.total
    await this.$store.dispatch('tpayment/getBatch',{"params":this.params,"total":this.tottal})
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
      return this.$store.state.tpayment.batches.results
    },
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