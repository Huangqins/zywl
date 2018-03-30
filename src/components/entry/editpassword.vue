<template>
  <div>
      <div class="welcome">
        <Form :model="formItem" :label-width="80"  ref="formItem">
            <FormItem label="旧密码" prop="password">
                <Input v-model="formItem.password" type="password" placeholder="请输入密码"/>
            </FormItem>
            <FormItem label="新密码" prop="newPassword">
                <Input v-model="formItem.newPassword" type="password" placeholder="请输入密码"/>
            </FormItem>
            <FormItem >
                <Button type="primary" @click="save">保存</Button>
            </FormItem>
        </Form>
      </div>
  </div>
</template>
<script>
export default {
    name:'editpassword',
  data(){
      return{
          formItem:{
              password:'',
          newPassword:''
          }
          

      }
  },
  methods:{
      save(){

      }
  }

}
</script>
<style>
.welcome {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 410px;
  height: 600px;
  transform: translate3d(-50%, -50%, 0);
}
</style>
