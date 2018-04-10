<template>
    <div :class="$style.panel">
        <div :class="$style.panel_horn_left"></div>
        <div :class="$style.panel_horn_right"></div>
        <div :class="$style.panel_content_title"></div>
        <slot/>
    </div>
</template>
<script>
export default {
  data() {
    return {
      panel: "panel",
      panel_horn_left: "panel-horn-left",
      panel_horn_right: "panel-horn-right",
      panel_content_title: "panel-content-title"
    };
  }
};
</script>
<style lang="scss" module>
@import "../../styles/layout.scss";
.panel {
  @include panel($width: 400px,$height: 400px);
}
.panel_horn_left {
  @include panel-horn-left;
}
.panel_horn_right {
  @include panel-horn-right;
}
.panel_content_title {
  @include panel-content-title;
}
</style>


