import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import BNMO from '../../images/BNMO.PNG'

const Register = () => {
  const [nama, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [failMessage, setFailMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const register = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BNMO_API}/register`, {
      nama: nama,
      username: username,
      password: password
    }).then(response => {
      if (response.data.message) {
        setFailMessage(response.data.message);
        setSuccessMessage('');
      } else {
        const formData = new FormData();
        formData.append('file', image);
        fetch(`${process.env.REACT_APP_BNMO_API}/image/${username}/upload`, {
          method: 'post',
          body: formData
        }).then(response => {
          setSuccessMessage("Registrasi berhasil. Akun Anda akan segera diverifikasi.");
          setFailMessage('');
        })
      }
    })
  }
  
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-4 col-md-offset-4 border border-secondary mt-3 mb-3'>
            <br></br>
            <h4 className='text-center'>Register</h4>
            <hr></hr>
            <div className='form-group'>
                <label for='name' className='left'>Nama</label>
                <input type='text' className='form-control' name='name' onChange={e => setName(e.target.value)} />
            </div>
            <div className='form-group'>
                <label for='username' className='left'>Username</label>
                <input type='text' className='form-control' name='username' onChange={e => setUsername(e.target.value)} />
            </div>
            <div className='form-group'>
                <label for='password' className='left'>Password</label>
                <input type='password' className='form-control' name='password' onChange={e => setPassword(e.target.value)} />
            </div>
            <div className='form-group'>
                <label for='foto-image' className='left'>Foto image</label>
                <input type='file' accept='image/*' className='form-control' name='foto-image' onChange={e => setImage(e.target.files[0])} />
            </div>
            <br></br>
            <p className='text-danger'>{failMessage}</p>
            <p className='text-success'>{successMessage}</p>
            <div className='form-group'>
                <button className='btn btn-block btn-primary' onClick={register}>Register</button>
            </div>
            <br></br>
        </div>
        <Link to='/login'>Already have an account? Login here</Link>
      </div>
    </div>
  )
}

export default Register
