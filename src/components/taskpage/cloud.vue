<template>
  <div>
    <canvas :id="id" :width="width"  :height="height"></canvas>
  </div>
</template>

<script>
import WordCloud from "wordcloud";
export default {
  name: "cloud",
  props: {
    id: {
      type: String,
      default: "cloud"
    },
    list: {
      type: Array,
      default: () => {
        return [["foo", 12], ["bar", 6]];
      }
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    }
  },
  mounted() {
    let my_canvas = document.getElementById(this.id);
    WordCloud(my_canvas, {
      list: this.list,
      gridSize: 18,
      weightFactor: 3,
      fontFamily: "Finger Paint, cursive, sans-serif",
      color: "#f0f0c0",
      backgroundColor: "transparent"
    });
  },
  data() {
    return {
      cloud: ""
    };
  }
};
</script>
<style>
#vis {
  margin-top: 270px;
}
</style>

