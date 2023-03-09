import {Todo} from"./Todo.js"

export class TodoList{
  constructor(){
    this.todoList=[]
  }

  addTodo(titre,contenu,statut,date){
    const id = Math.random().toString(16).slice(2)
    this.todoList.push(new Todo(id,titre,contenu,statut,date))
  }

  editTodo(id,titre,contenu,statut,date){
    const todoFound = this.findTodo(id)
    if(todoFound){
      todoFound.id = id
      todoFound.titre = titre? titre : todoFound.titre
      todoFound.contenu = contenu? contenu : todoFound.contenu
      todoFound.statut = statut? statut : todoFound.statut
      todoFound.date = date? date : todoFound.date
      return true
    }
    return false
  }

  changeStatut(id){
    const todoFound = this.findTodo(id)
    if(todoFound){
      todoFound.statut = !todoFound.statut
      return true
    }
    return false
  }

  deletTodo(id){
    const todoFound = this.findTodo(id)
    if(todoFound){
      this.todoList = this.todoList.filter(todo => todo.id !=id)
      return true
    }
    return false
  }

  searchTodo(titre){
    let tmptab =[]
    this.todoList.forEach(todo =>{
      if(todo.titre === titre){
        tmptab.push(todo)
      }
    })
    return tmptab
  }

  findTodo(id){
    const todofound =this.todoList.find(todo=>todo.id === id)
    return todofound
  }
}