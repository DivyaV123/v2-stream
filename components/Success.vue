<template>
<div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
    <div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
    <div class=" max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white modal-card-body">
    <div class="hello max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg">
      <div class="flex justify-center items-center">
        <div class="bg-white rounded-lg">
          <div class="w-full border-t-8 border-green-100 rounded-lg flex">
            <div class="w-full pr-4 text-center">
              <div class="flex justify-center items-center text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-40 w-28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="font-bold text-gray-800 text-3xl mt-0 pt-0">Your Payment was succesful</h3>
              <p class="py-4 text-md text-blue-600 font-extrabold">Balance with Respect to your Payment will be reflected after 24 to 48 Hours of your Payment Date</p>
              <p class="py-4 text-sm text-gray-600 font-extrabold">Thank you for your payment.</p>
            </div>
          </div>
          <div @click="submit">
            <button class="w-full text-right text-black text-md font-extrabold rounded-lg text-sm hover:text-blue-500 hover:underline" @click="$emit('cousubmit', 'close')">Close</button>
          </div>
        </div>
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
      location.reload()
    }
  }
}
</script>
<style>
</style>