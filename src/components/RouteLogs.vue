<template>
<section>
  <v-tooltip right>
    <template v-slot:activator="{ on, attrs }">
      <v-btn 
        color="error" 
        fab
        small
        v-bind="attrs"
        v-on="on"
        @click="deleteLogs()" 
      >
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </template>
    <span>Remove Selected Logs</span>
  </v-tooltip>

  <v-expansion-panels>
      <v-expansion-panel
        v-for="(log, i) in logs"
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
              <v-icon class="mr-1" dense>mdi-key-outline</v-icon>
              Is Authorized: 
            </b>
            {{ log.isLoggedIn.toString() | capitalize }}
          </p>
          <p v-if="log.error !== ''">
            <b>
              <v-icon class="mr-1 rotate-40" dense>mdi-alert-circle-outline</v-icon>
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
export default {
  name: "RouteLog",
  data() {
    return {
      logs: JSON.parse(localStorage.getItem("sp_route_log")),
      selectedLogs: [],
    };
  },
  methods: {
    deleteLogs() {
      this.logs = this.logs.filter(log => !this.selectedLogs.some(selectedLog => selectedLog === log.title))
      this.selectedLogs = []
      localStorage.setItem("sp_route_log", JSON.stringify(this.logs))
    }
  }
};
</script>

<style>
</style>