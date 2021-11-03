<template>
  <div>
    <h1>Home page from publick</h1>
  </div>
</template>

<script>
import data from "@/assets/test-series.json"

export default {
  name: "HomePage",
  data() {
    return {
      data,
    }
  },
  mounted() {
    // const dat = data["Time Series (Daily)"].forEach(() => {
      
    // })
    // console.log(dat);
  }
};
</script>
