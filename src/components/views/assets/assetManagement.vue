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
                  <page :columns="assets" :data="assetsList" :dataTotal="total" @dataLoad="dataLoad" :loading="loading"> 

                  </page>
              </div>
          </section>
      </div>
      <Modals :format="format" :data="data" :title="title" ref="formValidate" :rules="rules" @asyncOK="asyncOK" :display="display"  :loading="loading"></Modals>
  </div>
</template>
<script>
import Modals from "components/Modal/modal";
import page from "components/page/page";
import assetAdd from "api/assetAdd";
import { mapGetters } from "vuex";
import message from "utils/message";
import assetsInfo from "api/assetsInfo";
import assetsDel from "api/assetsDel";
import updateAssets from "api/updateAssets";
export default {
  components: {
    page,
    Modals
  },
  data() {
    return {
      total: 0,
      loading: false,
      title: "新建",
      formValidate: false,
      format: [
        { label: "资产名称", type: "input", prop: "assets_name" },
        { label: "HTTP_URL_地址", type: "input", prop: "assets_url" },
        { label: "ip", type: "input", prop: "assets_ip" },
        { label: "负责人", type: "input", prop: "assets_manger" }
      ],
      data: {
        assets_name: "",
        assets_url: "",
        assets_ip: "",
        assets_manger: ""
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
                      this.data = Object.assign({}, this.data, params.row);
                      // 打开
                      this.$refs.formValidate.open();
                      // 调用修改方法
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
                      this.assetDel(params.row);
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
      assetsList: [],
      defaultPage: {
        area: 0,
        rows: 10,
        page: 1
      }
    };
  },
  computed: {
    ...mapGetters(["userName"])
  },
  created() {
    const params = Object.assign({}, this.defaultPage);
    this._assetsInfo(params);
  },
  methods: {
    // modalOpen() {
    //   this.display = true
    // },
    _assetsInfo(params) {
      assetsInfo(params).then(res => {
        this.loading = true;
        if (res.result === 0) {
          this.loading = false;
          this.assetsList = res.rows;
          this.total = res.total;
        }
      });
    },
    dataLoad(paramsObj) {
      const params = Object.assign({}, this.defaultPage, paramsObj, {
        area: 0
      });
      this._assetsInfo(params);
    },
    assetsAdd() {
      this.$refs.formValidate.open();
      this.data = {};
    },
    //提交
    asyncOK(data) {
      if (!data.assets_id) {
        assetAdd(data).then(res => {
          if (res.result === 0) {
            this.$refs.formValidate.close();
            
          } else {
            this.$refs.formValidate.open();
          }
        });
      } else {
        this.update(data)
      }
      this.data.assets_creatuser = this.userName;
      //  console.log(data)
    },

    //删除
    assetDel(params) {
      assetsDel(params).then(res => {
        console.log(res);
      });
    },
    //修改
    update(data) {
      updateAssets(data).then(res => {
        console.log(res);
      });
    }
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
