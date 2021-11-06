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