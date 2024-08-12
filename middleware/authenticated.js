export default function ({ redirect, store }) {
  store.dispatch('auth/restorelogin')
  if (store.state.auth.user) {

    const isAuthenticated = store.state.auth.user && store.state.auth.user.user.username ? true : false
    if (!isAuthenticated) {
      redirect({ name: 'user' })
    }
    // else{
    //   var groupExists = false
    //   var groups = store.state.auth.user.groups
    //   for(var i = 0; i < groups.length; i++ ){
    //     if(groups[i].name == "student" || groups[i].name == "trainer" || groups[i].name == "corporate"){
    //       groupExists = true
    //     }
    //   }
    //   if(!groupExists){
    //     redirect({ name: 'login' })
    //   }
    // }
  }
  else {
    redirect({ name: 'user' })
  }

}