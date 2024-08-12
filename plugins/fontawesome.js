import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSignOutAlt, faMicrophone, faMicrophoneSlash, faUsersSlash, faVideo, faVideoSlash, faUpload, faCommentAlt, faPaperPlane, faTimesCircle, faTrash, faLink, faBook, faBookOpen, faBars, faUsers, faCalendarDay, faUserTie, faKey, faUserAltSlash, faUserAlt } from '@fortawesome/free-solid-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(faSignOutAlt, faMicrophone, faMicrophoneSlash, faUsersSlash, faVideo, faVideoSlash, faUpload, faCommentAlt, faPaperPlane, faTimesCircle, faTrash, faLink, faBook, faBookOpen, faBars, faUsers, faCalendarDay, faUserTie, faKey, faUserAltSlash, faUserAlt)

// Register the component globally
Vue.component('font-awesome-icon', FontAwesomeIcon)