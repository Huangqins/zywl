<template>
  <div class="logs">
    <div style="padding:20px;">
        <Card :bordered="false" >
              <p slot="title">查询条件</p>
              
                  <Form :model="formItem" :label-width="80">
                <FormItem label="账号">
                 <Input v-model="formItem.input" placeholder="" style="width:300px;"></Input>
                  <Button type="primary" icon="ios-search">搜索</Button>
                </FormItem> 
                </Form>
       
        </Card>
    </div>
    <div style="padding:20px;">
        <Card :bordered="false" >
              <p slot="title">登陆日志列表</p>              
              <Table height="400" :columns="columns1" :data="data2"></Table>
       
        </Card>
    </div>
        
    
  </div>
</template>
<script>
export default {
  data(){
    return{
      formItem:{
         input:''
      },
       columns1: [
                    {
                        title: '账号',
                        key: 'name',
                        align:'center'
                    },
                    {
                        title: '登陆状态',
                        key: 'age',
                        align:'center'
                    },
                    {
                        title: '时间',
                        key: 'address',
                        align:'center'
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

