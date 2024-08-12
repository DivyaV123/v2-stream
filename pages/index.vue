<template>
  <div class="flex h-screen items-center justify-center">
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
</template>

<script>
export default {
  head() {
    return {
        title: "Online Student | Qspiders",
    };
  },
  middleware: "authenticated",
  async fetch() {
    for (var i = 0; i < this.$store.state.auth.user.groups.length; i++) {
      if (this.$store.state.auth.user.groups[i].name == "student") {
        this.$router.push({ name: "student" });
      } else if (this.$store.state.auth.user.groups[i].name == "trainer") {
        this.$router.push({ name: "trainer" });
      } else if (this.$store.state.auth.user.groups[i].name == "corporate") {
        this.$router.push({ name: "corporate" });
      } else if (this.$store.state.auth.user.groups[i].name == "tracker") {
        this.$router.push({ name: "tracker" });
      } else if (this.$store.state.auth.user.groups[i].name == "branch-tracker") {
        this.$router.push({ name: "branch-tracker" });
      }else if (this.$store.state.auth.user.groups[i].name == "student") {
        this.$router.push({ name: "student" });
      } else if (this.$store.state.auth.user.groups[i].name == "verifier") {
        this.$router.push({ name: "verifier" });
      }else if (this.$store.state.auth.user.groups[i].name == "collector") {
        this.$router.push({ name: "collector" });
      }else if (this.$store.state.auth.user.groups[i].name == "oh") {
        this.$router.push({ name: "oh" });
      }else if (this.$store.state.auth.user.groups[i].name == "data-verifier") {
        this.$router.push({ name: "data_verifier" });
      }else if (this.$store.state.auth.user.groups[i].name == "trainer-payment") {
        this.$router.push({ name: "tpayment" });
      }else if (this.$store.state.auth.user.groups[i].name == "counselor") {
        this.$router.push({ name: "counselor" });
      }else {
        return this.$nuxt.error({
          statusCode: 404,
          message: "Oops! you do not have permission to enter!",
        });
      }
    }
  },
};
</script>
