import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Notes from './Notes';


const AddNote = () => {

    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description:  "",tag:"default"})

    const handleClick=(e)=>{
        addNote(note.title, note.description, note.tag);
        e.preventDefault();
    }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (  
        <div className="container my-3">
            <h1>Add a note</h1>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>    
    )
}

export default AddNote