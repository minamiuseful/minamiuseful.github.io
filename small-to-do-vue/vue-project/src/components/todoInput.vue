<script setup>
import { ref } from 'vue';
const today = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}).format(new Date()).replace(/\//g, '-');
let inputTask = ref('');
let inputDate = ref(today);
let inputMemo = ref('');
function inputTaskEvent(){
  const items = JSON.parse(localStorage.getItem("items")) || [];
  const newItem = {
    id:items.length,
    task:inputTask.value,
    date:inputDate.value,
    memo:inputMemo.value,
    isEdit:false,
    isDone:false
  };
  items.push(newItem);
  localStorage.setItem("items",JSON.stringify(items));
};
</script>

<template>
  <div class="input-area">
    <h2>INPUT</h2>
    <form class="input-form" @submit="inputTaskEvent">
      <div>
        <input v-model="inputTask" type="text" placeholder="タスクを入力してください" class="input-item input-task"></input>
      </div>
      <div class="input-inner--flex">
        <input v-model="inputDate" type="date" class="input-item input-date" ></input>
        <input v-model="inputMemo" type="text" class="input-item input-memo" placeholder="メモ"></input>
        <input type="submit" value="＋" class="input-submit"></input>
      </div>
    </form>
  </div>
</template>

<style scoped>
.input-area{
  background-color:#F3F3F3;
  padding:0 0 40px;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  z-index:3;
}
.input-form{
  width:700px;
  margin:0 auto;
}
.input-item{
  background: #ffffff;
  height:50px;
  border-radius:25px;
  border:none;
  font-size: 16px;
  box-shadow: 0px 10px 10px -15px rgba(0, 0, 0, 0.1);
  padding:0 16px;
}
.input-task{
  width: 700px;
}
.input-date{
  width: 160px;
}
.input-memo{
 width: 460px;
}
.input-submit{
  background: #333;
  width:50px;
  height:50px;
  border-radius:25px;
  border:none;
  font-size: 32px;
  font-weight:bold;
  line-height:32px;
  text-align:center;
  color:white;
  box-shadow: 0px 10px 10px -15px rgba(0, 0, 0, 0.1);
  padding:0;
  display:block;
  cursor:pointer;
}
.input-inner--flex{
  margin-top:16px;
  display:flex;
  justify-content:space-between;
}
</style>