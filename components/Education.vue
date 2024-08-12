
<template>
    <div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
   	<div class="absolute bg-white opacity-80 inset-0 z-0"></div>
    <div class="hello max-w-6xl h-screen z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-700">
    <div class="hello max-w-6xl h-screen z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg modal-card-body">
    <div class="p-3  mt-2 text-center space-x-4">
        <div v-if="cancele==true" class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
        <div class="absolute bg-gray-400 opacity-80 inset-0 z-0"></div>
        <div class=" max-8xl  z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900 modal-card-body">
        <div class="hello max-w-xl h-xl z-30 p-5 relative mx-auto my-auto rounded-xl shadow-lg">
        <p class="text-white">Are you sure you want to Exit?</p>
            <div class="flex justify-end pt-2">
              <button
                @click="cancele = false"
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
                @click="closebutton1()"
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
        <form @submit.stop.prevent="handleSubmit(Educationsubmit)">
              <div class="flex justify-right items-right pb-3">
              <div class="modal-close cursor-pointer z-50" v-on:click="cancele=true">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
              </div>
              </div> 
              <div class="modal-card pb-4" style="width: auto">
                  <ul class="w-full steps">
                      <li data-content="✓" class="step step-success">Personal details</li> 
                      <li data-content="✕" class="step step-accent">Educational details</li> 
                      <li data-content="✕" class="step">Other details</li> 
                  </ul>
              </div>
              <section class="px-1 py-1 pt-4">
                      <div class="grid md:grid-cols-3 sm:grid-cols-1 gap-4 m-5">
                      <div class="border border-accent pt-3 pr-4 pl-4 pb-6">
                      <label for="country" class="block text-sm font-extrabold text-blue-5000">10th Board</label>
                      <ValidationProvider rules="required" v-slot="{ errors }">
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
                                text-white
                            "
                            >
                            </span>       
                            <v-select 
                              class="border border-accent text-sm text-white selected"
                              label="name"
                              v-model="form.ten_board_id"
                              :options="$store.state.student.tenth_board"
                              :reduce="name => name.id"
                              placeholder="Select 10th Board"
                            >
                            </v-select>
                            <span class="text-warning">{{ errors[0] }}</span>
                      </ValidationProvider>
                      </div>
                      <div class="border border-accent pt-3 pr-4 pl-4 pb-2">
                      <label for="country" class="block text-sm font-extrabold text-blue-5000">10th Percentage</label>
                      <div>
                          <ValidationProvider rules="required" v-slot="{ errors }">
                              <input class="shadow-sm 
                                          focus:ring-indigo-500 
                                          focus:border-indigo-500 
                                            mt-1 
                                            block 
                                            w-full 
                                            sm:text-sm 
                                            border border-gray-300 
                                            rounded-md 
                                            py-2 
                                            mr-20 
                                            placeholder-white 
                                            bg-gray-700 " type="number"  name="number" id="number" autocomplete="number"  v-model = form.ten_percentage min="35" max="100" step=".01" placeholder="Aggregate in %">              
                              <span class="text-warning">{{ errors[0] }}</span>
                              </ValidationProvider> 
                          </div> 
                      </div>
                      <div class="border border-accent pt-3 pr-4 pl-4 pb-2">
                        <label for="country" class="block text-sm font-extrabold text-blue-5000">10th YOP</label>
                              <ValidationProvider rules="required" v-slot="{ errors }" slim>
                                <v-select
                                    class="border border-accent text-sm selected"
                                    label="name"
                                    v-model="form.ten_yop"
                                    :options="years"
                                    placeholder="Select YOP"
                                ></v-select>
                                <span class="text-warning">{{ errors[0] }}</span>
                                </ValidationProvider>
                      </div>
                      </div>
                      <div class="grid md:grid-cols-3 sm:grid-cols-1 gap-4 m-5">
                         <div class="border border-accent pt-3 pr-4 pl-4 pb-6">
                          <label for="country" class="block text-sm font-extrabold text-blue-5000">12th Board</label>
                          <ValidationProvider rules="required" v-slot="{ errors }">
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
                                        class="border border-accent text-sm selected"
                                        label="name"
                                        v-model="form.twelfth_board_id"
                                        :options="$store.state.student.twelfth_board"
                                        :reduce="name => name.id"
                                        placeholder="Select 12th Board"
                                    ></v-select>
                                     <span class="text-warning">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div> 
                            <div class="border border-accent pt-3 pr-4 pl-4 pb-2">
                            <label for="country" class="block text-sm font-extrabold text-blue-5000">12th/Diploma/ITI Percentage</label>
                                <div>
                                    <ValidationProvider rules="required" v-slot="{ errors }">
                                        <input class="shadow-sm 
                                                    focus:ring-indigo-500 
                                                    focus:border-indigo-500 
                                                      mt-1 
                                                      block 
                                                      w-full 
                                                      sm:text-sm 
                                                      border border-gray-300 
                                                      rounded-md 
                                                      py-2 
                                                      mr-20 
                                                      placeholder-white 
                                                      bg-gray-700"  type="number"  name="number" id="number" autocomplete="number"  v-model="form.twelfth_percentage" min="35" max="100" step=".01" placeholder="Aggregate in %">              
                                        <span class="text-warning">{{ errors[0] }}</span>
                                    </ValidationProvider> 
                                </div> 
                            </div>
                            <div class="border border-accent pt-3 pr-4 pl-4 pb-2">
                            <label for="country" class="block text-sm font-extrabold text-blue-5000">12th/Diploma/ITI YOP</label>
                                    <ValidationProvider rules="required" v-slot="{ errors }" slim>
                                        <v-select
                                            class="border border-accent text-sm selected"
                                            label="name"
                                            v-model="form.twelfth_yop"
                                            :options="years"
                                            placeholder="Select YOP"
                                        ></v-select>
                                        <span class="text-warning">{{ errors[0] }}</span>
                                        </ValidationProvider>
                            </div>
                            <div v-if="form.twelfth_board_id==1" class="border border-accent pt-3 pr-4 pl-4 pb-6">
                            <label for="country" class="block text-sm font-extrabold text-blue-5000">12th Course Type</label>
                            <ValidationProvider rules="required" v-slot="{ errors }"> 
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
                                            class="border border-accent text-sm selected"
                                            label="name"
                                            v-model="form.twelfth_ctype_id"
                                            :options="$store.state.student.course_type"
                                            :reduce="name => name.id"
                                            placeholder="Select Course type"
                                        ></v-select>
                                        <span class="text-warning">{{ errors[0] }}</span>
                            </ValidationProvider> 
                            </div>
                            <div v-if="form.twelfth_board_id==2"  class="border border-accent pt-3 pr-4 pl-4 pb-6">
                            <label for="country" class="block text-sm font-extrabold text-blue-5000">Diploma Course Type</label>
                            <ValidationProvider rules="required" v-slot="{ errors }"> 
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
                                    class="border border-accent text-sm selected"
                                    label="name"
                                    v-model="form.dip_ctype_id"
                                    :options="$store.state.student.course_type"
                                    :reduce="name => name.id"
                                    placeholder="Select Course Type"
                                ></v-select>
                                  <span class="text-warning">{{ errors[0] }}</span>
                            </ValidationProvider> 
                            </div> 
                            <div v-if="form.twelfth_board_id==2" class="border border-accent pt-3 pr-4 pl-4 pb-6">
                            <label for="country" class="block text-sm font-extrabold text-blue-5000">Diploma Stream</label>
                            <ValidationProvider rules="required" v-slot="{ errors }"> 
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
                                        class="border border-accent text-sm selected"
                                        label="name"
                                        v-model="form.dip_stream_id"
                                        :filterable="false"
                                        :options="dipstreams"
                                        :reduce="name => name.id"
                                        placeholder="Search Diploma Stream"
                                        @search="
                                            (search, loading) =>
                                              searchStream(search, loading, 'Diploma')
                                          "
                                    ></v-select>
                                    <span class="text-warning">{{ errors[0] }}</span>
                              </ValidationProvider> 
                              </div>
                            <div v-if="form.dip_stream_id==140 && form.twelfth_board_id==2" class="border border-accent pt-2 pl-4 pr-4">
                            <label for="country" class="block text-sm font-extrabold pb-1 pr-20">Other Stream</label>
                                    <div class="form-control pt-2 pb-4">
                                        <input type="text" name="email" id="email" v-model="form.dip_ostream" :maxlength="30" placeholder="Enter Diploma Stream" class="input input-sm 
                                                                                                                                                        bg-bg-transparent  
                                                                                                                                                      text-white 
                                                                                                                                                        input-bordered 
                                                                                                                                                      bg-gray-700 
                                                                                                                                                      placeholder-white 
                                                                                                                                                        border border-accent">
                                    </div>               
                            </div>
                            <div v-if="form.twelfth_board_id==2"  class="border border-accent pt-3 pr-4 pl-4 pb-6">
                            <label for="country" class="block text-sm font-extrabold text-blue-5000">Diploma University</label>
                            <ValidationProvider rules="required" v-slot="{ errors }"> 
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
                                        class="border border-accent text-sm selected"
                                        label="name"
                                        v-model="form.dip_university_id"
                                        :options="$store.state.student.university_dip"
                                        :reduce="name => name.id"
                                        placeholder="Select University"
                                    ></v-select>
                                    <span class="text-warning">{{ errors[0] }}</span>
                            </ValidationProvider> 
                            </div> 
                              <div v-if="form.dip_university_id==198 && form.twelfth_board_id==2" class="border border-accent pt-2 pl-4 pr-4">
                            <label for="country" class="block text-sm font-extrabold pb-1 pr-20">Other University</label>
                                    <div class="form-control pt-2 pb-4">
                                        <input type="text" name="email" id="email" v-model="form.dip_ouniversity" :maxlength="40" placeholder="Enter University" class="input input-sm 
                                                                                                                                                        bg-bg-transparent  
                                                                                                                                                      text-white 
                                                                                                                                                        input-bordered 
                                                                                                                                                      bg-gray-700 
                                                                                                                                                      placeholder-white 
                                                                                                                                                        border border-accent">
                                    </div>               
                            </div>
                            <div v-if="form.twelfth_board_id==2" class="border border-accent pt-3 pr-4 pl-4 pb-6">
                            <label for="country" class="block text-sm font-extrabold text-blue-5000">Diploma College</label>
                            <ValidationProvider rules="required" v-slot="{ errors }"> 
                                    <span
                                    class="
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
                                        class="border border-accent text-sm selected"
                                        label="name"
                                        v-model="form.dip_college_id"
                                        :filterable="false"
                                        :options="dipcolleges"
                                        :reduce="name => name.id"
                                        placeholder="Search Diploma College"
                                        @search="
                                            (search, loading) =>
                                              searchCollege(search, loading, 'Diploma')
                                          "
                                    ></v-select>
                                    <span class="text-warning">{{ errors[0] }}</span>
                            </ValidationProvider> 
                            </div> 
                            <div v-if="form.dip_college_id==3363 && form.twelfth_board_id==2" class="border border-accent pt-2 pl-4 pr-4">
                            <label for="country" class="block text-sm font-extrabold pb-1 pr-20">Other College</label>
                                <div class="form-control pt-2 pb-4">
                                    <input type="text" name="email" id="email" v-model="form.dip_ocollege" :maxlength="30" placeholder="Enter College" class="input input-sm 
                                                                                                                                              bg-bg-transparent  
                                                                                                                                            text-white 
                                                                                                                                              input-bordered 
                                                                                                                                            bg-gray-700 
                                                                                                                                            placeholder-white 
                                                                                                                                              border border-accent">
                                </div>               
                            </div>
                          <div class="border border-accent pt-3 pr-4 pl-4 pb-6">
                            <label for="country" class="block text-sm font-extrabold text-blue-5000">Degree Course Type</label>
                            <ValidationProvider rules="required" v-slot="{ errors }"> 
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
                                        class="border border-accent text-sm selected"
                                        label="name"
                                        v-model="form.deg_ctype_id"
                                        :options="$store.state.student.course_type"
                                        :reduce="name => name.id"
                                        placeholder="Select Course Type"
                                    ></v-select>
                                     <span class="text-warning">{{ errors[0] }}</span>
                            </ValidationProvider> 
                            </div> 
                            <div class="border border-accent pt-3 pr-4 pl-4 pb-6">
                            <label for="country" class="block text-sm font-extrabold text-blue-5000">Degree Type</label>
                            <ValidationProvider rules="required" v-slot="{ errors }"> 
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
                                        class="border border-accent text-sm selected"
                                        label="name"
                                        v-model="form.deg_name_id"
                                        :options="$store.state.student.degree"
                                        :reduce="name => name.id"
                                        placeholder="Select Degree Type"
                                    ></v-select>
                                    <span class="text-warning">{{ errors[0] }}</span>
                            </ValidationProvider> 
                            </div> 
                                <div v-if="form.deg_name_id==11" class="border border-accent pt-2 pl-4 pr-4">
                            <label for="country" class="block text-sm font-extrabold pb-1 pr-20">Other Degree</label>
                                    <div class="form-control pt-2 pb-4">
                                        <input type="text" name="email" id="email" :maxlength="40" v-model="form.deg_oname" placeholder="Enter Degree Type" class="input input-sm 
                                                                                                                                                   bg-bg-transparent  
                                                                                                                                                 text-white 
                                                                                                                                                   input-bordered 
                                                                                                                                                 bg-gray-700 
                                                                                                                                                 placeholder-white 
                                                                                                                                                   border border-accent">
                                    </div>               
                            </div>
                            <div class="border border-accent pt-3 pr-4 pl-4 pb-6">
                            <label for="country" class="block text-sm font-extrabold ">Degree Stream</label>
                            <ValidationProvider rules="required" v-slot="{ errors }"> 
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
                                        class="border border-accent text-sm selected text-white"
                                        label="name"
                                        v-model="form.deg_stream_id"
                                        :filterable="false"
                                        :reduce="name => name.id"
                                        :options="degstreams"
                                        placeholder="Search Degree Stream"
                                        @search="
                                            (search, loading) =>
                                              searchStream(search, loading, 'Degree')
                                          "
                                    ></v-select>
                                     <span class="text-warning">{{ errors[0] }}</span>
                            </ValidationProvider> 
                            </div>
                            <div v-if="form.deg_stream_id==41" class="border border-accent pt-2 pl-4 pr-4">
                            <label for="country" class="block text-sm font-extrabold pb-1 pr-20">Other Degree Stream</label>
                                    <div class="form-control pt-2 pb-4">
                                        <input type="text" name="email" id="email" v-model="form.deg_ostream" :maxlength="30" placeholder="Enter Stream" class="input input-sm 
                                                                                                                                                bg-bg-transparent  
                                                                                                                                              text-white 
                                                                                                                                                input-bordered 
                                                                                                                                              bg-gray-700 
                                                                                                                                              placeholder-white 
                                                                                                                                              border border-accent">
                                    </div>               
                            </div>

                            <div class="border border-accent pt-3 pr-4 pl-4 pb-2">
                                <label for="country" class="block text-sm font-extrabold text-blue-5000">Degree YOP</label>
                                <ValidationProvider rules="required" v-slot="{ errors }" slim>
                                    <v-select
                                        class="border border-accent text-sm selected"
                                        label="name" 
                                        :options="years"
                                        v-model="form.deg_yop"
                                        placeholder="Select YOP"
                                    ></v-select>
                                    <span class="text-warning">{{ errors[0] }}</span>
                                    </ValidationProvider>
                            </div>
                              <div class="border border-accent pt-3 pr-4 pl-4 pb-2">
                                  <label for="country" class="block text-sm font-extrabold text-blue-5000">Degree Percentage</label>
                                  <div class="pb-8">
                                      <ValidationProvider rules="required" v-slot="{ errors }">
                                          <input class="shadow-sm 
                                                      focus:ring-indigo-500 
                                                      focus:border-indigo-500 
                                                        mt-1 
                                                        block 
                                                        w-full 
                                                        sm:text-sm 
                                                        border border-gray-300 
                                                        rounded-md 
                                                        py-2 
                                                        mr-20 
                                                        placeholder-white 
                                                        bg-gray-700" type="number"  name="number" id="number" autocomplete="number"  min="35" max="100" step=".01" placeholder="Aggregate in %"  v-model="form.deg_percentage">              
                                          <span class="text-warning">{{ errors[0] }}</span>
                                          </ValidationProvider>
                                      </div> 
                                </div>
                                <div class="border border-accent pt-3 pr-4 pl-4 ">
                                    <label for="country" class="block text-sm font-extrabold text-blue-5000">Degree CGPA</label>
                                    <div class="pb-8">
                                            <input class="shadow-sm 
                                                        focus:ring-indigo-500 
                                                        focus:border-indigo-500 
                                                          mt-1 
                                                          block 
                                                          w-full sm:text-sm 
                                                          border border-gray-300 
                                                          rounded-md py-2 
                                                          mr-20 
                                                          placeholder-white 
                                                          bg-gray-700" type="number"  name="number" id="number" autocomplete="number"  min="3" max="10" step=".01" placeholder="Aggregate in CGPA"  v-model="form.deg_cgpa">              
                                    </div> 
                                </div>
                                <div class="border border-accent pt-3 pr-4 pl-4 pb-6">
                                <label for="country" class="block text-sm font-extrabold text-blue-5000">Degree University</label>
                                <ValidationProvider rules="required" v-slot="{ errors }"> 
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
                                            class="border border-accent text-sm selected"
                                            label="name"
                                            v-model="form.deg_university_id"
                                            :options="$store.state.student.university"
                                            :reduce="name => name.id"
                                            placeholder="Select University"
                                        ></v-select>
                                        <span class="text-warning">{{ errors[0] }}</span>
                                </ValidationProvider> 
                                </div>
                                <div v-if="form.deg_university_id==73" class="border border-accent pt-2 pl-4 pr-4">
                                <label for="country" class="block text-sm font-extrabold pb-1 pr-20">Other University</label>
                                        <div class="form-control pt-2 pb-4">
                                            <input type="text" name="email" id="email" v-model="form.deg_ouniversity" :maxlength="100" placeholder="Enter University" class="input input-sm 
                                                                                                                                                            bg-bg-transparent  
                                                                                                                                                            text-white 
                                                                                                                                                            input-bordered 
                                                                                                                                                            bg-gray-700 
                                                                                                                                                            placeholder-white 
                                                                                                                                                            border border-accent">
                                        </div>               
                                </div>
                                <div class="border border-accent pr-4 pl-4 pt-4">
                                  <label for="country" class="block text-sm font-extrabold text-blue-5000">Degree USN</label>
                                      <ValidationProvider rules="required|alpha_num" v-slot="{ errors }"> 
                                          <div>
                                          <div class="mt-1 relative rounded-md shadow-sm pb-8">
                                          <input type="text" placeholder="Enter USN" :maxlength="20" class="input input-sm 
                                                                                          text-white 
                                                                                            input-bordered 
                                                                                          placeholder-white 
                                                                                          bg-gray-700" v-model="form.deg_usn">
                                          </div>               
                                          </div>
                                          <span class="text-warning">{{ errors[0] }}</span>
                                      </ValidationProvider> 
                                </div>
                                <div class="border border-accent pt-3 pr-4 pl-4 pb-6">
                                <label for="country" class="block text-sm font-extrabold text-blue-5000">Degree College</label>
                                <ValidationProvider rules="required" v-slot="{ errors }"> 
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
                                            class="border border-accent text-sm selected"
                                            label="name"
                                            v-model="form.deg_college_id"
                                            :filterable="false"
                                            :options="degcolleges"
                                            :reduce="name => name.id"
                                            placeholder="Search Degree College"
                                            @search="
                                            (search, loading) =>
                                              searchCollege(search, loading, 'Degree')
                                          "
                                        ></v-select>
                                        <span class="text-warning">{{ errors[0] }}</span>
                                    </ValidationProvider> 
                                </div>
                            <div v-if="form.deg_college_id==1066" class="border border-accent pt-2 pl-4 pr-4">
                            <label for="country" class="block text-sm font-extrabold pb-1 pr-20">Other College</label>
                                    <div class="form-control pt-2 pb-4">
                                        <input type="text" name="email" id="email" v-model="form.deg_ocollege" :maxlength="50" placeholder="Enter College" class="input input-sm 
                                                                                                                                                  bg-bg-transparent  
                                                                                                                                                  text-white 
                                                                                                                                                  input-bordered 
                                                                                                                                                  bg-gray-700 
                                                                                                                                                  placeholder-white 
                                                                                                                                                  border border-accent">
                                    </div>               
                            </div>

                            <div class="border border-accent pt-2 pl-4 pr-4  pb-2">
                              <label for="country" class="block text-sm font-extrabold pb-1 pr-20">College Place</label>
                                  <ValidationProvider rules="required" v-slot="{ errors }"> 
                                      <div class="form-control pt-2">
                                          <input type="text" placeholder="Enter Place" v-model="form.deg_cplace" :maxlength="30" class="input input-sm  
                                                                                                                      text-white 
                                                                                                                        input-bordered 
                                                                                                                      placeholder-white 
                                                                                                                      bg-gray-700">
                                      </div>               
                                      <span class="text-warning">{{ errors[0] }}</span>
                                  </ValidationProvider>
                            </div>
                              <div class="border border-accent px-2  flex flex-wrap pt-3">
                              <label for="country" class="block text-sm font-extrabold pb-1">Did You fail and then clear the subject in degree?</label>
                              <ValidationProvider rules="required" v-slot="{ errors }" slim>
                                <label class="cursor-pointer label" for="yes">
                                  <span class="label-text font-extrabold">Yes</span> 
                                  <input type="radio"
                                        id="yes"
                                        name="deg_fail"
                                        :value="true"
                                        :native-value="true"
                                        v-model="form.deg_fail" class="pl-4 radio radio-secondary radio-sm">
                                </label>
                                <label class="cursor-pointer label" for="no">
                                  <span class="label-text font-extrabold">No</span> 
                                  <input type="radio"
                                        id="no"
                                        name="deg_fail"
                                        :value="false"
                                        :native-value="false"
                                        v-model="form.deg_fail" class="pl-4 radio radio-secondary radio-sm">
                                </label>  
                              <span class="text-warning">{{ errors[0] }}</span>
                              </ValidationProvider> 
                        </div>
                        <div class="border border-accent px-2  flex flex-wrap pt-3">
                        <div>
                            <label for="country" class="block text-sm font-extrabold pb-1">Have any existing backlog in degree?</label>
                        </div>
                          <ValidationProvider rules="required" v-slot="{ errors }" slim> 
                          <div>
                                <label class="cursor-pointer label" for="yes">
                                  <span class="label-text font-extrabold">Yes</span> 
                                  <input type="radio"
                                        id="yes"
                                        name="deg_backlog"
                                        :value="true"
                                        :native-value="true"
                                        v-model="form.deg_backlog" class="pl-4 radio radio-secondary radio-sm">
                                </label>
                                <label class="cursor-pointer label" for="no">
                                  <span class="label-text font-extrabold">No</span> 
                                  <input type="radio"
                                        id="no"
                                        name="deg_backlog"
                                        :value="false"
                                        :native-value="false"
                                        v-model="form.deg_backlog" class="pl-4 radio radio-secondary radio-sm">
                                </label>  
                              </div>
                              <span class="text-warning">{{ errors[0] }}</span>
                          </ValidationProvider> 
                          </div>
                        <div class="border border-accent px-2  flex flex-wrap pt-3">
                        <div>
                            <label for="country" class="block text-sm font-extrabold pb-1">Have you got year gap in degree?</label>
                        </div>
                        <ValidationProvider rules="required" v-slot="{ errors }" slim> 
                            <div>
                              <label class="cursor-pointer label" for="yes">
                                <span class="label-text font-extrabold">Yes</span> 
                                <input type="radio"
                                      id="yes"
                                      name="deg_year_gap"
                                      :value="true"
                                      :native-value="true"
                                      v-model="form.deg_year_gap" class="pl-4 radio radio-secondary radio-sm">
                              </label>
                              <label class="cursor-pointer label" for="no">
                                <span class="label-text font-extrabold">No</span> 
                                <input type="radio"
                                      id="no"
                                      name="deg_year_gap"
                                      :value="false"
                                      :native-value="false"
                                      v-model="form.deg_year_gap" class="pl-4 radio radio-secondary radio-sm">
                              </label> 
                            </div> 
                            <span class="text-warning">{{ errors[0] }}</span>
                          </ValidationProvider> 
                        </div>
                        <div class="border border-accent px-2  flex flex-wrap pt-3">
                          <label for="country" class="block text-sm font-extrabold pb-1">Have you done your master's degree?</label>
                          <ValidationProvider rules="required" v-slot="{ errors }" slim> 
                              <label class="cursor-pointer label" for="yes">
                                <span class="label-text font-extrabold">Yes</span> 
                                <input type="radio"
                                      id="yes"
                                      name="masters"
                                      :value="true"
                                      :native-value="true"
                                      v-model="form.masters" class="pl-4 radio radio-secondary radio-sm">
                              </label>
                              <label class="cursor-pointer label" for="no">
                                <span class="label-text font-extrabold">No</span> 
                                <input type="radio"
                                      id="no"
                                      name="masters"
                                      :value="false"
                                      :native-value="false"
                                      v-model="form.masters" class="pl-4 radio radio-secondary radio-sm">
                              </label>  
                          <span class="text-warning">{{ errors[0] }}</span>
                          </ValidationProvider> 
                        </div>
                        <div v-if="form.masters==true" class="border border-accent pt-3 pr-4 pl-4 pb-6">
                            <label for="country" class="block text-sm font-extrabold text-blue-5000">Master's Course Type</label>
                                <ValidationProvider rules="required" v-slot="{ errors }"> 
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
                                        class="border border-accent text-sm selected"
                                        label="name"
                                        v-model="form.mas_ctype_id"
                                        :options="$store.state.student.course_type"
                                        :reduce="name => name.id"
                                        placeholder="Select Master's Course Type"
                                    ></v-select>
                                     <span class="text-warning">{{ errors[0] }}</span>
                                </ValidationProvider> 
                          </div> 
                          <div v-if="form.masters==true" class="border border-accent pt-3 pr-4 pl-4 pb-6">
                            <label for="country" class="block text-sm font-extrabold text-blue-5000">Master's Degree</label>
                                <ValidationProvider rules="required" v-slot="{ errors }"> 
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
                                        class="border border-accent text-sm selected"
                                        label="name"
                                        v-model="form.mas_name_id"
                                        :options="$store.state.student.mas_degree"
                                        :reduce="name => name.id"
                                        placeholder="Select Master's Degree"
                                    ></v-select>
                                    <span class="text-warning">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div> 
                             <div v-if="form.mas_name_id==22 && form.masters==true" class="border border-accent pt-2 pl-4 pr-4">
                            <label for="country" class="block text-sm font-extrabold pb-1 pr-20">Other Master's Degree Type</label>
                                    <div class="form-control pt-2 pb-4">
                                        <input type="text" name="email" id="email" v-model="form.mas_oname" :maxlength="30" placeholder="Enter Degree Type" class="input input-sm 
                                                                                                                                                   bg-bg-transparent  
                                                                                                                                                   text-white 
                                                                                                                                                   input-bordered 
                                                                                                                                                   bg-gray-700 
                                                                                                                                                   placeholder-white 
                                                                                                                                                   border border-accent">
                                    </div>               
                            </div>

                             <div v-if="form.masters==true" class="border border-accent pt-3 pr-4 pl-4 pb-6">
                            <label for="country" class="block text-sm font-extrabold text-blue-5000">Master's Degree Stream</label>
                                 <ValidationProvider rules="required" v-slot="{ errors }"> 
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
                                        class="border border-accent text-sm selected"
                                        label="name"
                                        v-model="form.mas_stream_id"
                                        :filterable="false"
                                        :options="masstreams"
                                        :reduce="name => name.id"
                                        placeholder="Search Master's Stream"
                                        @search="
                                            (search, loading) =>
                                              searchStream(search, loading, `Master's`)
                                          "
                                    ></v-select>
                                    <span class="text-warning">{{ errors[0] }}</span>
                                </ValidationProvider> 
                            </div> 
                            <div v-if="form.mas_stream_id==131 && form.masters==true"  class="border border-accent pt-2 pl-4 pr-4">
                            <label for="country" class="block text-sm font-extrabold pb-1 pr-20">Other Master's Stream</label>
                                    <div class="form-control pt-2 pb-4">
                                        <input type="text" name="email" id="email" v-model="form.mas_ostream" :maxlength="30" placeholder="Enter Stream" class="input input-sm 
                                                                                                                                                bg-bg-transparent  
                                                                                                                                                text-white 
                                                                                                                                                input-bordered 
                                                                                                                                                bg-gray-700 
                                                                                                                                                placeholder-white 
                                                                                                                                                border border-accent">
                                    </div>               
                            </div>
                             <div  v-if="form.masters==true" class="border border-accent pt-3 pr-4 pl-4 pb-2">
                                <label for="country" class="block text-sm font-extrabold text-blue-5000">Master's Degree YOP</label>
                                <ValidationProvider rules="required" v-slot="{ errors }" slim>
                                    <v-select
                                        class="border border-accent text-sm selected"
                                        label="name"
                                        v-model="form.mas_yop"
                                        :options="years"
                                        placeholder="Select YOP"
                                    ></v-select>
                                    <span class="text-warning">{{ errors[0] }}</span>
                                    </ValidationProvider>
                            </div>
                       
                            <div v-if="form.masters==true" class="border border-accent pt-3 pr-4 pl-4 ">
                                <label for="country" class="block text-sm font-extrabold text-blue-5000">Master's Degree Percentage</label>
                                <div class="pb-4">
                                    <ValidationProvider rules="required" v-slot="{ errors }">
                                        <input class="shadow-sm 
                                                    focus:ring-indigo-500 
                                                    focus:border-indigo-500 
                                                      mt-1 
                                                      block 
                                                      w-full 
                                                      sm:text-sm 
                                                      border border-gray-300 
                                                      rounded-md py-2 
                                                      mr-20 
                                                      placeholder-white 
                                                      bg-gray-700" type="number"  name="number" id="number" autocomplete="number"  min="35" max="100" step=".01" placeholder="Aggregate in %" v-model="form.mas_percentage">              
                                        <span class="text-warning">{{ errors[0] }}</span>
                                    </ValidationProvider> 
                                </div> 
                            </div>
                            <div v-if="form.masters==true" class="border border-accent pt-3 pr-4 pl-4 ">
                                <label for="country" class="block text-sm font-extrabold text-blue-5000">Master's Degree CGPA</label>
                                <div class="pb-4">
                                        <input class="shadow-sm 
                                                    focus:ring-indigo-500 
                                                    focus:border-indigo-500 
                                                      mt-1 
                                                      block 
                                                      w-full 
                                                      sm:text-sm 
                                                      border border-gray-300 
                                                      rounded-md 
                                                      py-2 
                                                      mr-20 
                                                    placeholder-white 
                                                    bg-gray-700" type="number"  name="number" id="number" autocomplete="number"  min="3" max="10" step=".01" placeholder="Aggregate in CGPA" v-model="form.mas_cgpa">              
                                </div> 
                            </div>
                            <div v-if="form.masters==true" class="border border-accent pt-3 pr-4 pl-4 pb-6">
                            <label for="country" class="block text-sm font-extrabold text-blue-5000">Master's Degree University</label>
                                  <ValidationProvider rules="required" v-slot="{ errors }"> 
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
                                          class="border border-accent text-sm selected"
                                          label="name"
                                          v-model="form.mas_university_id"
                                          :options="$store.state.student.university_mas"
                                          :reduce="name => name.id"
                                          placeholder="Select University"
                                      ></v-select>
                                      <span class="text-warning">{{ errors[0] }}</span>
                                  </ValidationProvider> 
                            </div>
                            <div v-if="form.mas_university_id==138 && form.masters==true" class="border border-accent pt-2 pl-4 pr-4">
                            <label for="country" class="block text-sm font-extrabold pb-1 pr-20">Other University</label>
                                <div class="form-control pt-2 pb-4">
                                    <input type="text" name="email" id="email" v-model="form.mas_ouniversity" :maxlength="100" placeholder="Enter University" class="input input-sm 
                                                                                                                                                    bg-bg-transparent  
                                                                                                                                                    text-white 
                                                                                                                                                    input-bordered 
                                                                                                                                                    bg-gray-700 
                                                                                                                                                    placeholder-white 
                                                                                                                                                    border border-accent">
                                </div>               
                            </div>
                             <div v-if="form.masters==true" class="border border-accent pr-4 pl-4 pt-4">
                                <label for="country" class="block text-sm font-extrabold text-blue-5000">Master's Degree USN</label>
                                  <ValidationProvider rules="required|alpha_num" v-slot="{ errors }"> 
                                      <div>
                                      <div class="mt-1 relative rounded-md shadow-sm pb-4">
                                      <input type="text" placeholder="Enter usn" :maxlength="20" class="input input-sm 
                                                                                        text-white 
                                                                                        input-bordered 
                                                                                        placeholder-white 
                                                                                        bg-gray-700" v-model="form.mas_usn">
                                      </div>               
                                      </div>
                                      <span class="text-warning">{{ errors[0] }}</span>
                                  </ValidationProvider> 
                            </div>
                            <div v-if="form.masters==true" class="border border-accent pt-3 pr-4 pl-4 pb-6">
                            <label for="country" class="block text-sm font-extrabold text-blue-5000">Master's Degree College</label>
                            <ValidationProvider rules="required" v-slot="{ errors }"> 
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
                                        class="border border-accent text-sm selected"
                                        label="name"
                                        v-model="form.mas_college_id"
                                        :filterable="false"
                                        :options="mascolleges"
                                        :reduce="name => name.id"
                                        placeholder="Search Master's college"
                                        @search="
                                            (search, loading) =>
                                              searchCollege(search, loading, `Master's`)
                                          "
                                    ></v-select>
                                    <span class="text-warning">{{ errors[0] }}</span>
                            </ValidationProvider> 
                            </div>
                            <div v-if="form.mas_college_id==3452 && form.masters==true" class="border border-accent pt-2 pl-4 pr-4 pb-2">
                            <label for="country" class="block text-sm font-extrabold pb-1 pr-20">Other College</label>
                                    <div class="form-control pt-2 pb-4">
                                        <input type="text" name="email" id="email" v-model="form.mas_ocollege" :maxlength="40" placeholder="Enter College" class="input input-sm 
                                                                                                                                                  bg-bg-transparent  
                                                                                                                                                  text-white 
                                                                                                                                                  input-bordered 
                                                                                                                                                  bg-gray-700 
                                                                                                                                                  placeholder-white 
                                                                                                                                                  border border-accent">
                                    </div>               
                            </div>
                             <div v-if="form.masters==true" class="border border-accent pt-2 pl-4 pr-4">
                                <label for="country" class="block text-sm font-extrabold pb-1 pr-20">College Place</label>
                                    <ValidationProvider rules="required" v-slot="{ errors }"> 
                                        <div class="form-control pt-2">
                                            <input type="text" placeholder="Enter Place" :maxlength="50" class="input input-sm 
                                                                                              text-white 
                                                                                              input-bordered 
                                                                                              placeholder-white 
                                                                                              bg-gray-700" v-model="form.mas_cplace">
                                        </div>               
                                        <span class="text-warning">{{ errors[0] }}</span>
                                    </ValidationProvider> 
                            </div>
                            <div v-if="form.masters==true"  class="border border-accent px-2  flex flex-wrap pt-3">
                            <label for="country" class="block text-sm font-extrabold pb-1">Did You fail and then clear the subject in master's degree?</label>
                            <ValidationProvider rules="required" v-slot="{ errors }" slim> 
                              <label class="cursor-pointer label" for="yes">
                                <span class="label-text font-extrabold">Yes</span> 
                                <input type="radio"
                                      id="yes"
                                      name="mas_fail"
                                      :value="true"
                                      :native-value="true"
                                      v-model="form.mas_fail" class="pl-4 radio radio-secondary radio-sm">
                              </label>
                              <label class="cursor-pointer label" for="no">
                                <span class="label-text font-extrabold">No</span> 
                                <input type="radio"
                                      id="no"
                                      name="mas_fail"
                                      :value="false"
                                      :native-value="false"
                                      v-model="form.mas_fail" class="pl-4 radio radio-secondary radio-sm">
                              </label>  
                          <span class="text-warning">{{ errors[0] }}</span>
                        </ValidationProvider> 
                        </div>
                        <div v-if="form.masters==true"  class="border border-accent px-2  flex flex-wrap pt-3">
                            <div>
                                  <label for="country" class="block text-sm font-extrabold pb-1">Have any existing backlog in master's degree?</label>
                            </div>
                          <ValidationProvider rules="required" v-slot="{ errors }" slim> 
                            <div>
                              <label class="cursor-pointer label" for="yes">
                                <span class="label-text font-extrabold">Yes</span> 
                                <input type="radio"
                                      id="yes"
                                      name="mas_backlog"
                                      :value="true"
                                      :native-value="true"
                                      v-model="form.mas_backlog" class="pl-4 radio radio-secondary radio-sm">
                              </label>
                              <label class="cursor-pointer label" for="no">
                                <span class="label-text font-extrabold">No</span> 
                                <input type="radio"
                                      id="no"
                                      name="mas_backlog"
                                      :value="false"
                                      :native-value="false"
                                      v-model="form.mas_backlog" class="pl-4 radio radio-secondary radio-sm">
                              </label>  
                            </div>
                            <span class="text-warning">{{ errors[0] }}</span>
                          </ValidationProvider> 
                        </div>
                      <div v-if="form.masters==true" class="border border-accent px-2  flex flex-wrap pt-3">
                          <div>
                                <label for="country" class="block text-sm font-extrabold pb-1">Have you got year gap in master's degree?</label>
                          </div>
                        <ValidationProvider rules="required" v-slot="{ errors }" slim> 
                          <div>
                            <label class="cursor-pointer label" for="yes">
                              <span class="label-text font-extrabold">Yes</span> 
                              <input type="radio"
                                    id="yes"
                                    name="mas_year_gap"
                                    :value="true"
                                    :native-value="true"
                                    v-model="form.mas_year_gap" class="pl-4 radio radio-secondary radio-sm">
                            </label>
                            <label class="cursor-pointer label" for="no">
                              <span class="label-text font-extrabold">No</span> 
                              <input type="radio"
                                    id="no"
                                    name="mas_year_gap"
                                    :value="false"
                                    :native-value="false"
                                    v-model="form.mas_year_gap" class="pl-4 radio radio-secondary radio-sm">
                            </label> 
                          </div> 
                          <span class="text-warning">{{ errors[0] }}</span>
                        </ValidationProvider> 
                      </div>
                      </div> 
              </section>
               <br>
                 <div class="mt-4 ml-12 mr-6">
                    <div class="px-4 py-3 text-right sm:px-6 ml-10 mr-5">
                      <button type="submit" class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-extrabold rounded-md text-black bg-accent hover:bg-accent">
                        Next
                      </button>
                    </div>
               </div>   
        </form>
        </validation-observer>  
        </div>
        </div>
        </div>
        <Otherdetails v-if="showOtherdetail" />
        <Experience v-if="showExperiencedetail" />
        </div> 
</template>

<script>

import vSelect from "vue-select";
import _ from "lodash";
export default {
  middleware: ["authenticated","is_student"],
  components: { "v-select": vSelect},
  data() {
       return{
         form:{
           twelfth_board_id:null,
            twelfth_ctype_id:null,
            twelfth_yop:null,
            },
            cancele:false,
            showother : false,
            dipinfoo:{
              other_stream:false,
              other_college:false,
            },
            degreeeinfo:{
              deg_cgpa:0.0,
              other_stream:false,
              other_college:false
            },
            mastersinfo:{
              mas_cgpa:0.0,
              other_stream:false,
              other_college:false   
            },
            showOtherdetail : false,
            showExperiencedetail: false,
            images:null,
            astate:null,
            bstate:null,
            students:[],
            degstreams:[],
            dipstreams:[],
            masstreams:[],
            dipcolleges:[],
            degcolleges:[],
            mascolleges:[],
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
            years: [...Array(30)].map((a, b) => (new Date().getFullYear() + 1) - b),
            months:[...Array(30)].map((a, b) => new Date().getMonth() - b),
       }
  },
  async fetch() {
    this.form.name = this.$store.state.auth.firstname
    await this.$store.dispatch("title", "QSAAS Student Profile");  
    await this.$store.dispatch('student/getTenthBoard')
    await this.$store.dispatch('student/getFreshExp')
    await this.$store.dispatch('student/getTwelfthBoard')
    await this.$store.dispatch('student/getCourseType')
    await this.$store.dispatch('student/getStream')
    await this.$store.dispatch('student/getDipStream')
    await this.$store.dispatch('student/getMasStream')
    await this.$store.dispatch('student/getUniversity')
    await this.$store.dispatch('student/getDipUniversity')
    await this.$store.dispatch('student/getMasUniversity')
    await this.$store.dispatch('student/getCollege')
    await this.$store.dispatch('student/getDipCollege')
    await this.$store.dispatch('student/getMasCollege')
    await this.$store.dispatch('student/getDegree')  
    await this.$store.dispatch('student/getStates')
    await this.$store.dispatch('student/getHighestdegree')
    await this.$store.dispatch('student/getMasDegree')  
    await this.$store.dispatch('student/getCity') 
  },
  
  methods:{
    searchStream(search, loading, type) {
      if (search !== "") {
        loading(true);
        this.getStream(search, loading, type, this);
      }
    },
    searchCollege(search, loading, type) {
      if (search !== "") {
        loading(true);
        this.getCollege(search, loading, type, this);
      }
    },
    getStream: _.debounce(async function (name, loading, type, vm) {
      try {
        const response = await vm.$axios.get(
          "/commons/stream/?types__name=" + type +"&name=" + name
        );
        if (type == "Diploma") {
          vm.dipstreams = response.data.results;
        }
        if (type == "Degree") {
          vm.degstreams = response.data.results;
        }
        if (type == "Master's") {
          vm.masstreams = response.data.results;
        }

        loading(false);
      } catch (err) {
        vm.dipstreams = [];
        vm.degstreams = [];
        vm.masstreams = [];
        loading(false);
      }
    }, 500),
    
    getCollege: _.debounce(async function (name, loading, type, vm) {
      try {
        const resp = await vm.$axios.get(
          "/commons/college/?types__name=" + type + "&name=" + name
        );
        if (type == "Diploma") {
          vm.dipcolleges = resp.data.results;
        }
        if (type == "Degree") {
          vm.degcolleges = resp.data.results;
        }
        if (type == "Master's") {
          vm.mascolleges = resp.data.results;
        }
        loading(false);
      } catch (err) {
        vm.dipcolleges = [];
        vm.degcolleges = [];
        vm.mascolleges = [];
        loading(false);
      }
    }, 500),

    async closebutton1(){
      location.reload();
    },
    async Educationsubmit(){
      if(this.form.masters==false){
        this.form.mas_ctype_id=null,
        this.form.mas_name_id=null,
        this.form.mas_oname=null,
        this.form.mas_stream_id=null,
        this.form.mas_ostream=null,
        this.form.mas_yop=null,
        this.form.mas_percentage=null,
        this.form.mas_cgpa=null,
        this.form.mas_university_id=null,
        this.form.mas_ouniversity=null,
        this.form.mas_usn=null,
        this.form.mas_college_id=null,
        this.form.mas_ocollege=null,
        this.form.mas_cplace=null,
        this.form.mas_fail=false,
        this.form.mas_backlog=false,
        this.form.mas_year_gap=false,
        this.form.mas_cgpa = 0.0
      }
      if(this.form.masters==true){
        if(this.form.mas_name_id!=22){
        this.form.mas_oname=null
      }
      if(this.form.mas_stream_id!=131){
        this.form.mas_ostream=null
      }
      if(this.form.mas_university_id!=138){
        this.form.mas_ouniversity=null
      }
      if(this.form.mas_college_id!=3452){
        this.form.mas_ocollege=null
      }
      if (this.form.mas_cgpa == ""){
        this.form.mas_cgpa = 0.0
      }
      }
      if(this.form.twelfth_board_id==1){
        this.form.dip_ctype_id=null,
        this.form.dip_stream_id=null,
        this.form.dip_ostream=null,
        this.form.dip_university_id=null,
        this.form.dip_ouniversity=null,
        this.form.dip_college_id=null,
        this.form.dip_ocollege=null
      }
      if(this.form.twelfth_board_id==2){
        this.form.twelfth_ctype_id=null
        if (this.form.dip_stream_id!=140){
            this.form.dip_ostream=null
        }
        if (this.form.dip_university_id!=198){
            this.form.dip_ouniversity=null
        }
        if (this.form.dip_college_id!=3363){
            this.form.dip_ocollege=null
        }
      }
      if(this.form.deg_name_id!=11){
        this.form.deg_oname=null
      }
      if(this.form.deg_stream_id!=41){
        this.form.deg_ostream=null
      }
      if (this.form.deg_cgpa == ""){
        this.form.deg_cgpa = 0.0
      }
      if(this.form.deg_university_id!=73){
        this.form.deg_ouniversity=null
      }
      if(this.form.deg_college_id!=1066){
        this.form.deg_ocollege=null
      }
      if(this.form.twelfth_board_id==3){
        this.form.twelfth_ctype_id=null,
        this.form.dip_ctype_id=null,
        this.form.dip_stream_id=null,
        this.form.dip_ostream=null,
        this.form.dip_university_id=null,
        this.form.dip_ouniversity=null,
        this.form.dip_college_id=null,
        this.form.dip_ocollege=null
 
      }
      if (this.$store.state.student.fresh_exp.student==1)
      {
        this.showOtherdetail = true
      }
      else if(this.$store.state.student.fresh_exp.student==3)
      {
        this.showExperiencedetail = true
      }
       try{
          await this.$store.dispatch('student/getEducational', this.form);
          if (this.$store.state.student.educational){
            await this.$store.dispatch("alerts/alert", {
                      text: "Successfully added Educational Information",
                      type: "success",
                    });
            this.$store.dispatch("student/resetmsg");
          }
          if (this.$store.state.student.educational.status==200){
                  const userData = JSON.parse(localStorage.getItem("user"));
                  userData.profile.education = 1
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
<style >
.hello{
  width:100%
}
.modal-card-body{
 overflow-y: auto;
 -ms-overflow-style: none;
}
.v-select .vs__selected{
  background-color:white !important; 
  color:black !important; 
}
.vs__dropdown-menu {
  background-color:darkgrey !important;
  border: none !important;
  color: white !important;
  text-transform: capitalize !important;
} 
.vs__open-indicator,
.vs__clear {
  fill: white !important;
}

/* v-select .vs__dropdown-toggle{
  background-color:black !important; 
} */

/* .v-select .v-select-item--active { 
  background-color: green!important; 
} */
/* .vs__open-indicator,
.vs__clear {
  fill: hsla(var(--bc) / var(--tw-text-opacity, 1));
} */
</style>
