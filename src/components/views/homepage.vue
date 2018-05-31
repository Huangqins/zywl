<template>
  <div class="homepage">
    <section class="head">
      <mind></mind>
        <span class="smp" >
          <!-- <div id="dataNums"> </div> -->
          <countTo :startVal='startVal' :endVal='endVal' :duration='3000'></countTo>
          </span>
       <span></span>
    </section>
      <section class="secOne">
            <div class="Aipicture">
                 <!-- <span class="Aipicture_text">资源监控</span> -->                
                 <!-- <span style="display:block;width:100%;height:91px;margin-top:5px"><img src="../../assets/num.jpg"/></span> -->                
                 <section style="height:80px;text-align:center;">
                   <div style="width:20%;height:80px;float:left"><img src="../../assets/assest.png" style="width:100%"/></div>
                   <div style="height:50%;width:80%;font-size:24px;line-height:50px;float:right;">{{assetsTotal}}</div>
                   <div style="height:50%;width:80%;font-size:15px;line-height:40px;float:right">资产数量</div>
                 </section>
            </div>            
            <div class="attack">
                 <!-- <span class="Aipicture_text">攻击Pyload</span> -->
                 <span class="pictrue" >
                    <chart :option="options" height="218px"></chart>
                 </span>
            </div>
            <div class="asset">
                <!-- <span class="Aipicture_text">资产情况</span> -->
                <span class="pictrue">
                 <Table :columns="assets" :data="assetsData" :height="255" ></Table>
                </span>
            </div>              
      </section>
      <section class="secTwo">
            <div class="attackPic">
              <!-- <span style="background-color:#212636;font-size:20px;text-align:center;height:56px;line-height:56px;display:block;">攻击流向图</span> -->
               <chart :option="forceOptions" height="485px" id="force" width="100%"></chart>
            </div>            
            <div class="preload" >
               <!-- <span class="Aipicture_text">预载信息工具集</span> -->
               <Table :columns="taskData" :data="taskLists" :height="255" ></Table>      
             </div> 
      </section>
      <section class="secThree">
                  <section class="holeList" style="height:255px;">
                    <ul>
                        <li class="listOne">
                          <span class="holeHeader" style="font-family:sans-serif">漏洞排行</span>
                          <span class="holeHeader">漏洞名称</span>
                          <span class="holeHeader">漏洞数量</span>
                        </li>
                        <li v-for="(item,index) in holes" :key="index">
                        <span v-if="index===0"><img src="../../../static/top1.png" ></span>
                        <span v-else-if="index===1"><img src="../../../static/top2.png" ></span>
                        <span v-else-if="index===2"><img src="../../../static/top3.png"/></span>
                        <span v-else>{{index + 1}}</span>
                        <span>{{item.name}}</span>
                        <span>{{item.vuln_total}}</span>
                        </li>
                    </ul>
                  </section>
                    <!-- <Table :columns="assets" :data="assetsData" :height="200" ></Table> -->
               
                <section>
                    <!-- <span class="Aipicture_text">外部安全资源</span> -->
                    <chart :option="vulntypePic" width="600px" height="222px" id="vulnPic"></chart>
               </section>
                <section id="noheader">
                    <!-- <span class="Aipicture_text">主机风险情况</span> -->
                    <!-- <Table :columns="vulns" :data="vulnsData" :height="310" ></Table>   -->
                    <div class="vulnList" style="height:270px;" id="box">
                      <ul id="con1" ref="con1" :class="{anim:animate==true}">                       
                          <li v-for="(item,index) in vulnsData" :key="index">   
                            <span>{{item.vuln_name}}</span>                     
                          <span>{{item.vuln_ftime.time}}</span>                        
                          <span>{{item.vuln_level}}</span>
                          </li>
                      </ul>
                    </div>
                    <!-- <div id="box">
                      <ul id="con1" ref="con1" :class="{anim:animate==true}">
                        <li v-for='(item,index) in items' :key="index">{{item.name}}</li>
                      </ul>
                    </div> -->
                </section>
      </section>
  </div>
</template>

<script>
import $ from "jquery";
import mind from "./mind";
import countTo from 'vue-count-to';
import chart from "components/chart/chart";
import assetsInfo from "api/assetsInfo";
import { getUserName } from "@/utils/auth";
import leaksInfo from "api/leaksInfo";
import vulnTop from "api/vulnTop";
import vulntype from "api/vulntype";
import fomatterTime from "@/utils/tool";
import taskList from "api/taskList";
import assetTarget from "api/assetTarget";
import getSystemType from "api/getSystemType";
import "./homepage.js";
import _ from "lodash";
// import  "./scroll.js";
const taskstatus = {
  "-2": "失败",
  "1": "完成",
  "0": "进行中",
  "2": "待执行"
};
const levelSchema = {
  "4": "assets/4.png",
  "3": "assets/3.png",
  "2": "assets/2.png",
  "1": "assets/1.png",
  "0": "assets/0.png"
};
export default {
  components: {
    chart,
    mind,
    countTo
  },
  data() {
    return {
      animate:false,
      items:[  //消息列表对应的数组
        {name:"马云"},
        {name:"雷军"},
        {name:"王勤"}
      ],
      startVal: 0,
      endVal: 100,
      assetsTotal: 0,
      forceOptions: {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove"
        },
        series: {
          type: "sankey",
          layout: "none",
          lineStyle: {
            color: "#fff"
          },
          emphasis: {
            label: {
              show: true
            }
          },

          label: {
            color: "#fff"
          },
          data: [],
          links: []
        }
      },
      vulntypePic: {
        tooltip: {},
        // legend: {
        //   type: "scroll",
        //   orient: "vertical",
        //   right: 5,
        //   top: 20,
        //   bottom: 20,
        //   data: []
        // },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [1, 5]
            }
          },
          indicator: [{}],
          center: ["50%", "50%"]
        },
        series: [
          {
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: []
              }
            ]
          }
        ]
      },
      assets: [
        {
          title: "资产名称",
          key: "assets_name",
          width: 140,
          align: "center"
        },
        {
          title: "资产URL",
          key: "assets_url",
          align: "center"
        },
        {
          title: "风险总数",
          key: "vuln_total",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {style: {
                color: 'red',               
              }},
              params.row.vuln_total
            );
          }
        }
      ],
      assetsData: [],
      taskData: [
        {
          title: "任务名称",
          key: "target_name",
          align: "center"
        },
        {
          title: "任务状态",
          key: "target_struts",
          align: "center",
          width: 140,
          render: (h, params) => {
            return h("span", taskstatus[params.row.target_struts]);
          }
        },
        {
          title: "结束时间",
          key: "target_endtime",
          width: 160,
          align: "center",
          render: (h, params) => {
            return h("span",  params.row.target_endtime ? fomatterTime(new Date(params.row.target_endtime.time)) : '')
          }
        }
      ],
      taskLists: [],
      vulns: [
        {
          title: "风险发现时间",
          key: "vuln_ftime",
          width: 160,
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              fomatterTime(new Date(params.row.vuln_ftime.time))
            );
          }
        },
        {
          title: "风险名称",
          key: "vuln_name",
          align: "center"
        },
        {
          title: "风险等级",
          key: "vuln_level",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: require(`assets/${params.row.vuln_level}.png`),
                width: "48px",
                height: "6px"
              }
            });
          }
        }
      ],
      vulnsData: [],
      width: "576px",
      widths: 300,
      options: {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 5,
          top: 20,
          bottom: 20,
          data: [],
          textStyle: {
            color: "#fbfbfb"
          }
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["32%", "50%"],
            selectedMode: "single",
            data: [
              // { value: 335, name: "直接访问" },
              // { value: 310, name: "邮件营销" },
              // { value: 234, name: "联盟广告" },
              // { value: 135, name: "视频广告" },
              // { value: 1548, name: "搜索引擎" }
            ],
            label: {
              formatter: function(params) {
                return params.value;
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      defaultPage: {
        area: 1,
        rows: 10,
        page: 1,
        userName: getUserName()
      },
      //top10排行榜
      holes: []
    };
  },
  mounted() {
    setInterval(this.scroll,1000);
    this.assetsInfo(this.defaultPage);
    this.leaksInfo();
    this.vulntop();
    this.vulntype();
    this.taskList();
    this.assetTarget();
    this._getSystemType();
    $("#dataNums").rollNum({
      deVal: 682323
    });
     setInterval(() => {
        this.startVal = this.endVal;
        this.endVal = this.endVal + Math.floor(Math.random() * 10)
      },5000)
  },
  methods: {
    scroll(){
      let con1 = this.$refs.con1;
      con1.style.marginTop='-30px';
      this.animate=!this.animate;
      var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
      setTimeout(function(){
          that.items.push(that.items[0]);
          that.items.shift();
          con1.style.marginTop='0px';
          that.animate=!that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
      },500)
    },
    // 系统分类
    _getSystemType() {
      getSystemType({}).then(res => {
        this.options.legend.data = res.lists.map(item => {
          return item.assets_hostname ? item.assets_hostname : 'Unix'
        })
        this.options.series[0].data = res.lists.map(item => {
          return { value: item.assets_os_type, name: item.assets_hostname ? item.assets_hostname : 'Unix' }
        })
      })
    },
    //资产任务图
    assetTarget(params) {
      let param = getUserName();
      assetTarget({ username: param }).then(res => {
        let data = res.targets;
        let name = [];
        let links = [];
        let target_oper = data[0].target_oper; //用户
        let dataLength = data.length;
        let target_name = data.map(item => {
          //任务名称
          return {
            name: item.target_name,
            label: {
              show: dataLength > 10 ? false : true
            }
          };
        });
        let assets_name = data.map(item => {
          //资产名称
          return { name: item.assets_name ? item.assets_name : item.target_url, 
             itemStyle: {
              color: 'pink'
            }
           };
        });
        let target_endtime = data.map(item => {
          //任务
          return {
            name: item.target_endtime
              ? fomatterTime(new Date(item.target_endtime.time))
              : "未完成",
            label: {
              show: dataLength > 30 ? false : true
            },
            itemStyle: {
              color: item.target_endtime ? 'red' : '#ccc'
            }
          };
        });
        let assets_task = data.map(item => {
          return {
            source: item.assets_name ? item.assets_name : item.target_url,
            target: item.target_name,
            value: 2
          };
        });
        let task_status = data.map(item => {
          return {
            source: item.target_name,
            target: item.target_endtime
              ? fomatterTime(new Date(item.target_endtime.time))
              : "未完成",
            value: 2
          };
        });
        name.push({
          name: target_oper,
          itemStyle: {
            borderWidth: 10
          }
        });
        name = name.concat(assets_name, target_endtime, target_name);
        name = _.uniqBy(name, "name");
        this.forceOptions.series.data = name;
        let ret1 = assets_name.map(item => {
          return {
            source: target_oper,
            target: item.name,
            value: 3
          };
        });

        this.forceOptions.series.links = ret1.concat(assets_task, task_status);
        //  let ret1
      });
    },
    dereplication(arr, key) {
      var hash = {};
      return arr.reduce(function(item, next) {
        hash[next[name]] ? "" : (hash[next[name]] = true && item.push(next));
        return item;
      }, []);
    },
    //资产列表
    assetsInfo(params) {
      assetsInfo(params).then(res => {
        let data = res.rows;
        this.assetsTotal = res.total;
        if (data.length > 10) {
          this.assetsData = data.slice(0, 10);
        } else {
          this.assetsData = data;
        }
      });
    },
    //任务列表
    taskList(params) {
      this.pageLoading = true;
      taskList({ flag: 3 }).then(res => {
        let data = res.targets;
        if (data.length > 10) {
          this.taskLists = data.slice(0, 10);          
        } else {
          this.taskLists = data;
        }
      });
    },
    //风险列表
    leaksInfo() {
      let params = { userName: getUserName() };
      leaksInfo(params).then(res => {
        let data = res.rows;
        if (data.length > 10) {
          this.vulnsData = data.slice(0, 10);
          this.vulnsData.forEach(item => {
            item.vuln_ftime.time=fomatterTime(new Date(item.vuln_ftime.time))
          })
        } else {
          this.vulnsData = data;
        }
      });
    },
    //top10排行榜
    vulntop() {
      const params = {};
      vulnTop(params).then(res => {
        let data = res.lists;
        this.holes = data;
        let length = 10 - data.length;
        if (data.length < 10) {
          for (let i = 0; i < length ; i++) {
            this.holes.push({})
          }
        }
      });
    },
    //风险类型
    vulntype() {
      let params = { flag: 1 };
      // this.$refs.vulntypePic.showLoading();
      vulntype(params).then(res => {
        if (res.result === 0) {
          // this.$refs.vulntype.hideLoading();
          let list = res.list;
          let numList = [];
          this.vulntypePic.radar.indicator = [];
          numList = list.map(item => {
            return Number(item.kb_vuln_vnum);
          });
          list.forEach(item => {
            // this.vulntypePic.legend.data.push(item.vuln_type_name);
            this.vulntypePic.series[0].data[0].value.push(
              Number(item.kb_vuln_vnum)
            );
            this.vulntypePic.radar.indicator.push({
              max: Math.max.apply(null, numList),
              name: item.kb_vuln_class
            });
          });
        }
      });
    }
  }
};
</script>
<style scoped>

.head {
  width: 100%;
  position: relative;
}
.smp {
  width: 168px;
  height: 105px;
  display: inline-block;
  background: url("../../assets/polygon.png") no-repeat;
  background-size: contain;
  position: absolute;
  top: 3px;
  left: 133px;
  color: #b9babd;
  text-align: center;
  line-height: 26px;
  font-size: 40px;
}

.secOne {
  width: 27%;
  height: 100%;
  color: white;
  float: left;
  margin: 0px 0px 3px 0px;
  box-sizing: border-box;
}
.secTwo {
  width: 36%;
  height: 100%;
  color: white;
  float: left;
  margin: 0px 10px 3px 10px;
  box-sizing: border-box;
}
.attackPic {
  border: 1px solid #2b4e6f;
  height: 485px;
}
.preload {
  width: 100%;
  margin-top: 6px;
  border: 1px solid #2b4e6f;
}
.secThree {
  width: 34%;
  height: 100%;
  color: white;
  float: left;
  margin: 0px 0px 3px 0px;
  box-sizing: border-box;
}
.secThree section {
  border: 1px solid #2b4e6f;
  margin-bottom: 6px;
}
.secOne_left span {
  display: block;
}
.Aipicture {
  /* width: 480px; */
  height: 150px;
  border: 1px solid #2b4e6f;
  padding: 40px;
  margin: 0 0px 6px 0px;
}
.Aipicture_text {
  font-size: 18px;
}
.pictrue {
  display: block;
  width: 100%;
  margin-bottom: 6px;
}
.pictrue img {
  width: 100%;
  display: block;
  height: 255px;
}
.stylebook {
  /* width: 480px; */
  height: 91px;
  border: 1px solid #2b4e6f;
  padding: 8px;
  margin: 0 0px 10px 0px;
}
.attack {
  /* width: 480px; */
  height: 329px;
  border: 1px solid #2b4e6f;
  padding: 45px 0;
  margin: 0 0px 6px 0px;
}
.attack span {
  display: block;
}
.asset {
  /* height: 297px; */
  border: 1px solid #2b4e6f;
  margin: 0 0px 6px 0px;
}
/* top10排行榜样式 header*/
.secThree span {
  display: inline-block;
  height: 19px;
}
/* top10排行榜样式 end*/
.fl {
  float: left;
}
.fr {
  float: right;
}
.none {
  display: none;
}
.inrow {
  font-size: 0;
  font-size: 12px;
  font-family: arial;
  letter-spacing: -3px;
}
.inrow > li,
.inrow span {
  display: inline-block;
  display: inline;
  zoom: 1;
  font-size: 14px;
  letter-spacing: normal;
  word-spacing: normal;
}
.dataNums {
  display: block;
  width: 100%;
  height: 75px;
  margin-top: -37px;
  text-align: center;
}
.dataNums .dataOne {
  width: 61px;
  height: 75px;
  margin: 0px 3px;
  text-align: center;
}
.dataNums .dataBoc {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.dataNums .dataBoc .tt {
  width: 100%;
  height: 100%;
}
.dataNums .tt span {
  width: 100%;
  height: 100%;
  font: bold 54px/75px "Arial";
  color: #ddf0ff;
}
/* top10排行榜样式 header*/
#box{
  overflow: hidden;
  padding-left: 30px;
  border: 1px solid black;
  transition: all 0.5s;
}
.anim{
  transition: all 0.5s;
}
#con1 li{
  list-style: none;
  line-height: 30px;
  height: 30px;
}
 .vulnList {
    width: 100%;
    height: 100%;
  }
  .vulnList ul {
    width: 100%;
    height: auto;
  }
  .vulnList ul li {
    list-style: none;
    height: 23px;
    font-size: 12px;
    line-height: 23px;
  }
  .vulnList ul li:nth-child(12) {
    border: none;
  }
  .vulnList ul li span{
    text-align: center;
    color: #fbfbfb;
  }
  .vulnList ul li span:nth-child(1) {
    width: 53%;    
  }
  .vulnList ul li span:nth-child(2) {
    width: 35%; 
  }
  .vulnList ul li span:nth-child(3) {
    width: 10%; 
  }
</style>
