<script setup>
import { ref } from "vue";
let items = ref(JSON.parse(localStorage.getItem("items")) || []);
function onEdit(id){
  let isOnEditOther = false;
  items.value.map((item) => {
    if(item.onEdit){
      isOnEditOther = true;
      return;
    }
  });
  if(isOnEditOther){
    ErrMsg.value = "他に編集中のタスクがあります";
    isErrMsg.value = true;
    return;
  }
  inputContent.value = items.value[id].content;
  inputLimit.value = items.value[id].limit;
  inputState.value = items.value[id].state;
  items.value[id].onEdit = true;
}
import {statuses} from "../const/status.js";
let inputContent = ref();
let inputLimit = ref();
let inputState = ref();
function onUpdate(id){
  if(inputContent.value == "" || inputLimit.value == ""){
    ErrMsg.value = 'タスクの内容と期限を入力してください。';
    isErrMsg.value = true;
    return;
  } 
  const newItem = {
    id: id,
    content: inputContent.value,
    limit: inputLimit.value,
    state: inputState.value,
    onEdit: false,
  };
  items.value.splice(id, 1, newItem); //splice関数は既存。
  localStorage.setItem("items",JSON.stringify(items.value));
  isErrMsg.value = false;
}
let isErrMsg = ref(false);
let isShowModal = ref(false);
function showDeleteModal(id){
  isShowModal.value = true;
  deleteItemId = id;
  deleteItemContent.value = items.value[id].content;
}
function onHideModal(){
  isShowModal.value = false;
}
function onDeleteItem(){
  items.value.splice(deleteItemId, 1);
  isShowModal.value = false;
  items.value = items.value.map((item, index) => ({
    id: index,
    content: item.content,
    limit: item.limit,
    state: item.state,
    onEdit: item.onEdit,
  }));
  localStorage.setItem("items",JSON.stringify(items.value));
}
let deleteItemId = '';
let deleteItemContent = ref();
let ErrMsg = ref('');
const today = new Date();
function sortByLimit(){
  items.value.sort((a,b) => new Date(a.limit) - new Date(b.limit));
  localStorage.setItem("items", JSON.stringify(items.value));
}
function sortById(){
  items.value.sort((a,b) => a.id - b.id);
  localStorage.setItem("items", JSON.stringify(items.value));
}
</script>

<template>
<div>
 <table>
 <thead>
  <tr>
    <th class="th-id">ID<button @click="sortById()">↓</button></th>
    <th class="th-value">やること</th>
    <th class="th-limit">期限<button @click="sortByLimit()">↓</button></th>
    <th class="th-state">状態</th>
    <th class="th-edit">編集</th>
    <th class="th-delete">削除</th>
  </tr>
  </thead>
  <p v-if="isErrMsg">{{ErrMsg}}</p>
  <tbody>
  <tr v-for ="item in items" :key="item.id" :class="{red: new Date(item.limit) < today}">
    <td>{{ item.id }}</td>
    <td>
      <span v-if="!item.onEdit">{{ item.content }}</span>
      <input v-else v-model="inputContent" type="text" />
    </td>
    <td>
      <span v-if="!item.onEdit">{{ item.limit }}</span>
      <input v-else v-model="inputLimit" type="date" />
    </td>
    <td>
      <span v-if="!item.onEdit">{{ item.state.value }}</span>
      <select v-else v-model="inputState">
        <option v-for="state in statuses" :key="state.id" :value="state" :selected="state.id == item.state.id">
          {{state.value}}
        </option>
      </select>
    </td>
    <td><button @click="onEdit(item.id)">編集</button></td>
    <td><button @click="onUpdate(item.id)">完了</button></td>
    <td><button @click="showDeleteModal(item.id)">削除</button></td>
  </tr>
  </tbody>
 </table>
 <div v-if="isShowModal" class="modal">
   <div class="modal-content">
     <p>「{{deleteItemContent}}」を削除してもよろしいですか？</p>
     <button @click="onDeleteItem()">はい</button>
     <button @click="onHideModal()">いいえ</button>
   </div>
 </div>
</div>
</template>

<style scoped>
.red {
  color: red;
}
</style>