<template>

      <div style="padding:20px;">
          <!-- 老版本 -->
        <!-- <Card :bordered="false" >
            <p slot="title" style="font-size:16px;"><Icon type="grid" style="margin-right:5px;font-size:18px;"></Icon>API管理</p>           
                <div style="padding:20px;">
                    <Card :bordered="false" >
                        <p slot="title">查询条件</p>              
                        <Form :model="formItem" :label-width="80">
                            <FormItem label="账号">
                            <Input v-model="formItem.input" placeholder="" style="width:300px;"></Input>
                            <Button type="primary" icon="ios-search">搜索</Button>
                            <Button type="primary" >待定</Button>
                            </FormItem> 
                        </Form>
                
                    </Card>
                </div>
                <div style="padding:20px;">
                    <Card :bordered="false" >                       
                        <Table height="400" :columns="columns1" :data="data2"></Table>
                
                    </Card>
                </div>
        </Card> -->
        <!-- 新版本 -->
         <section class="box_report">
            <Input v-model="value1" size="large" placeholder="" style="width:200px"></Input>
            <Button type="primary" >搜索</Button>
            <Button type="primary" >生成</Button>
            <Button type="primary" >删除</Button>
        </section>
        <section class="box_report">
            <h3 style="color:white">管理列表</h3>
             <div class="assetRight_content">
                  <page :columns="columns1" :data="data2"  :loading="pageLoading" height="400" width="100%"></page>
              </div>
        </section>

    </div>

</template>
<script>
import page from "components/page/page";
export default {
    components:{
        page
    },
  data(){
    return{
        pageLoading:false,
        value1:'',
        formItem:{
            input:''
        },
        columns1: [
                    {
                    type: "selection",
                    width: 60,
                    align: "center"
                    },
                    {
                        title: '接口名称',
                        key: 'name',
                        align:'center'
                    },
                    {
                        title: 'public key',
                        key: 'age',
                        align:'center'
                    },
                    {
                        title: '生成时间',
                        key: 'address',
                        align:'center'
                    },
                    {
                        title: '失效时间',
                        key: 'address',
                        align:'center'
                    },
                    {
                        title: "操作",
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                            h("Button", {
                                props: {
                                type: "primary",
                                size: "small",                              
                                icon: "edit"
                                },
                                style: {
                                marginRight: "5px"
                                },
                                on: {
                                click: () => {
                                    this.data = Object.assign({}, this.data, params.row);
                                    // 打开
                                    // (this.footer = true), (this.modalStatus = 0);
                                    // this.$refs.formValidate.open();
                                }
                                }
                            },),
                            h("Button", {
                                props: {
                                type: "error",
                                size: "small",
                                icon: "trash-a"
                                },
                                style: {
                                marginLeft: "5px"
                                },
                                on: {
                                click: () => {
                                    this.remove({ assets_id: params.row.assets_id });
                                }
                                }
                            })
                            ]);
                        }
                    }
                ],
                data2: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
     
    }
  }
}
</script>

<style lang="scss" scoped>
.box_report {
    background: rgba(255, 255, 255, 0.1);
    margin: 10px 20px;
    width: 100%;
    padding: 10px;
}
</style>
