<template>
  <div>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <form @submit.stop.prevent="handleSubmit(submit)" class="bg-base-200">
        <div class="w-full p-4">
          <div class="form-control mt-1">
            <label class="label">
              <span class="label-text">Reason</span>
            </label>
            <ValidationProvider rules="required" v-slot="{ errors }" slim>
              <select
                class="select select-bordered w-full"
                :class="errors[0] ? 'select-error' : ''"
                v-model="form.rid"
              >
                <option disabled="disabled" selected="selected" value="">
                  Select Reason
                </option>
                <option
                  v-for="(reason, i) in reasons"
                  :key="i"
                  :value="reason.id"
                >
                  {{ reason.name }}
                </option>
              </select>
            </ValidationProvider>
          </div>
          <div class="form-control mt-1">
            <label class="label">
              <span class="label-text">Comment</span>
            </label>
            <textarea
              v-model="form.comment"
              class="textarea h-24 textarea-bordered"
              placeholder="Add Comment"
            ></textarea>
          </div>
          <div class="flex mt-2">
            <button class="btn btn-sm btn-success ml-1">Submit</button>
            <span class="btn btn-sm btn-error ml-1" @click="cancel"
              >Cancel</span
            >
          </div>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
  props: ["bsid", "sid", "bid"],
  data() {
    return {
      reasons: [],
      form: {
        bid: null,
        sid: null,
        bsid: null,
        rid: null,
        comment: "",
      },
    };
  },
  async fetch() {
    const reasons = await this.$axios.get(
      "attendance/block-reasons/?per_page=200"
    );
    this.reasons = reasons.data.results;
  },
  methods: {
    async submit() {
      try {
        this.form.bid = this.bid;
        this.form.sid = this.sid;
        this.form.bsid = this.bsid;
        const Submit = await this.$axios.post(
          "attendance/block-student/",
          this.form
        );
        this.$emit("blsubmit", "submit");
      } catch (err) {}
    },
    async cancel() {
      this.$emit("blsubmit", "cancel");
    },
  },
};
</script>

<style>
</style>