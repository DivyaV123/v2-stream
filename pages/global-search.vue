<template>
  <div>
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <form action="#" method="GET" @submit.stop.prevent="handleSubmit(searchParams)">
        <div class="p-5 card bg-base-200">
          <div class="grid md:grid-cols-3 sm:grid-cols-2 gap-5 mt-0 ml-2">
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Contact Number</span>
              </label> 
              <input placeholder="Contact Number Here" class="input input-bordered input-sm" type="tel" v-model="selected_number">
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Email Address</span>
              </label>
              <input placeholder="Email Address Here" class="input input-bordered input-sm" type="text" v-model="selected_email">
            </div>
            <div class="justify-self-right" >
              <button class="btn btn-outline btn-success btn-sm" @click="searchParams()">
                Search
              </button>
              <button class="btn btn-outline btn-goast btn-sm"  @click="clearSearchParams()">
                Clear
              </button>
            </div>
          </div>
        </div>
        </form>
      </validation-observer>
      <div class="" v-if="students.length > 0">
          <div class="flex flex-wrap justify-center">
      <div
        v-for="(batch, i) in students"
        :key="i"
        class="card shadow-lg bg-base-200 m-4"
      >
        <div class="card-body pt-2">
            <h2 class="card-title">{{ batch.first_name }}</h2>
            <p>  
                <span class="font-semibold">
                    Number
                </span> : 
                <span v-for="(number, index) in batch.number" :key="index">
                    {{ number.number }}
                </span>
            </p>
          <div class="divider mt-0 mb-0"></div>
          <p>
            <span class="font-semibold">
                Email Address
            </span> : 
            <span v-for="(number, index) in batch.email" :key="index">
                {{ number.email }}
            </span>
          </p>
          <div class="divider mt-0 mb-0"></div>
          <p>
            <span class="font-semibold">
                Payment
            </span> : 
            <span v-for="(number, index) in batch.payments" :key="index" class="grid md:grid-cols-3 sm:grid-cols-2 gap-5 mt-0 ml-2">
                <!-- <div > -->
                    <div class="form-control">
                    <p><span class="font-semibold">Target Fee : </span> {{ number.target }} </p>
                    </div>
                    <div class="form-control">
                    <p><span class="font-semibold">Paid : </span>{{ number.paid }}</p>
                    </div>
                    <div class="form-control">
                    <p><span class="font-semibold">Balance : </span>{{ number.balance}}</p>
                    </div>
                    
                <!-- </div> -->
            </span>
          </p>
          <div class="divider mt-0 mb-0"></div>
          <p>
            <h4 class="font-medium">
                Attending Batches
            </h4>  
            <span v-for="(number, index) in batch.attendance" :key="index">
                <div class="grid md:grid-cols-4 sm:grid-cols-2 gap-5 mt-0 ml-2">
                  <div class="form-control">
                    <p> <span class="font-semibold">Batch Name : </span></p>
                    <p> <span> </span>{{ number.batch }}{{" - "}}{{ number.trainer }} </p>
                    </div>
                    <div class="form-control">
                    <p><span class="font-semibold">Class Count : </span>{{ number.count }}</p>
                    </div>
                    <div class="form-control">
                    <p><span class="font-semibold">Reason : </span>{{ number.reasons}}</p>
                    </div>
                    <div v-for="group in $store.state.auth.user.groups" :key="group.id">
                      <div v-if="group.name == 'tracker'" >
                    <div class="form-control">
                    <p><span class="font-semibold">Allow-block : </span>
                    <button class="inline-flex 
                         justify-center 
                         py-1 
                         px-15 
                         border border-black 
                         shadow-sm 
                         text-xs 
                         font-extrabold 
                         rounded-md 
                         text-black 
                         bg-success 
                         btn-sm

                         " v-if="number.blocked ==true" v-on:click="blockk=true,sid=batch.id,bid=number.bid,sstudent=batch.first_name">Unblock</button><br>
          <button class="inline-flex 
                         justify-center 
                         py-1 
                         px-15 
                         border border-error  
                         shadow-sm 
                         text-xs 
                         font-extrabold 
                         rounded-md 
                         text-error
                         btn-sm
                         " v-if="number.blocked ==false" v-on:click="unblock=true,bsid=number.id,sid=batch.id,bid=number.bid,sstudent=batch.first_name">Block</button><br></p>
                    </div>
                      </div>
                    </div>
                    <br>                
                </div>
            </span>
        </div>
      </div>
    </div>
    </div>
    <div v-else>
        <div class="flex flex-wrap justify-center mt-4">
           <h1 class="font-bold text-2xl">Search Student by Mail Address or Contact Number</h1> 
        </div>
    </div>

    <div v-if="unblock==true" class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
            <div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
            <div class="flex justify-center max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900">
            <div class="max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg">
                  <div class="flex justify-center pt-2">
                  <validation-observer ref="observer" v-slot="{ handleSubmit }">
                    <form @submit.stop.prevent="handleSubmit(confirmClose)">
                      <div class="border border-white pb-4 pl-4 pr-4">
                        <label for="country" class="block text-sm font-extrabold pb-1 pr-20 text-white">Comment</label>
                        <ValidationProvider rules="required" v-slot="{ errors }"> 
                              <div class="mt-1 relative rounded-md shadow-sm ">
                              <textarea id="" cols="30" rows="5" v-model="comment" class="mt-1 block w-full shadow-sm sm:text-sm rounded-md leading-5 pl-6 pt-2  text-black" placeholder="Enter comment" ></textarea>
                              </div>   
                              <span class="text-white">{{ errors[0] }}</span>
                        </ValidationProvider>             
                      </div>
                       <div class="border border-white pt-3 pr-4 pl-4 pb-6">
                            <label for="country" class="block text-sm font-extrabold text-blue-5000">Reason</label>
                             <ValidationProvider
                                    rules="required" v-slot="{ errors }"
                                > 
                                    <span
                                    class="
                                        z-10
                                        h-full
                                        leading-snug
                                        font-normal
                                        text-center
                                        absolute
                                        bg-transparent
                                        rounded
                                        text-base
                                        pr-2
                                        py-2
                                    "
                                    >
                                    </span>
                                    <v-select
                                        class="border border-white text-sm selected"
                                        label="name"
                                        v-model="reason"
                                        :options="$store.state.tracker.reason"
                                        :reduce="name => name.id"
                                        placeholder="Select reason"
                                    ></v-select>
                                <span class="text-white">{{ errors[0] }}</span>
                                </ValidationProvider> 

                            </div> 
                            <br>
                        <button
                          @click="unblock = false"
                          class="
                            px-6
                            py-3
                            bg-transparent
                            p-3
                            rounded-full
                            text-red-500
                            hover:bg-gray-100
                            hover:text-red-500
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
                              bg-red-600
                              rounded-full
                              text-black-500
                              font-medium
                              tracking-wide
                              hover:bg-red-500
                            ">
                          Block
                          </button>
                          </form>
                    </validation-observer>
                  </div>
            </div>
          </div>
        </div>

         <div v-if="blockk==true" class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
            <div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
            <div class=" max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900 modal-card-body">
            <div class="hello max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg">
              <p class="text-white">Are you sure you want to Unblock?</p>
                  <div class="flex justify-end pt-2">
                    <button
                      @click="blockk = false"
                      class="
                        px-6
                        py-3
                        bg-transparent
                        p-3
                        rounded-full
                        text-red-500
                        hover:bg-gray-100
                        hover:text-red-500
                        mr-2
                      "
                    >
                      Cancel
                    </button>
                    <button
                      @click="confirmSubmit()"
                      class="
                        px-6
                        py-3
                        bg-red-600
                        rounded-full
                        text-black-500
                        font-medium
                        tracking-wide
                        hover:bg-red-500
                      "
                    >
                    Unblock
                    </button>
                  </div>
            </div>
          </div>
        </div>
    </div>

    
</template>

<script>
export default {
    head() {
      return {
          title: "Global Search | Qspiders Online",
      };
  },
  middleware: 'authenticated',
//   name: 'HomePage',
  data(){
      return{
        search:{},
        params: null,
        selected_name: "",
        selected_number : "",
        selected_email : "",
        id:null,
        bsid:null,
        bid:null,
        sid:null,
        unblock:false,
        blockk:false,
        comment:"",
        reason:null,

        // students : []
      }
  }, 
    async fetch(){
        console.log("params", this.params)
        await this.$store.dispatch('tracker/getStudents',{"params":this.params})
        await this.$store.dispatch('tracker/getBlockreason')
        // if (this.selected_number != '' || this.selected_email != '' ){
        //     // this.searchParams()
        //     console.log("in fetch statement")
        //     await this.$store.dispatch('tracker/getStudents',{"params":this.params})
        //     console.log("results", this.$store.state.tracker.students)
        // }
    // if (this.date_selected == null & this.batch_selected == null)
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
      
    students() 
    {
        console.log("students", this.$store.state.tracker.students)
      return this.$store.state.tracker.students
    }, 
  },
    methods:{
        searchParams(){
        console.log("in search paramss", this.selected_email)
          if(this.selected_email){
            this.search.email = this.selected_email
          }
          if(this.selected_number){
            this.search.number = this.selected_number
          }
          this.params = new URLSearchParams(this.search).toString();
          
          this.$fetch()
        // let courses = this.$axios.get('/tracker/global-search/?'+this.params);
        // console.log(courses)
        // this.students = courses.data.results
        // console.log("this.students" , this.students)
        },
        clearSearchParams(){
          this.search = {}
          this.params = ""
          this.selected_name=null
          this.selected_email = null
          this.selected_number=null          
        //   this.$fetch()
        },

        async confirmSubmit()
          {
          this.blockk = false;
            var data2 = {}
            data2 = {
              "sid":this.sid,
              "bid":this.bid,
            }
          await this.$store.dispatch('tracker/UnBlock',data2);
          await this.$store.dispatch("alerts/alert", {
              text: "Successfully Unblocked the student "+this.sstudent,
              type: "success",
            });
            this.$store.dispatch("auth/resetmsg");
          this.blockk=false
          this.$fetch();
        },

        async confirmClose()
        {
          this.unblock = false;
          var data1 = {}
          data1 = {
            "comment":this.comment,
            "rid":this.reason,
            "sid":this.sid,
            "bid":this.bid,
            "bsid":this.bsid
          }
          console.log("data1",data1)
          await this.$store.dispatch('tracker/Block',data1);
          await this.$store.dispatch("alerts/alert", {
              text: "Successfully Blocked the student  " +this.sstudent,
              type: "success",
            });
            this.$store.dispatch("auth/resetmsg");
          this.unblock = false;
          this.$fetch();
        },
    }
}
</script>

<style>

</style>