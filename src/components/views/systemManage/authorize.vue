<template>
  <div class="authorize-container">
       <Upload  multiple  :action="uploadUrl" :with-credentials="true"  name="license" :headers="headers" :show-upload-list="false" style="display:inline-block" :on-success="success"	>
                <Button type="primary" icon="ios-cloud-upload-outline">导入授权文件</Button>
        </Upload>
        <!-- <div class="List">
          <page :columns="Colums" :data="List" :dataTotal="total" @dataLoad="dataLoad" :loading="loading" :width="width"></page>
        </div> -->
  </div>
</template>
<script>
import { getToken, getUserName } from "@/utils/auth";
const host =
  process.env.NODE_ENV === "development" ? "http://192.168.10.104:8080/ZY" : "";
// const host = process.env.NODE_ENV === "development" ? "http://192.168.10.175/ZY" : "";

const href = host + "system/loadFile";
export default {
  data() {
    return {
      headers: {
        token: getToken(),
        userName: getUserName(),
        menuCode: vm._route.meta.menuCode
      },
      uploadUrl: location.origin + "/ZY/system/loadFile"
    };
  },
  methods: {
    success(res) {
      if (res.result === 0) {
        this.$Message.info("文件上传成功");
      } else if (res.result === -1) {
        this.$Message.error("文件上传失败");
      } else {
        this.$Message.error(
          "上传文件已过期或者已达到限额，请获取最新证书后上传"
        )
      }
    }
  }
};
</script>
<style scoped>
.authorize-container {
    margin-top: 50px;
}
</style>


