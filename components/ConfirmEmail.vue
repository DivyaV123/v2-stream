<template>
<div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
   	<div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
    <div class="max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white modal-card-body">
    <div class="hello max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg">
      <div class="flex justify-center items-center">
        <div class="bg-white rounded-lg">
          <div class="w-full border-t-8 border-b-8  border-blue-100 rounded-lg flex">
            <div class="w-full pr-4 text-center">
              <div class="flex justify-center items-center text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-36 w-20" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h12a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-6-3.75a2 2 0 00-2.12 0l-6 3.75zm2.615 2.423a1 1 0 10-1.11 1.664l5 3.333a1 1 0 001.11 0l5-3.333a1 1 0 00-1.11-1.664L10 11.798 5.555 8.835z" clip-rule="evenodd" />
								</svg>
              </div>
              <h3 class="font-bold text-gray-800 text-3xl mt-0 pt-0">Email Sent.</h3>
              <p class="py-4 text-sm text-gray-500">A confirmation email will be sent to your email address. Please check your email and confirm.</p>
            </div>
          </div>
          <div @click="submit">
					  <button class="w-full text-right text-black rounded-lg text-sm hover:text-blue-500 hover:underline" @click="$emit('cousubmit', 'close')">Back</button>
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
      this.$router.push({ name: "user" });
    }
  }
}
</script>
<style>
</style>