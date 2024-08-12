<template>
  <div class="">
    <div v-for="group in $store.state.auth.user.groups" :key="group.id">
      <div v-if="group.name != 'student'" >
    <div class="flex justify-center w-full prose lg:prose-xl text-success text-2xl">
      <h3 class="text-success">Batch Student Verfication</h3>
    </div>
     <div class="text-right mt-0 mr-2 ml-0 px-1 py-1 mb-1">
        <button @click="isSearch = !isSearch" class="btn btn-outline btn-sm btn-success ">Search</button>
      </div>
    <div v-if="isSearch">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <form action="#" method="POST" @submit.stop.prevent="handleSubmit(searchParams)">
        <div class="p-5 card bg-base-200">
          <div class="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mt-0 ml-2">
            <div class="form-control">
              <!-- <label class="label">
                <span class="label-text text-sm">Batch Code</span>
              </label>  -->
              <input placeholder="Search Batchcode Here" class="input input-bordered" type="text" v-model="selected_name">
            </div>
            <div class="form-control">
              <!-- <label class="label">
                <span class="label-text text-sm">Trainer Name</span>
              </label>  -->
              <input placeholder="Search Trainer Name Here" class="input input-bordered" type="text" v-model="selected_trainer">
            </div>
            <div class="justify-self-right" >
              <button class="btn btn-outline btn-success btn-sm" @click="searchParams()">
                Search
              </button>
              <button class="btn btn-outline btn-goast btn-sm"  @click="clearSearchParams()">
                Clear
              </button>
            </div>
          </div>
        </div>
        </form>
      </validation-observer>
    </div>
    <div class="">
      <table class="table w-full table-auto table-compact table-zebra">
        <thead>
          <tr class="border">
            <th></th>
            <th></th>
            <th></th>
            <th colspan="7" class="border">Total Students</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr class="border">
            <th class="border">Actions</th>
            <th class="border">Batch code</th>
            <th class="border">Branches</th>
            <th scope="col" class="border">Signed up</th>
            <th scope="col" class="border">Placement Form</th>
            <th scope="col" class="border">No Placement Form</th>
            <th scope="col" class="border">Allocation Form</th>
            <th scope="col" class="border">No Allocation Form</th>
            <th scope="col" class="border">Verified</th>
            <th scope="col" class="border">Not Verified</th>
            <th class="border">Total Classes</th>
            <th class="border">Status</th>
            <th class="border">Trainer</th>
            <th class="border">Subject</th>
            <th class="border">Course</th>
            <th class="border">V1 Batches</th>
            <th class="border">Target fees</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(b, i) in batches" :key="i">
            <td>
              <!-- <span
                class="ml-1 btn btn-xs btn-error"
                v-if="b.status == 1 || b.status == 3"
                @click="closeBatch(b.id)"
                ><font-awesome-icon icon="times-circle" /></span> -->
              <span
                class="ml-1 btn btn-xs btn-success"
                v-if="b.status == 1 || b.status == 3"
                @click="copyMeetingLink(b.meeting_id)"
                ><font-awesome-icon icon="link"
              /></span>
              <span class="ml-1 btn btn-xs btn-error" v-if="b.status == 2"
                ><font-awesome-icon icon="trash"
              /></span>
            </td>
            <td>{{ b.batchcode }}</td>
            <td>{{ b.branch_name }}</td>
            <td>
              <nuxt-link
                :to="
                  b.signed_up > 0
                    ? {
                        path: 'corporate/batch-students',
                        query: {
                          id: b.id,
                          type: 'si',
                          total_classes: b.total_classes,
                          name: b.batchcode,
                        },
                      }
                    : ''
                "
                :target="b.signed_up > 0 ? '_blank' : ''"
                >{{ b.signed_up }}</nuxt-link
              >
            </td>
            <td>
              <nuxt-link
                :to="
                  b.placement_form > 0
                    ? {
                        path: 'corporate/batch-students',
                        query: {
                          id: b.id,
                          type: 'pl',
                          total_classes: b.total_classes,
                          name: b.batchcode,
                        },
                      }
                    : ''
                "
                :target="b.placement_form > 0 ? '_blank' : ''"
                >{{ b.placement_form }}</nuxt-link
              >
            </td>
            <td>
              <nuxt-link
                :to="
                  b.no_placement_form > 0
                    ? {
                        path: 'corporate/batch-students',
                        query: {
                          id: b.id,
                          type: 'npl',
                          total_classes: b.total_classes,
                          name: b.batchcode,
                        },
                      }
                    : ''
                "
                :target="b.no_placement_form > 0 ? '_blank' : ''"
                >{{ b.no_placement_form }}</nuxt-link
              >
            </td>
            <td>
              <nuxt-link
                :to="
                  b.studentform > 0
                    ? {
                        path: 'corporate/batch-students',
                        query: {
                          id: b.id,
                          type: 'sf',
                          total_classes: b.total_classes,
                          name: b.batchcode,
                        },
                      }
                    : ''
                "
                :target="b.studentform > 0 ? '_blank' : ''"
                >{{ b.studentform }}</nuxt-link
              >
            </td>
            <td>
              <nuxt-link
                :to="
                  b.no_studentform > 0
                    ? {
                        path: 'corporate/batch-students',
                        query: {
                          id: b.id,
                          type: 'nsf',
                          total_classes: b.total_classes,
                          name: b.batchcode,
                        },
                      }
                    : ''
                "
                :target="b.no_studentform > 0 ? '_blank' : ''"
                >{{ b.no_studentform }}</nuxt-link
              >
            </td>
            <td>
              <nuxt-link
                :to="
                  b.verified > 0
                    ? {
                        path: 'corporate/batch-students',
                        query: {
                          id: b.id,
                          type: 've',
                          total_classes: b.total_classes,
                          name: b.batchcode,
                        },
                      }
                    : ''
                "
                :target="b.verified > 0 ? '_blank' : ''"
                >{{ b.verified }}</nuxt-link
              >
            </td>
            <td>
              <nuxt-link
                :to="
                  b.not_verified > 0
                    ? {
                        path: 'corporate/batch-students',
                        query: {
                          id: b.id,
                          type: 'nve',
                          total_classes: b.total_classes,
                          name: b.batchcode,
                        },
                      }
                    : ''
                "
                :target="b.not_verified > 0 ? '_blank' : ''"
                >{{ b.not_verified }}</nuxt-link
              >
            </td>
            <td>{{ b.total_classes }}</td>
            <td>
              <!-- <button
                @click="allowBatch(b.id)"
                v-if="b.not_verified > 0 && b.status == 1"
                class="btn btn-info btn-xs"
              >
                Allow Class
              </button> -->
              <button v-if="b.status == 2" class="btn btn-error btn-xs">
                Closed
              </button>
              <button v-else class="btn btn-success btn-xs">
                Active
              </button>
            </td>
            <td>{{ b.trainer_name }}</td>
            <td>{{ b.subject_name }}</td>
            <td>{{ b.course_name }}</td>
            <td>
              <span v-for="(vb, p) in b.vbatches" :key="p">{{ vb.name }} </span>
            </td>
            <td>{{ b.target_fees }}</td>
          </tr>
        </tbody>
      </table>
      <paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="onPageChange"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'flex pl-0 rounded list-none flex-wrap justify-center m-4'"
        :page-class="'flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid bg-white border-yellow-750 text-yellow-750'"
        :next-class="'btn btn-sm'"
        :prev-class="'btn btn-sm'"
      >
      </paginate>
    </div>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>

<script>
export default {
  middleware: ["authenticated","is_corporate"],
  head() {
    return {
      title: "Batches | Corporate",
    };
  },
  data() {
    return {
      page: 1,
      perPage: 25,
      isSearch : false,
      selected_name : "",
      search:{},
      params: "",
      selected_trainer : ""
    };
  },
  async fetch() {
    await this.$store.dispatch("batch/get_batches",  {"page" : this.page, "params":this.params});
    console.log(this.batches)
  },
  methods: {
    onPageChange(page) {
      this.page = page;
      this.$fetch();
    },
    searchParams(){
      if(this.selected_name){
        this.search.name = this.selected_name
      }
      if(this.selected_trainer){
        this.search.trainer = this.selected_trainer
      }
      this.params = new URLSearchParams(this.search).toString();
      this.$fetch()
    },
    clearSearchParams(){
      this.search = {}
      this.params = ""
      this.selected_name=null
      this.selected_trainer = null
      
      this.$fetch()
    },
    async closeBatch(id) {
      this.$confirm({
        message: "Are you sure you want to close this batch?",
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: async (confirm) => {
          if (confirm) {
            await this.$axios.post("batches/update-batch-status/", {
              id: id,
              status: 2,
            });
            this.$store.dispatch("alerts/alert", {
              text: "Batch Status has been updated",
              type: "info",
            });
            this.$fetch();
          }
        },
      });
    },
    async copyMeetingLink(id) {
      try {
        let link = window.location.hostname + "/user?meeting_id=" + id;
        await this.$copyText(link);
        this.$store.dispatch("alerts/alert", {
          text: "Meeting link has been copied to clipboard",
          type: "info",
        });
      } catch (e) {
        await this.$store.dispatch("alerts/alert", {
          text: "Something went wrong while copying, please try again or contact admin",
          type: "error",
        });
      }
    },
    async allowBatch(id) {
      this.$confirm({
        message:
          "Are you sure you want to allow to take class for this batch ?",
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: async (confirm) => {
          if (confirm) {
            await this.$axios.post("batches/update-batch-status/", {
              id: id,
              status: 3,
            });
            this.$store.dispatch("alerts/alert", {
              text: "Batch Status has been updated",
              type: "info",
            });
            this.$fetch();
          }
        },
      });
    },
  },
  computed: {
    batches() {
      return this.$store.state.batch.batches;
    },
    pageCount() {
      return Math.ceil(this.$store.state.batch.batchCount / this.perPage);
    },
  },
};
</script>

<style>
</style>