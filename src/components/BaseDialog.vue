<template>
  <v-dialog
    v-model="dialog.show"
    width="500"
  >
    <v-card>
      <v-card-title v-if="dialog.title" class="text-h5 grey lighten-4">
        {{ dialog.title }}
      </v-card-title>
      <v-card-text class="mt-4">
        {{ dialog.text }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions v-if="dialog.btn">
        <v-spacer></v-spacer>
        <v-btn
          v-if="dialog.btn && dialog.btn.cancel"
          color="primary"
          text
          @click="dialog.btn.cancel.handler ? $emit('cancel', dialog.btn.cancel.handler) : close()"
        >
          {{ dialog.btn.cancel.text || "CANCEL" }}
        </v-btn>
        <v-btn
          v-if="dialog.btn && dialog.btn.confirm"
          color="primary"
          text
          @click="dialog.btn.confirm.handler ? $emit('confirm', dialog.btn.confirm.handler) : close()"
        >
          {{ dialog.btn.confirm.text || "CONFIRM" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "BaseDialog",
  props: {
    dialog: {
      type: Object,
      default: () => ({
        show: false,
        title: "Dialog Title",
        text: "Dialog text",
        btn: {
          confirm: {
            text: "CONFIRM",
            handler: () => this.dialog.show = false
          },
          cancel: {
            text: "CANCEL",
            handler: () => this.dialog.show = false
          },
        }
      })
    }
  },
  methods: {
    // hides the dialog
    close() {
      this.dialog.show = false
    }
  }
}
</script>
