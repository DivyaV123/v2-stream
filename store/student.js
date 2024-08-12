export const state = () => ({
  register: null,
  branch: [],
  organisation: [],
  profile:[],
  error: false,
  errorMsg: null,
  check_user:null,  
  get_user:[],
  states:[],
  district:[],
  highest_degree:[],
  city:[],
  stream:[],
  college:[],
  personal:[],
  educational:[],
  experience:[],
  others_info:[],
  degree:[],
  getstu:[],
  image:null,
  coursefilter:[],
  subjectfilter:[],
  otp_count:null,
  otp:null,
  otp_verify:null,
  tenth_board:[],
  twelfth_board:[],
  course_type:[],
  university:[],
  designation:[],
  domains:[],
  management_tool:[],
  programing_language:[],
  scripting_language:[],
  other_language:[],
  database:[],
  operating_system:[],
  certificate:[],
  fresh_exp:[],
  meeting_id:[],
  user_details:[],
  stream_dip:[],
  stream_mas:[],
  university_dip:[],
  university_mas:[],
  college_dip:[],
  college_mas:[],
  mas_degree:[],
  session_forgot:[],
  enquiry_form_list:[],
  enquiry_form_list1:[],
  update_student_form:[],
  form_reason:[],
  reset_send_otp:[],
  reset_otp_verify:[],
  reset_confirm:[],

})

export const mutations = {
  set_reset_send_otp(state,content){
    state.reset_send_otp = content
  },
  set_reset_otp_verify(state,content){
    state.reset_otp_verify = content
  },
  set_reset_confirm(state,content){
    state.reset_confirm = content
  },
  set_university_dip(state,content){
    state.university_dip = content
  },
  set_session_forgot(state,content){
    state.session_forgot = content
  },
  set_university_mas(state,content){
    state.university_mas = content
  },
  set_stream_dip(state,content){
    state.stream_dip = content
  },
  set_stream_mas(state,content){
    state.stream_mas = content
  },
  set_college_dip(state,content){
    state.college_dip = content
  },
  set_college_mas(state,content){
    state.college_mas = content
  },
  set_register (state,content) {
      state.register = content
  },
  set_tenthboard(state,content){
    state.tenth_board = content
  },
  set_twelfthboard(state,content){
    state.twelfth_board = content
  },
  set_experience(state,content){
    state.experience = content
  },
  set_othersinfo(state,content){
    state.others_info = content
  },
  set_coursetype(state,content){
    state.course_type = content
  },
  set_universityy(state,content){
    state.university = content
  },
  set_designation(state,content){
    state.designation = content
  },
  set_domains(state,content){
    state.domains = content
  },
  set_user_details(state,content){
    state.user_details = content
  },
  set_management_tool(state,content){
    state.management_tool = content
  },
  set_programing_language(state,content){
    state.programing_language = content
  },
  set_scripting_language(state,content){
    state.scripting_language = content
  },
  set_other_language(state,content){
    state.other_language = content
  },
  set_database(state,content){
    state.database = content
  },
  set_operating_system(state,content){
    state.operating_system = content
  },
  set_certificate(state,content){
    state.certificate = content
  },
  set_fresh_exp(state,content){
    state.fresh_exp = content
  },
  set_meeting_id(state,content){
    state.meeting_id = content
  },
  set_otp(state,content){
    state.otp = content
  },
  set_otp_count(state,content){
    state.otp_count = content
  },
  set_otp_verify(state,content){
    state.otp_verify = content
  },
  set_branch (state,content) {
      state.branch = content
  },
  set_organisation (state,content) {
      state.organisation = content
  },
  setErrors(state, msg) {
      state.error = true
      state.errorMsg = msg
      state.register=null
      state.otp_verify= null
      state.meeting_id = null
      state.personal = null
      state.reset_send_otp = null
      state.reset_otp_verify = null
      state.reset_confirm = null
    },
    removeErrors(state) {
      state.error = false
      state.errorMsg = null
      state.check_user = null
      state.register=null
      state.otp_verify= null
      state.meeting_id = null
      state.personal = null
      state.reset_send_otp = null
      state.reset_otp_verify = null
      state.reset_confirm = null
    },
    set_personal (state,content) {
      state.personal = content
  },
  set_educational (state,content) {
    state.educational = content
 },
  set_check_user(state,content) {
    state.check_user = content.data.message
},
set_get_user(state,content) {
  state.get_user = content
  },
  set_states(state,content){
    state.states = content
  },
  set_district(state,content){
    state.district = content
  },
  set_highest_degree(state,content){
    state.highest_degree = content
  },
  set_city(state,content){
    state.city = content
  },
  set_stream(state,content){
    state.stream = content
  },
  set_college(state,content){
    state.college = content
  },
  set_degree(state,content){
    state.degree = content
  },
  set_mas_degree(state,content){
    state.mas_degree = content
  },
  set_getstu(state,content){
    state.getstu= content.data
  },
  set_image(state,content){
    state.image= content.data
  },
  set_coursefilter(state,content){
    state.coursefilter = content 
  },
  set_subjectfilter(state,content){
    state.subjectfilter = content 
  },
  set_enquiry_form_list(state,content){
    state.enquiry_form_list = content
  },
  set_enquiry_form_list1(state,content){
    state.enquiry_form_list1 = content
  },
  set_update_student_form(state,content){
    state.update_student_form = content
  },
  set_form_reason(state,content){
    state.form_reason = content
  },

}

export const actions = {
  async getFormReason({commit}){
    const degree = await this.$axios.get(`student/form-reason/`);
    commit('set_form_reason',degree.data.results)
    },
    
  async getEnquiryForm({ commit }, data) {
    const branch = await this.$axios.get(`/student/paid-student-list/?page=${data.page}&${data.params}`);
    commit("set_enquiry_form_list", branch.data);
    },
  
  async getEnquiryForm1({ commit }, data) {
    const branch = await this.$axios.get(`/student/unpaid-student-list/?page=${data.page}&${data.params}`);
    console.log("unpaid", branch)
    commit("set_enquiry_form_list1", branch.data);
  },

  async getUpdate({ commit } ,data){
    console.log("data",data)
    let star = {
        "id":data.id,
        "comment":data.comment,
        "status" : data.status
    }
    const submit = await this.$axios.post(`student/update-student-form/`,star
    )
    },
  async getUser({ commit },data){
        try{
            const update = await this.$axios.get(`student/get-user/?email=${data.email}&number=${data.number}`)
            if(update.data[0]){
              localStorage.setItem("userEmail", JSON.stringify({username:update.data[0]}));
            }
            else if(update.data){
              var emails = data.email
              var numbers = data.number
              localStorage.setItem("userdata", JSON.stringify({email:emails,numbers:numbers}));
            }
            commit('set_get_user', update.data)       
            }
        catch(error){
            commit('setErrors', error.response.data.message)
        }
  }, 
  async getRegistration({ commit },data) {
          try{
            if (data.meeting_id){
              var update = await this.$axios.post(`student/registration/?meeting_id=${data.meeting_id}`, data.form);
              if (update.status === 200){
                  commit('set_register', update)
                }
              else{
                commit('setErrors', err.response.data.message)
              }
            }
            else{
              let update = await this.$axios.post(`student/registration/`, data.form);
              if (update.status === 200){
                  commit('set_register', update.data)
                }
              else{
                commit('setErrors', err.response.data.message)
              }
            }
          }
          catch(error){
              commit('setErrors', error.response.data.message)
          }

    },
  async getPersonal({commit},data){
        const st = await this.$axios.post('student/v2-personal-form/',data)
        if (st.status === 200){
          commit('set_personal', st)
        }
        else{
          commit('setErrors', err.response.data.message)
        }
  },
  async getEducational({commit},data){
        const st = await this.$axios.post('student/v2-education-form/',data)
        commit('set_educational', st)
  },
  async getExperience({commit},data){
        const st = await this.$axios.post('student/v2-experience-form/',data)
        commit('set_experience', st)
  },
  async getOthersInfo({commit},data){
        const st = await this.$axios.post('student/v2-otherdetails-form/',data)
        commit('set_othersinfo', st)
  },
  async getOTP({commit},data){
        const st = await this.$axios.get(`student/${data.form}/`,data)
        if (st.status === 200){
          commit('set_otp', st)
        }
        else{
          commit('setErrors', err.response.data.message)
        }

  },
  async getOTPVerify({commit},data){
      try{
        const st = await this.$axios.post(`student/${data.form}/`,data.data1)
        if (st.status === 200){
          commit('set_otp_verify', st)
        }
        else{
          commit('setErrors', err.response.data.message)
        }
        }
      catch(error){
        commit('setErrors', error.response.data.message)
        }
  },
  async getOTPCount({commit},data){
      const states = await this.$axios.get(`student/get-opt-count/?number=${data.form}`);
      commit('set_otp_count',states.data)
  }, 
  async getBranch({ commit }, data) {
      const branch = await this.$axios.get(`branch/branch-minimal/?per_page=200`);
      commit("set_branch", branch.data.results);
  },
  async getOrganisation({ commit }, data) {
      const organisation = await this.$axios.get(`commons/orgnization/?per_page=100`);
      commit("set_organisation", organisation.data.results);
  },
  async getStates({commit}){
      const states = await this.$axios.get(`commons/state/?per_page=100`);
      commit('set_states',states.data.results)
  },
  async getDistrict({commit},data){
      const district = await this.$axios.get(`commons/district/?state=${data}`);
      commit('set_district',district.data.results)
  },
  async getHighestdegree({commit}){
      const degree = await this.$axios.get(`commons/highest-qualification/?per_page=100`);
      commit('set_highest_degree',degree.data.results)
  },
  async getTenthBoard({commit}){
      const degree = await this.$axios.get(`commons/tenth-board/?per_page=100`);
      commit('set_tenthboard',degree.data.results)
  },
  async getTwelfthBoard({commit}){
      const degree = await this.$axios.get(`commons/twelfth-board/?per_page=100`);
      commit('set_twelfthboard',degree.data.results)
  },
  async getCourseType({commit}){
      const degree = await this.$axios.get(`commons/course-type/?per_page=100`);
      commit('set_coursetype',degree.data.results)
  },
  async getUniversity({commit}){
      const degree = await this.$axios.get(`commons/university/?types__name=Degree&per_page=150`);
      commit('set_universityy',degree.data.results)
  },
  async getsessionforgot({commit},data){
      const degree = await this.$axios.get(`student/forgot-password-session/?token=${data}`);
      commit('set_session_forgot',degree.data)
  },
  async getDipUniversity({commit}){
      const degree = await this.$axios.get(`commons/university/?types__name=Diploma&per_page=150`);
      commit('set_university_dip',degree.data.results)
  },
  async getMasUniversity({commit}){
      const degree = await this.$axios.get(`commons/university/?types__name=Master's&per_page=150`);
      commit('set_university_mas',degree.data.results)
  },
  async getDesignation({commit}){
      const degree = await this.$axios.get(`commons/designation/?per_page=100`);
      commit('set_designation',degree.data.results)
  },
  async getDomains({commit}){
      const degree = await this.$axios.get(`commons/domain/?per_page=100`);
      commit('set_domains',degree.data.results)
  },
  async getManagementTool({commit}){
      const degree = await this.$axios.get(`commons/management-tool/?per_page=100`);
      commit('set_management_tool',degree.data.results)
  },
  async getPrograminglanguage({commit}){
      const degree = await this.$axios.get(`commons/programming-languages/?per_page=100`);
      commit('set_programing_language',degree.data.results)
  },
  async getScriptinglanguage({commit}){
      const degree = await this.$axios.get(`commons/scripting-languages/?per_page=100`);
      commit('set_scripting_language',degree.data.results)
  },
  async getOtherlanguage({commit}){
      const degree = await this.$axios.get(`commons/other-languages/?per_page=100`);
      commit('set_other_language',degree.data.results)
  },
  async getDatabase({commit}){
      const degree = await this.$axios.get(`commons/database/?per_page=100`);
      commit('set_database',degree.data.results)
  },
  async getOperatingSystem({commit}){
      const degree = await this.$axios.get(`commons/operating-system/?per_page=100`);
      commit('set_operating_system',degree.data.results)
  },
  async getCertificate({commit}){
      const degree = await this.$axios.get(`commons/certificate/?per_page=100`);
      commit('set_certificate',degree.data.results)
  },
  async getFreshExp({commit}){
      const degree = await this.$axios.get(`student/get-fresher-experience/`);
      commit('set_fresh_exp',degree.data)
  },
  async getUserdetails({commit}){
      try{
      const degree = await this.$axios.get(`student/user-detail/`);
      commit('set_user_details',degree.data.results)
      if(degree.data.results){
        localStorage.setItem("userdetail", JSON.stringify({username:degree.data.results}));
        }
        } 
      catch(error){
        commit('setErrors', error.response.data.message)
      }
},
  async getMeetingID({commit},data){
      try{
      const st = await this.$axios.post(`student/add-meeting/`,data)
      if (st.status === 200){
        commit('set_meeting_id', st)
      }
      else{
        commit('setErrors', err.response.data.message)
      }
      }
      catch(error){
      commit('setErrors', error.response.data.message)
}
  },
  async getCity({commit}){
      const city = await this.$axios.get(`commons/city/?per_page=100`);
      commit('set_city',city.data.results)
  },
  async getStream({commit}){
      const streams = await this.$axios.get(`commons/stream/?types__name=Degree&per_page=100`);
      commit('set_stream',streams.data.results)
  },
  async getDipStream({commit}){
      const streams = await this.$axios.get(`commons/stream/?types__name=Diploma&per_page=100`);
      commit('set_stream_dip',streams.data.results)
  },
  async getMasStream({commit}){
      const streams = await this.$axios.get(`commons/stream/?types__name=Master's&per_page=100`);
      commit('set_stream_mas',streams.data.results)
  },
  async getCollege({commit}){
      const college = await this.$axios.get(`commons/college/?types__name=Degree&per_page=2500`);
      commit('set_college',college.data.results)
  },
  async getDipCollege({commit}){
      const college = await this.$axios.get(`commons/college/?types__name=Diploma&per_page=1500`);
      commit('set_college_dip',college.data.results)
  },
  async getMasCollege({commit}){
      const college = await this.$axios.get(`commons/college/?types__name=Master's&per_page=150`);
      commit('set_college_mas',college.data.results)
  },
  async getDegree({commit}){
      const degree = await this.$axios.get(`commons/degree/?types__name=Degree&per_page=150`);
      commit('set_degree',degree.data.results)
  },
  async getMasDegree({commit}){
      const degree = await this.$axios.get(`commons/degree/?types__name=Master's&per_page=150`);
      commit('set_mas_degree',degree.data.results)
  },
  async getStudent({commit}){
      const student = await this.$axios.get(`student/student/`);
      commit('set_getstu',student)
  },
  async getImage({commit},data){
      const image = await this.$axios.post(`student/student-image/?id=${data.idss}`,data.image);
      commit('set_image',image)
  },
  resetmsg({ commit }) {
      commit('removeErrors')
      return Promise.resolve()
    },
  async getCourseFilter({ commit }) {
      let course = await this.$axios.get(`course/course/?per_page=200`);
      commit("set_coursefilter", course.data.results);
  },
  async getSubjectFilter({ commit }) {
      let subject = await this.$axios.get(`course/subject/?per_page=200`);
      commit("set_subjectfilter", subject.data.results);
  },
  async getResetOTPConfirm({commit},data){
    console.log(data)
      let st = await this.$axios.post(`student/forgot-password-confirm/`,data.form)
      console.log("st",st)
      if (st.status === 200){
        console.log("here inside st")
        commit('set_reset_confirm', st)
      }

    },
    async getResetOTPVerify({commit},data){
      try{
        let star={
          "otp":data.data1
        }
        console.log(star)
        console.log("hererererer")
        let st = await this.$axios.post(`student/forgot-password-otp/?number=${data.form}`,star)
        console.log("status ", st)
        if (st.status === 200){
          commit('set_reset_otp_verify', st)
        }
        }
      catch(error){
        console.log("in catchb error",error.response.data.message)
        commit('setErrors', error.response.data.message)
        }
  },
  async getResetOTP({commit},data){
    console.log(data)
      let st = await this.$axios.get(`student/forgot-password-otp/?number=${data.number}`,data)
      console.log("st",st)
      if (st.status === 200){
        commit('set_reset_send_otp', st)
      }
      else{
        console.log("error",err.response)
        commit('setErrors', err.response.data.message)
      }

    },



}
      


