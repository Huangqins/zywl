<template>
  <div>
      <Modal v-model="modal" :title="title" :loading="loading" @on-ok="asyncOK">
        <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="80">
        <!-- <FormItem :label="Name" >
            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem> -->
        <FormItem v-for="(item,index) in format" :key="index" :label="item.label">
            <template v-if="item.type === 'input'">
                <Input  v-model="data[item.prop]"  :placeholder="item.placeholder"/>
            </template>
        </FormItem>
        </Form>
      </Modal>
  </div>
</template>
<script>
export default {
  name: "modal",
  props: {
    modal: {
      type: Boolean,
      default: false
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
            return {}
        }
    },
    format: {
        type: Array,
        default: () => {
            return []
        }
    }
  },
  data() {
    return {};
  },
  methods: {
    asyncOK() {}
  }
};
</script>
<style scoped>

</style>
