<template>
  <div>
    <h1>Logs</h1>
    <v-divider></v-divider>
    <RouteLogs
      :confirm-delete.sync="confirmDelete"
      @delete-logs="setDialog"
    />

    <BaseDialog 
      :dialog="dialog"
      @confirm="(handler) => handler()"
    />
  </div>
</template>

<script>
import RouteLogs from "@/components/RouteLogs.vue"
import BaseDialog from "@/components/BaseDialog.vue"

export default {
  name: "AdminPage",
  components: {
    RouteLogs,
    BaseDialog,
  },
  data() {
    return {
      dialog: {},
      confirmDelete: false,
    }
  },
  methods: {
    setDialog() {
      this.dialog = {
        show: true,
        title: "Warning",
        text: "Do you want to delete logs?",
        btn: {
          confirm: {
            text: "DELETE",
            handler: () => {
              this.confirmDelete = true; 
              this.dialog.show = false;
            }
          },
          cancel: {
            text: "CANCEL",
          },
        }
      }
    },
  }
}
</script>
