<template>
<div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
   	<div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
    <div class="max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900 modal-card-body">
    <div class="hello max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg">
      <div class="flex justify-center items-center">
        <div class="bg-black rounded-lg">
          <div class="w-full border-t-8 border-b-8  border-blue-100 rounded-lg flex">
            <div class="w-full pr-4 text-center">
              <table class="border-collapse border border-black  w-full table-auto ">
                <thead>
                    <tr>
                        <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-md">Status</th>
                        <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-md">Comment</th>
                        <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-md">Author</th>
                        <th class="border  border-indigo-50  bg-gray-800 text-indigo-50 font-semibold text-md">Commented On</th>
                    </tr>
                </thead>
                <tbody class="bg-gray-900 border border-gray-100">
                    <tr v-for="(bran, index) in comment" :key="index" class="border border-accent"> 
                    <td class="border  
                        border-gray-100
                        font-semibold 
                        text-blue-200
                        text-md">
                        <span class="text-warning ml-1">{{bran.statusname}}</span>

                    </td>
                    <td class="border  
                        border-gray-100
                        font-semibold 
                        text-blue-200
                        text-md">
                        <span class="text-warning ml-1">{{bran.comment}}</span>

                    </td>
                    <td class="  
                        font-semibold 
                        text-warning
                        text-md
                        border  
                        border-gray-100">  
                        <span class="text-success ml-1">{{bran.user}}</span>
                    </td>
                    <td class="  
                        font-semibold 
                        text-warning
                        text-md
                        border  
                        border-gray-100">  
                        <span class="text-info ml-1">{{bran.created}}</span>
                    </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
         <div @click="submit">
					  <button class="w-full text-right text-white rounded-lg text-md hover:text-white hover:underline" @click="$emit('cousubmit', 'close')">Back</button>
          </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
    data(){
      return{
        comment:[],
      }
    },
    props: { comments: Array },
    async fetch(){
        this.comment = this.comments

    },
 methods: {
    async submit() {
      this.$emit("cousubmit", "close");
      location.reload()
    }
  }
}
</script>
<style>
</style>