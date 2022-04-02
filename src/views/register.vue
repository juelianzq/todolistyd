<template>
  <div class="content">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="form.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="form.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="form.passwordProtect.text"
          is-link
          readonly
          label="密保"
          placeholder="请选择密保问题"
          @click="showPicker = true"
        />
        <van-field
          v-model="form.answer"
          type="password"
          name="密保答案"
          label="密保答案"
          placeholder="请输入密保答案"
        />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
      <div class="backLogin">
        <span @click="backLogin"><去登录</span>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Calendar, Button, CellGroup, Popup, Picker } from "vant";
export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Calendar.name]: Calendar,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
  },
  data() {
    return {
      showPicker: false,
      columns: [
        { text: "请输入你的手机号", value: 1 },
        { text: "请输入你的名字", value: 2 },
      ],
      form: {
        username: "",
        password: "",
        passwordProtect: "",
        answer: "",
      },
    };
  },
  methods: {
    onSubmit() {},
    backLogin() {
      this.$router.push({ path: "/login" });
    },
    onConfirm(value) {
      this.form.passwordProtect = value;
      this.showPicker = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  background: url("@/assets/image/register.jpg");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  ::v-deep {
    .van-form {
      .van-cell-group {
        opacity: 0.7;
      }
      .van-cell {
        border-bottom: 1px solid #ccc;
        .van-field__label {
          color: #101214;
        }
      }
    }
  }
  .backLogin{
    text-align: right;
    padding-right: 50px;
    color: #027620;
    font-size: 20px;
    font-weight: 500;
  }
}
</style>