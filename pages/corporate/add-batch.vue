<template>
  <div class="container mx-auto">
    <div
      v-if="$fetchState.pending"
      class="flex h-screen items-center justify-center"
    >
      <div
        class="
          w-40
          h-40
          border-t-4 border-b-4 border-yellow-750
          rounded-full
          animate-spin
          m-auto
        "
      ></div>
    </div>
    <div
      v-else-if="$fetchState.error"
      class="flex h-screen items-center justify-center"
    >
      <h1 class="prose lg:prose-xl text-red-650">
        Error! Please check your internet or contract administrator
      </h1>
    </div>
    <div v-else class="w-full prose lg:prose-xl">
      <h3>Add Batch</h3>
    </div>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <form
        @submit.stop.prevent="handleSubmit(addBatch)"
        class="bg-base-200 p-4"
      >
        <div class="w-full flex flex-wrap">
          <div class="form-control m-1">
            <label class="label">
              <span class="label-text">Batch code</span>
            </label>
            <ValidationProvider rules="required" v-slot="{ errors }" slim>
              <input
                autofocus
                v-model="form.batchcode"
                type="text"
                placeholder="Batch code"
                class="input input-bordered"
                :class="errors[0] ? 'border-error' : 'border-gray-300'"
              />
            </ValidationProvider>
          </div>
          <div class="form-control m-1">
            <label class="label">
              <span class="label-text">Start Date</span>
            </label>
            <ValidationProvider rules="required" v-slot="{ errors }" slim>
              <date-picker
                append-to-body
                :class="errors[0] ? 'border-error' : 'border-gray-300'"
                class="input"
                :editable="false"
                :disabledDate="disabledDate"
                v-model="form.start_date"
                placeholder="Start Date"
              ></date-picker>
            </ValidationProvider>
          </div>
          <div class="form-control m-1">
            <label class="label">
              <span class="label-text">Target fees</span>
            </label>
            <ValidationProvider
              rules="required|numeric"
              v-slot="{ errors }"
              slim
            >
              <input
                autofocus
                v-model="form.target_fees"
                type="text"
                placeholder="Target fees"
                class="input input-bordered"
                :class="errors[0] ? 'border-error' : 'border-gray-300'"
              />
            </ValidationProvider>
          </div>
          <div class="form-control m-1">
            <label class="label">
              <span class="label-text">Demo Days</span>
            </label>
            <ValidationProvider rules="required" v-slot="{ errors }" slim>
              <select
                v-model="form.demo_days"
                class="select select-bordered"
                :class="errors[0] ? 'select-error' : ''"
              >
                <option disabled="disabled" value="" selected="selected">
                  Select Demo Days
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </ValidationProvider>
          </div>
          <div class="form-control m-1">
            <label class="label">
              <span class="label-text">Class Timings</span>
            </label>
            <ValidationProvider rules="required" v-slot="{ errors }" slim>
              <v-select
                :class="
                  errors[0] ? 'border border-error' : 'border border-gray-300'
                "
                class="input w-52"
                label="name"
                v-model="form.class_timing"
                :options="$store.state.batch.classtimings"
                placeholder="Select Class Timing"
              ></v-select>
            </ValidationProvider>
          </div>
          <div class="form-control m-1">
            <label class="label">
              <span class="label-text">Trainer</span>
            </label>
            <ValidationProvider rules="required" v-slot="{ errors }" slim>
              <v-select
                :class="
                  errors[0] ? 'border border-error' : 'border border-gray-300'
                "
                class="input w-52"
                label="name"
                v-model="form.trainer"
                :options="$store.state.batch.trainers"
                placeholder="Select Trainer"
              ></v-select>
            </ValidationProvider>
          </div>
          <div class="form-control m-1">
            <label class="label">
              <span class="label-text">Subject</span>
            </label>
            <ValidationProvider rules="required" v-slot="{ errors }" slim>
              <v-select
                :class="
                  errors[0] ? 'border border-error' : 'border border-gray-300'
                "
                class="input w-52"
                label="name"
                v-model="form.subject"
                :options="$store.state.batch.subjects"
                placeholder="Select Subject"
              ></v-select>
            </ValidationProvider>
          </div>
          <div class="form-control m-1">
            <label class="label">
              <span class="label-text">Course</span>
            </label>
            <ValidationProvider rules="required" v-slot="{ errors }" slim>
              <v-select
                :class="
                  errors[0] ? 'border border-error' : 'border border-gray-300'
                "
                class="input w-52"
                label="name"
                v-model="form.course"
                :options="$store.state.batch.courses"
                placeholder="Select Course"
              ></v-select>
            </ValidationProvider>
          </div>
          <div class="form-control m-1">
            <label class="label">
              <span class="label-text">Branch</span>
            </label>
            <ValidationProvider rules="required" v-slot="{ errors }" slim>
              <v-select
                :class="
                  errors[0] ? 'border border-error' : 'border border-gray-300'
                "
                class="input w-52"
                label="name"
                v-model="form.branch"
                :options="$store.state.batch.branches"
                placeholder="Select Branch"
              ></v-select>
            </ValidationProvider>
          </div>
          <div class="form-control m-1">
            <label class="label">
              <span class="label-text">Tracker</span>
            </label>
            <ValidationProvider rules="required" v-slot="{ errors }" slim>
              <v-select
                :class="
                  errors[0] ? 'border border-error' : 'border border-gray-300'
                "
                class="input w-52"
                label="name"
                v-model="form.tracker"
                :options="$store.state.batch.trackers"
                placeholder="Select Tracker"
              ></v-select>
            </ValidationProvider>
          </div>
          <div class="form-control m-1">
            <label class="label">
              <span class="label-text">Owner</span>
            </label>
            <ValidationProvider rules="required" v-slot="{ errors }" slim>
              <v-select
                :class="
                  errors[0] ? 'border border-error' : 'border border-gray-300'
                "
                class="input w-52"
                label="name"
                v-model="form.owner"
                :options="$store.state.batch.trainers"
                placeholder="Select Owner"
              ></v-select>
            </ValidationProvider>
          </div>
          <div class="form-control m-1">
            <label class="label">
              <span class="label-text">HR</span>
            </label>
            <ValidationProvider rules="required" v-slot="{ errors }" slim>
              <v-select
                :class="
                  errors[0] ? 'border border-error' : 'border border-gray-300'
                "
                class="input w-52"
                label="name"
                v-model="form.hr"
                :options="$store.state.batch.hrs"
                placeholder="Select HR"
              ></v-select>
            </ValidationProvider>
          </div>
          <div class="form-control m-1">
            <ValidationProvider rules="required" v-slot="{ errors }" slim>
              <label class="cursor-pointer label">
                <span class="label-text">Offline to Online</span>
                <input
                  type="radio"
                  name="opt"
                  :class="errors[0] ? 'radio-secondary' : ''"
                  v-model="form.offline"
                  class="radio ml-1"
                  :value="true"
                />
              </label>
              <label class="cursor-pointer label">
                <span class="label-text">Online</span>
                <input
                  type="radio"
                  name="opt"
                  :class="errors[0] ? 'radio-secondary' : ''"
                  v-model="form.offline"
                  class="radio pl-1"
                  :value="false"
                />
              </label>
            </ValidationProvider>
          </div>
          <div class="form-control mt-8">
           <label class="cursor-pointer label">
                <span class="label-text">Upcoming Batch</span>
                <input
                  type="radio"
                  name="upcoming"
                  v-model="form.upcoming_batch"
                  class="radio ml-1"
                  :value="true"
                />
              </label>
          </div>
        </div>
        <div class="w-full flex flex-wrap">
          <div
            v-for="(batch, index) in vbatches"
            :key="index"
            class="form-control m-1"
          >
            <label class="label">
              <span class="label-text">V1 Batches</span>
            </label>
            <input
              v-model="batch.name"
              type="text"
              :placeholder="'Batch ' + (index + 1)"
              class="input input-bordered"
            />
          </div>
     
          <div class="grid grid-cols-3 gap-2 place-items-end ">
            <span class="btn btn-square btn-sm" @click="addVbatch">
              <font-awesome-icon icon="plus-circle" />
            </span>
            <span
              v-if="vbatches.length > 1"
              class="btn btn-square btn-sm"
              @click="removeVbatch"
            >
              <font-awesome-icon icon="minus-circle" />
            </span>
          </div>
        </div>
        <div class="flex mt-4 ml-1">
          <button class="btn btn-sm btn-success">Add Batch</button>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
var dayjs = require("dayjs");
export default {
  head() {
    return {
      title: "Batch Creation | Corporate",
    };
  },
  middleware: ["authenticated","is_corporate"],
  data() {
    return {
      form: {
        batchcode: "",
        target_fees: "",
        start_date: "",
        class_timing: [],
        trainer: [],
        subject: [],
        course: [],
        branch: [],
        tracker: [],
        owner: [],
        hr: [],
        demo_days: "",
        offline: null,
        vbatches: [],
        upcoming_batch:false,
      },
      vbatches: [
        {
          name: "",
        },
      ],
    };
  },
  async fetch() {
    await this.$store.dispatch("batch/get_branches");
    await this.$store.dispatch("batch/get_subjects");
    await this.$store.dispatch("batch/get_courses");
    await this.$store.dispatch("batch/get_trainers");
    await this.$store.dispatch("batch/get_trackers");
    await this.$store.dispatch("batch/get_hrs");
    await this.$store.dispatch("batch/get_classtimings");
  },
  methods: {
    addVbatch() {
      this.vbatches.push({
        name: "",
      });
    },
    removeVbatch() {
      this.vbatches.pop({
        name: "",
      });
    },
    async addBatch() {
      this.form.vbatches = this.vbatches;
      this.form.start_date = dayjs(this.form.start_date).format("YYYY-MM-DD");
      try {
        await this.$axios.post("batches/add-batch/", this.form);
        this.$store.dispatch("alerts/alert", {
          text: "Batch " + this.form.batchcode + " successfully added",
          type: "info",
        });
        this.$router.push("/");
      } catch (err) {
        await this.$store.dispatch("alerts/alert", {
          text: "Batch " + this.form.batchcode + " already exist",
          type: "error",
        });
      }
    },
    disabledDate(date) {
      return date < new Date();
    },
  }
};
</script>

<style>
.vs__selected {
  color: hsla(var(--bc) / var(--tw-text-opacity, 1));
}
.vs__open-indicator,
.vs__clear {
  fill: hsla(var(--bc) / var(--tw-text-opacity, 1));
}
</style>