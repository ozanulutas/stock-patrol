// if route requires authentication and user is not authenticated, prevent access
// returns error name for logging
export default function(from, to, next, router, store) {

  if (!store.state.isLoggedIn) {
    store.dispatch("smackbar", {
      show: true,
      text: "Unauthorized access!",
      btn: {
        close: {
          color: "pink"
        }
      }
    });

    // if user is logging out from admin page, redirect to home page
    if(to.fullPath === "/admin") {
      router.push("/").catch(() => {})
    }

    return "Unauthorized Access"
  } else {
    next();
  }
  return ""
}