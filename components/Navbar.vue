<template>
  <div class="navbar mb-2 bg-base-300">
    <div class="flex-1 px-2 lg:flex-none">
      <a href="/" class="text-lg font-bold"> Qspiders Online </a>
    </div>
    <div v-if="username" class="flex justify-end flex-1 px-2">
      <div v-for="group in $store.state.auth.user.groups" :key="group.id">
        <div class="flex items-stretch">
          <div v-if="group.name != 'student' & group.name != 'trainer'" >
           <nuxt-link
                  to="/global-search"
                  class="
                    btn btn-ghost
                    text-success text-sm
                    display:inline-block
                    has-tooltip7
                  "
                  target="_blank"
                >
                  <div
                    class="
                      leading-5
                      text-indigo-200
                      uppercase
                      text-center
                      font-extrabold
                      text-sm
                    "
                  >
                    Search
                  </div>
                </nuxt-link>
          </div>
          <div v-if="group.name == 'counselor'" class="dropdown dropdown-end text-center">
            <div tabindex="0" class="btn">
              <div class="avatar placeholder">
                <span class="text-info">Menu</span>
              </div>
            </div>
            <ul
              class="
                menu
                py-2
                bg-base-100
                shadow-lg
                rounded-box
                dropdown-content
                w-60
                h-32
              "
            >
              <div v-if="group.name == 'counselor'">
                <nuxt-link
                  to="/counselor/paid-students"
                  class="
                    btn btn-ghost
                    text-accent
                    display:inline-block
                    has-tooltip7
                  "
                  target="_blank"
                >
                  <div
                    class="
                      leading-5
                      text-indigo-200
                      uppercase
                      text-center
                      font-extrabold
                      text-sm
                    "
                  >
                    Paid Student List
                  </div>
                </nuxt-link>
              </div>
              <div v-if="group.name == 'counselor'">
                <nuxt-link
                  to="/counselor/unpaid-students"
                  class="
                    btn btn-ghost
                    text-info text-sm
                    display:inline-block
                    has-tooltip7
                  "
                  target="_blank"
                >
                  <div
                    class="
                      leading-5
                      text-indigo-200
                      uppercase
                      text-center
                      font-extrabold
                      text-sm
                    "
                  >
                    Unpaid Students List
                  </div>
                </nuxt-link>
              </div>
            </ul>
          </div>
          <div v-if="group.name == 'trainer'">
                <button
                  class="
                    btn btn-ghost
                    text-success text-sm
                    display:inline-block
                    has-tooltip7
                  "
                  @click="createOrder()"
                >
                  <div
                    class="
                      leading-5
                      text-indigo-200
                      uppercase
                      text-center
                      font-extrabold
                      text-sm
                    "
                  >
                   Pay
                  </div>
                </button>
              </div>
          <div v-if="group.name == 'corporate'" class="dropdown dropdown-end text-center">
            <div tabindex="0" class="btn">
              <div class="avatar placeholder">
                <span class="text-info">Menu</span>
              </div>
            </div>
            <ul
              class="
                menu
                py-2
                bg-base-100
                shadow-lg
                rounded-box
                dropdown-content
                w-60
                h-52
              "
            >
              <div v-if="group.name == 'corporate'">
                <nuxt-link
                  to="/corporate/add-batch"
                  class="
                    btn btn-ghost
                    text-success text-sm
                    display:inline-block
                    has-tooltip7
                  "
                  target="_blank"
                >
                  <div
                    class="
                      leading-5
                      text-indigo-200
                      uppercase
                      text-center
                      font-extrabold
                      text-sm
                    "
                  >
                    Add Batch
                  </div>
                </nuxt-link>
              </div>
              <div v-if="group.name == 'corporate'">
                <nuxt-link
                  to="/corporate/paid-students-list"
                  class="
                    btn btn-ghost
                    text-accent
                    display:inline-block
                    has-tooltip7
                  "
                  target="_blank"
                >
                  <div
                    class="
                      leading-5
                      text-indigo-200
                      uppercase
                      text-center
                      font-extrabold
                      text-sm
                    "
                  >
                    Paid Student List
                  </div>
                </nuxt-link>
              </div>
              <div v-if="group.name == 'corporate'">
                <nuxt-link
                  to="/corporate/unpaid-students-list"
                  class="
                    btn btn-ghost
                    text-info text-sm
                    display:inline-block
                    has-tooltip7
                  "
                  target="_blank"
                >
                  <div
                    class="
                      leading-5
                      text-indigo-200
                      uppercase
                      text-center
                      font-extrabold
                      text-sm
                    "
                  >
                    Unpaid Students List
                  </div>
                </nuxt-link>
              </div>
              <div v-if="group.name == 'corporate'">
                <nuxt-link
                  to="/corporate/create-user"
                  class="
                    btn btn-ghost
                    text-info text-sm
                    display:inline-block
                    has-tooltip7
                  "
                  target="_blank"
                >
                  <div
                    class="
                      leading-5
                      text-indigo-200
                      uppercase
                      text-center
                      font-extrabold
                      text-sm
                    "
                  >
                    Create User
                  </div>
                </nuxt-link>
              </div>
            </ul>
          </div>
          <!-- <div v-if="group.name == 'corporate'">
            <nuxt-link to="/corporate/create-user" class="btn glass">
              Create Student
            </nuxt-link>
            <nuxt-link to="/corporate/add-batch" class="btn glass">
              Add Batch
            </nuxt-link>
          </div> -->
          <div v-if="group.name == 'student'">
              <div v-if="users.result===1"> 
                <a href="https://qspiders.com/classes" target="_blank" rel="noopener" class="btn btn-ghost text-yellow-650">Upcoming Batches</a>
             </div> 
          </div>
          <div v-if="group.name == 'student'">
            <nuxt-link
              to="/student/help"
              class="btn btn-ghost text-warning"
              target="_blank"
            >
              Help
            </nuxt-link>
          </div>
           <div v-if="group.name == 'student'">
                <button
                  class="
                    btn btn-ghost
                    text-success text-sm
                    display:inline-block
                    has-tooltip7
                  "
                  @click="createOrder()"
                >
                  <div
                    class="
                      leading-5
                      text-indigo-200
                      uppercase
                      text-center
                      font-extrabold
                      text-sm
                    "
                  >
                   Pay
                  </div>
                </button>
              </div>
          <div v-if="group.name == 'student'" class="dropdown dropdown-end">
            <div tabindex="0" class="btn">
              <div class="avatar placeholder">
                <span class="text-info">Menu</span>
              </div>
            </div>
            <ul
              class="
                menu
                py-2
                bg-base-100
                shadow-lg
                rounded-box
                dropdown-content
                w-60
                h-52
              "
            >

              <!-- <div v-if="group.name == 'student'">
                <button
                  class="
                    btn btn-ghost
                    text-success text-sm
                    display:inline-block
                    has-tooltip7
                  "
                    @click="createOrder()"
                >
                  <span class="inline-flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-7 w-7"
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
                  </span>
                  <div
                    class="
                      leading-5
                      text-indigo-200
                      uppercase
                      text-center
                      font-extrabold
                      text-xs
                    "
                  >
                    Make Payment
                  </div>
                </button>
              </div> -->
              <div v-if="group.name == 'student'">
                <nuxt-link
                  to="/student/payment"
                  class="
                    btn btn-ghost
                    text-success text-sm
                    display:inline-block
                    has-tooltip7
                  "
                  target="_blank"
                >
                  <span class="inline-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clip-rule="evenodd" />
                  </svg>
                  </span>
                  <div
                    class="
                      leading-5
                      text-indigo-200
                      uppercase
                      text-center
                      font-extrabold
                      text-xs
                    "
                  >
                    Payment
                  </div>
                </nuxt-link>
              </div>
              <div v-if="group.name == 'student'">
                <nuxt-link
                  to="/student/profile"
                  class="
                    btn btn-ghost
                    text-accent
                    display:inline-block
                    has-tooltip7
                  "
                  target="_blank"
                >
                  <span class="inline-flex">
                    <span class="pr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-7 w-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                    </span>
                  </span>
                  <div
                    class="
                      leading-5
                      text-indigo-200
                      uppercase
                      text-center
                      font-extrabold
                      text-xs
                    "
                  >
                    Placement Form
                  </div>
                </nuxt-link>
              </div>
              <div v-if="group.name == 'student'">
                <nuxt-link
                  to="/student/meeting_add"
                  class="
                    btn btn-ghost
                    text-info text-sm
                    display:inline-block
                    has-tooltip7
                  "
                  target="_blank"
                >
                  <span class="inline-flex">
                    <span class="pr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-7 w-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </span>
                  <div
                    class="
                      leading-5
                      text-indigo-200
                      uppercase
                      text-center
                      font-extrabold
                      text-xs
                    "
                  >
                    Add Meeting Id
                  </div>
                </nuxt-link>
              </div>
              <div v-if="group.name == 'student'">
                <nuxt-link
                  to="/student/student-form"
                  class="
                    btn btn-ghost
                    text-info text-sm
                    display:inline-block
                    has-tooltip7
                  "
                  target="_blank"
                >
                  <span class="inline-flex">
                    <span class="pr-1">
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                    </span>
                  </span>
                  <div
                    class="
                      leading-5
                      text-indigo-200
                      uppercase
                      text-center
                      font-extrabold
                      text-xs
                    "
                  >
                    Batch Timing Form
                  </div>
                </nuxt-link>
              </div>
            </ul>
          </div>
          <div class="dropdown dropdown-end">
            <div tabindex="0" class="btn btn-ghost rounded-btn">
              <div class="avatar placeholder">
                <div
                  class="
                    bg-base-100
                    text-neutral-content
                    rounded-full
                    w-10
                    h-10
                  "
                >
                  <span class="text-yellow-650">{{ userletters }}</span>
                </div>
              </div>
            </div>
            <ul
              class="
                menu
                py-3
                shadow-lg
                bg-base-100
                rounded-box
                dropdown-content
                w-48
              "
            >
              <li class="text-yellow-650">
                <span class="justify-center">{{ username }}</span>
              </li>
              <!-- <li>
                <a href="" @click="changePass = !changePass" class="">
                  <font-awesome-icon icon="id-card" class="mr-1" />
                  View Profile
                </a>
              </li> -->
              <li>
                <a href="#" @click="changePass = !changePass" class="">
                  <font-awesome-icon icon="key" class="mr-1" />
                  Change Password
                </a>
              </li>
              <li>
                <a href="#" @click="openLogout = !openLogout" class="">
                  <font-awesome-icon icon="sign-out-alt" class="mr-1" />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-end flex-1 px-2">
      <nuxt-link to="/corporate-login" class="btn btn-ghost text-info text-md">
        Trainer Login
      </nuxt-link>

      <!-- <nuxt-link
        to="/user"
        class="btn btn-ghost text-purple-200 text-md"
        target="_blank"
      >
        Student Login
      </nuxt-link> -->
    </div>

    <div :class="openLogout ? 'modal-open' : ''" class="modal">
      <div class="modal-box">
        <p>Are you sure you want to logout?</p>
        <div class="modal-action">
          <button @click="logout" class="btn text-white">Logout</button>
          <button @click="openLogout = !openLogout" class="btn text-white">
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div :class="changePass ? 'modal-open' : ''" class="modal">
      <div class="modal-box">
        <p>Change Password</p>
        <ChangePassword @hidepassword="passSubmit" />
      </div>
    </div>

    <Success v-if="showSuccess" @onsubmit="closeSuccess" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      openLogout: false,
      changePass: false,
      help: false,
      showSuccess : false
    };
  },
  methods: {
    async logout() {
      this.openLogout = false;
      this.$store.dispatch("auth/logout");
      this.$store.dispatch("alerts/alert", {
        text: "Logged out successfully.",
        type: "info",
      });
      location.reload();
    },
    passSubmit(type) {
      this.changePass = false;
      if (type == "submit") {
        this.$store.dispatch("auth/logout");
        this.$store.dispatch("alerts/alert", {
          text: "Logged out successfully.",
          type: "info",
        });
        location.reload();
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
    }
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      },
    },
  },
  async fetch(){
    await this.$store.dispatch("razorpay/getupbatches");


	},
  computed: {
    username() {
      if (this.$store.state.auth.user && this.$store.state.auth.user.user) {
        return this.$store.state.auth.user.name;
      }
    },
    userletters() {
      if (
        this.$store.state.auth.user &&
        this.$store.state.auth.user.user.username
      ) {
        return this.$store.state.auth.user.user.username.substring(0, 2);
      }
    },
    users(){
      if (this.$store.state.razorpay.upbatches){
        console.log("this.$store.state.razorpay.upbatches",this.$store.state.razorpay.upbatches)
        return this.$store.state.razorpay.upbatches;
      }

    },
    // groups() {
    //   if (this.$store.state.auth.user && this.$store.state.auth.user.user) {
    //     this.student = this.$store.state.auth.user.groups[0]["name"];
    //     if (this.student == "student") {
    //       return this.$store.state.auth.user.groups[0]["name"];
    //     } else {
    //       return "Nothing";
    //     }
    //   }
    // },
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
    });
  },
};
</script>

<style lang="postcss" scoped>
.tooltip7 {
  @apply invisible absolute;
}
.has-tooltip7:hover .tooltip7 {
  @apply visible z-50;
}
</style>