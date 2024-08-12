<template>
<section class="mr-4">
<div class="mt-1 mx-1">
<div class="flex flex-col">
<div class="align-middle inline-block shadow overflow-x-auto sm:rounded-lg">
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
                class="bg-gray-900 text-white text-xs"
                label="batchcode"
                v-model="batch_selected"
                :options="$store.state.tracker.batch_filter"
                placeholder="Select Batch"              
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
   <table class="border-collapse border border-white border-3 border-opacity-50  w-full table-auto m-3 mr-36">
  <thead>
    <tr class="leading-6 ">
      <th class="bg-gray-800 text-indigo-100 ">Batches</th>
      <th class="bg-gray-800 text-indigo-100 ">Fee not updated in qenquiry</th>
      <th class="bg-gray-800 text-indigo-100 ">Fee updated in qenquiry</th> 
    </tr>
  </thead>
  <tbody class="leading-4">
    <tr v-for="(batc, index) in batches" :key=index :class="{ 'bg-gray-600': index % 2}"> 
     <td class="px-2 
                py-1 
                whitespace-nowrap 
                text-center 
                text-black 
                font-semibold 
                has-tooltip7 
                hover:bg-gray-800" >
       <div class="btn bg-gray-400 btn-xs text-black hover:bg-gray-600">
         
         {{batc.batchcode}}
       </div>
      </td> 
      <td class="px-2 
                 py-1 
                 whitespace-nowrap  
                 hover:bg-gray-800 
                 text-gray-100 
                 font-semibold 
                 has-tooltip7 
                 text-center" >
          <NuxtLink class="hover:underline" 
                   :to="batc.notupdatedv1 > 0 ? `/collector/feenotupdate?id=${batc.id}&date=${date.date}`:''" 
                   :target="batc.notupdatedv1 > 0 ? '_blank' : ''"  >
            <div class="leading-5 text-black uppercase text-center font-extrabold btn bg-error btn-xs hover:bg-error">
              <span v-if="batc.notupdatedv1>0" class='tooltip7 shadow-l bg-error text-white mt-10 p-1 rounded-md text-xs'>click</span>
              {{batc.notupdatedv1}}
            </div>
          </NuxtLink>
      </td>
      <td class="px-2 
                 py-1 
                 whitespace-nowrap 
                 hover:bg-gray-800 
                 text-gray-100 
                 font-semibold 
                 has-tooltip7 
                 text-center" >
         <NuxtLink class="hover:underline" 
                  :to="batc.updatedv1 > 0 ? `/collector/feeupdate?id=${batc.id}&date=${date.date}`:''" 
                  :target="batc.updatedv1 > 0 ? '_blank' : ''"  >
            <div class="leading-5 text-black uppercase text-center font-extrabold btn bg-white btn-xs hover:bg-white">
              <span v-if="batc.updatedv1>0" class='tooltip7 shadow-l bg-white text-black mt-10 p-1 rounded-md text-xs'>click</span>
              {{batc.updatedv1}}
            </div>
          </NuxtLink>
      </td>
    </tr>
   </tbody>  
</table> 
 <Pagination
          class="flex justify-center"
          :total="this.$store.state.collector.batch.total"
          :page="page"
          @pageChange="onPageChange"
        />     
</div>
</section>
</template>

<script>
var dayjs = require("dayjs");
export default {
   head () {
    return {
      title: 'Batch List | Collector',
    }
  },
  middleware: ["authenticated","is_collector"],
  name: 'HomePage',
  data(){
      return{
        unstar: false,
        batch_selected:null,
        date_selected:null,
        id:null,
        page: 1,
        search:{},
        params: "",
        isOpen:false,
        batch:[],
        date:{
        date: null,
        },
      }
  }, 
    async fetch(){
    await this.$store.dispatch("title", "Batch List"); 
    console.log("date_selected",this.date_selected)
    if (this.date_selected == null&& this.batch_selected == null &&this.$route.query.date)
    {
      this.date.date= this.$route.query.date
      this.params = new URLSearchParams(this.date).toString();
    }
    // else
    // {
    //   this.searchParams()
    // } 
    await this.$store.dispatch('collector/get_batches',{"page":this.page,"id":this.$route.query.id,"params":this.params});
    await this.$store.dispatch('tracker/getBatchFilter')
  },
 computed: {

    batches() {
      return this.$store.state.collector.batch.results
    },

  },
   methods:{
    
        onPageChange(page) {
          this.page = page;
          this.$fetch();
        },
        searchParams()
        {
          if(this.batch_selected)
          {
            this.search.batchcode = this.batch_selected.batchcode
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
