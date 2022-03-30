<template>
  <div class="content">
    <div class="header">
      <div class="title">
        <h3>待办事项</h3>
      </div>
      <van-cell-group inset>
        <van-cell
          v-for="items in list"
          :key="items.id"
          :title="items.item"
          @click="showPopup(items)"
        ></van-cell>
        <van-popup v-model="show" round class="toolTitle">
          <span class="tool">需要操作这条数据吗</span>
          <div class="toolBtn">
            <van-button
              round
              type="primary"
              size="small"
              class="updateBtn"
              @click="updateClick"
              >修改</van-button
            >
            <van-button
              round
              type="primary"
              size="small"
              class="delBtn"
              @click="del(listItem)"
              >删除</van-button
            >
          </div>
        </van-popup>
        <van-popup
          v-model="showUpdate"
          closeable
          round
          position="bottom"
          @closed="close"
          :style="{ height: '40%' }"
        >
          <addItem @submit="add" @update="update" :listItem="this.listItem" v-if="showUpdate"></addItem>
        </van-popup>
      </van-cell-group>
    </div>
    <div class="footer">
      <van-button round icon="plus" type="primary" @click="addShow" />
    </div>
  </div>
</template>

<script>
import { Button, CellGroup, Cell, Popup, Toast } from "vant";
import { get } from "@/utils/server.js";
import addItem from "@/components/addItem";
export default {
  components: {
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    addItem,
  },
  data() {
    return {
      list: [],
      show: false,
      showUpdate: false,
      //item数据缓存变量
      listItem: {},
    };
  },
  methods: {
    add(values) {
      let data = {
        item: values.item,
        date: values.date,
      };
      get("/save", data).then((res) => {
        console.log(res);
        if (res.data) {
          Toast.success("添加成功");
          this.showUpdate = false;
          this.select();
        } else {
          Toast.fail("添加失败");
        }
      });
    },
    update(values){
      let data = {
        id:values.id,
        item: values.item,
        date: values.date,
      };
      get("/update", data).then((res) => {
        console.log(res);
        if (res.data) {
          Toast.success("更新成功");
          this.showUpdate = false;
          this.listItem = {}
          this.select();
        } else {
          Toast.fail("更新失败");
        }
      });
    },
    addShow() {
      this.showUpdate = true;
    },
    select() {
      get("/todolist").then((res) => {
        this.list = res.data;
      });
    },
    del(data) {
      this.show = false;
      get("/delete", { id: data.id }).then((res) => {
        if (res.data) {
          this.listItem = {}
          Toast.success("删除成功");
          this.select();
        } else {
          this.listItem = {}
          Toast.fail("删除失败");
        }
      });
    },
    showPopup(data) {
      this.listItem = data;
      this.show = true;
    },
    updateClick() {
      this.showUpdate = true;
      this.show = false;
    },
    close(){
      this.listItem ={}
      // this.showUpdate = false;
    }
  },
  created() {
    this.select();
  },
};
</script>

<style lang='scss' scoped>
::v-deep {
  .van-cell {
    line-height: 20px;
    font-size: 22px;
    text-align: left;
    padding-left: 30px;
    color: rgb(66, 65, 65);
  }
  .toolTitle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 13%;
    width: 90%;
    .toolBtn {
      margin-top: 10px;
      padding-top: 5px;
      display: flex;
      justify-content: space-around;
      border-top: 1px solid #ccc;
      .updateBtn {
        position: relative;
        left: 40px;
      }
      .delBtn {
        position: relative;
        right: 40px;
      }
    }
  }
}
.title {
  padding: 20px;
}
.footer {
  height: 50px;
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>