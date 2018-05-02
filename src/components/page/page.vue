<template>
<div class="pageTable">
 <Table  :columns="columns" :data="data"  :loading="loading" :height="tableHeight" @on-row-click="rowClick">

 </Table>
  <Page :total="dataTotal" size="small" :current="current" :placement="placement"  :page-size-opts="pageSizeOpts" show-total  show-sizer
  @on-change="onPageChange" @on-page-size-change="onChangehandle" show-elevator></Page>
  </div>
</template>
<script>
export default {
  computed: {
    tableHeight() {
      if (this.data.length === 0) {
        return 0
      }else if (this.data.length >= 10) {
        return +this.height
      }else {
        return 28 * (this.data.length + 1)
      }
    }
  },
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
    },
    height: {
      type: [Number,String],
      default: 308
    }
  },
  data() {
    return {
      pageSize: 1,
      pageNum: 10
    };
  },
  methods: {
    onPageChange(pageSize) {
      if (pageSize > 1) {
        this.$emit("dataLoad", { page: pageSize, rows: this.pageNum });
      } else {
        this.pageSize = pageSize;
        // console.log( { page: this.pageSize, rows: this.pageNum })
        this.$emit("dataLoad", { page: this.pageSize, rows: this.pageNum });
      }
    },
    onChangehandle(pageNum) {
      this.pageNum = pageNum;
      this.$emit("dataLoad", { page: this.pageSize, rows:  pageNum });
    },
    rowClick(row, index) {
      const data = { row, index }
      if (this.$parent.rowClick) {
        this.$emit('rowClick', data)
      } else {
        console.warn('请配置单行点击事件rowClick!')
      }
    }
  }
};
</script>
<style >


</style>
