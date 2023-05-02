<script>
import { loadFromLocalStorage, saveToLocalStorage } from '../TodoList';

function cvtDate(date) {
  return new Date(date.split('-')[0], date.split('-')[1] - 1, date.split('-')[2]);
}

export default {
  name: 'TodoList',

  data: () => ({
    list: loadFromLocalStorage(),
    dueDate: (() => {
      const date = new Date();
      console.log(date);
      return `${date.getUTCFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    })(),
    itemToAdd: '',
    happy: true,
    editingItem: false,
    editItemIndex: 0,
    editItemDate: undefined,
    editItemText: '',
    image: null,
    images : [{
        id : 1,
        src : "default_character.jpg",
        alt : "Happy Minion"
    },
    {
        id : 2,
        src : "reaction_character.jpg",
        alt : "Unhappy Minion"
    },
    {
      id : 3,
      src : "kermit.png",
      alt : "Kermit",
    },
    {
      id : 4, 
      src : "emmet.jpg",
      alt : "Stressed"
    }
    ]
  
  }
  ),

  methods: {
    addItem() {
      if (this.itemToAdd) {
        console.log('Adding item: ', this.itemToAdd);
        const dueDate = cvtDate(this.dueDate);
        this.list.addItem(this.itemToAdd, dueDate);
        this.itemToAdd = '';
        saveToLocalStorage(this.list);
        this.happy = false;
      }
    },

    startEdit(id) {
      this.editingItem = true;
      this.editItemIndex = id;
      this.editItemText = this.list.getItemWithId(id).getDesc();
      this.editItemDate = this.list.getItemWithId(id).getDueDate();
    },

    finishEdit() {
      this.editingItem = false;
      const item = this.list.getItemWithId(this.editItemIndex);
      item.setDesc(this.editItemText);
      item.setDueDate(this.editItemDate);
      saveToLocalStorage(this.list);
    },

    formatDate(date) {
      // Format as MM/DD/YYYY
      if (typeof date === 'string') throw new Error('Expected date to be a Date object');
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    },

    clearList() {
      if (confirm('Are you sure you want to clear the list?')) {
        this.list.clear();
        saveToLocalStorage(this.list);
        this.happy = false;
      }
    },

    changeDate(event) {
      this.dueDate = event.target.value;
    },

    changeEditedDate(event) {
      this.editItemDate = cvtDate(event.target.value);
    },

    deleteItemWithId(id) {
      this.list.deleteItemWithId(id);
      saveToLocalStorage(this.list);
      this.happy = true;
    },
    changeImage() {
      late = this.item.isOverdue();
      if(happy == false && late == false){
        this.image = this.images[2];
      } else if (happy == true && late == true){
        this.image = this.images[3];
      } else if(happy == false && late == true){
        this.image = this.images[4];
      } else {
        this.image = this.images[1];
      }
     
    }
  }
};

</script>

<template>
  <div>
    <ul>
      <li v-for="item in list.getItems()" :key="item.id">
        <div v-if="editingItem && editItemIndex === item.id">
          <input v-model="editItemText" />
          <input type="date" :value="formatDate(editItemDate)" @change="changeEditedDate" /> <br />
          <button @click="finishEdit()">Done</button>
        </div>
        <div v-else :class="item.isOverdue() ? 'overdue' : 'fine'">
          <span>
            {{ item.getDesc() }}
            (Due at {{ formatDate(item.getDueDate()) }})
          </span>
        </div>

        <ul>
          <li>
            <a @click="startEdit(item.id)">Edit</a> |
            <a
              @click="
                deleteItemWithId(item.id);
                changeImage();
              "
              >Complete</a
            >
          </li>
        </ul>
      </li>
    </ul>

    <div class="new-item">
      <label for="text">New Item: </label>
      <input id="text" type="text" v-model="itemToAdd" /> <br />
      <label for="due">Due Date: </label>
      <input id="due" type="date" :value="dueDate" @change="changeDate" /> <br />
      <button
        @click="
          addItem();
          changeImage();
        "
      >
        Add Item
      </button>
      <button
        @click="
          clearList();
          changeImage();
        "
      >
        Clear List
      </button>

      <h1 v-if="happy">You got this!</h1>
      <h1 v-else>Keep working!</h1>
      <img :src = "image"/>
      <img v-if="image" :key = "image.id" class="image" :src = "image.src" alt = "image.alt">
    </div>
  </div>
</template>

<style>
.new-item {
  display: block;
  margin-top: 1em;
}

.new-item label {
  display: inline-block;
  width: 6em;
}

.new-item input {
  width: 30em;
}

.new-item button {
  margin-left: 1em;
  margin-top: 1em;
}

.overdue {
  color: red;
  text-decoration: underline;
}
.image {
  width : 100px;
  height: 100px;
  margin: 2px;
  cursor: pointer;
  transition: filter 0.3s ease-in;
}

.image:hover {
  filter: brightness(1.2);
}
</style>
