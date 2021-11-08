// if route requires authentication and user is not authenticated, prevent access
export default function(next, store) {
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
    return "Unauthorized Access"
  } else {
    next()
  }
}