<template>
  <div>
    <div class="flex flex-wrap justify-center">
      <div
        v-for="(batch, i) in batches"
        :key="i"
        class="card shadow-lg bg-base-200 m-4"
      >
        <div class="card-body pt-2">
          <h2 class="card-title">{{ batch.batchcode }}</h2>
          <p><font-awesome-icon icon="book" /> : {{ batch.course_name }}</p>
          <div class="divider mt-0 mb-0"></div>
          <p>
            <font-awesome-icon icon="book-open" /> : {{ batch.subject_name }}
          </p>
          <div class="divider mt-0 mb-0"></div>
          <p><font-awesome-icon icon="bars" /> : {{ batch.total_classes }}</p>
          <div class="divider mt-0 mb-0"></div>
          <p><font-awesome-icon icon="users" /> : {{ batch.signed_up }}</p>
          <div class="divider mt-0 mb-0"></div>
          <p>
            <font-awesome-icon icon="calendar-day" /> :
            {{ batch.start_date }} ({{ batch.class_timing_name }})
          </p>
          <div class="divider mt-0 mb-0"></div>
          <p>
            <font-awesome-icon icon="user-tie" /> : {{ batch.trainer_name }}
          </p>
          <div class="divider mt-0 mb-0"></div>
          <p><font-awesome-icon icon="bars" /> : {{ batch.branch_name }}</p>
          <div class="divider mt-0 mb-0"></div>
          <div class="flex justify-center mt-1">
            <!-- <a v-if="$store.state.auth.user.id===7" :href="`https://demo.qspiders.com/`">
              <button class="btn btn-info btn-sm text-center">
                Get Started
              </button>
            </a> -->
             <a :href="`/classes/${batch.meeting_id}`">
              <button class="btn btn-info btn-sm text-center">
                Get Started
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
    <paginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="onPageChange"
      :prev-text="'Previous'"
      :next-text="'Next'"
      :container-class="'flex pl-0 rounded-full list-none flex-wrap justify-center m-4'"
      :page-class="'flex w-8 h-8 mx-1 p-0  items-center justify-center leading-tight relative border border-solid bg-gray-800 border-info text-info font-extrabold rounded-full'"
      :next-class="'btn btn-sm'"
      :prev-class="'btn btn-sm'"
    >
    </paginate>
  </div>
</template>

<script>
export default {
 middleware: ["authenticated","is_trainer"],
  head() {
    return {
      title: "My Batches | Trainer",
    };
  },
  data() {
    return {
      page: 1,
      per_page: 25,
    };
  },
  async fetch() {
    await this.$store.dispatch("trainer/get_batches", this.page);
  },
  methods: {
    onPageChange(page) {
      this.page = page;
      this.$fetch();
    },
  },
  computed: {
    batches() {
      return this.$store.state.trainer.batches;
    },
    pageCount() {
      return Math.ceil(this.$store.state.trainer.batchCount / this.per_page);
    },
  },
};
</script>

<style>
</style>