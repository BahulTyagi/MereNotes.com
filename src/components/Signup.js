import React, {useState} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Signup = () => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpass:""})
    let history=useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
       const {name, email, password}=credentials;   
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({ name, email, password})
        });
        const json= await response.json();
        console.log(json);
        if(json.success){
            //save auth token and redirect
            localStorage.setItem('authToken', json.authToken);
            history.push("/");
        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange=(e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="container mt-2" >
      <h1 className='text-center'>Sign up</h1>
      <hr  />
        <form className="row g-3 my-2" onSubmit={handleSubmit}>
        <div className="col-md-6">
            <label htmlFor="firstname" className="form-label"> Name</label>
            <input type="text" className="form-control" name="name" id="name" onChange={onChange} required/>
        </div>
        <div className="col-md-8">
            <label htmlFor="emailInfo" className="form-label">Email Address</label>
            <input type="email" className="form-control" name="email" id="email" onChange={onChange} placeholder="abc@email.com" required/>
        </div>
        <div className="col-md-6">
            <label htmlFor="password1" className="form-label">Enter your password</label>
            <input type="password" className="form-control"  name="password" id="password" onChange={onChange} required/>
        </div><div className="col-md-6">
            <label htmlFor="password2" className="form-label">Confirm password</label>
            <input type="password" className="form-control" id="cpassword" onChange={onChange} required/>
        </div>
        <button type="submit" className="btn btn-primary">Sign up</button>
        </form>
      </div>
      )
}

      export default Signup