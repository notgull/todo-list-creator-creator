<script>
import { loadFromLocalStorage, saveToLocalStorage } from '../TodoList'

export default {
  name: 'TodoList',

  data: () => ({
    list: loadFromLocalStorage(),
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
    }
  }
}
</script>

<template>
  <ul>
    <li v-for="item in list.getItems()" :key="item.id">
      <span>{{ item.getDesc() }}</span> |
      <span>{{ item.dueDate }}</span>
    </li>
  </ul>

  <input type="text" v-model="itemToAdd" />
  <button @click="addItem">Add Item</button>
</template>
