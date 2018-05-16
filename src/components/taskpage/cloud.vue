<template>
  <div>
    <canvas :id="id" :width="width"  :height="height"></canvas>
  </div>
</template>

<script>
import WordCloud from "wordcloud";
import vulnWordClouds from "api/vulnWordClouds";
export default {
  name: "cloud",
  props: {
    id: {
      type: String,
      default: "cloud"
    },
    // list: {
    //   type: Array,
    //   default: () => {
    //     return [["foo", 12], ["bar", 6]];
    //   }
    // },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 300
    }
  },
  mounted() {
    this._vulnWordClouds();
  },
  data() {
    return {
      cloud: "",
      list: () => {
        return [];
      }
    };
  },
  methods: {
    _vulnWordClouds() {
      var list = [];
      vulnWordClouds({}).then(res => {
        if (res.result === 0 && res.vulns.length > 0)
          list = res.vulns.map(item => {
            return [
              item.vuln_type ? item.vuln_type : "其他类型",
             Math.floor(Math.log(item.vuln_total)) + 2
            ];
          });
        let my_canvas = document.getElementById(this.id);
        WordCloud(my_canvas, {
          list: list,
          gridSize: 18,
          weightFactor: 3,
          fontFamily: "Finger Paint, cursive, sans-serif",
          color: "#f0f0c0",
          backgroundColor: "transparent"
        });
      });
    }
  }
};
</script>
<style>
#vis {
  margin-top: 270px;
}
</style>

