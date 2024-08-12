<template>
<div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
   	<div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
    <div class="max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900 modal-card-body">
    <div class="hello max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg">
      <div class="flex justify-center items-center">
        <div class="bg-black rounded-lg">
          <div class="w-full border-t-8 border-b-8  border-blue-100 rounded-lg flex">
            <div class="w-full pr-4 text-center">
              <h3 class="font-bold text-warning text-xl mt-0 pt-6 text-center">Contact below number for Course Related Information</h3>
              <div class="pt-6">
              <button class="btn btn-glass text-white btn-sm">
                <a :href="'tel:' + 8951965086">
                8951965086
                </a>
              </button>
              <button class="btn btn-glass text-white btn-sm">
                <a :href="'tel:' + 8951965092">
                8951965092
                </a>
              </button>
              </div>
               <h3 class="font-bold text-warning text-xl mt-0 pt-6 text-center">Contact below number for Technical issue Related Information</h3>
              <div class="pt-6">
              <button class="btn btn-glass text-white btn-sm">
                <a :href="'tel:' + 9972068008">
                9972068008
                </a>
              </button>
              <button class="btn btn-glass text-white btn-sm">
                <a :href="'tel:' + 8951966085">
                8951966085
                </a>
              </button>
              </div>
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
 methods: {
    async submit() {
      this.$emit("cousubmit", "close");
      this.$router.push({ path: '/user'}); 
    }
  }
}
</script>
<style>
</style>