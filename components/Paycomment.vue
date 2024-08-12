
<template>
    <div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex  inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
   	<div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
    <div class=" max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-600 modal-card-body">
        <div
          class="modal-close cursor-pointer z-50"
          v-on:click="submit()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
        <div v-if="form.comments.length>=1" class="pt-4 bg-gray-900">
            <div v-for="(bran, index) in form.comments" :key=index class="hello max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg text-success pb-6">
            {{"=>"}}  {{bran['comment']}}
            </div>
        </div>
        <div v-else class="pt-6 bg-gray-900">
            <div class="hello max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg text-white pb-6">
            {{"No comments found"}}
            </div>
        </div>
    </div>
    </div>
    
</template>
<script>


export default {
  props: {
   other_comments: ""
 },
  data() {
       return{
         form:{
            },
            showMail : false,
            comments:""
       }
  },
  async fetch() {
    this.form.comments = this.other_comments
    console.log("commentsss",this.form.comments.length)
  },
 methods: {
   async submit() {
      location.reload()
    }
  }
}
</script>
<style scoped>
.hello{
  width:100%
}
.modal-card-body{
 overflow-y: auto;
}
</style>