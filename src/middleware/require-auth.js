// if route requires authentication and user is not authenticated, prevent access
export default function(next, store) {
  if (!store.state.isAuth) {
    store.dispatch("setSnackbar", {
      state: true,
      text: "Unauthorized access!",
    })
  } else {
    next()
  }
}