<template>
    <div class="entry">
        <!-- entry container -->
        <div class="entry-container">
            <!-- entry tab -->
            <div class="entry-tabs">
                <div class="entry-tabs-item" @click="toggle('Register')">注册</div>
                <div class="entry-tabs-item" @click="toggle('Login')">登录</div>
            </div>
            <keep-alive>
                <component :is="currentView"></component>
            </keep-alive>
        </div>
    </div>
</template>
<script>
import Register from "./register";
import Login from "./login";
export default {
  name: "entry",
  components: {
    Register,
    Login
  },
  data() {
    return {
      currentView: "Register"
    };
  },
  methods: {
    toggle(view) {
      this.currentView = view;
    }
  }
};
</script>

<style scoped>
.entry {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 350px;
  height: 600px;
  transform: translate3d(-50%, -50%, 0);
}
.entry-tabs {
  display: flex;
}
.entry-tabs-item {
  flex: 1;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
</style>

