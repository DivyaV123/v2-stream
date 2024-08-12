
<template>
  <div
    class="
      min-w-screen
      h-screen
      animated
      fadeIn
      faster
      fixed
      left-0
      top-0
      flex
      items-center
      inset-0
      z-50
      outline-none
      focus:outline-none
      bg-no-repeat bg-center bg-cover
    "
  >
    <div class="absolute bg-white opacity-80 inset-0 z-0"></div>
    <div
      class="
        hello
        max-w-6xl
        h-screen
        z-30
        p-5
        relative
        mx-auto
        my-auto
        rounded-xl
        shadow-lg
        bg-gray-700
        modal-card-body
      "
    >
      <div
        class="
          align-middle
          inline-block
          shadow
          sm:rounded-lg
          border border-gray-200
          pt-8
        "
      >
        <div class="p-3 pt-8 mt-2 text-center space-x-4">
          <div
            v-if="cancelp == true"
            class="
              min-w-screen
              h-screen
              animated
              fadeIn
              faster
              fixed
              left-0
              top-0
              flex
              items-center
              inset-0
              z-50
              outline-none
              focus:outline-none
              bg-no-repeat bg-center bg-cover
            "
          >
            <div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
            <div
              class="
                max-8xl
                z-30
                p-5
                relative
                mx-auto
                my-auto
                rounded-xl
                shadow-lg
                bg-gray-900
                modal-card-body
              "
            >
              <div
                class="
                  hello
                  max-w-xl
                  h-xl
                  z-30
                  p-5
                  relative
                  mx-auto
                  my-auto
                  rounded-xl
                  shadow-lg
                "
              >
                <p class="text-white">Are you sure you want to Exit?</p>
                <div class="flex justify-end pt-2">
                  <button
                    @click="cancelp = false"
                    class="
                      px-6
                      py-3
                      bg-transparent
                      p-3
                      rounded-full
                      text-red-500
                      hover:bg-gray-100 hover:text-red-500
                      mr-2
                    "
                  >
                    Cancel
                  </button>
                  <button
                    @click="closebutton()"
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
                    Exit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <validation-observer ref="observer" v-slot="{ handleSubmit }">
            <form @submit.stop.prevent="handleSubmit(profilesubmit)">
              <div class="flex justify-right items-right pb-3">
                <div
                  class="modal-close cursor-pointer z-50"
                  v-on:click="cancelp = true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div class="modal-card pb-4" style="width: auto">
                <ul class="w-full steps">
                  <li data-content="✕" class="step step-success">
                    Personal details
                  </li>
                  <li data-content="✕" class="step">Educational details</li>
                  <li data-content="✕" class="step">Other details</li>
                </ul>
              </div>
              <section class="px-1 py-1 pt-4">
                <div class="grid md:grid-cols-3 sm:grid-cols-1 gap-4 m-5">
                  <div class="border border-success pt-2 pl-4 pr-4">
                    <label
                      for="country"
                      class="block text-sm font-extrabold pb-1 pr-20"
                      >Student Name</label
                    >
                    <ValidationProvider
                      rules="required|alpha_spaces"
                      v-slot="{ errors }"
                    >
                      <div class="form-control pt-2 pb-4">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          v-model="form.name"
                          placeholder="Enter Name"
                          class="
                            input input-sm
                            text-white
                            input-bordered
                            bg-gray-700
                            placeholder-white
                          "
                        />
                      </div>
                      <span class="text-warning mb-10">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="border border-success pt-3 pb-6">
                    <label
                      for="country"
                      class="block text-sm font-extrabold pb-1 pr-20"
                      >Date of birth</label
                    >
                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors }"
                      slim
                    >
                      <div>
                        <date-picker
                          append-to-body
                          class="bg-white text-sm"
                          :editable="false"
                          :default-value="new Date()"
                          v-model="form.dob"
                          :disabledDate="disabledDate"
                          placeholder="Date of Birth"
                        ></date-picker>
                      </div>
                      <span class="text-warning">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="border border-success px-2 flex flex-wrap pt-3">
                    <div>
                      <label
                        for="country"
                        class="block text-sm font-extrabold pb-1"
                        >Gender :</label
                      >
                    </div>
                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors }"
                      slim
                    >
                      <label class="cursor-pointer label" for="female">
                        <span class="label-text text-white">Female</span>
                        <input
                          type="radio"
                          id="female"
                          name="timing"
                          :value="2"
                          :native-value="2"
                          v-model="form.gender_id"
                          class="radio radio-accent radio-sm"
                        />
                      </label>
                      <label class="cursor-pointer label" for="male">
                        <span class="label-text text-white">Male</span>
                        <input
                          type="radio"
                          id="male"
                          name="timing"
                          :value="1"
                          :native-value="1"
                          v-model="form.gender_id"
                          class="radio radio-accent radio-sm"
                        />
                      </label>
                      <span class="text-warning">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-4 m-5">
                  <div class="border border-success pr-6 pl-8 pt-4 pb-6">
                    <label
                      for="country"
                      class="block text-sm font-extrabold text-blue-5000"
                      >Upload Passport Photo</label
                    >
                    <ValidationProvider
                      ref="provider"
                      name="image"
                      v-slot="{ errors }"
                    >
                      <input
                        class="
                          px-20
                          py-2
                          placeholder-gray-500
                          text-gray-800
                          relative
                          bg-white
                          rounded
                          text-sm
                          outline-none
                          focus:outline-none focus:ring
                          w-full
                          pl-6
                        "
                        id="file"
                        ref="file"
                        type="file"
                        name="file"
                        accept="image/*"
                        v-on:change="onFileChange"
                        :required="true"
                      />
                      <span class="text-warning">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="border border-success px-2 flex flex-wrap pt-3">
                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors }"
                      slim
                    >
                      <label class="cursor-pointer label" for="fresher">
                        <span class="label-text text-white">Fresher</span>
                        <input
                          type="radio"
                          id="fresher"
                          name="fresher_experienced"
                          :value="1"
                          :native-value="1"
                          v-model="form.fresher_experienced_id"
                          class="radio radio-accent radio-sm"
                        />
                      </label>
                      <label class="cursor-pointer label" for="experienced">
                        <span class="label-text text-white">Experience</span>
                        <input
                          type="radio"
                          id="experienced"
                          name="fresher_experienced"
                          :value="2"
                          :native-value="2"
                          v-model="form.fresher_experienced_id"
                          class="radio radio-accent radio-sm"
                        />
                      </label>
                      <label class="cursor-pointer label" for="both">
                        <span class="label-text text-white">Both</span>
                        <input
                          type="radio"
                          id="both"
                          name="fresher_experienced"
                          :value="3"
                          :native-value="3"
                          v-model="form.fresher_experienced_id"
                          class="radio radio-accent radio-sm"
                        />
                      </label>
                      <span class="text-warning">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-4 m-5">
                  <div
                    v-for="(contact, index) in numbersss"
                    :key="index"
                    class="
                      pt-2
                      px-2
                      pr-3
                      relative
                      flex flex-wrap
                      text-center
                      items-center
                      overflow-visible
                    "
                  >
                    <input
                      disabled
                      type="text"
                      v-model="contact.number"
                      class="
                        px-2
                        py-2
                        placeholder-white
                        text-white
                        relative
                        bg-gray-700
                        rounded
                        text-sm
                        border
                        outline-none
                        focus:outline-none focus:ring
                        w-full
                      "
                    />
                  </div>

                  <div
                    v-if="add_another == true"
                    class="
                      pt-2
                      px-2
                      relative
                      flex flex-wrap
                      text-center
                      items-center
                      overflow-visible
                    "
                  >
                    <div
                      class="flex pt-4"
                      v-for="(contact1, index1) in form.numbers"
                      :key="index1"
                    >
                      <div class="flex-none w-32">
                        <!-- <select class="select-sm w-full max-w-xs rounded text-black bg-white p-0"  v-model="contact1.code" >
                          <option v-for="(number, i) in countryCodes" :key="i" :value="number.code" :selected="selected" >{{number.code}}</option> 
                        </select> -->
                        <v-select
                          class="border border-success text-sm text-white"
                          label="code"
                          v-model="contact1.code"
                          :options="countryCodes"
                          :reduce="(code) => code.code"
                          placeholder="Search here"
                        ></v-select>
                      </div>
                      <div class="shrink w-74 h-14 ml-2">
                        <ValidationProvider
                          rules="required|digits:10"
                          v-slot="{ errors }"
                          slim
                        >
                          <input
                            type="text"
                            v-model="contact1.number"
                            :class="
                              errors[0] ? 'border-red-500' : 'border-gray-500'
                            "
                            class="
                              py-2
                              placeholder-white
                              text-white
                              relative
                              bg-gray-700
                              rounded
                              text-sm
                              border
                              outline-none
                              focus:outline-none focus:ring
                              w-full
                            "
                          />
                          <span class="text-white">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>
                    <span class="flex flex-wrap text-center items-center">
                      <svg
                        v-if="mobileErrors"
                        xmlns="http://www.w3.org/2000/svg"
                        class="
                          h-5
                          w-5
                          text-red-800
                          flex flex-wrap
                          text-center
                          items-center
                        "
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>

                    <span
                      class="
                        rounded
                        cursor-pointer
                        flex flex-wrap
                        text-center
                        items-center
                      "
                      @click="addContact"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-success hover:text-success"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                    <span
                      v-if="form.numbers.length >= 1"
                      class="
                        rounded
                        cursor-pointer
                        flex flex-wrap
                        text-center
                        items-center
                      "
                      @click="removeContact"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-red-500 hover:text-red-800"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div
                  class="
                    inline-flex
                    justify-center
                    py-1
                    px-15
                    border border-black
                    shadow-sm
                    text-xs
                    font-extrabold
                    rounded-md
                    text-black
                    bg-white
                    btn-sm btn-success
                  "
                  @click="(add_another = true), (number_va = true)"
                >
                  Add another
                </div>
                <br />
                <div class="grid md:grid-cols-3 sm:grid-cols-1 gap-4 m-5">
                  <div
                    v-for="(emaill, index) in emailsss"
                    :key="index"
                    class="
                      pt-2
                      px-2
                      pr-3
                      relative
                      flex flex-wrap
                      text-center
                      items-center
                      overflow-visible
                    "
                  >
                    <input
                      disabled
                      type="email"
                      placeholder="Enter Email here"
                      v-model="emaill.email"
                      class="
                        px-2
                        py-2
                        placeholder-white
                        text-white
                        relative
                        bg-gray-700
                        rounded
                        text-sm
                        border
                        outline-none
                        focus:outline-none focus:ring
                        w-full
                        pl-6
                      "
                    />
                  </div>
                  <div
                    v-if="add_another1 == true"
                    class="
                      pt-1
                      px-2
                      pr-4
                      relative
                      flex flex-wrap
                      text-center
                      items-center
                    "
                  >
                    <ValidationProvider
                      v-for="(email, index) in form.emails"
                      :key="index"
                      rules="email"
                      v-slot="{ errors }"
                      slim
                    >
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
                          v-if="errors[0]"
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-red-800"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <svg
                          v-else
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-white"
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
                        v-model="email.email"
                        :class="
                          errors[0] ? 'border-red-500' : 'border-gray-500'
                        "
                        class="
                          px-2
                          py-2
                          placeholder-white
                          text-white
                          relative
                          bg-gray-700
                          rounded
                          text-sm
                          border
                          outline-none
                          focus:outline-none focus:ring
                          w-full
                          pl-6
                        "
                      />
                    </ValidationProvider>
                    <span class="rounded cursor-pointer" @click="addEmail">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-success hover:text-success"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                    <span
                      v-if="form.emails.length > 1"
                      class="rounded cursor-pointer"
                      @click="removeEmail"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-red-500 hover:text-red-800"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div
                  class="
                    inline-flex
                    justify-right
                    py-1
                    px-15
                    border border-black
                    shadow-sm
                    text-xs
                    font-extrabold
                    rounded-md
                    text-black
                    bg-white
                    btn-sm btn-success
                  "
                  @click="add_another1 = true"
                >
                  Add another
                </div>
                <br />
              </section>
              <div class="mt-4 ml-9 mr-6">
                <!-- <div class="px-4 py-3 text-right sm:px-6 ml-5 mr-5">
                  <button type="submit" class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-extrabold rounded-md text-black bg-success hover:bg-success ">
                    Next
                  </button>

                  <Education v-if="showEducational && exists==false" />
                  <Experience v-if="showexperience && exists==false" />

                </div> -->
                <div class="px-4 py-3 text-right sm:px-6 ml-5 mr-5">
                  <button
                    type="submit"
                    class="
                      inline-flex
                      justify-center
                      py-3
                      px-6
                      border border-transparent
                      shadow-sm
                      text-sm
                      font-extrabold
                      rounded-md
                      text-black
                      bg-success
                      hover:bg-success
                    "
                  >
                    Next
                  </button>
                  <div>
                    <Education v-if="showEducational && exists == false" />
                    <Experience v-if="showexperience && exists == false" />
                  </div>
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
var dayjs = require("dayjs");
export default {
  middleware: ["authenticated","is_student"],
  data() {
    return {
      form: {
        numbers: [
          {
            number: "",
            code: "",
          },
        ],
        emails: [
          {
            email: "",
          },
        ],

        image: null,
      },
      countryCodes: [],
      code: "",
      cancelp: false,
      number_va: false,
      showEducational: false,
      showexperience: false,
      numbersss: [
        {
          numberr: "",
        },
      ],
      emailsss: [
        {
          emailll: "",
        },
      ],
      aadhar_err: "",
      add_another: false,
      add_another1: false,
      images: null,
      astate: null,
      bstate: null,
      students: [],
      mobileErrors: "",
      mobileErrors1: "",
      mobileErrors2: "",
      student: {},
      exists: false,
      radio: "",
      years: [...Array(30)].map((a, b) => new Date().getFullYear() + 1 - b),
    };
  },
  async fetch() {
    this.form.name = this.$store.state.auth.firstname;
    await this.$store.dispatch("title", "QSAAS Student Profile");
    var user = JSON.parse(localStorage.getItem("userdetail"));
    if (user) {
      this.form.name = user.username[0].first_name;
    } else {
      this.$router.push("/user");
    }
    for (var i = 0; i < user.username[0].number.length; i++) {
      this.numbersss[i] = user.username[0].number[i];
    }
    for (var i = 0; i < user.username[0].email.length; i++) {
      this.emailsss[i] = user.username[0].email[i];
    }
    let codes = await this.$axios.get("student/country-codes/");
    console.log(codes.data.results);
    this.countryCodes = codes.data.results;
    for (var i = 0; i < this.form.numbers.length; i++) {
      this.form.numbers[i].code = this.countryCodes[0].code;
    }
    this.selected = this.countryCodes[0].actual;
  },
  methods: {
    disabledDate(date) {
      var date1 = new Date("2007-01-01T10:20:30Z");
      return date > date1;
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      for (const name in files) {
        if (files.hasOwnProperty(name)) {
          this.images = files[name];
          if (this.images.size >= 2000000) {
            alert("Image size should be less than 2MB");
            this.$refs.file.value = "";
          } else {
            this.images = files[name];
          }
        }
      }
    },
    addEmail() {
      this.form.emails.push({
        email: "",
      });
    },
    removeEmail() {
      this.form.emails.pop({
        email: "",
      });
    },
    addContact() {
      this.form.numbers.push({
        number: "",
        code: "",
      });
      for (var i = 0; i < this.form.numbers.length; i++) {
        this.form.numbers[i].code = this.countryCodes[0].code;
      }
    },
    removeContact() {
      this.form.numbers.pop({
        number: "",
        code: "",
      });
    },
    valContact(number, obj) {
      if (obj.countryCallingCode && obj.countryCallingCode === "91") {
        if (obj.nationalNumber && obj.nationalNumber.length != 10) {
          this.mobileErrors = "Invalid mobile number";
        } else {
          this.mobileErrors = "";
        }
      } else if (obj.valid && obj.valid === false) {
        this.mobileErrors = "Invalid mobile number";
      } else {
        this.mobileErrors = "";
      }
    },
    async profilesubmit() {
      if (
        this.form.fresher_experienced_id == 1 ||
        this.form.fresher_experienced_id == 3
      ) {
        console.log("here in frreshers");
        this.showEducational = true;
      }
      if (this.form.fresher_experienced_id == 2) {
        this.showexperience = true;
      }
      if (this.add_another == false) {
        this.form.numbers = [];
      }
      if (this.add_another1 == false) {
        this.form.emails = [];
      }
      if (this.add_another == true) {
        if (this.form.numbers[0]) {
          if (this.form.numbers[0].number == "") {
            this.form.numbers = [];
          } else {
            for (var i = 0; i < this.form.numbers.length; i++) {
              console.log("this.form.numbers", this.form.numbers);
              this.form.numbers[i]["number"] =
                this.form.numbers[i]["code"] +
                "" +
                this.form.numbers[i]["number"];
              console.log(
                "this.form.numbers[i]['number']",
                this.form.numbers[i]["number"]
              );
            }
          }
        } else {
          console.log("none");
        }
      }
      if (this.add_another1 == true) {
        if (this.form.emails[0].email == "") {
          this.form.emails = [];
        } else {
          this.form.emails = this.form.emails;
        }
      }
      // if (this.form.numbers){
      //   for()
      // }

      try {
        this.form.dob = dayjs(this.form.dob).format("YYYY-MM-DD");
        await this.$store.dispatch("student/getPersonal", this.form);
        if (this.$store.state.student.personal.status == 200) {
          let data = new FormData();
          data.append("image", this.images, this.images.name);
          let config = {
            header: {
              "Content-Type": "multipart/form-data",
            },
          };
          let img = await this.$axios.post(`student/v2-image/`, data, config);
          await this.$store.dispatch("alerts/alert", {
            text: "Successfully added Personal Information",
            type: "success",
          });
          this.exists = false;
          const userData = JSON.parse(localStorage.getItem("user"));

          userData.profile.personal = 1;
          localStorage.setItem("user", JSON.stringify(userData));
          const userDatass = JSON.parse(localStorage.getItem("user"));
          this.mobileErrors = "";
          this.$store.dispatch("student/resetmsg");
        }
        if (this.$store.state.student.error) {
          await this.$store.dispatch("alerts/alert", {
            text: this.$store.state.student.errorMsg,
            type: "error",
          });
          this.$store.dispatch("student/resetmsg");
        }
      } catch (err) {
        await this.$store.dispatch("alerts/alert", {
          text: err.response.data.message,
          type: "error",
        });
        this.exists = true;
      }
    },
    async closebutton() {
      location.reload();
    },
  },
};
</script>



<style scoped>
.hello {
  width: 100%;
}
.modal-card-body {
  overflow-y: auto;
}
.emailinput {
  width: 100% !important;
}
</style>