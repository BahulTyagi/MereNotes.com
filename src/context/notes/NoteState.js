import NoteContext from "./noteContext";
import {useState} from "react";


const NoteState= (props)=>{

    const notesInitial=[
        {
          "_id": "6214d2062e622f77ff3a4202a",
          "user": "620e38d8aa8af3b321302ddf",
          "title": "Hey This is my first evera note",
          "description": "checking the code if it is ok",
          "tag": "codecheck",
          "date": "2022-02-22T12:07:34.873Z",
          "__v": 0
        },
        {
          "_id": "6214d211a2e62f77ff3a4202c",
          "user": "620e38d8aa8af3b321302ddf",
          "title": "Heyoo This is my first evera note",
          "description": "checking in the code if it is ok or note",
          "tag": "codechecking in progress",
          "date": "2022-02-22T12:07:54.554Z",
          "__v": 0
        },
        {
          "_id": "6214d2062e62f77ff33a4202a",
          "user": "620e38d8aa8af3b321302ddf",
          "title": "Hey This is my first evera note",
          "description": "checking the code if it is ok",
          "tag": "codecheck",
          "date": "2022-02-22T12:07:34.873Z",
          "__v": 0
        },
        {
          "_id": "6214d21a2e62f77ff3a42302c",
          "user": "620e38d8aa8af3b321302ddf",
          "title": "Heyoo This is my first evera note",
          "description": "checking in the code if it is ok or note",
          "tag": "codechecking in progress",
          "date": "2022-02-22T12:07:54.554Z",
          "__v": 0
        },
        {
          "_id": "6214d2062e62f77ff3av4202a",
          "user": "620e38d8aa8af3b321302ddf",
          "title": "Hey This is my first evera note",
          "description": "checking the code if it is ok",
          "tag": "codecheck",
          "date": "2022-02-22T12:07:34.873Z",
          "__v": 0
        },
        {
          "_id": "6214d21a2e62f7n7ff3a4202c",
          "user": "620e38d8aa8af3b321302ddf",
          "title": "Heyoo This is my first evera note",
          "description": "checking in the code if it is ok or note",
          "tag": "codechecking in progress",
          "date": "2022-02-22T12:07:54.554Z",
          "__v": 0
        }
    ]

      const [notes, setNotes]=useState(notesInitial);

  

    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;