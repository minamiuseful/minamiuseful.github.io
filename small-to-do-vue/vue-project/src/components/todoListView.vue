<script setup>
  import { ref } from 'vue';
  let items = ref(JSON.parse(localStorage.getItem("items")) || []);
  let editorTask = ref('');
  let editorDate = ref('');
  let editorMemo = ref('');
  function editorEvent(id){
    let isOnEditOther = false;
    if(!items.value[id].isEdit){
      items.value.map((item) => {
        if(item.isEdit){
          isOnEditOther = true;
          return;
        }
      });
    }
    if(isOnEditOther){
      return;
    }
    items.value[id].isEdit = !items.value[id].isEdit;
    editorTask.value = items.value[id].task;
    editorDate.value = items.value[id].date;
    editorMemo.value = items.value[id].memo;
  }
  function editorSubmitEvent(id){
    const newItem = {
      id: id,
      task: editorTask.value,
      date: editorDate.value,
      memo: editorMemo.value,
      isEdit: false,
      isDone: items.value[id].isDone,
    };
    items.value.splice(id, 1, newItem); //splice関数は既存。
    localStorage.setItem("items",JSON.stringify(items.value));
  }
  let trashShown = ref(false);
  let trashId = ref('');
  let trashTask = ref('');
  function trashEvent(id){
    trashTask.value = items.value[id].task;
    trashId.value = id;
    trashShown.value = !trashShown.value;
  }
  function trashNoEvent(){
    trashShown.value = !trashShown.value;
  }
  function trashYesEvent(){
    items.value.splice(trashId.value, 1);
    items.value = items.value.map((item, index) => ({
      id: index,
      task: item.task,
      date: item.date,
      memo: item.memo,
      isDone: item.isDone,
      isEdit: item.isEdit
    }));
    localStorage.setItem("items",JSON.stringify(items.value));
    trashShown.value = !trashShown.value;
  }
function doneEvent(id) {
  // 1. 編集対象のタスクを一旦変数に保存
  const target = items.value[id];

  // 2. 完了状態を反転した新しいアイテムを作成
  const newItem = {
    id: id, // IDは後で付け直すので仮でOK
    task: target.task,
    date: target.date,
    memo: target.memo,
    isEdit: target.isEdit,
    isDone: !target.isDone, // ← ココで反転
  };

  // 3. 配列から元のアイテムを削除
  items.value.splice(id, 1);

  // 4. 完了したタスクは末尾に、未完了は先頭に入れる
  if (newItem.isDone) {
    items.value.push(newItem); // 完了タスクはリストの最後に
  } else {
    items.value.unshift(newItem); // 未完了タスクはリストの最初に
  }
     items.value = items.value.map((item, index) => ({
      id: index,
      task: item.task,
      date: item.date,
      memo: item.memo,
      isEdit: item.isEdit,
      isDone: item.isDone,
    }));
    localStorage.setItem("items",JSON.stringify(items.value));
  }
</script>

<template>
  <div>
    <div class="list-task">
      <h2>LIST</h2>
      <ul class="list-area">
        <li v-for="item in items" :key="item.id">
          <div class="list-item">
            <div class="list-item-top">
              <button class="list-check" @click="doneEvent(item.id)" :class="{'list-check--checked': item.isDone}">✔</button>
              <p>{{item.task}}</p>
            </div>
            <div class="list-item-bottom">
              <p class="list-item-top--fs">{{item.date}}</p>
              <button class="list-button-memo"><img src="../assets/memo.svg" /></button>
              <p class="list-memo">{{item.memo}}</p>
              <button @click="editorEvent(item.id)"><img src="../assets/editor.svg" /></button>
              <button @click="trashEvent(item.id)"><img src="../assets/trash.svg" /></button>
            </div>
          </div>
          <form @submit="editorSubmitEvent(item.id)"  v-if="item.isEdit">
            <div class="editor-item">
              <input class="editor-item-input editor-task" type="text" v-model="editorTask"></input>
              <div class="editor-item-bottom">
                <input class="editor-item-input editor-date" type="date" v-model="editorDate"></input>
                <input class="editor-item-input editor-memo" type="text" v-model="editorMemo"></input>
                <input class="editor-submit" type="submit" value="☝" ></input>
              </div>
            </div>
          </form>
        </li>
      </ul>
      <div class="trash-item" v-if="trashShown">
        <p>「{{trashTask}}」を削除しますか？</p>
        <button @click="trashNoEvent()">いいえ</button>
        <button @click="trashYesEvent()">はい</button>
      </div>
      <div class="trash-wrap" v-if="trashShown" @click="trashNoEvent()"></div>
    </div>
  </div>

</template>

<style scoped>
.list-task{
  padding:0 0 40px;
  margin-top:230px;
  background-color:#eaeaea;
}
h2{
  position:sticky;
  top:230px;
  background-color:#eaeaea;
  z-index:2;
}
li{
  list-style:none;
  margin-bottom:8px;
}
.list-area{
  width:700px;
  margin:0 auto;
  padding:0;
}
.list-check{
  color:#fff;
  width:24px;
  height:24px;
  border:1.5px solid black;
  border-radius:4px;
  background-color:white;
  margin-right:16px;
}
.list-item{
  display:flex;
  height:50px;
  width:700px;
  align-items:center;
  background-color:#ffffff;
  border-radius:4px;
  padding:0 16px;
  justify-content:space-between;
}
.list-item-top{
  display:flex;
  width:450px;
  align-items:center;
}
.list-item-bottom{
  display:flex;
  position:relative;
  justify-content:space-between;
}
.list-item-bottom button{
  border:none;
  background:none;
  cursor:pointer;
}
.list-item-top--fs{
  font-size:14px;
  margin-right:24px;
}
.list-memo{
  position:absolute;
  top:49px;
  right:-16px;
  margin:0;
  padding:16px;
  font-size:14px;
  background-color:#ffffff;
  z-index:1;
  border:1px solid black;
  width:200px;
  display: none;
  border-radius:8px;
  max-height:100px;
  
}
.list-memo::before{
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  border-style: solid;
  border-width: 0 10px 20px 10px;
  border-color: transparent transparent #000000;
  translate: -50% -100%;
}
.list-memo::after{
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  border-style: solid;
  border-width: 0 8.9px 17.8px 8.9px;
  border-color: transparent transparent #ffffff;
  translate: -50% -100%;
}
.list-button-memo:hover + .list-memo{
  display:block;
}
.editor-item{
  background-color:#f3f3f3;
  padding:32px;
}
.editor-item-input{
  background: #ffffff;
  height:40px;
  border-radius:20px;
  border:none;
  font-size: 16px;
  box-shadow: 0px 10px 10px -15px rgba(0, 0, 0, 0.1);
  padding:0 16px;
  font-size:14px;
}
.editor-item-bottom{
  display:flex;
}
.editor-task{
  width:100%;
  margin-bottom:16px;
}
.editor-date{
  width:145px;
  margin-right:15.5px;
}
.editor-memo{
  width:420px;
  margin-right:15.5px;
}
.editor-submit{
    background: #333;
  width:40px;
  height:40px;
  border-radius:20px;
  border:none;
  font-size: 24px;
  font-weight:bold;
  line-height:20px;
  text-align:center;
  color:white;
  box-shadow: 0px 10px 10px -15px rgba(0, 0, 0, 0.1);
  padding:0;
  display:block;
  cursor:pointer;
}
.trash-wrap{
  background-color:rgb(0,0,0,.5);
  position:fixed;
  top:0;
  right:0;
  left:0;
  bottom:0;
  z-index:10000;
}
.trash-item{
  max-width:500px;
  background-color:#fff;
  padding:32px;
  text-align:center;
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  z-index:10001;
}

.trash-item button{
  background-color: #f3f3f3;
  border-radius:4px;
  border:1px solid #333;
  width:80px;
  cursor:pointer;
}

.trash-item button:first-of-type{
  margin-right:8px;
}

.list-check--checked{
  font-size:24px;
  padding-top:0;
  padding-left:0;
  line-height: 24px;
  background-color:black;
}
</style>