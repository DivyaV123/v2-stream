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
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 " rowspan="2">Batch code</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 " rowspan="2">Branches</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 " colspan="4">Total Students</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 " rowspan="2">Status</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 " rowspan="2">Trainer</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 " rowspan="2">Subject</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 " rowspan="2">Course</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 " rowspan="2">Q-enquiry batches</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 " rowspan="2">Target fees</th>
    </tr>
    <tr>
          <th class="border border-indigo-100 bg-gray-800 text-sm font-sans text-white font-semibold">Sign up</th>
          <th class="border border-indigo-100 bg-gray-800 text-sm font-sans text-white font-semibold">Placement form</th>
          <th class="border border-indigo-100 bg-gray-800 text-sm font-sans text-white font-semibold">Verified</th>
          <th class="border border-indigo-100 bg-gray-800 text-sm font-sans text-white font-semibold">Not verified</th>
        </tr>
  </thead>
  <template v-if="branches && branches.length >0">
  <tbody class="leading-4 hover:bg-gray-700 " >
    <tr v-for="(bran, index) in branches" :key=index :class="{ 'bg-gray-800': index % 2}"> 
      <td class="border 
               border-info 
                 text-center 
                 font-semibold 
                 text-white">{{bran.batchcode}}
      </td>
      <td class="border 
               border-accent  
                 text-center 
                 font-semibold 
                 text-white">{{bran.branch_name}}
      </td>
     <td class="px-2 
                py-1 
                whitespace-nowrap 
                border border-info 
                font-semibold 
                has-tooltip7
                text-center" >
            <nuxt-link class="hover:text-black-500" 
                      :to="bran.signed_up > 0 ?
                      {
                        path: 'data_verifier/signup',
                        query: {
                          id: bran.id,
                          type: 'si',
                        },
                      }:''"  
                      :target="bran.signed_up > 0 ? '_blank' : ''"  >
                <div class="leading-5 text-black uppercase text-center font-extrabold btn bg-blue-300 btn-xs border border-black hover:bg-blue-300 ">
                  <span v-if="bran.signed_up>0" class='tooltip7 shadow-l bg-blue-300 text-white mt-10 p-1 rounded-md text-sm'>click</span>
                  {{bran.signed_up}}
                </div>
              </nuxt-link>
      </td>
       <td class="px-2 
                py-1 
                whitespace-nowrap 
                border border-accent 
                font-semibold 
                has-tooltip7
                text-center" >
            <NuxtLink class="hover:text-black-500" 
                      :to="bran.placement_form > 0 ?
                      {
                        path: 'data_verifier/profile',
                        query: {
                          id: bran.id,
                          type: 'pl',
                        },
                      }:''"  
                      :target="bran.placement_form > 0 ? '_blank' : ''"  >
                <div class="leading-5 uppercase text-black font-extrabold btn bg-accent btn-xs border border-black hover:bg-accent">
                  <span v-if="bran.placement_form>0" class='tooltip7 shadow-l bg-blue-300 text-white mt-10 p-1 rounded-md text-sm'>click</span>
                  {{bran.placement_form}}
                </div>
              </NuxtLink>
      </td>
       <td class="px-2 
                py-1 
                whitespace-nowrap 
                border border-info  
                font-semibold 
                has-tooltip7
                text-center" >
            <NuxtLink class="hover:text-black-500" 
                      :to="bran.verified > 0 ?
                      {
                        path: 'data_verifier/verified',
                        query: {
                          id: bran.id,
                          type: 've',
                        },
                      }:''"  
                      :target="bran.verified > 0 ? '_blank' : ''"  >
                <div class="leading-5 text-black uppercase text-center font-extrabold btn bg-purple-300 btn-xs border-black hover:bg-purple-300">
                  <span v-if="bran.verified>0" class='tooltip7 shadow-l bg-blue-300 text-white mt-10 p-1 rounded-md text-sm'>click</span>
                  {{bran.verified}}
                </div>
              </NuxtLink>
      </td>
       <td class="px-2 
                py-1 
                whitespace-nowrap 
                border border-accent  
                font-semibold 
                has-tooltip7
                text-center" >
            <NuxtLink class="hover:text-black-500" 
                      :to="bran.not_verified > 0 ?
                      {
                        path: 'data_verifier/not_verified',
                        query: {
                          id: bran.id,
                          type: 'nve',
                        },
                      }:''"  
                      :target="bran.not_verified > 0 ? '_blank' : ''"  >
                <div class="leading-5 text-black uppercase text-center font-extrabold btn btn-error btn-xs border-black">
                  <span v-if="bran.not_verified>0" class='tooltip7 shadow-l bg-blue-300 text-white mt-10 p-1 rounded-md text-sm'>click</span>
                  {{bran.not_verified}}
                </div>
              </NuxtLink>
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
                    >{{"Active"}}</span>
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
               border-accent  
                 text-center 
                 font-semibold 
                 text-white">{{bran.trainer_name}}
      </td>
      <td class="border 
               border-info  
                 text-center 
                 font-semibold 
                 text-white">{{bran.subject_name}}
      </td>
      <td class="border 
               border-accent  
                 text-center 
                 font-semibold 
                 text-white">{{bran.course_name}}
      </td>
       <td class="border 
               border-info  
                 text-center 
                 font-semibold 
                 text-white">
        <div v-if="bran.vbatches.length>0">  
            <span
                class="
                px-2
                inline-flex
                leading-6
                text-white
                "
                >{{bran.vbatches[0].name}}</span>
        </div>
         <div v-else>  
            <span
                class="
                px-2
                inline-flex
                leading-6
                text-indigo-200
                "
                >{{"No batches found"}}</span>
        </div>

      </td>
      <td class="border 
               border-accent  
                 text-center 
                 font-semibold 
                 text-white">{{bran.target_fees}}
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
          :total="this.$store.state.dataverifier.branch.total"
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
      title: 'Branch List | Data Verifier',
    }
  },
  middleware: ["authenticated","is_dataverifier"],
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
      }
  }, 
    async fetch(){
    await this.$store.dispatch("title", "Branch List");  
    await this.$store.dispatch('dataverifier/get_branches',{"page":this.page,"params":this.params})
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
    branches() {
      return this.$store.state.dataverifier.branch.results
    },
  },
   methods:{
    onPageChange(page) {
      this.page = page;
      this.$fetch();
    },
    searchParams(){
      if(this.batch_selected)
          {
            this.search.id = this.batch_selected.id
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