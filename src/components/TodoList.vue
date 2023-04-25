<script>
import { loadFromLocalStorage, saveToLocalStorage } from '../TodoList'

export default {
  name: 'TodoList',

  data: () => ({
    list: loadFromLocalStorage(),
    dueDate: new Date() + 1000 * 60 * 60 * 24 * 7,
    itemToAdd: ''
  }),

  methods: {
    addItem() {
      if (this.itemToAdd) {
        console.log('Adding item: ', this.itemToAdd)
        const dueDate = new Date() + 1000 * 60 * 60 * 24 * 7
        this.list.addItem(this.itemToAdd, dueDate)
        this.itemToAdd = ''
        saveToLocalStorage(this.list)
      }
    },

    formatDate(date) {
      // Format as MM/DD/YYYY
      console.log(typeof date)
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    },

    clearList() {
      if (confirm('Are you sure you want to clear the list?')) {
        this.list.clear()
        saveToLocalStorage(this.list)
      }
    }
  }
}
</script>

<template>
  <ul>
    <li v-for="item in list.getItems()" :key="item.id">
      <span>
        {{ item.getDesc() }}
        (Due at {{ formatDate(item.getDueDate()) }})
      </span>
    </li>
  </ul>

  <div class="new-item">
    <label for="text">New Item: </label>
    <input id="text" type="text" v-model="itemToAdd" /> <br />
    <label for="due">Due Date: </label>
    <input id="due" type="date" v-model="dueDate" /> <br />
    <button @click="addItem">Add Item</button>
    <button @click="clearList">Clear List</button>
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
</style>
