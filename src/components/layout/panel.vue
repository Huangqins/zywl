<template>
    <div :class="$style.panel">
        测试
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss" module>
@import "styles/panel.scss";
.panel {
  @include panel;
}
</style>


