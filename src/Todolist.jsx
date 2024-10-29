import React from 'react'

const Todolist = ({todos,deleteFn,doneFn,editFn}) => {
    const styleObj={
        backgroundColor:"pink",
        textDecorationLine:"line-through"
    }
    console.log("todo array",todos)
  return (
    <>
    <div>Todolist</div>
    <h1>{todos?.map((item)=>(
        <>
        {item.done==true?<div style={styleObj}>{item.title}</div>:<div>{item.title}</div>}
        <span><button onClick={()=>editFn(item.id)}>Edit</button></span>
        <span><button onClick={()=>deleteFn(item.id)}>Delete</button></span>
        {item?.done==false&&<span><button onClick={()=>doneFn(item.id)}>Done</button></span>}
        </>
    ))}</h1>
    </>
  )
}

export default Todolist