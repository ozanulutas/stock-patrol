<template>
  <div>
    TimeSeriesChart
    <div ref="cha"></div>
    <svg></svg>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
// import * as d3 from "d3"
import aapl from "@/assets/aapl.json";

export default {
  name: "TimeSeriesChart",
  data() {
    return {
      aapl,
      chart: null,
    };
  },
  computed: {
    ...mapState(["timeSeries"]),
    ...mapGetters(["getFormattedTimeSeries"]),
  },
  mounted() {
    console.log(this.getFormattedTimeSeries);
    console.log(this.timeSeries);
//     let width = 800;
//     let height = 600;
//     let margin = { top: 20, right: 30, bottom: 30, left: 40 };
//     let parseDate = d3.utcParse("%Y-%m-%d");

//     let data = d3
//       .csvParse(this.aapl, function (d) {
//         const date = parseDate(d["Date"]);
//         return {
//           date,
//           high: +d["High"],
//           low: +d["Low"],
//           open: +d["Open"],
//           close: +d["Close"],
//           // high: +d["high"],
//           // low: +d["low"],
//           // open: +d["open"],
//           // close: +d["close"],
//         };
//       })
//       .slice(-120);

//     let x = d3
//       .scaleBand()
//       .domain(
//         d3.utcDay
//           .range(data[0].date, +data[data.length - 1].date + 1)
//           .filter((d) => d.getUTCDay() !== 0 && d.getUTCDay() !== 6)
//       )
//       .range([margin.left, width - margin.right])
//       .padding(0.2);

//     let y = d3
//       .scaleLog()
//       .domain([d3.min(data, (d) => d.low), d3.max(data, (d) => d.high)])
//       .rangeRound([height - margin.bottom, margin.top]);

//     let xAxis = (g) =>
//       g
//         .attr("transform", `translate(0,${height - margin.bottom})`)
//         .call(
//           d3
//             .axisBottom(x)
//             .tickValues(
//               d3.utcMonday
//                 .every(width > 720 ? 1 : 2)
//                 .range(data[0].date, data[data.length - 1].date)
//             )
//             .tickFormat(d3.utcFormat("%-m/%-d"))
//         )
//         .call((g) => g.select(".domain").remove());

//     let yAxis = (g) =>
//       g
//         .attr("transform", `translate(${margin.left},0)`)
//         .call(
//           d3
//             .axisLeft(y)
//             .tickFormat(d3.format("$~f"))
//             .tickValues(d3.scaleLinear().domain(y.domain()).ticks())
//         )
//         .call((g) =>
//           g
//             .selectAll(".tick line")
//             .clone()
//             .attr("stroke-opacity", 0.2)
//             .attr("x2", width - margin.left - margin.right)
//         )
//         .call((g) => g.select(".domain").remove());

//     let formatDate = d3.utcFormat("%B %-d, %Y");

//     let formatValue = d3.format(".2f");

//     let formatChange = function () {
//       const f = d3.format("+.2%");
//       return (y0, y1) => f((y1 - y0) / y0);
//     };

//     const svg = d3.selectAll("svg").attr("viewBox", [0, 0, width, height]);

//     svg.append("g").call(xAxis);

//     svg.append("g").call(yAxis);

//     const g = svg
//       .append("g")
//       .attr("stroke-linecap", "round")
//       .attr("stroke", "black")
//       .selectAll("g")
//       .data(data)
//       .join("g")
//       .attr("transform", (d) => {
//         console.log(x(d.date));
//         return `translate(${x(d.date)},0)`
//       });

//     g.append("line")
//       .attr("y1", (d) => y(d.low))
//       .attr("y2", (d) => y(d.high));

//     g.append("line")
//       .attr("y1", (d) => y(d.open))
//       .attr("y2", (d) => y(d.close))
//       .attr("stroke-width", x.bandwidth())
//       .attr("stroke", (d) =>
//         d.open > d.close
//           ? d3.schemeSet1[0]
//           : d.close > d.open
//           ? d3.schemeSet1[2]
//           : d3.schemeSet1[8]
//       );

//     g.append("title").text(
//       (d) => `${formatDate(d.date)}
// Open: ${formatValue(d.open)}
// Close: ${formatValue(d.close)} (${formatChange(d.open, d.close)})
// Low: ${formatValue(d.low)}
// High: ${formatValue(d.high)}`
//     );
  },
  methods: {},
};
</script>

<style>
</style>