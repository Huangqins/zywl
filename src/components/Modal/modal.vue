<template>
  <div>
      <Modal v-model="modal" :title="title" :loading="loading" @on-ok="asyncOK">
        <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="115">
        <FormItem v-for="(item,index) in format" :key="index" :label="item.label" >
            <template v-if="item.type === 'input'">
                <Input  v-model="data[item.prop]"  :placeholder="item.placeholder"/>
            </template>
            <template v-if="item.type === 'texteara'">
                <Input  v-model="data[item.prop]"  :placeholder="item.placeholder"/>
            </template>
            <template v-if="item.type === 'select'">
                <Select  v-model="data[item.prop]"  :placeholder="item.placeholder">
                 <Option v-for="(item,index) in item.option" :key="index +'a'" :value="item.value">{{item.name}}</Option>
                 </Select>
            </template>
            <template v-if="item.type === 'datetime'"> 
                <DatePicker type="datetime" placeholder="请选择时间" v-model="data[item.prop]"></DatePicker>
            </template>
        </FormItem>
        </Form>
        <slot/>
      </Modal>
  </div>
</template>
<script>
export default {
  name: "modal",
  props: {
    title: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    format: {
      type: Array,
      default: () => {
        return [];
      }
    },
    option:{
      type: Array,
      default: () => {
        return [];
      }
    },
    ruleValidate: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      modal: false,
      loading: true
    };
  },
  methods: {
    asyncOK() {
      // 传递数据
      if (this.ruleValidate) {
        this.$refs.formValidate.validate((valid) => {
        })
      }
      this.$emit("asyncOK", this.data);
    },
    open() {
      this.modal = true;
    },
    close() {
      this.modal = false;
    }
  }
};
</script>
<style>
.ivu-modal-body .ivu-form .ivu-form-item-label {
  color: black;
}
</style>
