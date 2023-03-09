import {Todo} from"./Todo.js"
import fs from "fs"

export class TodoList{
  constructor(){
    this.todoList=[]
    this.file = "data.json"
  }

  start(){
    let myfile=fs.readFileSync(this.file).toString()
    this.todoList = JSON.parse(myfile)
  }

  addTodo(titre,contenu,date){
    const id = Math.random().toString(16).slice(2)
    this.todoList.push(new Todo(id,titre,contenu,date))
    this.rewrite()
  }

  editTodo(id,titre,contenu,date){
    const todoFound = this.findTodo(id)
    if(todoFound){
      todoFound.id = id
      todoFound.titre = titre? titre : todoFound.titre
      todoFound.contenu = contenu? contenu : todoFound.contenu
      todoFound.date = date? date : todoFound.date
      this.rewrite()
      return true
    }
    return false
  }

  changeStatut(id){
    const todoFound = this.findTodo(id)
    if(todoFound){
      todoFound.statut = !todoFound.statut
      this.rewrite()
      return true
    }
    return false
  }

  deletTodo(id){
    const todoFound = this.findTodo(id)
    if(todoFound){
      this.todoList = this.todoList.filter(todo => todo.id !=id)
      this.rewrite()
      return true
    }
    return false
  }

  searchTodo(titre){
    let tmptab =[]
    this.todoList.forEach(todo =>{
      if(todo.titre.includes(titre)){
        tmptab.push(todo)
      }
    })
    return tmptab
  }

  findTodo(id){
    const todofound =this.todoList.find(todo=>todo.id === id)
    return todofound
  }

  rewrite(){
    fs.writeFileSync(this.file,JSON.stringify(this.todoList))
  }
}