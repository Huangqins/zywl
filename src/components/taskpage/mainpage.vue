<template>
   <div class="layout">
        <Layout >
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="48" v-model="isCollapsed" style="background:transparent; min-width:48px;  max-width: 103px;">
                <span class="log"><img src="../../assets/60.png" alt=""></span>                      
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">            
                    <router-link to="/mainpage/homepage">
                        <MenuItem name="1-1">
                            <Icon type="ios-home"></Icon>
                            <span>首页</span>
                        </MenuItem>
                    </router-link>
                    <router-link to="/mainpage/assetSet">
                        <MenuItem name="1-2">
                            <Icon type="android-radio-button-on" ></Icon>
                            <span>任务调度</span>
                        </MenuItem>
                    </router-link>
                    <router-link  to="/mainpage/assetManagement">
                        <MenuItem name="1-5">
                            <Icon type="ios-list-outline"></Icon>
                            <span>资产码头</span>
                        </MenuItem>
                    </router-link>
                    <router-link  to="/mainpage/assetsManage">
                        <MenuItem name="1-4">
                            <Icon type="podium"></Icon>
                            <span>风险态势</span>
                        </MenuItem>
                    </router-link>
                    <router-link  to="/mainpage/leaks">
                        <MenuItem name="1-3">
                            <Icon type="bug"></Icon>
                            <span>风险详情</span>
                        </MenuItem>
                    </router-link>                  
                    
                    <router-link to="/mainpage/kbinfo">
                        <MenuItem name="1-6">
                            <Icon type="social-dropbox"></Icon>
                            <span>知识管理</span>        
                        </MenuItem>
                    </router-link>
                    <router-link to="/mainpage">
                        <MenuItem name="1-7">
                            <Icon type="settings"></Icon>
                            <span>系统管理</span>        
                        </MenuItem>
                    </router-link>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0,background:''}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '10px 10px 0',color:'white',float:'left'}" type="navicon-round" size="20"></Icon>
                    <div class="headers">
                        <span style="color:#fff;font-size:14px;">您好:<span style="color:white">{{userName}}</span>
                        <span ></span>
                        </span>
                        <Button type="ghost" shape="circle" icon="power" style="border: none" @click="loginOut"></Button>
                    </div>
                </Header>
                <Content :style="{  minHeight: '946px'}">
                    <router-view :key="key"></router-view> 
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import router from "@/router";
import chart from "components/chart/chart";
import zhexiantu from "components/chart/zhexiantu";
import { removeToken, removeUserName, getUserName } from "@/utils/auth";
import taskTargetInfo from "api/taskTargetInfo";
import taskList from "api/taskList";
import { Modal } from "iview";
const state_one = ({ assets_name, datetime }) => {
  return `欢迎使用智刃安全攻防平台,距您上次进行攻防测试已经过了XXX天XXX小时XXX分钟，建议进行测试的资产为${assets_name}`;
};
const state_two = () => {
  return `欢迎使用智刃安全攻防平台, 是否要进行安全测试？`;
};

// const isTask = () => {
//
//     return `您目前尚无正在执行的任务，请添加任务`;
//
// };

// const isAssetTwo = () => {
//   return `欢迎使用智刃安全攻防平台,目前网络空间安全等级为XXX，安全情报监控显示，XXX资产暴露XXX问题，可能存在问题的资产有XXX。
//     是否要进行安全测试？`;
// };

export default {
  name: "taskexecution",
  components: {
    chart,
    zhexiantu
  },
  created() {
    const params = { userName: this.userName, targetStruts: 0 };
    // this._taskTargetInfo(params);
  },
  watch: {
    $route: (to, from) => {
    }
  },
  data() {
    return {
      key: Date.now(),
      //查询的任务id.
      target_id: 0,
      // 当前用户下任务信息
      taskID: 0,
      //资产列表
      loading: false,
      isCollapsed: false
    };
  },
  beforeRouteEnter: (to, from, next) => {
    if (from.fullPath === "/login") {    
      const userInfo = to.params;
      console.log(userInfo);
      //是否第一次登陆,否
      if (userInfo.firstLogin === 1) {
        //  判断任务是否结束
        if (userInfo.userTips.dateTime === 0) {
          //  任务未结束,提示未完成任务，跳转到任务执行页
          taskList({ userName: getUserName() }).then(res => {
            if (res.result === 0) {
              let taskId = res.targets[0].target_id;
              let taskName = res.targets[0].target_name;
              Modal.success({
                title: `您好,${getUserName()}`,
                content: `您好，您当前有未执行完毕的任务:${taskName},即将进入任务执行页`,
                loading: true,
                onOk: () => {
                  setTimeout(() => {
                    Modal.remove();
                    router.push({
                      // path: "/mainpage/process",
                      // query: { target_id: taskId }
                      name: 'process',
                      params: { target_id:  taskId,  targetInfo:  res.targets[0]}
                    });      
                  }, 2000);
                }
              });
            }
          });
          //  需要查询任务id
        } else {
          //  任务结束，提示任务已结束多久，建议需要进行监测的资产。使用userInfo
          Modal.confirm({
            title: `您好, ${getUserName()}`,
            content: state_one(userInfo.userTips),
            onOk: () => {
              //跳转任务列表
              next({ path: "/mainpage/assetSet" });
            },
            onCancel: () => {
              next("/taskhomepage");
            }
          });
        }
      } else {
        //  当日第一次登陆
        if (userInfo.userTips.dateTime === 0) {
          //  任务未结束,提示未完成任务，跳转到任务执行页
          //  任务未结束,提示未完成任务，跳转到任务执行页
          //  需要查询任务id
          taskList({ userName: getUserName() }).then(res => {
            if (res.result === 0) {
              let taskId = res.targets[0].target_id;
              router.push({
               name: 'process',
               params: { target_id:  taskId,  targetInfo:  res.targets[0]}
              });
            }
          });
        } else {
          //  任务结束,是否进行安全监测
          Modal.confirm({
            title: `您好,${getUserName()}`,
            content: state_two(),
            onOk: () => {
              //  跳转安全监测页面(尚无,用任务列表页代替)
              next({ path: "/mainpage/assetSet" });
            },
            onCancel: () => {
              next("/taskhomepage");
            }
          });
        }
      }
    }
    next();
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    loginOut() {
      this.$store.commit("REMOVE_TOKEN");
      removeToken();
      removeUserName();
      this.$router.push({ path: "/login" });
    },
    _taskTargetInfo(params) {
      taskTargetInfo(params).then(res => {
        if (res.result === 0) {
          this.target_id = res.targets[0].target_id;
        }
      });
    },
    rowClassName(row, index) {
      return "demo-table-info-row";
    },
    gotaskadd() {
      this.$router.push({ path: "/assetSet" });
    }
  },
  computed: {
    ...mapGetters(["userName"]),
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  }
};
</script>
<style scoped>
.log{
    display: block;
    width: 60px;
    height: 60px;
    margin-left: -8px;
}
.ivu-layout{
    background:transparent;
}
.ivu-menu-item>i{
    margin-right:0px;
}
    .ivu-layout-header{
        height: 30px;
        line-height: 30px;
       background: transparent;
    }
    .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
        padding:14px 14px 14px 10px;
    }

    .layout{
        /* border: 1px solid #d7dde4; */
        /* background: #f5f7f9; */
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    /* .layout span{
      color: #FBFBFB;
    } */
    .ivu-layout-sider{
        max-width: 99px;
    }
    .layout-header-bar{
        /* background: #fff; */
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        /* background: #5b6270; */
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .ivu-menu-dark{
        background:transparent;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        /* width: 69px; */
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .headers {
        width: 100%;
        /* background-color: rgba(65, 67, 79); */
        height: 36px;
        line-height: 36px;
        text-align: right;
        padding-right: 20px;
        letter-spacing: 2px;
        margin-bottom: 10px;
        }
        .headers h2{
        float: left;
        color:#FBFBFB;
        margin-left: 15px;
        font-size: 16px;
        font-family: "微软雅黑"
        }
        .router-link-active{
        display: inline ;
        border-left: none;
        color: #FBFBFB;
    }
</style>
