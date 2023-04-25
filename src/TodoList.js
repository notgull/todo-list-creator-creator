// Core TODO list code.

export class TodoList {
  constructor() {
    this.items = []
  }

  addItem(desc, dueDate) {
    this.items.push(new TodoListItem(desc, dueDate))
  }

  getItems() {
    return this.items
  }

  asJson() {
    return {
      items: this.items.map((item) => item.asJson())
    }
  }

  clear() {
    this.items = []
  }

  deleteItemWithId(id) {
    this.items = this.items.filter((item) => item.id !== id)
  }

  static fromJson(json) {
    const todoList = new TodoList()
    todoList.items = json.items.map((item) => TodoListItem.fromJson(item))
    return todoList
  }
}

export class TodoListItem {
  constructor(desc, dueDate) {
    this.desc = desc
    this.dueDate = dueDate
    this.id = Math.random().toString(36)
  }

  getDesc() {
    return this.desc
  }

  getDueDate() {
    return this.dueDate
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate
  }

  asJson() {
    return {
      desc: this.desc,
      dueDate: dateToSerialized(this.dueDate)
    }
  }

  static fromJson(json) {
    return new TodoListItem(json.desc, serializedToDate(json.dueDate))
  }
}

export function saveToLocalStorage(todoList) {
  localStorage.setItem('todoList', JSON.stringify(todoList.asJson()))
}

export function loadFromLocalStorage() {
  // Use an empty list if there is no saved list.
  const stored = localStorage.getItem('todoList')
  if (!stored) {
    return new TodoList()
  } else {
    console.log(stored)
    return TodoList.fromJson(JSON.parse(stored))
  }
}

function dateToSerialized(date) {
  return {
    month: date.getMonth(),
    day: date.getDate(),
    year: date.getFullYear(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  }
}

function serializedToDate(serialized) {
  return new Date(
    serialized.year,
    serialized.month,
    serialized.day,
    serialized.hours,
    serialized.minutes,
    serialized.seconds
  )
}
