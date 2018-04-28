<template>
    <div>
        <canvas id="springydemo" :width="width" :height="height"></canvas>
    </div>
</template>
<script>
import jQuery from "jquery";
import Springy from "springy";
import "assets/js/springyui";

export default {
  props: {
    width: {
      type: [String, Number],
      default: 400
    },
    height: {
      type: [String, Number],
      default: 400
    }
  },
  mounted() {
    window.Springy = Springy;
    var graph = new Springy.Graph();
    graph.addNodes("Dennis", "Michael", "Jessica", "Timothy", "Barbara");
    graph.addEdges(
      ["Dennis", "Michael", { color: "#00A0B0", label: "Foo bar" }],
      ["Michael", "Dennis", { color: "#6A4A3C" }],
      ["Michael", "Jessica", { color: "#CC333F" }],
      ["Jessica", "Barbara", { color: "#EB6841" }],
      ["Michael", "Timothy", { color: "#EDC951" }],
      ["Barbara", "Timothy", { color: "#6A4A3C" }]
    );

    jQuery(function() {
      var springy = jQuery("#springydemo").springy({
        graph: graph
      });
    });
  }
};
</script>

