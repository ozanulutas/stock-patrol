// if route requires authentication and user is not authenticated, prevent access
export default function(next, store) {
  if (!store.state.isLoggedIn) {
    store.dispatch("setSnackbar", {
      state: true,
      text: "Unauthorized access!",
    });
    return "Unauthorized Access"
  } else {
    next()
  }
}