<template>
<section class="mr-4">
<div class="mt-1 mx-1">
<div class="flex flex-col">
<div class="align-middle inline-block shadow overflow-x-auto sm:rounded-lg">
</div>
</div>
  <table class="border-collapse border border-white border-3 border-opacity-50  w-full table-auto m-3 mr-36">
  <thead>
    <tr class="leading-6">
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 ">Branch</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 ">Batches</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 ">Total Amount to be collected</th>
      <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 ">Fee not updated in qenq</th>
    </tr>
  </thead>
  <template v-if="branches && branches.length >0">
  <tbody class="leading-4 hover:bg-gray-600 ">
    <tr v-for="(bran, index) in branches" :key=index > 
      <td class="border 
               border-indigo-50  
                 text-center 
                 font-semibold 
                 text-purple-300">{{bran.name}}
      </td>
     <td class="px-2 
                py-1 
                whitespace-nowrap 
                border border-indigo-100  
                font-semibold 
                has-tooltip7" >
            <NuxtLink class="hover:text-black-500" 
                      :to="bran.batches > 0 ?`/branch-tracker/batches?id=${bran.id}`:''"  
                      :target="bran.batches > 0 ? '_blank' : ''"  >
                <div class="leading-5 text-green-200 uppercase text-center font-extrabold ">
                  <span v-if="bran.batches>0" class='tooltip7 shadow-l bg-yellow-600 text-white mt-4 p-1 rounded-md text-sm'>click</span>
                  {{bran.batches}}
                </div>
              </NuxtLink>
      </td>
      <td class="px-2 
                 py-1 
                 text-center 
                 whitespace-nowrap 
                 border border-indigo-50  
                 font-semibold">
         <span
            class="
              px-2
              inline-flex
              leading-6
              font-semibold
              rounded-md
              bg-gray-900
              text-green-100
            "
            >{{bran.collect}}</span>
      </td>
      <td class="border  
               border-indigo-50  
                 text-center 
                 font-semibold 
                 text-error">{{bran.notupdatedv1}}
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
          :total="this.$store.state.tracker.btrack_branch.total"
          :page="page"
          @pageChange="onPageChange"
        />
</div>
</section>
</template>

<script>
export default {
   head () {
    return {
      title: 'Branch List | Tracker',
    }
  },
  middleware: ["authenticated","is_branchtracker"],
  name: 'HomePage',
  data(){
      return{
        unstar: false,
        id:null,
        page: 1,
        search:{},
        params: "",
        isOpen:false,
      }
  }, 
    async fetch(){
    await this.$store.dispatch("title", "Branch List");  
    await this.$store.dispatch('tracker/getTrackerBranch',{"page":this.page,"params":this.params})
  },
 computed: {
    branches() {
      return this.$store.state.tracker.btrack_branch.results
    },
  },
   methods:{
    onPageChange(page) {
      this.page = page;
      this.$fetch();
    },
    searchParams(){
      this.params = new URLSearchParams(this.search).toString();
      this.$fetch()
    },
    clearSearchParams(){
      this.search = {}
      this.params = ""
      this.$fetch()
    }, 
  },
}
</script>
<style lang="postcss">
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