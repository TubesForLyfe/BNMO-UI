import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import axios from 'axios';

const CustomerHome = () => {
  const [profile, setProfile] = useState('');
  const [cookies, setCookies, removeCookies] = useCookies();

  axios.defaults.withCredentials = true;
  
  const logout = () => {
    setCookies('bnmo_token', cookies.bnmo_token, { path: '/' });
    removeCookies('bnmo_token');
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BNMO_API}/customer/profile`).then(response => {
      setProfile(response.data);
    })
  }, [])

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-4 col-md-offset-4 border border-secondary mt-3 mb-3'>
            <br></br>
            {profile.image && <img className='h-25 w-25 border border-info' alt={`${profile.nama} Image`} src={`${process.env.REACT_APP_BNMO_API}/image/${profile.image}`} />}
            <h5>{profile.nama}</h5>
            <h5>Rp {profile.saldo}</h5>
            <hr></hr>
            <Link to='/request-saldo'><button className='btn btn-block btn-info'>Request Saldo</button></Link>
            <br></br>
            <br></br>
            <Link to='/riwayat-request-saldo'><button className='btn btn-block btn-info'>Riwayat Request Saldo</button></Link>
            <br></br>
            <br></br>
            <Link to='/transfer-saldo'><button className='btn btn-block btn-info'>Transfer Saldo</button></Link>
            <br></br>
            <br></br>
            <Link to='/riwayat-transfer-saldo'><button className='btn btn-block btn-info'>Riwayat Transfer Saldo</button></Link>
            <br></br>
            <br></br>
            <button className='btn btn-danger' onClick={logout}>Log Out</button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
      </div>
    </div>
  )
}

export default CustomerHome
