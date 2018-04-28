<template>
  <div class="whole">
      <div class="content">
            <div class="content-left dynamic">
                <section class="dynamicPic">
                  <router-view class="wordClouds" name="left"></router-view>
                  <div class="floor">
                      <span class="ring light"></span>
                      <span class="ring three">
                        <span class="spinnable"></span>
                      </span>
                      <span class="ring one">
                        <span class="spinnable"></span>
                      </span>
                      <span class="ring two">
                        <span class="spinnable"></span>
                      </span>
                  </div>
                </section>
            </div>
            <div class="content-center">
                <ul>
                    <!--<li class="brain"><router-link :to="{ path: '/taskexecution/process' , query: { target_id: this.target_id}}">任务执行</router-link></li>-->
                    <li class="brain"><router-link  to="/taskexecution/leaks">漏洞列表</router-link></li>
                    <li class="brain"><router-link  to="/taskexecution/assetsManage">资产风险分布</router-link></li>
                    <li class="brain"><router-link  to="/taskexecution/assetManagement">资产码头</router-link></li>
                    <li class="brain" ><router-link to="/taskexecution/assetSet">任务调度</router-link></li>
                    <li class="brain" ><router-link to="/taskexecution/kbinfo">知识库</router-link></li>
                    <!-- <li class="brain"><router-link to="/taskexecution/">报告信息管理</router-link></li>   -->
                </ul>
            </div>
            <div class="content-right">
                 <router-view :key="key"></router-view>
            </div>
      </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// import router from '@/router';
import chart from "components/chart/chart";
import cloud from "components/d3/wordCloud";
import zhexiantu from "components/chart/zhexiantu";
import { getUserName } from "@/utils/auth";
import taskTargetInfo from "api/taskTargetInfo";
import { Modal } from 'iview'
const isAssetOne = ({ assets_name, datetime }) => {
  return `欢迎使用智刃安全攻防平台,距您上次进行攻防测试已经过了XXX天XXX小时XXX分钟，建议进行测试的资产为${assets_name}`;
};
const isAssetTwo = () => {
  return `欢迎使用智刃安全攻防平台, 是否要进行安全测试？`;
};
// const isAssetTwo = () => {
//   return `欢迎使用智刃安全攻防平台,目前网络空间安全等级为XXX，安全情报监控显示，XXX资产暴露XXX问题，可能存在问题的资产有XXX。
//     是否要进行安全测试？`;
// };

export default {
  name: "taskexecution",
  components: {
    chart,
    cloud,
    zhexiantu
  },
  computed: {},
  mounted() {},
  created() {
    const params = { userName: this.userName, targetStruts: 0 };
    // this._taskTargetInfo(params);
  },
  watch: {
    '$route': (to, from) => {
      console.log(to)
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
      columns1: [
        {
          title: "漏洞名称",
          key: "name",
          align: "center"
        },
        {
          title: "类型",
          key: "type",
          align: "center"
        },
        {
          title: "风险等级",
          key: "riskRating",
          align: "center"
        },
        {
          title: "发现时间",
          key: "time",
          align: "center"
        },
        {
          title: "利用情况",
          key: "utilization",
          align: "center"
        }
      ],
      assetsList: [],
      option: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            radius: "85%",
            detail: { formatter: "{value}%", fontSize: 18 },
            data: [{ value: 50, name: "完成率" }],
            title: { color: "#fff", fontSize: 12 },
            axisLine: {
              lineStyle: {
                color: [[0.2, "#41C23C"], [0.8, "#FFCE44"], [1, "#DD4C40"]]
              }
            }
          }
        ]
      },
      holes: [
        {
          holeName: "XSS",
          holeNum: "12"
        },
        {
          holeName: "WEB",
          holeNum: "10"
        },
        {
          holeName: "CSRF",
          holeNum: "9"
        },
        {
          holeName: "CSRF",
          holeNum: "8"
        },
        {
          holeName: "CSRF",
          holeNum: "7"
        },
        {
          holeName: "CSRF",
          holeNum: "6"
        },
        {
          holeName: "CSRF",
          holeNum: "5"
        },
        {
          holeName: "CSRF",
          holeNum: "4"
        },
        {
          holeName: "CSRF",
          holeNum: "3"
        },
        {
          holeName: "CSRF",
          holeNum: "2"
        },
        {
          holeName: "CSRF",
          holeNum: "1"
        }
      ],
      optionHole: {
        title: {
          text: "漏洞等级",
          x: "center",
          textStyle: {
            color: "white"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["一级", "二级", "三级"],
          textStyle: {
            color: "white"
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "一级", itemStyle: { color: "#DD4F43" } },
              { value: 310, name: "二级", itemStyle: { color: "#FFCE43" } },
              { value: 234, name: "三级", itemStyle: { color: "#41C23C" } }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  },
  beforeRouteEnter: (to, from, next) => {
    if (from.fullPath === "/login") {
      console.log(to.params)
      Modal.confirm({
        title: `您好,${getUserName()}`,
        content: to.params.firstLogin === 1 ? isAssetOne(to.params.userTips) : isAssetTwo(),
        onOk: () => {
          if (to.params.firstLogin === 1) {
            next({path: '/taskexecution/assetSet'});
          } else {
            next("/assets/assetsManage");
          }
        },
        onCancel: () => {
          if (to.params.firstLogin === 0) {
            next("/taskhomepage");
          } else {
            next();
          }
        }
      });
    }
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    Modal.remove();
    next();
  },
  methods: {
    godetail() {},
    _taskTargetInfo(params) {
      taskTargetInfo(params).then(res => {
          if (res.result === 0) {
            this.target_id = res.targets[0].target_id
          }
        })
    },
    rowClassName(row, index) {
      return "demo-table-info-row";
    },
    gotaskadd(){
      this.$router.push({ path: '/assetSet' })
    }
  },
  computed: {
    ...mapGetters(["trueName"]),
    optipns() {
      setInterval(() => {
        this.option.series[0].data[0].value =
          (Math.random() * 100).toFixed(2) - 0;
      }, 2000);
      return this.option;
    }
  }
};
</script>
<style scoped>
.dynamicPic {
  display: block;
  margin: auto;
  position: relative;
  height: 470px;
}
.floor {
  position: absolute;
  margin: 0 0 -240px -200px;
  bottom: 0;
  left: 50%;
  height:240px;
  width: 320px;
  z-index: 1;
}
.floor .ring {
  margin: -150px 0 0 -150px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  transform: rotateX(70deg);
}
.floor .ring .spinnable {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  animation-name: ringspin;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
@keyframes ringspin {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.floor .ring.light {
  background: -webkit-radial-gradient(
    closest-side,
    rgba(60, 140, 180, 0.06),
    rgba(0, 0, 0, 0)
  );
  margin: -300px 0 0 -300px;
  height: 600px;
  width: 600px;
}
.floor .ring.three {
  margin: -250px 0 0 -250px;
  height: 500px;
  width: 500px;
  transition-duration: 1200ms;
}
.floor .ring.three .spinnable {
  background: url("../../assets/assetsfloor/1.png") no-repeat center center;
  background-size: 500px 500px;
  animation-duration: 28s;
  animation-direction: reverse;
}
.floor .ring.one .spinnable {
  background: url("../../assets/assetsfloor/0.png") no-repeat center center;
  background-size: 300px 300px;
  transition-duration: 1000ms;
}
.floor .ring.two {
  margin: -125px 0 0 -125px;
  height: 250px;
  width: 250px;
}
.floor .ring.two .spinnable {
  background: url("../../assets/assetsfloor/2.png") no-repeat center center;
  background-size: 250px 250px;
  animation-duration: 16s;
  animation-direction: reverse;
}
.content {
  width:100%;
  margin-top: 100px;
}
.content-left{
  width: 18%;
  float: left;
  margin-left: 100px;
}
.content-center{
  width: 20%;
  float: left;
}
.content-right{
  width: 62%;
  float: left;
}
.content div {
  padding: 10px;
}
.content ul li {
  list-style-type: none;
  text-align: center;
}
/*.content ul li a {*/
  /*height: 15%;*/
  /*display: block;*/
  /*padding: 14px 18px 14px 24px;*/
  /*border-left: 2px solid #18252f;*/
  /*color: #e4e5e5;*/
/*}*/
.content ul li a:hover {
  color: #148ec5;
}
.content ul li span {
  display: block;
  height:75px;
  line-height: 75px;
  text-align: center;
  color: #e4e5e5;
  border-left: 2px solid #18252f;
}
.content ul li span:hover{
  color: #148ec5;
}
/*.content ul li a:focus {*/
  /*border-left: 2px solid #203a46;*/
  /*color: #148ec5;*/
/*}*/
.content-center {
  width: auto;
  z-index: 2;
}
.content-center ul {
  display: block;
  height: 500px;
  width: 150px;
  margin-top: 16px;
}
.content-center li.brain {
  margin-top: 10px;
  font-size: 15px;
  line-height: 50px;
}
.content-center ul li {
}
.content-right ul li {
  float: left;
}
.ivu-table .demo-table-info-row td {
  background-color: rgba(18, 62, 101);
  color: #fff;
}
/* top10排行榜 */
.holeList {
  width: 100%;
  height: 100%;
}
.holeList ul {
  width: 100%;
  height: auto;
  border: 1px solid #3c9dc7;
}
.holeList ul li {
  list-style-type: none;
  height: 23px;
  font-size: 12px;
  line-height: 23px;
  border-bottom: 1px solid #3c9dc7;
}
.holeList ul li:nth-child(12) {
  border: none;
}
.listOne {
  display: inline-block;
  width: 100%;
}
.holeList ul li span {
  width: 30%;
  text-align: center;
}
.holeList ul li span img {
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
}
.holeHeader {
  font-size: 14px;
  font-weight: bold;
}
.whole {
  position: relative;
}
.card {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
