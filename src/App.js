import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage=()=>{
  let list=localStorage.getItem('list');

  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }

}



function App() {
  //forform
  const [name, setName] = useState("");

  //local storage for list
  const [list, setList] = useState(getLocalStorage);

  //flag for editing or not
  const [isEditing, setIsEditing] = useState(false);

  //edit id for which item
  const [editId, setEditId] = useState(null);

  //alert passing object in useState red green color
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("hiii");
    //if name isfalse meaning its empty string
    if (!name) {
      // setAlert({ show: true, msg: "please enter value", type: "danger" });
      showAlert(true,'danger','Please enter value')
    }
    //for edit
    else if (name && isEditing) {
      //deal with edit
      setList(list.map((item)=>{
        if( item.id===editId){
          return {...item,title:name}
          
        }
        return item
      }))
      setName('')
      setEditId(null)
      setIsEditing(false)
      showAlert(true,'success','item editted')
    } else {
      //show alert item added
      //here we have to use id because when we need toedit we need id that which itemit is?
      const newItem = { id: new Date().getTime.toString(), title: name };
      showAlert(true,'success','Item added to list')
      //...list meaning get me previous value from list and add this new value
      setList([...list, newItem]);
      //after adding the name in list empty the name usestate value in input
      setName("");
    }
  };
  
  const showAlert=(show=false,type="",msg="")=>{
    setAlert({show:show,type,msg})

  }

  const clearList=()=>{
    showAlert(true,'danger','empty list')
    setList([])
  }


  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');

    //returned item whose id didnt match

    setList(list.filter((item) => item.id !== id));
  };

  const editItem=(id)=>{
    
    const specificItem=list.find((item)=> item.id===id);
    setIsEditing(true)
    setEditId(id)
    setName(specificItem.title) 

  }

  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])


  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="eg-bread"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* butoon will toggle edit and submit on some action */}
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          {/* list sent as prop */}
          <List items={list}  removeItem={removeItem} editItem={editItem}/>
          <button className="clear-btn" onClick={clearList}>Clear Items</button>
        </div>
      )}
    </section>
  );
}

export default App;
