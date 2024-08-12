<template>
<div v-if ="profile==0" class="scroll">
  <div class="flex justify-center flex-1 px-2 ">
       <button class="btn btn-success" @click="clickFunction()">Click Here to add Profile</button>
    </div>
  <Personal v-if="showPersonal" />
  <Education v-if="showEducation"/>
  <Experience v-if="showExperience"/>
   <Experience v-if="showBoth"/>
  <Otherdetails v-if="showOthers"/>
  </div>
   <div v-else class="flex justify-center flex-1 px-2 ">
    <button class="btn btn-success">You have already added the Profile</button>
  </div>
</template>

<script>
export default {
  middleware: ["authenticated","is_student"],
  data(){
    return{
      showPersonal : false,
      showEducation : false,
      showOthers : false,
      showExperience: false,
      showBoth: false,
      showForgot : false,
      personal:0,
      education:0,
      others:0,
      experience:0,
      fresh:0,
      exp:0,
      both:0,
      profile:0,
    }
  },
  async fetch(){
    var userss = JSON.parse(localStorage.getItem("user"))
    this.profile = userss.profile.profile
    this.personal = userss.profile.personal
    this.education = userss.profile.education
    this.others = userss.profile.others
    this.experience = userss.profile.experience
    await this.$store.dispatch('student/getFreshExp')
    if (this.$store.state.student.fresh_exp.student==1){
    this.fresh = 1
    }
    else if (this.$store.state.student.fresh_exp.student==2){
     this.fresh = 2
    }
    else if (this.$store.state.student.fresh_exp.student==3){
     this.fresh = 3
    }
  },

  methods:{
    async clickFunction(){
      if (this.personal==0){
      this.showPersonal = true
      }
      else if (this.education==0&&this.personal==1&&this.fresh==1){
      this.showEducation = true
      }
      else if(this.education==1  &&this.others==0 && this.fresh==1){
      this.showOthers = true  
      }
      else if(this.experience==1 &&this.others==0 && this.fresh==2){
      this.showOthers = true  
      }
      else if(this.experience==1 && this.education==1 && this.others==0 && this.fresh==3){
      this.showOthers = true  
      }
      else if(this.experience==0&&this.personal==1  && this.fresh==2){
      this.showExperience = true  
      }
      else if (this.education==0&&this.personal==1&&this.fresh==3){
      this.showEducation = true
      }
      else if(this.experience==0&&this.personal==1 &&this.education==1 && this.fresh==3){
      this.showBoth = true  
      }
    },
      profileComplete(){
        window.location.href = "/profile";
      },
      async closeForgot(){
      this.showForgot = false
    },
  },
}
</script>
<style scoped>
.scroll{
  overflow: hidden;
}
</style>
