<template>
<div>
 <Table border :columns="columns" :data="data"  :loading="loading" ></Table>
  <Page :total="dataTotal" size="small" :current="current" :placement="placement"  :page-size-opts="pageSizeOpts" show-total  show-sizer 
  @on-change="onPageChange" @on-page-size-change="onChangehandle" ></Page>
  </div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    dataTotal: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 1
    },
    pageSizeOpts: {
      type: Array,
      default: () => {
        return [10, 20, 50, 100];
      }
    },
    placement: {
      type: String,
      default: "bottom"
    }
  },
  data() {
    return {
      //   dataTotal: ""
      pageSize: 1,
      pageNum: 10,
      status: false
    };
  },
  methods: {
    onPageChange(pageSize) {
        this.pageSize = pageSize;
        //  console.log(pageSize,'页码');
        // if ( pageSize > 1) {
        //       console.log(pageSize,'页码');
        // } else {
        //     return 
        // }
        // if (this.status && pageSize > 1) {
        //     return
        // } else  {
        //     console.log(pageSize,'页码');
        // } 
         console.log(this.status)
    

        // this.$emit('dataLoad', {page: pageSize, rows: this.pageNum})
    },
    onChangehandle(pageNum) {
    //   console.log(pageNum,'条数');
    //   console.log(this.pageNum === pageNum)
      this.status = this.pageNum === pageNum ? true : false
    //  console.log('改变,新发送1')
      //
      this.pageNum = pageNum;
      
    }
  }
};
</script>
<style scoped>

</style>
