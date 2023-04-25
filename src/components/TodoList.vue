<script>
import { loadFromLocalStorage, saveToLocalStorage } from '../TodoList'

export default {
  name: 'TodoList',

  data: () => ({
    list: loadFromLocalStorage(),
     dueDate: (() => {
      const date = new Date()
      console.log(date)
      return `${date.getUTCFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
     
    })(),
    itemToAdd: '',
    imageSource: require('@/components/default_character.jpg')   
  }),

  methods: {

    addItem() {
      if (this.itemToAdd) {
        console.log('Adding item: ', this.itemToAdd)
        const dueDate = new Date(
          this.dueDate.split('-')[0],
          this.dueDate.split('-')[1] - 1,
          this.dueDate.split('-')[2]
        )
        this.list.addItem(this.itemToAdd, dueDate)
        this.itemToAdd = ''
        saveToLocalStorage(this.list)
      }
    },

    formatDate(date) {
      // Format as MM/DD/YYYY
      console.log(typeof date)
      console.log(date)
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    },

    clearList() {
      if (confirm('Are you sure you want to clear the list?')) {
        this.list.clear()
        saveToLocalStorage(this.list)
       
      }
    },

    changeDate(event) {
      this.dueDate = event.target.value
    },

    deleteItemWithId(id) {
      this.list.deleteItemWithId(id)
      saveToLocalStorage(this.list)
      
    }, 
    changeImage(){
      if (this.imageSource === require('@/components/default_character.jpg')){
        this.imageSource = require('@/components/reaction_character.jpg')
      }else{
        this.imageSource = require('@/components/default_character.jpg')
      }
      }
    }
  }

</script>

<template>
  <div>
    <img :src="imageSource"/>
    
  <ul>
    <li v-for="item in list.getItems()" :key="item.id">
      <span>
        {{ item.getDesc() }}
        (Due at {{ formatDate(item.getDueDate()) }})
      </span>

      <ul>
        <li>
          <a @click="deleteItemWithId(item.id); changeImage()">Delete</a>
        </li>
      </ul>
    </li>
  </ul>

    <div class="new-item">
      <label for="text">New Item: </label>
      <input id="text" type="text" v-model="itemToAdd" /> <br />
      <label for="due">Due Date: </label>
      <input id="due" type="date" :value="dueDate" @change="changeDate" /> <br />
      <button @click="addItem(); changeImage()">Add Item</button>
      <button @click="clearList(); changeImage()">Clear List</button> 
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
</style>
