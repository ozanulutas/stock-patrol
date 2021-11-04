<template>
  <div>
    <h1>Home page from publick</h1>
  </div>
</template>

<script>
import data from "@/assets/test-series.json";
// import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      data,
      arr: [],
    };
  },
  mounted() {
    //   axios.post("http://localhost:8099", JSON.stringify({
    //     name: "ozan",
    //   }))
    //     // .then(resp => resp.json())
    //     .then(resp => console.log(resp))
    //     .catch(err => console.log(err))
    const timeSeries = data["Time Series (Daily)"];

    this.arr = Object.keys(timeSeries).map((key) => {
      return {
        open: timeSeries[key]["1. open"],
        high: timeSeries[key]["2. high"],
        low: timeSeries[key]["3. low"],
        close: timeSeries[key]["4. close"],
        volume: timeSeries[key]["5. volume"],
        date: key,
      };
      // this.arr.push({
      //   open: timeSeries[key]["1. open"],
      //   high: timeSeries[key]["1. high"],
      //   low: timeSeries[key]["1. low"],
      //   close: timeSeries[key]["1. close"],
      //   volume: timeSeries[key]["1. volume"],
      //   date: key
      // })
    });
    // console.log(this.arr);
  },
};
</script>
