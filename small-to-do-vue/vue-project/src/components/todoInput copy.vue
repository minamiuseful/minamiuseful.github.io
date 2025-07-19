<script setup>
import { ref } from "vue";
const input = ref("");
const inputDate = ref("");
import {statuses} from "../const/status.js";
function onSubmitForm(){
  const items = JSON.parse(localStorage.getItem(("items"))) || [];
//JSON.parse()　→　JSON型式のデータを配列軽視ｋに変える変数
//localStorage.getItem(キー)で、ローカルストレージからデータを取り出している
//||[]　→　データが空の場合にエラーが出ないように、データがないときは空にするというようにする。
  const newItem = {
    id: items.length,
    content: input.value,
    limit: inputDate.value,
    state: statuses.NOT_START,
    onEdit: false,
  };
  items.push(newItem);
  localStorage.setItem("items", JSON.stringify(items));
  //setItem(キー、バリュー)でローカルストレージにデータを保存する関数
  //JSON.stfingify()は、一度配列化したJSONファイルを文字列に直したもの
};
</script>

<template>
<div>
  <form @submit="onSubmitForm">
    <label>やること：<input type="text" v-model="input" /></label>
    <label>日付：<input type="date" v-model="inputDate" /></label>
    <input type="submit" value="登録" />
  </form>
</div>
</template>

<style scoped>
</style>