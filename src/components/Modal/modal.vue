<template>
  <div>
      <Modal v-model="modal" :title="title"  @on-ok="asyncOK" @on-visible-change="visiblely">
        <Form ref="form" :model="data" :rules="ruleValidate" :label-width="width">
        <FormItem v-for="(item,index) in format" :key="index" :label="item.label"  :prop="item.prop">
            <template v-if="item.type === 'input'">
                <Input  v-model="data[item.prop]"  :placeholder="item.placeholder"/>
            </template>
            <template v-if="item.type === 'texteara'">
                <Input  v-model="data[item.prop]"  :placeholder="item.placeholder" />
            </template>
            <template v-if="item.type === 'select'">
                <Select  v-model="data[item.prop]"  :placeholder="item.placeholder" >
                 <Option v-for="(item,index) in item.option" :key="index +'a'" :value="item.value">{{item.name}}</Option>
                 </Select>
            </template>
            <template v-if="item.type === 'datetime'"> 
                <DatePicker type="datetime" placeholder="请选择时间" v-model="data[item.prop]" ></DatePicker>
            </template>
        </FormItem>
        </Form>
        <slot/>
        <div slot="footer" class="modalButton">
           <Button type="error" size="large"   @click="resetOK">重置</Button>
           <Button type="primary" size="large"   @click="asyncOK"  :loading="loading">确定</Button>
        </div>
      </Modal>
  </div>
</template>
<script>
export default {
  name: "modal",
  props: {
    width:{
      type: Number,
      default: 75
    },
    loading: {
      type: Boolean,
      default: false
    },
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
    option: {
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
      modal: false
    };
  },
  methods: {
    visiblely(state) {
      if (!state) {
        this.resetOK()
      }
    },
    asyncOK() {
      // 传递数据
      console.log(this.$refs);
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("asyncOK", this.data);
        }
      });
    },
    open() {
      this.modal = true;
    },
    close() {
      this.resetOK()
      this.modal = false;
    },
    resetOK() {
       this.$refs.form.resetFields();
    }
  }
};
</script>
<style>
.modalButton {
  display: flex;
  justify-content: space-between;
}
</style>
