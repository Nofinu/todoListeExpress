import express from "express";
import { TodoList } from "./Classes/TodoList.js";

const todoList = new TodoList()

const Port = 5000

const app = express()

app.use(express.json())


app.get('/todolist',(req,res)=>{
  res.json(todoList.todoList)
})
app.get('/todolist/:id',(req,res)=>{
  const todoFound = todoList.findTodo(req.params.id)
  if(todoFound){
    res.json(todoFound)
  }
  else{
    res.json({message:`aucune todo trouver a l'id : ${req.params.id}`})
  }
})

app.get("/searchtodo",(req,res)=>{
  const {titre}=req.body
  res.json(todoList.searchTodo(titre))
})


app.post("/addtodo",(req,res)=>{
  const {titre,contenu,date}={...req.body}
  todoList.addTodo(titre,contenu,date)
  res.json(todoList.todoList[todoList.todoList.length-1])
})

app.put("/edittodo/:id",(req,res)=>{
  const {titre,contenu,statut,date}={...req.body}
  if(todoList.editTodo(req.params.id,titre,contenu,statut,date)){
    res.json({id:req.params.id,...req.body})
  }
  else{
    res.json({message:`aucune todo trouver a l'id : ${req.params.id}`})
  }
})

app.patch("/setstate/:id",(req,res)=>{
  if(todoList.changeStatut(req.params.id)){
    res.end("le statut de la todo id : "+req.params.id+" a etet changé")
  }
  else{
    res.end(`aucune todo trouver a l'id : ${req.params.id}`)
  }
})

app.delete("/deletetodo/:id",(req,res)=>{
  if(todoList.deletTodo(req.params.id)){
    res.end("la todo id : "+req.params.id+" a ete suprimé")
  }
  else{
    res.end(`aucune todo trouver a l'id : ${req.params.id}`)
  }
})

app.listen(Port,function(){
  console.log('TodoList Api est lancée sur le port :'+Port)
  todoList.start()
})
