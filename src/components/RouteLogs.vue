<template>
  <section>
    <div v-if="logs.length > 0" class="d-flex justify-space-between my-3">
      <v-checkbox
        v-model="selectAllLogs"
        :input-value="true"
        :false-value="false"
        hide-details
        class="shrink ml-3 mt-0 mb-1"
        @change="toggleAllLogs"
      >
        <template v-slot:label>
          Select All
        </template>
      </v-checkbox>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            color="error" 
            fab
            small
            v-bind="attrs"
            v-on="on"
            :disabled="selectedLogs.length === 0"
            @click="$emit('delete-logs')" 
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
        <span>Remove Selected Logs</span>
      </v-tooltip>
    </div>

    <v-expansion-panels>
      <v-expansion-panel
        v-for="(log, i) in showOnlyErrors ? filteredLogs : logs"
        :key="i"
      >
        <div class="d-flex align-center py-2">
          <v-checkbox
            v-model="selectedLogs"
            :value="log.title"
            hide-details
            class="shrink ml-3 mt-0 mb-1"
          ></v-checkbox>
          <v-expansion-panel-header class="pl-2">
            <span :class="`${log.error !== '' ? 'error' : ''}--text`">
              {{ new Date(log.title).toLocaleString() }}
            </span>
            <v-icon
              v-if="log.error !== ''"
              color="error"
              class="flex-0 ml-2"
            >
              mdi-alert-circle
            </v-icon>
          </v-expansion-panel-header>
        </div>
        <v-expansion-panel-content class="ml-6">
          <p>
              <b>
                <v-icon class="mr-1" dense>mdi-arrow-left-circle-outline</v-icon> 
                From: 
              </b>
              {{ log.from }}
          </p>
          <p>
              <b>
                <v-icon class="mr-1" dense>mdi-arrow-right-circle-outline</v-icon> 
                To: 
              </b>
              {{ log.to }}
          </p>
          <p>
              <b>
                <v-icon class="mr-1 rotate-40" dense>mdi-key-outline</v-icon>
                Is Authorized: 
              </b>
              {{ log.isLoggedIn.toString() | capitalize }}
          </p>
          <p v-if="log.error !== ''">
            <b>
              <v-icon class="mr-1" dense>mdi-alert-circle-outline</v-icon>
              Error: 
            </b>
            {{ log.error }}
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </section>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "RouteLog",
  props: {
    // trigger for log's deletion. comes from modal
    confirmDelete: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      logs: JSON.parse(localStorage.getItem("sp_route_log")),
      // selected logs for deletion
      selectedLogs: [],
      // trigger for select all logs
      selectAllLogs: false,
    };
  },
  watch: {
    // watches the confirmDelete prop
    // if it state is changes to true, deletes selected logs and resets confirmDelete prop
    confirmDelete(isConfirmed) {
      if(isConfirmed) {
        this.deleteLogs();
        this.$emit("update:confirm-delete", false)
      }
    },
  },
  methods: {
    ...mapActions(["smackbar"]),

    // deletes the selected logs
    deleteLogs() {
      // returns the unselected logs
      this.logs = this.logs.filter(log => !this.selectedLogs.some(selectedLog => selectedLog === log.title))
      // set the local storage with unselected logs
      localStorage.setItem("sp_route_log", JSON.stringify(this.logs));
      
      // resets the selections
      this.selectedLogs = [];
      this.selectAllLogs = false;

      // informs the user
      this.smackbar({
        show: true,
        text: "Logs are succesfully deleted.",
        btn: {
          close: {
            color: "blue"
          }
        }
      });
    },

    // select all logs
    toggleAllLogs(toggle) {
      if(toggle) {
        this.selectedLogs = this.logs.map(log => log.title)
      } else {
        this.selectedLogs = []
      }
    }
  }
};
</script>
