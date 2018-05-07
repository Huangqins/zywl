<template>
  <chart id="percent" width="200px" height="200px" :option="option"></chart>
</template>
<script>
import chart from "components/chart/chart";
let percent = 0;
export default {
  components: {
    chart
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
};
</script>
