<template>
  <div>
      <div class="whole">
          <section class="assetLeft">
              <span>资产信息维护</span>
          </section>
          <section class="assetRight">
              <div class="assetRight_header">
                
                <Input v-model="value14" placeholder="区域" clearable style="width: 200px"></Input>
                <Button type="primary" icon="ios-search">搜索</Button>
                <Button type="primary" icon="compose" @click="assetsAdd()">添加</Button>
                <Button type="primary" icon="log-in">导入</Button>
                <Button type="primary" icon="log-out">导出</Button>
              </div>
              <div class="assetRight_content">
                  <page :columns="assets" :data="assetsList"></page>
              </div>
          </section>
      </div>
  </div>
</template>
<script>
import page from "components/page/page";
export default {
  components: {
    page
  },
  data() {
    return {
      value14: "",
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
          title: "端口",
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
                      this.edit(params.index);
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
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      assetsList: [
        {
          assets_name: "John Brown",
          assets_ip: 18,
          assets_os_type: "New York No. 1 Lake Park"
        },
        {
          assets_name: "Jim Green",
          assets_ip: 24,
          assets_os_type: "London No. 1 Lake Park"
        },
        {
          assets_name: "Joe Black",
          assets_ip: 30,
          assets_os_type: "Sydney No. 1 Lake Park"
        }
      ]
    };
  },
  methods: {
    assetsAdd() {},
    remove() {},
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
