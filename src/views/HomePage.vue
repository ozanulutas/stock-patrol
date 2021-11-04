<template>
  <div>
    <h1>Home page from publick</h1>
  </div>
</template>

<script>
import data from "@/assets/test-series.json";
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      data,
    };
  },
  mounted() {
    axios.post("http://localhost:8099", JSON.stringify({
      name: "ozan",
    }))
      // .then(resp => resp.json())
      .then(resp => console.log(resp))
      .catch(err => console.log(err))
  },
};
</script>
