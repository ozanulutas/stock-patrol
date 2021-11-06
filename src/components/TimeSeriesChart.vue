<template>
  <div>
    <svg id="chart"></svg>
    <!-- <div id="chart2"></div> -->
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";

export default {
  name: "TimeSeriesChart",
  props: {
    draw: Boolean,
    serie: String,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getFormattedTimeSeries"]),
  },
  watch: {
    draw(isDrawing) {
      if (isDrawing) {
        this.drawChart(this.getFormattedTimeSeries(this.serie), {
          date: (d) => new Date(d.date),
          high: (d) => d.high,
          low: (d) => d.low,
          open: (d) => d.open,
          close: (d) => d.close,
          yLabel: "↑ Price ($)",
          width: 1200,
          height: 500,
        });
        // this.drawChart2(this.getFormattedTimeSeries(this.serie));
      }
    },
  },
  methods: {
    drawChart(
      data,
      {
        date = (d) => d.date, // given d in data, returns the (temporal) x-value
        open = (d) => d.open, // given d in data, returns a (quantitative) y-value
        close = (d) => d.close, // given d in data, returns a (quantitative) y-value
        high = (d) => d.high, // given d in data, returns a (quantitative) y-value
        low = (d) => d.low, // given d in data, returns a (quantitative) y-value
        title, // given d in data, returns the title text
        marginTop = 20, // top margin, in pixels
        marginRight = 30, // right margin, in pixels
        marginBottom = 30, // bottom margin, in pixels
        marginLeft = 40, // left margin, in pixels
        width = 640, // outer width, in pixels
        height = 400, // outer height, in pixels
        xDomain, // array of x-values (defaults to every weekday)
        xRange = [marginLeft, width - marginRight], // [left, right]
        xPadding = 0.2,
        xTicks, // array of x-values to label (defaults to every other Monday)
        yType = d3.scaleLinear, // type of y-scale
        yDomain, // [ymin, ymax]
        yRange = [height - marginBottom, marginTop], // [bottom, top]
        xFormat = "%b %-d", // a format specifier for the date on the x-axis
        yFormat = "~f", // a format specifier for the value on the y-axis
        yLabel, // a label for the y-axis
        stroke = "currentColor", // stroke color for the daily rule
        strokeLinecap = "round", // stroke line cap for the rules
        colors = ["#4daf4a", "#999999", "#e41a1c"], // [up, no change, down]
      } = {}
    ) {
      d3.selectAll("svg#chart > *").remove();

      // Compute values.
      const X = d3.map(data, date);
      const Yo = d3.map(data, open);
      const Yc = d3.map(data, close);
      const Yh = d3.map(data, high);
      const Yl = d3.map(data, low);
      const I = d3.range(X.length);

      const weeks = (start, stop, stride) =>
        d3.utcMonday.every(stride).range(start, +stop + 1);
      const weekdays = (start, stop) =>
        d3
          .utcDays(start, +stop + 1)
          .filter((d) => d.getUTCDay() !== 0 && d.getUTCDay() !== 6);

      // Compute default domains and ticks.
      if (xDomain === undefined) xDomain = weekdays(d3.min(X), d3.max(X));
      if (yDomain === undefined) yDomain = [d3.min(Yl), d3.max(Yh)];
      if (xTicks === undefined)
        xTicks = weeks(d3.min(xDomain), d3.max(xDomain), 2);

      // Construct scales and axes.
      // If you were to plot a stock using d3.scaleUtc, you’d see distracting gaps
      // every weekend. This chart therefore uses a d3.scaleBand whose domain is every
      // weekday in the dataset. A few gaps remain for holiday weekdays, such as
      // Christmas, but these are infrequent and allow the labeling of Mondays. As a
      // band scale, we specify explicit tick values.
      const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
      const yScale = yType(yDomain, yRange);
      const xAxis = d3
        .axisBottom(xScale)
        .tickFormat(d3.utcFormat(xFormat))
        .tickValues(xTicks);
      const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

      // Compute titles.
      if (title === undefined) {
        const formatDate = d3.utcFormat("%B %-d, %Y");
        const formatValue = d3.format(".2f");
        const formatChange = (
          (f) => (y0, y1) =>
            f((y1 - y0) / y0)
        )(d3.format("+.2%"));
        title = (i) => `${formatDate(X[i])}
          Open: ${formatValue(Yo[i])}
          Close: ${formatValue(Yc[i])} (${formatChange(Yo[i], Yc[i])})
          Low: ${formatValue(Yl[i])}
          High: ${formatValue(Yh[i])}`;
      } else if (title !== null) {
        const T = d3.map(data, title);
        title = (i) => T[i];
      }

      const svg = d3
        .select("svg#chart")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

      svg
        .append("g")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", `translate(0,${height - marginBottom}), rotate(-65)`)
        .call((g) => g.select(".domain").remove());
    
    // svg
    //     .append("g")
    //     .attr("transform", "translate(0," + 450 + ")") //need to change this 450 to a variable- it is how far down the axis will go
    //     .attr("class", "xrule")
    //     .call(d3.axisBottom(x))
    //     .selectAll("text")
    //     .style("text-anchor", "end")
    //     .attr("dx", "-.8em")
    //     .attr("dy", ".15em")
    //     .attr("transform", function () {
    //       return "rotate(-65)";
    //     });
        

      svg
        .append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .selectAll(".tick line")
            .clone()
            .attr("stroke-opacity", 0.2)
            .attr("x2", width - marginLeft - marginRight)
        )
        .call((g) =>
          g
            .append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel)
        );

      const g = svg
        .append("g")
        .attr("stroke", stroke)
        .attr("stroke-linecap", strokeLinecap)
        .selectAll("g")
        .data(I)
        .join("g")
        .attr("transform", (i) => `translate(${xScale(X[i])},0)`);
        

      g.append("line")
        .attr("y1", (i) => yScale(Yl[i]))
        .attr("y2", (i) => yScale(Yh[i]));

      g.append("line")
        .attr("y1", (i) => yScale(Yo[i]))
        .attr("y2", (i) => yScale(Yc[i]))
        .attr("stroke-width", xScale.bandwidth())
        .attr("stroke", (i) => colors[1 + Math.sign(Yo[i] - Yc[i])]);

      if (title) g.append("title").text(title);
    },


    drawChart2(data) {
      d3.selectAll("div#chart2 > *").remove();

      var width = 900;
      var height = 500;
      var margin = 50;

      function min(a, b) {
        return a < b ? a : b;
      }

      function max(a, b) {
        return a > b ? a : b;
      }

      var y = d3.scaleLinear().range([height - margin, margin]);

      var x = d3.scaleTime().range([margin, width - margin]);

      //line for the sma
      var line1 = d3
        .line()
        .x(function (d) {
          return x(d["date"]);
        })
        .y(function (d) {
          return y(d["close"]);
        });

      data.forEach(function (d) {
        d.date = new Date(d.date);
        d.high = +d.high;
        d.low = +d.low;
        d.open = +d.open;
        d.close = +d.close;
        d.volume = +d.volume;
      });

      var chart = d3
        .select("div#chart2")
        .append("svg")
        .attr("class", "chart")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

      y.domain([
        d3.min(
          data.map(function (x) {
            return x["low"];
          })
        ),
        d3.max(
          data.map(function (x) {
            return x["high"];
          })
        ),
      ]);

      x.domain(
        d3.extent(data, function (d) {
          return d["date"];
        })
      );

      chart
        .selectAll("line.x")
        .data(x.ticks(10))
        .enter()
        .append("line")
        .attr("class", "x")
        //.text(String)
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", margin)
        .attr("y2", height - margin)
        .attr("stroke", "#ccc");
      chart
        .selectAll("line.y")
        .data(y.ticks(10))
        .enter()
        .append("line")
        .attr("class", "y")
        .attr("x1", margin)
        .attr("x2", width - margin)
        .attr("y1", y)
        .attr("y2", y)
        .attr("stroke", "#ccc");

      chart
        .append("g")
        .attr("transform", "translate(0," + 450 + ")") //need to change this 450 to a variable- it is how far down the axis will go
        .attr("class", "xrule")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function () {
          return "rotate(-65)";
        });

      chart
        .selectAll("text.yrule")
        .data(y.ticks(10))
        .enter()
        .append("text")
        .attr("class", "yrule")
        .attr("x", 0)
        .attr("y", y)
        .attr("dy", 0)
        .attr("dx", 20)
        .attr("text-anchor", "middle")
        .text(String);

      chart
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d["date"]);
        })
        .attr("y", function (d) {
          return y(max(d["open"], d["close"]));
        })
        .attr("height", function (d) {
          return y(min(d["open"], d["close"])) - y(max(d["open"], d["close"]));
        })
        .attr("width", function () {
          return (0.5 * (width - 2 * margin)) / data.length;
        })
        .attr("fill", function (d) {
          return d["open"] > d["close"] ? "red" : "green";
        });

      chart
        .selectAll("line.stem")
        .data(data)
        .enter()
        .append("line")
        .attr("class", "stem")
        .attr("x1", function (d) {
          return x(d["date"]) + (0.25 * (width - 2 * margin)) / data.length;
        })
        .attr("x2", function (d) {
          return x(d["date"]) + (0.25 * (width - 2 * margin)) / data.length;
        })
        .attr("y1", function (d) {
          return y(d["high"]);
        })
        .attr("y2", function (d) {
          return y(d["low"]);
        })
        .attr("stroke", function (d) {
          return d.open > d.close ? "red" : "green";
        });


      // chart.data(data).append("title").text(
      //   (d) => `${d.date}
      //     Open: ${d.open}
      //     Close: ${d.close} (${(d.close - d.open) / d.open})
      //     Low: ${d.low}
      //     High: ${d.high}`
      // );

      chart
        .append("path")
        .data([data])
        .attr("d", line1)
        .attr("class", "line")
        .style("stroke", "white")
        .attr("fill", "none")
        .attr("stroke-width", 2);

    },
  },
};
</script>

<style>
</style>