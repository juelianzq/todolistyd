<template>
  <div class="content">
    <div class="container">
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
        </van-cell-group>
        <div style="margin: 16px" class="loginBtn">
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
      <div class="registerBtn">
        <van-button round block color="#e5bf99" @click="register()">
          注册
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, Calendar, Button, CellGroup } from "vant";
export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Calendar.name]: Calendar,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    },
    register() {},
  },
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  background-image: url("@/assets/image/login.jpg");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  .container {
    height: 15rem;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    ::v-deep {
      .registerBtn {
        margin: 16px;
      }
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
}
</style>