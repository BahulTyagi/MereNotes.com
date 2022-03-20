import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
   
    useEffect(() => {
        getNotes()
    }, [])

    const [note, setNote] = useState({etitle: "", edescription:  "", etag:"default"})

    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag:currentnote.tag})
    }

    const handleClick=(e)=>{
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
    }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    const ref=useRef(null);
    const refClose=useRef(null);
    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit your note here :)
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit here</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required/>
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5}  type="button" onClick={handleClick} className="btn btn-primary">UPDATE</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <h3>Your notes</h3>
                <div className="container">
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes