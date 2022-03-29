import React, {useState} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Login = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    let history=useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email: credentials.email, password: credentials.password})
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
        <div>
            <form  onSubmit={handleSubmit}>
            <h1 className='text-center'>Login</h1>
      <hr  />
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
            </div>
            <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>Login</button>
        </form>
        </div>
    )
}

export default Login