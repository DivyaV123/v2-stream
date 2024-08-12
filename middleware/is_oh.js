export default function ({ redirect, store }) {
    if (store.state.auth.user) {
        console.log("store.state.auth.user.groups",store.state.auth.user.groups[0].name)
        if (store.state.auth.user.groups[0].name!="oh") {
            return redirect('/404');
        }
    }

  }