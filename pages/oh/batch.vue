<template>
  <section class="mr-4">
    <div class="mt-1 mx-1">
      <div class="flex flex-col">
        <div
          class="
            align-middle
            inline-block
            shadow
            overflow-x-auto
            sm:rounded-lg
        "
        >
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
                <!-- <div>
                  <label class="text-xs text-gray-50">Filter by month</label> <br>
                  <date-picker
                      append-to-body
                      :editable="false"
                      :default-value="new Date()"
                      v-model="date_selected"
                      placeholder="Select Date"
                  ></date-picker>
                </div> -->
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
          <th class="border  border-white  bg-gray-800 text-white" rowspan="2">Batch code</th>
          <th class="border  border-white  bg-gray-800 text-white" rowspan="2">Total collected</th>
          <th class="border  border-white  bg-gray-800 text-white" rowspan="2">Total yet to collect</th>
          <th class="border  border-white  bg-gray-800 text-white" colspan="4">Total Student</th>
          <th class="border  border-white  bg-gray-800 text-white" rowspan="2">Signed Up</th>
          <th class="border  border-white  bg-gray-800 text-white" rowspan="2">Placement Form</th>
          <th class="border  border-white  bg-gray-800 text-white" rowspan="2">Data not verified</th>
          <th class="border  border-white  bg-gray-800 text-white" rowspan="2">Fee updated in Q-enquiry</th>
          <th class="border  border-white  bg-gray-800 text-white" rowspan="2">Fee not updated in Q-enquiry</th>
          <th class="border  border-white  bg-gray-800 text-white" rowspan="2">Fee verified</th>
          <th class="border  border-white  bg-gray-800 text-white" rowspan="2">Fee not verified</th>
        </tr>
        <tr>
          <th class="border border-indigo-100 bg-gray-800 text-sm font-sans text-white font-semibold">Unpaid</th>
          <th class="border border-indigo-100 bg-gray-800 text-sm font-sans text-white font-semibold">Partial Paid</th>
          <th class="border border-indigo-100 bg-gray-800 text-sm font-sans text-white font-semibold">Paid</th>
          <th class="border border-indigo-100 bg-gray-800 text-sm font-sans text-white font-semibold">Total</th>
        </tr>
      </thead>
        <tbody class="leading-4 bg-gray-400">
          <tr v-for="(bran, index) in branches" :key=index :class="{ 'bg-gray-500': index % 2}"> 
            <td class="border  border-indigo-50  text-center font-semibold text-black">
              {{bran.batchcode}}
            </td>
            <td class="px-2 py-1 whitespace-nowrap border border-indigo-100  font-semibold text-center has-tooltip7" >
            <!-- <NuxtLink class="hover:text-black-500" :to="`/verifier/not_updated?id=${bran.id}&date=${date.date}`"> -->
              <div class="leading-5 btn bg-accent btn btn-xs text-black uppercase  font-extrabold border border-black hover:bg-accent">
                {{bran.collected}}
              </div>
            <!-- </NuxtLink> -->
            </td>
            <td class="px-2 py-1 whitespace-nowrap border border-indigo-100  font-semibold text-center has-tooltip7" >
            <!-- <NuxtLink class="hover:text-black-500" :to="`/verifier/updated?id=${bran.id}&date=${date.date}`"> -->
              <div class="leading-5 btn  bg-indigo-400 btn btn-xs text-black uppercase text-center font-extrabold border border-black hover:bg-indigo-400">
                {{bran.yet_collect}}
              </div>
            <!-- </NuxtLink> -->
            </td>
            <td class="px-2 py-1 whitespace-nowrap border border-indigo-100  font-semibold has-tooltip7 text-center" >
              <NuxtLink class="hover:text-black-500" 
                        :to="bran.notpaid > 0 ?`/oh/not_paid?id=${bran.id}&date=${date.date}`:''"  
                        :target="bran.notpaid > 0 ? '_blank' : ''"  >
                <div class="leading-5 btn bg-error btn btn-xs text-black uppercase text-center font-extrabold hover:bg-error">
                  <span v-if="bran.notpaid>0" class='tooltip7 shadow-l bg-black border border-white text-white mt-12 p-1 rounded-md text-sm'>click</span>
                  {{bran.notpaid}}
                </div>
              </NuxtLink> 
            </td>
            <td class="px-2 py-1 whitespace-nowrap border border-indigo-100  font-semibold has-tooltip7 text-center" >
              <NuxtLink class="hover:text-black-500 " 
                        :to="bran.partial > 0 ?`/oh/partial_paid?id=${bran.id}&date=${date.date}`:''" 
                        :target="bran.partial > 0 ? '_blank' : ''"  >
                <div class="leading-5 btn bg-green-200 btn btn-xs text-black uppercase text-center font-extrabold hover:bg-green-200">
                  <span v-if="bran.partial>0" class='tooltip7 shadow-l bg-black border border-white text-white mt-12 p-1 rounded-md text-sm'>click</span>
                  {{bran.partial}}
                </div>
              </NuxtLink> 
            </td>
            <td class="px-2 py-1 whitespace-nowrap border border-indigo-100  font-semibold has-tooltip7 text-center" >
              <NuxtLink class="hover:text-black-500 " 
                        :to="bran.paid > 0 ?`/oh/total_paid?id=${bran.id}&date=${date.date}`:''"  
                        :target="bran.paid > 0 ? '_blank' : ''"  >
                <div class="leading-5 btn bg-success btn btn-xs text-black uppercase text-center font-extrabold hover:bg-success">
                  <span v-if="bran.paid>0" class='tooltip7 shadow-l bg-black border border-white text-white mt-12 p-1 rounded-md text-sm'>click</span>
                  {{bran.paid}}
                </div>
              </NuxtLink> 
            </td>
            <td class="px-2 py-1 whitespace-nowrap border border-indigo-100  font-semibold has-tooltip7 text-center" >
              <NuxtLink class="hover:text-black-500 " 
                        :to="bran.total > 0 ?`/oh/total?id=${bran.id}&date=${date.date}`:''" 
                        :target="bran.total > 0 ? '_blank' : ''"  >
                <div class="leading-5 btn bg-accent btn btn-xs text-black uppercase text-center font-extrabold hover:bg-accent">
                  <span v-if="bran.total>0" class='tooltip7 shadow-l bg-black border border-white text-white mt-12 p-1 rounded-md text-sm'>click</span>
                  {{bran.total}}
                </div>
              </NuxtLink>
            </td>
            <td class="px-2 py-1 whitespace-nowrap border border-indigo-100  font-semibold has-tooltip7 text-center" >
              <NuxtLink class="hover:text-black-500 " 
                        :to="bran.signed > 0 ?`/oh/signed?id=${bran.id}&date=${date.date}`:''" 
                        :target="bran.signed > 0 ? '_blank' : ''"  >
                <div class="leading-5 btn bg-indigo-300 btn btn-xs text-black uppercase text-center font-extrabold hover:bg-indigo-300">
                  <span v-if="bran.signed>0" class='tooltip7 shadow-l bg-black border border-white text-white mt-12 p-1 rounded-md text-sm'>click</span>
                  {{bran.signed}}
                </div>
              </NuxtLink> 
            </td>
            <td class="px-2 py-1 whitespace-nowrap border border-indigo-100  font-semibold has-tooltip7 text-center" >
              <NuxtLink class="hover:text-black-500 " 
                        :to="bran.profile > 0 ?`/oh/profile?id=${bran.id}&date=${date.date}`:''" 
                        :target="bran.profile > 0 ? '_blank' : ''"  > 
                <div class="leading-5 btn bg-blue-300 btn btn-xs text-black uppercase text-center font-extrabold hover:bg-blue-300">
                  <span v-if="bran.profile>0" class='tooltip7 shadow-l bg-black border border-white text-white mt-12 p-1 rounded-md text-sm'>click</span>
                  {{bran.profile}}
                </div>
              </NuxtLink>
            </td>
            <td class="px-2 py-1 whitespace-nowrap border border-indigo-100  font-semibold has-tooltip7 text-center" >
              <NuxtLink class="hover:text-black-500 " 
                        :to="bran.dataverified > 0 ?`/oh/data_verify?id=${bran.id}&date=${date.date}`:''" 
                        :target="bran.dataverified > 0 ? '_blank' : ''"  > 
                <div class="leading-5 btn bg-purple-400 btn btn-xs text-black uppercase text-center font-extrabold hover:bg-purple-400">
                  <span v-if="bran.dataverified>0" class='tooltip7 shadow-l bg-black border border-white text-white mt-12 p-1 rounded-md text-sm'>click</span>
                  {{bran.dataverified}}
                </div>
              </NuxtLink> 
            </td>
            <td class="px-2 py-1 whitespace-nowrap border border-indigo-100  font-semibold has-tooltip7 text-center" >
              <NuxtLink class="hover:text-black-500 " 
                        :to="bran.updatedv1 > 0 ?`/oh/updated?id=${bran.id}&date=${date.date}`:''"
                        :target="bran.updatedv1 > 0 ? '_blank' : ''"  >
                <div class="leading-5 btn bg-green-400 btn btn-xs text-black uppercase text-center font-extrabold hover:bg-green-400 border border-black">
                  <span v-if="bran.updatedv1>0" class='tooltip7 shadow-l bg-black border border-white text-white mt-12 p-1 rounded-md text-sm'>click</span>
                  {{bran.updatedv1}}
                </div>
              </NuxtLink> 
            </td>
            <td class="px-2 py-1 whitespace-nowrap border border-indigo-100  font-semibold has-tooltip7 text-center" >
              <NuxtLink class="hover:text-black-500 " 
                        :to="bran.notupdatedv1 > 0 ?`/oh/not_updated?id=${bran.id}&date=${date.date}`:''" 
                        :target="bran.notupdatedv1 > 0 ? '_blank' : ''"  > 
                <div class="leading-5 btn bg-indigo-300 btn btn-xs text-black uppercase text-center font-extrabold hover:bg-indigo-300 border border-black">
                  <span v-if="bran.notupdatedv1>0" class='tooltip7 shadow-l bg-black border border-white text-white mt-12 p-1 rounded-md text-sm'>click</span>
                  {{bran.notupdatedv1}}
                </div>
              </NuxtLink> 
            </td>
            <td class="px-2 py-1 whitespace-nowrap border border-indigo-100  font-semibold has-tooltip7 text-center" >
              <NuxtLink class="hover:text-black-500 " 
                        :to="bran.verified > 0 ?`/oh/verfied?id=${bran.id}&date=${date.date}`:''" 
                        :target="bran.verified > 0 ? '_blank' : ''"  > 
                <div class="leading-5 btn bg-green-400 btn btn-xs text-black uppercase text-center font-extrabold hover:bg-green-400 border border-black">
                  <span v-if="bran.verified>0" class='tooltip7 shadow-l bg-black border border-white text-white mt-12 p-1 rounded-md text-sm'>click</span>
                  {{bran.verified}}
                </div>
              </NuxtLink> 
            </td>
            <td class="px-2 py-1 whitespace-nowrap border border-indigo-100  font-semibold has-tooltip7 text-center" >
              <NuxtLink class="hover:text-black-500 " 
                        :to="bran.notverified > 0 ?`/oh/not_verified?id=${bran.id}&date=${date.date}`:''"  
                        :target="bran.notverified > 0 ? '_blank' : ''"  > 
                <div class="leading-5 btn bg-indigo-300 btn btn-xs text-black uppercase text-center font-extrabold hover:bg-indigo-300 border border-black">
                  <span v-if="bran.notverified>0" class='tooltip7 shadow-l bg-black border border-white text-white mt-12 p-1 rounded-md text-sm'>click</span>
                  {{bran.notverified}}
                </div>
              </NuxtLink> 
            </td>
          </tr>
        </tbody>  
    </table>
    <Pagination
      class="flex justify-center"
      :total="this.$store.state.oh.batch.total"
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
      title: 'Batch List | OH',
    }
  },
  middleware: ["authenticated","is_oh"],
  name: 'HomePage',
  data(){
    return{
      unstar: false,
      date_selected : null,
      batch_selected:null,
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
    await this.$store.dispatch('oh/getBatch',{"page":this.page,"params":this.params,"id":this.$route.query.id})
    // if (this.date_selected == null& this.batch_selected == null){
    //   this.date.date= dayjs(new Date()).format("YYYY-MM-DD")
    //   this.params = new URLSearchParams(this.date).toString();
    // }
    // else{
    //   this.searchParams()
    // } 
    this.date.date = this.$route.query.date
    await this.$store.dispatch('tracker/getBatchFilter')
  },
  computed: {
    branches() {
      return this.$store.state.oh.batch.results
    },
  },
  methods:{    
    onPageChange(page) {
      this.page = page;
      this.$fetch();
    },
    searchParams(){
      if(this.batch_selected){
        this.search.batch = this.batch_selected.id
      }
      // if(this.date_selected){
      //   this.search.date = dayjs(this.date_selected).format("YYYY-MM-DD")
      //   this.date.date = this.search.date
      // }
      // else{
      //   this.search.date = dayjs(new Date()).format("YYYY-MM-DD")
      // }
      this.params = new URLSearchParams(this.search).toString();
      this.$fetch()
    },
    clearSearchParams(){
      this.search = {}
      this.params = ""
      this.date_selected = null,
      this.batch_selected = null,
      this.$fetch()
    },
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