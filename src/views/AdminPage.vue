<template>
  <div>
    <h1>Logs</h1>
    <RouteLogs />
  </div>
</template>

<script>
import RouteLogs from "@/components/RouteLogs.vue"

export default {
  name: "AdminPage",
  components: {
    RouteLogs,
  }
}
</script>
