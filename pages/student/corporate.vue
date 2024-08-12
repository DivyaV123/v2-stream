<template>
    <div class="mt-1 mx-1">
        <div class="columns flex z-0 justify-center h-screen px-6 md:grid  md:gap-6 ">
        <div class="mt-5 md:mt-0 md:col-span-2 ml-9 mr-9 max-w-sm w-full">     
        <template>
            <div class="card text-center shadow-2xl">
            <span class="grid justify-items-start pl-36">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-success justify-center" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
            </span>
            <div class="card-body">
                <h2 class="card-title">Invalid OTP!</h2> 
                <p>You have entered invalid OTP more than 3 times Please contact Qspiders Manager</p> 
                <div class="justify-center card-actions">
                    <button class="btn btn-outline btn-accent">
                    <a :href="'tel:' + 9972068008">
                    9972068008
                    </a>
                    </button>
                </div>
                <div class="justify-center card-actions">
                    <button class="btn btn-outline btn-accent">
                    <a :href="'tel:' + 8951966085">
                    8951966085
                    </a>
                    </button>
                </div>
            </div>
            </div> 
        </template>
        </div> 
        </div>
    </div>
</template>
<script>
export default{
    head() {
        return {
            title: "Online Student | Qspiders",
        };
    },
     data() {
         return {
         }
     },
     async fetch() {
  

     },
    mounted() {
    window.onpopstate = event => {
        this.$router.push({ path: '/user'}); 
    };
  }
}
</script>