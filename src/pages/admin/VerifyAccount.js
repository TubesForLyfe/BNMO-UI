import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Back from '../../images/Back.png'

const VerifyAccount = () => {
  const [unverifiedCustomer, setUnverifiedCustomer] = useState([]);
  const [message, setMessage] = useState('');

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BNMO_API}/admin/unverified-customer`).then(response => {
        setUnverifiedCustomer(response.data);
    })
  }, [])

  const verifyCustomer = (username) => {
    axios.get(`${process.env.REACT_APP_BNMO_API}/admin/verify-customer/${username}`).then(response => {
        setMessage(response.data.message);
        axios.get(`${process.env.REACT_APP_BNMO_API}/admin/unverified-customer`).then(response => {
            setUnverifiedCustomer(response.data);
        })
    })
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6 col-md-offset-4 border border-secondary mt-3 mb-3'>
            <br></br>
            <h4>Verifikasi Akun Customer</h4>
            <hr></hr>
            <Link to='/' className='left ms-2'><img alt='Back' src={Back} /></Link>
            <br></br>
            <br></br>
            {unverifiedCustomer.length > 0 && <div className='mx-3'>
                <table className='table table-secondary text-center'>
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Username</th>
                            <th>Foto KTP</th>
                            <th>Verifikasi</th>
                        </tr>
                    </thead>
                    {unverifiedCustomer.map((val, key) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{val.nama}</td>
                                    <td>{val.username}</td>
                                    <td><img className='w-75 h-75' alt={`${val.username} Image`} src={`${process.env.REACT_APP_BNMO_API}/image/${val.image}`} /></td>
                                    <td><button className='btn btn-primary' onClick={e => {
                                        e.preventDefault();
                                        verifyCustomer(val.username);
                                    }}>Verifikasi</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>}
            <p className='text-success'>{message}</p>
        </div>
      </div>
    </div>
  )
}

export default VerifyAccount
