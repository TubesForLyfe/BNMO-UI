import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import BNMO from '../../images/BNMO.PNG'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [cookies, setCookies] = useCookies();

  const login = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BNMO_API}/login`, {
        username: username,
        password: password
    }).then(response => {
        if (response.data.message) {
          setMessage(response.data.message);
        } else {
          setCookies('bnmo_token', response.data.token, { path: '/' });
        }
    })
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-4 col-md-offset-4 border border-secondary mt-3 mb-3'>
            <br></br>
            <h4 className='text-center'>Login</h4>
            <hr></hr>
            <div className='form-group'>
                <label for='username' className='left'>Username</label>
                <input type='text' className='form-control' name='username' onChange={e => setUsername(e.target.value)} />
            </div>
            <div className='form-group'>
                <label for='password' className='left'>Password</label>
                <input type='password' className='form-control' name='password' onChange={e => setPassword(e.target.value)} />
            </div>
            <br></br>
            <p className='text-danger'>{message}</p>
            <div className='form-group'>
                <button className='btn btn-block btn-primary' onClick={login}>Login</button>
            </div>
            <br></br>
        </div>
        <Link to='/register'>Don't have an account? Register here</Link>
      </div>
    </div>
  )
}

export default Login
