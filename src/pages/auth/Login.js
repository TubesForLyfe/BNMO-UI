import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [cookies, setCookies] = useCookies();

  axios.defaults.withCredentials = true;

  const login = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setMessage('Terdapat kolom yang kosong.');
    } else {
      axios.post(`${process.env.REACT_APP_BNMO_API}/login`, {
          username: username,
          password: password
      }).then(response => {
          if (response.data.message) {
            setMessage(response.data.message);
          } else {
            console.log(window.location.host)
            const domain =  window.location.host.split('.');
            if (domain.length === 1) {
              setCookies('bnmo_token', response.data.token);
            } else {
              const domainPart = '.' + domain[domain.length - 2] + '.' + domain[domain.length - 1];
              console.log(domainPart);
              setCookies('bnmo_token', response.data.token);
            }
            console.log(cookies.bnmo_token);     
          }
      })
    }
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
