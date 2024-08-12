<template>
<section class="mr-4">
<div class="mt-1 mx-1">
<div class="flex flex-col">
<div class="align-middle inline-block shadow sm:rounded-lg">
<div class="text-right mt-0 mr-2 ml-0 px-1 py-1">
  <button @click="isOpen = !isOpen" class="text-xs bg-white py-1 px-2 rounded text-black align-middle cursor-default border border-black font-extrabold">Search</button>
</div>
    <div v-if="isOpen">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form action="#" method="POST" @submit.stop.prevent="handleSubmit(searchParams)">
          <div class="grid md:grid-cols-5 sm:grid-cols-1 gap-5 mt-0 ml-2">
                <div>
                  <label class="text-sm text-gray-50">Student Name</label>
                  <div>
                    <input type="text" name="text" id="text" autocomplete="text" class="mt-1 pt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md  text-black" v-model="search.student" >
                  </div>
                </div>
                <div>
                  <label class="text-sm text-gray-50">Contact Number</label>
                  <div>
                    <input type="text" name="number" id="number" autocomplete="number" class="mt-1 pt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md  text-black "  v-model="search.number" >
                  </div>
                </div>
                <div>
                  <label class="text-sm text-gray-50">Filter by month</label> <br>
                  <date-picker
                      append-to-body
                      :editable="false"
                      :default-value="new Date()"
                      v-model="date_selected"
                      placeholder="Select Date"
                  ></date-picker>
                </div>
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
  <table class="border-collapse border border-black border-3 border-opacity-50  w-full table-auto m-3 mr-36">
  <thead>
    <tr class="leading-2">
      <th class="border  border-black  bg-blue-100 text-black font-bold text-sm">Student Name</th>
      <th class="border  border-black  bg-blue-100  text-black font-bold text-sm">Mobile Number</th>
      <th class="border  border-black  bg-blue-100  text-black font-semibold text-sm">Paid amount</th>
      <th class="border  border-black  bg-blue-100  text-black font-semibold text-sm">Paid date</th>
      <!-- <th class="border  border-black  bg-blue-100  text-black font-semibold text-sm">Balance</th> -->
      <th class="border  border-black  bg-blue-100  text-black font-semibold text-sm">Target</th>
      <th class="border  border-black  bg-blue-100  text-black font-semibold text-sm">Branch</th>
      <th class="border  border-black  bg-blue-100  text-black font-semibold text-sm">Batch</th>
      <th class="border  border-black  bg-blue-100  text-black font-semibold text-sm">Course</th>
    </tr>
  </thead>
  <tbody class="leading-4">
    <tr v-for="(bran, index) in total" :key=index :class="{ 'bg-gray-800': index % 2}"> 
      <td class="border  
               border-black  
                 text-left 
                 font-semibold 
                 pt-2 
                 text-sm 
                 text-white">{{bran.studentname}}   
      </td>
      <td class="border  
               border-black  
                 text-center 
                 font-semibold 
                 text-green-200 
                 text-sm">{{ bran.contacts[0].number }}
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
                    border border-success ">{{bran.amount}}
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
                ">{{bran.date}}
            </button>
        </td>
        <!-- <td class="border  
                 border-black  
                   text-center 
                   font-semibold">
             <button  class="
                    btn btn-xs
                    inline-flex
                    text-xs
                    btn btn-glass
                    border border-info

                ">{{bran.balance}}
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
                ">{{bran.target}}
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
    </tr>
   </tbody>  
         <div v-if="verify==true" class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
            <div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
              <div class="flex justify-center max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900">
                  <div class="max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg">
                  <div class="flex justify-center pt-2">
                  <validation-observer ref="observer" v-slot="{ handleSubmit }">
                    <form @submit.stop.prevent="handleSubmit(verifySubmit)">
                    <div class="border border-success pr-4 pl-4 pt-4">
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
                      class="
                        px-6
                        py-3
                        bg-warning
                        rounded-full
                        text-black
                        font-medium
                        tracking-wide
                        hover:bg-warning
                      "
                      @click="verifySubmit()">
                    Verify
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
          :total="this.$store.state.verifier.updated.total"
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
      title: 'Updated List | Verifier',
    }
  },
  middleware: ["authenticated","is_verifier"],
  name: 'HomePage',
  data(){
      return{
        unstar: false,
        batch_selected:null,
        date_selected1:null,
        date_selected : null,
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
        paid:0.0
      }
  }, 
    async fetch(){
    let date = dayjs(new Date()).format("YYYY-MM-DD")
    if (this.date_selected == null&&this.$route.query.date){
      this.date.date= this.$route.query.date
      this.date_selected = this.$route.query.date
      this.params = new URLSearchParams(this.date).toString();
    }
    await this.$store.dispatch('verifier/getUpdated',{"page":this.page,"params":this.params,"bid":this.$route.query.bid})
    // else{
    //   this.searchParams()
    // }     
  },
 computed: {
    total() {
      return this.$store.state.verifier.updated.results
    },
  },
   methods:{
        maskNumber(numbers){
            return numbers.replace(/\d(?=\d{4})/g, "*");
          },
        disabledDate(date) {
          return date < new Date();
        },
        async verifySubmit(){
            this.verify = false;
            var data2 = {}
            const splits1 = this.target.replace('"','')
            const splits2 = this.paid.replace('"','')
            data2 = {
              "rid":this.rid,
              "verified":true,
              "target":this.target.replace('"',''),
              "paid":this.paid.replace('"','')
            }
            await this.$store.dispatch('verifier/Verify',data2);
            await this.$store.dispatch("alerts/alert", {
                text: "Successfully Verified the student",
                type: "success",
              });
            this.$store.dispatch("auth/resetmsg");
            this.$fetch()
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
          this.date_selected = null,
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
<style lang="postcss" scoped>
.badge {
  @apply inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700;
  &:hover {
    @apply bg-gray-300;
  }
}
</style>