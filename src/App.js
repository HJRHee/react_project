// 파이어베이스에서 db 가져오기
import { db } from './firebase'
import { collection, getDocs, addDoc } from "firebase/firestore";
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [newList, setNewList] = useState("");
  // console.log(newList)

  const [todos, setList] = useState([])
  const todosCollectionRef = collection(db, "todos");
  
  useEffect( () =>{
    const getLists = async () => {
      const data = await getDocs(todosCollectionRef)
      console.log(data)
      setList( 
        data.docs.map( 
          (doc)=>(
            { ...doc.data(), id:doc.id}
          )
        )
      )
    }
    
    getLists();
  }, [])
  
  const date = new Date();
  const now_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()

  const createList = async () => {
    await addDoc(todosCollectionRef, {content:newList, d_date:now_date})
  }


  const showList = todos.map(
    (value) => (
      <div key={value.id}>
        <h2>
          {value.content}
          <span className='date'>{value.d_date}</span>
        </h2>
      </div>
    )
  )

  return (
    <div className="App">
      <input type="text" placeholder='todos...' onChange={
        (event)=> {setNewList(event.target.value)}
        } />
        <button onClick={createList}>Add List</button>
      <hr />
      {showList}
    </div>
  );
}

export default App;
