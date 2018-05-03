<template>
    <div class="header">
        <span style="color:#fff;font-size:14px;">您好:<span style="color:white">{{userName}}</span>
        <span ></span>
        </span>
        <Button type="ghost" shape="circle" icon="power" style="border: none" @click="loginOut"></Button>
    </div>
</template>
<script>
import { removeToken, removeUserName, getUserName } from "@/utils/auth";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["userName"])
  },
  methods: {
    loginOut() {
      this.$store.commit("REMOVE_TOKEN");
      removeToken();
      removeUserName();
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style>
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: rgba(65, 67, 79);
  height: 36px;
  line-height: 36px;
  text-align: right;
  padding-right: 20px;
  letter-spacing: 2px;
  margin-bottom: 10px;
}
.header h2{
  float: left;
  color:#fff;
  margin-left: 15px;
  font-size: 16px;
  font-family: "微软雅黑"
}
.router-link-active{
  display: inline ;
  border-left: none;
  color: #fff;
  }

</style>


