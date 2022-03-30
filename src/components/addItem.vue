<template>
  <div class="formContent">
    <van-form @submit="onSubmit">
      <van-field
        v-model="content"
        name="item"
        label="内容"
        placeholder="要完成的事情"
        :rules="[{ required: true, message: '请填写想要做的事情哦！' }]"
      ></van-field>
      <van-field
        readonly
        clickable
        name="date"
        :value="value"
        label="日期"
        placeholder="点击选择日期"
        @click="showCalendar = true"
      />
      <van-calendar v-model="showCalendar" color="#07c160" @confirm="onConfirm" />
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Calendar,Button } from "vant";
export default {
  props:["listItem"],
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Calendar.name]: Calendar,
    [Button.name]:Button
  },
  data() {
    return {
      content: "",
      value: "",
      showCalendar: false,
    };
  },
  created(){
    this.init()
  },
  methods: {
    init(){
      this.content=""
      this.value=""
      if(this.listItem.id){
        this.content=this.listItem.item
        this.value=this.listItem.date
      }
    },
    onSubmit(values) {
      if(this.listItem.id){
        values.id = this.listItem.id
        this.$emit("update",values)
      }else{
        this.$emit("submit",values)
      }
      
    },
    onConfirm(date) {
      this.value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      this.showCalendar = false;
    },
  },
};
</script>

<style lang='scss' scoped>
  .formContent{
    margin-top: 30px;
  }
</style>