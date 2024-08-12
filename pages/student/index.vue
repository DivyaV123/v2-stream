<template>
  <div>
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
             <!-- <div class="flex justify-center">
            <h5 class="font-bold text-red-400 text-md mt-0 pt-0 text-center">
              We apologize for the technical glitch on 23-08-2022, classes will resume from 24-08-2022, thank you for your patience.
            </h5>
            </div>  -->
    <div class="container flex"  >
    <div class="w-52  rounded flex justify-center ">
      <ol class="flex justify-center ">
          <li class="font-bold text-success">Page Number: {{page}}</li>
      </ol>
    </div>
    </div>
    
    <div class="flex flex-wrap justify-center">
      <div
        class="card shadow-lg bg-base-200 m-4"
        v-for="pay in mycourse"
        :key="pay.id"
      >
        <div class="card-body pt-2">
          <h2
            class="
              text-white text-xl
              font-extrabold
              bg-gray-900
              font-serif
              m-1
              text-center
            "
          >
            {{ pay.batch.batchcode }}
          </h2>
          <hr />
          <div>
            <h6 class="text-gray-800 leading-8 font-mono inline-flex ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1 mt-1.5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
                />
              </svg>
              <label class="text-white pt-0">Course:</label>
              <span class="font-sans font-medium text-white">
                {{ pay.batch.course_name }}
              </span>
            </h6>
            <hr />
            <h6 class="text-gray-800 leading-8 font-mono inline-flex ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1 mt-1.5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                  clip-rule="evenodd"
                />
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
              </svg>
              <label class="text-white">Subject:</label>
              <span class="font-sans font-medium text-white">
                {{ pay.batch.subject_name }}
              </span>
            </h6>
            <hr />
            <h6 class="text-gray-800 leading-8 font-mono inline-flex ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1 mt-1.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <label class="text-white">Start Date:</label>
              <span class="font-sans font-medium text-white">
                {{ pay.batch.start_date }}
              </span>
            </h6>
            <hr />
            <h6 class="text-gray-800 leading-8 font-mono inline-flex ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1 mt-1.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <label class="text-white">Timing:</label>
              <span class="font-sans font-medium text-white">
                {{ pay.batch.class_timing_name }}
              </span>
            </h6>
            <hr />
            <h6 class="text-gray-800 leading-8 font-mono inline-flex ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1 mt-1.5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"
                />
              </svg>
              <label class="text-white">Trainer:</label>
              <span class="font-sans font-medium text-white">
                {{ pay.batch.trainer_name }}
              </span>
            </h6>
            <hr />
          </div>
          <h6 class="text-gray-800 leading-8 font-mono inline-flex ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-1 mt-1.5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 100 2h1a2 2 0 011.732 1H7a1 1 0 100 2h2.732A2 2 0 018 11H7a1 1 0 00-.707 1.707l3 3a1 1 0 001.414-1.414l-1.483-1.484A4.008 4.008 0 0011.874 10H13a1 1 0 100-2h-1.126a3.976 3.976 0 00-.41-1H13a1 1 0 100-2H7z"
                clip-rule="evenodd"
              />
            </svg>
            <label class="text-white">Target:</label>
            <span
              v-if="pay.target == none"
              class="font-sans font-medium text-white"
            >
              {{ "You are attending demo days" }}
            </span>
            <span
              v-if="pay.target != none"
              class="font-sans font-medium text-white"
            >
              {{ pay.target }}
            </span>
          </h6>
          <hr />
          <h6 class="text-gray-800 leading-8 font-mono inline-flex ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-1 mt-1.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <label class="text-white">Balance:</label>
            <span
              v-if="pay.balance == none"
              class="font-sans font-medium text-white"
            >
              {{ "You are attending demo days" }}
            </span>
            <span class="font-sans font-medium text-white">
              {{ pay.balance }}
            </span>
          </h6>
          <hr />
        </div>
        <footer class="flex justify-center p-2">
          <button
            class="
              inline-flex
              justify-center
              border border-transparent
              shadow-sm
              text-sm
              font-extrabold
              rounded-md
              text-black
              bg-purple-400
              hover:bg-white hover:text-black
              btn btn-sm
              mr-1
            "
            v-if="pay.balance > 0"
            @click="createOrder()"
          >
            Pay
          </button>
          <button
            class="
              inline-flex
              justify-centerborder
              border-transparent
              shadow-sm
              text-sm
              font-extrabold
              rounded-md
              text-white
              bg-yellow-700
              hover:bg-yellow-700 hover:text-black
              btn btn-sm
              mr-1
            "
            v-if="pay.balance == 0"
          >
            Paid
          </button>
          <button
            class="
              inline-flex
              justify-center
              border border-transparent
              shadow-sm
              text-sm
              font-extrabold
              rounded-md
              text-white
              bg-red-900
              btn btn-sm
              hover:bg-red-900 hover:text-black
              mr-1
              has-tooltip8
            "
            v-if="pay.blocked == true"
          >
            Blocked
            <span
              class="
                tooltip8
                shadow-l
                btn btn-glass
                text-success
                pt-2
                lowercase
                pr-12
                p-1
                mt-16
                rounded-md
                text-sm
              "
              >{{ pay.breason }}</span
            >
          </button>
          <button
            class="
              inline-flex
              justify-center
              border-transparent
              shadow-sm
              text-sm
              font-extrabold
              rounded-md
              text-black
              bg-info
              btn btn-sm
              border border-info
              hover:bg-info hover:text-white
              mr-1
            "
            v-if="pay.batch.status == '2'"
          >
            Closed
          </button>
          <!-- <a v-if="pay.batch.trainer===7" :href="`https://demo.qspiders.com/`">
            <button
              v-if="pay.blocked == false && pay.batch.status != '2'"
              class="
                inline-flex
                justify-center
                border border-transparent
                shadow-sm
                text-sm
                font-extrabold
                rounded-md
                text-black
                bg-accent
                hover:bg-accent hover:text-white
                btn btn-sm
                mr-1
              "
            >
              Join
            </button>
          </a> -->
          <a :href="`/classes/${pay.batch.meeting_id}`">
            <!-- <nuxt-link :to="`/classes/${pay.batch.meeting_id}`"> -->
            <button
              v-if="pay.blocked == false && pay.batch.status != '2'"
              class="
                inline-flex
                justify-center
                border border-transparent
                shadow-sm
                text-sm
                font-extrabold
                rounded-md
                text-black
                bg-accent
                hover:bg-accent hover:text-white
                btn btn-sm
                mr-1
              "
            >
              Join
            </button>
            <!-- </nuxt-link> -->
          </a>
        </footer>
      </div>
    </div>
    <paginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="onPageChange"
      :prev-text="'Previous'"
      :next-text="'Next'"
      :container-class="'flex pl-0 rounded list-none flex-wrap justify-center m-4'"
      :page-class="'flex w-8 h-8 mx-1 p-0  items-center justify-center leading-tight relative border border-solid bg-gray-800 border-success text-success font-extrabold'"
      :next-class="'btn btn-sm'"
      :prev-class="'btn btn-sm'"
    >
    </paginate>
    <Success v-if="showSuccess" @onsubmit="closeSuccess" />
  </div>
</template>

<script>
export default {
  middleware: ["authenticated","is_student"],
  head() {
    return {
      title: "My Course | Student",
    };
  },
  data() {
    return {
      data: {},
      showSuccess: false,
      check: 0,
      page: 1,
      perPage: 25,
      isOpen: false,
      date_selected: null,
      batchdate: null,
      search: {},
      course_selected: null,
      subject_selected: null,
      params: "",
      date: {
        date: null,
      },
      none: null,
    };
  },
  async fetch() {
    await this.$store.dispatch("title", "My Course");
    await this.$store.dispatch("razorpay/getMyCourse", this.page);
    await this.$store.dispatch("student/getUserdetails");
  },
  methods: {
    async closeSuccess() {
      this.showSuccess = false;
    },
    async paymentVerification(data) {
      var pay = await this.$store.dispatch("razorpay/getPaymentDetails", data);
      if (this.check == 1) {
        this.showSuccess = true;
      }
    },
    async createOrder() {
      try {
        let test = await this.$store.dispatch("razorpay/getOrders");
        if (this.$store.state.razorpay.update) {
          let orders = this.$store.state.razorpay.update;
          var that = this;
          var options = {
            key: orders.razorpay_merchant_key,
            amount: orders.razorpay_amount,
            currency: orders.currency,
            name: "Qspiders-Jspiders-Pyspiders",
            order_id: orders.razorpay_order_id,
            theme: {
              color: "#333333",
              hide_topbar: true,
            },
            modal: {
              confirm_close: true,
              escape: false,
              handleback: false,
            },
            prefill: {
              name: orders.name,
              email: orders.email,
              contact: orders.number,
            },
            readonly: {
              email: true,
              contact: true,
            },
            redirect: this.paymentVerification,
            send_sms_hash: true,
            handler: async function (response) {
              var data = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: orders.razorpay_amount,
                vid: orders.vid,
                type: orders.type,
              };
              that.showSuccess = true;
              that.paymentVerification(data);
            },
          };
          var rzp1 = new Razorpay(options);
          rzp1.open();
          rzp1.on("payment.failed", function (response) {
            var data = {
              razorpay_order_id: response.error.metadata.order_id,
              razorpay_payment_id: response.error.metadata.payment_id,
              amount: orders.razorpay_amount,
              vid: orders.vid,
              type: orders.type,
            };
            that.paymentVerification(data);
          });
        } else {
          await this.$store.dispatch("alerts/alert", {
            text: "Something went wrong, please contact admin",
            type: "error",
          });
          this.$store.dispatch("razorpay/resetmsg");
        }
      } catch (err) {
        await this.$store.dispatch("alerts/alert", {
          text: "Something went wrong, please contact admin",
          type: "error",
        });
      }
    },
    async paymentVerification(data) {
      var pay = await this.$store.dispatch("razorpay/getPaymentDetails", data);
    },
    async closeSuccess() {
      this.showSuccess = false;
    },
    onPageChange(page) {
      this.page = page;
      this.$fetch();
      window.scrollTo(0, 0);
    },
  },
  computed: {
    mycourse() {
      return this.$store.state.razorpay.mycourse.results;
    },
    pageCount() {
      return Math.ceil(this.$store.state.razorpay.counts / this.perPage);
    },
  },
};
</script>

<style lang="postcss" scoped>
.tooltip8 {
  @apply invisible absolute;
}
.has-tooltip8:hover .tooltip8 {
  @apply visible z-50;
}
</style>