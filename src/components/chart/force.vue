<template>
    <div>
        <canvas id="springydemo" width="640" height="480"></canvas>
    </div>
</template>
<script>
import jQuery from "jquery";
import Springy from "springy";
import "assets/js/springyui";

export default {
  mounted() {
    window.Springy = Springy;
    var graph = new Springy.Graph();
    graph.addNodes("Dennis", "Michael", "Jessica", "Timothy", "Barbara");
    graph.addNodes("Amphitryon", "Alcmene", "Iphicles", "Heracles");
    graph.addEdges(
      ["Dennis", "Michael", { color: "#00A0B0", label: "Foo bar" }],
      ["Michael", "Dennis", { color: "#6A4A3C" }],
      ["Michael", "Jessica", { color: "#CC333F" }],
      ["Jessica", "Barbara", { color: "#EB6841" }],
      ["Michael", "Timothy", { color: "#EDC951" }],
      ["Amphitryon", "Alcmene", { color: "#7DBE3C" }],
      ["Alcmene", "Amphitryon", { color: "#BE7D3C" }],
      ["Amphitryon", "Iphicles"],
      ["Amphitryon", "Heracles"],
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

