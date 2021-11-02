<template>
  <v-form 
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="submit()"
  >
    <v-row align="center">
      <v-col>
        <v-text-field
          v-model="form.symbol"
          :rules="[v => !!v || 'Tihs field is required']"
          label="Symbol"
          clearable
        ></v-text-field>
        <!-- <v-autocomplete
          v-model="form.symbol"
          :rules="[v => !!v || 'Tihs field is required']"
          label="Symbol"
          rounded
          solo
          clearable
          hide-details="auto"
          no-data-text="Your search history is empty"
        ></v-autocomplete> -->
      </v-col>

      <v-col class="flex-0">
        <v-btn
          fab
          color="success"
          :disabled="!valid"
          type="submit"
          small
        >
          <v-icon dark>
            mdi-magnify
          </v-icon>
        </v-btn>
      </v-col>

    </v-row>

  </v-form>
</template>

<script>
export default {
  name: "SearchForm",
  data() {
    return {
      form: { // form data to submit
        symbol: "",
      },
      valid: true, // form's validity state
    }
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) { // checks the validity of the form
        console.log("submitted");
        this.$router.push({
          name: "SymbolPage",
          params: {
            symbol: this.form.symbol,
          }
        })
      }
    }
  }
};
</script>

<style>
</style>