<template>
<div>
  <div class="flex justify-center">
  <h5 class="font-bold text-black btn-sm text-md mt-0 pt-0 text-center btn bg-indigo-200 hover:bg-indigo-200">Balance with Respect to your successful Payment will be reflected after 24 to 48 Hours of your Payment Date</h5>
  </div>
  <div class="flex flex-wrap justify-center">
    <div class="card shadow-lg bg-base-200 m-4" v-for="pay in mycourse" :key="pay.id">
    <div class="card-body pt-2">
      <div v-if="pay.status=='captured'" class="text-center">
         <h2 class="  
                       text-xl 
                       font-extrabold 
                       btn btn-glass
                       btn btn-xs
                       text-accent
                       m-4
                       mt-4
                       text-center">
						{{pay.status}}
					</h2>
      </div>
      <div v-if="pay.status=='failed'" class="text-center">
         <h2 class="
                       text-xl 
                       font-extrabold 
                       btn btn-glass
                       btn btn-xs
                       text-red-400
                       m-4
                       mt-4
                       text-center">
						{{pay.status}}
					</h2>
      </div>
       <div v-if="pay.status=='created'" class="text-center">
         <h2 class="text-white  
                       text-xl 
                       font-extrabold 
                       btn btn-glass
                       btn btn-xs
                      
                       m-4
                       mt-4
                       text-center">
						{{pay.status}}
					</h2>
      </div>
      <div v-if="pay.status=='authorized'" class="text-center">
         <h2 class="
                       text-xl 
                       font-extrabold 
                       btn btn-glass
                       btn btn-xs
                       text-info
                       m-4
                       mt-4
                       text-center">
						{{pay.status}}
					</h2>
      </div>

					<hr>
		<div>
  
				<h6 class="text-gray-800 
                     leading-8 
                     font-mono 
                     inline-flex 
                     ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 mt-1.5 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <label class="text-white">Paid Amount:</label>
                  <span class="font-sans font-medium text-white btn btn-glass border border-info btn-xs mt-1">
                    {{ pay.amount }} 
                  </span>
				</h6> 
        <hr>
				<h6 class="text-gray-800 
                     leading-8 
                     font-mono 
                     inline-flex ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 mt-1.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <label class="text-white">Paid Date:</label>
                    <span class="font-sans font-medium text-white btn btn-glass border border-accent btn-xs mt-1 font-xs">
                      {{ pay.date }} 
                    </span>
				</h6> 
        <hr>
		</div>
        <h6 class="text-gray-800 
                     leading-8 
                     font-mono 
                     inline-flex 
                     ml-4 ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 mt-1.5 text-purple-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 100 2h1a2 2 0 011.732 1H7a1 1 0 100 2h2.732A2 2 0 018 11H7a1 1 0 00-.707 1.707l3 3a1 1 0 001.414-1.414l-1.483-1.484A4.008 4.008 0 0011.874 10H13a1 1 0 100-2h-1.126a3.976 3.976 0 00-.41-1H13a1 1 0 100-2H7z" clip-rule="evenodd" />
                    </svg>
                    <label class="text-white">Target:</label>
                    <div v-if="pay.v1payment[0]">
                      <span class="font-sans font-medium text-white btn btn-glass border border-purple-300 btn-xs mt-1 font-xs">
                        {{ pay.v1payment[0].target}}
                      </span>
                    </div>
                    <div v-else>
                      <span class="font-sans font-medium text-white btn btn-glass border border-purple-300 btn-xs mt-1 font-xs">
                        {{"Under Demo days"}}
                      </span>
                    </div>
				</h6> 
        <hr>
        <h6 class="text-gray-800 
                     leading-8 
                     font-mono 
                     inline-flex 
                     ml-4 ">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 mt-1.5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <label class="text-white">Balance:</label>
                  <div v-if="pay.v1payment[0]">
                    <span class="font-sans font-medium text-white btn btn-glass border border-indigo-300 btn-xs mt-1 font-xs">
                      {{ pay.v1payment[0].balance}}
                    </span>
                  </div>
                  <div v-else>
                    <span class="font-sans font-medium text-white btn btn-glass border border-indigo-300 btn-xs mt-1 font-xs">
                      {{ "Under Demo days"}}
                    </span>
                  </div>
				</h6> 
        <hr>
    </div> 

		</div>
  </div>
     <paginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="onPageChange"
      :prev-text="'Previous'"
      :next-text="'Next'"
      :container-class="'flex pl-0 rounded list-none flex-wrap justify-center m-4'"
      :page-class="'flex w-8 h-8 mx-1 p-0  items-center justify-center leading-tight relative border border-solid bg-gray-800 border-success text-success font-extrabold'"
      :next-class="'btn btn-sm'"
      :prev-class="'btn btn-sm'"
    >
    </paginate>

</div>
</template>

<script>
export default {
  middleware: ["authenticated","is_student"],
	head () {
    return {
			title: 'My Course | Student',
    }
  },
	data(){
		return {
      data :{},
			showSuccess : false,
			check : 0,
      page:1,
      perPage: 25,
			isOpen:false,
			date_selected : null,
			batchdate:null,
			search:{},
			course_selected : null,
			subject_selected: null,
      		params: "",
			date:{
				date: null
			},
      none:null
		}
	},
	async fetch(){
		await this.$store.dispatch('title','My Payment')
		await this.$store.dispatch('razorpay/getMyPayment',this.page)
    await this.$store.dispatch('student/getUserdetails')
	},
  methods :{

        onPageChange(page)
        {
          this.page = page;
          this.$fetch();
        },
  },
	computed: {
        mycourse()
        {
          return this.$store.state.razorpay.my_payment.results
        },
        pageCount()
        {
          return Math.ceil(this.$store.state.razorpay.counts / this.perPage);
        },
	}
}
</script>

<style lang="postcss" scoped>
.tooltip8 {
  @apply invisible absolute;
}
.has-tooltip8:hover .tooltip8 {
  @apply visible z-50;
}
</style>