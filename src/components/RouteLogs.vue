<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="(log, i) in logs"
      :key="i"
    >
      <v-expansion-panel-header>
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
      <v-expansion-panel-content>
        <p>
          <b>
            <v-icon class="mr-1" dense>mdi-arrow-left-circle-outline</v-icon> From: 
          </b>
          {{ log.from }}
        </p>
        <p>
          <b>
            <v-icon class="mr-1" dense>mdi-arrow-right-circle-outline</v-icon> To: 
          </b>
          {{ log.to }}
        </p>
        <p>
          <b>
            <v-icon class="mr-1" dense>mdi-key-outline</v-icon>Is Authorized: 
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
</template>

<script>
export default {
  name: "RouteLog",
  data() {
    return {
      logs: JSON.parse(localStorage.getItem("sp_route_log")),
    };
  },
};
</script>

<style>
</style>