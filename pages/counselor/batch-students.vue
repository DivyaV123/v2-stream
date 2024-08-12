<template>
  <div>
    <div class="flex justify-between w-full prose lg:prose-xl">
      <span class="btn btn-xs btn-info"
        >Total Classes - {{ totalClasses }}</span
      >
      <h3 class="">Batch Students - {{ totalStudents }}</h3>
      <span class="btn btn-xs btn-info">{{ name }}</span>
    </div>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <form
        @submit.stop.prevent="handleSubmit(searchByDate)"
        class="bg-base-200"
      >
        <div class="w-full flex flex-wrap justify-center">
          <div class="form-control m-1">
            <ValidationProvider rules="required" v-slot="{ errors }" slim>
              <date-picker
                append-to-body
                :class="errors[0] ? 'border-error' : 'border-gray-300'"
                :editable="false"
                v-model="dateFilter"
                placeholder="Date Filter"
              ></date-picker>
            </ValidationProvider>
          </div>
          <div class="flex mt-1 ml-1">
            <button class="btn btn-sm btn-success">Search by Date</button>
          </div>
        </div>
      </form>
    </validation-observer>
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
    <div class="overflow-x-auto" v-else>
      <table class="table w-full table-compact table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Added in V1</th>
            <th>Today</th>
            <th>Today -1</th>
            <th>Today -2</th>
            <th>Total Attended</th>
            <th>Target</th>
            <th>Balance</th>
            <th>Paid</th>
            <th>Student Batches</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(s, i) in students" :key="i">
            <td>{{ s.name }}</td>
            <td>
              <span v-for="(con, p) in s.mobile" :key="p">
                <a :href="'tel:' + con.number">
                  {{ con.number }}
                </a>
              </span>
            </td>
            <td>
              <span class="btn btn-xs btn-success" v-if="s.added_v1">Yes</span
              ><span class="btn btn-xs btn-error" v-else>No</span>
            </td>
            <td>
              <span class="btn btn-xs btn-success" v-if="s.att0_day">1</span
              ><span class="btn btn-xs btn-error" v-else>0</span>
            </td>
            <td>
              <span class="btn btn-xs btn-success" v-if="s.att1_day">1</span
              ><span class="btn btn-xs btn-error" v-else>0</span>
            </td>
            <td>
              <span class="btn btn-xs btn-success" v-if="s.att2_day">1</span
              ><span class="btn btn-xs btn-error" v-else>0</span>
            </td>
            <td>
              <span class="btn btn-xs btn-info">{{ s.total_attended }}</span>
            </td>
            <td>
              {{ s.target }}
            </td>
            <td>
              {{ s.balance }}
            </td>
            <td>
              {{ s.paid }}
            </td>
            <td>
              {{ s.batchcode }}
            </td>
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
    <div :class="openBlock ? 'modal-open' : ''" class="modal">
      <div class="modal-box">
        <p>Block {{ blockProps.name }}?</p>
        <Block
          :name="blockProps.name"
          :bid="blockProps.bid"
          :bsid="blockProps.bsid"
          :sid="blockProps.sid"
          @blsubmit="onSubmit"
        />
      </div>
    </div>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>

<script>
var dayjs = require("dayjs");
export default {
  middleware: ["authenticated","is_counselor"],
  head() {
    let title = ""
    if (this.$route.query.type == "si") {
      title = "Signed-Up Students | Counselor"
    }
    else if(this.$route.query.type == "pl"){
      title = "Placement Form Students | Counselor"
    }
    else if (this.$route.query.type == "ve"){
      title = "Verified Students | Counselor"
    }
    else{
      title = "Not Verified Students | Counselor"
    }
    return {
      title: title
    };
  },
  data() {
    return {
      openBlock: false,
      blockProps: {
        name: "",
        bid: this.$route.query.id,
        bsid: null,
        sid: null,
      },
      batch: {},
      students: [],
      totalStudents: 0,
      totalClasses: 0,
      name: "",
      pageCount: 1,
      page: 1,
      per_page: 25,
      error: "",
      dateFilter: new Date(),
    };
  },
  async fetch() {
    if (this.$route.query) {
      var id = this.$route.query.id;
      var type = this.$route.query.type;
      this.totalClasses = this.$route.query.total_classes;
      this.name = this.$route.query.name;
      if (id && type) {
        try {
          const bs = await this.$axios.get(
            "batches/get-batch-students/?page=" +
              this.page +
              "&id=" +
              id +
              "&type=" +
              type +
              "&date=" +
              dayjs(this.dateFilter).format("YYYY-MM-DD")
          );
          this.students = bs.data.results;
          this.totalStudents = bs.data.total;
          this.pageCount = Math.ceil(this.totalStudents / this.per_page);
        } catch (err) {
          await this.$store.dispatch("alerts/alert", {
            text: "Something went wrong, please try again or contact admin",
            type: "error",
          });
        }
      }
    } else {
    }
  },
  methods: {
    maskNumber(number) {
      return number.replace(/.(?=.{4,}$)/g, "*");
    },
    onPageChange(page) {
      this.page = page;
      this.$fetch();
    },
    searchByDate() {
      this.$fetch();
    },
    blockStudent(bsid, sid, name) {
      this.blockProps.name = name;
      this.blockProps.bsid = bsid;
      this.blockProps.sid = sid;
      this.openBlock = true;
    },
    async unblockStudent(bsid, sid, name) {
      try {
        this.$confirm({
          message: "Are you sure you want to unblock " + name + "?",
          button: {
            no: "No",
            yes: "Yes",
          },
          callback: async (confirm) => {
            if (confirm) {
              const submit = await this.$axios.post(
                "attendance/unblock-student/",
                { bid: this.$route.query.id, bsid: bsid, sid: sid }
              );
              this.$store.dispatch("alerts/alert", {
                text: "Student has been has been unblocked",
                type: "info",
              });
              this.$fetch();
            }
          },
        });
      } catch (err) {
        await this.$store.dispatch("alerts/alert", {
          text: "Something went wrong, please try again or contact admin",
          type: "error",
        });
      }
    },
    onSubmit(type) {
      if (type == "submit") {
        this.blockProps = {
          name: "",
          bid: this.$route.query.id,
          bsid: null,
          sid: null,
        };
        this.openBlock = false;
        this.$store.dispatch("alerts/alert", {
          text: "Student has been has been blocked",
          type: "info",
        });
        this.$fetch();
      }
      if (type == "cancel") {
        this.blockProps = {
          name: "",
          bid: this.$route.query.id,
          bsid: null,
          sid: null,
        };
        this.openBlock = false;
      }
    },
  },
};
</script>

<style>
</style>