import { useState, useEffect } from "react";
import "./App.css";
import "./output.css";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {                             //to load tasks on open up
    let tt = localStorage.getItem("tasks")
    
    if(tt){
      let tasks = JSON.parse(localStorage.getItem("tasks"))
      setTasks(tasks)
    }
  
  }, [])
  

  const savetoLS = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }

  const toggleFinished = (e) =>{
    setShowFinished(!showFinished)
  }
  

  const handleAdd =()=>{
    setTasks([...tasks, {id : uuidv4(), task, isCompleted: false}])
    setTask("")
    savetoLS()
  }

  const handleChange =(e)=>{
    setTask(e.target.value) 
  }

  const handleCheck = (e) => {
    let id = e.target.name;
    // console.log(`the id is ${id}`)
    let index = tasks.findIndex(item=>{
      return item.id === id;
    })
    // console.log(index)
    let newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
    // console.log(newTasks)

    savetoLS()
  }
  
  
  const handleEdit =(e, id)=>{
    let t = tasks.filter( i => i.id === id )
    setTask(t[0].task)

    // the delete function
    let newTasks = tasks.filter(item=>{
      return item.id!==id
    });
    setTasks(newTasks)

    savetoLS()

  }
  
  const handleDelete =(e, id)=>{
    // console.log(`the id is ${id} and e is ${e}`)
    let newTasks = tasks.filter(item=>{
      return item.id!==id
    });
    setTasks(newTasks)

    savetoLS()
  }


  return (
    <>
      <Navbar />

      <div className="container mx-auto bg-indigo-100 m-10 p-10 border-2 border-gray-600 shadow-gray-500 shadow-xs rounded-2xl min-h-[85vh]">
        <div className="addTasks mb-15">


          <div className="text-[22px] font-bold text-center mb-3">Add a New Task</div>
          
          <div className="flex justify-center">
            <input onChange={handleChange} value={task} type="text" className="bg-white w-1/2" />
            <button onClick={handleAdd} disabled={task.length<=2} className="bg-indigo-200 disabled:bg-indigo-100 hover:bg-indigo-300 cursor-pointer border border-indigo-300 ml-5 py-1 px-3 rounded-xl font-bold ">Add Task</button>        
          </div>
          
        
        </div>

        <div className="yourTasks">

        
          <div className="text-[22px] font-bold text-center">Your Tasks</div> 
          <div className="justify-center flex items-center mb-[5%]">
            <label htmlFor="finished" className="text-[12px]">Show finished tasks</label>
            <input onChange={toggleFinished} type="checkbox" checked={showFinished} name="finished" className="m-2 text-amber-600"/> 
          </div>


          <div className="Tasks">

            { tasks.length === 0 && <div className="m-5 text-center"> No Tasks at the Moment! <br /> Take a deep breath. </div>}

            { tasks.map ( item => {

            return( (showFinished || !item.isCompleted) &&
            
            <div key={item.id} className="task flex justify-between w-full">
              <div className="flex items-center justify-between gap-2">

              <input onChange={handleCheck} type="checkbox" checked={item.isCompleted} name={item.id} id="" className="p-32" />
              
              <p  className = { item.isCompleted ? "line-through" : "" }>{item.task}</p>
              
              </div>
              
              <div className="buttons flex h-full">
              
                <button onClick = { (e) => { handleEdit( e, item.id) } } className="bg-indigo-200 hover:bg-indigo-300 cursor-pointer border border-indigo-300 ml-5 py-1 px-3 rounded-xl font-bold"> <BiSolidEditAlt /> </button>
              
                <button onClick = { (e) => { handleDelete( e, item.id) } } className="bg-indigo-200 hover:bg-indigo-300 cursor-pointer border border-indigo-300 ml-5 py-1 px-3 rounded-xl font-bold"> <RiDeleteBin7Fill /> </button>
              
              </div>
            </div>
            
            )})}



          </div>
        </div>
      </div>
    </>
  );
}

export default App;
