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
   <table class="border-3 border-opacity-100  w-full table-auto m-3 mr-36">
  <thead>
    <tr class="leading-6">
      <th class="border border-indigo-50  bg-gray-600 text-white ">Branch</th>
      <th class="border border-indigo-50  bg-gray-600 text-white ">Batches</th>
      <th class="border border-indigo-50  bg-gray-600 text-white ">Fee not updated in qenquiry</th>
      <th class="border border-indigo-50  bg-gray-600 text-white ">Fee updated in qenquiry</th> 

    </tr>
  </thead>
  <template v-if="branches && branches.length >0">
  <tbody class="leading-4">    
    <tr v-for="(bran, index) in branches" :key=index :class="{ 'bg-gray-600': index % 2}"> 
      <td class="border  
               border-indigo-50  
               bg-gray-800 
               hover:bg-gray-700  
                 text-center 
                 font-semibold 
               text-white">{{bran.name}}</td>
      
     <td class="px-2 
                py-1 
                border 
                border-indigo-50 
                bg-gray-800 
                hover:bg-gray-700  
                font-semibold 
                has-tooltip7 
                text-center" >
          <NuxtLink class="hover:underline" 
                        :to="bran.batches > 0 ?`/collector/cbatches?id=${bran.id}&date=${date.date}`:''" 
                        :target="bran.batches > 0 ? '_blank' : ''"  >
                <div class="leading-5 text-yellow-300 uppercase text-center font-extrabold btn btn-glass border border-yellow-400 btn btn-xs">
                  <span v-if="bran.batches>0" class='tooltip7 shadow-l bg-yellow-600 text-white mt-10 p-1 rounded-md text-xs'>click</span>
                  {{bran.batches}}
                </div>
              </NuxtLink>
      </td>
      
      <td class="px-2 
                 py-1  
                 border border-indigo-50 
                 bg-gray-800 
                 hover:bg-gray-700 
                 font-semibold 
                 has-tooltip7 
                 text-center" >
          <NuxtLink class="hover:underline" 
                    :to="bran.notupdatedv1 > 0 ?`/collector/notupdated_branch?bid=${bran.id}&date=${date.date}`:''" 
                    :target="bran.notupdatedv1 > 0 ? '_blank' : ''"  >
            <div class="leading-5 text-green-300 uppercase text-center font-extrabold btn btn-glass border border-green-400 btn btn-xs">
              <span v-if="bran.notupdatedv1>0" class='tooltip7 shadow-l bg-green-400 text-white mt-10 p-1 rounded-md text-xs'>click</span>
              {{bran.notupdatedv1}}
            </div>
            </NuxtLink>
      </td>

      <td class="px-2 
                 py-1 
                 border border-indigo-50 
                bg-gray-800 
                hover:bg-gray-700 
                  font-semibold 
                  has-tooltip7 
                  text-center" >
            <NuxtLink class="hover:underline" 
                    :to="bran.updatedv1 > 0 ?`/collector/updated_branch?bid=${bran.id}&date=${date.date}`:''" 
                    :target="bran.updatedv1 > 0 ? '_blank' : ''" >
            <div class="leading-5 text-blue-300 uppercase text-center font-extrabold btn btn-glass border border-blue-400 btn btn-xs">
              <span v-if="bran.updatedv1>0" class='tooltip7 shadow-l bg-blue-400 text-white mt-10 p-1 rounded-md text-xs'>click</span>
              {{bran.updatedv1}}
            </div>
            </NuxtLink>
      </td>
    </tr>
   </tbody> 
  </template> 
  <template v-else>
    <tbody>
      <tr>
        <td colspan="9" class="text-warning text-center">No Data</td>
      </tr>
    </tbody>
  </template>
</table> 
 <Pagination
          class="flex justify-center"
          :total="this.$store.state.collector.branch.total"
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
      title: 'Branch List | Collector',
    }
  },
  middleware: ["authenticated","is_collector"],
  name: 'HomePage',
  data(){
      return{
        unstar: false,
        date_selected : null,
        id:null,
        page: 1,
        search:{},
        params: "",
        isOpen:false,
        date:{
        date: null,
        },
      }
  }, 
    async fetch(){
    await this.$store.dispatch("title", "Branch List");  
    await this.$store.dispatch('collector/get_branches',{"page":this.page,"params":this.params})
    if (this.date_selected == null)
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
    branches() {
      return this.$store.state.collector.branch.results
    },
  },
   methods:{
    onPageChange(page) {
      this.page = page;
      this.$fetch();
    },
    searchParams(){
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
</style>