<template>
    <div :class="$style.panel">
        <div :class="$style.panel-horn-left"></div>
        <div :class="$style.panel-horn-right"></div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss" module>
@import "../../styles/layout.scss";
.panel {
  @include panel($width: 400px,$height: 400px);
  & .panel-horn-left {
       @include panel($width: 400px,$height: 400px);
  }
  & .panel-horn-right {
       @include panel($width: 400px,$height: 400px);
  }
}


</style>


