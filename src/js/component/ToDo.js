
import React, {useState, useEffect} from 'react';



const ToDo = () => {


	const [todoValue, setTodo ] = useState('');
	const [todoList, setTodoList ] = useState([]);
	const [auxlist, setaux] = useState([]);
	
	
	
	const changeList = (e) => {
		
		if(e.key == 'Enter'){
			{setaux([...auxlist, {label: todoValue, done:false}])}
			{setTodoList([...todoList, todoValue])}
			e.target.value="";
			
			
		}
		
		
	}
	const deleteList = (index) => {
		let newList = todoList.filter((e, i)=>{
			if (index !== i){
				return e;
			}
		})
			setTodoList(newList);
			console.log(todoList)
		
	}

	const syncro = () => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr', {
      method: "PUT",
      body: JSON.stringify(auxlist),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
		if(resp.status === 200){
			obtenerDatos()
		}
        console.log(resp.text()); // will try return the exact result as string
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //here is were your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
    })
    .catch(error => {
        //error handling
        console.log(error);
    });
	}

	useEffect(() =>{
		if(todoList.length > 0){
			syncro();
			obtenerDatos();

		}
		
	}, [todoList])

	function obtenerDatos(){
		fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr', {
      method: "GET",
	  header: {"Content-Type" : "application/json"},

	})
	}

	function borrarDatos(){
		fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr', {
      method: "DELETE",
	  header: {"Content-Type" : "application/json"},

	})


	}


	return (
		<div className="align-self-center">
			<h1>ToDos</h1>
			<input type="text"  placeholder="What needs to be done" 
			onChange={e => setTodo(e.target.value)} 
			onKeyDown={changeList}/>
			
			{todoList.map((item, index)=><li key={index}>{item}
			<span onClick={()=>deleteList(index)}> x </span>
			</li>)}
			<div>{todoList.length} items left</div>
			<button onClick={borrarDatos()}>Delete all</button>

			{console.log(todoList)}
			
			


		</div>
		

	
	);
};

export default ToDo;