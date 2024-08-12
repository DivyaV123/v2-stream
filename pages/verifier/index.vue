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
                  <label class="text-xs text-gray-50">Filter by month</label><br>
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
    <tr class="leading-6">
      <th class="border  border-white  bg-gray-400 text-black ">Branch</th>
      <th class="border  border-white  bg-gray-400 text-black ">Batches</th>
      <th class="border  border-white  bg-gray-400 text-black ">Fee not updated in qenquiry</th>
      <th class="border  border-white  bg-gray-400 text-black ">Fee updated in qenquiry</th>
      <th class="border  border-white  bg-gray-400 text-black ">Fee updates verified</th>
      <th class="border  border-white  bg-gray-400 text-black ">Fee updates not verified</th>
    </tr>
  </thead>
  <template v-if="branches && branches.length >0">
  <tbody class="leading-4 bg-gray-700">
    <tr v-for="(bran, index) in branches" :key=index :class="{ 'bg-gray-800': index % 2}"> 
      <td class="border  
               border-indigo-50  
                 text-center 
                 font-semibold 
                 text-gray-100">{{bran.name}}</td>
      <td class="px-2 
                 py-1 
                 whitespace-nowrap 
                 border border-indigo-100  
                 font-semibold 
                 text-center 
                 has-tooltip7" >
         <NuxtLink class="hover:text-black-500" 
                   :to="bran.batches > 0 ?`/verifier/batch?id=${bran.id}&date=${date.date}`:''" 
                   :target="bran.batches > 0 ? '_blank' : ''"  >
            <div class="leading-5  text-white uppercase  font-extrabold">
              <span v-if="bran.batches>0" class='tooltip7 shadow-l bg-white text-black mt-4 p-1 rounded-md text-sm'>click</span>
              {{bran.batches}}
            </div>
           </NuxtLink>
      </td>
      <td class="px-2 
                 py-1 
                 whitespace-nowrap 
                 border border-indigo-100  
                 font-semibold 
                 text-center 
                 has-tooltip7" >
         <NuxtLink class="hover:text-black-500" 
                   :to="bran.notupdatedv1 > 0 ?`/verifier/not_updated?bid=${bran.id}&date=${date.date}`:''" 
                   :target="bran.notupdatedv1 > 0 ? '_blank' : ''"  >
            <div class="leading-5 btn btn-error btn btn-xs text-black uppercase  font-extrabold border border-black">
              <span v-if="bran.notupdatedv1>0" class='tooltip7 shadow-l bg-white text-black mt-12 p-1 rounded-md text-sm'>click</span>
              {{bran.notupdatedv1}}
            </div>
        </NuxtLink>
      </td>
      <td class="px-2 
                 py-1 
                 whitespace-nowrap 
                 border border-indigo-100  
                 font-semibold 
                 text-center 
                 has-tooltip7" >
         <NuxtLink class="hover:text-black-500" 
                   :to="bran.updatedv1 > 0 ?`/verifier/updated?bid=${bran.id}&date=${date.date}`:''"  
                   :target="bran.updatedv1 > 0 ? '_blank' : ''"  >
            <div class="leading-5 btn btn-success btn btn-xs text-black uppercase text-center font-extrabold border border-black">
              <span v-if="bran.updatedv1>0" class='tooltip7 shadow-l bg-white text-black mt-12 p-1 rounded-md text-sm'>click</span>
              {{bran.updatedv1}}
            </div>
          </NuxtLink>
      </td>
      <td class="px-2 
                 py-1 
                 whitespace-nowrap 
                 border border-indigo-100  
                 font-semibold 
                 has-tooltip7 
                 text-center" >
         <NuxtLink class="hover:text-black-500" 
                   :to="bran.verified > 0 ?`/verifier/verified?bid=${bran.id}&date=${date.date}`:''"  
                   :target="bran.verified > 0 ? '_blank' : ''"  >
            <div class="leading-5 btn bg-green-400 btn btn-xs text-black uppercase text-center font-extrabold hover:bg-green-400">
              <span v-if="bran.verified>0" class='tooltip7 shadow-l bg-white text-black mt-12 p-1 rounded-md text-sm'>click</span>
              {{bran.verified}}
            </div>
          </NuxtLink>
      </td>
      <td class="px-2 
                 py-1 
                 whitespace-nowrap 
                 border border-indigo-100  
                 font-semibold 
                 has-tooltip7 
                 text-center" >
         <NuxtLink class="hover:text-black-500 " 
                   :to="bran.notverified > 0 ?`/verifier/not_verified?bid=${bran.id}&date=${date.date}`:''"
                   :target="bran.notverified > 0 ? '_blank' : ''"  >
            <div class="leading-5 btn bg-red-600 btn btn-xs text-black uppercase text-center font-extrabold hover:bg-red-400">
              <span v-if="bran.notverified>0" class='tooltip7 shadow-l bg-white text-black mt-12 p-1 rounded-md text-sm'>click</span>
              {{bran.notverified}}
            </div>
          </NuxtLink>
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
 <Pagination
          class="flex justify-center"
          :total="this.$store.state.verifier.branches.total"
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
      title: 'Branch List | Verifier',
    }
  },
 middleware: ["authenticated","is_verifier"],
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
    await this.$store.dispatch('verifier/getBranch',{"page":this.page,"params":this.params})
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
      return this.$store.state.verifier.branches.results
    },
  },
   methods:{
        onPageChange(page) 
        {
          this.page = page;
          this.$fetch();
        },
        searchParams()
        {
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
        clearSearchParams()
        {
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