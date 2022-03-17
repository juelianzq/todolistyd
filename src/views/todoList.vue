<template>
  <div class="content">
    <div class="header">
      <van-list>
        <van-cell v-for="items in list" :key="items.id" :title="items.item"
          ><span @click="del(items)">X</span></van-cell
        >
      </van-list>
    </div>
    <div class="footer">
      <van-button icon="plus" type="primary" @click="add" />
    </div>
  </div>
</template>

<script>
import { Button, List, Cell } from "vant";
import { get } from "@/utils/server.js";
export default {
  components: {
    [Button.name]: Button,
    [List.name]: List,
    [Cell.name]: Cell,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    add() {
      let data = {
        item: "抽烟",
        // date:new Date()
      };
      get("/save", data).then((res) => {
        console.log(res);
        this.select();
      });
    },
    select() {
      get("/todolist").then((res) => {
        this.list = res.data;
      });
    },
    del(data){
      get('/delete',{id:data.id}).then(()=>{
        this.select();
      })
    }
  },
  created() {
    this.select();
  },
};
</script>

<style>
</style>