<template>
<div>
  <!-- <div class="welcome">
      <div class="homepage">
          <div>历史信息查询</div>
          <div>资产信息管理</div>
          <div>攻防测试</div>
          <div>报告信息管理</div>
          <div>知识库管理</div>
          <div>智能服务</div>
      </div>
  </div> -->
  <div class='welcome'>
  <div class='col' @click="go">
    <a href="#"></a>
    <a href="#"></a>
    <a href="#"></a>
    <a href="#"></a>
    <div class='box'></div>
  </div>
  <div class='col'>
    <a href="#"></a>
    <a href="#"></a>
    <a href="#"></a>
    <a href="#"></a>
    <div class='box'></div>
  </div>
  <div class='col'>
    <a href="#"></a>
    <a href="#"></a>
    <a href="#"></a>
    <a href="#"></a>
    <div class='box'></div>
  </div>
  <div class='col'>
    <a href="#"></a>
    <a href="#"></a>
    <a href="#"></a>
    <a href="#"></a>
    <div class='box'></div>
  </div>
  <div class='col'>
    <a href="#"></a>
    <a href="#"></a>
    <a href="#"></a>
    <a href="#"></a>
    <div class='box'></div>
  </div>
  <div class='col'>
    <a href="#"></a>
    <a href="#"></a>
    <a href="#"></a>
    <a href="#"></a>
    <div class='box'></div>
  </div>
</div>
  </div>
</template>
<script>
export default {
  name: "taskhomepage",
  data() {
    return {};
  },
  methods: {
    go () {
      this.$router.push({path: '/'})
    }
  }
};
</script>
<style  scoped>
@import url("../../assets/css/icon/iconfont.css");

.welcome {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,0);
  width: 722px;
  perspective: 1000px;
}

.col {
  position: relative;
  float: left;
  margin: 6px;
  width: calc(240px - 12px);
  height: calc(240px - 12px);
}
.col a {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.col a:nth-child(1) {
  -webkit-clip-path: polygon(0 0, 100% 0, 50% 50%);
  clip-path: polygon(0 0, 100% 0, 50% 50%);
}
.col a:nth-child(2) {
  -webkit-clip-path: polygon(100% 0, 100% 100%, 50% 50%);
  clip-path: polygon(100% 0, 100% 100%, 50% 50%);
}
.col a:nth-child(3) {
  -webkit-clip-path: polygon(0 100%, 50% 50%, 100% 100%);
  clip-path: polygon(0 100%, 50% 50%, 100% 100%);
}
.col a:nth-child(4) {
  -webkit-clip-path: polygon(0 0, 50% 50%, 0 100%);
  clip-path: polygon(0 0, 50% 50%, 0 100%);
}
.col a:hover {
  z-index: 3;
  -webkit-clip-path: none;
  clip-path: none;
}
.col a:nth-child(1):hover ~ .box {
  transform: rotateX(180deg);
}
.col a:nth-child(2):hover ~ .box {
  transform: rotateY(180deg);
}
.col a:nth-child(3):hover ~ .box {
  transform: rotateX(-180deg);
}
.col a:nth-child(4):hover ~ .box {
  transform: rotateY(-180deg);
}
.col a:nth-child(1):hover ~ .box:after,
.col a:nth-child(3):hover ~ .box:after {
  transform: rotateX(-180deg);
}
.col a:nth-child(2):hover ~ .box:after,
.col a:nth-child(4):hover ~ .box:after {
  transform: rotateY(-180deg);
}
.col .box {
  position: absolute;
  width: 100%;
  height: 100%;
  font-family: "Open Sans", sans-serif;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  transform-style: preserve-3d;
  transition: transform 0.3s ease-in-out;
}
.col .box:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font: normal normal normal 14px/1 iconfont;
  font-size: 80px;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  border-radius: 2px;
  z-index: 2;
  backface-visibility: hidden;
}
.col .box:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #333;
  color: #fff;
  font-size: 30px;
  font-family: '微软雅黑';
  border-radius: 2px;
  transition-delay: 0.15s;
}
.col:nth-child(1) .box:before {
  content: "\e8d5";
  background: #3f51b5;
}
.col:nth-child(1) .box:after {
  content: "历史信息查询";
  background: #3f51b5;
}
.col:nth-child(2) .box:before {
  content: "\e619";
  background: #1da1f2;
}
.col:nth-child(2) .box:after {
  content: "资产信息管理";
  background: #1da1f2;
}
.col:nth-child(3) .box:before {
  content: "\e665";
  background: #dc4a38;
}
.col:nth-child(3) .box:after {
  content: "攻防测试";
  background: #dc4a38;
}
.col:nth-child(4) .box:before {
  content: "\e603";
  background: #006699;
}
.col:nth-child(4) .box:after {
  content: "报告信息管理";
  background: #006699;
}
.col:nth-child(5) .box:before {
  content: "\e645";
  background: #36465d;
}
.col:nth-child(5) .box:after {
  content: "知识库管理";
  background: #36465d;
}
.col:nth-child(6) .box:before {
  content: "\e652";
  background: #f16528;
}
.col:nth-child(6) .box:after {
  content: "智能服务";
  background: #f16528;
}

</style>

