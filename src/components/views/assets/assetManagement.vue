<template>
  <div>
      <div class="whole">
          <section class="assetLeft">
              <span>资产信息维护</span>
          </section>
          <section class="assetRight">
              <div class="assetRight_header">
                <Input v-model="value" placeholder="区域" clearable style="width: 200px"></Input>
                <Button type="primary" icon="ios-search">搜索</Button>
                <Button type="primary" icon="compose" @click="assetsAdd">添加</Button>
                <Button type="primary" icon="log-in">导入</Button>
                <Button type="primary" icon="log-out">导出</Button>
              </div>
              <div class="assetRight_content">
                  <page :columns="assets" :data="assetsList">

                  </page>
              </div>
          </section>
      </div>
      <Modals :format="format" :data="data" :title="title" ref="formValidate" :rules="rules" @submit="asyncok" :display="display"></Modals>
  </div>
</template>
<script>
import Modals from "components/Modal/modal";
import page from "components/page/page";
import assetAdd from "api/assetAdd";
import { mapGetters } from "vuex";
import message from "utils/message";
export default {
  components: {
    page,
    Modals
  },
  data() {
    return {
      title: "新建",
      formValidate: false,
      format: [
        { label: "资产名称", type: "input", prop: "assets_name" },
        { label: "HTTP_URL_地址", type: "input", prop: "assets_url" },
        { label: "ip", type: "input", prop: "assets_ip" },
        // {label:'通讯协议',type:"input"},
        // {label:'开放服务信息',type:"input"},
        // {label:'所属区域',type:"input"},
        // {label:'资产类型',type:"input"},
        // {label:'资产重要度',type:"input"},
        // {label:'OS类型',type:"input"},
        { label: "负责人", type: "input", prop: "assetsManger" }
      ],
      data: {
        assets_name: "",
        assets_url: "",
        assets_ip: "",
        // assetsPort: "" ,
        // assetsProto: "",
        // assetsServers: "" ,
        // assetsRegion: "",
        // assetsType: "" ,
        // assetsImportant: "",
        //assetsOS: "" ,
        assetsManger: ""
        // assetsCreatUser:''
      },
      rules: {
        assetsName: [
          {
            required: true,
            message: "请填写资产名",
            trigger: "blur"
          }
        ]
      },
      value: "",
      assets: [
        {
          title: "资产名称",
          key: "assets_name",
          align: "center"
        },
        {
          title: "ip",
          key: "assets_ip",
          align: "center"
        },
        {
          title: "url",
          key: "assets_url",
          align: "center"
        },
        {
          title: "端口",
          key: "assets_network_ports",
          align: "center"
        },
        {
          title: "系统类型",
          key: "assets_os_type",
          align: "center"
        },
        {
          title: "资产重要度",
          key: "assets_important",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      // this.edit(params.index);
                      this.data = Object.assign({}, this.data, params.row);
                      console.log(params.row);
                      this.modalOpen();
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      // this.remove(params.index);
                      // console.log(params)
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      display: false,
      assetsList: [
        {
          assets_name: "John Brown",
          assets_ip: 18,
          assets_url: "www",
          assets_os_type: "New York No. 1 Lake Park"
        },
        {
          assets_name: "Jim Green",
          assets_ip: 24,
          assets_url: "www1",
          assets_os_type: "London No. 1 Lake Park"
        },
        {
          assets_name: "Joe Black",
          assets_ip: 30,
          assets_url: "www2",
          assets_os_type: "Sydney No. 1 Lake Park"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["userName"])
  },
  methods: {
    modalOpen() {
      this.display = true
    },
    assetsAdd() {
      this.modalOpen()
     
      // this.$refs.formValidate.displayToggle();
      // this.$refs.formValidate.submit()
      // this.format.assetsCreatUser = this.userName;
      // assetAdd(this.format).then(res => {
      //   if (res.result === 0) {
      //     message("success", "添加资产成功");

      //   } else if (res.result === -1) {
      //     message("error", "添加资产失败");
      //   } else if (res.result === 2) {
      //     message("error", "添加资产重复");
      //   }
      // });
    },
    //提交
    asyncok(data) {
      console.log(data);
    
         this.modalOpen()
      
    },
    //删除
    remove() {},
    //修改
    edit() {}
  }
};
</script>
<style scoped>
.whole {
  width: 100%;
}
.assetLeft {
  width: 20%;
  float: left;
}
.assetLeft span {
  display: inline-block;
  width: 100%;
  height: 45px;
  background: rgba(25, 38, 48);
  text-align: center;
  line-height: 45px;
  font-size: 17px;
}
.assetRight {
  float: left;
  width: 80%;
  height: auto;
}
.assetRight_header {
  width: 100%;
  height: 100px;
  padding: 25px;
  margin-top: 20px;
  background: rgba(25, 38, 48);
}
.ivu-btn .ivu-btn-primary {
  margin-left: 5px;
}
</style>
