<template>
    <div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
   	<div class="absolute bg-white opacity-80 inset-0 z-0"></div>
    <div class="hello max-w-6xl h-screen z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-700 modal-card-body">
    <div class="hello max-w-6xl h-21 z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg">
    <div class="p-3  mt-2 text-center space-x-4 ">
        <div v-if="cancelex==true" class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
        <div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
        <div class=" max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900 modal-card-body">
        <div class="hello max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg">
              <p class="text-white">Are you sure you want to Exit?</p>
                  <div class="flex justify-end pt-2">
                    <button
                      @click="cancelex = false"
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
                      @click="closebutton2()"
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
          <form @submit.stop.prevent="handleSubmit(Experiencesubmit)">
            <div class="flex justify-right items-right pb-3">
              <div
                class="modal-close cursor-pointer z-50"
                v-on:click="cancelex=true"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
              </div>
            </div> 
            <div class="modal-card pb-4" style="width: auto">
              <ul class="w-full steps">
                <li data-content="✓" class="step step-success text-white">Personal details</li> 
                <li data-content="✕" class="step step-warning text-white">Experience details</li> 
                <li data-content="✕" class="step step-info text-white">Other details</li> 
              </ul>
            </div>
            <section class="px-1 py-1 pt-4">
                      <div class="grid md:grid-cols-3 sm:grid-cols-1 gap-4 m-5">
                         <div class="border border-warning pt-3 pr-4 pl-4 pb-6">
                            <label for="country" class="block text-sm font-extrabold text-blue-5000 text-white">Highest degree</label>
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
                                        class="border border-warning text-sm text-white"
                                        label="name"
                                        v-model="form.highest_degree_id"
                                        :reduce="name => name.id"
                                        :options="$store.state.student.highest_degree"
                                        
                                        placeholder="Select highest degree"
                                    ></v-select>
                                    <span class="text-white">{{ errors[0] }}</span>
                                </ValidationProvider> 
                            </div> 
                            <div v-if="form.highest_degree_id==21" class="border border-warning pt-2 pl-4 pr-4">
                            <label for="country" class="block text-sm font-extrabold pb-1 pr-20 text-white">Other Highest Degree</label>
                                    <div class="form-control pt-2 pb-4">
                                        <input type="text" name="email" id="email" v-model="form.ohighest_degree" :maxlength="30" placeholder="Enter Degree" class="input input-sm 
                                                                                                                                                    bg-bg-transparent  
                                                                                                                                                    text-white 
                                                                                                                                                    input-bordered 
                                                                                                                                                    bg-gray-700 
                                                                                                                                                    placeholder-white 
                                                                                                                                                    border border-warning">
                                    </div>               
                            </div>
                            <div class="border border-warning pt-3 pr-4 pl-4 pb-6">
                            <label for="country" class="block text-sm font-extrabold text-blue-5000 text-white">Native Place</label>
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
                                        class="border border-warning text-sm text-white"
                                        label="name"
                                        v-model="form.native_id"
                                        :options="$store.state.student.states"
                                        :reduce="name => name.id"
                                        placeholder="Select native place"
                                    ></v-select>
                                    <span class="text-white">{{ errors[0] }}</span>
                                </ValidationProvider> 
                            </div>

                             <div class="border border-warning px-2  flex flex-wrap pt-3">
                              <div>
                                  <label for="country" class="block text-sm font-extrabold pb-1 text-white">Do you have past work experience?</label>
                              </div>
                                    <ValidationProvider rules="required" v-slot="{ errors }" slim> 
                                      <div>
                                        <label class="cursor-pointer label" for="yes">
                                          <span class="label-text font-extrabold">Yes</span> 
                                          <input type="radio"
                                                id="yes"
                                                name="work_experience"
                                                :value="true"
                                                :native-value="true"
                                                v-model="form.work_experience" class="pl-4 radio radio-warning radio-sm">
                                        </label>
                                        <label class="cursor-pointer label" for="no">
                                          <span class="label-text font-extrabold">No</span> 
                                          <input type="radio"
                                                id="no"
                                                name="work_experience"
                                                :value="false"
                                                :native-value="false"
                                                v-model="form.work_experience" class="pl-4 radio radio-warning radio-sm">
                                        </label> 
                                      </div> 
                                      <span class="text-white">{{ errors[0] }}</span>
                                    </ValidationProvider> 
                              </div>
                              <div v-if="form.work_experience==true" class="border border-warning px-2  flex flex-wrap pt-3">
                                  <div>
                                        <label for="country" class="block text-sm font-extrabold pb-1 text-white">Currently are you working?</label>
                                  </div>
                                  <ValidationProvider rules="required" v-slot="{ errors }" slim> 
                                  <div>
                                      <label class="cursor-pointer label" for="yes">
                                      <span class="label-text font-extrabold">Yes</span> 
                                      <input type="radio"
                                              id="yes"
                                              name="working"
                                              :value="true"
                                              :native-value="true"
                                              v-model="form.working" class="pl-4 radio radio-warning radio-sm">
                                      </label>
                                      <label class="cursor-pointer label" for="no">
                                      <span class="label-text font-extrabold">No</span> 
                                      <input type="radio"
                                              id="no"
                                              name="working"
                                              :value="false"
                                              :native-value="false"
                                              v-model="form.working" class="pl-4 radio radio-warning radio-sm">
                                      </label> 
                                  </div> 
                                <span class="text-white">{{ errors[0] }}</span>
                                  </ValidationProvider> 
                                </div>

                                <div v-if="form.work_experience==true && form.working==true" class="border border-warning pt-3 pr-4 pl-4 pb-6">
                                    <label for="country" class="block text-sm font-extrabold text-blue-5000 text-white">Notice Period</label>
                                    <ValidationProvider rules="required" v-slot="{ errors }" slim>
                                      <v-select
                                          class="select select-bordered text-white"
                                          :class="errors[0] ? 'select-error' : ''"
                                          label="name"
                                          v-model="form.notice_period"
                                          :options="noticeperiods"
                                          placeholder="Select Notice Period"
                                      ></v-select>
                                            <!-- <select
                                                v-model="form.notice_period"
                                                class="select select-bordered text-white"
                                                :class="errors[0] ? 'select-error' : ''"
                                            >
                                                <option disabled="disabled" value="" selected="selected">
                                                select notice period
                                                </option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select> -->
                                      </ValidationProvider>
                                  </div>

                                  <div v-if="form.work_experience==true && form.working==false" class="border border-warning pt-3 pr-4 pl-4 pb-6">
                                  <label for="country" class="block text-sm font-extrabold text-white">How many months of gap you have?</label>
                                      <ValidationProvider rules="required" v-slot="{ errors }" slim>
                                         <v-select
                                              class="select select-bordered text-white"
                                              :class="errors[0] ? 'select-error' : ''"
                                              label="name"
                                              v-model="form.month_gap"
                                              :options="noticeperiods"
                                              placeholder="Select Month-Gap"
                                          ></v-select>
                                              <!-- <select
                                                  v-model="form.month_gap"
                                                  class="select select-bordered text-white"
                                                  :class="errors[0] ? 'select-error' : ''"
                                              >
                                                  <option disabled="disabled" value="" selected="selected">
                                                  select month gap
                                                  </option>
                                                  <option value="1">1</option>
                                                  <option value="2">2</option>
                                                  <option value="3">3</option>
                                                  <option value="4">4</option>
                                                  <option value="5">5</option>
                                                  <option value="6">6</option>
                                                  <option value="7">7</option>
                                                  <option value="8">8</option>
                                                  <option value="9">9</option>
                                                  <option value="10">10</option>
                                                  <option value="11">11</option>
                                                  <option value="12">12</option>
                                              </select> -->
                                              </ValidationProvider>
                                  </div>
                                  <div v-if="form.work_experience==true" class="border border-warning px-2  flex flex-wrap pt-3">
                                      <div>
                                            <label for="country" class="block text-sm font-extrabold pb-1 text-white">Already Resigned?</label>
                                      </div>
                                    <ValidationProvider rules="required" v-slot="{ errors }" slim> 
                                        <div>
                                            <label class="cursor-pointer label" for="yes">
                                            <span class="label-text font-extrabold">Yes</span> 
                                            <input type="radio"
                                                    id="yes"
                                                    name="resigned"
                                                    :value="true"
                                                    :native-value="true"
                                                    v-model="form.resigned" class="pl-4 radio radio-warning radio-sm">
                                            </label>
                                            <label class="cursor-pointer label" for="no">
                                            <span class="label-text font-extrabold">No</span> 
                                            <input type="radio"
                                                    id="no"
                                                    name="resigned"
                                                    :value="false"
                                                    :native-value="false"
                                                    v-model="form.resigned" class="pl-4 radio radio-warning radio-sm">
                                            </label> 
                                        </div>
                                    <span class="text-white">{{ errors[0] }}</span>
                                    </ValidationProvider> 
                                  </div>
                                  <div v-if="form.work_experience==true" class="border border-warning px-2  flex flex-wrap pt-3">
                                        <div>
                                              <label for="country" class="block text-sm font-extrabold pb-1 text-white">Looking for job change?</label>
                                        </div>
                                        <ValidationProvider rules="required" v-slot="{ errors }" slim> 
                                        <div>
                                            <label class="cursor-pointer label" for="yes">
                                            <span class="label-text font-extrabold">Yes</span> 
                                            <input type="radio"
                                                    id="yes"
                                                    name="job"
                                                    :value="true"
                                                    :native-value="true"
                                                    v-model="form.job" class="pl-4 radio radio-warning radio-sm">
                                            </label>
                                            <label class="cursor-pointer label" for="no">
                                            <span class="label-text font-extrabold">No</span> 
                                            <input type="radio"
                                                    id="no"
                                                    name="job"
                                                    :value="false"
                                                    :native-value="false"
                                                    v-model="form.job" class="pl-4 radio radio-warning radio-sm">
                                            </label> 
                                        </div> 
                                      <span class="text-white">{{ errors[0] }}</span>
                                        </ValidationProvider> 
                                  </div>
                                  <div v-if="form.work_experience==true" class="border border-warning pb-4 pr-4 pl-4 ">
                                    <label for="country" class="block text-sm font-extrabold text-white">Total year of experience</label>
                                        <ValidationProvider rules="required" v-slot="{ errors }" slim>
                                          <v-select
                                              class="select select-bordered text-white"
                                              :class="errors[0] ? 'select-error' : ''"
                                              label="name"
                                              v-model="form.exp_year"
                                              :options="expyears"
                                              placeholder="Select Year of Experience"
                                          ></v-select>
                                                <!-- <select
                                                    v-model="form.exp_year"
                                                    class="select select-bordered text-white"
                                                    :class="errors[0] ? 'select-error' : ''"
                                                >
                                                    <option disabled="disabled" value="" selected="selected">
                                                    select total Year
                                                    </option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                </select> -->
                                                </ValidationProvider>
                                    </div>
                                    <div v-if="form.work_experience==true" class="border border-warning pb-4 pr-4 pl-4 ">
                                    <label for="country1" class="block text-sm font-extrabold text-white">Total month of experience</label>
                                        <ValidationProvider rules="required" v-slot="{ errors }" slim>
                                          <v-select
                                            class="select select-bordered text-white"
                                            :class="errors[0] ? 'select-error' : ''"
                                            label="name"
                                            v-model="form.exp_month"
                                            :options="noticeperiods"
                                            placeholder="Select Total Month"
                                        ></v-select>
                                                <!-- <select
                                                    v-model="form.exp_month"
                                                    class="select select-bordered text-white"
                                                    :class="errors[0] ? 'select-error' : ''"
                                                >
                                                    <option disabled="disabled" value="" selected="selected">
                                                    select total month
                                                    </option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                </select> -->
                                                </ValidationProvider>
                                    </div>
                                    <div v-if="form.work_experience==true" class="border border-warning pr-4 pl-4  pt-6 pb-2">
                                    <label for="country2" class="block text-sm font-extrabold text-white">current/previous job profiles</label>
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
                                                class="border border-warning text-sm selected text-white"
                                                label="name"
                                                v-model="form.designation"
                                                :options="$store.state.student.designation"
                                                :reduce="name => name.id"
                                                placeholder="Select profile"
                                                multiple
                                            ></v-select>
                                            <span class="text-white">{{ errors[0] }}</span>
                                        </ValidationProvider> 
                                    </div>
                                    <div v-if="form.work_experience==true && form.designation!=5" class="border border-warning pr-4 pl-4  pt-2 pb-2">
                                      <label for="country3" class="block text-sm font-extrabold text-white">Current/Previous CTC</label>
                                      <ValidationProvider rules="required" v-slot="{ errors }"> 
                                          <div>
                                          <div class="mt-1 relative rounded-md shadow-sm ">
                                          <input class="shadow-sm 
                                                        focus:ring-indigo-500 
                                                        focus:border-indigo-500 
                                                        mt-1 
                                                        block 
                                                        w-full 
                                                        sm:text-sm 
                                                        border border-warning 
                                                        rounded-md 
                                                        py-2 
                                                        mr-20 
                                                        placeholder-white 
                                                        bg-gray-700 
                                                        pt-4" type="text"  name="text" id="text" :maxlength="10" autocomplete="text"  v-model="form.ctc" >
                                          </div>               
                                          </div>
                                          <span class="text-white">{{ errors[0] }}</span>
                                      </ValidationProvider> 
                                    </div>
                                    <div v-if="form.work_experience==true && form.designation!=5" class="border border-warning pl-4 pr-4 pt-6">
                                          <label for="country4" class="block text-sm font-semibold pb-1 pr-20 text-white">Current/Previous Company</label>
                                          <ValidationProvider rules="required" v-slot="{ errors }"> 
                                              <div class="form-control pb-4">
                                                  <input type="text" placeholder="Enter Name" :maxlength="60" class="input input-sm 
                                                                                                     text-white 
                                                                                                     input-bordered 
                                                                                                     bg-gray-700 
                                                                                                     placeholder-white 
                                                                                                     border-warning" v-model="form.company_name">
                                              </div>               
                                              <span class="text-white">{{ errors[0] }}</span>
                                          </ValidationProvider> 
                                    </div>
                                   </div>
                                  <div  v-for="(reason, i) in form.designation" :key="i" :value="reason.id">
                                    <div class="grid md:grid-cols-3 sm:grid-cols-1 gap-4 m-5">
                                      <div v-if="reason==5" class="border border-warning pt-2 pl-4 pr-4 ">
                                    <label for="country5" class="block text-sm font-extrabold pb-1 pr-20 text-white">Other Profiles</label>
                                        <ValidationProvider rules="required" v-slot="{ errors }">
                                            <div class="form-control pt-2 pb-4">
                                                <input type="text" name="email" id="email" v-model="form.odesignation" :maxlength="80" placeholder="Enter Designation" class="input input-sm 
                                                                                                                                                              bg-bg-transparent  
                                                                                                                                                              text-white 
                                                                                                                                                              input-bordered 
                                                                                                                                                              bg-gray-700 
                                                                                                                                                              placeholder-white 
                                                                                                                                                              border border-warning">
                                            </div>               
                                          <span class="text-white mb-10">{{ errors[0] }}</span>
                                        </ValidationProvider>  
                                    </div>
                                    </div>
                                      <div v-if="reason ==1 && form.work_experience==true"
                                        class="
                                          w-full
                                          text-black text-center
                                          font-semibold
                                          border border-white
                                          pl-1
                                          pr-1
                                          bg-gray-400
                                        "
                                      >
                                        Testing experience
                                      </div>
                                      <div  v-if ="reason == 1 && form.work_experience==true" class="grid md:grid-cols-3 sm:grid-cols-1 gap-4 m-5">
                                      <div class="border border-warning  pr-4 pl-4 pt-8 pb-2">
                                        <label for="country6" class="block text-sm font-extrabold text-white">Year</label>
                                            <ValidationProvider rules="required" v-slot="{ errors }" slim>
                                              <v-select
                                                  class="select select-bordered text-white"
                                                  :class="errors[0] ? 'select-error' : ''"
                                                  label="name"
                                                  v-model="form.test_year"
                                                  :options="expyears"
                                                  placeholder="Select Total Year"
                                              ></v-select>
                                                    <!-- <select
                                                        v-model="form.test_year"
                                                        class="select select-bordered"
                                                        :class="errors[0] ? 'select-error' : ''"
                                                    >
                                                        <option disabled="disabled" value="" selected="selected">
                                                        select total year
                                                        </option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                        <option value="11">11</option>
                                                        <option value="12">12</option>
                                                    </select> -->
                                                    </ValidationProvider>
                                        </div>
                                        <div class="border border-warning pr-4 pl-4 pt-8 pb-2">
                                        <label for="country7" class="block text-sm font-extrabold text-white">Month</label>
                                            <ValidationProvider rules="required" v-slot="{ errors }" slim>
                                              <v-select
                                                  class="select select-bordered text-white"
                                                  :class="errors[0] ? 'select-error' : ''"
                                                  label="name"
                                                  v-model="form.test_month"
                                                  :options="noticeperiods"
                                                  placeholder="Select Total Month"
                                              ></v-select>
                                                    <!-- <select
                                                        v-model="form.test_month"
                                                        class="select select-bordered"
                                                        :class="errors[0] ? 'select-error' : ''"
                                                    >
                                                        <option disabled="disabled" value="" selected="selected">
                                                        select total month
                                                        </option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                        <option value="11">11</option>
                                                        <option value="12">12</option>
                                                    </select> -->
                                                    </ValidationProvider>
                                        </div>
                                      <div class="border border-warning pl-4 pr-4 pt-8">
                                        <label for="country8" class="block text-sm font-semibold pb-1 pr-20 text-white">Languages worked on</label>
                                              <div class="form-control pb-4">
                                                  <input type="text" placeholder="Enter here" :maxlength="40" class="input input-sm 
                                                                                                   text-white 
                                                                                                   input-bordered 
                                                                                                   bg-gray-700 
                                                                                                   placeholder-white 
                                                                                                   border-warning" v-model="form.test_language">
                                              </div>               
                                      </div>
                           <div class="border border-warning pr-4 pl-4 pb-4">
                            <label for="country11" class="block text-sm font-extrabold text-white">Testing management Tool</label>
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
                                       class="border border-warning text-sm "
                                        label="name"
                                        v-model="form.test_tool"
                                        :options="$store.state.student.management_tool"
                                        :reduce="name => name.id"
                                        placeholder="Select Management Tool"
                                        multiple
                                    ></v-select>
                            </div>
                            <div class="border border-warning pb-4 pr-4 pl-4 ">
                                      <label for="country9" class="block text-sm font-extrabold text-white">Domains Worked on:</label>
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
                                                class="border border-warning text-sm "
                                                  label="name"
                                                  v-model="form.test_domain"
                                                  :options="$store.state.student.domains"
                                                  :reduce="name => name.id"
                                                  placeholder="Select domain"
                                                  multiple
                                              ></v-select>
                                      </div>
                                     <div>
                                        <div v-for="reason in form.test_domain" :key="reason" :value="reason.id"  >
                                              <div v-if="reason==11" class="form-control pt-2 pb-10 border border-warning " > 
                                                <label for="country" class="block text-sm font-extrabold pb-1 pr-20 text-white">Other Domain</label> 
                                                  <input type="text" name="email" id="email" v-model="form.test_odomain" :maxlength="60" placeholder="Enter Domain" class="input input-sm  text-white input-bordered bg-gray-700 placeholder-white ">
                                              </div>               
                                          </div>
                                      </div>
                           </div>
                          <div v-if="reason ==2 && form.work_experience==true"
                            class="
                              w-full
                              text-black text-center
                              font-semibold
                              border border-white
                              pl-1
                              pr-1
                              bg-gray-400

                            "
                          >
                            Development experience
                          </div>
                          <div v-if="reason ==2 && form.work_experience==true" class="grid md:grid-cols-3 sm:grid-cols-1 gap-4 m-5">
                            <div class="border border-warning  pr-4 pl-4 pt-2 pb-2">
                            <label for="country12" class="block text-sm font-extrabold text-white">Year</label>
                                 <ValidationProvider rules="required" v-slot="{ errors }" slim>
                                   <v-select
                                      class="select select-bordered text-white"
                                      :class="errors[0] ? 'select-error' : ''"
                                      label="name"
                                      v-model="form.dev_year"
                                      :options="expyears"
                                      placeholder="Select Total Year"
                                  ></v-select>
                                        <!-- <select
                                            v-model="form.dev_year"
                                            class="select select-bordered"
                                            :class="errors[0] ? 'select-error' : ''"
                                        >
                                            <option disabled="disabled" value="" selected="selected">
                                            select total year
                                            </option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select> -->
                                  </ValidationProvider>
                            </div>
                            <div class="border border-warning pr-4 pl-4 pt-2 pb-2">
                            <label for="country13" class="block text-sm font-extrabold text-white">Month</label>
                                <ValidationProvider rules="required" v-slot="{ errors }" slim>
                                  <v-select
                                      class="select select-bordered text-white"
                                      :class="errors[0] ? 'select-error' : ''"
                                      label="name"
                                      v-model="form.dev_month"
                                      :options="noticeperiods"
                                      placeholder="Select Total Month"
                                  ></v-select>
                                        <!-- <select
                                            v-model="form.dev_month"
                                            class="select select-bordered"
                                            :class="errors[0] ? 'select-error' : ''"
                                        >
                                            <option disabled="disabled" value="" selected="selected">
                                            select total month
                                            </option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select> -->
                                        </ValidationProvider>
                            </div>                         
                            <div class="border border-warning pl-4 pr-4 pt-8">
                                <label for="country14" class="block text-sm font-semibold pb-1 pr-20 text-white">Any other Skills/tools</label>
                                <div class="form-control pb-4">
                                    <input type="text" placeholder="Enter here" :maxlength="50" class="input input-sm 
                                                                                      text-white 
                                                                                        input-bordered 
                                                                                      bg-gray-700 
                                                                                      placeholder-white 
                                                                                      border-warning" v-model="form.dev_oskills">
                                </div>               
                            </div>
                           <div class="border border-warning pr-4 pl-4 pb-4">
                            <label for="country15" class="block text-sm font-extrabold text-white">Programming language worked on:</label>
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
                                       class="border border-warning text-sm "
                                        label="name"
                                        v-model="form.dev_planguage"
                                        :options="$store.state.student.programing_language"
                                        :reduce="name => name.id"
                                        placeholder="Select language"
                                        multiple
                                    ></v-select>
                            </div>
                            <div class="border border-warning  pr-4 pl-4 pb-4">
                            <label for="country16" class="block text-sm font-extrabold text-white">Scripting language worked on:</label>
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
                                       class="border border-warning text-sm "
                                        label="name"
                                        v-model="form.dev_slanguage"
                                        :options="$store.state.student.scripting_language"
                                        :reduce="name => name.id"
                                        placeholder="Select language"
                                        multiple
                                    ></v-select>
                            </div>
                            <div class="border border-warning pr-4 pl-4 pb-4">
                            <label for="country17" class="block text-sm font-extrabold text-white">Other language worked on:</label>
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
                                       class="border border-warning text-sm "
                                        label="name"
                                        v-model="form.dev_olanguage"
                                        :options="$store.state.student.other_language"
                                        :reduce="name => name.id"
                                        placeholder="Select language"
                                        multiple
                                    ></v-select>
                            </div>
                            <div class="border border-warning pr-4 pl-4 pb-4">
                            <label for="country18" class="block text-sm font-extrabold text-white">Database worked on:</label>
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
                                       class="border border-warning text-sm "
                                        label="name"
                                        v-model="form.dev_database"
                                        :options="$store.state.student.database"
                                        :reduce="name => name.id"
                                        placeholder="Select language"
                                        multiple
                                    ></v-select>
                            </div>
                            <div class="border border-warning pr-4 pl-4 pb-4">
                            <label for="country19" class="block text-sm font-extrabold text-white">Operating system worked on:</label>
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
                                       class="border border-warning text-sm "
                                        label="name"
                                        v-model="form.dev_os"
                                        :options="$store.state.student.operating_system"
                                        :reduce="name => name.id"
                                        placeholder="Select language"
                                        multiple
                                    ></v-select>
                            </div>  
                          </div>
                              </div>
                              <div class="mt-4 ml-9 mr-6">
                                <div class="px-4 py-3 text-right sm:px-6 ml-5 mr-5">
                                  <button type="submit" class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-extrabold rounded-md text-black bg-warning hover:bg-warning ">
                                    Next
                                  </button>
                                </div>
                              </div> 
         
        </section>
        </form>
        </validation-observer>
    </div>  
    </div> 
    </div>
    <Otherdetails v-if="showOtherdetail" />
    </div> 
</template> 

<script>

import vSelect from "vue-select";

export default {
  middleware: ["authenticated","is_student"],
  components: { "v-select": vSelect},
  data() {
       return{
         form:{
            
            },
            cancelex:false,
            showother : false,
            dipinfoo:{
              other_stream:false,
              other_college:false
            },
            degreeeinfo:{
              other_stream:false,
              other_college:false
            },
            mastersinfo:{
              other_stream:false,
              other_college:false   
            },
            showOtherdetail : false,
            images:null,
            astate:null,
            bstate:null,
            students:[],
            mobileErrors: "",
            mobileErrors1:"",
            mobileErrors2:"",
            inputOptions: {
            autocomplete: "off",
            required: true,
            placeholder: "Enter a phone number",
            styleClasses:
                "py-2 placeholder-gray-500 text-gray-800 relative bg-white rounded text-sm border border-red-500 outline-none focus:outline-none focus:ring w-full",
            },
            student:{},
            radio:"",
            years: [...Array(30)].map((a, b) => new Date().getFullYear() - b),
            months:[...Array(30)].map((a, b) => new Date().getMonth() - b),
            noticeperiods: [...Array(13).keys()],
            expyears : [...Array(50).keys()],
       }
  },
  async fetch() {
   
    this.form.name = this.$store.state.auth.firstname
    await this.$store.dispatch("title", "QSAAS Student Profile");  
    await this.$store.dispatch('student/getDatabase')
    await this.$store.dispatch('student/getOtherlanguage')
    await this.$store.dispatch('student/getScriptinglanguage')
    await this.$store.dispatch('student/getPrograminglanguage')
    await this.$store.dispatch('student/getManagementTool') 
    await this.$store.dispatch('student/getStates')
    await this.$store.dispatch('student/getHighestdegree')
    await this.$store.dispatch('student/getDesignation')  
    await this.$store.dispatch('student/getDomains')
    await this.$store.dispatch('student/getOperatingSystem')
    
    
  },
  
  methods:{
    async closebutton2(){
      location.reload();
    },
    async Experiencesubmit(){
      if(this.form.test_domain)
      {
      var dat = this.form.test_domain
        var nam =  dat.indexOf(11);
        if(nam==-1)
        {
          this.form.test_odomain=null
        }
      }
     if(this.form.designation){
      var datas = this.form.designation
        var names =  datas.indexOf(1);
        if(names==-1){
          this.form.test_year=null,
          this.form.test_month=null,
          this.form.test_language="",
          this.form.test_domain=[],
          this.form.test_odomain="",
          this.form.test_tool=[]
        }
      var datass = this.form.designation
      var namess =  datass.indexOf(2);
      if(namess==-1){
          this.form.dev_year=null,
          this.form.dev_month=null,
          this.form.dev_oskills="",
          this.form.dev_planguage=[],
          this.form.dev_slanguage=[],
          this.form.dev_olanguage=[],
          this.form.dev_database=[],
          this.form.dev_os=[]
        }
      }
    this.showOtherdetail = true
    if (this.form.highest_degree_id!=21){
          this.form.ohighest_degree=null
      }
    if(this.form.work_experience==false){
      this.form.working=false,
      this.form.notice_period=null,
      this.form.month_gap=null,
      this.form.resigned=false,
      this.form.job=false,
      this.form.exp_year=null,
      this.form.exp_month=null,
      this.form.designation=[],
      this.form.ctc = 0.0,
      this.form.company_name = "",
      this.form.odesignation=""
      this.form.test_year=null,
      this.form.test_month=null,
      this.form.test_language="",
      this.form.test_domain=[],
      this.form.test_odomain="",
      this.form.test_tool=[],
      this.form.dev_year=null,
      this.form.dev_month=null,
      this.form.dev_oskills="",
      this.form.dev_planguage=[],
      this.form.dev_slanguage=[],
      this.form.dev_olanguage=[],
      this.form.dev_database=[],
      this.form.dev_os=[]
    } 
       try{
          await this.$store.dispatch('student/getExperience', this.form);
          if (this.$store.state.student.experience){
            await this.$store.dispatch("alerts/alert", {
                      text: "Successfully added Experience Information",
                      type: "success",
                    });
            this.$store.dispatch("student/resetmsg");
          }
          if (this.$store.state.student.experience.status==200){
              const userData = JSON.parse(localStorage.getItem("user"));
              userData.profile.experience = 1
              localStorage.setItem("user", JSON.stringify(userData));
              const userDatass = JSON.parse(localStorage.getItem("user"));
            }
          if (this.$store.state.student.error){
                await this.$store.dispatch("alerts/alert", {
                    text: this.$store.state.student.errorMsg,
                    type: "error",
              });
              this.$store.dispatch("student/resetmsg");
              }
    
       }
       catch(err){
              await this.$store.dispatch("alerts/alert", {
                text: "Something went wrong",
                type: "error",
              });
            }
    }
  },

}
</script>
<style scoped>
.hello{
  width:100%
}
.modal-card-body{
 overflow-y: auto;
}
/* .vs__open-indicator,
.vs__clear {
  fill: hsla(var(--bc) / var(--tw-text-opacity, 1));
} */
</style>

       