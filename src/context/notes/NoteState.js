import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

//////////////////////////////////////////////////////////////////////////////////////////
   
//Get all Notes
   const getNotes = async () => {

    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZTM4ZDhhYThhZjNiMzIxMzAyZGRmIn0sImlhdCI6MTY0NTA5OTIyNH0.3nKcTC6b0g66bfQtsmR4KCprtPUCvq9eVIifXmoVldI"
      },
    });

   const json=await response.json()
    setNotes(json)
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

  //ADD A NOTE
  const addNote = async (title, description, tag) => {

    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZTM4ZDhhYThhZjNiMzIxMzAyZGRmIn0sImlhdCI6MTY0NTA5OTIyNH0.3nKcTC6b0g66bfQtsmR4KCprtPUCvq9eVIifXmoVldI"
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }


////////////////////////////////////////////////////////////////////////////////////////////////


  //DELETE A NOTE
  const deleteNote = async (id) => {

//API call
const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZTM4ZDhhYThhZjNiMzIxMzAyZGRmIn0sImlhdCI6MTY0NTA5OTIyNH0.3nKcTC6b0g66bfQtsmR4KCprtPUCvq9eVIifXmoVldI"
  },
});

const json =await response.json();

    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes)
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////

  //EDIT A NOTE
  const editNote = async (id, title, description, tag) => {

    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZTM4ZDhhYThhZjNiMzIxMzAyZGRmIn0sImlhdCI6MTY0NTA5OTIyNH0.3nKcTC6b0g66bfQtsmR4KCprtPUCvq9eVIifXmoVldI"
      },
      body: JSON.stringify({title, description, tag})
    });

    const json = await response.json();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let newNotes=JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

  }
  export default NoteState;