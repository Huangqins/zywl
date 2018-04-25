<template>
  <div>
    <canvas id="cloud" width=400 height=400></canvas>
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
    data: {
      type: Array,
      default: () => {
        return [
          [12, "Love"],
          [5, "Liebe"],
          [5, "ፍቅር"],
          [5, "Lufu"],
          [5, "حب"],
          [5, "Aimor"]
        ];
      }
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    }
  },
  mounted() {

    let my_canvas = document.getElementById("cloud");
    WordCloud(my_canvas, {
      list: this.data,
      gridSize: 8,
      weightFactor: 16,
      fontFamily: "Hiragino Mincho Pro, serif",
      color: "random-dark",
      backgroundColor: "#f0f0f0",
      rotateRatio: 0
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

