<template>
  <div class="">
    <div class="text-center font-mono text-4xl text-teal-650">
      Student Creation
    </div>
    <div class="md:mx-48">
      <div class="container border border-gray-700 rounded-md m-2 bg-base-200 p-2">
        <validation-observer ref="observer" v-slot="{ handleSubmit }">
          <form
            @submit.stop.prevent="handleSubmit(addForm)"
            class="bg-base-200 p-4"
          >
            <div class="text-center">
              <div class="md:grid md:grid-cols-2 gap-4">
                <div class="">
                  <ValidationProvider rules="required|alpha_spaces" v-slot="{ errors }" slim>
                    <div class="form-control text-center input-error">
                      <label class="label text-center">
                        <span class="label-text ">Name</span>
                      </label> 
                      <input placeholder="Type Student's Name Here.." class="input" :class="errors[0] ? 'border-error' : 'border-teal-450 hover:border-teal-450'" type="text" v-model="form.name">
                    </div>
                  </ValidationProvider>
                </div>
                <div class="">
                  <ValidationProvider rules="required" v-slot="{ errors }" slim>
                    <div class="form-control text-center input-error">
                      <label class="label text-center">
                        <span class="label-text ">Email Address</span>
                      </label> 
                      <input placeholder="Type Student's Email Address Here.." class="input" :class="errors[0] ? 'border-error' : 'border-teal-450'" type="email" v-model="form.email">
                    </div>
                  </ValidationProvider>
                </div>
                <div class="">
                  <ValidationProvider rules="required|digits:10" v-slot="{ errors }" slim>
                    <div class="form-control text-center input-error">
                      <label class="label text-center">
                        <span class="label-text ">Contact Number</span>
                      </label> 
                      <input placeholder="Type Student Contact Number Here.." class="input" :class="errors[0] ? 'border-error' : 'border-teal-450'" type="tel" v-model="form.number">
                      <!-- <div>
                        <vue-tel-input
                          :class="errors[0] ? 'border-error' : 'border-teal-450'"
                          mode="international"
                          defaultCountry="IN"
                          :autoDefaultCountry="true"
                          v-model="form.number"
                          :valid-characters-only="true"
                          :inputOptions="inputOptions"
                        ></vue-tel-input>
                      </div>  -->
                    </div>
                  </ValidationProvider>
                </div>
                <div class="">
                  <div class="grid grid-rows-2 grid-flow-col-1 gap-4 input-group-lg m-2">
                    <div class="row-span-1">
                      <ValidationProvider rules="required" v-slot="{ errors }" slim>
                        <div class="form-control text-center input-error">
                          <!-- <label class="label text-center" for="html">
                            <span class="label-text text-xs ">Password</span>
                          </label>  -->
                          <input placeholder="Type Password" id="html" class="input md:input-sm" :class="errors[0] ? 'border-error' : 'border-teal-450'" type='password' v-model="form.password">
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-span-1">
                      <ValidationProvider rules="required" v-slot="{ errors }" slim>
                        <div class="form-control text-center input-error">
                          <!-- <label class="label text-center mb-0"> -->
                            <!-- <span class="label-text text-xs ">Whatsapp Number</span> -->
                          <!-- </label>  -->
                          <input placeholder="Re-type Password" class="input md:input-sm" :class="errors[0] ? 'border-error' : 'border-teal-450'" type='password' v-model="form.confirm_password">
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-6">
              <button class="text-teal-450 border border-teal-450 px-1 py-1 rounded uppercase hover:bg-teal-650 hover:text-white">Create Student</button>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    middleware: ["authenticated","is_corporate"],
    head() {
        return {
            title: "Student Creation | Online Student",
        };
    },
    data(){
        return{
            form:{},
            inputOptions: {
              autocomplete: "on",
              required: true,
              placeholder: "Type Student's Contact Number Here..",
              styleClasses:
                "py-2 placeholder-gray-300 text-white relative bg-gray-600  rounded text-sm border border-teal-450 ",
            },
        }
    },
    methods : {
        async addForm(){
            console.log(this.form)
            try{
                let data = await this.$axios.post('student/registration/', this.form);
                if (data.status == 200){
                    await this.$store.dispatch("alerts/alert", {
                    text: data.data.message,
                    type: "success",
                    });
                    this.$store.dispatch("student/resetmsg");
                    location.reload();
                }
                else{
                    await this.$store.dispatch("alerts/alert", {
                    text: data.data.message,
                    type: "error",
                    });
                    this.$store.dispatch("student/resetmsg");
                }
            }
            catch(error){
                await this.$store.dispatch("alerts/alert", {
                    text: error.response.data.message,
                    type: "error",
                });
                this.$store.dispatch("student/resetmsg");
            }
        }
    }
}
</script>

<style>

</style>