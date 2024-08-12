<template>
  <div class="mt-1 mx-1">
    <div class="flex justify-center flex-wrap">
      <h5 class="font-bold text-yellow-300 text-md mt-0 pt-0 text-center ">HR related queries? Call -
      </h5>
      <a :href="'tel:' + 7338667464" class="font-bold text-yellow-300  text-md mt-0 pt-0 text-center ">
      7338667464
      </a>
      /
      <a :href="'tel:' + 8951938858" class="font-bold text-yellow-300  text-md mt-0 pt-0 text-center ">
      8951938858
      </a>
      /
      <a :href="'tel:' + 9686959546" class="font-bold text-yellow-300  text-md mt-0 pt-0 text-center ">
      9686959546
      </a>
      /
      <a :href="'tel:' + 8951965085" class="font-bold text-yellow-300  text-md mt-0 pt-0 text-center ">
      8951965085
      </a>
      
      <!-- <a :href="'tel:' + 8951965854" class="font-bold text-black btn-sm text-md mt-0 pt-0 text-center btn bg-indigo-200 hover:bg-indigo-200">
      8951965854
      </a> -->
  </div>

  <div class="flex justify-center flex-wrap">
      <h5 class="font-bold text-red-500 text-md mt-0 pt-0 text-center ">Blocked from class? Call -
      </h5>
       <a :href="'tel:' + 8951939012" class="font-bold text-red-500  text-md mt-0 pt-0 text-center ">
      8951939012
      </a>
      /
      <a :href="'tel:' + 8951965476" class="font-bold text-red-500  text-md mt-0 pt-0 text-center ">
      8951965476
      </a>
    
      <!-- <a :href="'tel:' + 8951965854" class="font-bold text-black btn-sm text-md mt-0 pt-0 text-center btn bg-indigo-200 hover:bg-indigo-200">
      8951965854
      </a> -->
  </div>

  <div class="flex justify-center flex-wrap">
      <h5 class="font-bold text-green-400 text-md mt-0 pt-0 text-center ">Facing Technical issue? Call - 
      </h5>
      <a :href="'tel:' + 9972068008" class="font-bold text-green-400  text-md mt-0 pt-0 text-center ">
      9972068008
      </a>
      /
      <a :href="'tel:' + 8951966085" class="font-bold text-green-400  text-md mt-0 pt-0 text-center ">
      8951966085
      </a>
      <!-- <a :href="'tel:' + 8951965854" class="font-bold text-black btn-sm text-md mt-0 pt-0 text-center btn bg-indigo-200 hover:bg-indigo-200">
      8951965854
      </a> -->
  </div>

  <div class="flex justify-center flex-wrap">
      <h5 class="font-bold text-blue-400  text-md mt-0 pt-0 text-center ">Looking for course or other subjects to attend ? Call -
      </h5>
      <a :href="'tel:' + 8951965086" class="font-bold text-blue-400 text-md mt-0 pt-0 text-center ">
      8951965086
      </a>
      /
      <a :href="'tel:' + 8951965092" class="font-bold text-blue-400  text-md mt-0 pt-0 text-center ">
      8951965092
      </a>
      /
      <a :href="'tel:' + 9900018030" class="font-bold text-blue-400 text-md mt-0 pt-0 text-center ">
      9900018030
      </a>
      <!-- <a :href="'tel:' + 8951965854" class="font-bold text-black btn-sm text-md mt-0 pt-0 text-center btn bg-indigo-200 hover:bg-indigo-200">
      8951965854
      </a> -->
  </div>
    <div class="bg-blue-650">
      <div
        class="columns flex z-0 justify-center bg-neutral px-6 md:grid md:gap-6"
      >
        <div class="md:mt-0 md:col-span-1 max-w-md h-0">
          <validation-observer ref="form" v-slot="{ handleSubmit }">
            <form
              @submit.prevent="handleSubmit(Checksubmit)"
              class="flex flex-wrap"
            >
              <div
                class="
                  box
                  column
                  is-one-third
                  bg-gray-900
                  rounded
                  border border-white
                "
              >
                <h2
                  class="
                    mt-16
                    ml-12
                    mr-12
                    mb-6
                    text-center text-2xl
                    font-extrabold
                    text-white
                  "
                >
                  Welcome to Qspiders Online
                </h2>

                <div class="mt-4 ml-12 mr-9">
                  <label
                    for="country"
                    class="block text-md font-extrabold text-white"
                    >Email ID</label
                  >
                  <ValidationProvider rules="required" v-slot="{ errors }" slim>
                    <span
                      class="
                        z-10
                        h-full
                        leading-snug
                        font-normal
                        absolute
                        bg-transparent
                        rounded
                        text-base
                        items-center
                        justify-center
                        py-2
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-gray-800"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                        />
                        <path
                          d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                        />
                      </svg>
                    </span>
                    <input
                      type="email"
                      placeholder="Enter Email here"
                      v-model="form.email"
                      :class="errors[0] ? 'border-red-500' : 'border-gray-500'"
                      class="
                        .
                        px-2
                        py-2
                        placeholder-gray-500
                        text-gray-800
                        relative
                        bg-white
                        rounded
                        text-sm
                        border
                        outline-none
                        focus:outline-none focus:ring
                        w-full
                        pl-10
                      "
                    />
                    <span class="text-white">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="mt-5 ml-12 mr-9">
                  <label
                    for="country"
                    class="block text-md font-extrabold text-white"
                    >Contact Number</label
                  >
                  <div>
                    <div class="flex">
                      <div class="flex-none w-32">
                        <!-- <v-select 
                              class="border border-white text-sm text-white selected text-left placeholder-text-xs"
                              label="code"
                              v-model="form.code"
                              :options="countryCodes"
                              :reduce="code => code.id"
                              placeholder="Search Country code"
                            >
                            </v-select> -->
                        <v-select
                          class="border border-info text-sm text-white"
                          label="code"
                          v-model="form.code"
                          :options="countryCodes"
                          :reduce="(code) => code.code"
                          placeholder="Search here"
                        ></v-select>
                        <!-- <select class="select-sm w-full max-w-xs rounded text-black bg-white p-0" v-model="form.code" >
                          <option v-for="(number, i) in countryCodes" :key="i" :value="number.code" >{{number.code}}</option> 
                        </select> -->
                      </div>
                      <div class="shrink w-52 h-max">
                        <ValidationProvider
                          rules="required|digits:10"
                          v-slot="{ errors }"
                          slim
                        >
                          <input
                            type="tel"
                            v-model="form.number"
                            placeholder="Enter number here"
                            :class="
                              errors[0] ? 'border-red-500' : 'border-gray-500'
                            "
                            class="
                              px-6
                              py-1
                              placeholder-gray-500
                              text-gray-800
                              relative
                              bg-white
                              rounded
                              text-sm
                              border
                              outline-none
                              focus:outline-none focus:ring
                              w-full
                              input-sm
                            "
                          />
                          <span class="text-white">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-10 mb-16 ml-12 mr-9">
                  <button
                    @click="clickFunction()"
                    class="
                      py-2
                      px-4
                      text-center
                      bg-info
                      rounded-full
                      w-full
                      font-extrabold
                      text-black text-md
                    "
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        code: "",
      },
      forms1: {
        meeting_id: "",
      },
      showPersonal: false,
      mobileErrors: "",
      inputOptions: {
        autocomplete: "off",
        required: true,
        placeholder: "Enter a phone number",
        styleClasses:
          "py-2 placeholder-gray-500 text-gray-800 relative bg-white rounded text-sm border border-red-500 outline-none focus:outline-none focus:ring w-full",
      },
      countryCodes: [],
    };
  },
  head() {
    return {
      title: "Online Student | Qspiders",
    };
  },
  async fetch() {
    let codes = await this.$axios.get("student/country-codes/?per_page=200");
    this.countryCodes = codes.data.results;
    console.log(this.countryCodes[0].code)
    this.form.code = this.countryCodes[0].code;
  },
  methods: {
    async clickFunction() {
      this.showPersonal = true;
    },
    async Checksubmit() {
      if (this.form.number) {
        this.form.numbers = this.form.code + "" + this.form.number;
      }
      let cs = await this.$store.dispatch("student/getUser", {
        email: this.form.email,
        number: this.form.numbers,
      });
      if (!this.$store.state.auth.user) {
        if (this.$store.state.student.get_user.length == 1) {
          this.$router.push({ name: "login", query: this.$route.query });
        } else if (this.$store.state.student.get_user.length == 2) {
          await this.$store.dispatch("alerts/alert", {
            text: "Please provide valid contact number and email",
            type: "error",
          });
        } else if (this.$store.state.student.get_user.length == 0) {
          this.$router.push({
            path: "/student/send_otp",
            query: this.$route.query,
          });
        }
      }
    },
  },
  mounted() {
    var userss = JSON.parse(localStorage.getItem("user"));
    if (userss) {
      this.forms1.meeting_id = this.$route.query.meeting_id;
      this.$store.dispatch("student/getMeetingID", this.forms1);
      this.$router.push({ path: "/student" });
    }
  },
};
</script>

<style>
.full {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to top, white 25%, rgba(128, 128, 128, 0.116));
}
.v-select .vs__selected {
  background-color: white !important;
  color: black !important;
}
.vs__dropdown-menu {
  background-color: darkgrey !important;
  border: none !important;
  color: white !important;
  text-transform: capitalize !important;
}
.vs__open-indicator,
.vs__clear {
  fill: white !important;
}
</style>
