<template>
  <div>
    <div id="vis"></div>
  </div>
</template>

<script>
const d3 = require("d3");
const cloud = require("d3-cloud");

export default {
  name: "cloud",
  data() {
    return {
    };
  },
  mounted() {
    const fill  = d3.scaleOrdinal(d3.schemeCategory10);
    var layout = cloud()
      .size([500, 500])
      .words(
        [
          "Hello",
          "world",
          "normally",
          "you",
          "want",
          "more",
          "words",
          "than",
          "this"
        ];
      }
    }
  },
  data() {
    return {};
  },
  mounted() {
    const fill = d3.scaleOrdinal(d3.schemeCategory10);
    // var fill = color(d3.schemeCategory20)

    console.log(d3.schemeCategory10);
    var layout = cloud()
      .size([500, 500])
      .words(
        this.words.map(function(d) {
          return { text: d, size: 10 + Math.random() * 90, test: "haha" };
        })
      )
      .padding(5)
      .rotate(function() {
        return Math.random() * 2 * 90;
      })
      .font("Impact")
      .fontSize(function(d) {
        return d.size;
      })
      .on("end", this.draw);

    layout.start();

    // function draw(words) {

    // }
  },
  methods: {
    draw(words) {
      d3
        .select("#vis")
        .append("svg")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr(
          "transform",
          "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")"
        )
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", function(d) {
          return d.size + "px";
        })
        .style("font-family", "Impact")
        .style("fill", function(d, i) {
          return fill(i);
        })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) {
          return d.text;
        });
    }
  }
};
</script>

