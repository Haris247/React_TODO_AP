import React,{useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import Todolist from './Todolist';
const Parent = () => {
    
    const [input,setInput]=useState();
    const [todo,setTodo]=useState(JSON.parse(localStorage.getItem("todos"))?JSON.parse(localStorage.getItem("todos")):[]);
    const [toggle,setToggle]=useState(false);
    const [editID,setEditID]=useState()

    const addTodo=(e)=>{
        e.preventDefault();
        if(toggle==true && editID){
           setTodo(todo.map((item)=>{
            if(item.id==editID){
               return{...item,title:input}
            }
            else{
                return {...item}
            }
        }))
           setToggle(false)
           setInput("");
        }
        else{
            const newTodo={
                id:uuidv4(),
                title:input,
                done:false
            }
            setTodo([...todo,newTodo]);
            setInput("");
        }
    }

    const editTodo=(id)=>{
        setToggle(true)
        setEditID(id)
    }

    const deleteTodo=(id)=>{
        const filter=todo.filter((item)=>item.id!=id);
        setTodo([...filter])
    }
    const doneTodo=(id)=>{
        setTodo(todo.map((item)=>{
            if(item.id==id){
               return{...item,done:true}
            }
            else{
                return {...item}
            }
        }))
    }
    const clearFunc=()=>{
        setTodo([])
        localStorage.clear();
        console.log(todo)
    }

    useEffect(()=>{
       localStorage.setItem("todos",JSON.stringify(todo)) 
    },[todo])

  return (
    <>
    <div>Welcome to the TODO App</div><br />
    <br /><br />
   {toggle==true? (<form onSubmit={addTodo}>
        <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} required/>
        <button type='submit'>Update</button>
    </form>):( <form onSubmit={addTodo}>
        <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}  required/>
        <button type='submit'>Add</button>
    </form>)}

    <Todolist todos={todo} deleteFn={deleteTodo} doneFn={doneTodo} editFn={editTodo} />
    <button onClick={clearFunc}>Clear Todos</button>

    </>
  )
}


export default Parent