import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/noteContext'

const About = () => {
  const a = useContext(NoteContext);
  useEffect(() => {
    a.update();
  }, [])

  return (
    <div>About {a.state.name} and he is in class {a.state.class}</div>
  )
}

export default About